import { Gridlet, BodyText, Headline, Pill, PillType, IconV2, Button } from '@bamboohr/fabric';
import type { DepartmentMetrics } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface DepartmentInsightsCardProps {
  departments: DepartmentMetrics[];
}

export function DepartmentInsightsCard({ departments }: DepartmentInsightsCardProps) {
  // Sort by engagement score to highlight departments needing attention
  const sortedDepts = [...departments].sort((a, b) => a.engagementScore - b.engagementScore);
  const needsAttention = sortedDepts.filter(d => d.engagementScore < 75 || d.turnoverRisk !== 'low');

  const getRiskPillType = (risk: 'low' | 'medium' | 'high'): PillType => {
    if (risk === 'high') return PillType.Error;
    if (risk === 'medium') return PillType.Warning;
    return PillType.Success;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable'): 'success-strong' | 'error-strong' | 'neutral-strong' => {
    if (trend === 'up') return 'success-strong';
    if (trend === 'down') return 'error-strong';
    return 'neutral-strong';
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Department Insights (${needsAttention.length} need attention)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="department-grid">
            {sortedDepts.map((dept) => (
              <div key={dept.name} className="department-card">
                <div className="department-card-header">
                  <div>
                    <BodyText weight="semibold">{dept.name}</BodyText>
                    <BodyText size="extra-small" color="neutral-weak">
                      {dept.employeeCount} employees
                    </BodyText>
                  </div>
                  <Pill muted type={getRiskPillType(dept.turnoverRisk)}>
                    {dept.turnoverRisk === 'high' ? 'High Risk' : dept.turnoverRisk === 'medium' ? 'Medium' : 'Low Risk'}
                  </Pill>
                </div>

                <div className="department-card-metrics">
                  <div className="department-metric">
                    <BodyText size="extra-small" color="neutral-weak">Engagement</BodyText>
                    <div className="quarter-trend">
                      <Headline size="small">{dept.engagementScore}%</Headline>
                      <IconV2
                        name={dept.engagementTrend === 'up' ? 'arrow-up-solid' : dept.engagementTrend === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                        size={12}
                        color={getTrendColor(dept.engagementTrend)}
                      />
                    </div>
                  </div>

                  <div className="department-metric">
                    <BodyText size="extra-small" color="neutral-weak">Satisfaction</BodyText>
                    <Headline size="small">{dept.satisfactionScore}%</Headline>
                  </div>

                  <div className="department-metric">
                    <BodyText size="extra-small" color="neutral-weak">Open Roles</BodyText>
                    <Headline size="small">{dept.openPositions}</Headline>
                  </div>
                </div>

                {(dept.engagementScore < 70 || dept.turnoverRisk === 'high') && (
                  <Button size="small" variant="outlined" color="secondary">
                    View Details
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
