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
  { id: 'account', label: 'Account', icon: 'wrench' },
  { id: 'access-levels', label: 'Access Levels', icon: 'lock' },
  { id: 'employee-fields', label: 'Employee Fields', icon: 'list' },
  { id: 'approval', label: 'Approvals', icon: 'check' },
  { id: 'apps', label: 'Apps', icon: 'grid-2' },
  { id: 'benefits', label: 'Benefits', icon: 'heart-pulse' },
  { id: 'company-directory', label: 'Company Directory', icon: 'address-book' },
  { id: 'custom-fields', label: 'Custom Fields', icon: 'sliders' },
  { id: 'email-alerts', label: 'Email Alerts', icon: 'envelope' },
  { id: 'employee-satisfaction', label: 'Employee Satisfaction', icon: 'face-smile' },
  { id: 'employee-wellbeing', label: 'Employee Wellbeing', icon: 'spa' },
  { id: 'hiring', label: 'Hiring', icon: 'id-badge' },
  { id: 'holidays', label: 'Holidays', icon: 'calendar' },
  { id: 'logo-color', label: 'Logo & Color', icon: 'palette' },
  { id: 'offboarding', label: 'Offboarding', icon: 'right-from-bracket' },
  { id: 'onboarding', label: 'Onboarding', icon: 'clipboard-check' },
  { id: 'payroll', label: 'Payroll', icon: 'circle-dollar' },
  { id: 'performance', label: 'Performance', icon: 'chart-line' },
  { id: 'time-off', label: 'Time Off', icon: 'clock' },
  { id: 'time-tracking', label: 'Time Tracking', icon: 'stopwatch' },
  { id: 'training', label: 'Training', icon: 'graduation-cap' },
];

export const accountSubTabs: AccountSubTab[] = [
  { id: 'account-info', label: 'Account Info' },
  { id: 'billing', label: 'Billing' },
  { id: 'aca-settings', label: 'ACA Settings' },
  { id: 'general-settings', label: 'General Settings' },
  { id: 'icalendar-feeds', label: 'iCalendar Feeds' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'import-hours', label: 'Import Hours' },
  { id: 'login-settings', label: 'Login Settings' },
  { id: 'api-app-access', label: 'API & App Access' },
  { id: 'company-ownership', label: 'Company Ownership' },
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

// Company Ownership data
export interface CompanyOwnershipData {
  businessStructure: string;
  companyFit: string;
  ownershipType: 'owner-25' | 'management-control';
  manager: {
    fullName: string;
    birthDate: string;
    citizenshipStatus: 'us' | 'non-us';
    ssn: string;
    email: string;
    phone: string;
    address: {
      street1: string;
      street2: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
}

// Access Levels data
export interface AccessLevelCategory {
  id: string;
  label: string;
  count: number;
  section?: string;
  description: string;
}

export interface AccessLevelEmployee {
  id: string;
  name: string;
  level: string;
  lastLogin: string;
  avatar: string;
}

export const accessLevelCategories: AccessLevelCategory[] = [
  { id: 'all', label: 'All', count: 14, description: 'Give your employees Access Levels to determine their access to information in BambooHR.' },
  { id: 'full-admin', label: 'Full Admin', count: 2, description: 'Full Admins have unrestricted access to all areas of BambooHR.' },
  { id: 'employee-self-service', label: 'Employee Self-Service', count: 12, section: 'Employee Levels', description: 'Employees with self-service access can view and update their own information.' },
  { id: 'managers', label: 'Managers', count: 3, section: 'Manager Levels', description: 'This is a group to manage access for users with manager access.' },
  { id: 'payroll-admin', label: 'Payroll Admin (Non-Approver)', count: 1, section: 'Custom Levels', description: 'Payroll admins who can manage payroll without approval permissions.' },
  { id: 'payroll-reports', label: 'Payroll Reports Only', count: 1, section: 'Custom Levels', description: 'Users who can only view payroll reports.' },
  { id: 'training-manager', label: 'Training Manager', count: 1, section: 'Custom Levels', description: 'Users who manage employee training programs and certifications.' },
  { id: 'no-access', label: 'No Access', count: 2, description: 'Users with no access cannot log in to BambooHR.' },
];

export const accessLevelEmployees: AccessLevelEmployee[] = [
  { id: '1', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb' },
  { id: '2', name: 'Brooklyn Simmons', level: 'Training Manager', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons' },
  { id: '3', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb2' },
  { id: '4', name: 'Brooklyn Simmons', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons2' },
  { id: '5', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb3' },
  { id: '6', name: 'Brooklyn Simmons', level: 'Training Manager', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons3' },
  { id: '7', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb4' },
  { id: '8', name: 'Brooklyn Simmons', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons4' },
  { id: '9', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb5' },
  { id: '10', name: 'Brooklyn Simmons', level: 'Training Manager', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons5' },
  { id: '11', name: 'Theresa Webb', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb6' },
  { id: '12', name: 'Brooklyn Simmons', level: 'Employee Self-Service', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons6' },
  { id: '13', name: 'Theresa Webb', level: 'Full Admin', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=theresawebb7' },
  { id: '14', name: 'Brooklyn Simmons', level: 'Full Admin', lastLogin: 'Jul 23 at 2:30 PM', avatar: 'https://i.pravatar.cc/40?u=brooklynsimmons7' },
];

export const companyOwnershipData: CompanyOwnershipData = {
  businessStructure: 'LLC',
  companyFit: 'None of these fit my company',
  ownershipType: 'management-control',
  manager: {
    fullName: 'Sydney Rasmussen',
    birthDate: '02/17/2001',
    citizenshipStatus: 'us',
    ssn: '123-45-6789',
    email: 'jsmith@email.com',
    phone: '(801) 234-2239',
    address: {
      street1: '42 Future Way',
      street2: '',
      city: 'Draper',
      state: 'UT',
      zip: '84020',
      country: 'United States',
    },
  },
};
