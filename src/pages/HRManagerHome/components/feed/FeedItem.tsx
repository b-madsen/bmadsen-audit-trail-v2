import type { FeedItem } from '../../../../data/hrManagerHomeTypes';
import { PerformanceCard } from './PerformanceCard';
import { CelebrationCard } from './CelebrationCard';
import { TimeOffCard } from './TimeOffCard';
import { GoalProgressCard } from './GoalProgressCard';

interface FeedItemProps {
  item: FeedItem;
}

export function FeedItemComponent({ item }: FeedItemProps) {
  switch (item.type) {
    case 'performance':
      return <PerformanceCard data={item.data} />;
    case 'celebration':
      return <CelebrationCard data={item.data} aiSuggestion={item.aiSuggestion} />;
    case 'timeoff':
      return <TimeOffCard data={item.data} />;
    case 'goal':
      return <GoalProgressCard data={item.data} />;
    default:
      return null;
  }
}
