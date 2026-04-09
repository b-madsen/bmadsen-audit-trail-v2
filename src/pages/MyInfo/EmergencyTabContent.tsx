import { useState } from 'react';
import {
  IconV2,
  Headline,
  BodyText,
  TextButton,
  Section,
  TextField,
  SelectField,
  Checkbox,
} from '@bamboohr/fabric';

interface EmergencyContact {
  id: number;
  firstName: string;
  relationship: string;
  isPrimary: boolean;
  workPhone: string;
  mobilePhone: string;
  homePhone: string;
  email: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const blankContact = (): EmergencyContact => ({
  id: Date.now(),
  firstName: '',
  relationship: '',
  isPrimary: false,
  workPhone: '',
  mobilePhone: '',
  homePhone: '',
  email: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
});

export function EmergencyTabContent() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { ...blankContact(), id: 1, isPrimary: true },
  ]);

  const addContact = () => {
    setContacts(prev => [...prev, blankContact()]);
  };

  return (
    <div className="my-info-sections">
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="truck-medical-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Emergency</Headline>
        </div>
      </div>

      {contacts.map((contact) => (
        <Section key={contact.id}>
          <div className="my-info-form-fields">

            {/* First Name + Relationship + Primary Contact */}
            <div className="emergency-top-row">
              <div className="emergency-first-name">
                <TextField
                  label="First Name"
                  placeholder="First Name"
                  value={contact.firstName}
                  onChange={() => {}}
                />
              </div>
              <div className="emergency-relationship">
                <SelectField
                  label="Relationship"
                  value={contact.relationship}
                  onChange={() => {}}
                >
                  <option value="">Select</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="child">Child</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </SelectField>
              </div>
              <div className="emergency-primary-checkbox">
                <label className="emergency-checkbox-label">
                  <Checkbox value="primary" checked={contact.isPrimary} onChange={() => {}} />
                  <BodyText size="medium">Primary Contact</BodyText>
                </label>
              </div>
            </div>

            {/* Phone fields */}
            <div className="my-info-field-narrow">
              <TextField
                label="Work Phone"
                placeholder="Work Phone"
                value={contact.workPhone}
                onChange={() => {}}
              />
            </div>
            <div className="my-info-field-narrow">
              <TextField
                label="Mobile Phone"
                placeholder="Mobile Phone"
                value={contact.mobilePhone}
                onChange={() => {}}
              />
            </div>
            <div className="my-info-field-narrow">
              <TextField
                label="Home Phone"
                placeholder="Home Phone"
                value={contact.homePhone}
                onChange={() => {}}
              />
            </div>
            <div className="my-info-field-wide">
              <TextField
                label="Email"
                placeholder="Work Email"
                value={contact.email}
                onChange={() => {}}
              />
            </div>

            {/* Address subsection */}
            <div className="emergency-address-header">
              <Headline size="small" component="h3">Address</Headline>
            </div>

            <div className="emergency-street-field">
              <TextField
                label="Street 1"
                placeholder="Street 1"
                value={contact.street1}
                onChange={() => {}}
              />
            </div>
            <div className="emergency-street-field">
              <TextField
                label="Street 2"
                placeholder="Street 2"
                value={contact.street2}
                onChange={() => {}}
              />
            </div>

            {/* City / State / Postal Code */}
            <div className="emergency-city-row">
              <div className="emergency-city">
                <TextField
                  label="City"
                  placeholder="City"
                  value={contact.city}
                  onChange={() => {}}
                />
              </div>
              <div className="emergency-state">
                <SelectField
                  label="State"
                  value={contact.state}
                  onChange={() => {}}
                >
                  <option value="">Select</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="WA">Washington</option>
                </SelectField>
              </div>
              <div className="emergency-postal">
                <TextField
                  label="Postal Code"
                  placeholder="Postal Code"
                  value={contact.postalCode}
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Country */}
            <div className="emergency-country">
              <SelectField
                label="Country"
                value={contact.country}
                onChange={() => {}}
              >
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="MX">Mexico</option>
              </SelectField>
            </div>

          </div>

          {/* Add Contact — only show on the last contact card */}
          {contact.id === contacts[contacts.length - 1].id && (
            <div className="emergency-add-contact">
              <TextButton
                startIcon={<IconV2 name="circle-plus-solid" size={16} />}
                onClick={addContact}
              >
                Add Contact
              </TextButton>
            </div>
          )}
        </Section>
      ))}
    </div>
  );
}
