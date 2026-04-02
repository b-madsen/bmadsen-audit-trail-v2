import { Gridlet, BodyText, Avatar, Button, Pill, PillType, InlineMessage, IconButton } from '@bamboohr/fabric';
import type { PerformanceUpdate } from '../../../../data/hrManagerHomeTypes';
import './InsightsCards.css';

interface OverdueReviewsCardProps {
  reviews: PerformanceUpdate[];
}

export function OverdueReviewsCard({ reviews }: OverdueReviewsCardProps) {
  const calculateDaysOverdue = (dateStr: string) => {
    const dueDate = new Date(dateStr);
    const today = new Date();
    return Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <Gridlet header={<Gridlet.Header title={`Overdue Reviews (${reviews.length} past due)`} />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="error"
            title="Reviews Overdue"
            description="These performance reviews are past their scheduled date. Completing reviews on time is important for employee development and engagement."
            action={
              <Button size="small" variant="outlined" color="secondary">
                Schedule All
              </Button>
            }
          />

          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Review Type</th>
                  <th>Days Overdue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => {
                  const daysOverdue = calculateDaysOverdue(review.date);
                  return (
                    <tr key={review.id}>
                      <td>
                        <div className="employee-cell">
                          <Avatar
                            src={review.employee.photoUrl}
                            alt={`${review.employee.firstName} ${review.employee.lastName}`}
                            size={32}
                          />
                          <div className="employee-info">
                            <BodyText size="small" weight="medium">
                              {review.employee.firstName} {review.employee.lastName}
                            </BodyText>
                            <BodyText size="extra-small" color="neutral-weak">
                              {review.employee.department}
                            </BodyText>
                          </div>
                        </div>
                      </td>
                      <td>
                        <BodyText size="small">{review.title}</BodyText>
                      </td>
                      <td>
                        <Pill muted type={daysOverdue > 14 ? PillType.Error : PillType.Warning}>
                          {daysOverdue} days
                        </Pill>
                      </td>
                      <td>
                        <IconButton icon="play-regular" aria-label="Start review" size="small" variant="outlined" />
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
