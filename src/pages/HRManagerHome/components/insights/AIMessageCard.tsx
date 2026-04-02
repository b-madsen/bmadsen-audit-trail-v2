import { Gridlet, BodyText, Avatar, Button, InlineMessage, IconV2 } from '@bamboohr/fabric';
import type { Celebration } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface AIMessageCardProps {
  celebration: Celebration;
  generatedMessage: string;
}

export function AIMessageCard({ celebration, generatedMessage }: AIMessageCardProps) {
  const employee = celebration.employee;
  const isAnniversary = celebration.type === 'work-anniversary';
  const isBirthday = celebration.type === 'birthday';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const getTitle = () => {
    if (isBirthday) return `Birthday Message for ${employee.firstName}`;
    if (isAnniversary) return `Anniversary Message for ${employee.firstName}`;
    return `Celebration Message for ${employee.firstName}`;
  };

  return (
    <Gridlet header={<Gridlet.Header title={getTitle()} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {/* Employee info */}
          <div className="employee-cell">
            <Avatar src={employee.photoUrl} alt={`${employee.firstName} ${employee.lastName}`} size={48} />
            <div className="employee-info">
              <BodyText weight="semibold">
                {employee.firstName} {employee.lastName}
              </BodyText>
              <BodyText size="small" color="neutral-weak">
                {employee.jobTitle} • {employee.department}
              </BodyText>
              <BodyText size="small" color="neutral-weak">
                {isBirthday && `Birthday: ${formatDate(celebration.date)}`}
                {isAnniversary && `${celebration.yearsOfService} Year Anniversary: ${formatDate(celebration.date)}`}
              </BodyText>
            </div>
          </div>

          {/* AI Generated message */}
          <InlineMessage
            status="ai"
            title="AI-Generated Message"
            description="I've drafted a personalized message based on their role and recent achievements."
          />

          <div className="ai-message-box">
            <BodyText>{generatedMessage}</BodyText>
          </div>

          <div className="ai-message-actions">
            <Button color="ai" variant="outlined" startIcon={<IconV2 name="paper-plane-solid" size={16} />}>
              Send via Email
            </Button>
            <Button color="ai" variant="outlined" startIcon={<IconV2 name="comment-solid" size={16} />}>
              Send via Slack
            </Button>
            <Button color="ai" variant="outlined" startIcon={<IconV2 name="pen-solid" size={16} />}>
              Edit Message
            </Button>
            <Button color="ai" variant="outlined" startIcon={<IconV2 name="arrows-rotate-solid" size={16} />}>
              Regenerate
            </Button>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
