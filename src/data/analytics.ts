export interface Insight {
  id: string;
  icon: 'document' | 'circle-info' | 'graduation-cap';
  title: string;
  description: string;
}

export interface RecentReport {
  id: string;
  name: string;
  owner: string;
  lastViewed: string;
}

export const insights: Insight[] = [
  {
    id: '1',
    icon: 'document',
    title: 'Headcount Trends',
    description: 'Your team has grown 12% in the last quarter. View detailed breakdown.',
  },
  {
    id: '2',
    icon: 'circle-info',
    title: 'Turnover Alert',
    description: 'Engineering department showing higher than average turnover rate.',
  },
  {
    id: '3',
    icon: 'graduation-cap',
    title: 'Training Completion',
    description: '87% of employees completed mandatory compliance training.',
  },
];

export const recentReports: RecentReport[] = [
  { id: '1', name: 'Headcount Report', owner: 'System', lastViewed: 'Today' },
  { id: '2', name: 'Age Profile', owner: 'HR Team', lastViewed: 'Yesterday' },
  { id: '3', name: 'Compensation Summary', owner: 'Finance', lastViewed: '2 days ago' },
  { id: '4', name: 'Time Off Balances', owner: 'System', lastViewed: '3 days ago' },
  { id: '5', name: 'New Hires Report', owner: 'Recruiting', lastViewed: 'Last week' },
];

export const suggestionQuestions = [
  'How many employees are in each department?',
  'What is the average tenure by location?',
  'Show me upcoming anniversaries this month',
  'Compare headcount year over year',
];
