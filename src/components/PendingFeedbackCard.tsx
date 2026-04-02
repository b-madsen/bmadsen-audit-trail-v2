import { Avatar, IconV2, BodyText, Headline, Button, Divider } from '@bamboohr/fabric';

interface PendingFeedbackRequest {
  id: string;
  personName: string;
  personTitle: string;
  personAvatar: string;
  requestDate: string;
  emailSentDate: string;
  dueDate: string;
  daysRemaining: number;
}

interface PendingFeedbackCardProps {
  requests: PendingFeedbackRequest[];
  onCancel?: (id: string) => void;
}

export function PendingFeedbackCard({ requests, onCancel }: PendingFeedbackCardProps) {
  return (
    <div className="bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] border border-[var(--fabric-border-color-neutral-extra-weak)] rounded-lg p-6">
      {requests.map((request, index) => (
        <div key={request.id}>
          {/* Section Header */}
          <div className="flex items-start justify-between mb-4">
            <BodyText size="small" color="neutral-medium">
              Waiting for feedback from...
            </BodyText>
            <Button
              color="secondary"
              variant="text"
              size="small"
              startIcon={<IconV2 name="xmark-solid" size={16} />}
              onClick={() => onCancel?.(request.id)}
            >
              Cancel
            </Button>
          </div>

          {/* Person Badge */}
          <div className="flex items-center gap-4 mb-3">
            <Avatar src={request.personAvatar} alt={request.personName} size={48} />
            <div className="flex flex-col">
              <Headline size="extra-small">
                {request.personName}
              </Headline>
              <BodyText size="medium" color="neutral-medium">
                {request.personTitle}
              </BodyText>
              <BodyText size="small" color="neutral-medium">
                {request.requestDate}
              </BodyText>
            </div>
          </div>

          {/* Status Messages */}
          <div className="pl-16 space-y-1">
            <BodyText size="small" weight="medium">
              An email requesting {request.personName.split(' ')[0]} to complete feedback was sent {request.emailSentDate}.
            </BodyText>
            <BodyText size="small">
              {request.personName.split(' ')[0]} has until {request.dueDate} ({request.daysRemaining} days) to complete this.
            </BodyText>
          </div>

          {/* Divider between requests */}
          {index < requests.length - 1 && (
            <div className="my-6">
              <Divider />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PendingFeedbackCard;
