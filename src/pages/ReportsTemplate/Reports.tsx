import { useState, ChangeEvent } from 'react';
import { IconV2, IconButton, PageHeaderV2, Button, SideNavigation, Section, BodyText, Tabs, Tab } from '@bamboohr/fabric';
import { favoriteReports as initialFavorites, recentReports, standardReportGroups } from '../../data/analytics';
import './Reports.css';

const reportsNavItems = [
  { id: 'recent', label: 'Recent', icon: 'clock' },
  { id: 'standard-reports', label: 'Standard Reports', icon: 'chart-bar' },
  { id: 'benchmarks', label: 'Benchmarks', icon: 'chart-mixed' },
  { id: 'custom-reports', label: 'Custom Reports', icon: 'table' },
  { id: 'new-custom-reports', label: 'New Custom Reports', icon: 'sparkles' },
  { id: 'signed-documents', label: 'Signed Documents', icon: 'file-signature' },
  { id: 'payroll-reports', label: 'Payroll Reports', icon: 'circle-dollar' },
];

const searchPlaceholders: Record<string, string> = {
  'recent': 'Search reports...',
  'standard-reports': 'Filter by name, type',
  'custom-reports': 'Filter by name, owner',
};

export function Reports() {
  const [activeNav, setActiveNav] = useState('recent');
  const [favorites, setFavorites] = useState(initialFavorites);
  const [customTab, setCustomTab] = useState('my-reports');

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const searchPlaceholder = searchPlaceholders[activeNav] ?? 'Search reports...';

  return (
    <div className="reports-page">
      <PageHeaderV2
        title="Reports"
        primaryContent={
          <div className="reports-header-actions">
            <div className="reports-search">
              <IconV2 name="magnifying-glass-solid" size={16} color="neutral-strong" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="reports-search-input"
              />
            </div>
            <Button variant="outlined" startIcon={<IconV2 name="circle-plus-solid" size={16} />}>New Report</Button>
            <IconButton
              icon="folder-plus-regular"
              aria-label="New Folder"
              variant="outlined"
              color="secondary"
            />
          </div>
        }
      />

      <div className="reports-layout">
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

        <div className="reports-main">

          {/* ── Recent view ── */}
          {activeNav === 'recent' && (
            <>
              {favorites.length > 0 && (
                <div className="reports-favorites-section">
                  <div className="reports-favorites-header">
                    <IconV2 name="star-solid" size={16} color="primary-strong" />
                    <span className="reports-favorites-title">Favorites</span>
                  </div>
                  <div className="reports-favorites-grid">
                    {favorites.map((report) => (
                      <div key={report.id} className="reports-favorite-card">
                        <button
                          className="reports-favorite-remove"
                          onClick={() => removeFavorite(report.id)}
                          aria-label={`Remove ${report.name} from favorites`}
                        >
                          <IconV2 name="xmark-regular" size={12} color="neutral-medium" />
                        </button>
                        <div className="reports-favorite-icon-tile">
                          <IconV2 name={`${report.icon}-regular` as any} size={20} color="primary-strong" />
                        </div>
                        <BodyText size="small" color="primary">{report.name}</BodyText>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Section>
                <Section.Header title="Recent" icon="clock-rotate-left-regular" />
                <div className="reports-table-wrapper">
                <table className="reports-recent-table">
                  <thead>
                    <tr>
                      <th className="reports-recent-th reports-recent-th--name">Last 30 days</th>
                      <th className="reports-recent-th">Last Viewed</th>
                      <th className="reports-recent-th">Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports.map((report) => (
                      <tr key={report.id} className="reports-recent-row">
                        <td className="reports-recent-td">
                          <div className="reports-recent-name-cell">
                            <IconV2 name="chart-column-regular" size={16} color="info-medium" />
                            <a href="#" className="reports-recent-link" onClick={(e) => e.preventDefault()}>
                              {report.name}
                            </a>
                          </div>
                        </td>
                        <td className="reports-recent-td">
                          <BodyText size="medium" color="neutral-weak">{report.lastViewed}</BodyText>
                        </td>
                        <td className="reports-recent-td">
                          <BodyText size="medium" color="neutral-weak">{report.owner}</BodyText>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </Section>
            </>
          )}

          {/* ── Standard Reports view ── */}
          {activeNav === 'standard-reports' && (
            <>
              {standardReportGroups.map((group) => (
                <Section key={group.id}>
                  <Section.Header title={group.label} icon={`${group.icon}-solid` as any} />
                  <div className="reports-table-wrapper">
                  <table className="reports-standard-table">
                    <thead>
                      <tr>
                        <th className="reports-standard-th reports-standard-th--name">Name</th>
                        <th className="reports-standard-th">Last Viewed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.reports.map((report) => (
                        <tr key={report.id} className="reports-standard-row">
                          <td className="reports-standard-td">
                            <div className="reports-standard-name-cell">
                              <IconV2 name={`${report.icon}-regular` as any} size={16} color="info-medium" />
                              <a href="#" className="reports-recent-link" onClick={(e) => e.preventDefault()}>
                                {report.name}
                              </a>
                            </div>
                          </td>
                          <td className="reports-standard-td">
                            {report.lastViewed && (
                              <BodyText size="medium" color="neutral-weak">{report.lastViewed}</BodyText>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </Section>
              ))}
            </>
          )}

          {/* ── Custom Reports view ── */}
          {activeNav === 'custom-reports' && (
            <Section>
              <Section.Header title="Custom Reports" icon="table-solid" />
              <div className="reports-custom-tabs">
                <Tabs
                  value={customTab}
                  onChange={(value: unknown, _e: ChangeEvent<Element>) => setCustomTab(value as string)}
                  mode="line"
                >
                  <Tab label="My Reports" value="my-reports" />
                  <Tab label="Company Reports" value="company-reports" />
                </Tabs>
              </div>
              {customTab === 'my-reports' && (
                <div className="reports-blank-state">
                  <div className="reports-blank-state-icon">
                    <IconV2 name="file-chart-pie-regular" size={64} color="neutral-x-weak" />
                  </div>
                  <BodyText size="medium" weight="semibold" color="neutral-strong">
                    You haven't created any reports yet.
                  </BodyText>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<IconV2 name="circle-plus-regular" size={16} />}
                    onClick={() => {}}
                  >
                    New Report
                  </Button>
                </div>
              )}
              {customTab === 'company-reports' && (
                <div className="reports-blank-state">
                  <div className="reports-blank-state-icon">
                    <IconV2 name="file-chart-pie-regular" size={64} color="neutral-x-weak" />
                  </div>
                  <BodyText size="medium" weight="semibold" color="neutral-strong">
                    No company reports available yet.
                  </BodyText>
                </div>
              )}
            </Section>
          )}

        </div>
      </div>
    </div>
  );
}

export default Reports;
