import { Gridlet, Avatar, BodyText, Pill, PillType, Button, IconV2, Flex, NameValuePair } from '@bamboohr/fabric';
import type { FeedItem, Celebration } from '../../../../data/hrManagerHomeTypes';

interface CelebrationsTableProps {
  items: FeedItem[];
}

export function CelebrationsTable({ items }: CelebrationsTableProps) {
  const getTypeLabel = (data: Celebration): string => {
    if (data.type === 'birthday') return 'Birthday';
    if (data.type === 'work-anniversary') return `${data.yearsOfService} Year Anniversary`;
    if (data.type === 'achievement') return data.achievementTitle || 'Achievement';
    return data.type;
  };

  const getTypePillType = (type: Celebration['type']): PillType => {
    const types: Record<Celebration['type'], PillType> = {
      birthday: PillType.Warning,
      'work-anniversary': PillType.Info,
      achievement: PillType.Success,
    };
    return types[type];
  };

  const getTypeIcon = (type: Celebration['type']): string => {
    const icons: Record<Celebration['type'], string> = {
      birthday: 'cake-candles-solid',
      'work-anniversary': 'award-solid',
      achievement: 'trophy-solid',
    };
    return icons[type];
  };

  return (
    <Gridlet header={<Gridlet.Header title="Celebrations" />}>
      <Gridlet.Body>
        <div className="feed-table-container">
          <table className="feed-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Celebration</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const data = item.data as Celebration;
                const employee = data.employee;

                return (
                  <tr key={`celebration-${index}`}>
                    <td className="employee-cell">
                      <Avatar
                        src={employee.photoUrl}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        size={32}
                      />
                      <NameValuePair
                        name={`${employee.firstName} ${employee.lastName}`}
                        value={`${employee.jobTitle} · ${employee.department}`}
                      />
                    </td>
                    <td>
                      <Flex alignItems="center" gap={8}>
                        <IconV2 name={getTypeIcon(data.type)} size={16} />
                        <Pill muted type={getTypePillType(data.type)}>
                          {getTypeLabel(data)}
                        </Pill>
                      </Flex>
                    </td>
                    <td>
                      <BodyText size="small">{data.date}</BodyText>
                    </td>
                    <td>
                      <Flex gap={8}>
                        <Button size="small" color="primary" icon="envelope-solid">
                          Send Message
                        </Button>
                        <Button size="small" color="secondary" icon="gift-solid">
                          Send Gift
                        </Button>
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
