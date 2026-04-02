import { useState } from 'react';
import { Gridlet, BodyText, Headline, IconV2, ProgressBar, Pill, PillType, InlineMessage, Button } from '@bamboohr/fabric';
import type { TeamHealthMetrics } from '../../../data/hrManagerHomeTypes';

interface TeamHealthCardProps {
  metrics: TeamHealthMetrics;
}

export function TeamHealthCard({ metrics }: TeamHealthCardProps) {
  const [showEngagementAlert, setShowEngagementAlert] = useState(true);
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'arrow-trend-up-solid';
    if (trend === 'down') return 'arrow-trend-down-solid';
    return 'minus-solid';
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable'): 'success-strong' | 'error-strong' | 'neutral-strong' => {
    if (trend === 'up') return 'success-strong';
    if (trend === 'down') return 'error-strong';
    return 'neutral-strong';
  };

  const getTurnoverRiskType = (risk: TeamHealthMetrics['turnoverRisk']): PillType => {
    const types: Record<TeamHealthMetrics['turnoverRisk'], PillType> = {
      low: PillType.Success,
      medium: PillType.Warning,
      high: PillType.Error,
    };
    return types[risk];
  };

  return (
    <Gridlet header={<Gridlet.Header title="Team Health" />}>
      <Gridlet.Body>
        <div className="team-health-content">
          <div className="health-metrics-grid">
            <div className="health-metric-item">
              <BodyText size="small" color="neutral-weak">Engagement Score</BodyText>
              <div className="health-metric-row">
                <Headline size="medium">{metrics.engagementScore}%</Headline>
                <IconV2
                  name={getTrendIcon(metrics.engagementTrend)}
                  color={getTrendColor(metrics.engagementTrend)}
                  size={16}
                />
              </div>
              <ProgressBar current={metrics.engagementScore} total={100} />
            </div>

            <div className="health-metric-item">
              <BodyText size="small" color="neutral-weak">Satisfaction Score</BodyText>
              <div className="health-metric-row">
                <Headline size="medium">{metrics.satisfactionScore}%</Headline>
                <IconV2
                  name={getTrendIcon(metrics.satisfactionTrend)}
                  color={getTrendColor(metrics.satisfactionTrend)}
                  size={16}
                />
              </div>
              <ProgressBar current={metrics.satisfactionScore} total={100} />
            </div>

            <div className="health-metric-item">
              <BodyText size="small" color="neutral-weak">Turnover Risk</BodyText>
              <Pill muted type={getTurnoverRiskType(metrics.turnoverRisk)}>
                {metrics.turnoverRisk.charAt(0).toUpperCase() + metrics.turnoverRisk.slice(1)}
              </Pill>
            </div>

            <div className="health-metric-item">
              <BodyText size="small" color="neutral-weak">Active Employees</BodyText>
              <Headline size="medium">{metrics.activeEmployees}</Headline>
              <BodyText size="extra-small" color="neutral-weak">
                {metrics.onLeaveCount} on leave
              </BodyText>
            </div>
          </div>

          {/* AI Recommendations */}
          {showEngagementAlert && (
            <InlineMessage
              status="ai"
              title="Engagement Opportunity Detected"
              description="Based on recent survey data, the Engineering team's engagement dropped 8% this month. I recommend scheduling a team retrospective to address concerns."
              action={
                <Button size="small" color="ai" variant="outlined" onClick={() => setShowEngagementAlert(false)}>
                  Schedule Retro
                </Button>
              }
            />
          )}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
