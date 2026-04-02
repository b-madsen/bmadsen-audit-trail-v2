import { IconV2 } from '@bamboohr/fabric';

export type IconName =
  | 'home'
  | 'circle-user'
  | 'user-group'
  | 'id-badge'
  | 'chart-pie-simple'
  | 'file-lines'
  | 'circle-dollar'
  | 'arrow-right-from-line'
  | 'arrow-left-from-line'
  | 'magnifying-glass'
  | 'inbox'
  | 'circle-question'
  | 'gear'
  | 'pen-to-square'
  | 'face-smile'
  | 'arrow-up-from-bracket'
  | 'table-cells'
  | 'folder'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'arrow-down-to-line'
  | 'trash-can'
  | 'file'
  | 'file-audio'
  | 'image'
  | 'circle-info'
  | 'building'
  | 'mobile'
  | 'envelope'
  | 'clock'
  | 'wrench'
  | 'calendar'
  | 'linkedin'
  | 'ellipsis'
  | 'pen'
  | 'location-dot'
  | 'address-card'
  | 'caret-down'
  | 'lock'
  | 'thumbs-up'
  | 'heart'
  | 'sliders'
  | 'bell'
  | 'spa'
  | 'palette'
  | 'door-open'
  | 'door-closed'
  | 'chart-line'
  | 'plane'
  | 'graduation-cap'
  | 'shield'
  | 'check-circle'
  | 'link'
  | 'arrows-rotate'
  | 'home-lucide'
  | 'user-circle-lucide'
  | 'users-lucide'
  | 'id-card-lucide'
  | 'pie-chart-lucide'
  | 'file-text-lucide'
  | 'circle-dollar-lucide'
  | 'sun'
  | 'moon'
  | 'zoom-in'
  | 'zoom-out'
  | 'file-export'
  | 'sparkles'
  | 'paperclip'
  | 'microphone'
  | 'expand'
  | 'compress'
  | 'down-left-and-up-right-to-center'
  | 'xmark'
  | 'circle-arrow-up'
  | 'paper-plane'
  | 'eye-slash'
  | 'users'
  | 'circle-plus'
  | 'circle-plus-lined'
  | 'bullseye'
  | 'bullhorn'
  | 'clipboard'
  | 'compass'
  | 'eye'
  | 'temperature-half'
  | 'star'
  | 'circle-x'
  | 'piggy-bank'
  | 'computer'
  | 'megaphone'
  | 'passport'
  | 'phone'
  | 'circle'
  | 'check'
  | 'grid-2-plus'
  | 'user-lock'
  | 'user-check'
  | 'ban'
  | 'angle-left'
  | 'house'
  | 'laptop'
  | 'house-building'
  | 'house-laptop'
  | 'spinner'
  | 'arrow-left'
  | 'rotate-left'
  | string;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  variant?: 'solid' | 'regular';
  style?: React.CSSProperties;
}

