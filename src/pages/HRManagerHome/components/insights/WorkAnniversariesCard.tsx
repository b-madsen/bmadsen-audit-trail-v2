import { Gridlet, BodyText, Avatar, Button, Pill, PillType, IconV2 } from '@bamboohr/fabric';
import type { Celebration } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface WorkAnniversariesCardProps {
  celebrations: Celebration[];
}

export function WorkAnniversariesCard({ celebrations }: WorkAnniversariesCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getMilestoneLabel = (years?: number) => {
    if (!years) return '';
    if (years === 1) return '1st Year';
    if (years === 5) return '5 Years';
    if (years === 10) return '10 Years';
    if (years === 15) return '15 Years';
    if (years === 20) return '20 Years';
    return `${years} Years`;
  };

  const isMilestone = (years?: number) => {
    return years && [1, 5, 10, 15, 20, 25].includes(years);
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Work Anniversaries This Month (${celebrations.length} celebrating)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Anniversary</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {celebrations.map((celebration) => (
                  <tr key={celebration.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar
                          src={celebration.employee.photoUrl}
                          alt={`${celebration.employee.firstName} ${celebration.employee.lastName}`}
                          size={32}
                        />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">
                            {celebration.employee.firstName} {celebration.employee.lastName}
                          </BodyText>
                          <BodyText size="extra-small" color="neutral-weak">
                            {celebration.employee.jobTitle}
                          </BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="quarter-trend">
                        {isMilestone(celebration.yearsOfService) && (
                          <IconV2 name="star-solid" size={16} color="warning-strong" />
                        )}
                        <Pill muted type={isMilestone(celebration.yearsOfService) ? PillType.Warning : PillType.Info}>
                          {getMilestoneLabel(celebration.yearsOfService)}
                        </Pill>
                      </div>
                    </td>
                    <td>
                      <BodyText size="small">{formatDate(celebration.date)}</BodyText>
                    </td>
                    <td>
                      <Button
                        size="small"
                        color="ai"
                        variant="outlined"
                        startIcon={<IconV2 name="sparkles-solid" size={16} />}
                      >
                        Generate Message
                      </Button>
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
