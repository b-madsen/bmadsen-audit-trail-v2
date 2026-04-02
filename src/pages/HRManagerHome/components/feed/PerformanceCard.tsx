import { Gridlet, Flex, Avatar, BodyText, Headline, Pill, PillType, IconV2 } from '@bamboohr/fabric';
import type { PerformanceUpdate } from '../../../../data/hrManagerHomeTypes';

interface PerformanceCardProps {
  data: PerformanceUpdate;
}

export function PerformanceCard({ data }: PerformanceCardProps) {
  const getTypeIcon = (type: PerformanceUpdate['type']) => {
    const icons: Record<PerformanceUpdate['type'], string> = {
      'review-completed': 'clipboard-check-solid',
      'review-due': 'clipboard-list-solid',
      'feedback-received': 'comments-solid',
      'goal-achieved': 'trophy-solid',
    };
    return icons[type];
  };

  const getTypeLabel = (type: PerformanceUpdate['type']) => {
    const labels: Record<PerformanceUpdate['type'], string> = {
      'review-completed': 'Review Completed',
      'review-due': 'Review Due',
      'feedback-received': 'Feedback',
      'goal-achieved': 'Goal Achieved',
    };
    return labels[type];
  };

  const getTypePillType = (type: PerformanceUpdate['type']): PillType => {
    const colors: Record<PerformanceUpdate['type'], PillType> = {
      'review-completed': PillType.Success,
      'review-due': PillType.Warning,
      'feedback-received': PillType.Info,
      'goal-achieved': PillType.Success,
    };
    return colors[type];
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
          <Pill muted type={getTypePillType(data.type)}>
            <Flex alignItems="center" gap={4}>
              <IconV2 name={getTypeIcon(data.type)} size={12} />
              {getTypeLabel(data.type)}
            </Flex>
          </Pill>
        </div>

        <Flex flexDirection="column" gap={8} marginTop={12}>
          <BodyText weight="semibold">{data.title}</BodyText>
          <BodyText size="small" color="neutral-weak">{data.description}</BodyText>

          {data.rating && (
            <Flex alignItems="center" gap={8}>
              <BodyText size="small" color="neutral-weak">Rating:</BodyText>
              <Flex alignItems="center" gap={4}>
                {[1, 2, 3, 4, 5].map(star => (
                  <IconV2
                    key={star}
                    name={star <= Math.floor(data.rating!) ? 'star-solid' : 'star-regular'}
                    color={star <= data.rating! ? 'warning-strong' : 'neutral-weak'}
                    size={16}
                  />
                ))}
                <BodyText size="small" weight="medium">{data.rating}/5</BodyText>
              </Flex>
            </Flex>
          )}

          <div className="feed-card-meta">
            <IconV2 name="calendar-solid" size={12} color="neutral-weak" />
            <BodyText size="extra-small" color="neutral-weak">{data.date}</BodyText>
          </div>
        </Flex>
      </Gridlet.Body>
    </Gridlet>
  );
}
