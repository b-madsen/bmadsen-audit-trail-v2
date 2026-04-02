import { Gridlet, BodyText, Pill, PillType, Avatar, InlineMessage, IconButton } from '@bamboohr/fabric';
import type { CoverageGap } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface CoverageGapsCardProps {
  gaps: CoverageGap[];
}

export function CoverageGapsCard({ gaps }: CoverageGapsCardProps) {
  const criticalGaps = gaps.filter(g => g.gapSeverity === 'critical');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getSeverityPillType = (severity: 'critical' | 'warning' | 'minor'): PillType => {
    if (severity === 'critical') return PillType.Error;
    if (severity === 'warning') return PillType.Warning;
    return PillType.Info;
  };

  const getSeverityLabel = (severity: 'critical' | 'warning' | 'minor'): string => {
    if (severity === 'critical') return 'Critical';
    if (severity === 'warning') return 'Warning';
    return 'Minor';
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Coverage Gaps This Week (${gaps.length} identified)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {criticalGaps.length > 0 && (
            <InlineMessage
              status="error"
              title={`${criticalGaps.length} critical coverage gap${criticalGaps.length > 1 ? 's' : ''}`}
              description="Immediate action needed to ensure adequate staffing."
            />
          )}

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Severity</th>
                  <th>Staffing</th>
                  <th>Conflicting Absences</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {gaps.map((gap) => (
                  <tr key={gap.id}>
                    <td>
                      <BodyText size="small" weight="medium">{formatDate(gap.date)}</BodyText>
                    </td>
                    <td>
                      <div className="employee-info">
                        <BodyText size="small" weight="medium">{gap.department}</BodyText>
                        <BodyText size="extra-small" color="neutral-weak">{gap.role}</BodyText>
                      </div>
                    </td>
                    <td>
                      <Pill muted type={getSeverityPillType(gap.gapSeverity)}>
                        {getSeverityLabel(gap.gapSeverity)}
                      </Pill>
                    </td>
                    <td>
                      <BodyText size="small">
                        {gap.availableStaff} / {gap.requiredCoverage} available
                      </BodyText>
                    </td>
                    <td>
                      {gap.conflictingAbsences.length > 0 ? (
                        <div className="coverage-absences-inline">
                          {gap.conflictingAbsences.slice(0, 3).map((absence) => (
                            <Avatar
                              key={absence.id}
                              src={absence.employee.photoUrl}
                              alt={`${absence.employee.firstName} ${absence.employee.lastName}`}
                              size={24}
                            />
                          ))}
                          {gap.conflictingAbsences.length > 3 && (
                            <BodyText size="extra-small" color="neutral-weak">
                              +{gap.conflictingAbsences.length - 3} more
                            </BodyText>
                          )}
                        </div>
                      ) : (
                        <BodyText size="small" color="neutral-weak">None</BodyText>
                      )}
                    </td>
                    <td>
                      <IconButton icon="user-magnifying-glass-regular" aria-label="Find coverage" size="small" variant="outlined" />
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
