import { useState, type ChangeEvent } from 'react';
import {
  PageHeaderV2,
  Tabs,
  Tab,
  Section,
  Button,
  IconV2,
  BodyText,
  Headline,
} from '@bamboohr/fabric';
import { CompensationIllustration } from '../../assets/CompensationIllustration';
import './Compensation.css';

type TabValue = 'levels' | 'rewards' | 'more';

export function Compensation() {
  const [activeTab, setActiveTab] = useState<TabValue>('levels');

  return (
    <div className="compensation-page">
      <PageHeaderV2 title="Compensation" />

      <div className="compensation-tabs">
        <Tabs
          value={activeTab}
          onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveTab(value as TabValue)}
          mode="line"
        >
          <Tab
            label={
              <span className="compensation-tab-label">
                <IconV2 name="table-list-regular" size={16} />
                Levels &amp; Bands
              </span>
            }
            value="levels"
          />
          <Tab
            label={
              <span className="compensation-tab-label">
                <IconV2 name="medal-regular" size={16} />
                Total Rewards
              </span>
            }
            value="rewards"
          />
          <Tab
            label={
              <span className="compensation-tab-label">
                <IconV2 name="circle-ellipsis-regular" size={16} />
                More
              </span>
            }
            value="more"
          />
        </Tabs>
      </div>

      {activeTab === 'levels' && (
        <Section>
          <Section.Header title="Levels and Bands" />
          <div className="compensation-blank-state">
            <CompensationIllustration />
            <Headline size="x-small" component="h3">No levels and bands data yet...</Headline>
            <BodyText size="medium" color="neutral-weak">
              Add levels &amp; bands to enable your company to track and manage job levels and pay bands effectively.
            </BodyText>
            <div className="compensation-blank-actions">
              <Button
                variant="outlined"
                className="compensation-btn-primary"
                startIcon={<IconV2 name="circle-plus-regular" size={16} />}
              >
                Add Levels &amp; Bands
              </Button>
              <Button
                variant="outlined"
                startIcon={<IconV2 name="file-import-regular" size={16} />}
              >
                Import Levels &amp; Bands
              </Button>
            </div>
          </div>
        </Section>
      )}

      {activeTab === 'rewards' && (
        <Section>
          <Section.Header title="Total Rewards" />
          <div className="compensation-blank-state">
            <IconV2 name="circle-user-regular" size={56} color="neutral-extra-weak" />
            <Headline size="x-small" component="h3">Nothing here yet...</Headline>
            <BodyText size="medium" color="neutral-weak">
              Total Rewards content will appear here.
            </BodyText>
          </div>
        </Section>
      )}

      {activeTab === 'more' && (
        <Section>
          <div className="compensation-blank-state">
            <IconV2 name="ellipsis-regular" size={56} color="neutral-extra-weak" />
            <Headline size="x-small" component="h3">More coming soon...</Headline>
            <BodyText size="medium" color="neutral-weak">
              Additional compensation features will appear here.
            </BodyText>
          </div>
        </Section>
      )}
    </div>
  );
}

export default Compensation;
