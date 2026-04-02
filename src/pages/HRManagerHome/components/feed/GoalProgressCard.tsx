import { Gridlet, Flex, Avatar, BodyText, Headline, Pill, PillType, IconV2, ProgressBar } from '@bamboohr/fabric';
import type { GoalProgress } from '../../../../data/hrManagerHomeTypes';

interface GoalProgressCardProps {
  data: GoalProgress;
}

export function GoalProgressCard({ data }: GoalProgressCardProps) {
  const getStatusPillType = (status: GoalProgress['status']): PillType => {
    const types: Record<GoalProgress['status'], PillType> = {
      'on-track': PillType.Success,
      'at-risk': PillType.Warning,
      behind: PillType.Error,
    };
    return types[status];
  };

  const getStatusLabel = (status: GoalProgress['status']) => {
    const labels: Record<GoalProgress['status'], string> = {
      'on-track': 'On Track',
      'at-risk': 'At Risk',
      behind: 'Behind',
    };
    return labels[status];
  };

  return (
    <Gridlet>
      <Gridlet.Body>
        <div className="feed-card-header">
          <Avatar
            src={data.employee.photoUrl}
            alt={`${data.employee.firstName} ${data.employee.lastName}`}
            size={40}
          />
          <div className="feed-card-info">
            <Headline size="extra-small">
              {data.employee.firstName} {data.employee.lastName}
            </Headline>
            <BodyText size="small" color="neutral-weak">
              {data.employee.jobTitle}
            </BodyText>
          </div>
          <Pill muted type={getStatusPillType(data.status)}>
            {getStatusLabel(data.status)}
          </Pill>
        </div>

        <Flex flexDirection="column" gap={12} marginTop={12}>
          <Flex alignItems="center" gap={8}>
            <IconV2 name="bullseye-solid" size={16} color="neutral-weak" />
            <BodyText weight="semibold">{data.goalTitle}</BodyText>
          </Flex>

          <div className="goal-progress-header">
            <BodyText size="small" color="neutral-weak">Progress</BodyText>
            <BodyText size="small" weight="medium">{data.progress}%</BodyText>
          </div>
          <ProgressBar current={data.progress} total={100} />

          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" gap={4}>
              <IconV2 name="flag-checkered-solid" size={12} color="neutral-weak" />
              <BodyText size="extra-small" color="neutral-weak">
                Target: {data.targetDate}
              </BodyText>
            </Flex>
            <BodyText size="extra-small" color="neutral-weak">
              Updated {data.updatedAt}
            </BodyText>
          </Flex>
        </Flex>
      </Gridlet.Body>
    </Gridlet>
  );
}
