import type { ReactNode } from 'react';
import { Gridlet as FabricGridlet } from '@bamboohr/fabric';

interface GridletProps {
  title: string;
  icon?: string;
  children?: ReactNode;
  className?: string;
  minHeight?: number;
}

export function Gridlet({
  title,
  children,
  className = '',
}: GridletProps) {
  return (
    <div className={className}>
      <FabricGridlet header={<FabricGridlet.Header title={title} />}>
        <FabricGridlet.Body>
          <div>{children}</div>
        </FabricGridlet.Body>
      </FabricGridlet>
    </div>
  );
}

export default Gridlet;
