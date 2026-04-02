import { Gridlet, Flex, Avatar, BodyText, Headline, Pill, PillType, IconV2, Button } from '@bamboohr/fabric';
import type { TimeOffRequest } from '../../../../data/hrManagerHomeTypes';
import { getAbsenceTypeLabel } from '../../../../data/mockHRManagerData';

interface TimeOffCardProps {
  data: TimeOffRequest;
}

export function TimeOffCard({ data }: TimeOffCardProps) {
  const getStatusPillType = (status: TimeOffRequest['status']): PillType => {
    const types: Record<TimeOffRequest['status'], PillType> = {
      pending: PillType.Warning,
      approved: PillType.Success,
      denied: PillType.Error,
    };
    return types[status];
  };

  const getTypePillType = (type: TimeOffRequest['type']): PillType => {
    const types: Record<TimeOffRequest['type'], PillType> = {
      vacation: PillType.Info,
      sick: PillType.Warning,
      personal: PillType.Neutral,
      parental: PillType.Success,
    };
    return types[type];
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
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </Pill>
        </div>

        <Flex flexDirection="column" gap={12} marginTop={12}>
          <Flex alignItems="center" gap={8}>
            <Pill muted type={getTypePillType(data.type)}>
              {getAbsenceTypeLabel(data.type)}
            </Pill>
            <BodyText size="small" color="neutral-weak">
              {data.totalDays} {data.totalDays === 1 ? 'day' : 'days'}
            </BodyText>
          </Flex>

          <div className="timeoff-dates">
            <IconV2 name="calendar-solid" size={16} color="neutral-weak" />
            <BodyText size="small">
              {data.startDate} — {data.endDate}
            </BodyText>
          </div>

          <BodyText size="extra-small" color="neutral-weak">
            Requested on {data.requestedOn}
          </BodyText>

          {data.status === 'pending' && (
            <div className="timeoff-actions">
              <Button color="primary" size="small" icon="check-solid">
                Approve
              </Button>
              <Button size="small" icon="xmark-solid">
                Deny
              </Button>
            </div>
          )}
        </Flex>
      </Gridlet.Body>
    </Gridlet>
  );
}
