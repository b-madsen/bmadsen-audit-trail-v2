import { Gridlet, Avatar, BodyText, Pill, PillType, Button, Flex, NameValuePair } from '@bamboohr/fabric';
import type { FeedItem, TimeOffRequest } from '../../../../data/hrManagerHomeTypes';
import { getAbsenceTypeLabel } from '../../../../data/mockHRManagerData';

interface TimeOffTableProps {
  items: FeedItem[];
}

export function TimeOffTable({ items }: TimeOffTableProps) {
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
    <Gridlet header={<Gridlet.Header title="Time Off Requests" />}>
      <Gridlet.Body>
        <div className="feed-table-container">
          <table className="feed-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const data = item.data as TimeOffRequest;
                const employee = data.employee;

                return (
                  <tr key={`timeoff-${index}`}>
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
                      <Pill muted type={getTypePillType(data.type)}>
                        {getAbsenceTypeLabel(data.type)}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small">
                        {data.startDate} — {data.endDate}
                      </BodyText>
                    </td>
                    <td>
                      <BodyText size="small">
                        {data.totalDays} {data.totalDays === 1 ? 'day' : 'days'}
                      </BodyText>
                    </td>
                    <td>
                      <Pill muted type={getStatusPillType(data.status)}>
                        {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                      </Pill>
                    </td>
                    <td>
                      {data.status === 'pending' ? (
                        <Flex gap={8}>
                          <Button size="small" color="primary" icon="check-solid">
                            Approve
                          </Button>
                          <Button size="small" color="secondary" icon="xmark-solid">
                            Deny
                          </Button>
                        </Flex>
                      ) : (
                        <Button size="small" color="secondary" icon="eye-solid">
                          View
                        </Button>
                      )}
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
