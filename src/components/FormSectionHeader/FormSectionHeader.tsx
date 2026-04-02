import type { ReactNode } from 'react';
import { IconV2, Headline } from '@bamboohr/fabric';

interface FormSectionHeaderProps {
  title: string;
  icon: string;
  children?: ReactNode;
}

export function FormSectionHeader({
  title,
  icon,
  children,
}: FormSectionHeaderProps) {
  const fabricIconName = icon.includes('-solid') || icon.includes('-regular') ? icon : `${icon}-solid`;

  return (
    <div className="bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-extra-weak)] rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5">
        {/* Icon Container */}
        <div className="flex items-center justify-center w-10 h-10 bg-[var(--fabric-surface-color-neutral-extra-weak)] rounded-lg">
          <IconV2 name={fabricIconName as any} size={16} color="primary-strong" />
        </div>

        {/* Title */}
        <Headline size="medium" color="primary">
          {title}
        </Headline>
      </div>

      {/* Content */}
      {children && (
        <div className="px-8 pb-8">
          {children}
        </div>
      )}
    </div>
  );
}

export default FormSectionHeader;
