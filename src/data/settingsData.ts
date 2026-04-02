export interface SettingsNavItem {
  id: string;
  label: string;
  icon: string;
}

export interface AccountSubTab {
  id: string;
  label: string;
}

export interface AccountOwner {
  name: string;
  role: string;
  avatar: string;
}

export interface AccountInfo {
  companyName: string;
  accountNumber: string;
  url: string;
  owner: AccountOwner;
}

export interface Subscription {
  plan: string;
  packageType: string;
  employees: number;
}

export interface AddOn {
  id: string;
  icon: string;
  title: string;
  employees?: string;
}

export interface JobPostings {
  current: number;
  max: number;
}

export interface FileStorage {
  used: number;
  total: number;
  unit: string;
}

export interface Upgrade {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface DataCenter {
  location: string;
}

export const settingsNavItems: SettingsNavItem[] = [
  { id: 'account', label: 'Account', icon: 'building' },
  { id: 'access-levels', label: 'Access Levels', icon: 'lock' },
  { id: 'employee-fields', label: 'Employee Fields', icon: 'list' },
  { id: 'workflows', label: 'Workflows', icon: 'diagram-project' },
  { id: 'approval', label: 'Approval', icon: 'check' },
  { id: 'email-templates', label: 'Email Templates', icon: 'envelope' },
  { id: 'apps', label: 'Apps', icon: 'grid-2' },
];

export const accountSubTabs: AccountSubTab[] = [
  { id: 'account-info', label: 'Account Info' },
  { id: 'billing', label: 'Billing' },
  { id: 'audit-trail', label: 'Audit Trail' },
  { id: 'api', label: 'API' },
];

export const accountInfo: AccountInfo = {
  companyName: 'BambooHR',
  accountNumber: 'Account #12345',
  url: 'bamboohr.bamboohr.com',
  owner: {
    name: 'John Smith',
    role: 'Account Owner',
    avatar: 'https://i.pravatar.cc/40?u=johnsmith',
  },
};

export const subscription: Subscription = {
  plan: 'Pro',
  packageType: 'All-in-one HR Package',
  employees: 593,
};

export const addOns: AddOn[] = [
  { id: '1', icon: 'clock', title: 'Time Tracking', employees: '250 Employees' },
  { id: '2', icon: 'money-bill', title: 'Payroll', employees: '593 Employees' },
  { id: '3', icon: 'chart-line', title: 'Performance Management' },
];

export const jobPostings: JobPostings = {
  current: 8,
  max: 25,
};

export const fileStorage: FileStorage = {
  used: 2.4,
  total: 10,
  unit: 'GB',
};

export const upgrades: Upgrade[] = [
  {
    id: '1',
    icon: 'graduation-cap',
    title: 'Learning Management',
    subtitle: 'Track employee training and certifications',
  },
  {
    id: '2',
    icon: 'heart',
    title: 'Benefits Administration',
    subtitle: 'Streamline benefits enrollment and management',
  },
];

export const dataCenter: DataCenter = {
  location: 'United States (US-West)',
};
