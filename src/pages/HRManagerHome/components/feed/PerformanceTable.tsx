import { Gridlet, Avatar, BodyText, Pill, PillType, Button, Flex, NameValuePair } from '@bamboohr/fabric';
import type { FeedItem, PerformanceUpdate, GoalProgress } from '../../../../data/hrManagerHomeTypes';

interface PerformanceTableProps {
  items: FeedItem[];
}

export function PerformanceTable({ items }: PerformanceTableProps) {
  const getPerformanceTypeLabel = (type: PerformanceUpdate['type']): string => {
    const labels: Record<PerformanceUpdate['type'], string> = {
      'review-completed': 'Review Completed',
      'review-due': 'Review Due',
      'feedback-received': 'Feedback',
      'goal-achieved': 'Goal Achieved',
    };
    return labels[type];
  };

  const getPerformanceTypePillType = (type: PerformanceUpdate['type']): PillType => {
    const types: Record<PerformanceUpdate['type'], PillType> = {
      'review-completed': PillType.Success,
      'review-due': PillType.Warning,
      'feedback-received': PillType.Info,
      'goal-achieved': PillType.Success,
    };
    return types[type];
  };

  const getGoalStatusPillType = (status: GoalProgress['status']): PillType => {
    const types: Record<GoalProgress['status'], PillType> = {
      'on-track': PillType.Success,
      'at-risk': PillType.Warning,
      'behind': PillType.Error,
    };
    return types[status];
  };

  const getGoalStatusLabel = (status: GoalProgress['status']): string => {
    const labels: Record<GoalProgress['status'], string> = {
      'on-track': 'On Track',
      'at-risk': 'At Risk',
      'behind': 'Behind',
    };
    return labels[status];
  };

  return (
    <Gridlet header={<Gridlet.Header title="Performance" />}>
      <Gridlet.Body>
        <div className="feed-table-container">
          <table className="feed-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Details</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const employee = item.data.employee;
                const isGoal = item.type === 'goal';
                const data = item.data as PerformanceUpdate | GoalProgress;

                return (
                  <tr key={`performance-${index}`}>
                    <td className="employee-cell">
                      <Avatar
                        src={employee.photoUrl}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        size={32}
                      />
                      <NameValuePair
                        name={`${employee.firstName} ${employee.lastName}`}
                        value={employee.jobTitle}
                      />
                    </td>
                    <td>
                      {isGoal ? (
                        <Pill muted type={getGoalStatusPillType((data as GoalProgress).status)}>
                          {getGoalStatusLabel((data as GoalProgress).status)}
                        </Pill>
                      ) : (
                        <Pill muted type={getPerformanceTypePillType((data as PerformanceUpdate).type)}>
                          {getPerformanceTypeLabel((data as PerformanceUpdate).type)}
                        </Pill>
                      )}
                    </td>
                    <td>
                      <BodyText size="small">
                        {isGoal
                          ? `${(data as GoalProgress).goalTitle} (${(data as GoalProgress).progress}%)`
                          : (data as PerformanceUpdate).title}
                      </BodyText>
                    </td>
                    <td>
                      <BodyText size="small" color="neutral-weak">
                        {isGoal
                          ? `Target: ${(data as GoalProgress).targetDate}`
                          : (data as PerformanceUpdate).date}
                      </BodyText>
                    </td>
                    <td>
                      <Flex gap={8}>
                        <Button size="small" color="secondary" icon="eye-solid">
                          View
                        </Button>
                        {isGoal && (
                          <Button size="small" color="secondary" icon="comment-solid">
                            Feedback
                          </Button>
                        )}
                      </Flex>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
