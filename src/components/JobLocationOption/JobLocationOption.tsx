import { IconV2, BodyText } from '@bamboohr/fabric';

interface JobLocationOptionProps {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function JobLocationOption({ icon, label, checked, onChange }: JobLocationOptionProps) {
  const fabricIconName = icon.includes('-solid') || icon.includes('-regular') ? icon : `${icon}-solid`;

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-4 p-5 flex-1 min-w-[200px] max-w-[223px] bg-[var(--fabric-surface-color-neutral-white)] border rounded-lg transition-all shadow-sm ${checked ? 'border-[var(--fabric-theme-color-primary-strong)] bg-[var(--fabric-surface-color-selected-weak)]' : 'border-[var(--fabric-border-color-neutral-extra-weak)] hover:border-[var(--fabric-border-color-neutral-weak)]'}`}
    >
      <div className="flex-1 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--fabric-surface-color-neutral-extra-weak)]">
          <IconV2 name={fabricIconName as any} size={24} color="primary-strong" />
        </div>
        <BodyText size="large" weight="medium" color="primary">
          {label}
        </BodyText>
      </div>
      <div
        className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${checked ? 'bg-[var(--fabric-theme-color-primary-strong)] border border-[var(--fabric-theme-color-primary-strong)]' : 'bg-[var(--fabric-surface-color-neutral-extra-weak)] border border-[var(--fabric-border-color-neutral-medium)] shadow-sm'}`}
      >
        {checked && (
          <IconV2 name="check-solid" size={12} color="neutral-inverted" />
        )}
      </div>
    </button>
  );
}

export default JobLocationOption;
