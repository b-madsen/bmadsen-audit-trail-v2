import type { ReactNode } from 'react';
import { Section } from '@bamboohr/fabric';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={className}>
      <Section>
        {children}
      </Section>
    </div>
  );
}
