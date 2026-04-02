import { Button, IconV2, Section } from '@bamboohr/fabric';
import { TalentPoolCard } from '../../components';
import { talentPools } from '../../data/talentPools';

export function TalentPoolsTabContent() {
  return (
    <Section>
      {/* Actions Bar */}
      <div className="hiring-talent-pools-actions">
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          startIcon={<IconV2 name="circle-plus-solid" size={16} />}
        >
          New Talent Pool
        </Button>
      </div>

      {/* Talent Pool Cards */}
      <div className="hiring-talent-pools-grid">
        {talentPools.map((pool) => (
          <TalentPoolCard
            key={pool.id}
            icon={pool.icon}
            title={pool.title}
            candidatesCount={pool.candidatesCount}
            onClick={() => console.log(`Clicked ${pool.title}`)}
          />
        ))}
      </div>
    </Section>
  );
}

export default TalentPoolsTabContent;
