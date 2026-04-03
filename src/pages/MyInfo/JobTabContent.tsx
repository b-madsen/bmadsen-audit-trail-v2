import { useState } from 'react';
import {
  Section,
  Button,
  TextButton,
  IconV2,
  Headline,
  TextField,
  SelectField,
  Checkbox,
} from '@bamboohr/fabric';

interface JobTabContentProps {
  employeeName: string;
}

const directReports = ['Alan Nguyen', 'Chris Downs', 'Melinda Pittman', 'Tony Fonseca'];

const employmentStatus = [
  { effectiveDate: 'Jan 1, 2023', status: 'Full-Time', comment: 'N/A', current: true },
];

const jobHistory = [
  {
    effective: 'Dec 1, 2024',
    location: 'Lindon, UT United States',
    division: 'Sales',
    department: 'Sales',
    teams: 'Sales Dept 1, +1 more',
    jobTitle: 'Sales Rep',
    reportsTo: 'Lucy Samuels',
    current: true,
  },
  {
    effective: 'Apr 21, 2023',
    location: 'Lindon, UT United States',
    division: 'Sales',
    department: 'Sales',
    teams: '+1 more',
    jobTitle: 'Sales Rep',
    reportsTo: 'Thomas Davis',
    current: false,
  },
  {
    effective: 'Nov 1, 2021',
    location: 'Lindon, UT United States',
    division: 'Sales',
    department: 'Sales',
    teams: '—',
    jobTitle: 'Sales Rep',
    reportsTo: 'Thomas Davis',
    current: false,
  },
];

const compensation = [
  {
    effectiveDate: 'Jan 1, 2023',
    paySchedule: 'Twice a month',
    payType: 'Salary',
    payRate: '$125,000.00 / Year',
    overtime: 'Exempt',
    changeReason: 'Promotion',
    comment: 'Promoted',
    current: true,
  },
  {
    effectiveDate: 'Nov 1, 2021',
    paySchedule: 'Twice a month',
    payType: 'Salary',
    payRate: '$100,000.00 / Year',
    overtime: 'Exempt',
    changeReason: 'New Hire',
    comment: '',
    current: false,
  },
];

const bonuses = [
  { date: 'Jan 1, 2023', amount: '$10,000.00', reason: 'Engineering Home', comment: 'Top Performer Award' },
  { date: 'Jan 1, 2023', amount: '$5,000.00', reason: 'Performance', comment: '' },
];

const commissions = [
  { date: 'Jan 1, 2023', amount: '$93.00', comment: 'Demo-Referral' },
  { date: 'Jan 1, 2023', amount: '$100.00', comment: 'N/A' },
];

const equity = [
  {
    grantType: 'ISO',
    grantDate: 'Apr 17, 2024',
    grantQty: '50,000',
    vestingStart: 'Apr 17, 2024',
    vestingMonths: '48',
    strikePrice: '$120',
    vestingSchedule: 'Monthly',
    callMonths: '24',
  },
];

function CurrentDot() {
  return <span className="job-current-dot" />;
}

