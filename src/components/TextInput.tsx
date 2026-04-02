import { TextField } from '@bamboohr/fabric';

interface TextInputProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'dropdown' | 'date';
  size?: 'default' | 'small';
  className?: string;
  inputClassName?: string;
  icon?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = 'text',
  size = 'default',
  className = '',
}: TextInputProps) {
  if (type === 'date') {
    return (
      <div className={className}>
        <TextField
          label={label}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          size={size === 'small' ? 'small' : 'medium'}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <TextField
        label={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        size={size === 'small' ? 'small' : 'medium'}
      />
    </div>
  );
}

export default TextInput;
