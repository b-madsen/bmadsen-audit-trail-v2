import { InlineMessage, Checkbox } from '@bamboohr/fabric';

interface InfoBannerProps {
  title: string;
  description: string;
  checkboxLabel?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export function InfoBanner({
  title,
  description,
  checkboxLabel,
  checked = false,
  onCheckboxChange,
}: InfoBannerProps) {
  return (
    <div>
      <InlineMessage
        status="info"
        title={title}
        description={description}
      />
      {checkboxLabel && (
        <div style={{ marginTop: '8px' }}>
          <Checkbox
            label={checkboxLabel}
            value="info-banner-checkbox"
            checked={checked}
            onChange={() => onCheckboxChange?.(!checked)}
          />
        </div>
      )}
    </div>
  );
}

export default InfoBanner;
