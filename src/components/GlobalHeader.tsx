import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconV2, Button } from '@bamboohr/fabric';
import bamboohrLogo from '../../assets/images/bamboohr-logo.svg';

interface GlobalHeaderProps {
  className?: string;
}

export function GlobalHeader({ className = '' }: GlobalHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnSettings = location.pathname === '/settings';
  const isOnInbox = location.pathname === '/inbox';
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(() => {
    return localStorage.getItem('bhr-chat-panel-open') === 'true';
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true';
      if (isOpen !== isChatPanelOpen) {
        setIsChatPanelOpen(isOpen);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isChatPanelOpen]);

  return (
    <header className={`flex items-center justify-between gap-6 bg-[var(--fabric-surface-color-neutral-white)] py-8 pr-10 max-w-[2000px] ${className}`}>
      {/* Logo */}
      <img
        src={bamboohrLogo}
        alt="BambooHR"
        className="w-[194px] h-[29px]"
      />

      {/* Right Section */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        {/* Search Bar */}
        <div className="w-[288px]">
          <div className="flex items-center gap-2 h-[40px] px-4 py-2 bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-medium)] rounded-full shadow-sm">
            <IconV2 name="magnifying-glass-solid" size={12} color="neutral-weak" />
            <input
              type="text"
              placeholder="Ask or search for anything..."
              className="flex-1 bg-transparent text-sm leading-5 text-[var(--fabric-text-color-neutral-weak)] placeholder:text-[var(--fabric-text-color-neutral-weak)] outline-none"
            />
          </div>
        </div>

        {/* Utility Icons */}
        <div className="flex items-start gap-1">
          <button
            className={`flex items-center justify-center w-[42px] h-[42px] rounded transition-colors duration-200 ${isOnInbox ? 'bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]' : 'hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]'}`}
            aria-label="Inbox"
            onClick={() => navigate('/inbox')}
          >
            <IconV2
              name={isOnInbox ? 'inbox-solid' : 'inbox-regular'}
              size={24}
              color={isOnInbox ? 'primary-strong' : 'neutral-strong'}
            />
          </button>

          <button
            className="flex items-center justify-center p-[9px] rounded hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors duration-200"
            aria-label="Help"
          >
            <IconV2 name="circle-question-regular" size={24} color="neutral-strong" />
          </button>

          <button
            className={`flex items-center justify-center p-[9px] rounded transition-colors duration-200 ${isOnSettings ? 'bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]' : 'hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]'}`}
            aria-label="Settings"
            onClick={() => navigate('/settings')}
          >
            <IconV2
              name={isOnSettings ? 'gear-solid' : 'gear-regular'}
              size={24}
              color={isOnSettings ? 'primary-strong' : 'neutral-strong'}
            />
          </button>

          <Button
            color={isChatPanelOpen ? 'primary' : 'secondary'}
            variant={isChatPanelOpen ? 'contained' : 'outlined'}
            size="medium"
            startIcon={<IconV2 name="sparkles-solid" size={16} />}
            onClick={() => {
              const isOpen = localStorage.getItem('bhr-chat-panel-open') === 'true';
              localStorage.setItem('bhr-chat-panel-open', String(!isOpen));
            }}
          >
            Ask
          </Button>
        </div>
      </div>
    </header>
  );
}

export default GlobalHeader;
