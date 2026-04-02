import { useState } from 'react';
import { Gridlet, InlineMessage, Button } from '@bamboohr/fabric';
import type { PriorityAlert } from '../../../data/hrManagerHomeTypes';

interface PriorityAlertsCardProps {
  alerts: PriorityAlert[];
}

export function PriorityAlertsCard({ alerts }: PriorityAlertsCardProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());
  const [showComplianceAlert, setShowComplianceAlert] = useState(true);
  const [showReviewAlert, setShowReviewAlert] = useState(true);

  const dismissAlert = (id: number) => {
    setDismissedAlerts(prev => new Set(prev).add(id));
  };

  const getAlertAction = (alert: PriorityAlert) => {
    if (alert.type === 'ai') {
      return (
        <Button size="small" color="ai" variant="outlined" onClick={() => dismissAlert(alert.id)}>
          {alert.actionLabel || 'Take Action'}
        </Button>
      );
    }
    return (
      <Button size="small" color="secondary" onClick={() => dismissAlert(alert.id)}>
        {alert.actionLabel || 'View'}
      </Button>
    );
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));

  return (
    <Gridlet header={<Gridlet.Header title="Priority Alerts" />}>
      <Gridlet.Body>
        <div className="priority-alerts-list">
          {visibleAlerts.map(alert => (
            <InlineMessage
              key={alert.id}
              status={alert.type}
              title={alert.title}
              description={alert.description}
              action={getAlertAction(alert)}
            />
          ))}

          {/* Proactive AI Detection */}
          {showComplianceAlert && (
            <InlineMessage
              status="ai"
              title="Compliance Action Required"
              description="I detected 12 employees with expired I-9 documents. I can send automated reminders and track completion for you."
              action={
                <Button size="small" color="ai" variant="outlined" onClick={() => setShowComplianceAlert(false)}>
                  Send Reminders
                </Button>
              }
            />
          )}

          {showReviewAlert && (
            <InlineMessage
              status="ai"
              title="Performance Review Cycle Starting"
              description="Q1 reviews are due in 2 weeks. I can auto-assign reviewers based on org structure and send calendar invites."
              action={
                <Button size="small" color="ai" variant="outlined" onClick={() => setShowReviewAlert(false)}>
                  Start Review Cycle
                </Button>
              }
            />
          )}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
