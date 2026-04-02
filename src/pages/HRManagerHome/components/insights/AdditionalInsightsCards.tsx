import { useState } from 'react';
import { Gridlet, BodyText, Avatar, Button, InlineMessage, TileV2, Pill, PillType, ProgressBar, IconV2, IconButton, RoundedToggle } from '@bamboohr/fabric';
import './InsightsCards.css';

// Scheduled 1:1s Card
export function Scheduled1on1sCard() {
  const meetings = [
    { id: 1, employee: { firstName: 'Alex', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=alex', department: 'Engineering' }, engagementScore: 58, daysSinceLastMeeting: 45, suggestedDate: 'Feb 10' },
    { id: 2, employee: { firstName: 'Jordan', lastName: 'Lee', photoUrl: 'https://i.pravatar.cc/150?u=jordan', department: 'Design' }, engagementScore: 62, daysSinceLastMeeting: 38, suggestedDate: 'Feb 11' },
    { id: 3, employee: { firstName: 'Taylor', lastName: 'Smith', photoUrl: 'https://i.pravatar.cc/150?u=taylor', department: 'Engineering' }, engagementScore: 65, daysSinceLastMeeting: 30, suggestedDate: 'Feb 12' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Recommended 1:1 Meetings" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Priority Order"
            description="Meetings are sorted by engagement score and days since last check-in."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Engagement</th>
                  <th>Days Since Meeting</th>
                  <th>Suggested Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={m.employee.photoUrl} alt={`${m.employee.firstName} ${m.employee.lastName}`} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{m.employee.firstName} {m.employee.lastName}</BodyText>
                          <BodyText size="extra-small" color="neutral-weak">{m.employee.department}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small" color={m.engagementScore < 65 ? 'error-strong' : 'neutral-strong'}>{m.engagementScore}%</BodyText>
                        <ProgressBar current={m.engagementScore} total={100} />
                      </div>
                    </td>
                    <td><BodyText size="small" color="warning-strong">{m.daysSinceLastMeeting} days</BodyText></td>
                    <td><BodyText size="small">{m.suggestedDate}</BodyText></td>
                    <td><IconButton icon="calendar-plus-regular" aria-label="Schedule meeting" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Industry Benchmarks Card
export function IndustryBenchmarksCard() {
  const benchmarks = [
    { metric: 'Employee Engagement', yours: 72, industry: 69, status: 'above' },
    { metric: 'Employee Satisfaction', yours: 78, industry: 72, status: 'above' },
    { metric: 'Voluntary Turnover', yours: 12, industry: 15, status: 'better' },
    { metric: 'Time to Fill Roles', yours: 42, industry: 38, status: 'below' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Industry Benchmarks" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Your Score</th>
                  <th>Industry Avg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{b.metric}</BodyText></td>
                    <td><BodyText size="small">{b.yours}{b.metric.includes('Turnover') || b.metric.includes('Time') ? '' : '%'}{b.metric.includes('Time') ? ' days' : ''}</BodyText></td>
                    <td><BodyText size="small" color="neutral-weak">{b.industry}{b.metric.includes('Turnover') || b.metric.includes('Time') ? '' : '%'}{b.metric.includes('Time') ? ' days' : ''}</BodyText></td>
                    <td>
                      <Pill muted type={b.status === 'below' ? PillType.Warning : PillType.Success}>
                        {b.status === 'above' || b.status === 'better' ? 'Above Avg' : 'Below Avg'}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Year Over Year Trends Card
export function YearOverYearTrendsCard() {
  const trends = [
    { metric: 'Engagement Score', lastYear: 64, thisYear: 72, change: 8 },
    { metric: 'Satisfaction Score', lastYear: 70, thisYear: 78, change: 8 },
    { metric: 'Turnover Rate', lastYear: 18, thisYear: 12, change: -6 },
    { metric: 'Training Completion', lastYear: 72, thisYear: 85, change: 13 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Year-Over-Year Trends" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="arrow-trend-up-solid" title="+8%" description="Engagement YoY" orientation="horizontal" />
            <TileV2 icon="arrow-trend-down-solid" title="-6%" description="Turnover YoY" orientation="horizontal" />
            <TileV2 icon="chart-line-up-solid" title="+13%" description="Training YoY" orientation="horizontal" />
          </div>
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Last Year</th>
                  <th>This Year</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {trends.map((t, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{t.metric}</BodyText></td>
                    <td><BodyText size="small" color="neutral-weak">{t.lastYear}%</BodyText></td>
                    <td><BodyText size="small">{t.thisYear}%</BodyText></td>
                    <td>
                      <BodyText size="small" color={t.metric === 'Turnover Rate' ? (t.change < 0 ? 'success-strong' : 'error-strong') : (t.change > 0 ? 'success-strong' : 'error-strong')}>
                        {t.change > 0 ? '+' : ''}{t.change}%
                      </BodyText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Engineering Team Focus Card
export function EngineeringTeamFocusCard() {
  const teamMembers = [
    { id: 1, employee: { firstName: 'Alex', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=alex' }, role: 'Senior Engineer', engagement: 58, risk: 'high', concern: 'Career growth' },
    { id: 2, employee: { firstName: 'Sam', lastName: 'Park', photoUrl: 'https://i.pravatar.cc/150?u=sam' }, role: 'Engineer', engagement: 62, risk: 'medium', concern: 'Work-life balance' },
    { id: 3, employee: { firstName: 'Chris', lastName: 'Wong', photoUrl: 'https://i.pravatar.cc/150?u=chris' }, role: 'Tech Lead', engagement: 65, risk: 'medium', concern: 'Recognition' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Engineering Team Analysis" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="users-solid" title="12" description="Team Size" orientation="horizontal" />
            <TileV2 icon="gauge-simple-solid" title="62%" description="Avg Engagement" orientation="horizontal" />
            <TileV2 icon="triangle-exclamation-solid" title="3" description="At Risk" orientation="horizontal" />
          </div>
          <InlineMessage
            status="warning"
            title="Attention Needed"
            description="Engineering has the lowest engagement score. Primary concerns: career growth opportunities and work-life balance."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Engagement</th>
                  <th>Risk Level</th>
                  <th>Primary Concern</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={m.employee.photoUrl} alt={`${m.employee.firstName} ${m.employee.lastName}`} size={32} />
                        <BodyText size="small" weight="medium">{m.employee.firstName} {m.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td><BodyText size="small">{m.role}</BodyText></td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small">{m.engagement}%</BodyText>
                        <ProgressBar current={m.engagement} total={100} />
                      </div>
                    </td>
                    <td>
                      <Pill muted type={m.risk === 'high' ? PillType.Error : PillType.Warning}>
                        {m.risk === 'high' ? 'High' : 'Medium'}
                      </Pill>
                    </td>
                    <td><BodyText size="small" color="neutral-weak">{m.concern}</BodyText></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Backup Coverage Card
export function BackupCoverageCard() {
  const backupOptions = [
    { id: 1, employee: { firstName: 'Morgan', lastName: 'Davis', photoUrl: 'https://i.pravatar.cc/150?u=morgan', department: 'Engineering' }, skills: ['React', 'Node.js'], capacity: 'Available', match: 95 },
    { id: 2, employee: { firstName: 'Casey', lastName: 'Brown', photoUrl: 'https://i.pravatar.cc/150?u=casey', department: 'Engineering' }, skills: ['Python', 'AWS'], capacity: '50% Available', match: 85 },
    { id: 3, employee: { firstName: 'Riley', lastName: 'Johnson', photoUrl: 'https://i.pravatar.cc/150?u=riley', department: 'Design' }, skills: ['UI/UX', 'Figma'], capacity: 'Available', match: 80 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Backup Coverage Options" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI Recommendation"
            description="Based on skills matching and current workload, these team members can provide backup coverage."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Skills</th>
                  <th>Capacity</th>
                  <th>Match Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {backupOptions.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={b.employee.photoUrl} alt={`${b.employee.firstName} ${b.employee.lastName}`} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{b.employee.firstName} {b.employee.lastName}</BodyText>
                          <BodyText size="extra-small" color="neutral-weak">{b.employee.department}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {b.skills.map((skill, idx) => (
                          <Pill key={idx} muted type={PillType.Info}>{skill}</Pill>
                        ))}
                      </div>
                    </td>
                    <td>
                      <Pill muted type={b.capacity === 'Available' ? PillType.Success : PillType.Warning}>{b.capacity}</Pill>
                    </td>
                    <td><BodyText size="small" weight="medium">{b.match}%</BodyText></td>
                    <td><IconButton icon="user-plus-regular" aria-label="Assign" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Workload Distribution Card
export function WorkloadDistributionCard() {
  const employees = [
    { id: 1, employee: { firstName: 'Jamie', lastName: 'Chen', photoUrl: 'https://i.pravatar.cc/150?u=jamie' }, currentLoad: 60, capacity: 40, status: 'available' },
    { id: 2, employee: { firstName: 'Drew', lastName: 'Martinez', photoUrl: 'https://i.pravatar.cc/150?u=drew' }, currentLoad: 75, capacity: 25, status: 'limited' },
    { id: 3, employee: { firstName: 'Avery', lastName: 'Wilson', photoUrl: 'https://i.pravatar.cc/150?u=avery' }, currentLoad: 95, capacity: 5, status: 'full' },
    { id: 4, employee: { firstName: 'Quinn', lastName: 'Taylor', photoUrl: 'https://i.pravatar.cc/150?u=quinn' }, currentLoad: 50, capacity: 50, status: 'available' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Workload Distribution" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="user-check-solid" title="2" description="Available" orientation="horizontal" />
            <TileV2 icon="user-clock-solid" title="1" description="Limited" orientation="horizontal" />
            <TileV2 icon="user-xmark-solid" title="1" description="At Capacity" orientation="horizontal" />
          </div>
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Current Load</th>
                  <th>Available Capacity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={e.employee.photoUrl} alt={`${e.employee.firstName} ${e.employee.lastName}`} size={32} />
                        <BodyText size="small" weight="medium">{e.employee.firstName} {e.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small">{e.currentLoad}%</BodyText>
                        <ProgressBar current={e.currentLoad} total={100} />
                      </div>
                    </td>
                    <td><BodyText size="small">{e.capacity}%</BodyText></td>
                    <td>
                      <Pill muted type={e.status === 'available' ? PillType.Success : e.status === 'limited' ? PillType.Warning : PillType.Error}>
                        {e.status === 'available' ? 'Available' : e.status === 'limited' ? 'Limited' : 'Full'}
                      </Pill>
                    </td>
                    <td>
                      {e.status !== 'full' && <IconButton icon="clipboard-list-regular" aria-label="Assign task" size="small" variant="outlined" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Overdue Items Card
export function OverdueItemsCard() {
  const items = [
    { id: 1, type: 'Training', item: 'Safety Compliance Course', employee: 'Alex Kim', daysOverdue: 14 },
    { id: 2, type: 'Training', item: 'Harassment Prevention', employee: 'Sam Park', daysOverdue: 7 },
    { id: 3, type: 'Review', item: 'Q4 Performance Review', employee: 'Jordan Lee', daysOverdue: 23 },
    { id: 4, type: 'Review', item: 'Annual Review', employee: 'Taylor Smith', daysOverdue: 12 },
    { id: 5, type: 'Approval', item: 'Time-off Request', employee: 'Chris Wong', daysOverdue: 5 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="All Overdue Items (12)" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="graduation-cap-solid" title="4" description="Training" orientation="horizontal" />
            <TileV2 icon="clipboard-check-solid" title="3" description="Reviews" orientation="horizontal" />
            <TileV2 icon="check-double-solid" title="3" description="Approvals" orientation="horizontal" />
            <TileV2 icon="file-lines-solid" title="2" description="Documents" orientation="horizontal" />
          </div>
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Employee</th>
                  <th>Days Overdue</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td><Pill muted type={i.type === 'Training' ? PillType.Error : i.type === 'Review' ? PillType.Warning : PillType.Info}>{i.type}</Pill></td>
                    <td><BodyText size="small">{i.item}</BodyText></td>
                    <td><BodyText size="small">{i.employee}</BodyText></td>
                    <td><BodyText size="small" color="error-strong">{i.daysOverdue} days</BodyText></td>
                    <td><IconButton icon="circle-check-regular" aria-label="Resolve" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Automation Setup Card
export function AutomationSetupCard() {
  const automations = [
    { id: 1, name: 'Auto-approve routine time-off', description: 'Automatically approve requests under 3 days with 2+ weeks notice', enabled: true },
    { id: 2, name: 'Training reminder emails', description: 'Send reminders 7 days before due date', enabled: true },
    { id: 3, name: 'Weekly pending items digest', description: 'Email summary of pending approvals every Monday', enabled: false },
    { id: 4, name: 'Birthday/anniversary notifications', description: 'Notify 3 days before celebrations', enabled: true },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Automation Settings" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Save Time with Automation"
            description="Enable automations to reduce manual work. AI learns your patterns to suggest new automations."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Automation</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {automations.map((a) => (
                  <tr key={a.id}>
                    <td><BodyText size="small" weight="medium">{a.name}</BodyText></td>
                    <td><BodyText size="small" color="neutral-weak">{a.description}</BodyText></td>
                    <td>
                      <Pill muted type={a.enabled ? PillType.Success : PillType.Neutral}>
                        {a.enabled ? 'Enabled' : 'Disabled'}
                      </Pill>
                    </td>
                    <td>
                      <IconButton icon={a.enabled ? 'gear-regular' : 'toggle-on-regular'} aria-label={a.enabled ? 'Configure' : 'Enable'} size="small" variant="outlined" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Training By Category Card
export function TrainingByCategoryCard() {
  const categories = [
    { category: 'Compliance', pending: 8, overdue: 4, completed: 45, total: 57 },
    { category: 'Safety', pending: 5, overdue: 2, completed: 38, total: 45 },
    { category: 'Professional Development', pending: 12, overdue: 0, completed: 28, total: 40 },
    { category: 'Onboarding', pending: 3, overdue: 0, completed: 15, total: 18 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Training by Category" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Pending</th>
                  <th>Overdue</th>
                  <th>Completed</th>
                  <th>Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{c.category}</BodyText></td>
                    <td><BodyText size="small">{c.pending}</BodyText></td>
                    <td><BodyText size="small" color={c.overdue > 0 ? 'error-strong' : 'neutral-weak'}>{c.overdue}</BodyText></td>
                    <td><BodyText size="small">{c.completed}</BodyText></td>
                    <td>
                      <div className="score-cell">
                        <BodyText size="small">{Math.round((c.completed / c.total) * 100)}%</BodyText>
                        <ProgressBar current={c.completed} total={c.total} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Training Completion Rates Card
export function TrainingCompletionRatesCard() {
  const departments = [
    { department: 'HR', rate: 95, trend: 'up' },
    { department: 'Sales', rate: 82, trend: 'up' },
    { department: 'Marketing', rate: 80, trend: 'stable' },
    { department: 'Engineering', rate: 65, trend: 'down' },
    { department: 'Design', rate: 58, trend: 'down' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Training Completion by Department" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="warning"
            title="Attention Needed"
            description="Engineering and Design departments are below the 75% completion target."
          />
          <div className="bar-chart">
            {departments.map((d, idx) => (
              <div key={idx} className="bar-chart-row">
                <div className="bar-chart-label">
                  <BodyText size="small">{d.department}</BodyText>
                </div>
                <div className="bar-chart-bar-container">
                  <div className="bar-chart-bar bar-chart-bar--engagement" style={{ width: `${d.rate}%` }} />
                </div>
                <div className="bar-chart-value">
                  <BodyText size="small" weight="medium">{d.rate}%</BodyText>
                  <IconV2 name={d.trend === 'up' ? 'arrow-up-solid' : d.trend === 'down' ? 'arrow-down-solid' : 'minus-solid'} size={12} color={d.trend === 'up' ? 'success-strong' : d.trend === 'down' ? 'error-strong' : 'neutral-weak'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Root Cause Analysis Card
export function RootCauseAnalysisCard() {
  const causes = [
    { cause: 'Limited Growth Opportunities', percentage: 45, trend: 'up', actionable: true },
    { cause: 'Compensation Concerns', percentage: 30, trend: 'stable', actionable: true },
    { cause: 'Work-Life Balance', percentage: 15, trend: 'down', actionable: true },
    { cause: 'Manager Relationship', percentage: 10, trend: 'down', actionable: true },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Turnover Risk Root Causes" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI Analysis"
            description="Based on survey responses, exit interviews, and engagement data, these are the primary drivers of turnover risk."
          />
          <div className="bar-chart">
            {causes.map((c, idx) => (
              <div key={idx} className="bar-chart-row">
                <div className="bar-chart-label" style={{ width: 180 }}>
                  <BodyText size="small">{c.cause}</BodyText>
                </div>
                <div className="bar-chart-bar-container">
                  <div className="bar-chart-bar bar-chart-bar--satisfaction" style={{ width: `${c.percentage * 2}%` }} />
                </div>
                <div className="bar-chart-value">
                  <BodyText size="small" weight="medium">{c.percentage}%</BodyText>
                  <IconV2 name={c.trend === 'up' ? 'arrow-up-solid' : c.trend === 'down' ? 'arrow-down-solid' : 'minus-solid'} size={12} color={c.trend === 'up' ? 'error-strong' : c.trend === 'down' ? 'success-strong' : 'neutral-weak'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Upcoming Birthdays Card
export function UpcomingBirthdaysCard() {
  const birthdays = [
    { id: 1, employee: { firstName: 'Marcus', lastName: 'Chen', photoUrl: 'https://i.pravatar.cc/150?u=marcus', department: 'Engineering' }, date: 'Feb 8', daysUntil: 1 },
    { id: 2, employee: { firstName: 'Sarah', lastName: 'Johnson', photoUrl: 'https://i.pravatar.cc/150?u=sarahj', department: 'Marketing' }, date: 'Feb 15', daysUntil: 8 },
    { id: 3, employee: { firstName: 'David', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=david', department: 'Sales' }, date: 'Feb 22', daysUntil: 15 },
    { id: 4, employee: { firstName: 'Emily', lastName: 'Brown', photoUrl: 'https://i.pravatar.cc/150?u=emily', department: 'Design' }, date: 'Mar 1', daysUntil: 22 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Upcoming Birthdays (6)" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Days Until</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {birthdays.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={b.employee.photoUrl} alt={`${b.employee.firstName} ${b.employee.lastName}`} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{b.employee.firstName} {b.employee.lastName}</BodyText>
                          <BodyText size="extra-small" color="neutral-weak">{b.employee.department}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td><BodyText size="small">{b.date}</BodyText></td>
                    <td>
                      <Pill muted type={b.daysUntil <= 3 ? PillType.Warning : PillType.Neutral}>
                        {b.daysUntil === 1 ? 'Tomorrow' : `${b.daysUntil} days`}
                      </Pill>
                    </td>
                    <td>
                      <Button size="small" color="ai" variant="outlined" startIcon={<IconV2 name="sparkles-solid" size={16} />}>
                        Generate Message
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Auto Send Setup Card
export function AutoSendSetupCard() {
  const [birthdayEnabled, setBirthdayEnabled] = useState(true);
  const [anniversaryEnabled, setAnniversaryEnabled] = useState(false);

  return (
    <Gridlet header={<Gridlet.Header title="Auto-Send Configuration" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Automated Celebrations"
            description="Configure automatic birthday and anniversary messages. Messages are personalized using AI based on employee data."
          />
          <div className="department-grid">
            <div className="department-card">
              <div className="department-card-header">
                <BodyText weight="semibold">Birthday Messages</BodyText>
                <RoundedToggle
                  id="birthday-toggle"
                  isChecked={birthdayEnabled}
                  onChange={() => setBirthdayEnabled(!birthdayEnabled)}
                  ariaLabel="Enable birthday messages"
                />
              </div>
              {birthdayEnabled ? (
                <>
                  <BodyText size="small" color="neutral-weak">Send via: Email</BodyText>
                  <BodyText size="small" color="neutral-weak">Send time: 9:00 AM on birthday</BodyText>
                </>
              ) : (
                <BodyText size="small" color="neutral-weak">Not configured</BodyText>
              )}
              <Button
                size="small"
                color="ai"
                variant="outlined"
                startIcon={<IconV2 name="sparkles-solid" size={16} />}
              >
                Configure
              </Button>
            </div>
            <div className="department-card">
              <div className="department-card-header">
                <BodyText weight="semibold">Anniversary Messages</BodyText>
                <RoundedToggle
                  id="anniversary-toggle"
                  isChecked={anniversaryEnabled}
                  onChange={() => setAnniversaryEnabled(!anniversaryEnabled)}
                  ariaLabel="Enable anniversary messages"
                />
              </div>
              {anniversaryEnabled ? (
                <>
                  <BodyText size="small" color="neutral-weak">Send via: Email</BodyText>
                  <BodyText size="small" color="neutral-weak">Send time: 9:00 AM on anniversary</BodyText>
                </>
              ) : (
                <BodyText size="small" color="neutral-weak">Not configured</BodyText>
              )}
              <Button
                size="small"
                color="ai"
                variant="outlined"
                startIcon={<IconV2 name="sparkles-solid" size={16} />}
              >
                Configure
              </Button>
            </div>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Recognition Event Card
export function RecognitionEventCard() {
  const milestones = [
    { id: 1, employee: { firstName: 'Jennifer', lastName: 'Wu', photoUrl: 'https://i.pravatar.cc/150?u=jennifer' }, milestone: '5-Year Anniversary', date: 'Feb 15' },
    { id: 2, employee: { firstName: 'Michael', lastName: 'Scott', photoUrl: 'https://i.pravatar.cc/150?u=michael' }, milestone: '5-Year Anniversary', date: 'Feb 20' },
    { id: 3, employee: { firstName: 'Lisa', lastName: 'Park', photoUrl: 'https://i.pravatar.cc/150?u=lisa' }, milestone: 'Exceeded Q4 Goals', date: 'Feb 10' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Recognition Event Planning" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Event Suggestion"
            description="5 team members have significant milestones this quarter. Consider hosting a recognition event on February 15th."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Milestone</th>
                  <th>Date</th>
                  <th>Include</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={m.employee.photoUrl} alt={`${m.employee.firstName} ${m.employee.lastName}`} size={32} />
                        <BodyText size="small" weight="medium">{m.employee.firstName} {m.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td><BodyText size="small">{m.milestone}</BodyText></td>
                    <td><BodyText size="small">{m.date}</BodyText></td>
                    <td><IconButton icon="plus-regular" aria-label="Add to event" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button color="primary">Plan Recognition Event</Button>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Past Milestones Card
export function PastMilestonesCard() {
  const milestones = [
    { type: 'Work Anniversaries', count: 12, icon: 'calendar-star-solid' as const },
    { type: 'Promotions', count: 8, icon: 'arrow-up-right-dots-solid' as const },
    { type: 'Goals Completed', count: 24, icon: 'bullseye-arrow-solid' as const },
    { type: 'Certifications', count: 5, icon: 'certificate-solid' as const },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Past 12 Months Milestones" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            {milestones.map((m, idx) => (
              <TileV2 key={idx} icon={m.icon} title={String(m.count)} description={m.type} orientation="horizontal" />
            ))}
          </div>
          <InlineMessage
            status="success"
            title="Recognition Improved"
            description="Recognition rate increased by 35% compared to the previous year. Keep up the great work!"
          />
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Milestone Achievements Card
export function MilestoneAchievementsCard() {
  const achievements = [
    { id: 1, employee: { firstName: 'Sarah', lastName: 'Chen', photoUrl: 'https://i.pravatar.cc/150?u=sarahc' }, achievement: 'Leadership Certification', date: 'Jan 28', type: 'certification' },
    { id: 2, employee: { firstName: 'Michael', lastName: 'Park', photoUrl: 'https://i.pravatar.cc/150?u=michaelp' }, achievement: '5-Year Anniversary', date: 'Feb 1', type: 'anniversary' },
    { id: 3, employee: { firstName: 'Engineering Team', lastName: '', photoUrl: '' }, achievement: 'Exceeded Q4 Delivery Goals', date: 'Jan 31', type: 'goal' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Recent Milestone Achievements" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee/Team</th>
                  <th>Achievement</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="employee-cell">
                        {a.employee.photoUrl ? (
                          <Avatar src={a.employee.photoUrl} alt={`${a.employee.firstName} ${a.employee.lastName}`} size={32} />
                        ) : (
                          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconV2 name="users-solid" size={16} color="neutral-weak" />
                          </div>
                        )}
                        <BodyText size="small" weight="medium">{a.employee.firstName} {a.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <BodyText size="small">{a.achievement}</BodyText>
                        <Pill muted type={a.type === 'certification' ? PillType.Info : a.type === 'anniversary' ? PillType.Success : PillType.Warning}>
                          {a.type === 'certification' ? 'Certification' : a.type === 'anniversary' ? 'Anniversary' : 'Goal'}
                        </Pill>
                      </div>
                    </td>
                    <td><BodyText size="small">{a.date}</BodyText></td>
                    <td>
                      <Button size="small" color="ai" variant="outlined" startIcon={<IconV2 name="paper-plane-solid" size={16} />}>
                        Send Congrats
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Survey By Sentiment Card
export function SurveyBySentimentCard() {
  const sentiments = [
    { sentiment: 'Positive', percentage: 45, count: 28, color: 'success' as const },
    { sentiment: 'Neutral', percentage: 35, count: 22, color: 'neutral' as const },
    { sentiment: 'Negative', percentage: 20, count: 12, color: 'error' as const },
  ];

  const negativeTopics = [
    { topic: 'Career Growth', mentions: 5 },
    { topic: 'Communication', mentions: 4 },
    { topic: 'Workload', mentions: 3 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Survey Comments by Sentiment" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            {sentiments.map((s, idx) => (
              <TileV2 key={idx} icon={s.color === 'success' ? 'face-smile-solid' : s.color === 'neutral' ? 'face-meh-solid' : 'face-frown-solid'} title={`${s.percentage}%`} description={`${s.sentiment} (${s.count})`} orientation="horizontal" />
            ))}
          </div>
          <InlineMessage
            status="warning"
            title="Negative Feedback Focus Areas"
            description="Career growth (40%) and communication (35%) are the top concerns in negative feedback."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Mentions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {negativeTopics.map((t, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{t.topic}</BodyText></td>
                    <td><BodyText size="small">{t.mentions} comments</BodyText></td>
                    <td><IconButton icon="eye-regular" aria-label="View comments" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Growth Programs Card
export function GrowthProgramsCard() {
  const programs = [
    { id: 1, name: 'Mentorship Pairing', description: 'Match employees with senior mentors', impact: 'Addresses 32% of departure reasons', status: 'recommended' },
    { id: 2, name: 'Skills Development Tracks', description: 'Structured learning paths by role', impact: 'Improves engagement by 15%', status: 'recommended' },
    { id: 3, name: 'Internal Mobility Postings', description: 'Internal job board for transfers', impact: 'Reduces turnover by 20%', status: 'available' },
    { id: 4, name: 'Leadership Pipeline', description: 'Identify and develop future leaders', impact: 'Fills 40% of leadership roles internally', status: 'available' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Recommended Growth Programs" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI Recommendations"
            description="Based on exit interview data showing career growth as the #1 departure reason, these programs can help improve retention."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Description</th>
                  <th>Expected Impact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <BodyText size="small" weight="medium">{p.name}</BodyText>
                        {p.status === 'recommended' && <Pill muted type={PillType.Info}>Recommended</Pill>}
                      </div>
                    </td>
                    <td><BodyText size="small" color="neutral-weak">{p.description}</BodyText></td>
                    <td><BodyText size="small">{p.impact}</BodyText></td>
                    <td><IconButton icon="circle-info-regular" aria-label="Learn more" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Promotion Rates Card
export function PromotionRatesCard() {
  const departments = [
    { department: 'HR', rate: 18, avgTime: '1.8 years' },
    { department: 'Sales', rate: 15, avgTime: '2.0 years' },
    { department: 'Marketing', rate: 14, avgTime: '2.2 years' },
    { department: 'Design', rate: 10, avgTime: '2.5 years' },
    { department: 'Engineering', rate: 8, avgTime: '2.8 years' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Promotion Rate Analysis" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="arrow-up-right-dots-solid" title="12%" description="Overall Rate" orientation="horizontal" />
            <TileV2 icon="industry-solid" title="15%" description="Industry Avg" orientation="horizontal" />
            <TileV2 icon="clock-solid" title="2.3 yrs" description="Avg Time" orientation="horizontal" />
          </div>
          <InlineMessage
            status="warning"
            title="Below Industry Average"
            description="Your promotion rate is 3% below industry average. Engineering has the lowest rate at 8%."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Promotion Rate</th>
                  <th>Avg Time to Promotion</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{d.department}</BodyText></td>
                    <td><BodyText size="small">{d.rate}%</BodyText></td>
                    <td><BodyText size="small">{d.avgTime}</BodyText></td>
                    <td>
                      <Pill muted type={d.rate >= 15 ? PillType.Success : d.rate >= 12 ? PillType.Warning : PillType.Error}>
                        {d.rate >= 15 ? 'Above Avg' : d.rate >= 12 ? 'At Avg' : 'Below Avg'}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Feedback Templates Card
export function FeedbackTemplatesCard() {
  const templates = [
    { id: 1, name: 'Weekly Check-in', description: 'Quick 15-min sync on progress and blockers', usageCount: 156 },
    { id: 2, name: 'Performance Discussion', description: 'In-depth review of goals and development', usageCount: 48 },
    { id: 3, name: 'Goal Setting', description: 'Quarterly goal planning conversation', usageCount: 32 },
    { id: 4, name: 'Development Conversation', description: 'Career growth and learning discussion', usageCount: 24 },
    { id: 5, name: 'Recognition Moment', description: 'Acknowledge achievements and wins', usageCount: 89 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Feedback Templates" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="AI-Powered Templates"
            description="Each template includes AI-suggested talking points personalized for the employee."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Template</th>
                  <th>Description</th>
                  <th>Times Used</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t) => (
                  <tr key={t.id}>
                    <td><BodyText size="small" weight="medium">{t.name}</BodyText></td>
                    <td><BodyText size="small" color="neutral-weak">{t.description}</BodyText></td>
                    <td><BodyText size="small">{t.usageCount}x</BodyText></td>
                    <td><IconButton icon="file-lines-regular" aria-label="Use template" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// New Hire Updates Card
export function NewHireUpdatesCard() {
  const newHires = [
    { id: 1, employee: { firstName: 'Alex', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=alexk' }, startDate: 'Feb 3', department: 'Engineering', onboardingProgress: 60, buddy: 'Sarah Chen' },
  ];

  const onboardingTasks = [
    { task: 'Security Training', status: 'pending' },
    { task: 'Team Introductions', status: 'pending' },
    { task: 'First Project Assignment', status: 'pending' },
    { task: 'HR Paperwork', status: 'completed' },
    { task: 'Equipment Setup', status: 'completed' },
    { task: 'Account Access', status: 'completed' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="New Hire Onboarding" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          {newHires.map((h) => (
            <div key={h.id}>
              <div className="employee-cell" style={{ marginBottom: 16 }}>
                <Avatar src={h.employee.photoUrl} alt={`${h.employee.firstName} ${h.employee.lastName}`} size={48} />
                <div className="employee-info">
                  <BodyText weight="semibold">{h.employee.firstName} {h.employee.lastName}</BodyText>
                  <BodyText size="small" color="neutral-weak">{h.department} • Started {h.startDate}</BodyText>
                  <BodyText size="small" color="neutral-weak">Buddy: {h.buddy}</BodyText>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <BodyText size="small" color="neutral-weak">Onboarding Progress</BodyText>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ProgressBar current={h.onboardingProgress} total={100} />
                  <BodyText size="small" weight="medium">{h.onboardingProgress}%</BodyText>
                </div>
              </div>
            </div>
          ))}
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {onboardingTasks.map((t, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small">{t.task}</BodyText></td>
                    <td>
                      <Pill muted type={t.status === 'completed' ? PillType.Success : PillType.Warning}>
                        {t.status === 'completed' ? 'Completed' : 'Pending'}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Weekly Updates Card
export function WeeklyUpdatesCard() {
  const updates = [
    { id: 1, type: 'goal', title: '2 Goals Completed', description: 'Sarah Chen and Michael Park hit their Q1 targets', icon: 'bullseye-arrow-solid' as const },
    { id: 2, type: 'hire', title: 'New Hire Started', description: 'Alex Kim joined the Engineering team', icon: 'user-plus-solid' as const },
    { id: 3, type: 'training', title: '3 Trainings Completed', description: 'Compliance training finished by Sales team', icon: 'graduation-cap-solid' as const },
    { id: 4, type: 'promotion', title: 'Promotion Announced', description: 'Jennifer Wu promoted to Senior Designer', icon: 'arrow-up-right-dots-solid' as const },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="This Week's Highlights" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="bullseye-arrow-solid" title="2" description="Goals" orientation="horizontal" />
            <TileV2 icon="user-plus-solid" title="1" description="New Hire" orientation="horizontal" />
            <TileV2 icon="graduation-cap-solid" title="3" description="Trainings" orientation="horizontal" />
            <TileV2 icon="arrow-up-right-dots-solid" title="1" description="Promotion" orientation="horizontal" />
          </div>
          {updates.map((u) => (
            <div key={u.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--fabric-border-color-neutral-weakest)' }}>
              <IconV2 name={u.icon} size={20} color="primary-strong" />
              <div>
                <BodyText size="small" weight="medium">{u.title}</BodyText>
                <BodyText size="small" color="neutral-weak">{u.description}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Actionable Items Card
export function ActionableItemsCard() {
  const items = [
    { id: 1, type: 'Time-off', item: 'Sarah Chen - 3 days PTO', dueDate: 'Today', priority: 'high' },
    { id: 2, type: 'Time-off', item: 'Michael Park - 1 day sick', dueDate: 'Today', priority: 'high' },
    { id: 3, type: 'Time-off', item: 'Alex Kim - 5 days vacation', dueDate: 'Tomorrow', priority: 'medium' },
    { id: 4, type: 'Expense', item: 'Q4 Team Dinner - $450', dueDate: 'Feb 10', priority: 'medium' },
    { id: 5, type: 'Expense', item: 'Conference Travel - $1,200', dueDate: 'Feb 12', priority: 'low' },
    { id: 6, type: 'Document', item: 'Policy Update Review', dueDate: 'Feb 15', priority: 'medium' },
    { id: 7, type: 'Document', item: 'Contractor Agreement', dueDate: 'Feb 8', priority: 'high' },
    { id: 8, type: 'Hiring', item: 'Final Interview Decision - UX Designer', dueDate: 'Feb 9', priority: 'high' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Items Requiring Action (8)" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="plane-departure-solid" title="3" description="Time-off" orientation="horizontal" />
            <TileV2 icon="receipt-solid" title="2" description="Expenses" orientation="horizontal" />
            <TileV2 icon="file-lines-solid" title="2" description="Documents" orientation="horizontal" />
            <TileV2 icon="user-plus-solid" title="1" description="Hiring" orientation="horizontal" />
          </div>
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Due</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 5).map((i) => (
                  <tr key={i.id}>
                    <td><Pill muted type={i.type === 'Time-off' ? PillType.Info : i.type === 'Expense' ? PillType.Warning : PillType.Neutral}>{i.type}</Pill></td>
                    <td><BodyText size="small">{i.item}</BodyText></td>
                    <td><BodyText size="small" color={i.priority === 'high' ? 'error-strong' : 'neutral-weak'}>{i.dueDate}</BodyText></td>
                    <td><IconButton icon="clipboard-check-regular" aria-label="Review" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// PTO Policy Card
export function PtoPolicyCard() {
  return (
    <Gridlet header={<Gridlet.Header title="PTO Policy Summary" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="calendar-days-solid" title="15" description="Days/Year" orientation="horizontal" />
            <TileV2 icon="rotate-left-solid" title="5" description="Max Rollover" orientation="horizontal" />
            <TileV2 icon="clock-solid" title="2 weeks" description="Notice Required" orientation="horizontal" />
          </div>
          <div className="department-card">
            <BodyText weight="semibold">Key Policy Points</BodyText>
            <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
              <li><BodyText size="small">Full-time employees accrue 1.25 days per month</BodyText></li>
              <li><BodyText size="small">Requests for 3+ consecutive days require 2 weeks notice</BodyText></li>
              <li><BodyText size="small">Unused days roll over up to 5 days maximum</BodyText></li>
              <li><BodyText size="small">Blackout periods: Last 2 weeks of December</BodyText></li>
              <li><BodyText size="small">Manager approval required for all requests</BodyText></li>
            </ul>
            <IconButton icon="file-lines-regular" aria-label="View full policy" size="small" variant="outlined" />
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Pending Timesheets Card
export function PendingTimesheetsCard() {
  const pending = [
    { id: 1, employee: { firstName: 'Alex', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=alexk', department: 'Engineering' }, weekEnding: 'Feb 7', status: 'not-submitted' },
    { id: 2, employee: { firstName: 'Jordan', lastName: 'Lee', photoUrl: 'https://i.pravatar.cc/150?u=jordan', department: 'Design' }, weekEnding: 'Feb 7', status: 'not-submitted' },
    { id: 3, employee: { firstName: 'Casey', lastName: 'Brown', photoUrl: 'https://i.pravatar.cc/150?u=casey', department: 'Marketing' }, weekEnding: 'Feb 7', status: 'not-submitted' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Pending Timesheets (8)" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="warning"
            title="Deadline Friday 5pm"
            description="8 employees haven't submitted this week's timesheet. Send reminders to avoid payroll delays."
            action={
              <Button size="small" color="secondary" variant="outlined">Send All Reminders</Button>
            }
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Week Ending</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={p.employee.photoUrl} alt={`${p.employee.firstName} ${p.employee.lastName}`} size={32} />
                        <div className="employee-info">
                          <BodyText size="small" weight="medium">{p.employee.firstName} {p.employee.lastName}</BodyText>
                          <BodyText size="extra-small" color="neutral-weak">{p.employee.department}</BodyText>
                        </div>
                      </div>
                    </td>
                    <td><BodyText size="small">{p.weekEnding}</BodyText></td>
                    <td><Pill muted type={PillType.Error}>Not Submitted</Pill></td>
                    <td><IconButton icon="bell-regular" aria-label="Send reminder" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Bonus Calculations Card
export function BonusCalculationsCard() {
  const bonuses = [
    { id: 1, employee: { firstName: 'Sarah', lastName: 'Chen', photoUrl: 'https://i.pravatar.cc/150?u=sarahc' }, rating: 'Exceeds', multiplier: '120%', amount: '$7,200' },
    { id: 2, employee: { firstName: 'Michael', lastName: 'Park', photoUrl: 'https://i.pravatar.cc/150?u=michaelp' }, rating: 'Exceeds', multiplier: '120%', amount: '$6,800' },
    { id: 3, employee: { firstName: 'Jennifer', lastName: 'Wu', photoUrl: 'https://i.pravatar.cc/150?u=jennifer' }, rating: 'Meets', multiplier: '100%', amount: '$5,500' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Q4 Bonus Calculations" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="users-solid" title="24" description="Eligible" orientation="horizontal" />
            <TileV2 icon="sack-dollar-solid" title="$145K" description="Total Pool" orientation="horizontal" />
            <TileV2 icon="chart-pie-solid" title="8" description="At 120%" orientation="horizontal" />
          </div>
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Rating</th>
                  <th>Multiplier</th>
                  <th>Bonus Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bonuses.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={b.employee.photoUrl} alt={`${b.employee.firstName} ${b.employee.lastName}`} size={32} />
                        <BodyText size="small" weight="medium">{b.employee.firstName} {b.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td><Pill muted type={b.rating === 'Exceeds' ? PillType.Success : PillType.Info}>{b.rating}</Pill></td>
                    <td><BodyText size="small">{b.multiplier}</BodyText></td>
                    <td><BodyText size="small" weight="medium">{b.amount}</BodyText></td>
                    <td><IconButton icon="sliders-regular" aria-label="Adjust" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button color="primary">Approve All & Process</Button>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Benefit Enrollments Card
export function BenefitEnrollmentsCard() {
  const stats = [
    { plan: 'Health - Basic', enrolled: 12, change: 0 },
    { plan: 'Health - Premium', enrolled: 28, change: 8 },
    { plan: '401k', enrolled: 35, change: 3 },
    { plan: 'Dental', enrolled: 32, change: 2 },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Open Enrollment Status" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="clipboard-check-solid" title="85%" description="Completed" orientation="horizontal" />
            <TileV2 icon="user-clock-solid" title="12" description="Pending" orientation="horizontal" />
            <TileV2 icon="calendar-solid" title="5 days" description="Until Deadline" orientation="horizontal" />
          </div>
          <InlineMessage
            status="warning"
            title="Pending Enrollments"
            description="12 employees haven't completed their elections. Deadline is February 12th."
            action={
              <Button size="small" color="secondary" variant="outlined">Send Reminders</Button>
            }
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Enrolled</th>
                  <th>Change from Last Year</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s, idx) => (
                  <tr key={idx}>
                    <td><BodyText size="small" weight="medium">{s.plan}</BodyText></td>
                    <td><BodyText size="small">{s.enrolled} employees</BodyText></td>
                    <td>
                      <BodyText size="small" color={s.change > 0 ? 'success-strong' : s.change < 0 ? 'error-strong' : 'neutral-weak'}>
                        {s.change > 0 ? '+' : ''}{s.change}
                      </BodyText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Review Calendar Card
export function ReviewCalendarCard() {
  const reviews = [
    { status: 'Overdue', count: 5, color: 'error' as const },
    { status: 'This Month', count: 8, color: 'warning' as const },
    { status: 'Next Month', count: 15, color: 'info' as const },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Performance Review Calendar" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <div className="stat-tiles-row">
            <TileV2 icon="triangle-exclamation-solid" title="5" description="Overdue" orientation="horizontal" />
            <TileV2 icon="calendar-solid" title="8" description="This Month" orientation="horizontal" />
            <TileV2 icon="calendar-plus-solid" title="15" description="Next Month" orientation="horizontal" />
          </div>
          <InlineMessage
            status="ai"
            title="Peak Season Approaching"
            description="15 reviews due next month. Consider distributing workload among managers to avoid bottlenecks."
          />
          <div className="bar-chart">
            {reviews.map((r, idx) => (
              <div key={idx} className="bar-chart-row">
                <div className="bar-chart-label">
                  <BodyText size="small">{r.status}</BodyText>
                </div>
                <div className="bar-chart-bar-container">
                  <div className="bar-chart-bar bar-chart-bar--engagement" style={{ width: `${(r.count / 15) * 100}%`, backgroundColor: r.color === 'error' ? 'var(--fabric-surface-color-error-medium)' : r.color === 'warning' ? 'var(--fabric-surface-color-warning-medium)' : 'var(--fabric-surface-color-info-medium)' }} />
                </div>
                <div className="bar-chart-value">
                  <BodyText size="small" weight="medium">{r.count}</BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}

// Retention Meetings Card
export function RetentionMeetingsCard() {
  const meetings = [
    { id: 1, employee: { firstName: 'Alex', lastName: 'Kim', photoUrl: 'https://i.pravatar.cc/150?u=alex' }, riskLevel: 'High', suggestedDate: 'Feb 10-12', availability: 'Good' },
    { id: 2, employee: { firstName: 'Jordan', lastName: 'Lee', photoUrl: 'https://i.pravatar.cc/150?u=jordan' }, riskLevel: 'High', suggestedDate: 'Feb 11-13', availability: 'Limited' },
    { id: 3, employee: { firstName: 'Taylor', lastName: 'Smith', photoUrl: 'https://i.pravatar.cc/150?u=taylor' }, riskLevel: 'Medium', suggestedDate: 'Feb 14-16', availability: 'Good' },
  ];

  return (
    <Gridlet header={<Gridlet.Header title="Schedule Retention Meetings" />}>
      <Gridlet.Body>
        <div className="insights-card-content">
          <InlineMessage
            status="ai"
            title="Optimal Scheduling"
            description="I've analyzed calendars and suggest scheduling within the next 2 weeks for maximum impact."
          />
          <div className="insights-table-container">
            <table className="insights-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Risk Level</th>
                  <th>Suggested Dates</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="employee-cell">
                        <Avatar src={m.employee.photoUrl} alt={`${m.employee.firstName} ${m.employee.lastName}`} size={32} />
                        <BodyText size="small" weight="medium">{m.employee.firstName} {m.employee.lastName}</BodyText>
                      </div>
                    </td>
                    <td><Pill muted type={m.riskLevel === 'High' ? PillType.Error : PillType.Warning}>{m.riskLevel}</Pill></td>
                    <td><BodyText size="small">{m.suggestedDate}</BodyText></td>
                    <td><Pill muted type={m.availability === 'Good' ? PillType.Success : PillType.Warning}>{m.availability}</Pill></td>
                    <td><IconButton icon="calendar-plus-regular" aria-label="Schedule meeting" size="small" variant="outlined" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button color="primary">Schedule All Meetings</Button>
        </div>
      </Gridlet.Body>
    </Gridlet>
  );
}
