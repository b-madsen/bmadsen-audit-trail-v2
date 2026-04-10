export interface FavoriteReport {
  id: string;
  name: string;
  icon: string;
}

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
  group: 'today' | 'last-30-days';
  icon?: string;
}

export interface StandardReport {
  id: string;
  name: string;
  icon: string;
  lastViewed?: string;
}

export interface StandardReportGroup {
  id: string;
  label: string;
  icon: string;
  reports: StandardReport[];
}

export const favoriteReports: FavoriteReport[] = [
  { id: '1', name: 'Employee Turnover', icon: 'chart-column' },
  { id: '2', name: 'Additions & Terminations', icon: 'chart-line' },
  { id: '3', name: 'Time Off Used', icon: 'table' },
];

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
  { id: '1', name: 'Audit Trail', owner: 'BambooHR', lastViewed: '9:22 am', group: 'today', icon: 'table-cells-large' },
  { id: '2', name: 'Point-in-Time', owner: 'BambooHR', lastViewed: 'Apr 01', group: 'last-30-days', icon: 'clock-rotate-left' },
  { id: '3', name: 'Employee Census', owner: 'BambooHR', lastViewed: 'Mar 30', group: 'last-30-days', icon: 'table-cells-large' },
  { id: '4', name: 'Time Off Balances', owner: 'BambooHR', lastViewed: 'Mar 22', group: 'last-30-days', icon: 'table-cells-large' },
  { id: '5', name: 'New Hires Report', owner: 'BambooHR', lastViewed: 'Mar 15', group: 'last-30-days', icon: 'chart-column' },
];

export const standardReportGroups: StandardReportGroup[] = [
  {
    id: 'benefits',
    label: 'Benefits',
    icon: 'heart-pulse',
    reports: [
      { id: 'b1', name: 'Plan Year Election Summary', icon: 'table' },
      { id: 'b2', name: 'Benefit Summary', icon: 'table' },
      { id: 'b3', name: 'Enrollment Window Election Summary', icon: 'table' },
      { id: 'b4', name: 'Benefit Election Changes', icon: 'table' },
    ],
  },
  {
    id: 'compensation',
    label: 'Compensation',
    icon: 'circle-dollar',
    reports: [
      { id: 'c1', name: 'Pay by Department', icon: 'chart-line' },
      { id: 'c2', name: 'Pay by Location', icon: 'chart-line' },
      { id: 'c3', name: 'Pay by Job Title', icon: 'chart-line' },
      { id: 'c4', name: 'Pay by Employment Status', icon: 'chart-line' },
    ],
  },
  {
    id: 'headcount',
    label: 'Headcount',
    icon: 'users',
    reports: [
      { id: 'h1', name: 'Headcount Summary', icon: 'chart-column' },
      { id: 'h2', name: 'New Hires', icon: 'chart-column' },
      { id: 'h3', name: 'Terminations', icon: 'chart-column' },
      { id: 'h4', name: 'Additions & Terminations', icon: 'chart-column' },
    ],
  },
  {
    id: 'time-off',
    label: 'Time Off',
    icon: 'clock',
    reports: [
      { id: 't1', name: 'Time Off Balances', icon: 'table' },
      { id: 't2', name: 'Time Off Usage', icon: 'table' },
      { id: 't3', name: 'Accrual Summary', icon: 'table' },
    ],
  },
];

export const suggestionQuestions = [
  'How many employees are in each department?',
  'What is the average tenure by location?',
  'Show me upcoming anniversaries this month',
  'Compare headcount year over year',
];
