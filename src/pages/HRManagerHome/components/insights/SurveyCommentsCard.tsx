import { Gridlet, BodyText, Pill, PillType, Avatar, IconV2, InlineMessage, Button } from '@bamboohr/fabric';
import type { SurveyComment } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface SurveyCommentsCardProps {
  comments: SurveyComment[];
}

export function SurveyCommentsCard({ comments }: SurveyCommentsCardProps) {
  const negativeCount = comments.filter(c => c.sentiment === 'negative').length;
  const positiveCount = comments.filter(c => c.sentiment === 'positive').length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSentimentPillType = (sentiment: SurveyComment['sentiment']): PillType => {
    if (sentiment === 'positive') return PillType.Success;
    if (sentiment === 'negative') return PillType.Error;
    return PillType.Neutral;
  };

  const getCategoryLabel = (category: SurveyComment['category']) => {
    const labels = {
      engagement: 'Engagement',
      satisfaction: 'Satisfaction',
      management: 'Management',
      culture: 'Culture',
      growth: 'Growth',
    };
    return labels[category];
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Recent Survey Comments (${comments.length} total)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {/* Summary */}
          <div className="training-status-summary">
            <div className="training-stat">
              <IconV2 name="face-smile-solid" size={20} color="success-strong" />
              <div>
                <BodyText weight="semibold">{positiveCount}</BodyText>
                <BodyText size="extra-small" color="neutral-weak">Positive</BodyText>
              </div>
            </div>
            <div className="training-stat training-stat--overdue">
              <IconV2 name="face-frown-solid" size={20} color="error-strong" />
              <div>
                <BodyText weight="semibold">{negativeCount}</BodyText>
                <BodyText size="extra-small" color="neutral-weak">Negative</BodyText>
              </div>
            </div>
            <div className="training-stat">
              <IconV2 name="face-meh-solid" size={20} color="neutral-strong" />
              <div>
                <BodyText weight="semibold">{comments.length - positiveCount - negativeCount}</BodyText>
                <BodyText size="extra-small" color="neutral-weak">Neutral</BodyText>
              </div>
            </div>
          </div>

          {negativeCount > 0 && (
            <InlineMessage
              status="warning"
              title="Action Needed"
              description={`${negativeCount} negative comments require attention. Review and consider follow-up conversations.`}
            />
          )}

          <div className="survey-comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className={`survey-comment-item survey-comment-item--${comment.sentiment}`}>
                <div className="survey-comment-header">
                  {comment.anonymous ? (
                    <div className="employee-cell">
                      <Avatar size={32} />
                      <div className="employee-info">
                        <BodyText size="small" weight="medium">Anonymous</BodyText>
                        <BodyText size="extra-small" color="neutral-weak">{comment.department}</BodyText>
                      </div>
                    </div>
                  ) : (
                    <div className="employee-cell">
                      <Avatar
                        src={comment.employee?.photoUrl}
                        alt={`${comment.employee?.firstName} ${comment.employee?.lastName}`}
                        size={32}
                      />
                      <div className="employee-info">
                        <BodyText size="small" weight="medium">
                          {comment.employee?.firstName} {comment.employee?.lastName}
                        </BodyText>
                        <BodyText size="extra-small" color="neutral-weak">{comment.department}</BodyText>
                      </div>
                    </div>
                  )}
                  <div className="survey-comment-meta">
                    <Pill muted type={getSentimentPillType(comment.sentiment)}>
                      {comment.sentiment.charAt(0).toUpperCase() + comment.sentiment.slice(1)}
                    </Pill>
                    <Pill muted type={PillType.Info}>
                      {getCategoryLabel(comment.category)}
                    </Pill>
                  </div>
                </div>
                <BodyText size="small">&quot;{comment.comment}&quot;</BodyText>
                <BodyText size="extra-small" color="neutral-weak">{formatDate(comment.date)}</BodyText>
              </div>
            ))}
          </div>

          <Button variant="outlined" color="secondary">
            View All Comments
          </Button>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