// Map custom icon names to Fabric IconV2 names
const iconNameMap: Record<string, string> = {
  'home': 'house',
  'home-lucide': 'house',
  'circle-user': 'circle-user',
  'user-circle-lucide': 'circle-user',
  'user-group': 'users',
  'users-lucide': 'users',
  'users': 'users',
  'id-badge': 'id-badge',
  'id-card-lucide': 'id-badge',
  'chart-pie-simple': 'chart-pie',
  'pie-chart-lucide': 'chart-pie',
  'file-lines': 'file-lines',
  'file-text-lucide': 'file-lines',
  'circle-dollar': 'dollar-sign',
  'circle-dollar-lucide': 'dollar-sign',
  'arrow-right-from-line': 'arrow-right-from-line',
  'arrow-left-from-line': 'arrow-left-from-line',
  'magnifying-glass': 'magnifying-glass',
  'inbox': 'inbox',
  'circle-question': 'circle-question',
  'gear': 'gear',
  'pen-to-square': 'pen-to-square',
  'face-smile': 'face-smile',
  'arrow-up-from-bracket': 'arrow-up-from-bracket',
  'table-cells': 'table-cells',
  'folder': 'folder',
  'chevron-down': 'chevron-down',
  'chevron-right': 'chevron-right',
  'chevron-left': 'chevron-left',
  'chevron-up': 'chevron-up',
  'arrow-down-to-line': 'arrow-down',
  'trash-can': 'trash-can',
  'file': 'file',
  'file-audio': 'file-audio',
  'image': 'image',
  'circle-info': 'circle-info',
  'building': 'building',
  'mobile': 'mobile-screen',
  'envelope': 'envelope',
  'clock': 'clock',
  'wrench': 'wrench',
  'calendar': 'calendar',
  'linkedin': 'linkedin',
  'ellipsis': 'ellipsis',
  'pen': 'pen',
  'location-dot': 'location-dot',
  'address-card': 'address-card',
  'caret-down': 'caret-down',
  'lock': 'lock',
  'thumbs-up': 'thumbs-up',
  'heart': 'heart',
  'sliders': 'sliders',
  'bell': 'bell',
  'spa': 'spa',
  'palette': 'palette',
  'door-open': 'door-open',
  'door-closed': 'right-to-bracket',
  'chart-line': 'chart-line',
  'plane': 'plane',
  'graduation-cap': 'graduation-cap',
  'shield': 'shield',
  'check-circle': 'circle-check',
  'link': 'link',
  'arrows-rotate': 'arrows-rotate',
  'sun': 'sun',
  'moon': 'moon',
  'zoom-in': 'magnifying-glass-plus',
  'zoom-out': 'magnifying-glass-minus',
  'file-export': 'arrow-up-from-bracket',
  'sparkles': 'wand-magic-sparkles',
  'paperclip': 'paperclip',
  'microphone': 'microphone',
  'expand': 'expand',
  'compress': 'compress',
  'down-left-and-up-right-to-center': 'down-left-and-up-right-to-center',
  'xmark': 'xmark',
  'circle-arrow-up': 'circle-arrow-up',
  'paper-plane': 'paper-plane',
  'eye-slash': 'eye-slash',
  'circle-plus': 'circle-plus',
  'circle-plus-lined': 'circle-plus',
  'bullseye': 'bullseye',
  'bullhorn': 'bullhorn',
  'clipboard': 'clipboard',
  'compass': 'compass',
  'eye': 'eye',
  'temperature-half': 'temperature-half',
  'star': 'star',
  'circle-x': 'circle-xmark',
  'piggy-bank': 'piggy-bank',
  'computer': 'computer',
  'megaphone': 'bullhorn',
  'passport': 'passport',
  'phone': 'phone',
  'circle': 'circle',
  'check': 'check',
  'grid-2-plus': 'grid-2-plus',
  'user-lock': 'user-lock',
  'user-check': 'user-check',
  'ban': 'ban',
  'angle-left': 'angle-left',
  'house': 'house',
  'laptop': 'laptop',
  'house-building': 'building',
  'house-laptop': 'laptop',
  'spinner': 'spinner',
  'arrow-left': 'arrow-left',
  'rotate-left': 'rotate-left',
};

type ValidIconSize = 10 | 12 | 16 | 20 | 24 | 25 | 28 | 30 | 32 | 36 | 38 | 40 | 48 | 55 | 60 | 72 | 90 | 120 | 128 | 170;

const getValidSize = (size: number): ValidIconSize => {
  const validSizes: ValidIconSize[] = [10, 12, 16, 20, 24, 25, 28, 30, 32, 36, 38, 40, 48, 55, 60, 72, 90, 120, 128, 170];
  // Find closest valid size
  return validSizes.reduce((prev, curr) =>
    Math.abs(curr - size) < Math.abs(prev - size) ? curr : prev
  );
};

export function Icon({ name, size = 24, className = '', variant = 'solid', style }: IconProps) {
  const mappedName = iconNameMap[name] || name;
  const suffix = variant === 'regular' ? '-regular' : '-solid';
  const fullName = `${mappedName}${suffix}`;
  const validSize = getValidSize(size);

  return (
    <span className={className} style={style}>
      <IconV2
        name={fullName as any}
        size={validSize}
      />
    </span>
  );
}

export default Icon;
