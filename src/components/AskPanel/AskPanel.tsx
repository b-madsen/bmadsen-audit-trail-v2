import { useState, useRef, useEffect } from 'react';
import { IconV2, BodyText, Headline, Button, TextField, IconButton } from '@bamboohr/fabric';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import './AskPanel.css';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  context?: 'audit-trail';
}

const SUGGESTIONS = [
  'Show me time-off requests pending approval',
  "Who's out of office this week?",
  'Run a headcount summary',
];

const AUDIT_SUGGESTIONS = [
  'Show me all logins in the last 30 days',
  'Filter by Payroll changes this month',
  'Show actions from BambooHR System',
];

const SYSTEM_PROMPT_DEFAULT = `You are BambooHR's AI assistant. You help HR administrators with questions about time off, payroll, benefits, hiring, employee records, and company policies. Keep responses concise and helpful. Use markdown formatting when it improves readability.`;

const SYSTEM_PROMPT_AUDIT = `You are BambooHR's AI assistant embedded in the Audit Trail page. You help HR administrators understand and analyze audit trail events. You can filter the audit trail by date range (e.g. "last 30 days", "this month", "today"), action type (added, edited, removed, approved, denied, exported, logged-in), area (Payroll, Time Off, Benefits, Hiring, Employee Records, Settings), and actor type (user, Ask BambooHR, Platform/system, integrations). Keep responses concise. Use markdown formatting when it improves readability.`;

async function callOpenAI(text: string, history: Message[], context?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const systemPrompt = context === 'audit-trail' ? SYSTEM_PROMPT_AUDIT : SYSTEM_PROMPT_DEFAULT;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: text },
      ],
      max_tokens: 600,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI error ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content as string;
}

interface AuditFilters {
  actors?: string[];
  actions?: string[];
  areas?: string[];
  dateRange?: { from: string; to: string };
}

function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return fmtDate(d);
}

function parseAuditTrailQuery(text: string): AuditFilters | null {
  const lower = text.toLowerCase();
  const result: AuditFilters = {};

  // --- Date range ---
  const nDaysMatch = lower.match(/(?:last|past)\s+(\d+)\s+days?/);
  if (nDaysMatch) {
    result.dateRange = { from: daysAgo(parseInt(nDaysMatch[1], 10)), to: fmtDate(new Date()) };
  } else if (/last\s+week|past\s+week/.test(lower)) {
    result.dateRange = { from: daysAgo(7), to: fmtDate(new Date()) };
  } else if (/last\s+month|past\s+month/.test(lower)) {
    result.dateRange = { from: daysAgo(30), to: fmtDate(new Date()) };
  } else if (/last\s+year|past\s+year/.test(lower)) {
    result.dateRange = { from: daysAgo(365), to: fmtDate(new Date()) };
  } else if (/\btoday\b/.test(lower)) {
    result.dateRange = { from: fmtDate(new Date()), to: fmtDate(new Date()) };
  } else if (/\byesterday\b/.test(lower)) {
    result.dateRange = { from: daysAgo(1), to: daysAgo(1) };
  } else if (/this\s+week/.test(lower)) {
    const d = new Date();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    result.dateRange = { from: fmtDate(monday), to: fmtDate(new Date()) };
  } else if (/this\s+month/.test(lower)) {
    const d = new Date();
    result.dateRange = { from: fmtDate(new Date(d.getFullYear(), d.getMonth(), 1)), to: fmtDate(new Date()) };
  }

  // --- Actions (IDs: added, edited, removed, approved, denied, exported, logged-in) ---
  const actions: string[] = [];
  if (/\bdelet|\bremov/.test(lower)) actions.push('removed');
  if (/\bcreat|\badd(ed)?\b/.test(lower)) actions.push('added');
  if (/\b(updat|edit|modif|chang)/.test(lower)) actions.push('edited');
  if (/\bapprov/.test(lower)) actions.push('approved');
  if (/\b(deni|deny|reject)/.test(lower)) actions.push('denied');
  if (/\b(export|download)/.test(lower)) actions.push('exported');
  if (/login|log[- ]in|logged[- ]in|sign[- ]in|signed[- ]in/.test(lower)) actions.push('logged-in');
  if (actions.length) result.actions = actions;

  // --- Areas (IDs: employee-records, time-off, payroll, benefits, hiring, settings) ---
  const areas: string[] = [];
  if (/\b(payroll|salary|wage|compensation)/.test(lower)) areas.push('payroll');
  if (/time[- ]off|vacation|\bpto\b|leave/.test(lower)) areas.push('time-off');
  if (/\bbenefit/.test(lower)) areas.push('benefits');
  if (/\b(hiring|hire|recruit|job opening|offer letter)/.test(lower)) areas.push('hiring');
  if (/employee record|employee profile|\bprofile\b|personal info|onboarding/.test(lower)) areas.push('employee-records');
  if (/\b(setting|config|permission|access level)/.test(lower)) areas.push('settings');
  if (areas.length) result.areas = areas;

  // --- Actors (dispatch node IDs: system, ask, integration, user) ---
  const actors: string[] = [];
  if (/bamboohr system|\bplatform\b|automatic(ally)?/.test(lower)) actors.push('system');
  if (/bamboohr ask|\bask\b/.test(lower)) actors.push('ask');
  if (/\b(integration|remote|gusto|greenhouse|indeed)/.test(lower)) actors.push('integration');
  if (/\b(user|person|employee|admin|manager|human)\b/.test(lower) && !/bamboohr system/.test(lower)) actors.push('user');
  if (actors.length) result.actors = actors;

  return Object.keys(result).length > 0 ? result : null;
}

