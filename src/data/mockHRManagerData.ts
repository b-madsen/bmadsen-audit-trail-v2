// Mock data for HR Manager Home Screen

import type {
  Employee,
  TeamHealthMetrics,
  Absence,
  Celebration,
  PerformanceUpdate,
  TimeOffRequest,
  GoalProgress,
  PriorityAlert,
  QuickAction,
  FeedItem,
  DepartmentMetrics,
  QuarterlyMetrics,
  TrainingRecord,
  CoverageGap,
  PayrollDeadline,
  ExitInterviewTrend,
  SurveyComment,
} from './hrManagerHomeTypes';

// Sample employees with extended data
export const sampleEmployees: Employee[] = [
  { id: 1, firstName: 'Charlotte', lastName: 'Abbott', jobTitle: 'Software Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/40?u=1', engagementScore: 92, satisfactionScore: 88, turnoverRisk: 'low', hireDate: '2022-03-15', lastFeedbackDate: '2026-01-20' },
  { id: 2, firstName: 'Marcus', lastName: 'Chen', jobTitle: 'Product Manager', department: 'Product', photoUrl: 'https://i.pravatar.cc/40?u=2', engagementScore: 85, satisfactionScore: 82, turnoverRisk: 'low', hireDate: '2021-08-01', lastFeedbackDate: '2026-02-01' },
  { id: 3, firstName: 'Emily', lastName: 'Rodriguez', jobTitle: 'UX Designer', department: 'Design', photoUrl: 'https://i.pravatar.cc/40?u=3', engagementScore: 58, satisfactionScore: 62, turnoverRisk: 'high', hireDate: '2023-01-10', lastFeedbackDate: '2025-11-15' },
  { id: 4, firstName: 'James', lastName: 'Wilson', jobTitle: 'Data Analyst', department: 'Analytics', photoUrl: 'https://i.pravatar.cc/40?u=4', engagementScore: 71, satisfactionScore: 75, turnoverRisk: 'medium', hireDate: '2022-06-20', lastFeedbackDate: '2026-01-05' },
  { id: 5, firstName: 'Sarah', lastName: 'Kim', jobTitle: 'HR Specialist', department: 'Human Resources', photoUrl: 'https://i.pravatar.cc/40?u=5', engagementScore: 88, satisfactionScore: 90, turnoverRisk: 'low', hireDate: '2020-11-02', lastFeedbackDate: '2026-02-03' },
  { id: 6, firstName: 'Michael', lastName: 'Johnson', jobTitle: 'DevOps Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/40?u=6', engagementScore: 64, satisfactionScore: 68, turnoverRisk: 'high', hireDate: '2023-04-18', lastFeedbackDate: '2025-12-10' },
  { id: 7, firstName: 'Lisa', lastName: 'Thompson', jobTitle: 'Marketing Manager', department: 'Marketing', photoUrl: 'https://i.pravatar.cc/40?u=7', engagementScore: 79, satisfactionScore: 81, turnoverRisk: 'low', hireDate: '2019-02-14', lastFeedbackDate: '2026-01-28' },
  { id: 8, firstName: 'David', lastName: 'Brown', jobTitle: 'Sales Representative', department: 'Sales', photoUrl: 'https://i.pravatar.cc/40?u=8', engagementScore: 55, satisfactionScore: 52, turnoverRisk: 'high', hireDate: '2024-01-08', lastFeedbackDate: '2025-10-20' },
  { id: 9, firstName: 'Amanda', lastName: 'Foster', jobTitle: 'Senior Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/40?u=9', engagementScore: 45, satisfactionScore: 48, turnoverRisk: 'high', hireDate: '2020-05-11', lastFeedbackDate: '2025-09-15' },
  { id: 10, firstName: 'Kevin', lastName: 'Martinez', jobTitle: 'Customer Success', department: 'Sales', photoUrl: 'https://i.pravatar.cc/40?u=10', engagementScore: 82, satisfactionScore: 85, turnoverRisk: 'low', hireDate: '2022-09-01', lastFeedbackDate: '2026-02-05' },
  { id: 11, firstName: 'Rachel', lastName: 'Lee', jobTitle: 'QA Engineer', department: 'Engineering', photoUrl: 'https://i.pravatar.cc/40?u=11', engagementScore: 68, satisfactionScore: 65, turnoverRisk: 'medium', hireDate: '2023-07-22', lastFeedbackDate: '2025-12-18' },
  { id: 12, firstName: 'Thomas', lastName: 'Garcia', jobTitle: 'Finance Manager', department: 'Finance', photoUrl: 'https://i.pravatar.cc/40?u=12', engagementScore: 76, satisfactionScore: 78, turnoverRisk: 'low', hireDate: '2021-03-08', lastFeedbackDate: '2026-01-12' },
];

