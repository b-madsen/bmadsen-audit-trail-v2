import { useState } from 'react';
import { Tabs, Tab } from '@bamboohr/fabric';
import type { FeedItem, FeedFilterType } from '../../../../data/hrManagerHomeTypes';
import { filterFeedItems } from '../../../../data/mockHRManagerData';
import { FeedItemComponent } from './FeedItem';

interface FeedSectionProps {
  items: FeedItem[];
}

export function FeedSection({ items }: FeedSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FeedFilterType>('all');

  const filteredItems = filterFeedItems(items, activeFilter);

  return (
    <div className="hr-manager-feed">
      <Tabs
        value={activeFilter}
        onChange={(value) => setActiveFilter(value as FeedFilterType)}
      >
        <Tab value="all" label="All" />
        <Tab value="performance" label="Performance" />
        <Tab value="timeoff" label="Time Off" />
        <Tab value="celebrations" label="Celebrations" />
      </Tabs>

      <div className="hr-manager-feed-content">
        {filteredItems.map((item, index) => (
          <FeedItemComponent key={`${item.type}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
