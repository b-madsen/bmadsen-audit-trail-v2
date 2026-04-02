import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Avatar,
  BodyText,
  GlobalNavigation,
  Header,
  Headline,
  IconButton,
  IconV2,
  PageCapsule,
  Section,
  TextButton,
  TextField,
  Button,
} from '@bamboohr/fabric';
import './HeadcountReport.css';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const barChartData = [
  { month: "Apr '23", headcount: 37 },
  { month: 'May', headcount: 42 },
  { month: 'Jun', headcount: 49 },
  { month: 'Jul', headcount: 52 },
  { month: 'Aug', headcount: 50 },
  { month: 'Sep', headcount: 56 },
  { month: 'Oct', headcount: 64 },
  { month: 'Nov', headcount: 64 },
  { month: 'Dec', headcount: 75 },
  { month: "Jan '24", headcount: 81 },
  { month: 'Feb', headcount: 81 },
  { month: 'Mar', headcount: 85 },
  { month: 'Apr', headcount: 85 },
];

const employeeData = [
  { id: 1, name: 'Wade Warren', hireDate: '01/20/2023', jobTitle: 'Network Security Engineer', department: 'Product', division: 'North America', location: 'Lindon, UT', status: 'Full-Time' },
  { id: 2, name: 'Theresa Webb', hireDate: '01/20/2023', jobTitle: 'Big Data Engineer', department: 'Product', division: 'North America', location: 'Lindon, UT', status: 'Full-Time' },
  { id: 3, name: 'Brooklyn Simmons', hireDate: '01/20/2023', jobTitle: 'Head of Sales', department: 'Sales', division: 'North America', location: 'Lindon, UT', status: 'Full-Time' },
  { id: 4, name: 'Ralph Edwards', hireDate: '01/20/2023', jobTitle: 'Database Administrator', department: 'Product', division: 'North America', location: 'Lindon, UT', status: 'Full-Time' },
];

// Repeat data 3x to match the 12 rows in the design
const tableRows = [
  ...employeeData,
  ...employeeData.map((e) => ({ ...e, id: e.id + 4 })),
  ...employeeData.map((e) => ({ ...e, id: e.id + 8 })),
];

// ---------------------------------------------------------------------------
// Chart Section Component
// ---------------------------------------------------------------------------

