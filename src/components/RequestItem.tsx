import { Avatar, IconV2, BodyText, Checkbox } from '@bamboohr/fabric';
import type { InboxRequest } from '../data/inboxData';

interface RequestItemProps {
  request: InboxRequest;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export function RequestItem({ request, isSelected, onToggleSelect }: RequestItemProps) {
  // Render icon based on iconType
  const renderIcon = () => {
    if (request.iconType === 'avatar' && request.avatarUrl) {
      return (
        <Avatar src={request.avatarUrl} alt={request.requesterName || ''} size={40} />
      );
    } else if (request.iconType === 'document') {
      return (
        <div className="shrink-0 w-10 h-10 bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] rounded flex items-center justify-center">
          <IconV2 name="file-lines-solid" size={20} color="neutral-medium" />
        </div>
      );
    } else if (request.iconType === 'user') {
      return (
        <div className="shrink-0 w-10 h-10 bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] rounded flex items-center justify-center">
          <IconV2 name="circle-user-solid" size={24} color="neutral-medium" />
        </div>
      );
    }
  };

  // Render subtitle based on subtitleType
  const renderSubtitle = () => {
    if (request.subtitleType === 'requester' && request.requesterName) {
      return (
        <div className="flex items-center gap-1.5">
          <IconV2 name="circle-user-solid" size={16} color="neutral-medium" />
          <BodyText size="extra-small" color="neutral-medium">
            {request.requesterName}
          </BodyText>
        </div>
      );
    } else if (request.subtitleType === 'description' && request.description) {
      return (
        <span className="truncate">
          <BodyText size="extra-small" color="neutral-medium">
            {request.description}
          </BodyText>
        </span>
      );
    }
  };

  // Render due status badge
  const renderDueStatus = () => {
    if (!request.dueStatus) return null;

    const statusConfig = {
      'past-due': {
        text: 'Past due',
        iconColor: 'error-strong' as const,
      },
      'due-soon': {
        text: 'Due soon',
        iconColor: 'warning-strong' as const,
      },
    };

    const config = statusConfig[request.dueStatus];

    return (
      <div className="flex items-center gap-1">
        <IconV2 name="clock-solid" size={16} color={config.iconColor} />
        <BodyText size="extra-small" weight="medium" color={config.iconColor}>
          {config.text}
        </BodyText>
      </div>
    );
  };

  return (
    <div
      className="flex items-center border-b cursor-pointer hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors py-3 px-6 gap-3"
      style={{ borderColor: 'var(--fabric-border-color-neutral-extra-extra-weak)' }}
      onClick={() => onToggleSelect(request.id)}
    >
      {/* Checkbox */}
      <div
        className="shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSelect(request.id);
        }}
      >
        <Checkbox checked={isSelected} value={request.id} onChange={() => onToggleSelect(request.id)} />
      </div>

      {/* Icon (Avatar/Document/User) */}
      {renderIcon()}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Line 1: Title + Date */}
        <div className="flex items-baseline gap-2">
          <span className="truncate">
            <BodyText size="small" weight="semibold">
              {request.title}
            </BodyText>
          </span>
          <span className="shrink-0">
            <BodyText size="small" color="neutral-weak">
              {request.date}
            </BodyText>
          </span>
        </div>

        {/* Line 2: Subtitle + Due Status */}
        <div className="flex items-center gap-2 mt-0.5">
          {renderSubtitle()}
          {request.dueStatus && renderDueStatus()}
        </div>
      </div>

      {/* Chevron Icon */}
      <div className="shrink-0">
        <IconV2 name="chevron-right-solid" size={16} color="neutral-weak" />
      </div>
    </div>
  );
}

export default RequestItem;
