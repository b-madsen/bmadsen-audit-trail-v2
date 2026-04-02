import { Avatar as FabricAvatar } from '@bamboohr/fabric';

type FabricAvatarSize = 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 96 | 128 | 160 | 224;

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  className?: string;
}

const sizeMap: Record<string, FabricAvatarSize> = {
  small: 32,
  medium: 48,
  large: 96,
};

export function Avatar({ src, alt = '', size = 'medium' }: AvatarProps) {
  const pixelSize: FabricAvatarSize = typeof size === 'number'
    ? (size as FabricAvatarSize)
    : (sizeMap[size] || 48);

  return (
    <FabricAvatar
      src={src}
      alt={alt}
      size={pixelSize}
    />
  );
}

export default Avatar;
