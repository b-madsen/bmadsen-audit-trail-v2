import { IconV2, Headline, BodyText } from '@bamboohr/fabric';

interface TalentPoolCardProps {
  icon: string;
  title: string;
  candidatesCount: number;
  onClick?: () => void;
}

export function TalentPoolCard({ icon, title, candidatesCount, onClick }: TalentPoolCardProps) {
  // Convert icon name to Fabric format (add -solid suffix if not present)
  const fabricIconName = icon.includes('-solid') || icon.includes('-regular')
    ? icon
    : `${icon}-solid`;

  return (
    <button
      onClick={onClick}
      className="bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-extra-weak)] rounded-lg p-5 flex flex-col gap-4 items-start w-[224px] hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] transition-colors cursor-pointer text-left"
    >
      {/* Icon box */}
      <div className="w-12 h-12 bg-[var(--fabric-surface-color-neutral-extra-weak)] rounded-xl flex items-center justify-center">
        <IconV2 name={fabricIconName as any} size={24} color="primary-strong" />
      </div>

      {/* Content */}
      <div className="w-full">
        <Headline size="extra-small" color="primary">
          {title}
        </Headline>
        <BodyText size="extra-small">
          {candidatesCount} Candidate{candidatesCount !== 1 ? 's' : ''}
        </BodyText>
      </div>
    </button>
  );
}

export default TalentPoolCard;
