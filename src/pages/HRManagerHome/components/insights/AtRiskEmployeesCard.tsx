import { Gridlet, BodyText, Pill, PillType, Avatar, Button, InlineMessage, ProgressBar, IconV2, IconButton } from '@bamboohr/fabric';
import type { Employee } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface AtRiskEmployeesCardProps {
  employees: Employee[];
  talkingPoints?: (employee: Employee) => string[];
}

export function AtRiskEmployeesCard({ employees, talkingPoints }: AtRiskEmployeesCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Gridlet header={<Gridlet.Header title={`At-Risk Employees (${employees.length} flagged)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI-Powered Risk Detection"
            description="These employees show indicators of potential turnover based on engagement scores, survey responses, and activity patterns."
            action={
              <Button size="small" color="ai" variant="outlined">
                Learn More
              </Button>
            }
          />

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Tenure</th>
                  <th>Engagement</th>
                  <th>Last Feedback</th>
                  <th>Risk Factors</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  const hireDate = employee.hireDate ? new Date(employee.hireDate) : null;
                  const tenureMonths = hireDate
                    ? Math.floor((new Date().getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                    : 0;
                  const tenureYears = Math.floor(tenureMonths / 12);
                  const tenureRemaining = tenureMonths % 12;

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
                        <BodyText size="small">
                          {tenureYears > 0 ? `${tenureYears}y ${tenureRemaining}m` : `${tenureMonths}m`}
                        </BodyText>
                      </td>
                      <td>
                        <div className="score-cell">
                          <BodyText size="small" weight="semibold" color="error-strong">
                            {employee.engagementScore}%
                          </BodyText>
                          <ProgressBar
                            current={employee.engagementScore || 0}
                            total={100}
                          />
                        </div>
                      </td>
                      <td>
                        <BodyText
                          size="small"
                          color={formatDate(employee.lastFeedbackDate).includes('month') ? 'warning-strong' : 'neutral-weak'}
                        >
                          {formatDate(employee.lastFeedbackDate)}
                        </BodyText>
                      </td>
                      <td>
                        <div className="coverage-absences">
                          {(employee.engagementScore || 0) < 60 && (
                            <Pill muted type={PillType.Error}>Low Engagement</Pill>
                          )}
                          {(employee.satisfactionScore || 0) < 60 && (
                            <Pill muted type={PillType.Warning}>Low Satisfaction</Pill>
                          )}
                        </div>
                      </td>
                      <td>
                        <IconButton icon="calendar-plus-regular" aria-label="Schedule talk" size="small" variant="outlined" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* AI-generated talking points for first at-risk employee */}
          {talkingPoints && employees.length > 0 && (
            <div className="ai-message-content">
              <BodyText size="small" weight="semibold">
                <IconV2 name="sparkles-solid" size={16} color="discovery-strong" /> AI-Suggested Talking Points for {employees[0].firstName}
              </BodyText>
              <ul className="talking-points-list">
                {talkingPoints(employees[0]).map((point, index) => (
                  <li key={index} className="talking-point-item">
                    <IconV2 name="circle-check-regular" size={16} color="neutral-strong" />
                    <BodyText size="small">{point}</BodyText>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
