import { useState } from 'react';
import { IconV2, PageHeaderV2, Button, SideNavigation } from '@bamboohr/fabric';
import { insights, recentReports } from '../../data/analytics';
import './Reports.css';

const reportsNavItems = [
  { id: 'my-reports', label: 'My Reports', icon: 'chart-pie-simple' },
  { id: 'company-reports', label: 'Company Reports', icon: 'building' },
  { id: 'payroll-reports', label: 'Payroll Reports', icon: 'circle-dollar' },
  { id: 'benefits-reports', label: 'Benefits Reports', icon: 'heart-pulse' },
  { id: 'time-off-reports', label: 'Time Off Reports', icon: 'clock' },
  { id: 'performance-reports', label: 'Performance Reports', icon: 'chart-line' },
  { id: 'hiring-reports', label: 'Hiring Reports', icon: 'id-badge' },
];

export function Reports() {
  const [activeNav, setActiveNav] = useState('my-reports');

  return (
    <div className="reports-page">
      {/* Header */}
      <PageHeaderV2
        title="Reports"
        primaryContent={
          <div className="reports-header-actions">
            <div className="reports-search">
              <IconV2 name="magnifying-glass-solid" size={16} color="neutral-strong" />
              <input
                type="text"
                placeholder="Search reports..."
                className="reports-search-input"
              />
            </div>
            <Button variant="contained" color="primary" endIcon={<IconV2 name="chevron-down-solid" size={12} />}>New</Button>
          </div>
        }
      />

      <div className="reports-layout">
        {/* Sidebar */}
        <SideNavigation
          ariaLabel="Reports navigation"
          items={reportsNavItems.map((item) => {
            const isActive = item.id === activeNav;
            return (
              <SideNavigation.Link
                key={item.id}
                active={isActive}
                icon={`${item.icon}-regular` as any}
                activeIcon={`${item.icon}-solid` as any}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </SideNavigation.Link>
            );
          })}
        />

        {/* Main Content */}
        <div className="reports-main">
          {/* Insights Section */}
          <div className="reports-section">
            <div className="reports-section-header">
              <div className="reports-section-title">
                <svg className="reports-star-icon" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z"
                    fill="#2e7918"
                    stroke="#2e7918"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2>Insights</h2>
              </div>
              <button className="reports-view-all">View All</button>
            </div>

            <div className="reports-insights-grid">
              {insights.map((insight) => (
                <div key={insight.id} className="reports-insight-card">
                  <div className="reports-insight-icon">
                    {insight.icon === 'document' && (
                      <IconV2 name="file-lines-solid" size={24} color="neutral-strong" />
                    )}
                    {insight.icon === 'circle-info' && (
                      <IconV2 name="circle-question-solid" size={24} color="neutral-strong" />
                    )}
                    {insight.icon === 'graduation-cap' && (
                      <IconV2 name="id-badge-solid" size={24} color="neutral-strong" />
                    )}
                  </div>
                  <div className="reports-insight-title">{insight.title}</div>
                  <div className="reports-insight-description">{insight.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Viewed Section */}
          <div className="reports-section">
            <div className="reports-section-header">
              <div className="reports-section-title">
                <svg className="reports-clock-icon" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="#2e7918"
                    strokeWidth="1.5"
                  />
                  <path d="M10 6V10L13 13" stroke="#2e7918" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h2>Recently Viewed</h2>
              </div>
            </div>

            <div className="reports-table-card">
              <div className="reports-table-container">
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Owner</th>
                      <th>Last Viewed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports.map((report) => (
                      <tr key={report.id}>
                        <td>
                          <div className="reports-table-name">
                            <IconV2 name="chart-pie-simple-solid" size={16} color="neutral-strong" />
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {report.name}
                            </a>
                            {report.name === 'Age Profile' && (
                              <IconV2 name="user-group-solid" size={16} color="neutral-medium" />
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="reports-table-owner">{report.owner}</span>
                        </td>
                        <td>
                          <span className="reports-table-date">{report.lastViewed}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
