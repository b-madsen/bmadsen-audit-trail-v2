import { useState } from 'react';
import { IconV2, Headline, Tabs, Tab } from '@bamboohr/fabric';
import { GoalsTabContent } from './GoalsTabContent';
import { FeedbackTabContent } from './FeedbackTabContent';
import { AssessmentsTabContent } from './AssessmentsTabContent';

interface PerformanceTabContentProps {
  employeeName: string;
}

export function PerformanceTabContent({ employeeName }: PerformanceTabContentProps) {
  const [activeSubTab, setActiveSubTab] = useState('goals');

  return (
    <div className="my-info-sections">

      {/* Section header */}
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="gauge-high-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Performance</Headline>
        </div>
      </div>

      {/* Lined sub-tabs */}
      <Tabs value={activeSubTab} onChange={(value) => setActiveSubTab(value as string)} mode="line">
        <Tab icon="bullseye-arrow-regular" label="Goals" value="goals" />
        <Tab icon="users-regular" label="Feedback" value="feedback" />
        <Tab icon="temperature-half-regular" label="Assessments" value="assessments" />
      </Tabs>

      {/* Sub-tab content */}
      {activeSubTab === 'goals' && <GoalsTabContent employeeName={employeeName} />}
      {activeSubTab === 'feedback' && <FeedbackTabContent employeeName={employeeName} />}
      {activeSubTab === 'assessments' && <AssessmentsTabContent employeeName={employeeName} />}

    </div>
  );
}

export default PerformanceTabContent;
