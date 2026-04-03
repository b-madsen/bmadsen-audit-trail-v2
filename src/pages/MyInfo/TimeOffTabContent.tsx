import { useState } from 'react';
import {
  Section,
  Button,
  IconButton,
  Dropdown,
  IconV2,
  Headline,
  BodyText,
  SelectField,
} from '@bamboohr/fabric';

const upcomingItems = [
  { icon: 'gift-solid', date: 'May 31', description: 'Memorial Day', type: 'holiday' },
  { icon: 'plane-departure-solid', date: 'Jun 6', description: '8 hours for Paid Time Off', type: 'pto' },
];

const historyRows = [
  { date: '03/16/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 17 },
  { date: '04/01/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 21 },
  { date: '04/16/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 25 },
  { date: '04/01/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 21 },
  { date: '04/16/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 25 },
  { date: '04/01/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 21 },
  { date: '04/16/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 25 },
  { date: '04/01/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 21 },
  { date: '04/16/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 25 },
  { date: '04/01/2021', description: 'Accrual from 03/08/2021 to 03/15/2021', used: '', accrued: 4, balance: 21 },
];

export function TimeOffTabContent() {
  const [policyFilter, setPolicyFilter] = useState('vacation');
  const [yearFilter, setYearFilter] = useState('2024');
  const [viewFilter, setViewFilter] = useState('earned-used');

  return (
    <div className="my-info-sections">

      {/* Section header */}
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="suitcase-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Time Off</Headline>
        </div>
        <Button variant="outlined" color="primary" size="small" className="my-info-add-entry-btn">Add time off policy</Button>
      </div>

      {/* Balance cards */}
      <div className="timeoff-cards-grid">

        {/* Sick */}
        <div className="timeoff-card">
          <div className="timeoff-card-icon">
            <IconV2 name="face-smile-solid" size={20} color="primary-strong" />
          </div>
          <Headline size="small" color="primary">24.7 Hours</Headline>
          <div className="timeoff-card-labels">
            <BodyText size="small" weight="semibold" color="neutral-strong">Sick Available</BodyText>
            <BodyText size="small" color="neutral-weak">Goodwill Time</BodyText>
          </div>
          <div className="timeoff-card-actions">
            <IconButton
              icon={<IconV2 name="paper-plane-solid" size={12} />}
              aria-label="Request time off"
              size="small"
              color="secondary"
            />
            <IconButton
              icon={<IconV2 name="table-cells-solid" size={12} />}
              aria-label="View history"
              size="small"
              color="secondary"
            />
            <Dropdown
              type="button"
              ButtonProps={{ icon: 'gear-solid', size: 'small', color: 'secondary' }}
              items={[
                { text: 'Edit policy', value: 'edit' },
                { text: 'Delete policy', value: 'delete' },
              ]}
              onSelect={() => {}}
            />
          </div>
        </div>

        {/* PTO */}
        <div className="timeoff-card">
          <div className="timeoff-card-icon">
            <IconV2 name="plane-departure-solid" size={20} color="primary-strong" />
          </div>
          <Headline size="small" color="primary">12 Hours</Headline>
          <div className="timeoff-card-labels">
            <BodyText size="small" weight="semibold" color="neutral-strong">Paid Time Off (Powered By Remote) Available</BodyText>
            <BodyText size="small" color="neutral-weak">(8 hours scheduled)</BodyText>
            <BodyText size="small" color="neutral-weak">Paid Time Off</BodyText>
          </div>
          <div className="timeoff-card-actions">
            <IconButton
              icon={<IconV2 name="paper-plane-solid" size={12} />}
              aria-label="Request time off"
              size="small"
              color="secondary"
            />
          </div>
        </div>

        {/* Mental Health */}
        <div className="timeoff-card">
          <div className="timeoff-card-icon">
            <IconV2 name="table-cells-solid" size={20} color="primary-strong" />
          </div>
          <Headline size="small" color="primary">16.0 Hours</Headline>
          <div className="timeoff-card-labels">
            <BodyText size="small" weight="semibold" color="neutral-strong">Mental Health (Powered By Remote) Used</BodyText>
            <BodyText size="small" color="neutral-weak">Mental Health</BodyText>
          </div>
          <div className="timeoff-card-actions">
            <IconButton
              icon={<IconV2 name="paper-plane-solid" size={12} />}
              aria-label="Request time off"
              size="small"
              color="secondary"
            />
          </div>
        </div>

      </div>

      {/* Upcoming Time Off */}
      <Section>
        <Section.Header title="Upcoming Time Off" icon="clock-solid" />
        <div className="timeoff-upcoming-list">
          {upcomingItems.map((item) => (
            <div key={item.date + item.description} className="timeoff-upcoming-item">
              <div className="timeoff-upcoming-icon">
                <IconV2 name={item.icon as any} size={16} color="primary-strong" />
              </div>
              <div>
                <BodyText size="medium" weight="semibold" color="neutral-strong">{item.date}</BodyText>
                <BodyText size="small" color="neutral-weak">{item.description}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* History */}
      <Section>
        <Section.Header title="History" icon="clock-rotate-left-solid" />
        <div className="timeoff-history-filters">
          <div className="timeoff-history-filters-left">
            <div className="timeoff-filter-field">
              <SelectField label="" value={policyFilter} onChange={(e: any) => setPolicyFilter(e.target.value)}>
                <option value="vacation">Vacation</option>
                <option value="sick">Sick</option>
                <option value="pto">Paid Time Off</option>
                <option value="mental-health">Mental Health</option>
              </SelectField>
            </div>
            <div className="timeoff-filter-field timeoff-filter-field--narrow">
              <SelectField label="" value={yearFilter} onChange={(e: any) => setYearFilter(e.target.value)}>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </SelectField>
            </div>
          </div>
          <div className="timeoff-filter-field">
            <SelectField label="" value={viewFilter} onChange={(e: any) => setViewFilter(e.target.value)}>
              <option value="earned-used">Earned/Used</option>
              <option value="accrued">Accrued</option>
              <option value="used">Used</option>
            </SelectField>
          </div>
        </div>
        <div className="my-info-table-wrapper">
          <table className="my-info-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Used (-)</th>
                <th>Accrued (+)</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {historyRows.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.description}</td>
                  <td>{row.used}</td>
                  <td>{row.accrued}</td>
                  <td>{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

    </div>
  );
}

export default TimeOffTabContent;
