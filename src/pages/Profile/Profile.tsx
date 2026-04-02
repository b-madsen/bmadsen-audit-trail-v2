import React, { useState } from 'react';
import {
  Avatar,
  BodyText,
  Button,
  Divider,
  Flex,
  Headline,
  IconButton,
  IconV2,
  Section,
  SectionHeader,
  Select,
  Tab,
  Tabs,
  TextField,
  TextButton,
} from '@bamboohr/fabric';
import './Profile.css';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const passportData = [
  { passportNumber: '31195855', issuedDate: '5/7/16', expiryDate: '5/7/26', issuingCountry: 'United States' },
  { passportNumber: '54882-22272', issuedDate: '7/18/17', expiryDate: '7/18/27', issuingCountry: 'Italy' },
  { passportNumber: '622-555-4', issuedDate: '1/28/17', expiryDate: '1/28/27', issuingCountry: 'Germany' },
];

const genderOptions = [
  { text: 'Female', value: 'female' },
  { text: 'Male', value: 'male' },
  { text: 'Non-binary', value: 'non-binary' },
];

const genderIdentityOptions = [
  { text: 'Female', value: 'female' },
  { text: 'Male', value: 'male' },
  { text: 'Non-binary', value: 'non-binary' },
  { text: 'Prefer not to say', value: 'prefer-not' },
];

const pronounOptions = [
  { text: 'She/her', value: 'she-her' },
  { text: 'He/him', value: 'he-him' },
  { text: 'They/them', value: 'they-them' },
];

const maritalStatusOptions = [
  { text: 'Single', value: 'single' },
  { text: 'Married', value: 'married' },
  { text: 'Divorced', value: 'divorced' },
  { text: 'Widowed', value: 'widowed' },
];

const tshirtSizeOptions = [
  { text: 'Small', value: 'small' },
  { text: 'Medium', value: 'medium' },
  { text: 'Large', value: 'large' },
  { text: 'X-Large', value: 'xl' },
];

const cerealOptions = [
  { text: 'Crispix', value: 'crispix' },
  { text: 'Cheerios', value: 'cheerios' },
  { text: 'Frosted Flakes', value: 'frosted-flakes' },
  { text: 'Lucky Charms', value: 'lucky-charms' },
];


// ---------------------------------------------------------------------------
// Profile Sidebar Component
// ---------------------------------------------------------------------------

const ProfileSidebar: React.FC = () => (
  <div className="profile-sidebar">
    <BodyText size="small" weight="semibold" color="neutral-medium">
      Vitals
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="building-regular">
      801-763-1893 x 6109
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="mobile-regular">
      801-344-1998
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="envelope-regular">
      cordovathejess@gmail.com
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="linkedin">
      Linkedin.com/jesscordova
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="clock-regular">
      7:49 AM local time
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="wrench-regular">
      Marketing
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" component="span">
      Full-time
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="hashtag-regular">
      004
    </BodyText>

    <Divider color="neutral-extra-weak" />

    <BodyText size="small" weight="semibold" color="neutral-medium">
      Hire Date
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="calendar-regular">
      Aug 28, 2015
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium">
      4y -2m -10d
    </BodyText>

    <Divider color="neutral-extra-weak" />

    <BodyText size="small" weight="semibold" color="neutral-medium">
      Manager
    </BodyText>
    <div className="manager-row">
      <Avatar src="https://i.pravatar.cc/40?u=lucy" size={40} />
      <div>
        <BodyText size="extra-small" color="neutral-medium">Lucy Samuels</BodyText>
        <BodyText size="extra-small" color="neutral-medium">VP, Marketing</BodyText>
      </div>
    </div>

    <Divider color="neutral-extra-weak" />

    <BodyText size="small" weight="semibold" color="neutral-medium">
      Direct Reports
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="circle-user-regular">
      Alan Nguyen
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="circle-user-regular">
      Jeff Hawkins
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="circle-user-regular">
      Melinda Pittman
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="circle-user-regular">
      Tony Fonseca
    </BodyText>
    <BodyText size="extra-small" color="neutral-medium" icon="circle-user-regular">
      5 more...
    </BodyText>
  </div>
);

// ---------------------------------------------------------------------------
// Basic Information Section
// ---------------------------------------------------------------------------

const BasicInfoSection: React.FC = () => (
  <Section>
    <SectionHeader
      label="Basic Information"
      icon={<IconV2 name="id-card-solid" size={16} color="primary-strong" />}
      size="medium"
    />
    <div className="section-body">
      <TextField label="Employee # *" value="004" width={3} />

      <div className="field-row">
        <TextField label="Name *" value="Jessica" width={3} />
        <TextField label="Middle Name" width={3} />
        <TextField label="Last Name *" value="Cordova" width={3} />
        <TextField label="Preferred Name" value="Jess" width={3} />
      </div>

      <div className="field-row-with-note">
        <TextField label="Birth Date *" value="01 Nov 2013" width={4} />
        <BodyText size="small" color="neutral-medium">Age: 32</BodyText>
      </div>

      <TextField label="SSN *" value="648-55-2415" width={3} />

      <div className="field-row">
        <Select
          items={genderOptions}
          selectedValues={['female']}
          placeholder="Gender *"
          width={3}
        />
        <Select
          items={genderIdentityOptions}
          selectedValues={['female']}
          placeholder="Gender Identity"
          width={3}
        />
        <Select
          items={pronounOptions}
          selectedValues={['she-her']}
          placeholder="Pronouns"
          width={3}
        />
      </div>

      <Select
        items={maritalStatusOptions}
        selectedValues={['single']}
        placeholder="Marital Status *"
        width={3}
      />
    </div>
  </Section>
);

