import { useState, useMemo } from 'react';
import { IconV2, Headline, BodyText, Button, Avatar } from '@bamboohr/fabric';
import {
  accountSubTabs,
  accountInfo,
  subscription,
  addOns,
  jobPostings,
  fileStorage,
  upgrades,
  dataCenter,
} from '../../data/settingsData';
import './Settings.css';

interface SettingsProps {
  section?: string;
}

// Map section IDs to display labels
const sectionLabels: Record<string, string> = {
  'account': 'Account',
  'access-levels': 'Access Levels',
  'employee-fields': 'Employee Fields',
  'workflows': 'Workflows',
  'approval': 'Approval',
  'email-templates': 'Email Templates',
  'apps': 'Apps',
};

export function Settings({ section = 'account' }: SettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState('account-info');

  const currentSectionLabel = useMemo(() => {
    return sectionLabels[section] || 'Account';
  }, [section]);

  return (
    <div className="settings-page settings-page--no-sidebar">
      {/* Page Header */}
      <div className="settings-header">
        <Headline size="large">{currentSectionLabel}</Headline>
      </div>

      <div className="settings-layout">
        {/* Main Content Area */}
        <main className="settings-main">
          <div className="settings-card">
            {/* Account Heading */}
            <div className="settings-card-header">
              <Headline size="small">Account</Headline>
            </div>

            {/* Content Layout - Vertical Tabs + Content */}
            <div className="settings-content-layout">
              {/* Vertical Sub-tabs */}
              <div className="settings-subtabs">
                {accountSubTabs.map((tab) => {
                  const isActive = tab.id === activeSubTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`settings-subtab ${isActive ? 'settings-subtab--active' : ''}`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Account Info Content */}
              <div className="settings-content">
                <Headline size="small">Account Info</Headline>

                {/* Account Info Header */}
                <div className="account-info-header">
                  <Headline size="medium">{accountInfo.companyName}</Headline>
                  <div className="account-info-details">
                    <div className="account-info-meta">
                      <div className="account-info-row">
                        <IconV2 name="building-solid" size={16} color="neutral-medium" />
                        <BodyText size="medium" color="neutral-medium">{accountInfo.accountNumber}</BodyText>
                      </div>
                      <div className="account-info-row">
                        <IconV2 name="link-solid" size={16} color="neutral-medium" />
                        <BodyText size="medium" color="neutral-medium">{accountInfo.url}</BodyText>
                      </div>
                    </div>
                    <div className="account-owner">
                      <Avatar src={accountInfo.owner.avatar} size={40} />
                      <div className="account-owner-info">
                        <BodyText size="medium" weight="semibold">{accountInfo.owner.name}</BodyText>
                        <BodyText size="small" color="neutral-medium">{accountInfo.owner.role}</BodyText>
                      </div>
                      <IconV2 name="caret-down-solid" size={12} color="neutral-medium" />
                    </div>
                  </div>
                </div>

                {/* My Subscription Section */}
                <div className="settings-section">
                  <div className="settings-section-header">
                    <Headline size="extra-small">My Subscription</Headline>
                    <Button variant="outlined" color="primary">Manage Subscription</Button>
                  </div>

                  {/* Pro Package Card */}
                  <div className="info-card">
                    <div className="info-card-row">
                      <div className="info-card-left">
                        <div className="info-card-icon">
                          <IconV2 name="shield-solid" size={24} color="primary-strong" />
                        </div>
                        <div className="info-card-text">
                          <BodyText size="large" weight="bold">{subscription.plan}</BodyText>
                          <BodyText size="medium" color="neutral-medium">{subscription.packageType}</BodyText>
                        </div>
                      </div>
                      <BodyText size="medium" color="neutral-medium">{subscription.employees} Employees</BodyText>
                    </div>
                  </div>

                  {/* Add-Ons Card */}
                  <div className="info-card">
                    <BodyText size="medium" weight="medium" color="primary">Add-Ons</BodyText>
                    {addOns.map((addOn) => (
                      <div key={addOn.id} className="info-card-row" style={{ marginTop: 16 }}>
                        <div className="info-card-left">
                          <div className="info-card-icon">
                            <IconV2 name={`${addOn.icon}-solid` as any} size={24} color="primary-strong" />
                          </div>
                          <BodyText size="large" weight="medium">{addOn.title}</BodyText>
                        </div>
                        {addOn.employees && (
                          <BodyText size="medium" color="neutral-medium">{addOn.employees}</BodyText>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Job Postings & File Storage */}
                  <div className="info-card">
                    <div className="info-card-row">
                      <div className="info-card-left">
                        <div className="info-card-icon">
                          <IconV2 name="id-badge-solid" size={24} color="primary-strong" />
                        </div>
                        <BodyText size="large" weight="medium">Job Postings</BodyText>
                      </div>
                      <BodyText size="medium" color="neutral-medium">
                        {jobPostings.current} of {jobPostings.max}
                      </BodyText>
                    </div>
                    <div className="info-card-row">
                      <div className="info-card-left">
                        <div className="info-card-icon">
                          <IconV2 name="file-solid" size={24} color="primary-strong" />
                        </div>
                        <BodyText size="large" weight="medium">File Storage</BodyText>
                      </div>
                      <BodyText size="medium" color="neutral-medium">
                        {fileStorage.used} {fileStorage.unit} of {fileStorage.total} {fileStorage.unit}
                      </BodyText>
                    </div>
                  </div>
                </div>

                {/* Available Upgrades Section */}
                <div className="settings-section">
                  <Headline size="extra-small">Available Upgrades</Headline>
                  {upgrades.map((upgrade) => (
                    <div key={upgrade.id} className="upgrade-card">
                      <div className="info-card-left">
                        <div className="info-card-icon info-card-icon--large">
                          <IconV2 name={`${upgrade.icon}-solid` as any} size={28} color="primary-strong" />
                        </div>
                        <div className="info-card-text">
                          <BodyText size="large" weight="bold">{upgrade.title}</BodyText>
                          <BodyText size="medium" color="neutral-medium">{upgrade.subtitle}</BodyText>
                        </div>
                      </div>
                      <Button variant="text" color="primary">Learn More</Button>
                    </div>
                  ))}
                </div>

                {/* Supercharge Your Workflow */}
                <div className="promo-box">
                  <Headline size="extra-small">Supercharge Your Workflow</Headline>
                  <BodyText size="small" color="neutral-medium">
                    Explore our growing library of integrations to help you work smarter and faster.
                  </BodyText>
                  <div style={{ marginTop: 16 }}>
                    <Button variant="outlined" color="secondary">Explore Apps</Button>
                  </div>
                </div>

                {/* Data Section */}
                <div className="settings-section">
                  <Headline size="extra-small">Data</Headline>
                  <BodyText size="small" color="neutral-medium">Data Center Location</BodyText>
                  <div className="data-location">
                    <IconV2 name="location-dot-solid" size={16} color="primary-strong" />
                    <BodyText size="medium" weight="medium">{dataCenter.location}</BodyText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
