import { Button as FabricButton, IconV2 } from '@bamboohr/fabric';
import type { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'standard' | 'primary' | 'ghost' | 'outlined' | 'text';
  size?: 'small' | 'medium';
  icon?: string;
  iconPosition?: 'left' | 'right';
  showCaret?: boolean;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Map custom variants to Fabric props
const variantMap: Record<string, { color: 'primary' | 'secondary'; variant: 'contained' | 'outlined' | 'text' }> = {
  standard: { color: 'secondary', variant: 'contained' },
  primary: { color: 'primary', variant: 'contained' },
  ghost: { color: 'secondary', variant: 'text' },
  outlined: { color: 'primary', variant: 'outlined' },
  text: { color: 'secondary', variant: 'text' },
};

export function Button({
  children,
  variant = 'standard',
  size = 'medium',
  icon,
  iconPosition = 'left',
  showCaret = false,
  onClick,
  disabled,
  type,
}: ButtonProps) {
  const fabricProps = variantMap[variant] || variantMap.standard;

  const startIcon = icon && iconPosition === 'left' ? <IconV2 name={icon as any} size={16} /> : undefined;
  const endIcon = icon && iconPosition === 'right' ? <IconV2 name={icon as any} size={16} /> :
                 showCaret ? <IconV2 name="caret-down-solid" size={10} /> : undefined;

  return (
    <FabricButton
      color={fabricProps.color}
      variant={fabricProps.variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </FabricButton>
  );
}

export default Button;