// ---------------------------------------------------------------------------
// Contact Section
// ---------------------------------------------------------------------------

const ContactSection: React.FC = () => (
  <Section>
    <Flex justifyContent="space-between" alignItems="center">
      <SectionHeader
        label="Contact"
        icon={<IconV2 name="address-book-solid" size={16} color="primary-strong" />}
        size="medium"
      />
      <Button variant="outlined" color="primary" size="small">
        Add entry
      </Button>
    </Flex>
    <div className="section-body">
      <TextField label="Home Phone" value="648-55-2415" width={4} />
      <TextField label="Work Phone" value="648-55-2415" width={4} />
      <TextField label="Mobile Phone" value="648-55-2415" width={4} />
      <TextField label="Email" value="cordovathejess@..." width={5} />
      <TextField label="Work Email" value="jcordova@bamb..." width={5} />
      <Select
        items={tshirtSizeOptions}
        selectedValues={['medium']}
        placeholder="T-Shirt Size"
        width={3}
      />
      <Select
        items={cerealOptions}
        selectedValues={['crispix']}
        placeholder="Favorite Cold Cereal"
        width={3}
      />
    </div>
  </Section>
);

// ---------------------------------------------------------------------------
// Passport Table Section
// ---------------------------------------------------------------------------

const PassportTableSection: React.FC = () => (
  <Section>
    <Headline size="medium" color="primary">An example title</Headline>
    <Divider color="neutral-extra-weak" />
    <table className="passport-table">
      <thead>
        <tr>
          <th><BodyText size="medium" weight="semibold">Passport Number</BodyText></th>
          <th><BodyText size="medium" weight="semibold">Issued Date</BodyText></th>
          <th><BodyText size="medium" weight="semibold">Expiry Date</BodyText></th>
          <th><BodyText size="medium" weight="semibold">Issuing Country</BodyText></th>
        </tr>
      </thead>
      <tbody>
        {passportData.map((row) => (
          <tr key={row.passportNumber}>
            <td><BodyText size="medium">{row.passportNumber}</BodyText></td>
            <td><BodyText size="medium">{row.issuedDate}</BodyText></td>
            <td><BodyText size="medium">{row.expiryDate}</BodyText></td>
            <td><BodyText size="medium">{row.issuingCountry}</BodyText></td>
          </tr>
        ))}
      </tbody>
    </table>
  </Section>
);

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('personal');

  return (
    <div className="ee-profile-page">
      {/* Profile Header (green background) */}
      <div className="profile-header">
        <Avatar src="https://i.pravatar.cc/216?u=jess" size={128} alt="Jess Cordova" />

        <div className="profile-header-content">
          <TextButton size="small" dark startIcon={<IconV2 name="chevron-left-solid" size={10} />}>
            Back
          </TextButton>

          <div className="profile-header-title-row">
            <Headline size="extra-large" color="neutral-inverted" component="h1">
              Jess (Jessica) Cordova
            </Headline>
            <div className="profile-header-actions">
              <Button
                variant="outlined"
                size="small"
                dark
                endIcon={<IconV2 name="caret-down-solid" size={10} />}
              >
                Request a Change
              </Button>
              <IconButton
                icon={<IconV2 name="ellipsis-solid" size={16} />}
                aria-label="More actions"
                dark
              />
            </div>
          </div>

          <BodyText size="medium" color="neutral-inverted">
            She/Her &middot; Director, Demand Generation in Marketing
          </BodyText>

          {/* Filled Tabs */}
          <Tabs
            value={activeTab}
            onChange={(value) => setActiveTab(value as string)}
            mode="fill"
            dark
          >
            <Tab value="personal" label="Personal" />
            <Tab value="job" label="Job" />
            <Tab value="time-off" label="Time Off" />
            <Tab value="documents" label="Documents" />
            <Tab value="timesheets" label="Timesheets" />
            <Tab value="performance" label="Performance" />
            <Tab value="emergency" label="Emergency" />
            <Tab value="training" label="Training" />
          </Tabs>
        </div>
      </div>

      {/* Page Content */}
      <div className="ee-profile-content-layout">
        {/* Content Header */}
        <div className="content-header-row">
          <Flex alignItems="center" gap={2}>
            <IconV2 name="id-card-solid" size={20} color="primary-strong" />
            <Headline size="small" color="primary">Personal</Headline>
          </Flex>
          <Button variant="outlined" color="primary" size="small">
            Edit Fields
          </Button>
        </div>

        <div className="ee-profile-content-body">
          {/* Left Sidebar */}
          <ProfileSidebar />

          {/* Main Content Sections */}
          <div className="ee-profile-sections">
            <BasicInfoSection />
            <ContactSection />
            <PassportTableSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
