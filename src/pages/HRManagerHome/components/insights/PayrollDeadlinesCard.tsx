import { Gridlet, BodyText, Pill, PillType, Button, InlineMessage } from '@bamboohr/fabric';
import type { PayrollDeadline } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface PayrollDeadlinesCardProps {
  deadlines: PayrollDeadline[];
}

export function PayrollDeadlinesCard({ deadlines }: PayrollDeadlinesCardProps) {
  const dueTodayCount = deadlines.filter(d => d.status === 'due-today').length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusPillType = (status: PayrollDeadline['status']): PillType => {
    if (status === 'due-today' || status === 'overdue') return PillType.Error;
    return PillType.Warning;
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Payroll & Benefits Deadlines (${deadlines.length} upcoming)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {dueTodayCount > 0 && (
            <InlineMessage
              status="warning"
              title={`${dueTodayCount} deadline${dueTodayCount > 1 ? 's' : ''} due today`}
              description="Complete these tasks to avoid processing delays."
            />
          )}

          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`coverage-gap-item coverage-gap-item--${deadline.status === 'due-today' ? 'critical' : deadline.status === 'overdue' ? 'critical' : 'warning'}`}
            >
              <div className="coverage-gap-header">
                <div>
                  <BodyText weight="semibold">{deadline.title}</BodyText>
                  <BodyText size="small" color="neutral-weak">
                    {deadline.description}
                  </BodyText>
                </div>
                <Pill muted type={getStatusPillType(deadline.status)}>
                  {formatDate(deadline.dueDate)}
                </Pill>
              </div>

              <div className="coverage-gap-details">
                <div className="coverage-gap-stat">
                  <BodyText size="extra-small" color="neutral-weak">Action Required</BodyText>
                  <BodyText size="small">{deadline.actionRequired}</BodyText>
                </div>
              </div>

              <Button size="small" color={deadline.status === 'due-today' ? 'primary' : 'secondary'} variant={deadline.status === 'due-today' ? 'contained' : 'outlined'}>
                {deadline.status === 'due-today' ? 'Complete Now' : 'View Details'}
              </Button>
            </div>
          ))}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
