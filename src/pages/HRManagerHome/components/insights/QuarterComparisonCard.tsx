import { Gridlet, BodyText, Headline, IconV2 } from '@bamboohr/fabric';
import type { QuarterlyMetrics } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface QuarterComparisonCardProps {
  quarters: QuarterlyMetrics[];
}

export function QuarterComparisonCard({ quarters }: QuarterComparisonCardProps) {
  // Get last two quarters for comparison
  const currentQuarter = quarters[quarters.length - 1];
  const previousQuarter = quarters[quarters.length - 2];

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous;
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
    };
  };

  const engagementChange = calculateChange(currentQuarter.engagementScore, previousQuarter.engagementScore);
  const satisfactionChange = calculateChange(currentQuarter.satisfactionScore, previousQuarter.satisfactionScore);
  const turnoverChange = calculateChange(currentQuarter.turnoverRate, previousQuarter.turnoverRate);
  const headcountChange = calculateChange(currentQuarter.headcount, previousQuarter.headcount);

  const getTrendColor = (direction: string, inverse = false): 'success-strong' | 'error-strong' | 'neutral-strong' => {
    if (direction === 'stable') return 'neutral-strong';
    if (inverse) {
      return direction === 'up' ? 'error-strong' : 'success-strong';
    }
    return direction === 'up' ? 'success-strong' : 'error-strong';
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Quarterly Comparison: ${currentQuarter.quarter} ${currentQuarter.year} vs ${previousQuarter.quarter} ${previousQuarter.year}`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="quarter-metrics-row">
            <div className="quarter-metric-card">
              <BodyText size="small" color="neutral-weak">Engagement Score</BodyText>
              <div className="quarter-metric-value">
                <Headline size="medium">{currentQuarter.engagementScore}%</Headline>
                <div className="quarter-trend">
                  <IconV2
                    name={engagementChange.direction === 'up' ? 'arrow-up-solid' : engagementChange.direction === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                    size={16}
                    color={getTrendColor(engagementChange.direction)}
                  />
                  <BodyText
                    size="small"
                    color={getTrendColor(engagementChange.direction)}
                  >
                    {engagementChange.value} pts
                  </BodyText>
                </div>
              </div>
            </div>

            <div className="quarter-metric-card">
              <BodyText size="small" color="neutral-weak">Satisfaction Score</BodyText>
              <div className="quarter-metric-value">
                <Headline size="medium">{currentQuarter.satisfactionScore}%</Headline>
                <div className="quarter-trend">
                  <IconV2
                    name={satisfactionChange.direction === 'up' ? 'arrow-up-solid' : satisfactionChange.direction === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                    size={16}
                    color={getTrendColor(satisfactionChange.direction)}
                  />
                  <BodyText
                    size="small"
                    color={getTrendColor(satisfactionChange.direction)}
                  >
                    {satisfactionChange.value} pts
                  </BodyText>
                </div>
              </div>
            </div>
          </div>

          <div className="quarter-metrics-row">
            <div className="quarter-metric-card">
              <BodyText size="small" color="neutral-weak">Turnover Rate</BodyText>
              <div className="quarter-metric-value">
                <Headline size="medium">{currentQuarter.turnoverRate}%</Headline>
                <div className="quarter-trend">
                  <IconV2
                    name={turnoverChange.direction === 'up' ? 'arrow-up-solid' : turnoverChange.direction === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                    size={16}
                    color={getTrendColor(turnoverChange.direction, true)}
                  />
                  <BodyText
                    size="small"
                    color={getTrendColor(turnoverChange.direction, true)}
                  >
                    {turnoverChange.value.toFixed(1)}%
                  </BodyText>
                </div>
              </div>
            </div>

            <div className="quarter-metric-card">
              <BodyText size="small" color="neutral-weak">Headcount</BodyText>
              <div className="quarter-metric-value">
                <Headline size="medium">{currentQuarter.headcount}</Headline>
                <div className="quarter-trend">
                  <IconV2
                    name={headcountChange.direction === 'up' ? 'arrow-up-solid' : headcountChange.direction === 'down' ? 'arrow-down-solid' : 'minus-solid'}
                    size={16}
                    color={getTrendColor(headcountChange.direction)}
                  />
                  <BodyText
                    size="small"
                    color={getTrendColor(headcountChange.direction)}
                  >
                    {headcountChange.value}
                  </BodyText>
                </div>
              </div>
            </div>
          </div>

          {/* Trend bars */}
          <div className="bar-chart">
            <BodyText size="small" weight="semibold">5-Quarter Engagement Trend</BodyText>
            {quarters.map((q) => (
              <div key={`${q.quarter}-${q.year}`} className="bar-chart-row">
                <div className="bar-chart-label">
                  <BodyText size="extra-small" color="neutral-weak">{q.quarter} {q.year}</BodyText>
                </div>
                <div className="bar-chart-bar-container">
                  <div
                    className="bar-chart-bar bar-chart-bar--engagement"
                    style={{ width: `${q.engagementScore}%` }}
                  />
                </div>
                <div className="bar-chart-value">
                  <BodyText size="small" weight="medium">{q.engagementScore}%</BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