// Team Health Metrics
export const teamHealthMetrics: TeamHealthMetrics = {
  engagementScore: 78,
  engagementTrend: 'up',
  satisfactionScore: 82,
  satisfactionTrend: 'stable',
  turnoverRisk: 'low',
  activeEmployees: 156,
  onLeaveCount: 8,
};

// Today's absences
export const todayAbsences: Absence[] = [
  { id: 1, employee: sampleEmployees[0], type: 'vacation', startDate: '2026-02-06', endDate: '2026-02-10' },
  { id: 2, employee: sampleEmployees[3], type: 'sick', startDate: '2026-02-06', endDate: '2026-02-06' },
  { id: 3, employee: sampleEmployees[5], type: 'personal', startDate: '2026-02-06', endDate: '2026-02-07' },
];

// This week's absences
export const weekAbsences: Absence[] = [
  ...todayAbsences,
  { id: 4, employee: sampleEmployees[1], type: 'vacation', startDate: '2026-02-07', endDate: '2026-02-14' },
  { id: 5, employee: sampleEmployees[6], type: 'parental', startDate: '2026-02-08', endDate: '2026-03-08' },
];

// Quick Actions
export const quickActions: QuickAction[] = [
  { id: 'approve-timeoff', label: 'Approve Time Off', icon: 'calendar-check', href: '/time-off/pending' },
  { id: 'run-payroll', label: 'Run Payroll', icon: 'money-bill-wave', href: '/payroll' },
  { id: 'add-employee', label: 'Add Employee', icon: 'user-plus', href: '/people/new' },
  { id: 'ai-insights', label: 'AI Insights', icon: 'sparkles', href: '/insights', variant: 'ai' },
];

// Priority Alerts
export const priorityAlerts: PriorityAlert[] = [
  {
    id: 1,
    type: 'warning',
    title: '3 time-off requests pending',
    description: 'Review and approve before end of day',
    actionLabel: 'Review',
    actionHref: '/time-off/pending',
  },
  {
    id: 2,
    type: 'info',
    title: 'Payroll deadline in 2 days',
    description: 'Ensure all timesheets are submitted',
    actionLabel: 'View Timesheets',
    actionHref: '/timesheets',
  },
  {
    id: 3,
    type: 'ai',
    title: 'AI Recommendation',
    description: 'Based on engagement trends, consider scheduling team building activities',
    actionLabel: 'Learn More',
    actionHref: '/insights/engagement',
  },
];

// Performance Updates
const performanceUpdates: PerformanceUpdate[] = [
  {
    id: 1,
    employee: sampleEmployees[0],
    type: 'review-completed',
    title: 'Annual Review Completed',
    description: 'Exceeded expectations in all key areas',
    date: '2026-02-05',
    rating: 4.5,
  },
  {
    id: 2,
    employee: sampleEmployees[2],
    type: 'feedback-received',
    title: 'Peer Feedback Submitted',
    description: '360 feedback received from 5 colleagues',
    date: '2026-02-04',
  },
  {
    id: 3,
    employee: sampleEmployees[4],
    type: 'goal-achieved',
    title: 'Q1 Goal Achieved',
    description: 'Completed HR process automation project ahead of schedule',
    date: '2026-02-03',
  },
];

// Celebrations
const celebrations: Celebration[] = [
  {
    id: 1,
    employee: sampleEmployees[1],
    type: 'birthday',
    date: '2026-02-06',
  },
  {
    id: 2,
    employee: sampleEmployees[6],
    type: 'work-anniversary',
    date: '2026-02-07',
    yearsOfService: 5,
  },
  {
    id: 3,
    employee: sampleEmployees[7],
    type: 'achievement',
    date: '2026-02-05',
    achievementTitle: 'Top Sales Performer Q4',
  },
];

