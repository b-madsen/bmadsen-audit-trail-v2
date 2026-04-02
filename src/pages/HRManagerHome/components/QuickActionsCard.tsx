import { useState } from 'react';
import { Gridlet, ActionTile, IconV2Name, InlineMessage, Button } from '@bamboohr/fabric';
import type { QuickAction } from '../../../data/hrManagerHomeTypes';
import '../HRManagerHome.css';

interface QuickActionsCardProps {
  actions: QuickAction[];
}

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  const [showAutomationAlert, setShowAutomationAlert] = useState(true);

  const getIconName = (icon: string): IconV2Name => {
    return `${icon}-solid` as IconV2Name;
  };

  return (
    <Gridlet header={<Gridlet.Header title="Quick Actions" />}>
      <Gridlet.Body>
        <div className="quick-actions-content">
          <div className="quick-actions-grid">
            {actions.map(action => (
              <ActionTile
                key={action.id}
                title={action.label}
                icon={getIconName(action.icon)}
                onClick={() => console.log(`Navigate to ${action.href}`)}
                variant={action.variant as 'ai' | undefined}
              />
            ))}
          </div>

          {/* AI-Powered Suggestions */}
          {showAutomationAlert && (
            <InlineMessage
              status="ai"
              title="Automate Your Weekly Tasks"
              description="I noticed you approve similar time-off requests every Monday. Would you like me to auto-approve requests that meet your usual criteria?"
              action={
                <Button size="small" color="ai" variant="outlined" onClick={() => setShowAutomationAlert(false)}>
                  Set Up Automation
                </Button>
              }
            />
          )}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
