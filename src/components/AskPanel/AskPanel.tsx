import { useState } from 'react';
import { IconV2, BodyText, Headline, Button, TextField, IconButton } from '@bamboohr/fabric';
import { recentConversations } from '../../data/chatData';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import './AskPanel.css';

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

export function AskPanel({ isOpen, onClose, isExpanded, onExpandChange }: AskPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const messages = recentConversations[1].messages;

  const handleSend = () => {
    if (inputValue.trim()) {
      setHasStarted(true);
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  const introContent = (
    <div className="ask-panel__intro">
      <div className="ask-panel__intro-content">
        <div className="ask-panel__intro-greeting">
          <Headline size="x-large" component="h1">Hi, Jess!</Headline>
        </div>
        <BodyText size="medium" color="neutral-weak">How can I help you today?</BodyText>
        <div className="ask-panel__intro-actions">
          {SUGGESTIONS.map((s) => (
            <Button key={s} color="secondary" variant="outlined" size="small" onClick={() => setHasStarted(true)}>
              {s}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const messageContent = (
    <div className="ask-panel__messages">
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === 'user' ? (
            <div className="ask-panel__msg-user">
              <div className="ask-panel__msg-user-bubble">{message.text}</div>
            </div>
          ) : (
            <div className="ask-panel__msg-ai">
              {isExpanded && (
                <div className="ask-panel__ai-label">
                  <div className="ask-panel__ai-icon">
                    <IconV2 name="sparkles-solid" size={12} color="neutral-inverted" />
                  </div>
                  <BodyText size="extra-small" weight="semibold" color="neutral-medium">
                    BambooHR Assistant
                  </BodyText>
                </div>
              )}
              <div className={isExpanded ? 'ask-panel__ai-body' : undefined}>
                <MarkdownContent text={message.text} />
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ask-panel__msg-suggestions">
                    {message.suggestions.map((s, i) => (
                      <Button key={i} color="secondary" variant="outlined" size="small">{s}</Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const inputRow = (
    <>
      <div className="ask-panel__footer-field">
        <TextField
          label="Ask a question"
          labelPlacement="hidden"
          placeholder="Ask a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
        />
      </div>
      <button
        className="ask-panel__send-btn-bare"
        onClick={handleSend}
        aria-label="Send message"
      >
        <IconV2 name="paper-plane-solid" size={16} color="primary-strong" />
      </button>
    </>
  );

  if (isExpanded) {
    return (
      <div className="ask-panel-fullscreen">
        <div className="ask-panel-fullscreen__header">
          <div className="ask-panel-fullscreen__title">
            <div className="ask-panel__ai-icon">
              <IconV2 name="sparkles-solid" size={14} color="neutral-inverted" />
            </div>
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

        <div className="ask-panel-fullscreen__content">
          <div className="ask-panel-fullscreen__inner">
            {!hasStarted ? introContent : messageContent}
          </div>
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

        <div className="ask-panel__content">
          {!hasStarted ? introContent : messageContent}
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
