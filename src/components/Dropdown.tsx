import { SelectField } from '@bamboohr/fabric';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ label, options, value, onChange, className = '' }: DropdownProps) {
  const fabricItems = options.map((opt) => ({
    text: opt.label,
    value: opt.value,
  }));

  return (
    <div className={className}>
      <SelectField
        label={label}
        items={fabricItems}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
