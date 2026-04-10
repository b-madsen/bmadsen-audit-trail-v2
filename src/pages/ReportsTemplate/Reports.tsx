import { useState, ChangeEvent } from 'react';
import {
  IconV2,
  IconButton,
  PageHeaderV2,
  Button,
  SideNavigation,
  Section,
  BodyText,
  Tabs,
  Tab,
  Headline,
  TileV2,
  Table,
  TextButton,
} from '@bamboohr/fabric';
import { favoriteReports as initialFavorites, recentReports, standardReportGroups } from '../../data/analytics';
import type { RecentReport, StandardReport } from '../../data/analytics';
import './Reports.css';

const reportsNavItems = [
  { id: 'recent', label: 'Recent', icon: 'clock' },
  { id: 'dashboards', label: 'Dashboards', icon: 'grid-2' },
  { id: 'standard-reports', label: 'Standard Reports', icon: 'chart-bar' },
  { id: 'benchmarks', label: 'Benchmarks', icon: 'chart-mixed' },
  { id: 'custom-reports', label: 'Custom Reports', icon: 'table', badge: 6 },
  { id: 'new-custom-reports', label: 'New Custom Reports', icon: 'sparkles' },
  { id: 'signed-documents', label: 'Signed Documents', icon: 'file-signature' },
  { id: 'payroll-reports', label: 'Payroll Reports', icon: 'circle-dollar' },
];

const folderNavItems = [
  { id: 'folder-q1', label: 'Q1 2025 Reports', icon: 'folder' },
  { id: 'folder-hr', label: 'HR Leadership', icon: 'folder' },
  { id: 'folder-dept', label: 'Department Summaries', icon: 'folder' },
  { id: 'folder-exec', label: 'Executive Dashboards', icon: 'folder' },
  { id: 'folder-test', label: 'TEST', icon: 'folder' },
];

const searchPlaceholders: Record<string, string> = {
  'recent': 'Search reports...',
  'standard-reports': 'Filter by name, type',
  'custom-reports': 'Filter by name, owner',
};

const recentGroups = [
  { id: 'last-30-days', title: 'Last 30 days' },
];

const recentColumns = [
  {
    header: 'Today',
    cell: (row: RecentReport) => (
      <div className="reports-name-cell">
        <IconV2 name={`${row.icon ?? 'chart-column'}-regular` as any} size={16} color="info-medium" />
        <TextButton onClick={() => {}}>{row.name}</TextButton>
      </div>
    ),
  },
  {
    header: 'Last Viewed',
    cell: (row: RecentReport) => (
      <BodyText size="medium" color="neutral-weak">{row.lastViewed}</BodyText>
    ),
  },
  {
    header: 'Owner',
    cell: (row: RecentReport) => (
      <BodyText size="medium" color="neutral-weak">{row.owner}</BodyText>
    ),
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any;

const standardColumns = [
  {
    headerAriaLabel: 'Report name',
    cell: (row: StandardReport) => (
      <div className="reports-name-cell">
        <IconV2 name={`${row.icon}-regular` as any} size={16} color="info-medium" />
        <TextButton onClick={() => {}}>{row.name}</TextButton>
      </div>
    ),
  },
  {
    header: 'Last Viewed',
    cell: (row: StandardReport) => row.lastViewed
      ? <BodyText size="medium" color="neutral-weak">{row.lastViewed}</BodyText>
      : null,
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any;

export function Reports() {
  const [activeNav, setActiveNav] = useState('recent');
  const [favorites, setFavorites] = useState(initialFavorites);
  const [customTab, setCustomTab] = useState('my-reports');

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const searchPlaceholder = searchPlaceholders[activeNav] ?? 'Search reports...';
  void searchPlaceholder;

  return (
    <div className="reports-page">
      <PageHeaderV2
        title="Reports"
        primaryContent={
          <div className="reports-header-actions">
            <Button
              className="reports-new-report-btn"
              variant="outlined"
              startIcon={<IconV2 name="circle-plus-regular" size={16} />}
            >
              New Report
            </Button>
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
          items={[
            ...reportsNavItems.map((item) => {
              const isActive = item.id === activeNav;
              return (
                <SideNavigation.Link
                  key={item.id}
                  href="#"
                  active={isActive}
                  icon={`${item.icon}-regular` as any}
                  activeIcon={`${item.icon}-solid` as any}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.badge ? (
                    <span className="reports-nav-item-with-badge">
                      {item.label}
                      <span className="reports-nav-badge">{item.badge}</span>
                    </span>
                  ) : item.label}
                </SideNavigation.Link>
              );
            }),
            <SideNavigation.Divider key="divider" />,
            ...folderNavItems.map((item) => {
              const isActive = item.id === activeNav;
              return (
                <SideNavigation.Link
                  key={item.id}
                  href="#"
                  active={isActive}
                  icon={`${item.icon}-regular` as any}
                  activeIcon={`${item.icon}-solid` as any}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </SideNavigation.Link>
              );
            }),
          ]}
        />

        <div className="reports-main">

          {/* ── Recent view ── */}
          {activeNav === 'recent' && (
            <>
              {favorites.length > 0 && (
                <div className="reports-favorites-section">
                  <Headline size="medium" icon="star-solid">Favorites</Headline>
                  <div className="reports-favorites-grid">
                    {favorites.map((report) => (
                      <div key={report.id} className="reports-favorite-tile-wrapper">
                        <TileV2
                          icon={`${report.icon}-regular` as any}
                          title={report.name}
                          height="100%"
                          right={
                            <div className="reports-favorite-remove">
                              <IconButton
                                icon="xmark-regular"
                                aria-label={`Remove ${report.name} from favorites`}
                                noBoundingBox
                                onClick={(e: Event) => { e.stopPropagation(); removeFavorite(report.id); }}
                              />
                            </div>
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Section>
                <Section.Header title="Recent" icon="clock-rotate-left-regular" />
                <div className="reports-section-content">
                  <Table
                    caption="Recent reports"
                    columns={recentColumns}
                    rows={recentReports}
                    rowKey={(row) => (row as RecentReport).id}
                    groups={recentGroups}
                    groupBy={(row) => (row as RecentReport).group === 'last-30-days' ? 'last-30-days' : ''}
                  />
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
                  <div className="reports-section-content">
                    <Table
                      caption={`${group.label} reports`}
                      columns={standardColumns}
                      rows={group.reports}
                      rowKey={(row) => (row as StandardReport).id}
                    />
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
                    <IconV2 name="file-chart-pie-regular" size={60} color="neutral-weak" />
                  </div>
                  <BodyText size="medium" weight="semibold" color="neutral-strong">
                    You haven't created any reports yet.
                  </BodyText>
                  <Button
                    className="reports-new-report-btn"
                    variant="outlined"
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
                    <IconV2 name="file-chart-pie-regular" size={60} color="neutral-weak" />
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