// Time Off Requests
export const pendingTimeOffRequests: TimeOffRequest[] = [
  {
    id: 1,
    employee: sampleEmployees[2],
    type: 'vacation',
    startDate: '2026-02-15',
    endDate: '2026-02-22',
    status: 'pending',
    requestedOn: '2026-02-04',
    totalDays: 5,
  },
  {
    id: 2,
    employee: sampleEmployees[4],
    type: 'personal',
    startDate: '2026-02-10',
    endDate: '2026-02-10',
    status: 'pending',
    requestedOn: '2026-02-05',
    totalDays: 1,
  },
  {
    id: 3,
    employee: sampleEmployees[7],
    type: 'vacation',
    startDate: '2026-03-01',
    endDate: '2026-03-05',
    status: 'pending',
    requestedOn: '2026-02-06',
    totalDays: 5,
  },
];

// Goal Progress
const goalProgressItems: GoalProgress[] = [
  {
    id: 1,
    employee: sampleEmployees[0],
    goalTitle: 'Complete AWS Certification',
    progress: 75,
    targetDate: '2026-03-15',
    status: 'on-track',
    updatedAt: '2026-02-05',
  },
  {
    id: 2,
    employee: sampleEmployees[3],
    goalTitle: 'Build Analytics Dashboard',
    progress: 45,
    targetDate: '2026-02-28',
    status: 'at-risk',
    updatedAt: '2026-02-04',
  },
];

// Combined Feed Items
export const feedItems: FeedItem[] = [
  { type: 'performance', data: performanceUpdates[0] },
  { type: 'celebration', data: celebrations[0], aiSuggestion: 'Send Marcus a personalized birthday message! Consider mentioning his recent product launch success.' },
  { type: 'timeoff', data: pendingTimeOffRequests[0] },
  { type: 'goal', data: goalProgressItems[0] },
  { type: 'celebration', data: celebrations[1], aiSuggestion: 'Lisa is celebrating 5 years! This is a great milestone to recognize publicly in the team meeting.' },
  { type: 'performance', data: performanceUpdates[1] },
  { type: 'timeoff', data: pendingTimeOffRequests[1] },
  { type: 'celebration', data: celebrations[2] },
  { type: 'performance', data: performanceUpdates[2] },
  { type: 'goal', data: goalProgressItems[1] },
  { type: 'timeoff', data: pendingTimeOffRequests[2] },
];

// Helper function to filter feed items
export function filterFeedItems(items: FeedItem[], filter: 'all' | 'performance' | 'timeoff' | 'celebrations'): FeedItem[] {
  if (filter === 'all') return items;
  if (filter === 'performance') return items.filter(item => item.type === 'performance' || item.type === 'goal');
  if (filter === 'timeoff') return items.filter(item => item.type === 'timeoff');
  if (filter === 'celebrations') return items.filter(item => item.type === 'celebration');
  return items;
}

// Helper function to get absence type label
export function getAbsenceTypeLabel(type: Absence['type']): string {
  const labels: Record<Absence['type'], string> = {
    vacation: 'Vacation',
    sick: 'Sick Leave',
    personal: 'Personal',
    parental: 'Parental Leave',
  };
  return labels[type];
}

// Helper function to get turnover risk color
export function getTurnoverRiskColor(risk: TeamHealthMetrics['turnoverRisk']): 'success' | 'warning' | 'error' {
  const colors: Record<TeamHealthMetrics['turnoverRisk'], 'success' | 'warning' | 'error'> = {
    low: 'success',
    medium: 'warning',
    high: 'error',
  };
  return colors[risk];
}

