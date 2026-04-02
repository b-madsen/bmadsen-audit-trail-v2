import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconV2, BodyText, Button, TextField } from '@bamboohr/fabric';
import { useChat } from '../../contexts/ChatContext';

interface ChatSidebarProps {
  className?: string;
}

export function ChatSidebar({ className = '' }: ChatSidebarProps) {
  const navigate = useNavigate();
  const {
    filteredConversations,
    selectedConversationId,
    searchQuery,
    setSearchQuery,
    selectConversation,
    createNewChat,
  } = useChat();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCollapse = () => {
    localStorage.setItem('bhr-chat-panel-open', 'true');
    navigate('/');
  };

  const handleClose = () => {
    localStorage.setItem('bhr-chat-panel-open', 'false');
    navigate('/');
  };

  const handleNewChat = () => {
    const newChat = createNewChat();
    selectConversation(newChat.id);
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <aside className={`w-[280px] h-full flex flex-col bg-[var(--fabric-surface-color-neutral-white)] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="w-6 h-6 flex items-center justify-center bg-[var(--fabric-theme-color-primary-strong)] rounded-md">
          <IconV2 name="sparkles-solid" size={16} color="neutral-inverted" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCollapse}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors"
            aria-label="Collapse to slide-in"
          >
            <IconV2 name="down-left-and-up-right-to-center-solid" size={16} color="neutral-strong" />
          </button>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors"
            aria-label="Close chat"
          >
            <IconV2 name="xmark-solid" size={16} color="neutral-strong" />
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-3">
        <Button
          color="secondary"
          variant="text"
          size="medium"
          startIcon={<IconV2 name="pen-to-square-solid" size={16} />}
          onClick={handleNewChat}
          className="w-full justify-start"
        >
          New Chat
        </Button>
      </div>

      {/* Chats Section Header */}
      <div className="px-5 py-2 flex items-center justify-between">
        <BodyText size="extra-small" weight="semibold" color="neutral-medium">
          Chats
        </BodyText>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors"
          aria-label="Search chats"
        >
          <IconV2 name="magnifying-glass-solid" size={16} color="neutral-strong" />
        </button>
      </div>

      {/* Search Input */}
      {isSearchOpen && (
        <div className="px-4 pb-2">
          <TextField
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            autoFocus
          />
        </div>
      )}

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredConversations.map((conversation) => {
          const isActive = conversation.id === selectedConversationId;
          return (
            <button
              key={conversation.id}
              onClick={() => {
                selectConversation(conversation.id);
                navigate(`/chat/${conversation.id}`);
              }}
              className={`w-full text-left px-4 py-3 rounded transition-colors duration-150 truncate ${
                isActive
                  ? 'bg-[var(--fabric-surface-color-neutral-extra-weak)]'
                  : 'hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]'
              }`}
            >
              <BodyText size="medium" weight={isActive ? 'medium' : 'regular'}>
                {conversation.title}
              </BodyText>
            </button>
          );
        })}
        {filteredConversations.length === 0 && searchQuery && (
          <div className="px-4 py-3">
            <BodyText size="small" color="neutral-weak">
              No conversations found
            </BodyText>
          </div>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;
