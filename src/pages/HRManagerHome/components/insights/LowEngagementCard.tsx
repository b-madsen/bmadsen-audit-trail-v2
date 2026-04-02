import { Gridlet, Avatar, BodyText, ProgressBar, Pill, PillType, IconButton } from '@bamboohr/fabric';
import type { Employee } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface LowEngagementCardProps {
  employees: Employee[];
}

export function LowEngagementCard({ employees }: LowEngagementCardProps) {
  const getRiskPillType = (risk?: 'low' | 'medium' | 'high'): PillType => {
    if (risk === 'high') return PillType.Error;
    if (risk === 'medium') return PillType.Warning;
    return PillType.Success;
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Low Engagement Employees (${employees.length})`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Engagement</th>
                  <th>Satisfaction</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={employee.photoUrl} alt={`${employee.firstName} ${employee.lastName}`} size={32} />
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
                      <div className="score-cell">
                        <BodyText size="small" weight="semibold">
                          {employee.engagementScore}%
                        </BodyText>
                        <ProgressBar
                          current={employee.engagementScore || 0}
                          total={100}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small" weight="semibold">
                          {employee.satisfactionScore}%
                        </BodyText>
                        <ProgressBar
                          current={employee.satisfactionScore || 0}
                          total={100}
                        />
                      </div>
                    </td>
                    <td>
                      <Pill muted type={getRiskPillType(employee.turnoverRisk)}>
                        {employee.turnoverRisk === 'high' ? 'High Risk' : employee.turnoverRisk === 'medium' ? 'Medium' : 'Low'}
                      </Pill>
                    </td>
                    <td>
                      <IconButton icon="calendar-plus-regular" aria-label="Schedule 1:1" size="small" variant="outlined" />
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
