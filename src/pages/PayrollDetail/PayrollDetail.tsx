import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeaderV2,
  IconV2,
  Button,
  BodyText,
  Headline,
  Section,
} from '@bamboohr/fabric';
import './PayrollDetail.css';

const timesheetData = [
  { id: 1, name: 'Abbot, Charlotte', department: 'Human Resources', approver: 'Brent Wilson', hours: 0, status: 'not-approved' },
  { id: 2, name: 'Adams, Michael', department: 'Engineering', approver: 'Jennifer Alarcon', hours: 0, status: 'not-approved' },
  { id: 3, name: 'Baker, Sarah', department: 'Marketing', approver: 'Andi Smith', hours: 24.50, status: 'not-approved' },
  { id: 4, name: 'Chen, David', department: 'Sales', approver: 'Brent Wilson', hours: 42.00, status: 'approved' },
  { id: 5, name: 'Davis, Emma', department: 'Finance', approver: 'Brent Wilson', hours: 70.75, status: 'approved' },
];

export function PayrollDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('timesheets');

  const tabs = [
    { id: 'people', label: 'People Being Paid' },
    { id: 'extra-pay', label: 'Extra Pay' },
    { id: 'timesheets', label: 'Timesheets' },
  ];

  return (
    <div className="payroll-detail-page">
      <PageHeaderV2
        title="July 3 Payroll"
        breadcrumb={
          <PageHeaderV2.Breadcrumb
            href="/payroll"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              navigate('/payroll');
            }}
          >
            Payroll Center
          </PageHeaderV2.Breadcrumb>
        }
        subtitle={
          <div className="payroll-detail-meta">
            <div className="payroll-detail-meta-item">
              <span className="payroll-detail-meta-label">
                <BodyText size="extra-small" color="neutral-weak">Due By</BodyText>
              </span>
              <span className="payroll-detail-meta-value">
                <BodyText size="small" weight="medium">Wed, Jan 24 at 1:00 PM</BodyText>
              </span>
            </div>
          </div>
        }
      />

      <Section>
        <div className="payroll-detail-tabs">
          <div className="payroll-detail-tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`payroll-detail-tab-button ${activeTab === tab.id ? 'payroll-detail-tab-button--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'timesheets' && (
          <div style={{ padding: 24 }}>
            <div className="payroll-detail-action-buttons" style={{ marginBottom: 16 }}>
              <Button variant="outlined" color="secondary" size="small" startIcon={<IconV2 name="file-import-regular" size={16} />}>
                Import
              </Button>
              <Button variant="outlined" color="secondary" size="small" startIcon={<IconV2 name="chart-bar-regular" size={16} />}>
                Reports
              </Button>
              <Button variant="contained" color="primary" size="small">
                Approve All
              </Button>
            </div>
            <table className="payroll-detail-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Approver</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {timesheetData.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <BodyText size="small" weight="medium">{entry.name}</BodyText>
                    </td>
                    <td>
                      <BodyText size="small">{entry.approver}</BodyText>
                    </td>
                    <td>
                      <BodyText size="small" weight="medium">{entry.hours.toFixed(2)}</BodyText>
                    </td>
                    <td>{entry.status === 'approved' ? 'Approved' : 'Not Approved'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 24, padding: 24, background: 'var(--surface-neutral-white)', border: '1px solid var(--border-neutral-x-weak)', borderRadius: 8 }}>
              <Headline size="extra-small" color="neutral-strong">Hours Breakdown</Headline>
              <div style={{ marginTop: 16 }}>
                <BodyText size="small" color="neutral-medium">REG: 0 | OT: 0 | DT: 0 | PTO: 0 | Holiday: 0</BodyText>
              </div>
              <div style={{ marginTop: 8, borderTop: '1px solid var(--border-neutral-x-weak)', paddingTop: 8 }}>
                <BodyText size="small" weight="semibold">Total Hours: 0.00</BodyText>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'people' && (
          <div style={{ padding: 24 }}>
            <BodyText size="large">People content will go here</BodyText>
          </div>
        )}

        {activeTab === 'extra-pay' && (
          <div style={{ padding: 24 }}>
            <BodyText size="large">Extra Pay content will go here</BodyText>
          </div>
        )}
      </Section>
    </div>
  );
}

export default PayrollDetail;
