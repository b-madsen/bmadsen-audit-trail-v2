import { useState, Suspense, lazy } from 'react';
import { AskPanel } from './components/AskPanel/AskPanel';
import { Routes, Route, Link, Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  BodyText,
  Headline,
  Section,
  Header,
  PageCapsule,
  IconButton,
  IconV2,
  Button,
  Avatar,
  GlobalNavigation,
  DatePickerProvider,
} from '@bamboohr/fabric';
import { ViewBarProvider, useViewBar } from './contexts/ViewBarContext';
import { ViewBar } from './components/ViewBar';
import './App.css';

// Lazy load pages - working pages
const NavigationOptionA = lazy(() => import('./pages/NavigationOptionA/NavigationOptionA'));
const Files = lazy(() => import('./pages/Files/Files'));
const Hiring = lazy(() => import('./pages/Hiring/Hiring'));
const InboxTest = lazy(() => import('./pages/InboxTest/InboxTest'));
const MyInfo = lazy(() => import('./pages/MyInfo/MyInfo'));
const Payroll = lazy(() => import('./pages/Payroll/Payroll'));
const PayrollDetail = lazy(() => import('./pages/PayrollDetail/PayrollDetail'));
const People = lazy(() => import('./pages/People/People'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ReportsTemplate = lazy(() => import('./pages/ReportsTemplate/Reports'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Benefits = lazy(() => import('./pages/Benefits/Benefits'));
const Compensation = lazy(() => import('./pages/Compensation/Compensation'));

// Additional pages
const Chat = lazy(() => import('./pages/Chat/Chat'));
const CreateJobOpening = lazy(() => import('./pages/CreateJobOpening/CreateJobOpening'));
const AuditTrail = lazy(() => import('./pages/AuditTrail/AuditTrail'));
const HeadcountReport = lazy(() => import('./pages/HeadcountReport/HeadcountReport'));
const HomeTemplate = lazy(() => import('./pages/HomeTemplate/Home'));
const HRManagerHome = lazy(() => import('./pages/HRManagerHome/HRManagerHome'));
const JobOpeningDetail = lazy(() => import('./pages/JobOpeningDetail/JobOpeningDetail'));
const NewEmployeePage = lazy(() => import('./pages/NewEmployeePage/NewEmployeePage'));

// Prototype Index Page
function PrototypeIndex() {
  const prototypes = [
    {
      name: 'Home Template',
      path: '/home',
      description: 'Dashboard with Gridlets, stats cards, and activity feed',
      status: 'ready'
    },
    {
      name: 'HR Manager Home',
      path: '/hr-home',
      description: 'HR manager dashboard with insights and quick actions',
      status: 'ready'
    },
    {
      name: 'Chat / AI Assistant',
      path: '/chat',
      description: 'AI-powered chat assistant interface',
      status: 'ready'
    },
    {
      name: 'Create Job Opening',
      path: '/hiring/create-job',
      description: 'Wizard flow for creating new job openings',
      status: 'ready'
    },
    {
      name: 'Files',
      path: '/files',
      description: 'File management with sidebar navigation and categories',
      status: 'ready'
    },
    {
      name: 'Headcount Report',
      path: '/reports/headcount',
      description: 'Headcount analytics and reporting dashboard',
      status: 'ready'
    },
    {
      name: 'Hiring',
      path: '/hiring',
      description: 'Hiring dashboard with tabs, job openings, and candidates',
      status: 'ready'
    },
    {
      name: 'Inbox',
      path: '/inbox',
      description: 'Request inbox with sidebar navigation and pagination',
      status: 'ready'
    },
    {
      name: 'My Info',
      path: '/my-info',
      description: 'Employee profile with tabs, performance, and feedback',
      status: 'ready'
    },
    {
      name: 'Navigation Option A',
      path: '/navigation-option-a',
      description: 'File browser with PageHeader, breadcrumbs, and sortable file list',
      status: 'ready'
    },
    {
      name: 'New Employee',
      path: '/new-employee',
      description: 'New employee onboarding checklist and tasks',
      status: 'ready'
    },
    {
      name: 'Payroll',
      path: '/payroll',
      description: 'Payroll dashboard with stats cards and reminders',
      status: 'ready'
    },
    {
      name: 'People',
      path: '/people',
      description: 'People directory with list, directory, and org chart views',
      status: 'ready'
    },
    {
      name: 'Power Edit',
      path: '/people/power-edit',
      description: 'AI-powered bulk employee editor with sessions management',
      status: 'ready'
    },
    {
      name: 'Profile',
      path: '/profile',
      description: 'Employee profile detail view',
      status: 'ready'
    },
    {
      name: 'Reports',
      path: '/reports',
      description: 'Reports dashboard with analytics and filters',
      status: 'ready'
    },
    {
      name: 'Settings',
      path: '/settings',
      description: 'Settings page with account info and subscriptions',
      status: 'ready'
    }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <Headline size="large">Ad Astra Mission Control</Headline>
        <BodyText size="large" color="neutral-weak">
          Fabric Design System Prototypes
        </BodyText>
      </div>

      <Section>
        <Section.Header title="Available Prototypes" />
        <div style={{ display: 'grid', gap: '16px', padding: '24px' }}>
          {prototypes.map((proto) => (
            <Link
              key={proto.path}
              to={proto.path}
              style={{
                display: 'block',
                padding: '20px 24px',
                background: 'var(--surface-neutral-xx-weak)',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <BodyText size="large" weight="semibold" color="primary">
                    {proto.name}
                  </BodyText>
                  <BodyText size="small" color="neutral-medium">
                    {proto.description}
                  </BodyText>
                </div>
                <BodyText size="small" color="neutral-weak">
                  {proto.path}
                </BodyText>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: 'var(--text-neutral-medium)'
    }}>
      <BodyText>Loading...</BodyText>
    </div>
  );
}

// Full Layout with Fabric GlobalNavigation + Header
function FullLayout({ children, noCapsule }: { children: React.ReactNode; noCapsule?: boolean }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isAskExpanded, setIsAskExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const p = location.pathname;

  const isFilesActive = p === '/files' || p.startsWith('/files/');
  const isPeopleActive = p === '/people' || p.startsWith('/people/') || p === '/new-employee';
  const isHiringActive = p === '/hiring' || p.startsWith('/hiring/') || p === '/candidates' || p === '/talent-pools';
  const isReportsActive = p === '/reports' || p.startsWith('/reports/');

  return (
    <div className="app-layout">
      <GlobalNavigation
        open={isNavOpen}
        onToggle={() => setIsNavOpen(prev => !prev)}
        footer={[
          <GlobalNavigation.FooterItem key="profile" ariaLabel="Jessica Cordovoa — HR Manager" onClick={() => {}}>
            <Avatar src="https://i.pravatar.cc/48?u=jessica" size={32} />
          </GlobalNavigation.FooterItem>,
        ]}
        links={[
          <GlobalNavigation.Link key="home" active={p === '/home' || p === '/hr-home'} icon="house-regular" activeIcon="house-solid" label="Home" component={RouterLink} to="/home" />,
          <GlobalNavigation.Link key="my-info" active={p === '/my-info'} icon="circle-user-regular" activeIcon="circle-user-solid" label="My Info" component={RouterLink} to="/my-info" />,
          <GlobalNavigation.Link key="people" active={isPeopleActive} icon="user-group-regular" activeIcon="user-group-solid" label="People" component={RouterLink} to="/people" />,
          <GlobalNavigation.Link key="hiring" active={isHiringActive} icon="id-badge-regular" activeIcon="id-badge-solid" label="Hiring" component={RouterLink} to="/hiring" />,
          <GlobalNavigation.Link key="reports" active={isReportsActive} icon="chart-pie-simple-regular" activeIcon="chart-pie-simple-solid" label="Reports" component={RouterLink} to="/reports" />,
          <GlobalNavigation.Link key="files" active={isFilesActive} icon="file-lines-solid" activeIcon="file-lines-solid" label="Files" component={RouterLink} to="/files" />,
          <GlobalNavigation.Link key="payroll" active={p === '/payroll' || p.startsWith('/payroll/')} icon="circle-dollar-regular" activeIcon="circle-dollar-solid" label="Payroll" component={RouterLink} to="/payroll" />,
          <GlobalNavigation.Link key="benefits" active={p === '/benefits'} icon="heart-pulse-regular" activeIcon="heart-pulse-solid" label="Benefits" component={RouterLink} to="/benefits" />,
          <GlobalNavigation.Link key="compensation" active={p === '/compensation'} icon="money-bill-wave-regular" activeIcon="money-bill-wave-solid" label="Compensation" component={RouterLink} to="/compensation" />,
        ]}
      />
      <div className="app-main">
        <div className="header-wrapper">
          <Header
            logo={<img src="/assets/images/bamboohr-logo.svg" alt="BambooHR" height={30} />}
            search={
              <>
                <div className="header-search-field">
                  <Header.SearchInput placeholder="Search..." />
                </div>
                <div className="header-search-icon">
                  <IconButton icon="magnifying-glass-regular" aria-label="Search" variant="outlined" color="secondary" />
                </div>
              </>
            }
            actions={[
              <div key="nav-icons" className="app-header-nav-icons">
                <button className="header-icon-btn" onClick={() => navigate('/inbox')} aria-label="Inbox">
                  <IconV2 name={p === '/inbox' ? 'inbox-solid' : 'inbox-regular'} size={20} color="neutral-extra-strong" />
                </button>
                <button className="header-icon-btn" aria-label="Help">
                  <IconV2 name="circle-question-regular" size={20} color="neutral-extra-strong" />
                </button>
                <button className="header-icon-btn" onClick={() => navigate('/settings/account')} aria-label="Settings">
                  <IconV2 name="gear-regular" size={20} color="neutral-extra-strong" />
                </button>
              </div>,
              <Button key="ask" className="header-ask-btn" variant="outlined" color="primary" startIcon={<img src="/assets/images/ask-icon.svg" alt="" width={16} height={16} />} onClick={() => setIsAskOpen(prev => !prev)}>
                Ask
              </Button>,
            ]}
          />
        </div>
        <div className="app-content-area">
          {noCapsule ? (
            <div className="app-direct-content">{children}</div>
          ) : (
            <PageCapsule>{children}</PageCapsule>
          )}
          {isAskOpen && (
            <div className="ask-panel-wrapper">
              <AskPanel
                isOpen={isAskOpen}
                onClose={() => { setIsAskOpen(false); setIsAskExpanded(false); }}
                isExpanded={isAskExpanded}
                onExpandChange={setIsAskExpanded}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { isVisible } = useViewBar();
  return (
    <>
      <ViewBar />
      <div
        className="app-viewport"
        style={{ paddingTop: isVisible ? '40px' : '0', transition: 'padding-top 0.2s ease' }}
      >
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <ViewBarProvider>
    <DatePickerProvider>
    <Suspense fallback={<PageLoader />}>
      <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/index" element={<FullLayout><PrototypeIndex /></FullLayout>} />
        <Route path="/navigation-option-a" element={<FullLayout><NavigationOptionA /></FullLayout>} />
        {/* Files routes - each category has its own route */}
        <Route path="/files" element={<FullLayout><Files category="all" /></FullLayout>} />
        <Route path="/files/signature-templates" element={<FullLayout><Files category="signature-templates" /></FullLayout>} />
        <Route path="/files/benefits-docs" element={<FullLayout><Files category="benefits-docs" /></FullLayout>} />
        <Route path="/files/payroll" element={<FullLayout><Files category="payroll" /></FullLayout>} />
        <Route path="/files/trainings" element={<FullLayout><Files category="trainings" /></FullLayout>} />
        <Route path="/files/company-policies" element={<FullLayout><Files category="company-policies" /></FullLayout>} />
        {/* Other pages */}
        <Route path="/hiring" element={<FullLayout><Hiring /></FullLayout>} />
        <Route path="/inbox" element={<FullLayout><InboxTest /></FullLayout>} />
        <Route path="/my-info" element={<FullLayout><MyInfo /></FullLayout>} />
        <Route path="/payroll" element={<FullLayout><Payroll /></FullLayout>} />
        <Route path="/payroll/:id" element={<FullLayout><PayrollDetail /></FullLayout>} />
        <Route path="/people" element={<FullLayout><People /></FullLayout>} />
        <Route path="/people/directory" element={<FullLayout><People defaultTab="directory" /></FullLayout>} />
        <Route path="/people/org-chart" element={<FullLayout><People defaultTab="orgChart" /></FullLayout>} />
        <Route path="/profile" element={<FullLayout><Profile /></FullLayout>} />
        <Route path="/reports" element={<FullLayout><ReportsTemplate /></FullLayout>} />
        {/* Settings routes - each section has its own route */}
        <Route path="/settings" element={<FullLayout><Settings section="account" /></FullLayout>} />
        <Route path="/settings/account" element={<FullLayout><Settings section="account" /></FullLayout>} />
        <Route path="/settings/access-levels" element={<FullLayout><Settings section="access-levels" /></FullLayout>} />
        <Route path="/settings/employee-fields" element={<FullLayout><Settings section="employee-fields" /></FullLayout>} />
        <Route path="/settings/workflows" element={<FullLayout><Settings section="workflows" /></FullLayout>} />
        <Route path="/settings/approval" element={<FullLayout><Settings section="approval" /></FullLayout>} />
        <Route path="/settings/email-templates" element={<FullLayout><Settings section="email-templates" /></FullLayout>} />
        <Route path="/settings/apps" element={<FullLayout><Settings section="apps" /></FullLayout>} />
        <Route path="/settings/company-ownership" element={<FullLayout><Settings section="company-ownership" /></FullLayout>} />
        <Route path="/settings/benefits" element={<FullLayout><Settings section="benefits" /></FullLayout>} />
        <Route path="/settings/company-directory" element={<FullLayout><Settings section="company-directory" /></FullLayout>} />
        <Route path="/settings/custom-fields" element={<FullLayout><Settings section="custom-fields" /></FullLayout>} />
        <Route path="/settings/email-alerts" element={<FullLayout><Settings section="email-alerts" /></FullLayout>} />
        <Route path="/settings/employee-satisfaction" element={<FullLayout><Settings section="employee-satisfaction" /></FullLayout>} />
        <Route path="/settings/employee-wellbeing" element={<FullLayout><Settings section="employee-wellbeing" /></FullLayout>} />
        <Route path="/settings/hiring" element={<FullLayout><Settings section="hiring" /></FullLayout>} />
        <Route path="/settings/holidays" element={<FullLayout><Settings section="holidays" /></FullLayout>} />
        <Route path="/settings/logo-color" element={<FullLayout><Settings section="logo-color" /></FullLayout>} />
        <Route path="/settings/offboarding" element={<FullLayout><Settings section="offboarding" /></FullLayout>} />
        <Route path="/settings/onboarding" element={<FullLayout><Settings section="onboarding" /></FullLayout>} />
        <Route path="/settings/payroll" element={<FullLayout><Settings section="payroll" /></FullLayout>} />
        <Route path="/settings/performance" element={<FullLayout><Settings section="performance" /></FullLayout>} />
        <Route path="/settings/time-off" element={<FullLayout><Settings section="time-off" /></FullLayout>} />
        <Route path="/settings/time-tracking" element={<FullLayout><Settings section="time-tracking" /></FullLayout>} />
        <Route path="/settings/training" element={<FullLayout><Settings section="training" /></FullLayout>} />
        {/* Additional pages */}
        <Route path="/home" element={<FullLayout><HomeTemplate /></FullLayout>} />
        <Route path="/hr-home" element={<FullLayout><HRManagerHome /></FullLayout>} />
        <Route path="/chat" element={<FullLayout><Chat /></FullLayout>} />
        <Route path="/hiring/create-job" element={<FullLayout><CreateJobOpening /></FullLayout>} />
        <Route path="/hiring/job/:id" element={<FullLayout><JobOpeningDetail /></FullLayout>} />
        <Route path="/new-employee" element={<FullLayout><NewEmployeePage /></FullLayout>} />
        <Route path="/reports/audit-trail" element={<FullLayout><AuditTrail /></FullLayout>} />
        <Route path="/reports/headcount" element={<FullLayout><HeadcountReport /></FullLayout>} />
        <Route path="/benefits" element={<FullLayout><Benefits /></FullLayout>} />
        <Route path="/compensation" element={<FullLayout><Compensation /></FullLayout>} />
      </Routes>
      </AppShell>
    </Suspense>
    </DatePickerProvider>
    </ViewBarProvider>
  );
}

export default App;
