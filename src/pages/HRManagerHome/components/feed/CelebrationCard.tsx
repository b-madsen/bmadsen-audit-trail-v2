import { Gridlet, Flex, Avatar, BodyText, Headline, IconV2, InlineMessage, Button } from '@bamboohr/fabric';
import type { Celebration } from '../../../../data/hrManagerHomeTypes';

interface CelebrationCardProps {
  data: Celebration;
  aiSuggestion?: string;
}

export function CelebrationCard({ data, aiSuggestion }: CelebrationCardProps) {
  const getTypeIcon = (type: Celebration['type']) => {
    const icons: Record<Celebration['type'], string> = {
      birthday: 'cake-candles-solid',
      'work-anniversary': 'award-solid',
      achievement: 'trophy-solid',
    };
    return icons[type];
  };

  const getTypeLabel = (type: Celebration['type']) => {
    if (type === 'birthday') return 'Birthday';
    if (type === 'work-anniversary') return `${data.yearsOfService} Year Anniversary`;
    if (type === 'achievement') return data.achievementTitle || 'Achievement';
    return type;
  };

  const getTypeBgColor = (type: Celebration['type']) => {
    const colors: Record<Celebration['type'], string> = {
      birthday: '#fef3c7',
      'work-anniversary': '#dbeafe',
      achievement: '#dcfce7',
    };
    return colors[type];
  };

  return (
    <Gridlet>
      <Gridlet.Body>
        <Flex flexDirection="column" gap={12}>
          <Flex alignItems="center" gap={16}>
            <div style={{ position: 'relative' }}>
              <Avatar
                src={data.employee.photoUrl}
                alt={`${data.employee.firstName} ${data.employee.lastName}`}
                size={48}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  backgroundColor: getTypeBgColor(data.type),
                  borderRadius: '50%',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconV2 name={getTypeIcon(data.type)} size={16} />
              </div>
            </div>
            <div className="feed-card-info">
              <Headline size="extra-small">
                {data.employee.firstName} {data.employee.lastName}
              </Headline>
              <BodyText size="small" color="neutral-weak">
                {data.employee.jobTitle} · {data.employee.department}
              </BodyText>
            </div>
          </Flex>

          <Flex alignItems="center" gap={8} style={{ backgroundColor: getTypeBgColor(data.type), padding: '8px 12px', borderRadius: 8 }}>
            <IconV2 name={getTypeIcon(data.type)} size={16} />
            <BodyText weight="semibold">{getTypeLabel(data.type)}</BodyText>
            <BodyText size="small" color="neutral-weak">· {data.date}</BodyText>
          </Flex>

          {aiSuggestion && (
            <InlineMessage status="ai" title="AI Suggestion" description={aiSuggestion} />
          )}

          <Flex gap={8}>
            <Button size="small" icon="envelope-solid">
              Send Message
            </Button>
            <Button size="small" icon="gift-solid">
              Send Gift
            </Button>
          </Flex>
        </Flex>
      </Gridlet.Body>
    </Gridlet>
  );
}
