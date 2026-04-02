import { Tabs as FabricTabs, Tab } from '@bamboohr/fabric';
import type { ChangeEvent } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'inverted';
}

export function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
  return (
    <div className={className}>
      <FabricTabs
        value={activeTab}
        onChange={(value: unknown, _event: ChangeEvent<Element>) => onTabChange(value as string)}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </FabricTabs>
    </div>
  );
}

export default Tabs;
