import { useState, useEffect, useRef } from 'react';
import {
  IconV2,
  Avatar,
  Button,
  Dropdown,
  IconButton,
  TextButton,
  Tabs,
  Tab,
  Headline,
  BodyText,
  Section,
  TextField,
  SelectField,
} from '@bamboohr/fabric';
import { currentEmployee } from '../../data/currentEmployee';
import { PerformanceTabContent } from './PerformanceTabContent';
import { JobTabContent } from './JobTabContent';
import { TimeOffTabContent } from './TimeOffTabContent';
import { DocumentsTabContent } from './DocumentsTabContent';
import { EmergencyTabContent } from './EmergencyTabContent';
import { TrainingTabContent } from './TrainingTabContent';
import { TimesheetTabContent } from './TimesheetTabContent';
import './MyInfo.css';

const profileTabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job' },
  { id: 'time-off', label: 'Time Off' },
  { id: 'documents', label: 'Documents' },
  { id: 'timesheets', label: 'Timesheets' },
  { id: 'performance', label: 'Performance' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'training', label: 'Training' },
];

export function MyInfo() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [floatingHeaderHeight, setFloatingHeaderHeight] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const employee = currentEmployee;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingHeader(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );
    const el = headerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = floatingRef.current;
    if (!el) return;
    const update = () => setFloatingHeaderHeight(Math.ceil(el.getBoundingClientRect().height));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showFloatingHeader]);

  return (
    <div className="my-info-page">
      {/* Sticky Floating Header */}
      {showFloatingHeader && (
        <div
          ref={floatingRef}
          className="my-info-floating-header"
          style={floatingHeaderHeight ? { minHeight: `${floatingHeaderHeight}px` } : undefined}
        >
          <div className="my-info-floating-content">
            <div className="my-info-floating-row">
              <div className="my-info-floating-left">
                <Avatar
                  src={employee.avatar}
                  alt={`${employee.preferredName} ${employee.lastName}`}
                  size={40}
                />
                <span className="my-info-floating-name">
                  {employee.preferredName} {employee.lastName}
                </span>
              </div>
              <div className="my-info-floating-tabs">
                <Tabs
                  value={activeTab}
                  onChange={(value) => setActiveTab(value as string)}
                  mode="fill"
                  dark
                >
                  {profileTabs.map((tab) => (
                    <Tab key={tab.id} label={tab.label} value={tab.id} />
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header — Edge-to-Edge Green Banner */}
      <div ref={headerRef} className="my-info-header">
        {/* Profile photo — absolutely positioned, overlaps banner bottom */}
        <div className="my-info-avatar-wrapper">
          <Avatar
            src={employee.avatar}
            alt={`${employee.preferredName} ${employee.lastName}`}
            size={224}
          />
        </div>

        {/* Header content — indented to clear the photo */}
        <div className="my-info-header-contents">
          <div className="my-info-header-top">
            <div className="my-info-name-section">
              <h1 className="my-info-employee-name">
                {employee.preferredName} ({employee.firstName}) {employee.lastName}
              </h1>
              <BodyText size="medium" color="neutral-inverted">
                {employee.pronouns} · {employee.title}
              </BodyText>
            </div>
            <div className="my-info-header-actions">
              <Dropdown
                ButtonProps={{ variant: 'contained', size: 'medium', dark: true }}
                items={[
                  { text: 'Asset Request...', value: 'asset-request' },
                  { text: 'Compensation...', value: 'compensation' },
                  { text: 'Employment Status...', value: 'employment-status' },
                  { text: 'Job Information...', value: 'job-information' },
                  { text: 'Promotion...', value: 'promotion' },
                ]}
                showCaret
              >
                Request a Change
              </Dropdown>
              <IconButton
                icon={<IconV2 name="ellipsis-solid" size={16} />}
                aria-label="More options"
                dark
              />
            </div>
          </div>
          <Tabs
            value={activeTab}
            onChange={(value) => setActiveTab(value as string)}
            mode="fill"
            dark
          >
            {profileTabs.map((tab) => (
              <Tab key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-info-content">
        {/* Left Sidebar — Vitals */}
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

        {/* Tab Content */}
        <main className="my-info-main">
          {activeTab === 'performance' ? (
            <PerformanceTabContent employeeName={employee.preferredName} />
          ) : activeTab === 'job' ? (
            <JobTabContent employeeName={employee.preferredName} />
          ) : activeTab === 'time-off' ? (
            <TimeOffTabContent />
          ) : activeTab === 'documents' ? (
            <DocumentsTabContent />
          ) : activeTab === 'emergency' ? (
            <EmergencyTabContent />
          ) : activeTab === 'training' ? (
            <TrainingTabContent />
          ) : activeTab === 'timesheets' ? (
            <TimesheetTabContent />
          ) : (
            <div className="my-info-sections">
              {/* Personal section header */}
              <div className="my-info-section-header">
                <div className="my-info-section-header-left">
                  <IconV2 name="address-card-solid" size={20} color="primary-strong" />
                  <Headline size="medium" color="primary">Personal</Headline>
                </div>
                <TextButton
                  startIcon={<IconV2 name="grid-2-plus-solid" size={16} />}
                  endIcon={<IconV2 name="caret-down-solid" size={12} />}
                >
                  Customize Layout
                </TextButton>
              </div>

              {/* Basic Information */}
              <Section>
                <Section.Header title="Basic Information" icon="address-card-solid" />
                <div className="my-info-form-fields">
                <div className="my-info-form-grid-4">
                  <TextField label="Name" value={employee.firstName} onChange={() => {}} />
                  <TextField label="Middle Name" value={employee.middleName} onChange={() => {}} placeholder="—" />
                  <TextField label="Last Name" value={employee.lastName} onChange={() => {}} />
                  <TextField label="Preferred Name" value={employee.preferredName} onChange={() => {}} />
                </div>
                <div className="my-info-field-row">
                  <TextField label="Birth Date" value={employee.birthDate} onChange={() => {}} />
                </div>
                <div className="my-info-field-row">
                  <TextField label="SSN" value={employee.ssn} onChange={() => {}} />
                </div>
                <div className="my-info-form-grid-3">
                  <SelectField label="Gender" value={employee.gender} onChange={() => {}}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </SelectField>
                  <SelectField label="Gender Identity" value={employee.genderIdentity} onChange={() => {}}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                  </SelectField>
                  <SelectField label="Pronouns" value={employee.pronouns} onChange={() => {}}>
                    <option value="She/Her">She/Her</option>
                    <option value="He/Him">He/Him</option>
                    <option value="They/Them">They/Them</option>
                  </SelectField>
                </div>
                <div className="my-info-field-row">
                  <SelectField label="Marital Status" value={employee.maritalStatus} onChange={() => {}}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </SelectField>
                </div>
                </div>{/* /my-info-form-fields */}
              </Section>

              {/* Contact */}
              <Section>
                <Section.Header title="Contact" icon="phone-solid" />
                <div className="my-info-form-fields">
                <div className="my-info-field-narrow">
                  <TextField label="Home Phone" value="648-555-2415" onChange={() => {}} />
                </div>
                <div className="my-info-field-narrow">
                  <TextField label="Work Phone" value={employee.workPhone} onChange={() => {}} />
                </div>
                <div className="my-info-field-narrow">
                  <TextField label="Mobile Phone" value={employee.mobilePhone} onChange={() => {}} />
                </div>
                <div className="my-info-field-wide">
                  <TextField label="Home Email" value={employee.personalEmail} onChange={() => {}} />
                </div>
                <div className="my-info-field-wide">
                  <TextField label="Work Email" value={employee.workEmail} onChange={() => {}} />
                </div>
                <div className="my-info-field-narrow">
                  <SelectField label="T-Shirt Size" value={employee.tshirtSize} onChange={() => {}}>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="Medium">Medium</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </SelectField>
                </div>
                <div className="my-info-field-narrow">
                  <SelectField label="Favorite Cold Cereal" value={employee.favoriteCereal} onChange={() => {}}>
                    <option value="Crispix">Crispix</option>
                    <option value="Frosted Flakes">Frosted Flakes</option>
                    <option value="Cheerios">Cheerios</option>
                    <option value="Lucky Charms">Lucky Charms</option>
                  </SelectField>
                </div>
                </div>{/* /my-info-form-fields */}
              </Section>

              {/* Visa Information */}
              <Section>
                <Section.Header
                  title="Visa Information"
                  icon="passport-solid"
                  actions={[
                    <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
                  ]}
                />
                <div className="my-info-table-wrapper">
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
              </Section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function VitalItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="my-info-vital-item">
      <IconV2 name={`${icon}-solid`} size={12} color="neutral-strong" />
      <span className="my-info-vital-text">{text}</span>
    </div>
  );
}

export default MyInfo;
