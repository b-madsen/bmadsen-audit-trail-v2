import { Link as RouterLink } from 'react-router-dom';
import { PageHeaderV2, Section, Headline, BodyText, Button, IconV2 } from '@bamboohr/fabric';
import './Benefits.css';

export function Benefits() {
  return (
    <div className="benefits-page">
      <PageHeaderV2 title="Benefits Administration" />

      <div className="benefits-sections">
        <Section>
          <div className="benefits-welcome">
            <Headline size="extra-large" color="primary">
              Welcome to<br />Benefits Administration!
            </Headline>
            <Headline size="small" color="neutral-strong">
              Collect elections directly from employees and handoff enrollment data to carriers, all within BambooHR. We'll do the heavy lifting along the way.
            </Headline>
          </div>
        </Section>

        <Section>
          <div className="benefits-getting-started">
            <div className="benefits-lets-go">
              <div className="benefits-lets-go-icon">
                <IconV2 name="heart-pulse-regular" size={20} color="primary-strong" />
              </div>
              <div>
                <BodyText size="medium" weight="semibold" color="primary">Let's Go!</BodyText>
                <BodyText size="small" color="neutral-weak">
                  We'll walk you through a few key steps to get your first Plan Year launched and start managing employee enrollments.
                </BodyText>
              </div>
            </div>

            <div className="benefits-steps">
              <div className="benefits-step-card">
                <div className="benefits-step-badge">
                  <BodyText size="medium" weight="semibold" color="primary">1</BodyText>
                </div>
                <div className="benefits-step-body">
                  <Headline size="small" color="primary">Add &amp; Review Plans</Headline>
                  <BodyText size="small">
                    Add plans you want to manage in BambooHR or review existing plans for missing details.
                  </BodyText>
                </div>
                <div className="benefits-step-footer">
                  <BodyText size="small" color="neutral-weak">0 plans added</BodyText>
                  <Button variant="outlined" size="small" component={RouterLink} to="/benefits/plans">
                    Go to Plans
                  </Button>
                </div>
              </div>

              <div className="benefits-step-card">
                <div className="benefits-step-badge">
                  <BodyText size="medium" weight="semibold" color="primary">2</BodyText>
                </div>
                <div className="benefits-step-body">
                  <Headline size="small" color="primary">Verify Carriers</Headline>
                  <BodyText size="small">
                    We need a few details to make sure enrollment data is getting to the right place.
                  </BodyText>
                </div>
                <div className="benefits-step-footer">
                  <BodyText size="small" color="neutral-weak">0 carriers added</BodyText>
                  <Button variant="outlined" size="small" component={RouterLink} to="/benefits/carriers">
                    Go to Carriers
                  </Button>
                </div>
              </div>

              {/* Disabled until at least one plan exists */}
              <div className="benefits-step-card">
                <div className="benefits-step-badge">
                  <BodyText size="medium" weight="semibold" color="primary">3</BodyText>
                </div>
                <div className="benefits-step-body">
                  <Headline size="small" color="primary">Create a Plan Year</Headline>
                  <BodyText size="small">
                    Setup enrollment rules for the plans that will be effective this year.
                  </BodyText>
                </div>
                <div className="benefits-step-footer">
                  <BodyText size="small" color="neutral-weak">
                    You'll need at least one plan to start a plan year
                  </BodyText>
                  <Button variant="outlined" size="small" disabled>
                    Create Plan Year
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

export default Benefits;
