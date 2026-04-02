import { TextField, IconV2 } from '@bamboohr/fabric';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'MM/DD/YYYY',
  disabled = false,
  className = '',
}: DatePickerProps) {
  return (
    <div className={`${className} relative`}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <IconV2 name="calendar-solid" size={16} color="neutral-medium" />
      </div>
    </div>
  );
}

export default DatePicker;
