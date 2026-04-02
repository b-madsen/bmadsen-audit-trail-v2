// HR Manager Home Screen TypeScript Interfaces

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  photoUrl: string;
  engagementScore?: number;
  satisfactionScore?: number;
  turnoverRisk?: 'low' | 'medium' | 'high';
  hireDate?: string;
  lastFeedbackDate?: string;
}

// Department metrics for comparison views
export interface DepartmentMetrics {
  name: string;
  employeeCount: number;
  engagementScore: number;
  engagementTrend: 'up' | 'down' | 'stable';
  satisfactionScore: number;
  turnoverRisk: 'low' | 'medium' | 'high';
  openPositions: number;
  pendingRequests: number;
}

// Quarterly comparison data
export interface QuarterlyMetrics {
  quarter: string;
  year: number;
  engagementScore: number;
  satisfactionScore: number;
  turnoverRate: number;
  headcount: number;
  newHires: number;
  departures: number;
}

// Training and compliance records
export interface TrainingRecord {
  id: number;
  employee: Employee;
  courseName: string;
  category: 'compliance' | 'professional' | 'safety' | 'onboarding';
  dueDate: string;
  status: 'completed' | 'overdue' | 'in-progress' | 'not-started';
  completedDate?: string;
  daysOverdue?: number;
}

// Payroll deadline
export interface PayrollDeadline {
  id: number;
  title: string;
  dueDate: string;
  status: 'upcoming' | 'due-today' | 'overdue';
  description: string;
  actionRequired: string;
}

// Exit interview data for trends
export interface ExitInterviewTrend {
  reason: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

// Survey comments
export interface SurveyComment {
  id: number;
  employee?: Employee;
  anonymous: boolean;
  department: string;
  category: 'engagement' | 'satisfaction' | 'management' | 'culture' | 'growth';
  sentiment: 'positive' | 'neutral' | 'negative';
  comment: string;
  date: string;
}

export interface TeamHealthMetrics {
  engagementScore: number;
  engagementTrend: 'up' | 'down' | 'stable';
  satisfactionScore: number;
  satisfactionTrend: 'up' | 'down' | 'stable';
  turnoverRisk: 'low' | 'medium' | 'high';
  activeEmployees: number;
  onLeaveCount: number;
}

export interface Absence {
  id: number;
  employee: Employee;
  type: 'vacation' | 'sick' | 'personal' | 'parental';
  startDate: string;
  endDate: string;
}

// Coverage gap analysis
export interface CoverageGap {
  id: number;
  date: string;
  department: string;
  role: string;
  requiredCoverage: number;
  availableStaff: number;
  gapSeverity: 'critical' | 'warning' | 'minor';
  conflictingAbsences: Absence[];
}

export interface Celebration {
  id: number;
  employee: Employee;
  type: 'birthday' | 'work-anniversary' | 'achievement';
  date: string;
  yearsOfService?: number;
  achievementTitle?: string;
}

export interface PerformanceUpdate {
  id: number;
  employee: Employee;
  type: 'review-completed' | 'review-due' | 'feedback-received' | 'goal-achieved';
  title: string;
  description: string;
  date: string;
  rating?: number;
}

export interface TimeOffRequest {
  id: number;
  employee: Employee;
  type: 'vacation' | 'sick' | 'personal' | 'parental';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'denied';
  requestedOn: string;
  totalDays: number;
}

export interface GoalProgress {
  id: number;
  employee: Employee;
  goalTitle: string;
  progress: number;
  targetDate: string;
  status: 'on-track' | 'at-risk' | 'behind';
  updatedAt: string;
}

export interface PriorityAlert {
  id: number;
  type: 'warning' | 'info' | 'error' | 'ai';
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  variant?: 'ai';
}

// Feed Item Types
export interface PerformanceFeedItem {
  type: 'performance';
  data: PerformanceUpdate;
}

export interface CelebrationFeedItem {
  type: 'celebration';
  data: Celebration;
  aiSuggestion?: string;
}

export interface TimeOffFeedItem {
  type: 'timeoff';
  data: TimeOffRequest;
}

export interface GoalProgressFeedItem {
  type: 'goal';
  data: GoalProgress;
}

export type FeedItem = PerformanceFeedItem | CelebrationFeedItem | TimeOffFeedItem | GoalProgressFeedItem;

export type FeedFilterType = 'all' | 'performance' | 'timeoff' | 'celebrations';
