export interface PayrollDate {
  id: string;
  day: string;
  month: string;
  dayOfWeek: string;
  isSelected: boolean;
  badge?: string;
}

export interface PayrollStat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface Reminder {
  id: string;
  text: string;
  completed: boolean;
}

export interface PayrollDetail {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export const payrollDates: PayrollDate[] = [
  { id: '1', day: '19', month: 'January', dayOfWeek: 'Friday', isSelected: false },
  { id: '2', day: '26', month: 'January', dayOfWeek: 'Friday', isSelected: true },
  { id: '3', day: '2', month: 'February', dayOfWeek: 'Friday', isSelected: false, badge: '9' },
  { id: '4', day: '16', month: 'February', dayOfWeek: 'Friday', isSelected: false },
  { id: '5', day: '22', month: 'February', dayOfWeek: 'Friday', isSelected: false },
];

export const payrollStats: PayrollStat[] = [
  { id: '1', icon: 'users', value: '593', label: 'Total Employees' },
  { id: '2', icon: 'circle-dollar', value: '$1.2M', label: 'Total Payroll' },
  { id: '3', icon: 'clock', value: '4,752', label: 'Hours Worked' },
  { id: '4', icon: 'calendar', value: '12', label: 'Pay Periods' },
];

export const reminders: Reminder[] = [
  { id: '1', text: 'Review time off requests', completed: false },
  { id: '2', text: 'Verify bonus calculations', completed: false },
  { id: '3', text: 'Check for missing timesheets', completed: true },
  { id: '4', text: 'Update tax withholdings', completed: false },
];

export const payrollDetails: PayrollDetail[] = [
  { id: '1', icon: 'calendar', value: 'Feb 1 - Feb 15', label: 'Pay Period' },
  { id: '2', icon: 'clock', value: '80 hrs', label: 'Standard Hours' },
  { id: '3', icon: 'users', value: '593', label: 'Employees' },
  { id: '4', icon: 'building', value: 'Bi-weekly', label: 'Schedule' },
];

export const payrollTitle = 'January 26 Payroll';
export const dueDate = 'Due by Jan 13, 2026';
export const payrollId = 'Payroll ID: PR-2026-0215';
export const updatesText = '12 employees have changes that may affect this payroll, including new hires, terminations, and compensation changes.';