export function JobTabContent({ employeeName }: JobTabContentProps) {
  void employeeName;
  const [vetActive, setVetActive] = useState(false);
  const [vetArmed, setVetArmed] = useState(true);
  const [vetDisabled, setVetDisabled] = useState(false);
  const [vetSeparated, setVetSeparated] = useState(false);

  return (
    <div className="my-info-sections">
      {/* Section header */}
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="briefcase-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Job</Headline>
        </div>
        <TextButton
          startIcon={<IconV2 name="grid-2-plus-solid" size={16} />}
          endIcon={<IconV2 name="chevron-down-solid" size={12} />}
        >
          Customize Layout
        </TextButton>
      </div>

      {/* Hire Date + EEO + Veteran + Direct Reports */}
      <Section>
        <div className="my-info-form-fields">
          <div className="my-info-field-row">
            <TextField label="Hire Date" value="Nov 1, 2021" onChange={() => {}} />
          </div>
          <div className="my-info-form-grid-2">
            <SelectField label="Ethnicity" value="White" onChange={() => {}}>
              <option value="White">White</option>
              <option value="Hispanic or Latino">Hispanic or Latino</option>
              <option value="Black or African American">Black or African American</option>
              <option value="Asian">Asian</option>
              <option value="Two or More Races">Two or More Races</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </SelectField>
            <SelectField label="EEO Job Category" value="Professional" onChange={() => {}}>
              <option value="Executive/Senior Level Officials and Managers">Executive/Senior Level Officials and Managers</option>
              <option value="First/Mid-Level Officials and Managers">First/Mid-Level Officials and Managers</option>
              <option value="Professional">Professional</option>
              <option value="Technician">Technician</option>
              <option value="Sales Workers">Sales Workers</option>
            </SelectField>
          </div>
          <div className="job-field-group">
            <p className="job-field-label">Veteran Status</p>
            <div className="job-item-stack">
              <Checkbox id="vet-active" value="vet-active" label="Active Duty Wartime or Campaign Badge Veteran" checked={vetActive} onChange={() => setVetActive(!vetActive)} />
              <Checkbox id="vet-armed" value="vet-armed" label="Armed Forces Service Medal Veteran" checked={vetArmed} onChange={() => setVetArmed(!vetArmed)} />
              <Checkbox id="vet-disabled" value="vet-disabled" label="Disabled Veteran" checked={vetDisabled} onChange={() => setVetDisabled(!vetDisabled)} />
              <Checkbox id="vet-separated" value="vet-separated" label="Recently Separated Veteran" checked={vetSeparated} onChange={() => setVetSeparated(!vetSeparated)} />
            </div>
          </div>
          <div className="job-field-group">
            <p className="job-field-label">Direct Reports</p>
            <div className="job-direct-reports-list">
              {directReports.map((name) => (
                <TextButton key={name}>{name}</TextButton>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Employment Status */}
      <Section>
        <Section.Header
          title="Employment Status"
          icon="id-badge-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Effective Date</th>
                <th>Employment Status</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {employmentStatus.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className="job-date-cell">
                      {row.current && <CurrentDot />}
                      {row.effectiveDate}
                    </span>
                  </td>
                  <td>{row.status}</td>
                  <td>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Job Information */}
      <Section>
        <Section.Header
          title="Job Information"
          icon="briefcase-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Effective</th>
                <th>Location</th>
                <th>Division</th>
                <th>Department</th>
                <th>Teams</th>
                <th>Job Title</th>
                <th>Reports To</th>
              </tr>
            </thead>
            <tbody>
              {jobHistory.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className="job-date-cell">
                      {row.current && <CurrentDot />}
                      {row.effective}
                    </span>
                  </td>
                  <td>{row.location}</td>
                  <td>{row.division}</td>
                  <td>{row.department}</td>
                  <td className="job-link-cell">{row.teams}</td>
                  <td>{row.jobTitle}</td>
                  <td className="job-link-cell">{row.reportsTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Compensation */}
      <Section>
        <Section.Header
          title="Compensation"
          icon="circle-dollar-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Effective Date</th>
                <th>Pay Schedule</th>
                <th>Pay Type</th>
                <th>Pay Rate</th>
                <th>Overtime Status</th>
                <th>Change Reason</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {compensation.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className="job-date-cell">
                      {row.current && <CurrentDot />}
                      {row.effectiveDate}
                    </span>
                  </td>
                  <td>{row.paySchedule}</td>
                  <td>{row.payType}</td>
                  <td>{row.payRate}</td>
                  <td>{row.overtime}</td>
                  <td>{row.changeReason}</td>
                  <td>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Potential Bonus */}
      <Section>
        <Section.Header title="Potential Bonus" icon="circle-dollar-solid" />
        <div className="my-info-form-fields">
          <div className="my-info-form-grid-2">
            <SelectField label="Hire Level" value="25%" onChange={() => {}}>
              <option value="10%">10%</option>
              <option value="15%">15%</option>
              <option value="20%">20%</option>
              <option value="25%">25%</option>
              <option value="30%">30%</option>
            </SelectField>
            <TextField label="Annual Amount" value="" onChange={() => {}} placeholder="—" />
          </div>
        </div>
      </Section>

      {/* Bonus */}
      <Section>
        <Section.Header
          title="Bonus"
          icon="circle-dollar-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>{row.reason}</td>
                  <td>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Commission */}
      <Section>
        <Section.Header
          title="Commission"
          icon="circle-dollar-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Equity */}
      <Section>
        <Section.Header
          title="Equity"
          icon="chart-line-solid"
          actions={[
            <Button key="add" variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add Entry</Button>,
          ]}
        />
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Grant Type</th>
                <th>Grant Date</th>
                <th>Grant Qty</th>
                <th>Vesting Start</th>
                <th># of Vesting Months</th>
                <th>Strike Price</th>
                <th>Vesting Schedule</th>
                <th>Call Months</th>
              </tr>
            </thead>
            <tbody>
              {equity.map((row, i) => (
                <tr key={i}>
                  <td>{row.grantType}</td>
                  <td>{row.grantDate}</td>
                  <td>{row.grantQty}</td>
                  <td>{row.vestingStart}</td>
                  <td>{row.vestingMonths}</td>
                  <td>{row.strikePrice}</td>
                  <td>{row.vestingSchedule}</td>
                  <td>{row.callMonths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

export default JobTabContent;