// Department Metrics
export const departmentMetrics: DepartmentMetrics[] = [
  { name: 'Engineering', employeeCount: 42, engagementScore: 72, engagementTrend: 'down', satisfactionScore: 74, turnoverRisk: 'medium', openPositions: 5, pendingRequests: 3 },
  { name: 'Product', employeeCount: 18, engagementScore: 84, engagementTrend: 'up', satisfactionScore: 86, turnoverRisk: 'low', openPositions: 2, pendingRequests: 1 },
  { name: 'Design', employeeCount: 12, engagementScore: 65, engagementTrend: 'down', satisfactionScore: 68, turnoverRisk: 'high', openPositions: 3, pendingRequests: 0 },
  { name: 'Sales', employeeCount: 28, engagementScore: 69, engagementTrend: 'stable', satisfactionScore: 71, turnoverRisk: 'medium', openPositions: 4, pendingRequests: 2 },
  { name: 'Marketing', employeeCount: 15, engagementScore: 81, engagementTrend: 'up', satisfactionScore: 83, turnoverRisk: 'low', openPositions: 1, pendingRequests: 1 },
  { name: 'Human Resources', employeeCount: 8, engagementScore: 88, engagementTrend: 'stable', satisfactionScore: 90, turnoverRisk: 'low', openPositions: 0, pendingRequests: 0 },
  { name: 'Finance', employeeCount: 10, engagementScore: 77, engagementTrend: 'up', satisfactionScore: 79, turnoverRisk: 'low', openPositions: 1, pendingRequests: 0 },
  { name: 'Analytics', employeeCount: 14, engagementScore: 73, engagementTrend: 'stable', satisfactionScore: 76, turnoverRisk: 'medium', openPositions: 2, pendingRequests: 1 },
];

// Quarterly Metrics for comparison
export const quarterlyMetrics: QuarterlyMetrics[] = [
  { quarter: 'Q1', year: 2025, engagementScore: 74, satisfactionScore: 76, turnoverRate: 4.2, headcount: 148, newHires: 12, departures: 5 },
  { quarter: 'Q2', year: 2025, engagementScore: 72, satisfactionScore: 75, turnoverRate: 5.1, headcount: 151, newHires: 8, departures: 5 },
  { quarter: 'Q3', year: 2025, engagementScore: 75, satisfactionScore: 78, turnoverRate: 3.8, headcount: 153, newHires: 10, departures: 8 },
  { quarter: 'Q4', year: 2025, engagementScore: 76, satisfactionScore: 80, turnoverRate: 3.2, headcount: 154, newHires: 7, departures: 6 },
  { quarter: 'Q1', year: 2026, engagementScore: 78, satisfactionScore: 82, turnoverRate: 2.9, headcount: 156, newHires: 9, departures: 7 },
];

// Training Records - including overdue
export const trainingRecords: TrainingRecord[] = [
  { id: 1, employee: sampleEmployees[2], courseName: 'Annual Security Awareness', category: 'compliance', dueDate: '2026-01-15', status: 'overdue', daysOverdue: 23 },
  { id: 2, employee: sampleEmployees[5], courseName: 'Workplace Harassment Prevention', category: 'compliance', dueDate: '2026-01-20', status: 'overdue', daysOverdue: 18 },
  { id: 3, employee: sampleEmployees[7], courseName: 'Data Privacy Training', category: 'compliance', dueDate: '2026-02-01', status: 'overdue', daysOverdue: 6 },
  { id: 4, employee: sampleEmployees[8], courseName: 'Annual Security Awareness', category: 'compliance', dueDate: '2026-02-05', status: 'overdue', daysOverdue: 2 },
  { id: 5, employee: sampleEmployees[3], courseName: 'Fire Safety Procedures', category: 'safety', dueDate: '2026-02-10', status: 'not-started' },
  { id: 6, employee: sampleEmployees[10], courseName: 'Code Review Best Practices', category: 'professional', dueDate: '2026-02-15', status: 'in-progress' },
  { id: 7, employee: sampleEmployees[0], courseName: 'Leadership Fundamentals', category: 'professional', dueDate: '2026-03-01', status: 'not-started' },
  { id: 8, employee: sampleEmployees[1], courseName: 'Annual Security Awareness', category: 'compliance', dueDate: '2026-01-10', status: 'completed', completedDate: '2026-01-08' },
];

