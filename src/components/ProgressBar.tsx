import { ProgressBar as FabricProgressBar, BodyText } from '@bamboohr/fabric';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValues?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  showValues = true,
  className = '',
}: ProgressBarProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValues) && (
        <div className="flex items-center justify-between">
          {label && (
            <BodyText size="small">{label}</BodyText>
          )}
          {showValues && (
            <span className="ml-auto">
              <BodyText size="small" color="neutral-weak">{value} of {max}</BodyText>
            </span>
          )}
        </div>
      )}
      <FabricProgressBar current={value} total={max} />
    </div>
  );
}

export default ProgressBar;
