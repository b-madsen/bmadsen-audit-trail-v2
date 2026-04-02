import { useState } from 'react';
import { IconV2, Headline } from '@bamboohr/fabric';
import {
  Button,
  FormSectionHeader,
  InfoBanner,
  TextInput,
  FormDropdown,
} from '../../components';
import { employees } from '../../data/employees';
import './NewEmployeePage.css';

// Dropdown options
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-Binary' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
];

const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'FL', label: 'Florida' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'WA', label: 'Washington' },
];

const payScheduleOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'semi-monthly', label: 'Semi-Monthly' },
  { value: 'monthly', label: 'Monthly' },
];

const payTypeOptions = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'salary', label: 'Salary' },
];

const payRateTypeOptions = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'annual', label: 'Annual' },
];

const payPeriodOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const employmentStatusOptions = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'intern', label: 'Intern' },
];

const jobTitleOptions = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'senior-software-engineer', label: 'Senior Software Engineer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'designer', label: 'Designer' },
  { value: 'hr-manager', label: 'HR Manager' },
];

const reportsToOptions = employees
  .filter(emp => emp.directReports > 0 && !emp.isTBH)
  .map(emp => ({
    value: emp.id.toString(),
    label: `${emp.name} - ${emp.title}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'hr', label: 'Human Resources' },
];

const divisionOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'operations', label: 'Operations' },
  { value: 'corporate', label: 'Corporate' },
];

const locationOptions = [
  { value: 'ny-office', label: 'New York Office' },
  { value: 'sf-office', label: 'San Francisco Office' },
  { value: 'remote', label: 'Remote' },
];

const relationshipOptions = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'other', label: 'Other' },
];

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' },
];

const degreeOptions = [
  { value: 'high-school', label: 'High School' },
  { value: 'associates', label: "Associate's Degree" },
  { value: 'bachelors', label: "Bachelor's Degree" },
  { value: 'masters', label: "Master's Degree" },
  { value: 'doctorate', label: 'Doctorate' },
];

export default function NewEmployeePage() {
  // Reserved for future form sections
  void relationshipOptions;
  void countryOptions;
  void degreeOptions;

  const [sendPacket, setSendPacket] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'allow' | 'none'>('allow');
  const [formData, setFormData] = useState({
    employeeNumber: '',
    firstName: '',
    lastName: '',
    preferredName: '',
    birthDate: '',
    ssn: '',
    gender: '',
    maritalStatus: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    paySchedule: '',
    payType: '',
    payRate: '',
    payRateType: '',
    payPeriod: '',
    payGrade: '',
    workPhone: '',
    mobilePhone: '',
    homePhone: '',
    workEmail: '',
    homeEmail: '',
    hireDate: '',
    employmentStatus: '',
    jobTitle: '',
    reportsTo: '',
    department: '',
    division: '',
    location: '',
    dependentFirstName: '',
    dependentMiddleName: '',
    dependentLastName: '',
    dependentBirthDate: '',
    dependentSSN: '',
    dependentGender: '',
    dependentRelationship: '',
    emergencyFirstName: '',
    emergencyLastName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    emergencyCity: '',
    emergencyState: '',
    emergencyPostalCode: '',
    emergencyCountry: '',
    institution: '',
    degree: '',
    major: '',
    gpa: '',
    startDate: '',
    endDate: '',
    secondaryLanguage: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="new-employee-page">
      {/* Page Header */}
      <div className="new-employee-header">
        <div className="new-employee-header-content">
          <Headline size="large">New Employee</Headline>
          <Button variant="text">Customize Add Employee Form</Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="new-employee-form">
        <div className="new-employee-form-content">
          <div className="new-employee-form-sections">
            {/* New Hire Packet Banner */}
            <InfoBanner
              title="Make everyone's life a little bit easier and send a New Hire Packet."
              description="Your new employee will be able to enter their own personal information, sign paperwork, see their team, and more."
              checkboxLabel="Send this new employee a new hire packet"
              checked={sendPacket}
              onCheckboxChange={setSendPacket}
            />

            {/* Personal Section */}
            <FormSectionHeader title="Personal" icon="circle-user">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput
                    label="Employee #"
                    value={formData.employeeNumber}
                    onChange={(value) => handleInputChange('employeeNumber', value)}
                    placeholder="Employee #"
                  />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="First Name" value={formData.firstName} onChange={(value) => handleInputChange('firstName', value)} placeholder="First Name" />
                </div>
                <div className="new-employee-field">
                  <TextInput label="Middle Name" value={formData.preferredName} onChange={(value) => handleInputChange('preferredName', value)} placeholder="Middle Name" />
                </div>
                <div className="new-employee-field">
                  <TextInput label="Last Name" value={formData.lastName} onChange={(value) => handleInputChange('lastName', value)} placeholder="Last Name" />
                </div>
                <div className="new-employee-field">
                  <TextInput label="Preferred Name" value={formData.preferredName} onChange={(value) => handleInputChange('preferredName', value)} placeholder="Preferred Name" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput type="date" label="Birth Date" value={formData.birthDate} onChange={(value) => handleInputChange('birthDate', value)} placeholder="MM/DD/YYYY" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Gender" options={genderOptions} value={formData.gender} onChange={(value) => handleInputChange('gender', value)} placeholder="-Select-" />
                </div>
                <div className="new-employee-field">
                  <FormDropdown label="Marital Status" options={maritalStatusOptions} value={formData.maritalStatus} onChange={(value) => handleInputChange('maritalStatus', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="SSN" value={formData.ssn} onChange={(value) => handleInputChange('ssn', value)} placeholder="SSN" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Address Section */}
            <FormSectionHeader title="Address" icon="home">
              <div className="new-employee-form-row">
                <div className="new-employee-field--wide">
                  <TextInput label="Street 1" value={formData.street1} onChange={(value) => handleInputChange('street1', value)} placeholder="Street 1" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field--wide">
                  <TextInput label="Street 2" value={formData.street2} onChange={(value) => handleInputChange('street2', value)} placeholder="Street 2" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field--narrow">
                  <TextInput label="City" value={formData.city} onChange={(value) => handleInputChange('city', value)} placeholder="City" />
                </div>
                <div className="new-employee-field--narrow">
                  <FormDropdown label="State" options={stateOptions} value={formData.state} onChange={(value) => handleInputChange('state', value)} placeholder="-Select-" />
                </div>
                <div className="new-employee-field--narrow">
                  <TextInput label="Postal Code" value={formData.postalCode} onChange={(value) => handleInputChange('postalCode', value)} placeholder="Postal Code" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Compensation Section */}
            <FormSectionHeader title="Compensation" icon="circle-dollar">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Pay Schedule" options={payScheduleOptions} value={formData.paySchedule} onChange={(value) => handleInputChange('paySchedule', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Pay Type" options={payTypeOptions} value={formData.payType} onChange={(value) => handleInputChange('payType', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="Pay Rate" value={formData.payRate} onChange={(value) => handleInputChange('payRate', value)} placeholder="Pay Rate" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Pay Rate Type" options={payRateTypeOptions} value={formData.payRateType} onChange={(value) => handleInputChange('payRateType', value)} placeholder="-Select-" />
                </div>
                <div className="new-employee-field">
                  <FormDropdown label="Pay Period" options={payPeriodOptions} value={formData.payPeriod} onChange={(value) => handleInputChange('payPeriod', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="Pay Grade" value={formData.payGrade} onChange={(value) => handleInputChange('payGrade', value)} placeholder="Pay Grade" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Contact Section */}
            <FormSectionHeader title="Contact" icon="phone">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="Work Phone" value={formData.workPhone} onChange={(value) => handleInputChange('workPhone', value)} placeholder="Work Phone" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput label="Mobile Phone" value={formData.mobilePhone} onChange={(value) => handleInputChange('mobilePhone', value)} placeholder="Mobile Phone" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field--wide">
                  <TextInput label="Work Email" value={formData.workEmail} onChange={(value) => handleInputChange('workEmail', value)} placeholder="Work Email" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field--wide">
                  <TextInput label="Home Email" value={formData.homeEmail} onChange={(value) => handleInputChange('homeEmail', value)} placeholder="Home Email" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Job Section */}
            <FormSectionHeader title="Job" icon="building">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <TextInput type="date" label="Hire Date" value={formData.hireDate} onChange={(value) => handleInputChange('hireDate', value)} placeholder="MM/DD/YYYY" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Employment Status Section */}
            <FormSectionHeader title="Employment Status" icon="id-badge">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Employment Status" options={employmentStatusOptions} value={formData.employmentStatus} onChange={(value) => handleInputChange('employmentStatus', value)} placeholder="-Select-" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Job Information Section */}
            <FormSectionHeader title="Job Information" icon="building">
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Job Title" options={jobTitleOptions} value={formData.jobTitle} onChange={(value) => handleInputChange('jobTitle', value)} placeholder="-Select-" />
                </div>
                <div className="new-employee-field">
                  <FormDropdown label="Reports To" options={reportsToOptions} value={formData.reportsTo} onChange={(value) => handleInputChange('reportsTo', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Department" options={departmentOptions} value={formData.department} onChange={(value) => handleInputChange('department', value)} placeholder="-Select-" />
                </div>
                <div className="new-employee-field">
                  <FormDropdown label="Division" options={divisionOptions} value={formData.division} onChange={(value) => handleInputChange('division', value)} placeholder="-Select-" />
                </div>
              </div>
              <div className="new-employee-form-row">
                <div className="new-employee-field">
                  <FormDropdown label="Location" options={locationOptions} value={formData.location} onChange={(value) => handleInputChange('location', value)} placeholder="-Select-" />
                </div>
              </div>
            </FormSectionHeader>

            {/* Self-Service Access Section */}
            <FormSectionHeader title="Self-Service Access" icon="user-lock">
              <div className="new-employee-access-cards">
                <button
                  type="button"
                  onClick={() => setAccessLevel('allow')}
                  className={`new-employee-access-card ${accessLevel === 'allow' ? 'new-employee-access-card--selected' : ''}`}
                >
                  <div className={`new-employee-access-icon ${accessLevel === 'allow' ? 'new-employee-access-icon--primary' : 'new-employee-access-icon--neutral'}`}>
                    <IconV2 name="user-check-solid" size={24} color={accessLevel === 'allow' ? 'neutral-inverted' : 'primary-strong'} />
                  </div>
                  <div className="new-employee-access-content">
                    <div className="new-employee-access-title">Allow Access to BambooHR</div>
                    <p className="new-employee-access-description">They will be able to login to BambooHR using the access level you choose</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setAccessLevel('none')}
                  className={`new-employee-access-card ${accessLevel === 'none' ? 'new-employee-access-card--selected' : ''}`}
                >
                  <div className={`new-employee-access-icon ${accessLevel === 'none' ? 'new-employee-access-icon--primary' : 'new-employee-access-icon--neutral'}`}>
                    <IconV2 name="ban-solid" size={24} color={accessLevel === 'none' ? 'neutral-inverted' : 'primary-strong'} />
                  </div>
                  <div className="new-employee-access-content">
                    <div className={`new-employee-access-title ${accessLevel === 'none' ? '' : 'new-employee-access-title--medium'}`}>No Access</div>
                    <p className="new-employee-access-description">They won't have access and will not be able to login to BambooHR.</p>
                  </div>
                </button>
              </div>
            </FormSectionHeader>

            {/* Action Buttons */}
            <div className="new-employee-actions">
              <Button variant="primary">Save</Button>
              <Button variant="standard">Save & Create New Hire Packet</Button>
              <Button variant="text">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