// Coverage Gaps
export const coverageGaps: CoverageGap[] = [
  {
    id: 1,
    date: '2026-02-10',
    department: 'Engineering',
    role: 'Senior Engineer',
    requiredCoverage: 3,
    availableStaff: 1,
    gapSeverity: 'critical',
    conflictingAbsences: [todayAbsences[0], weekAbsences[3]]
  },
  {
    id: 2,
    date: '2026-02-12',
    department: 'Sales',
    role: 'Sales Representative',
    requiredCoverage: 2,
    availableStaff: 1,
    gapSeverity: 'warning',
    conflictingAbsences: [weekAbsences[4]]
  },
  {
    id: 3,
    date: '2026-02-14',
    department: 'Design',
    role: 'UX Designer',
    requiredCoverage: 2,
    availableStaff: 1,
    gapSeverity: 'minor',
    conflictingAbsences: []
  },
];

// Payroll Deadlines
export const payrollDeadlines: PayrollDeadline[] = [
  { id: 1, title: 'Bi-weekly Payroll Submission', dueDate: '2026-02-09', status: 'due-today', description: 'Submit timesheet approvals for the current pay period', actionRequired: 'Review and approve 12 pending timesheets' },
  { id: 2, title: 'Bonus Processing', dueDate: '2026-02-15', status: 'upcoming', description: 'Q4 2025 bonus calculations need final approval', actionRequired: 'Approve bonus amounts for 23 employees' },
  { id: 3, title: 'Benefits Enrollment Deadline', dueDate: '2026-02-28', status: 'upcoming', description: 'Open enrollment period ends', actionRequired: '8 employees have not completed enrollment' },
];

// Exit Interview Trends
export const exitInterviewTrends: ExitInterviewTrend[] = [
  { reason: 'Career Growth', count: 8, percentage: 32, trend: 'up' },
  { reason: 'Compensation', count: 6, percentage: 24, trend: 'stable' },
  { reason: 'Work-Life Balance', count: 5, percentage: 20, trend: 'down' },
  { reason: 'Management', count: 3, percentage: 12, trend: 'down' },
  { reason: 'Remote Work Policy', count: 2, percentage: 8, trend: 'up' },
  { reason: 'Other', count: 1, percentage: 4, trend: 'stable' },
];

// Survey Comments
export const surveyComments: SurveyComment[] = [
  { id: 1, anonymous: true, department: 'Engineering', category: 'engagement', sentiment: 'negative', comment: 'Feeling disconnected from company goals. Would like more transparency on roadmap decisions.', date: '2026-02-01' },
  { id: 2, anonymous: true, department: 'Design', category: 'growth', sentiment: 'negative', comment: 'Limited opportunities for advancement. Considering external roles.', date: '2026-01-28' },
  { id: 3, employee: sampleEmployees[9], anonymous: false, department: 'Sales', category: 'culture', sentiment: 'positive', comment: 'Great team collaboration! The new Friday team lunches have really helped morale.', date: '2026-02-03' },
  { id: 4, anonymous: true, department: 'Engineering', category: 'management', sentiment: 'neutral', comment: 'Would appreciate more frequent 1:1s with direct manager.', date: '2026-01-25' },
  { id: 5, anonymous: true, department: 'Sales', category: 'satisfaction', sentiment: 'negative', comment: 'Quota expectations are unrealistic given current market conditions.', date: '2026-01-30' },
  { id: 6, employee: sampleEmployees[4], anonymous: false, department: 'Human Resources', category: 'engagement', sentiment: 'positive', comment: 'Love the new wellness programs! The meditation sessions are a hit.', date: '2026-02-05' },
];

// Employees needing feedback (no feedback in 60+ days)
export const employeesNeedingFeedback = sampleEmployees.filter(emp => {
  if (!emp.lastFeedbackDate) return true;
  const lastFeedback = new Date(emp.lastFeedbackDate);
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  return lastFeedback < sixtyDaysAgo;
});

// Low engagement employees (score < 70)
export const lowEngagementEmployees = sampleEmployees.filter(emp =>
  emp.engagementScore !== undefined && emp.engagementScore < 70
);

// At-risk employees (high turnover risk)
export const atRiskEmployees = sampleEmployees.filter(emp =>
  emp.turnoverRisk === 'high'
);

