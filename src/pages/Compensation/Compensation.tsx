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
        <>
          <div className="compensation-section-title">
            <Headline size="large" component="h2">Levels and Bands</Headline>
          </div>
          <Section>
            <div className="compensation-blank-state">
              <img
                src="/assets/images/compensation-blank-state.svg"
                alt=""
                className="compensation-blank-illustration"
              />
              <div className="compensation-blank-headline">
                <Headline size="medium" component="h3" color="neutral-weak">No levels and bands data yet...</Headline>
              </div>
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
        </>
      )}

      {activeTab === 'rewards' && (
        <>
          <div className="compensation-section-title">
            <Headline size="large" component="h2">Total Rewards</Headline>
          </div>
          <Section>
            <div className="compensation-blank-state">
              <IconV2 name="medal-regular" size={56} color="neutral-extra-weak" />
              <div className="compensation-blank-headline">
                <Headline size="medium" component="h3" color="neutral-weak">Nothing here yet...</Headline>
              </div>
              <BodyText size="medium" color="neutral-weak">
                Total Rewards content will appear here.
              </BodyText>
            </div>
          </Section>
        </>
      )}

      {activeTab === 'more' && (
        <Section>
          <div className="compensation-blank-state">
            <div className="compensation-blank-headline">
              <Headline size="medium" component="h3" color="neutral-weak">More coming soon...</Headline>
            </div>
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
