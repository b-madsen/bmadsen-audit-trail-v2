import { useNavigate } from 'react-router-dom';
import {
  BodyText,
  Headline,
  Section,
  IconV2,
  Pill,
  PillType,
} from '@bamboohr/fabric';
import './PrototypeIndex.css';

type PageStatus = 'ready' | 'error' | 'warning' | 'in-progress';

interface PrototypeCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  status: PageStatus;
}

const statusConfig: Record<PageStatus, { type: PillType; label: string }> = {
  ready: { type: PillType.Success, label: 'Ready' },
  error: { type: PillType.Error, label: 'Build Error' },
  warning: { type: PillType.Warning, label: 'Needs Review' },
  'in-progress': { type: PillType.Info, label: 'In Progress' },
};

const prototypes: PrototypeCard[] = [
  // Ready
  {
    id: 'create-job-opening',
    title: 'Create Job Opening',
    description: 'Wizard for creating new job postings with AI-assisted description generation.',
    icon: 'briefcase-solid',
    path: '/create-job-opening',
    status: 'ready',
  },
  {
    id: 'files',
    title: 'Files',
    description: 'Document management for employee files and company documents.',
    icon: 'folder-solid',
    path: '/files',
    status: 'ready',
  },
  {
    id: 'hiring',
    title: 'Hiring',
    description: 'Recruiting dashboard with job openings, candidates, and talent pools.',
    icon: 'user-plus-solid',
    path: '/hiring',
    status: 'ready',
  },
  {
    id: 'home-template',
    title: 'Home (Template)',
    description: 'Employee home dashboard with timesheet, time off, and company updates.',
    icon: 'house-user-solid',
    path: '/home-template',
    status: 'ready',
  },
  {
    id: 'inbox',
    title: 'Inbox',
    description: 'Requests inbox with sidebar navigation, pagination, and approval workflows.',
    icon: 'inbox-solid',
    path: '/inbox',
    status: 'ready',
  },
  {
    id: 'job-opening-detail',
    title: 'Job Opening Detail',
    description: 'Detailed view of a job opening with candidates and pipeline stages.',
    icon: 'file-lines-solid',
    path: '/job-opening-detail',
    status: 'ready',
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Personal employee information and settings management.',
    icon: 'id-card-solid',
    path: '/my-info',
    status: 'ready',
  },
  {
    id: 'new-employee',
    title: 'New Employee',
    description: 'New hire onboarding page with tasks and welcome information.',
    icon: 'user-check-solid',
    path: '/new-employee',
    status: 'ready',
  },
  {
    id: 'payroll',
    title: 'Payroll',
    description: 'Payroll management dashboard with pay runs and employee compensation.',
    icon: 'money-check-dollar-solid',
    path: '/payroll',
    status: 'ready',
  },
  {
    id: 'people-template',
    title: 'People (Template)',
    description: 'Alternative employee directory view from template.',
    icon: 'address-book-solid',
    path: '/people-template',
    status: 'ready',
  },
  {
    id: 'reports-template',
    title: 'Reports (Template)',
    description: 'Analytics and reporting dashboard from template.',
    icon: 'chart-bar-solid',
    path: '/reports-template',
    status: 'ready',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Application settings and configuration options.',
    icon: 'gear-solid',
    path: '/settings',
    status: 'ready',
  },
  // Build Errors
  {
    id: 'chat',
    title: 'Chat',
    description: 'AI chat interface for employee questions and HR assistance.',
    icon: 'comments-solid',
    path: '/chat',
    status: 'error',
  },
  {
    id: 'headcount-report',
    title: 'Headcount Report',
    description: 'Analytics dashboard showing headcount trends and department breakdowns.',
    icon: 'chart-pie-solid',
    path: '/reports',
    status: 'error',
  },
  {
    id: 'hr-manager-home',
    title: 'HR Manager Home',
    description: 'Dashboard for HR managers with AI-powered insights, team overview, and quick actions.',
    icon: 'house-solid',
    path: '/hr-manager-home',
    status: 'error',
  },
  {
    id: 'people-list',
    title: 'People List',
    description: 'Employee directory with filtering, sorting, and bulk actions.',
    icon: 'users-solid',
    path: '/people',
    status: 'error',
  },
];

export const PrototypeIndex = () => {
  const navigate = useNavigate();

  const handleCardClick = (prototype: PrototypeCard) => {
    navigate(prototype.path);
  };

  return (
    <Section>
      <div className="prototype-index">
        <div className="prototype-index__header">
          <Headline size="medium">Fabric Prototypes</Headline>
          <BodyText size="large" color="neutral-weak">
            Click on a prototype to view it. Some prototypes have broken Fabric imports and need fixes.
          </BodyText>
        </div>

        <div className="prototype-index__grid">
          {prototypes.map((prototype) => {
            const config = statusConfig[prototype.status];
            const hasError = prototype.status === 'error';
            return (
              <div
                key={prototype.id}
                className={`prototype-card ${hasError ? 'prototype-card--error' : ''}`}
                onClick={() => handleCardClick(prototype)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCardClick(prototype);
                  }
                }}
              >
                <div className="prototype-card__icon">
                  <IconV2 name={prototype.icon} size={32} color={hasError ? 'neutral-medium' : 'primary-strong'} />
                </div>
                <div className="prototype-card__content">
                  <div className="prototype-card__title">
                    <BodyText size="large" weight="semibold">
                      {prototype.title}
                    </BodyText>
                    <Pill muted type={config.type}>{config.label}</Pill>
                  </div>
                  <BodyText size="small" color="neutral-weak">
                    {prototype.description}
                  </BodyText>
                </div>
                <div className="prototype-card__arrow">
                  <IconV2 name="chevron-right-solid" size={16} color="neutral-medium" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default PrototypeIndex;
