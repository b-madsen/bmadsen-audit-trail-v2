import { IconV2, Headline } from '@bamboohr/fabric';

type HeadlineSize = 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
type HeadlineColor = 'primary' | 'neutral-strong' | 'neutral-medium' | 'neutral-weak';

interface TextHeadlineProps {
  children: string;
  size?: HeadlineSize;
  color?: HeadlineColor;
  icon?: string;
  className?: string;
}

const sizeToFabricSize: Record<HeadlineSize, 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small'> = {
  'extra-large': 'extra-large',
  'large': 'large',
  'medium': 'medium',
  'small': 'small',
  'extra-small': 'extra-small',
};

const iconSizeMap: Record<HeadlineSize, 12 | 16 | 20 | 24 | 32 | 40 | 48> = {
  'extra-large': 48,
  'large': 40,
  'medium': 32,
  'small': 24,
  'extra-small': 20,
};

export function TextHeadline({
  children,
  size = 'extra-large',
  color = 'primary',
  icon,
  className = '',
}: TextHeadlineProps) {
  const fabricSize = sizeToFabricSize[size];
  const iconSize = iconSizeMap[size];
  const fabricIconName = icon ? (icon.includes('-solid') || icon.includes('-regular') ? icon : `${icon}-solid`) : null;

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {fabricIconName && (
        <IconV2 name={fabricIconName as any} size={iconSize} color="neutral-strong" />
      )}
      <Headline size={fabricSize} color={color}>
        {children}
      </Headline>
    </div>
  );
}

export default TextHeadline;
