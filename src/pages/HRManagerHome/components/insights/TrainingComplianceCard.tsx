import { Gridlet, BodyText, Pill, PillType, Avatar, Button, InlineMessage, TileV2, IconButton } from '@bamboohr/fabric';
import type { TrainingRecord } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface TrainingComplianceCardProps {
  records: TrainingRecord[];
}

export function TrainingComplianceCard({ records }: TrainingComplianceCardProps) {
  const overdueRecords = records.filter(r => r.status === 'overdue');
  const upcomingRecords = records.filter(r => r.status === 'not-started' || r.status === 'in-progress');
  const completedRecords = records.filter(r => r.status === 'completed');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryPillType = (category: TrainingRecord['category']): PillType => {
    if (category === 'compliance') return PillType.Error;
    if (category === 'safety') return PillType.Warning;
    return PillType.Info;
  };

  const getCategoryLabel = (category: TrainingRecord['category']) => {
    const labels = {
      compliance: 'Compliance',
      professional: 'Professional',
      safety: 'Safety',
      onboarding: 'Onboarding',
    };
    return labels[category];
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Training & Compliance (${overdueRecords.length} overdue)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {/* Summary stats using TileV2 */}
          <div className="stat-tiles-row">
            <TileV2
              icon="triangle-exclamation-solid"
              title={String(overdueRecords.length)}
              description="Overdue"
              orientation="horizontal"
            />
            <TileV2
              icon="clock-solid"
              title={String(upcomingRecords.length)}
              description="Due Soon"
              orientation="horizontal"
            />
            <TileV2
              icon="circle-check-solid"
              title={String(completedRecords.length)}
              description="Completed"
              orientation="horizontal"
            />
          </div>

          {overdueRecords.length > 0 && (
            <InlineMessage
              status="error"
              title="Compliance Risk"
              description={`${overdueRecords.length} employees have overdue mandatory training. Send reminders to ensure compliance.`}
              action={
                <Button size="small" variant="outlined" color="secondary">
                  Send Reminders
                </Button>
              }
            />
          )}

          {/* Overdue table */}
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...overdueRecords, ...upcomingRecords].map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar
                          src={record.employee.photoUrl}
                          alt={`${record.employee.firstName} ${record.employee.lastName}`}
                          size={32}
                        />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">
                            {record.employee.firstName} {record.employee.lastName}
                          </BodyText>
                          <BodyText size="extra-small" color="neutral-weak">
                            {record.employee.department}
                          </BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <BodyText size="small">{record.courseName}</BodyText>
                    </td>
                    <td>
                      <Pill muted type={getCategoryPillType(record.category)}>
                        {getCategoryLabel(record.category)}
                      </Pill>
                    </td>
                    <td>
                      {record.status === 'overdue' ? (
                        <BodyText size="small" color="error-strong">
                          {record.daysOverdue} days overdue
                        </BodyText>
                      ) : record.status === 'in-progress' ? (
                        <BodyText size="small" color="warning-strong">In Progress</BodyText>
                      ) : (
                        <BodyText size="small" color="neutral-weak">
                          Due {formatDate(record.dueDate)}
                        </BodyText>
                      )}
                    </td>
                    <td>
                      <IconButton
                        icon={record.status === 'overdue' ? 'bell-regular' : 'eye-regular'}
                        aria-label={record.status === 'overdue' ? 'Send reminder' : 'View'}
                        size="small"
                        variant="outlined"
                      />
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
