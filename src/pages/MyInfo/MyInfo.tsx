import { useState, useEffect, useRef } from 'react';
import { IconV2 } from '@bamboohr/fabric';
import { Button, TextInput } from '../../components';
import { currentEmployee } from '../../data/currentEmployee';
import { PerformanceTabContent } from './PerformanceTabContent';
import { JobTabContent } from './JobTabContent';
import './MyInfo.css';

const profileTabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job' },
  { id: 'time-off', label: 'Time off' },
  { id: 'documents', label: 'Documents' },
  { id: 'timesheets', label: 'Timesheets' },
  { id: 'performance', label: 'Performance' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'training', label: 'Training' },
];

const MORE_TAB = { id: 'more', label: 'More' };

export function MyInfo() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [floatingHeaderHeight, setFloatingHeaderHeight] = useState<number | null>(null);
  const [visibleTabCount, setVisibleTabCount] = useState(profileTabs.length);
  const [floatingVisibleTabCount, setFloatingVisibleTabCount] = useState(profileTabs.length);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showFloatingMoreDropdown, setShowFloatingMoreDropdown] = useState(false);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const floatingTabContainerRef = useRef<HTMLDivElement>(null);
  const measurementTabsRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLDivElement>(null);
  const floatingMoreButtonRef = useRef<HTMLDivElement>(null);
  const employee = currentEmployee;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreButtonRef.current && !moreButtonRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
      if (floatingMoreButtonRef.current && !floatingMoreButtonRef.current.contains(event.target as Node)) {
        setShowFloatingMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingHeader(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px',
      }
    );

    const headerElement = headerRef.current;
    if (headerElement) {
      observer.observe(headerElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) {
      return;
    }

    const updateHeight = () => {
      setFloatingHeaderHeight(Math.ceil(headerElement.getBoundingClientRect().height));
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Measure tab widths once on mount
  useEffect(() => {
    const measurementContainer = measurementTabsRef.current;
    if (!measurementContainer) return;

    const tabs = Array.from(measurementContainer.children) as HTMLElement[];
    const widths = tabs.map((tab) => tab.offsetWidth);
    setTabWidths(widths);
  }, []);

  // Responsive tabs for main header
  useEffect(() => {
    const container = tabContainerRef.current;
    if (!container || tabWidths.length === 0) return;

    const calculateVisibleTabs = () => {
      const computedStyle = getComputedStyle(container);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const contentWidth = container.offsetWidth - paddingLeft - paddingRight;

      const GAP = 4;
      const MORE_BUTTON_WIDTH = 90;

      let totalWidth = MORE_BUTTON_WIDTH;
      let visibleCount = 0;

      for (let i = 0; i < tabWidths.length; i++) {
        const tabWidth = tabWidths[i];
        const gapWidth = GAP;

        if (totalWidth + tabWidth + gapWidth <= contentWidth) {
          totalWidth += tabWidth + gapWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      setVisibleTabCount(Math.max(0, visibleCount));
    };

    calculateVisibleTabs();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateVisibleTabs);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [tabWidths]);

  // Responsive tabs for floating header
  useEffect(() => {
    const container = floatingTabContainerRef.current;
    if (!container || !showFloatingHeader || tabWidths.length === 0) return;

    const calculateVisibleTabs = () => {
      const computedStyle = getComputedStyle(container);
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const contentWidth = container.offsetWidth - paddingLeft - paddingRight;

      const GAP = 4;
      const MORE_BUTTON_WIDTH = 90;

      let totalWidth = MORE_BUTTON_WIDTH;
      let visibleCount = 0;

      for (let i = 0; i < tabWidths.length; i++) {
        const tabWidth = tabWidths[i];
        const gapWidth = GAP;

        if (totalWidth + tabWidth + gapWidth <= contentWidth) {
          totalWidth += tabWidth + gapWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      setFloatingVisibleTabCount(Math.max(0, visibleCount));
    };

    calculateVisibleTabs();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateVisibleTabs);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [showFloatingHeader, tabWidths]);

  return (
    <div className="my-info-page">
      {/* Floating Compact Header */}
      {showFloatingHeader && (
        <div
          className="my-info-floating-header"
          style={floatingHeaderHeight ? { minHeight: `${floatingHeaderHeight}px` } : undefined}
        >
          <div className="my-info-floating-content">
            <div className="my-info-floating-row">
              <img
                src={employee.avatar}
                alt={`${employee.preferredName} ${employee.lastName}`}
                className="my-info-floating-avatar"
              />
              <h2 className="my-info-floating-name">
                {employee.preferredName} {employee.lastName}
              </h2>

              <div ref={floatingTabContainerRef} className="my-info-floating-tabs">
                <div className="my-info-floating-tabs-container">
                  {profileTabs.slice(0, floatingVisibleTabCount).map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`my-info-tab ${isActive ? 'my-info-tab--active' : 'my-info-tab--inactive'}`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}

                  <div ref={floatingMoreButtonRef} className="my-info-more-dropdown">
                    <button
                      onClick={() => setShowFloatingMoreDropdown(!showFloatingMoreDropdown)}
                      className="my-info-tab my-info-tab--inactive"
                    >
                      {MORE_TAB.label}
                      <IconV2 name="caret-down-solid" size={10} />
                    </button>

                    {showFloatingMoreDropdown && floatingVisibleTabCount < profileTabs.length && (
                      <>
                        <div
                          className="my-info-dropdown-overlay"
                          onClick={() => setShowFloatingMoreDropdown(false)}
                        />
                        <div className="my-info-dropdown-menu my-info-dropdown-menu--right">
                          {profileTabs.slice(floatingVisibleTabCount).map((tab) => {
                            const isActive = tab.id === activeTab;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => {
                                  setActiveTab(tab.id);
                                  setShowFloatingMoreDropdown(false);
                                }}
                                className={`my-info-dropdown-option ${isActive ? 'my-info-dropdown-option--active' : ''}`}
                              >
                                {tab.label}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header - Green Banner */}
      <div ref={headerRef} className="my-info-header">
        <div className="my-info-header-contents">
          <div className="my-info-header-top">
            <div className="my-info-name-section">
              <h1 className="my-info-name">
                {employee.preferredName} ({employee.firstName}) {employee.lastName}
              </h1>
              <p className="my-info-subtitle">
                {employee.pronouns} · {employee.title}
              </p>
            </div>

            <div className="my-info-header-actions">
              <button className="my-info-request-button">
                Request a Change
                <IconV2 name="caret-down-solid" size={10} color="primary-strong" />
              </button>
              <button className="my-info-ellipsis-button">
                <IconV2 name="ellipsis-solid" size={16} color="primary-strong" />
              </button>
            </div>
          </div>

          <div ref={tabContainerRef} className="my-info-tabs">
            <div className="my-info-tabs-container">
              {profileTabs.slice(0, visibleTabCount).map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`my-info-tab ${isActive ? 'my-info-tab--active' : 'my-info-tab--inactive'}`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              <div ref={moreButtonRef} className="my-info-more-dropdown">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="my-info-tab my-info-tab--inactive"
                >
                  {MORE_TAB.label}
                  <IconV2 name="caret-down-solid" size={10} />
                </button>

                {showMoreDropdown && visibleTabCount < profileTabs.length && (
                  <div className="my-info-dropdown-menu">
                    {profileTabs.slice(visibleTabCount).map((tab) => {
                      const isActive = tab.id === activeTab;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setShowMoreDropdown(false);
                          }}
                          className={`my-info-dropdown-option ${isActive ? 'my-info-dropdown-option--active' : ''}`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <img
          src={employee.avatar}
          alt={`${employee.preferredName} ${employee.lastName}`}
          className="my-info-avatar"
        />
      </div>

      {/* Main Content Area */}
      <div className="my-info-content">
        {/* Left Sidebar - Vitals */}
        <aside className="my-info-sidebar">
          <div className="my-info-sidebar-section">
            <h3 className="my-info-sidebar-title">Vitals</h3>
            <div className="my-info-sidebar-items">
              <VitalItem icon="building" text={employee.workPhone} />
              <VitalItem icon="mobile" text={employee.mobilePhone} />
              <VitalItem icon="envelope" text={employee.workEmail} />
              <VitalItem icon="linkedin" text={employee.linkedIn} />
              <VitalItem icon="clock" text={employee.localTime} />
              <div className="my-info-vital-secondary">{employee.location}</div>
              <VitalItem icon="wrench" text={employee.department} />
              <div className="my-info-vital-secondary">Full-time</div>
            </div>
          </div>

          <div className="my-info-sidebar-section">
            <h3 className="my-info-sidebar-title">Hire Date</h3>
            <div className="my-info-sidebar-items">
              <VitalItem icon="calendar" text={employee.hireDate} />
              <div className="my-info-vital-weak">{employee.tenure}</div>
            </div>
          </div>

          <div className="my-info-sidebar-section">
            <h3 className="my-info-sidebar-title">Manager</h3>
            <div className="my-info-manager">
              <img
                src={employee.manager.avatar}
                alt={employee.manager.name}
                className="my-info-manager-avatar"
              />
              <div className="my-info-manager-info">
                <p className="my-info-manager-name">{employee.manager.name}</p>
                <p className="my-info-manager-title">{employee.manager.title}</p>
              </div>
            </div>
          </div>

          <div className="my-info-sidebar-section">
            <h3 className="my-info-sidebar-title">Direct Reports</h3>
            <div className="my-info-sidebar-items">
              {employee.directReports.map((name) => (
                <VitalItem key={name} icon="circle-user" text={name} />
              ))}
              {employee.moreReportsCount > 0 && (
                <VitalItem icon="circle-user" text={`${employee.moreReportsCount} more...`} />
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="my-info-main">
          {activeTab === 'performance' ? (
            <PerformanceTabContent employeeName={employee.preferredName} />
          ) : activeTab === 'job' ? (
            <JobTabContent employeeName={employee.preferredName} />
          ) : (
            <>
              <div className="my-info-section-header">
                <div className="my-info-section-header-left">
                  <IconV2 name="address-card-solid" size={24} color="primary-strong" />
                  <h2 className="my-info-section-title">Personal</h2>
                </div>
                <Button variant="text" icon="grid-2-plus" iconPosition="left" showCaret={true}>
                  Customize Layout
                </Button>
              </div>

              {/* Basic Information Card */}
              <div className="my-info-card">
                <div className="my-info-card-header">
                  <div className="my-info-card-icon">
                    <IconV2 name="address-card-solid" size={16} color="primary-strong" />
                  </div>
                  <h3 className="my-info-card-title">Basic Information</h3>
                </div>

                <div className="my-info-form-grid-4">
                  <TextInput label="Name" value={employee.firstName} />
                  <TextInput label="Middle Name" value={employee.middleName} placeholder="" />
                  <TextInput label="Last Name" value={employee.lastName} />
                  <TextInput label="Preferred Name" value={employee.preferredName} />
                </div>

                <div className="my-info-form-field">
                  <TextInput label="Birth Date" value={employee.birthDate} type="date" />
                </div>

                <div className="my-info-form-field">
                  <TextInput label="SSN" value={employee.ssn} />
                </div>

                <div className="my-info-form-grid-3">
                  <TextInput label="Gender" value={employee.gender} type="dropdown" />
                  <TextInput label="Gender Identity" value={employee.genderIdentity} type="dropdown" />
                  <TextInput label="Pronouns" value={employee.pronouns} type="dropdown" />
                </div>

                <div className="my-info-form-field">
                  <TextInput label="Marital Status" value={employee.maritalStatus} type="dropdown" />
                </div>
              </div>

              {/* Contact Card */}
              <div className="my-info-card">
                <div className="my-info-card-header">
                  <div className="my-info-card-icon">
                    <IconV2 name="phone-solid" size={16} color="primary-strong" />
                  </div>
                  <h3 className="my-info-card-title">Contact</h3>
                </div>

                <div className="my-info-form-field-narrow">
                  <TextInput label="Home Phone" value="648-555-2415" icon="phone" />
                </div>

                <div className="my-info-form-field-narrow">
                  <TextInput label="Work Phone" value={employee.workPhone} icon="building" />
                </div>

                <div className="my-info-form-field-narrow">
                  <TextInput label="Mobile Phone" value={employee.mobilePhone} icon="mobile" />
                </div>

                <div className="my-info-form-field-wide">
                  <TextInput label="Home Email" value={employee.personalEmail} icon="envelope" />
                </div>

                <div className="my-info-form-field-wide">
                  <TextInput label="Work Email" value={employee.workEmail} icon="envelope" />
                </div>

                <div className="my-info-form-field-narrow">
                  <TextInput label="T-shirt Size" value={employee.tshirtSize} type="dropdown" />
                </div>

                <div className="my-info-form-field-narrow">
                  <TextInput label="Favorite Cold Cereal" value={employee.favoriteCereal} type="dropdown" />
                </div>
              </div>

              {/* Visa Information Section */}
              <div className="my-info-card" style={{ padding: 32 }}>
                <div className="my-info-card-header" style={{ marginBottom: 24 }}>
                  <div className="my-info-card-icon">
                    <IconV2 name="passport-solid" size={16} color="primary-strong" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                    <h3 className="my-info-card-title" style={{ fontSize: 24 }}>Visa Information</h3>
                    <Button variant="outlined" size="small">Add Entry</Button>
                  </div>
                </div>

                <table className="my-info-table">
                  <thead>
                    <tr>
                      <th>Passport Number</th>
                      <th>Issued Date</th>
                      <th>Expiry Date</th>
                      <th>Issuing Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.passports.map((passport, index) => (
                      <tr key={index}>
                        <td>{passport.number}</td>
                        <td>{passport.issued}</td>
                        <td>{passport.expiry}</td>
                        <td>{passport.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Hidden measurement container for tab widths */}
      <div ref={measurementTabsRef} className="my-info-measurement" aria-hidden="true">
        {profileTabs.map((tab) => (
          <button key={tab.id} className="my-info-tab my-info-tab--inactive">
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper component for vital items
function VitalItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="my-info-vital-item">
      <IconV2 name={`${icon}-solid`} size={12} color="neutral-strong" />
      <span className="my-info-vital-text">{text}</span>
    </div>
  );
}

export default MyInfo;