// Future absences (next month)
export const nextMonthAbsences: Absence[] = [
  { id: 10, employee: sampleEmployees[0], type: 'vacation', startDate: '2026-03-02', endDate: '2026-03-06' },
  { id: 11, employee: sampleEmployees[2], type: 'personal', startDate: '2026-03-10', endDate: '2026-03-10' },
  { id: 12, employee: sampleEmployees[4], type: 'vacation', startDate: '2026-03-15', endDate: '2026-03-22' },
  { id: 13, employee: sampleEmployees[7], type: 'vacation', startDate: '2026-03-01', endDate: '2026-03-05' },
  { id: 14, employee: sampleEmployees[9], type: 'parental', startDate: '2026-03-20', endDate: '2026-06-20' },
];

// Work anniversaries this month
export const workAnniversariesThisMonth: Celebration[] = [
  { id: 10, employee: sampleEmployees[6], type: 'work-anniversary', date: '2026-02-14', yearsOfService: 7 },
  { id: 11, employee: sampleEmployees[4], type: 'work-anniversary', date: '2026-02-02', yearsOfService: 5 },
  { id: 12, employee: sampleEmployees[11], type: 'work-anniversary', date: '2026-02-08', yearsOfService: 5 },
];

// Goals completed this month
export const completedGoalsThisMonth: GoalProgress[] = [
  { id: 10, employee: sampleEmployees[0], goalTitle: 'Complete AWS Certification', progress: 100, targetDate: '2026-02-01', status: 'on-track', updatedAt: '2026-02-01' },
  { id: 11, employee: sampleEmployees[4], goalTitle: 'Implement new onboarding flow', progress: 100, targetDate: '2026-01-31', status: 'on-track', updatedAt: '2026-01-31' },
  { id: 12, employee: sampleEmployees[1], goalTitle: 'Launch mobile app v2', progress: 100, targetDate: '2026-02-05', status: 'on-track', updatedAt: '2026-02-05' },
];

// Overdue reviews
export const overdueReviews: PerformanceUpdate[] = [
  { id: 10, employee: sampleEmployees[2], type: 'review-due', title: 'Annual Performance Review', description: 'Due date: Jan 15, 2026 - 23 days overdue', date: '2026-01-15', },
  { id: 11, employee: sampleEmployees[5], type: 'review-due', title: 'Probation Review', description: 'Due date: Jan 20, 2026 - 18 days overdue', date: '2026-01-20', },
  { id: 12, employee: sampleEmployees[10], type: 'review-due', title: '6-Month Check-in', description: 'Due date: Jan 22, 2026 - 16 days overdue', date: '2026-01-22', },
];

// Upcoming celebrations (birthdays and work anniversaries only)
export const upcomingCelebrations: Celebration[] = [
  { id: 1, employee: sampleEmployees[1], type: 'birthday', date: '2026-02-06' },
  { id: 2, employee: sampleEmployees[6], type: 'work-anniversary', date: '2026-02-07', yearsOfService: 5 },
  { id: 3, employee: sampleEmployees[0], type: 'birthday', date: '2026-02-12' },
  { id: 4, employee: sampleEmployees[4], type: 'work-anniversary', date: '2026-02-02', yearsOfService: 5 },
  { id: 5, employee: sampleEmployees[11], type: 'work-anniversary', date: '2026-02-08', yearsOfService: 5 },
  { id: 6, employee: sampleEmployees[3], type: 'birthday', date: '2026-02-18' },
  { id: 7, employee: sampleEmployees[9], type: 'work-anniversary', date: '2026-02-22', yearsOfService: 3 },
];

// AI-generated messages for different scenarios
export const aiGeneratedMessages = {
  birthdayMessage: (employee: Employee) =>
    `Happy Birthday, ${employee.firstName}! 🎂 Wishing you a fantastic day filled with joy and celebration. Your contributions to the ${employee.department} team are truly valued. Here's to another amazing year ahead!`,

  anniversaryMessage: (employee: Employee, years: number) =>
    `Congratulations on ${years} incredible years, ${employee.firstName}! 🎉 Your dedication and expertise have made a lasting impact on our ${employee.department} team. Thank you for being such a valuable part of our journey. Here's to many more years of success together!`,

  retentionTalkingPoints: (employee: Employee) => [
    `Discuss career growth opportunities within ${employee.department}`,
    `Explore what motivates ${employee.firstName} in their current role`,
    `Review compensation and benefits competitiveness`,
    `Understand work-life balance concerns`,
    `Identify any management or team dynamics issues`,
  ],
};
