import { useState, useMemo, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconV2, BodyText, Button, Avatar, PageHeaderV2, Headline, TextField, SideNavigation, SideSubNavigation, IconButton, TextButton } from '@bamboohr/fabric';
import {
  settingsNavItems,
  accountSubTabs,
  accountInfo,
  subscription,
  addOns,
  jobPostings,
  fileStorage,
  upgrades,
  dataCenter,
  companyOwnershipData,
  accessLevelCategories,
  accessLevelEmployees,
} from '../../data/settingsData';
import './Settings.css';

interface SettingsProps {
  section?: string;
}

export function Settings({ section = 'account' }: SettingsProps) {
  const initialSubTab = section === 'company-ownership' ? 'company-ownership' : 'account-info';
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const [ownershipType, setOwnershipType] = useState(companyOwnershipData.ownershipType);
  const [citizenshipStatus, setCitizenshipStatus] = useState<'us' | 'non-us'>(companyOwnershipData.manager.citizenshipStatus);

  // Access Levels state
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [alSearchText, setAlSearchText] = useState('');
  const [gearMenuOpen, setGearMenuOpen] = useState(false);
  const [alCurrentPage, setAlCurrentPage] = useState(1);
  const gearMenuRef = useRef<HTMLDivElement>(null);

  // Close gear menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (gearMenuRef.current && !gearMenuRef.current.contains(event.target as Node)) {
        setGearMenuOpen(false);
      }
    }
    if (gearMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [gearMenuOpen]);

  const selectedCategory = useMemo(() => {
    return accessLevelCategories.find((c) => c.id === selectedLevel) || accessLevelCategories[0];
  }, [selectedLevel]);

  const filteredEmployees = useMemo(() => {
    let employees = accessLevelEmployees;
    if (selectedLevel !== 'all') {
      const cat = accessLevelCategories.find((c) => c.id === selectedLevel);
      if (cat) {
        if (selectedLevel === 'no-access') {
          employees = [];
        } else if (selectedLevel === 'full-admin') {
          employees = accessLevelEmployees.filter((e) => e.level === 'Full Admin');
        } else if (selectedLevel === 'managers') {
          employees = accessLevelEmployees.filter((e) => e.level === 'Managers' || e.name === 'Theresa Webb' || e.name === 'Brooklyn Simmons').slice(0, cat.count);
        } else {
          employees = accessLevelEmployees.filter((e) => e.level === cat.label).slice(0, cat.count);
        }
      }
    }
    if (alSearchText) {
      employees = employees.filter((e) =>
        e.name.toLowerCase().includes(alSearchText.toLowerCase())
      );
    }
    return employees;
  }, [selectedLevel, alSearchText]);

  const isAllSelected = selectedLevel === 'all';
  const showLevelColumn = isAllSelected;
  const totalEmployees = isAllSelected ? 43 : selectedCategory.count;
  const pageSize = 25;
  const totalPages = Math.ceil(totalEmployees / pageSize);

  return (
    <div className="settings-page">
      {/* Page Header */}
      <PageHeaderV2 title="Settings" />

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <SideNavigation
          ariaLabel="Settings navigation"
          items={settingsNavItems.flatMap((item) => {
            const isActive = item.id === section || (item.id === 'account' && section === 'company-ownership');
            const link = (
              <SideNavigation.Link
                key={item.id}
                active={isActive}
                icon={`${item.icon}-regular` as any}
                activeIcon={`${item.icon}-solid` as any}
                component={RouterLink}
                to={`/settings/${item.id}`}
              >
                {item.label}
              </SideNavigation.Link>
            );
            if (item.id === 'account') {
              return [link, <SideNavigation.Divider key="divider-account" />];
            }
            return [link];
          })}
        />

        {/* Main Content Area */}
        <main className="settings-main">
          {section === 'access-levels' ? (
            <div className="settings-card">
              <div className="settings-card-header">
                <Headline size="small" color="primary">Access Levels</Headline>
              </div>
              <div className="al-layout">
                {/* Left Panel - Levels */}
                <div className="al-sidebar">
                  <div className="al-sidebar-header">
                    <div className="al-sidebar-title">
                      <BodyText size="medium" weight="semibold">Levels</BodyText>
                    </div>
                    <div className="al-gear-wrapper" ref={gearMenuRef}>
                      <IconButton
                        icon="gear-regular"
                        aria-label="Settings"
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={() => setGearMenuOpen(!gearMenuOpen)}
                      />
                      {gearMenuOpen && (
                        <div className="al-gear-menu">
                          <button className="al-gear-menu-item al-gear-menu-item--highlighted" onClick={() => setGearMenuOpen(false)}>
                            <span className="al-gear-menu-icon"><IconV2 name="gear-solid" size={16} color="neutral-strong" /></span>
                            <BodyText size="small">Access Level Settings</BodyText>
                          </button>
                          <div className="al-gear-menu-divider" />
                          <button className="al-gear-menu-item" onClick={() => setGearMenuOpen(false)}>
                            <span className="al-gear-menu-icon"><IconV2 name="user-plus-solid" size={16} color="neutral-strong" /></span>
                            <BodyText size="small">Add a New Non-Employee User</BodyText>
                          </button>
                          <button className="al-gear-menu-item" onClick={() => setGearMenuOpen(false)}>
                            <span className="al-gear-menu-icon"><IconV2 name="clone-solid" size={16} color="neutral-strong" /></span>
                            <BodyText size="small">Duplicate Access Level</BodyText>
                          </button>
                          <div className="al-gear-menu-divider" />
                          <button className="al-gear-menu-item" onClick={() => setGearMenuOpen(false)}>
                            <span className="al-gear-menu-icon"><IconV2 name="trash-can-solid" size={16} color="neutral-strong" /></span>
                            <BodyText size="small">Delete Access Level</BodyText>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <nav className="al-nav">
                    {/* All */}
                    <button
                      className={`al-nav-item ${selectedLevel === 'all' ? 'al-nav-item--active' : ''}`}
                      onClick={() => { setSelectedLevel('all'); setAlCurrentPage(1); }}
                    >
                      <BodyText size="small" weight={selectedLevel === 'all' ? 'semibold' : 'regular'}>
                        All ({accessLevelCategories.reduce((sum, c) => sum + (c.id !== 'all' ? c.count : 0), 0)})
                      </BodyText>
                    </button>
                    {/* Full Admin */}
                    <button
                      className={`al-nav-item ${selectedLevel === 'full-admin' ? 'al-nav-item--active' : ''}`}
                      onClick={() => { setSelectedLevel('full-admin'); setAlCurrentPage(1); }}
                    >
                      <BodyText size="small" weight={selectedLevel === 'full-admin' ? 'semibold' : 'regular'}>
                        Full Admin ({accessLevelCategories.find(c => c.id === 'full-admin')?.count})
                      </BodyText>
                    </button>
                    {/* Employee Levels */}
                    <div className="al-nav-section">
                      <BodyText size="extra-small" weight="semibold" color="neutral-weak">Employee Levels</BodyText>
                    </div>
                    {accessLevelCategories.filter(c => c.section === 'Employee Levels').map(cat => (
                      <button
                        key={cat.id}
                        className={`al-nav-item ${selectedLevel === cat.id ? 'al-nav-item--active' : ''}`}
                        onClick={() => { setSelectedLevel(cat.id); setAlCurrentPage(1); }}
                      >
                        <BodyText size="small" weight={selectedLevel === cat.id ? 'semibold' : 'regular'}>
                          {cat.label} ({cat.count})
                        </BodyText>
                      </button>
                    ))}
                    {/* Manager Levels */}
                    <div className="al-nav-section">
                      <BodyText size="extra-small" weight="semibold" color="neutral-weak">Manager Levels</BodyText>
                    </div>
                    {accessLevelCategories.filter(c => c.section === 'Manager Levels').map(cat => (
                      <button
                        key={cat.id}
                        className={`al-nav-item ${selectedLevel === cat.id ? 'al-nav-item--active' : ''}`}
                        onClick={() => { setSelectedLevel(cat.id); setAlCurrentPage(1); }}
                      >
                        <BodyText size="small" weight={selectedLevel === cat.id ? 'semibold' : 'regular'}>
                          {cat.label} ({cat.count})
                        </BodyText>
                      </button>
                    ))}
                    {/* Custom Levels */}
                    <div className="al-nav-section">
                      <BodyText size="extra-small" weight="semibold" color="neutral-weak">Custom Levels</BodyText>
                    </div>
                    {accessLevelCategories.filter(c => c.section === 'Custom Levels').map(cat => (
                      <button
                        key={cat.id}
                        className={`al-nav-item ${selectedLevel === cat.id ? 'al-nav-item--active' : ''}`}
                        onClick={() => { setSelectedLevel(cat.id); setAlCurrentPage(1); }}
                      >
                        <BodyText size="small" weight={selectedLevel === cat.id ? 'semibold' : 'regular'}>
                          {cat.label} ({cat.count})
                        </BodyText>
                      </button>
                    ))}
                    {/* No Access */}
                    <button
                      className={`al-nav-item ${selectedLevel === 'no-access' ? 'al-nav-item--active' : ''}`}
                      onClick={() => { setSelectedLevel('no-access'); setAlCurrentPage(1); }}
                    >
                      <BodyText size="small" weight={selectedLevel === 'no-access' ? 'semibold' : 'regular'}>
                        No Access ({accessLevelCategories.find(c => c.id === 'no-access')?.count})
                      </BodyText>
                    </button>
                  </nav>
                </div>

                {/* Right Panel - Content */}
                <div className="al-content">
                  <div className="al-content-header">
                    <Headline size="extra-small" color="primary">
                      {isAllSelected ? `All (${totalEmployees})` : selectedCategory.label}
                    </Headline>
                    <div className="al-content-description">
                      <BodyText size="small" color="neutral-weak">{selectedCategory.description}</BodyText>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="al-toolbar">
                    <div className="al-search">
                      <TextField
                        label=""
                        placeholder="Search..."
                        value={alSearchText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAlSearchText(e.target.value)}
                        size="small"
                      />
                    </div>
                    <div className="al-toolbar-actions">
                      {isAllSelected ? (
                        <>
                          <Button size="small" variant="outlined" startIcon={<IconV2 name="clock-rotate-left-regular" size={16} />}>
                            History
                          </Button>
                          <Button size="small" variant="outlined" startIcon={<IconV2 name="arrow-down-to-bracket-regular" size={16} />}>
                            Export
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="small" variant="contained" color="primary" startIcon={<IconV2 name="plus-solid" size={16} />}>
                            Add Employees
                          </Button>
                          <div className="al-gear-wrapper">
                            <IconButton
                              icon="gear-regular"
                              ariaLabel="Level settings"
                              size="small"
                              onClick={() => setGearMenuOpen(!gearMenuOpen)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Table */}
                  <table className="al-table">
                    <thead>
                      <tr>
                        <th className="al-table-th">Name</th>
                        {showLevelColumn && <th className="al-table-th">Level</th>}
                        <th className="al-table-th">Last Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="al-table-row">
                          <td className="al-table-td">
                            <div className="al-employee-cell">
                              <Avatar src={employee.avatar} size={32} />
                              <TextButton size="small" onClick={() => {}}>{employee.name}</TextButton>
                            </div>
                          </td>
                          {showLevelColumn && (
                            <td className="al-table-td">
                              <BodyText size="small">{employee.level}</BodyText>
                            </td>
                          )}
                          <td className="al-table-td">
                            <BodyText size="small" color="neutral-weak">{employee.lastLogin}</BodyText>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {filteredEmployees.length > 0 && (
                    <div className="al-pagination">
                      <BodyText size="small" color="neutral-weak">
                        1-{Math.min(pageSize, totalEmployees)} of {totalEmployees}
                      </BodyText>
                      <div className="al-pagination-pages">
                        {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            className={`al-pagination-btn ${page === alCurrentPage ? 'al-pagination-btn--active' : ''}`}
                            onClick={() => setAlCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                        {totalPages > 1 && (
                          <button
                            className="al-pagination-btn al-pagination-btn--next"
                            onClick={() => setAlCurrentPage(Math.min(alCurrentPage + 1, totalPages))}
                            disabled={alCurrentPage === totalPages}
                          >
                            Next <IconV2 name="arrow-right-solid" size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <div className="settings-card">
            {/* Account Heading */}
            <div className="settings-card-header">
              <Headline size="small">Account</Headline>
            </div>

            {/* Content Layout - Sub Navigation + Content */}
            <div className="settings-content-layout">
              {/* Sub Navigation */}
              <SideSubNavigation
                ariaLabel="Account sub-navigation"
                items={accountSubTabs.map((tab) => (
                  <SideSubNavigation.Link
                    key={tab.id}
                    active={tab.id === activeSubTab}
                    onClick={() => setActiveSubTab(tab.id)}
                  >
                    {tab.label}
                  </SideSubNavigation.Link>
                ))}
              />

              {/* Content Area */}
              <div className="settings-content">
                {activeSubTab === 'company-ownership' ? (
                  <>
                    <Headline size="small" color="primary">Company Ownership</Headline>
                    <div className="co-description">
                      <BodyText size="medium">
                        This info helps us meet compliance requirements and stays confidential. Because of that, you'll need to{' '}
                        <a href="#" className="co-contact-link">contact us</a>{' '}
                        before making any changes.
                      </BodyText>
                    </div>

                    <div className="co-form">
                      {/* Business Structure */}
                      <div className="co-field">
                        <BodyText size="small" weight="medium">Business Structure *</BodyText>
                        <div className="co-select-wrapper">
                          <select className="co-select" disabled defaultValue={companyOwnershipData.businessStructure}>
                            <option value="LLC">LLC</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                          </select>
                          <span className="co-select-icon">
                            <IconV2 name="caret-down-solid" size={16} color="neutral-weak" />
                          </span>
                        </div>
                      </div>

                      {/* Does your company fit */}
                      <div className="co-field">
                        <BodyText size="small" weight="medium">Does your company fit any of these? *</BodyText>
                        <div className="co-select-wrapper">
                          <select className="co-select" disabled defaultValue={companyOwnershipData.companyFit}>
                            <option value="None of these fit my company">None of these fit my company</option>
                          </select>
                          <span className="co-select-icon">
                            <IconV2 name="caret-down-solid" size={16} color="neutral-weak" />
                          </span>
                        </div>
                      </div>

                      {/* Ownership Radio Group */}
                      <div className="co-field">
                        <BodyText size="small" weight="medium">Who has ownership or control of the company*</BodyText>
                        <div className="co-radio-group">
                          <label className="co-radio-label">
                            <input
                              type="radio"
                              name="ownership"
                              value="owner-25"
                              checked={ownershipType === 'owner-25'}
                              onChange={() => setOwnershipType('owner-25')}
                              disabled
                              className="co-radio-input"
                            />
                            <span className="co-radio-text">At least one person owns 25% or more of the company</span>
                          </label>
                          <label className="co-radio-label">
                            <input
                              type="radio"
                              name="ownership"
                              value="management-control"
                              checked={ownershipType === 'management-control'}
                              onChange={() => setOwnershipType('management-control')}
                              disabled
                              className="co-radio-input"
                            />
                            <span className="co-radio-text">No individual owns 25% or more; someone has management control instead</span>
                          </label>
                        </div>
                      </div>

                      {/* Manager Form */}
                      <div className="co-manager-section">
                        <Headline size="extra-small" color="primary">Manager (CEO or Similar)</Headline>

                        {/* Full Name */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Full Name *</BodyText>
                          <div className="co-select-wrapper">
                            <select className="co-select" disabled defaultValue={companyOwnershipData.manager.fullName}>
                              <option value="Sydney Rasmussen">Sydney Rasmussen</option>
                            </select>
                            <span className="co-select-icon">
                              <IconV2 name="caret-down-solid" size={16} color="neutral-weak" />
                            </span>
                          </div>
                        </div>

                        {/* Birth Date */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Birth Date *</BodyText>
                          <div className="co-input-wrapper">
                            <input
                              type="text"
                              className="co-input"
                              defaultValue={companyOwnershipData.manager.birthDate}
                              disabled
                            />
                            <span className="co-input-icon">
                              <IconV2 name="calendar-regular" size={16} color="neutral-weak" />
                            </span>
                          </div>
                        </div>

                        {/* Citizenship Status */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Citizenship Status *</BodyText>
                          <div className="co-toggle">
                            <button
                              className={`co-toggle-option ${citizenshipStatus === 'us' ? 'co-toggle-option--active' : ''}`}
                              onClick={() => setCitizenshipStatus('us')}
                              disabled
                            >
                              US Citizen
                            </button>
                            <button
                              className={`co-toggle-option ${citizenshipStatus === 'non-us' ? 'co-toggle-option--active' : ''}`}
                              onClick={() => setCitizenshipStatus('non-us')}
                              disabled
                            >
                              Non US Citizen
                            </button>
                          </div>
                        </div>

                        {/* SSN */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">SSN *</BodyText>
                          <input
                            type="text"
                            className="co-input"
                            defaultValue={companyOwnershipData.manager.ssn}
                            disabled
                          />
                        </div>

                        {/* Email Address */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Email Address *</BodyText>
                          <input
                            type="text"
                            className="co-input"
                            defaultValue={companyOwnershipData.manager.email}
                            disabled
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Phone Number *</BodyText>
                          <input
                            type="text"
                            className="co-input"
                            defaultValue={companyOwnershipData.manager.phone}
                            disabled
                          />
                          <span className="co-field-note">
                            <BodyText size="extra-small" color="neutral-medium">Please include the country code</BodyText>
                          </span>
                        </div>

                        {/* Residential Address */}
                        <Headline size="extra-small" color="primary">Residential Address</Headline>

                        {/* Street 1 */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Street 1 *</BodyText>
                          <input
                            type="text"
                            className="co-input"
                            defaultValue={companyOwnershipData.manager.address.street1}
                            disabled
                          />
                        </div>

                        {/* Street 2 */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Street 2 *</BodyText>
                          <input
                            type="text"
                            className="co-input"
                            defaultValue={companyOwnershipData.manager.address.street2}
                            disabled
                          />
                        </div>

                        {/* City / State / Zip */}
                        <div className="co-field-row">
                          <div className="co-field co-field--flex">
                            <BodyText size="small" weight="medium">City *</BodyText>
                            <input
                              type="text"
                              className="co-input"
                              defaultValue={companyOwnershipData.manager.address.city}
                              disabled
                            />
                          </div>
                          <div className="co-field co-field--small">
                            <BodyText size="small" weight="medium">State *</BodyText>
                            <div className="co-select-wrapper">
                              <select className="co-select" disabled defaultValue={companyOwnershipData.manager.address.state}>
                                <option value="UT">UT</option>
                              </select>
                              <span className="co-select-icon">
                                <IconV2 name="caret-down-solid" size={16} color="neutral-weak" />
                              </span>
                            </div>
                          </div>
                          <div className="co-field co-field--small">
                            <BodyText size="small" weight="medium">Zip *</BodyText>
                            <input
                              type="text"
                              className="co-input"
                              defaultValue={companyOwnershipData.manager.address.zip}
                              disabled
                            />
                          </div>
                        </div>

                        {/* Country */}
                        <div className="co-field">
                          <BodyText size="small" weight="medium">Country *</BodyText>
                          <div className="co-select-wrapper">
                            <select className="co-select" disabled defaultValue={companyOwnershipData.manager.address.country}>
                              <option value="United States">United States</option>
                            </select>
                            <span className="co-select-icon">
                              <IconV2 name="caret-down-solid" size={16} color="neutral-weak" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="co-save">
                        <Button variant="contained" color="primary" disabled>Save</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;
