import { Gridlet, BodyText, Avatar, Button, Pill, PillType, InlineMessage, IconButton } from '@bamboohr/fabric';
import type { Employee } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface EmployeesNeedingFeedbackCardProps {
  employees: Employee[];
}

export function EmployeesNeedingFeedbackCard({ employees }: EmployeesNeedingFeedbackCardProps) {
  const formatLastFeedback = (dateStr?: string) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} days ago`;
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  };

  const getDaysSinceLastFeedback = (dateStr?: string) => {
    if (!dateStr) return 999;
    const date = new Date(dateStr);
    const now = new Date();
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Sort by longest without feedback
  const sortedEmployees = [...employees].sort((a, b) =>
    getDaysSinceLastFeedback(b.lastFeedbackDate) - getDaysSinceLastFeedback(a.lastFeedbackDate)
  );

  return (
    <Gridlet header={<Gridlet.Header title={`Employees Needing Feedback (${employees.length} overdue)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Regular Feedback Matters"
            description="Employees who receive regular feedback show 14% higher engagement. Consider scheduling brief check-ins with these team members."
            action={
              <Button size="small" color="ai" variant="outlined">
                Schedule Check-ins
              </Button>
            }
          />

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Last Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.map((employee) => {
                  const days = getDaysSinceLastFeedback(employee.lastFeedbackDate);
                  return (
                    <tr key={employee.id}>
                      <td>
                        <div className="employee-cell">
                          <Avatar
                            src={employee.photoUrl}
                            alt={`${employee.firstName} ${employee.lastName}`}
                            size={32}
                          />
                          <div className="employee-info">
                            <BodyText size="small" weight="medium">
                              {employee.firstName} {employee.lastName}
                            </BodyText>
                            <BodyText size="extra-small" color="neutral-weak">
                              {employee.jobTitle}
                            </BodyText>
                          </div>
                        </div>
                      </td>
                      <td>
                        <BodyText size="small">{employee.department}</BodyText>
                      </td>
                      <td>
                        <Pill muted type={days > 90 ? PillType.Error : PillType.Warning}>
                          {formatLastFeedback(employee.lastFeedbackDate)}
                        </Pill>
                      </td>
                      <td>
                        <IconButton icon="comment-regular" aria-label="Give feedback" size="small" variant="outlined" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
