import { Gridlet, BodyText, Avatar, Button, Pill, PillType, IconV2 } from '@bamboohr/fabric';
import type { Celebration } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface UpcomingCelebrationsCardProps {
  celebrations: Celebration[];
}

export function UpcomingCelebrationsCard({ celebrations }: UpcomingCelebrationsCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'long' });
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getCelebrationLabel = (celebration: Celebration) => {
    if (celebration.type === 'birthday') {
      return 'Birthday';
    }
    if (celebration.type === 'work-anniversary') {
      return `${celebration.yearsOfService} Year Anniversary`;
    }
    return '';
  };

  const getCelebrationIcon = (type: Celebration['type']) => {
    if (type === 'birthday') return 'cake-candles-solid';
    return 'award-solid';
  };

  // Sort by date (soonest first)
  const sortedCelebrations = [...celebrations].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Gridlet header={<Gridlet.Header title={`Upcoming Celebrations (${celebrations.length})`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Celebration</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedCelebrations.map((celebration) => (
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
                        <IconV2
                          name={getCelebrationIcon(celebration.type)}
                          size={16}
                          color={celebration.type === 'birthday' ? 'info-medium' : 'warning-strong'}
                        />
                        <Pill muted type={celebration.type === 'birthday' ? PillType.Info : PillType.Warning}>
                          {getCelebrationLabel(celebration)}
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
                        Send Note
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
