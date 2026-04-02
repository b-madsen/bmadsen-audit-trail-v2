import { Checkbox as FabricCheckbox } from '@bamboohr/fabric';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <FabricCheckbox
      label={label}
      value="checkbox"
      checked={checked}
      onChange={() => onChange?.(!checked)}
      disabled={disabled}
    />
  );
}

export default Checkbox;