function buildAuditFilterResponse(filters: AuditFilters): string {
  const parts: string[] = [];
  if (filters.dateRange) {
    const { from, to } = filters.dateRange;
    const fmt = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (from === to) parts.push(`date: **${fmt(from)}**`);
    else parts.push(`date range: **${fmt(from)} – ${fmt(to)}**`);
  }
  if (filters.actions?.length) parts.push(`action: **${filters.actions.join(', ')}**`);
  if (filters.areas?.length) parts.push(`area: **${filters.areas.join(', ')}**`);
  if (filters.actors?.length) parts.push(`actor: **${filters.actors.join(', ')}**`);
  return `Done! I've filtered the audit trail by ${parts.join(' and ')}. The view has been updated to show matching events.\n\nYou can adjust or clear these filters using the filter buttons above the timeline.`;
}


function formatDateSep(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

let _uid = 0;
function nextId() { return String(++_uid); }

export function AskPanel({ isOpen, onClose, isExpanded, onExpandChange, context }: AskPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const hasStarted = messages.length > 0 || isTyping;

  // Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Re-attach scroll listener when panel opens or mode changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 4;
      setShowGradient(el.scrollHeight > el.clientHeight && !atBottom);
    };
    el.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => el.removeEventListener('scroll', handler);
  }, [isOpen, isExpanded, hasStarted]);

  // Recheck gradient when content changes
  useEffect(() => {
    const t = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 4;
      setShowGradient(el.scrollHeight > el.clientHeight && !atBottom);
    }, 60);
    return () => clearTimeout(t);
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { id: nextId(), type: 'user', text: trimmed, timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);

    if (context === 'audit-trail') {
      const filters = parseAuditTrailQuery(trimmed);
      if (filters) {
        window.dispatchEvent(new CustomEvent('bhr-apply-audit-filters', { detail: filters }));
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: nextId(),
            type: 'ai',
            text: buildAuditFilterResponse(filters),
            timestamp: new Date(),
          }]);
        }, 900);
        return;
      }
    }

    callOpenAI(trimmed, messages, context)
      .then(text => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: nextId(), type: 'ai', text, timestamp: new Date() }]);
      })
      .catch(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: nextId(),
          type: 'ai',
          text: 'Sorry, I had trouble connecting. Please try again.',
          timestamp: new Date(),
        }]);
      });
  };

  if (!isOpen) return null;

  const renderMessageNodes = () => {
    const nodes: React.ReactNode[] = [];
    let lastDate: Date | null = null;

    messages.forEach((msg, i) => {
      if (!lastDate || !isSameDay(lastDate, msg.timestamp)) {
        nodes.push(
          <div key={`ds-${i}`} className="ask-panel__date-sep">
            <span className="ask-panel__date-sep-text">{formatDateSep(msg.timestamp)}</span>
          </div>
        );
        lastDate = msg.timestamp;
      }

      if (msg.type === 'user') {
        nodes.push(
          <div key={msg.id} className="ask-panel__msg-user">
            <div className="ask-panel__msg-user-bubble">{msg.text}</div>
            <div className="ask-panel__msg-time">{formatTime(msg.timestamp)}</div>
          </div>
        );
      } else {
        nodes.push(
          <div key={msg.id} className="ask-panel__msg-ai">
            <div className="ask-panel__ai-header">
              <div className="ask-panel__ai-icon" aria-hidden="true" />
              <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                BambooHR Assistant
              </BodyText>
            </div>
            <div className="ask-panel__ai-body">
              <MarkdownContent text={msg.text} />
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="ask-panel__msg-suggestions">
                  {msg.suggestions.map((s, si) => (
                    <Button key={si} color="secondary" variant="outlined" size="small" onClick={() => sendMessage(s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              )}
              <div className="ask-panel__msg-feedback">
                <button className="ask-panel__feedback-btn" aria-label="Helpful">
                  <IconV2 name="thumbs-up-regular" size={16} color="neutral-medium" />
                </button>
                <button className="ask-panel__feedback-btn" aria-label="Not helpful">
                  <IconV2 name="thumbs-down-regular" size={16} color="neutral-medium" />
                </button>
              </div>
            </div>
          </div>
        );
      }
    });

    if (isTyping) {
      nodes.push(
        <div key="typing" className="ask-panel__msg-ai">
          <div className="ask-panel__ai-header">
            <div className="ask-panel__ai-icon" aria-hidden="true" />
            <BodyText size="extra-small" weight="semibold" color="neutral-medium">
              BambooHR Assistant
            </BodyText>
          </div>
          <div className="ask-panel__ai-body">
            <div className="ask-panel__typing">
              <span /><span /><span />
            </div>
          </div>
        </div>
      );
    }

    return nodes;
  };

  const activeSuggestions = context === 'audit-trail' ? AUDIT_SUGGESTIONS : SUGGESTIONS;
  const introHeading = 'Hi, Jess!';
  const introSubtext = context === 'audit-trail'
    ? 'Ask me to filter by actor, action type, or area — or describe what you\'re looking for.'
    : 'How can I help you today?';

  const introContent = (
    <div className="ask-panel__intro">
      <div className="ask-panel__intro-content">
        <div className="ask-panel__intro-greeting">
          <Headline size="extra-large" component="h1">{introHeading}</Headline>
        </div>
        <BodyText size="medium" color="neutral-weak">{introSubtext}</BodyText>
        <div className="ask-panel__intro-actions">
          {activeSuggestions.map((s) => (
            <Button key={s} color="secondary" variant="outlined" size="small" onClick={() => sendMessage(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const messagesContent = (
    <div className="ask-panel__messages">
      {renderMessageNodes()}
      <div ref={endRef} />
    </div>
  );

  const inputRow = (
    <>
      <div className="ask-panel__footer-field">
        <TextField
          label="Ask a question"
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(inputValue); } }}
        />
      </div>
      <button
        className="ask-panel__send-btn-bare"
        onClick={() => sendMessage(inputValue)}
        aria-label="Send message"
        disabled={!inputValue.trim() || isTyping}
      >
        <IconV2
          name="paper-plane-solid"
          size={16}
          color={inputValue.trim() && !isTyping ? 'primary-strong' : 'neutral-medium'}
        />
      </button>
    </>
  );

  if (isExpanded) {
    return (
      <div className="ask-panel-fullscreen">
        <div className="ask-panel-fullscreen__header">
          <div className="ask-panel-fullscreen__title">
            <div className="ask-panel__ai-icon ask-panel__ai-icon--lg" aria-hidden="true" />
            <BodyText size="large" weight="semibold">Ask BambooHR</BodyText>
          </div>
          <div className="ask-panel__header-actions">
            <IconButton
              icon="down-left-and-up-right-to-center-solid"
              aria-label="Collapse"
              size="small"
              variant="outlined"
              onClick={() => onExpandChange(false)}
            />
            <IconButton
              icon="xmark-solid"
              aria-label="Close"
              size="small"
              variant="outlined"
              onClick={() => { onExpandChange(false); onClose(); }}
            />
          </div>
        </div>

        <div className="ask-panel-fullscreen__messages-wrap">
          <div className="ask-panel-fullscreen__content" ref={scrollRef}>
            <div className="ask-panel-fullscreen__inner">
              {!hasStarted ? introContent : messagesContent}
            </div>
          </div>
          {showGradient && <div className="ask-panel__scroll-gradient ask-panel__scroll-gradient--fs" />}
        </div>

        <div className="ask-panel-fullscreen__footer">
          <div className="ask-panel-fullscreen__input-row">
            {inputRow}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ask-panel">
      <div className="ask-panel__main">
        <div className="ask-panel__header">
          <BodyText size="large" weight="medium">Ask BambooHR</BodyText>
          <div className="ask-panel__header-actions">
            <IconButton
              icon="up-right-and-down-left-from-center-solid"
              aria-label="Expand"
              size="small"
              variant="outlined"
              onClick={() => onExpandChange(true)}
            />
            <IconButton
              icon="xmark-solid"
              aria-label="Close"
              size="small"
              variant="outlined"
              onClick={onClose}
            />
          </div>
        </div>

        <div className="ask-panel__messages-wrap">
          <div className="ask-panel__content" ref={scrollRef}>
            {!hasStarted ? introContent : messagesContent}
          </div>
          {showGradient && <div className="ask-panel__scroll-gradient" />}
        </div>

        <div className="ask-panel__footer">
          <div className="ask-panel__footer-input-row">
            {inputRow}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskPanel;
