import { useState, useRef, useEffect } from 'react';
import { IconV2, BodyText, Button } from '@bamboohr/fabric';
import { useChat } from '../../contexts/ChatContext';
import type { ChatMessage } from '../../data/chatData';
import MarkdownContent from '../MarkdownContent';

interface ChatContentProps {
  className?: string;
}

export function ChatContent({ className = '' }: ChatContentProps) {
  const { selectedConversation, addMessage, selectedConversationId } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const messages = selectedConversation?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && selectedConversationId) {
      addMessage(selectedConversationId, {
        type: 'user',
        text: inputValue.trim(),
      });
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  };

  if (!selectedConversation) {
    return (
      <div className={`flex-1 flex flex-col bg-[var(--fabric-surface-color-neutral-white)] p-6 ${className}`}>
        <div className="flex-1 flex items-center justify-center bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] rounded-[20px]">
          <BodyText color="neutral-medium">Select a conversation to start chatting</BodyText>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col min-h-0 bg-[var(--fabric-surface-color-neutral-white)] p-6 ${className}`}>
      <div className="flex-1 flex flex-col min-h-0 bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] rounded-[20px] overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-[800px] mx-auto px-8 py-6 flex flex-col gap-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-8 py-6">
          <div className="max-w-[800px] mx-auto flex items-center gap-3 bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-weak)] rounded-full px-6 py-3 shadow-sm">
            <textarea
              ref={textareaRef}
              placeholder="Ask Anything"
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              className="flex-1 bg-transparent text-[15px] leading-[22px] text-[var(--fabric-text-color-neutral-strong)] placeholder:text-[var(--fabric-text-color-neutral-medium)] outline-none resize-none overflow-hidden"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-70"
              aria-label="Send message"
            >
              <IconV2 name="paper-plane-solid" size={20} color="neutral-medium" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageBubble({ message }: MessageBubbleProps) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-[var(--fabric-surface-color-neutral-white)] px-4 py-3 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px]">
          <span className="whitespace-pre-line">
            <BodyText size="medium">{message.text}</BodyText>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* AI Label */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center bg-[var(--fabric-theme-color-primary-strong)] rounded-full">
          <IconV2 name="sparkles-solid" size={12} color="neutral-inverted" />
        </div>
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">
          BambooHR Assistant
        </BodyText>
      </div>

      {/* AI Message */}
      <div className="pl-8">
        <MarkdownContent text={message.text} />

        {/* Suggestion Chips */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                color="secondary"
                variant="outlined"
                size="small"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatContent;
