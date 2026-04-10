import { Button, IconV2, Section, TileV2 } from '@bamboohr/fabric';
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
        {talentPools.map((pool) => {
          const iconName = pool.icon.includes('-solid') || pool.icon.includes('-regular')
            ? pool.icon
            : `${pool.icon}-solid`;
          return (
            <TileV2
              key={pool.id}
              icon={iconName as any}
              title={pool.title}
              description={`${pool.candidatesCount} Candidate${pool.candidatesCount !== 1 ? 's' : ''}`}
              orientation="vertical"
              titleSize="medium"
              width={200}
            />
          );
        })}
      </div>
    </Section>
  );
}

export default TalentPoolsTabContent;
