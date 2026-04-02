import { Button, InlineMessage, IconV2 } from '@bamboohr/fabric';

interface SuccessNotificationProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  show: boolean;
}

export function SuccessNotification({
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  show,
}: SuccessNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <InlineMessage
          status="success"
          title={title}
          description={description}
          action={actionLabel && onAction ? (
            <Button size="small" color="secondary" variant="outlined" onClick={onAction}>
              {actionLabel}
            </Button>
          ) : undefined}
        />
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
            aria-label="Dismiss"
          >
            <IconV2 name="xmark-solid" size={16} color="neutral-strong" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SuccessNotification;
