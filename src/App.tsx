import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
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
import './App.css';

// Lazy load pages - working pages
const NavigationOptionA = lazy(() => import('./pages/NavigationOptionA/NavigationOptionA'));
const Files = lazy(() => import('./pages/Files/Files'));
const Hiring = lazy(() => import('./pages/Hiring/Hiring'));
const InboxTest = lazy(() => import('./pages/InboxTest/InboxTest'));
const MyInfo = lazy(() => import('./pages/MyInfo/MyInfo'));
const Payroll = lazy(() => import('./pages/Payroll/Payroll'));
const People = lazy(() => import('./pages/People/People'));
const PowerEditSessions = lazy(() => import('./pages/PowerEditSessions/PowerEditSessions'));
const PowerEdit = lazy(() => import('./pages/PowerEdit/PowerEdit'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ReportsTemplate = lazy(() => import('./pages/ReportsTemplate/Reports'));
const Settings = lazy(() => import('./pages/Settings/Settings'));

// Pages requiring additional dependencies (commented out until deps resolved)
// const Chat = lazy(() => import('./pages/Chat/Chat'));
// const CreateJobOpening = lazy(() => import('./pages/CreateJobOpening/CreateJobOpening'));
// const HeadcountReport = lazy(() => import('./pages/HeadcountReport/HeadcountReport'));
// const HomeTemplate = lazy(() => import('./pages/HomeTemplate/Home'));
// const HRManagerHome = lazy(() => import('./pages/HRManagerHome/HRManagerHome'));
// const JobOpeningDetail = lazy(() => import('./pages/JobOpeningDetail/JobOpeningDetail'));
// const NewEmployeePage = lazy(() => import('./pages/NewEmployeePage/NewEmployeePage'));

// Prototype Index Page
function PrototypeIndex() {
  const prototypes = [
    {
      name: 'Files',
      path: '/files',
      description: 'File management with sidebar navigation and categories',
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
  const location = useLocation();
  const p = location.pathname;

  const isFilesActive = p === '/files' || p.startsWith('/files/');
  const isPeopleActive = p === '/people' || p.startsWith('/people/');
  const isHiringActive = p === '/hiring' || p === '/candidates' || p === '/talent-pools';
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
          <GlobalNavigation.Link key="home" active={p === '/'} icon="house-regular" activeIcon="house-solid" label="Home" component={RouterLink} to="/" />,
          <GlobalNavigation.Link key="my-info" active={p === '/my-info'} icon="circle-user-regular" activeIcon="circle-user-solid" label="My Info" component={RouterLink} to="/my-info" />,
          <GlobalNavigation.LinkMenu
            key="people"
            active={isPeopleActive}
            icon="user-group-regular"
            activeIcon="user-group-solid"
            label="People"
            menuItems={[
              { text: 'Directory', value: 'people-directory', isActionOnly: true, component: RouterLink, to: '/people/directory' },
              { text: 'Org Chart', value: 'people-org-chart', isActionOnly: true, component: RouterLink, to: '/people/org-chart' },
            ]}
          />,
          <GlobalNavigation.LinkMenu
            key="hiring"
            active={isHiringActive}
            icon="id-badge-regular"
            activeIcon="id-badge-solid"
            label="Hiring"
            menuItems={[
              { text: 'Job Openings', value: 'job-openings', isActionOnly: true, component: RouterLink, to: '/hiring' },
              { text: 'Candidates', value: 'candidates', isActionOnly: true, component: RouterLink, to: '/hiring' },
              { text: 'Talent Pools', value: 'talent-pools', isActionOnly: true, component: RouterLink, to: '/hiring' },
            ]}
          />,
          <GlobalNavigation.LinkMenu
            key="reports"
            active={isReportsActive}
            icon="chart-pie-simple-regular"
            activeIcon="chart-pie-simple-solid"
            label="Reports"
            menuItems={[
              { text: 'Standard Reports', value: 'reports-standard', isActionOnly: true, component: RouterLink, to: '/reports' },
              { text: 'Benchmarks', value: 'reports-benchmarks', isActionOnly: true, component: RouterLink, to: '/reports' },
              { text: 'Custom Reports', value: 'reports-custom', isActionOnly: true, component: RouterLink, to: '/reports' },
              { text: 'New Custom Reports', value: 'reports-new-custom', isActionOnly: true, component: RouterLink, to: '/reports' },
              { text: 'Signed Documents', value: 'reports-signed', isActionOnly: true, component: RouterLink, to: '/reports' },
            ]}
          />,
          <GlobalNavigation.LinkMenu
            key="files"
            active={isFilesActive}
            icon="file-lines-solid"
            activeIcon="file-lines-solid"
            label="Files"
            menuItems={[
              { text: 'Signature Templates', value: 'sig-templates', isActionOnly: true, component: RouterLink, to: '/files/signature-templates' },
              { text: 'Benefits Docs (137)', value: 'benefits-docs', isActionOnly: true, component: RouterLink, to: '/files/benefits-docs' },
              { text: 'Payroll (12)', value: 'payroll-files', isActionOnly: true, component: RouterLink, to: '/files/payroll' },
              { text: 'Trainings (23)', value: 'trainings', isActionOnly: true, component: RouterLink, to: '/files/trainings' },
              { text: 'Company Policies (7)', value: 'company-policies', isActionOnly: true, component: RouterLink, to: '/files/company-policies' },
            ]}
          />,
          <GlobalNavigation.Link key="payroll" active={p === '/payroll'} icon="circle-dollar-regular" activeIcon="circle-dollar-solid" label="Payroll" component={RouterLink} to="/payroll" />,
          <GlobalNavigation.Link key="benefits" active={false} icon="heart-pulse-regular" activeIcon="heart-pulse-solid" label="Benefits" />,
          <GlobalNavigation.LinkMenu
            key="compensation"
            active={false}
            icon="money-bill-wave-regular"
            activeIcon="money-bill-wave-solid"
            label="Compensation"
            menuItems={[
              { text: 'Total Rewards', value: 'total-rewards', isActionOnly: true },
              { text: 'More', value: 'more', isActionOnly: true },
            ]}
          />,
        ]}
      />
      <div className="app-main">
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
              <GlobalNavigation.FooterItem ariaLabel="Inbox" component={RouterLink} to="/inbox">
                <IconV2 name={p === '/inbox' ? 'inbox-solid' : 'inbox-regular'} size={20} />
              </GlobalNavigation.FooterItem>
              <GlobalNavigation.FooterItem ariaLabel="Help">
                <IconV2 name="circle-question-regular" size={20} />
              </GlobalNavigation.FooterItem>
              <GlobalNavigation.FooterItem ariaLabel="Settings" component={RouterLink} to="/settings">
                <IconV2 name={p === '/settings' ? 'gear-solid' : 'gear-regular'} size={20} />
              </GlobalNavigation.FooterItem>
            </div>,
            <Button key="ask" className="header-ask-btn" variant="outlined" color="primary" startIcon={<IconV2 name="sparkles-solid" size={16} />}>
              Ask
            </Button>,
          ]}
        />
        {noCapsule ? (
          <div className="app-direct-content">{children}</div>
        ) : (
          <PageCapsule>{children}</PageCapsule>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <DatePickerProvider>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/people" replace />} />
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
        <Route path="/people" element={<FullLayout><People /></FullLayout>} />
        <Route path="/people/directory" element={<FullLayout><People defaultTab="directory" /></FullLayout>} />
        <Route path="/people/org-chart" element={<FullLayout><People defaultTab="orgChart" /></FullLayout>} />
        <Route path="/people/power-edit" element={<FullLayout><PowerEditSessions /></FullLayout>} />
        <Route path="/people/power-edit/edit" element={<FullLayout noCapsule><PowerEdit /></FullLayout>} />
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
      </Routes>
    </Suspense>
    </DatePickerProvider>
  );
}

export default App;
