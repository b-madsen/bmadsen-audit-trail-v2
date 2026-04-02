import { Gridlet, BodyText, Avatar, Pill, PillType, Button, InlineMessage, IconButton } from '@bamboohr/fabric';
import type { TimeOffRequest } from '../../../../data/hrManagerHomeTypes';
import { getAbsenceTypeLabel } from '../../../../data/mockHRManagerData';
import './InsightsCards.css';

interface PendingTimeOffCardProps {
  requests: TimeOffRequest[];
}

export function PendingTimeOffCard({ requests }: PendingTimeOffCardProps) {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (startStr === endStr) return startStr;
    return `${startStr} - ${endStr}`;
  };

  const formatRequestedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypePillType = (type: TimeOffRequest['type']): PillType => {
    const types: Record<TimeOffRequest['type'], PillType> = {
      vacation: PillType.Info,
      sick: PillType.Warning,
      personal: PillType.Neutral,
      parental: PillType.Success,
    };
    return types[type];
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Pending Time-Off Requests (${requests.length})`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {requests.length > 1 && (
            <InlineMessage
              status="ai"
              title="No Scheduling Conflicts Detected"
              description="I've reviewed all pending requests and found no overlapping absences or coverage issues. Safe to approve."
              action={
                <Button size="small" color="ai" variant="outlined">
                  Approve All {requests.length}
                </Button>
              }
            />
          )}

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Duration</th>
                  <th>Requested</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar
                          src={request.employee.photoUrl}
                          alt={`${request.employee.firstName} ${request.employee.lastName}`}
                          size={32}
                        />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">
                            {request.employee.firstName} {request.employee.lastName}
                          </BodyText>
                          <BodyText size="extra-small" color="neutral-weak">
                            {request.employee.department}
                          </BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Pill muted type={getTypePillType(request.type)}>
                        {getAbsenceTypeLabel(request.type)}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small">{formatDateRange(request.startDate, request.endDate)}</BodyText>
                    </td>
                    <td>
                      <BodyText size="small">
                        {request.totalDays} day{request.totalDays !== 1 ? 's' : ''}
                      </BodyText>
                    </td>
                    <td>
                      <BodyText size="small" color="neutral-weak">
                        {formatRequestedDate(request.requestedOn)}
                      </BodyText>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <IconButton icon="check-solid" aria-label="Approve" size="small" color="primary" variant="outlined" />
                        <IconButton icon="xmark-solid" aria-label="Deny" size="small" variant="outlined" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
