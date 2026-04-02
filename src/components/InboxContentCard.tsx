import type { ReactNode } from 'react';

interface InboxContentCardProps {
  children: ReactNode;
}

export function InboxContentCard({ children }: InboxContentCardProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 max-w-[944px] bg-[var(--fabric-surface-color-neutral-white)] rounded-2xl border border-[var(--fabric-border-color-neutral-extra-extra-weak)] shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

export default InboxContentCard;
