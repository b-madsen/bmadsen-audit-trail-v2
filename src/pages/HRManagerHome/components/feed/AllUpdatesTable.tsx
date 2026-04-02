import { useState } from 'react';
import { Gridlet, Avatar, BodyText, Pill, PillType, Button, IconButton, NameValuePair, SelectField, InlineMessage } from '@bamboohr/fabric';
import type { FeedItem } from '../../../../data/hrManagerHomeTypes';
import { filterFeedItems } from '../../../../data/mockHRManagerData';

interface AllUpdatesTableProps {
  items: FeedItem[];
}

type FilterType = 'all' | 'performance' | 'timeoff' | 'celebrations';

export function AllUpdatesTable({ items }: AllUpdatesTableProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showBatchApprovalAlert, setShowBatchApprovalAlert] = useState(true);
  const [showBirthdayAlert, setShowBirthdayAlert] = useState(true);

  const filteredItems = filterFeedItems(items, filter);

  const getTypeLabel = (item: FeedItem): string => {
    switch (item.type) {
      case 'performance':
        return 'Performance';
      case 'celebration':
        return 'Celebration';
      case 'timeoff':
        return 'Time Off';
      case 'goal':
        return 'Goal';
      default:
        return 'Update';
    }
  };

  const getTypePillType = (item: FeedItem): PillType => {
    switch (item.type) {
      case 'performance':
        return PillType.Info;
      case 'celebration':
        return PillType.Success;
      case 'timeoff':
        return PillType.Warning;
      case 'goal':
        return PillType.Neutral;
      default:
        return PillType.Neutral;
    }
  };

  const getDescription = (item: FeedItem): string => {
    switch (item.type) {
      case 'performance':
        return item.data.title;
      case 'celebration':
        if (item.data.type === 'birthday') return 'Birthday';
        if (item.data.type === 'work-anniversary') return `${item.data.yearsOfService} Year Anniversary`;
        return item.data.achievementTitle || 'Achievement';
      case 'timeoff':
        return `${item.data.startDate} - ${item.data.endDate}`;
      case 'goal':
        return `${item.data.goalTitle} (${item.data.progress}%)`;
      default:
        return '';
    }
  };

  const getEmployee = (item: FeedItem) => {
    return item.data.employee;
  };

  const getActionButton = (item: FeedItem) => {
    switch (item.type) {
      case 'timeoff':
        if (item.data.status === 'pending') {
          return (
            <>
              <IconButton size="small" variant="outlined" color="secondary" icon="check-solid" aria-label="Approve" />
              <IconButton size="small" variant="outlined" color="secondary" icon="xmark-solid" aria-label="Deny" />
            </>
          );
        }
        return (
          <IconButton size="small" variant="outlined" color="secondary" icon="eye-solid" aria-label="View" />
        );
      case 'celebration':
        return (
          <>
            <IconButton size="small" variant="outlined" color="secondary" icon="envelope-solid" aria-label="Message" />
            <IconButton size="small" variant="outlined" color="secondary" icon="gift-solid" aria-label="Gift" />
          </>
        );
      case 'performance':
      case 'goal':
        return (
          <IconButton size="small" variant="outlined" color="secondary" icon="eye-solid" aria-label="View" />
        );
      default:
        return (
          <IconButton size="small" variant="outlined" color="secondary" icon="eye-solid" aria-label="View" />
        );
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Updates' },
    { value: 'performance', label: 'Performance' },
    { value: 'timeoff', label: 'Time Off' },
    { value: 'celebrations', label: 'Celebrations' },
  ];

  return (
    <Gridlet
      header={
        <Gridlet.Header
          title="Feed"
          right={
            <SelectField
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              size="small"
              width={10}
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          }
        />
      }
    >
      <Gridlet.Body>
        <div className="feed-content">
          {/* AI Smart Recommendations */}
          {(showBatchApprovalAlert || showBirthdayAlert) && (
            <div className="feed-ai-recommendations">
              {showBatchApprovalAlert && (
                <InlineMessage
                  status="ai"
                  title="3 Time Off Requests Ready for Batch Approval"
                  description="I've reviewed the pending requests and found no scheduling conflicts. All requesters have sufficient PTO balance."
                  action={
                    <Button size="small" color="ai" variant="outlined" onClick={() => setShowBatchApprovalAlert(false)}>
                      Approve All 3
                    </Button>
                  }
                />
              )}

              {showBirthdayAlert && (
                <InlineMessage
                  status="ai"
                  title="Birthday Messages Ready to Send"
                  description="Marcus Chen's birthday is today. I've drafted a personalized message based on his recent achievements. Would you like to review and send?"
                  action={
                    <Button size="small" color="ai" variant="outlined" onClick={() => setShowBirthdayAlert(false)}>
                      Send Message
                    </Button>
                  }
                />
              )}
            </div>
          )}

          <div className="feed-table-container">
          <table className="feed-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const employee = getEmployee(item);
                return (
                  <tr key={`feed-${index}`}>
                    <td>
                      <div className="employee-cell">
                        <Avatar
                          src={employee.photoUrl}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          size={32}
                        />
                        <NameValuePair
                          name={`${employee.firstName} ${employee.lastName}`}
                          value={employee.jobTitle}
                        />
                      </div>
                    </td>
                    <td>
                      <Pill muted type={getTypePillType(item)}>{getTypeLabel(item)}</Pill>
                    </td>
                    <td>
                      <BodyText size="small">{getDescription(item)}</BodyText>
                    </td>
                    <td>
                      <div className="actions-cell">
                        {getActionButton(item)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
