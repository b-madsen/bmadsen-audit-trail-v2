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
}

const SUGGESTIONS = [
  'Show me time-off requests pending approval',
  "Who's out of office this week?",
  'Run a headcount summary',
];

const AI_RESPONSE_MAP: Record<string, string> = {
  'show me time-off requests pending approval': `Here are the **time-off requests pending your approval**:\n\n| Employee | Dates | Type | Days |\n|----------|-------|------|------|\n| Alex Chen | Apr 14–16 | Vacation | 3 |\n| Taylor Brown | Apr 18 | Sick | 1 |\n| Jordan Lee | Apr 21–25 | Vacation | 5 |\n\nYou can approve or deny these in the Time & Attendance section.`,
  "who's out of office this week?": `**Out of office this week (Apr 7–11):**\n\n- **Marcus Rivera** — Vacation (Mon–Wed)\n- **Priya Patel** — Sick leave (Tue)\n- **Sam Torres** — Personal day (Fri)\n\n3 employees total.`,
  'run a headcount summary': `**Current Headcount Summary**\n\n| Department | Active | On Leave | Open Roles |\n|------------|--------|----------|------------|\n| Engineering | 42 | 2 | 3 |\n| Marketing | 12 | 1 | 1 |\n| Sales | 28 | 0 | 5 |\n| HR & Ops | 9 | 0 | 0 |\n| **Total** | **91** | **3** | **9** |`,
};

const DEFAULT_AI_RESPONSE = `I'm sorry, but I'm not able to understand your message. It appears to be random characters. Could you please rephrase your question? I'm here to help you with HR-related topics such as time off, payroll, benefits, company policies, employee information, and more.`;

function getMockResponse(text: string): string {
  return AI_RESPONSE_MAP[text.toLowerCase().trim()] ?? DEFAULT_AI_RESPONSE;
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

export function AskPanel({ isOpen, onClose, isExpanded, onExpandChange }: AskPanelProps) {
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
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: nextId(),
        type: 'ai',
        text: getMockResponse(trimmed),
        timestamp: new Date(),
      }]);
    }, 1400);
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

  const introContent = (
    <div className="ask-panel__intro">
      <div className="ask-panel__intro-content">
        <div className="ask-panel__intro-greeting">
          <Headline size="extra-large" component="h1">Hi, Jess!</Headline>
        </div>
        <BodyText size="medium" color="neutral-weak">How can I help you today?</BodyText>
        <div className="ask-panel__intro-actions">
          {SUGGESTIONS.map((s) => (
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