const HeadcountChartSection: React.FC = () => {
  const maxHeadcount = Math.max(...barChartData.map(d => d.headcount));

  return (
    <div className="chart-card">
      <div className="chart-area">
        <div className="simple-bar-chart">
          {barChartData.map((d, i) => (
            <div key={i} className="bar-column">
              <div className="bar-value">{d.headcount}</div>
              <div
                className="bar"
                style={{ height: `${(d.headcount / maxHeadcount) * 150}px` }}
              />
              <div className="bar-label">{d.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div className="chart-summary">
        <BodyText size="small" weight="semibold" color="primary">Apr 11, 2024</BodyText>

        <Headline size="extra-small">Total Employees</Headline>

        <div className="chart-summary-count">
          <IconV2 name="users-solid" size={24} color="neutral-strong" />
          <span className="chart-summary-number">85</span>
          <div className="chart-summary-change">
            <BodyText size="small" weight="semibold" color="success-strong">+50</BodyText>
            <BodyText size="extra-small" color="neutral-medium">(135%)</BodyText>
            <BodyText size="extra-small" color="neutral-medium">Last 12 Months</BodyText>
          </div>
        </div>

        <div className="chart-summary-years">
          <div className="year-row">
            <BodyText size="extra-small" color="neutral-medium">2023</BodyText>
            <div className="year-bar-row">
              <div className="year-bar-track">
                <div className="year-bar" style={{ width: '100%' }} />
              </div>
              <BodyText size="extra-small" color="neutral-medium">85</BodyText>
            </div>
          </div>
          <div className="year-row">
            <BodyText size="extra-small" color="neutral-medium">2022</BodyText>
            <div className="year-bar-row">
              <div className="year-bar-track">
                <div className="year-bar" style={{ width: '33%' }} />
              </div>
              <BodyText size="extra-small" color="neutral-medium">28</BodyText>
            </div>
          </div>
          <div className="year-row">
            <BodyText size="extra-small" color="neutral-medium">2021</BodyText>
            <div className="year-bar-row">
              <div className="year-bar-track">
                <div className="year-bar" style={{ width: '20%' }} />
              </div>
              <BodyText size="extra-small" color="neutral-medium">17</BodyText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export const HeadcountReport: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  const navLinks = [
    <GlobalNavigation.Link
      key="index"
      icon="grid-2-regular"
      activeIcon="grid-2-solid"
      active={false}
      href="/"
      onClick={handleNavClick('/')}
      label="All Prototypes"
    />,
    <GlobalNavigation.Link
      key="home"
      icon="house-regular"
      activeIcon="house-solid"
      active={isActive('/hr-manager-home')}
      href="/hr-manager-home"
      onClick={handleNavClick('/hr-manager-home')}
      label="Home"
    />,
    <GlobalNavigation.Link
      key="profile"
      icon="circle-user-regular"
      activeIcon="circle-user-solid"
      active={isActive('/employee-profile')}
      href="/employee-profile"
      onClick={handleNavClick('/employee-profile')}
      label="My Info"
    />,
    <GlobalNavigation.Link
      key="people"
      icon="users-regular"
      activeIcon="users-solid"
      active={isActive('/people')}
      href="/people"
      onClick={handleNavClick('/people')}
      label="People"
    />,
    <GlobalNavigation.Link
      key="reports"
      icon="chart-pie-regular"
      activeIcon="chart-pie-solid"
      active={isActive('/reports')}
      href="/reports"
      onClick={handleNavClick('/reports')}
      label="Reports"
    />,
  ];

  const footerItems = [
    <GlobalNavigation.FooterItem key="avatar" ariaLabel="User menu">
      <Avatar src="https://i.pravatar.cc/32?u=sarah" size={32} />
    </GlobalNavigation.FooterItem>,
  ];

  return (
    <div className="report-layout">
      <GlobalNavigation
        open={navOpen}
        onToggle={() => setNavOpen(!navOpen)}
        links={navLinks}
        footer={footerItems}
      />

      <div className="report-main">
        <Header
          logo={<img src="/bamboohr-logo.svg" alt="BambooHR" height={28} />}
          search={<Header.SearchInput placeholder="Search..." />}
          actions={[
            <IconButton key="mail" icon="envelope-regular" aria-label="Messages" variant="outlined" color="secondary" />,
            <IconButton key="help" icon="circle-question-regular" aria-label="Help" variant="outlined" color="secondary" />,
            <IconButton key="settings" icon="gear-regular" aria-label="Settings" variant="outlined" color="secondary" />,
            <Button key="ask" color="ai" variant="outlined" icon="sparkles-solid">
              Ask
            </Button>,
          ]}
        />

        <PageCapsule>
          <div className="report-content">
            {/* Page Header */}
            <div className="report-page-header">
              <TextButton size="small" color="secondary" startIcon={<IconV2 name="chevron-left-solid" size={10} />} onClick={() => navigate('/')}>
                Back
              </TextButton>
              <div className="report-title-row">
                <div>
                  <Headline size="large">Headcount</Headline>
                  <BodyText size="small" color="neutral-medium">88 People</BodyText>
                </div>
                <div className="report-actions">
                  <IconButton
                    icon="user-group-regular"
                    aria-label="People view"
                    variant="outlined"
                    color="secondary"
                  />
                  <IconButton
                    icon="ellipsis-solid"
                    aria-label="More actions"
                    variant="outlined"
                    color="secondary"
                  />
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="report-filter-bar">
              <div className="filter-row">
                <TextField label="" value="01 Nov 2013" />
                <TextField label="" value="01 Nov 2024" />
                <Button color="secondary" variant="outlined" size="small" endIcon={<IconV2 name="chevron-down-solid" size={12} />}>
                  All Employees
                </Button>
              </div>
            </div>

            {/* Chart Section */}
            <Section>
              <HeadcountChartSection />
            </Section>

            {/* Data Table Section */}
            <Section>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Hire Date</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Division</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <TextButton size="small">{row.name}</TextButton>
                      </td>
                      <td>{row.hireDate}</td>
                      <td>{row.jobTitle}</td>
                      <td>{row.department}</td>
                      <td>{row.division}</td>
                      <td>{row.location}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </div>
        </PageCapsule>
      </div>
    </div>
  );
};

export default HeadcountReport;
