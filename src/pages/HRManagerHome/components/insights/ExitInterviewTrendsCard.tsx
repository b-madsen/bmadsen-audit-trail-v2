import { Gridlet, BodyText, Headline, IconV2, InlineMessage, Button } from '@bamboohr/fabric';
import type { ExitInterviewTrend } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface ExitInterviewTrendsCardProps {
  trends: ExitInterviewTrend[];
  totalExits: number;
}

export function ExitInterviewTrendsCard({ trends, totalExits }: ExitInterviewTrendsCardProps) {
  const topReason = trends[0];

  const getTrendColor = (trend: 'up' | 'down' | 'stable'): 'error-strong' | 'success-strong' | 'neutral-strong' => {
    if (trend === 'up') return 'error-strong';
    if (trend === 'down') return 'success-strong';
    return 'neutral-strong';
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Exit Interview Trends (${totalExits} departures, 12mo)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI Insight"
            description={`"Career Growth" is the #1 reason for departures and is trending upward. Consider implementing more promotion paths and development opportunities.`}
            action={
              <Button size="small" color="ai" variant="outlined">
                View Recommendations
              </Button>
            }
          />

          <div className="trends-chart">
            {trends.map((trend) => (
              <div key={trend.reason} className="trend-row">
                <div className="trend-label">
                  <BodyText size="small" weight={trend === topReason ? 'semibold' : 'regular'}>
                    {trend.reason}
                  </BodyText>
                </div>
                <div className="trend-bar-container">
                  <div
                    className="trend-bar"
                    style={{ width: `${trend.percentage}%` }}
                  />
                </div>
                <div className="trend-value">
                  <BodyText size="small" weight="medium">{trend.percentage}%</BodyText>
                  <IconV2
                    name={trend.trend === 'up' ? 'arrow-up-solid' : trend.trend === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                    size={12}
                    color={getTrendColor(trend.trend)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="quarter-metrics-row">
            <div className="quarter-metric-card">
              <BodyText size="extra-small" color="neutral-weak">Total Departures (12mo)</BodyText>
              <Headline size="medium">{totalExits}</Headline>
            </div>
            <div className="quarter-metric-card">
              <BodyText size="extra-small" color="neutral-weak">Top Reason</BodyText>
              <BodyText weight="semibold">{topReason.reason}</BodyText>
              <BodyText size="small" color="error-strong">
                {topReason.count} employees ({topReason.percentage}%)
              </BodyText>
            </div>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
