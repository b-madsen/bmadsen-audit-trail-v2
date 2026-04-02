import { Gridlet, BodyText, Avatar, IconV2, IconButton } from '@bamboohr/fabric';
import type { GoalProgress } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface CompletedGoalsCardProps {
  goals: GoalProgress[];
}

export function CompletedGoalsCard({ goals }: CompletedGoalsCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Goals Completed This Month (${goals.length} achieved)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Goal</th>
                  <th>Completed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar
                          src={goal.employee.photoUrl}
                          alt={`${goal.employee.firstName} ${goal.employee.lastName}`}
                          size={32}
                        />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">
                            {goal.employee.firstName} {goal.employee.lastName}
                          </BodyText>
                          <BodyText size="extra-small" color="neutral-weak">
                            {goal.employee.jobTitle}
                          </BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="employee-info">
                        <BodyText size="small" weight="medium">{goal.goalTitle}</BodyText>
                        <div className="quarter-trend">
                          <IconV2 name="circle-check-solid" size={16} color="success-strong" />
                          <BodyText size="extra-small" color="success-strong">Completed</BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <BodyText size="small">{formatDate(goal.updatedAt)}</BodyText>
                    </td>
                    <td>
                      <IconButton icon="hands-clapping-regular" aria-label="Recognize" size="small" variant="outlined" />
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
