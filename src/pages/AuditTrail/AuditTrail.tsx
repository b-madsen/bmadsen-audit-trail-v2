import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useViewBar } from '../../contexts/ViewBarContext';
import {
  PageHeaderV2,
  Button,
  ButtonGroup,
  IconV2,
  IconButton,
  IconTile,
  Avatar,
  Checkbox,
  BodyText,
  DatePicker,
  Pill,
  PillType,
  Table,
  StandardModal,
  Headline,
  TextButton,
  Dropdown,
  TextField,
  AutocompleteMultiple,
  InlineMessage,
  SlidedownPortal,
  SLIDEDOWN_TYPES,
} from '@bamboohr/fabric';
import './AuditTrail.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActorType = 'user' | 'system' | 'ask' | 'integration';

interface AuditActor {
  type: ActorType;
  name: string;
  photo?: string;
}

interface DescriptionPart {
  text: string;
  link?: boolean;
}

interface AuditChange {
  employee?: string;
  field: string;
  before: string;
  after: string;
  comment?: string;
}

interface ChangeDisplayRow extends AuditChange {
  showEmployee: boolean;
}

function flattenChanges(changes: AuditChange[], fallbackEmployee?: string): ChangeDisplayRow[] {
  const result: ChangeDisplayRow[] = [];
  let lastEmployee = '\0';
  for (const change of changes) {
    const emp = change.employee ?? fallbackEmployee ?? '';
    result.push({ ...change, employee: emp || change.employee, showEmployee: emp !== lastEmployee });
    lastEmployee = emp;
  }
  return result;
}

interface AutomationStep {
  name: string;
  description: string;
  date?: string;
  timestamp: string;
  status: 'completed' | 'pending';
}

interface AuditEventData {
  id: string;
  actor: AuditActor;
  action: string;
  description: DescriptionPart[];
  timestamp: string;
  affectedEmployee?: { name: string; photo: string };
  viaAsk?: boolean;
  details: {
    ipAddress: string;
    area: string;
    client?: 'desktop' | 'mobile';
    changes: AuditChange[];
    automationSteps?: AutomationStep[];
  };
}

interface AuditGroup {
  key: string;
  label: string;
  date: Date;
  events: AuditEventData[];
}

// ---------------------------------------------------------------------------
// Mock data — description starts with actor name
// ---------------------------------------------------------------------------

const AUDIT_GROUPS: AuditGroup[] = [
  { key: 'today',    label: 'Today',     date: new Date('2026-04-23'), events: [
    { id: 'evt-25', action: 'edited',    actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated compensation for 3 employees' }],                                                                                                                                      timestamp: '10:45 AM', details: { ipAddress: '192.168.1.104', area: 'Payroll',           client: 'desktop', changes: [{ employee: 'Blake Thompson', field: 'Annual Salary',      before: '$72,000',            after: '$78,000'              }, { employee: 'Blake Thompson', field: 'Job Title',            before: 'Senior Designer',    after: 'Lead Designer'        }, { employee: 'Lena Brooks',    field: 'Annual Salary',      before: '$65,000',            after: '$70,000'              }, { employee: 'Lena Brooks',    field: 'Performance Rating', before: 'Meets Expectations', after: 'Exceeds Expectations' }, { employee: 'Jamie Russo',    field: 'Annual Salary',      before: '$58,000',            after: '$63,000'              }] } },
    { id: 'evt-1',  action: 'removed',   actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' removed ' }, { text: 'Emergency Contact Phone', link: true }, { text: ' from ' }, { text: "Blake Thompson's", link: true }, { text: ' profile' }],                              timestamp: '9:22 AM',  details: { ipAddress: '192.168.1.104', area: 'Employee Records', client: 'mobile',  changes: [{ employee: 'Blake Thompson', field: 'Emergency Contact Phone', before: '(801) 555-0192', after: '—' }] } },
    { id: 'evt-2',  action: 'edited',    actor: { type: 'user',        name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' edited ' }, { text: 'Annual Salary', link: true }, { text: ' for ' }, { text: 'Priya Patel', link: true }],                                                                  timestamp: '8:47 AM',  details: { ipAddress: '10.0.1.55',    area: 'Payroll',           client: 'desktop', changes: [{ employee: 'Priya Patel',    field: 'Annual Salary',           before: '$82,000',            after: '$91,000'              }] } },
    { id: 'evt-via-1', action: 'edited', actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, viaAsk: true, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated ' }, { text: "Blake Thompson's", link: true }, { text: ' pay rate via Ask BambooHR' }],                                                                   timestamp: '8:05 AM',  details: { ipAddress: '192.168.1.104', area: 'Payroll',          changes: [{ employee: 'Blake Thompson', field: 'Annual Salary', before: '$78,000', after: '$84,000', comment: 'Merit increase — Ask suggested based on market comp data for L5 designers' }] } },
    { id: 'evt-3',  action: 'edited',    actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' updated ' }, { text: 'Benefits enrollment', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }],                                                             timestamp: '8:12 AM',  details: { ipAddress: '192.168.2.20', area: 'Benefits',          changes: [{ employee: 'Lena Brooks',   field: 'Health Plan',             before: 'Basic PPO',          after: 'Premium PPO'          }, { employee: 'Lena Brooks', field: 'Dental Plan', before: 'None', after: 'Delta Dental Plus' }] } },
    { id: 'evt-4',  action: 'edited',    actor: { type: 'system',      name: 'BambooHR System'                                          }, description: [{ text: 'Time Off Accrual Update', link: true }, { text: ' applied to ' }, { text: '3 employees', link: true }],                                                                                                             timestamp: '12:01 AM', details: { ipAddress: '—',            area: 'Time Off',          changes: [], automationSteps: [
      { name: 'Trigger',           description: 'Monthly pay cycle started',                    date: 'Apr 29', timestamp: '12:00 AM', status: 'completed' },
      { name: 'Evaluate rules',    description: '1.5 days/month accrual rate applied',          date: 'Apr 29', timestamp: '12:00 AM', status: 'completed' },
      { name: 'Update balances',   description: 'Vacation +1.0 day, Sick +0.5 day for 3 employees', date: 'Apr 29', timestamp: '12:01 AM', status: 'completed' },
      { name: 'Notify employees',  description: '3 confirmation emails delivered',              date: 'Apr 29', timestamp: '12:01 AM', status: 'completed' },
    ] } },
  ] },
  { key: 'yesterday', label: 'Yesterday', date: new Date('2026-04-22'), events: [
    { id: 'evt-6',  action: 'logged-in', actor: { type: 'user',        name: 'Priya Patel',    photo: 'https://i.pravatar.cc/40?img=44' }, description: [{ text: 'Priya Patel', link: true }, { text: ' logged in' }],                                                                                                                                                                  timestamp: '3:55 PM',  details: { ipAddress: '10.0.2.88',    area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
    { id: 'evt-7',  action: 'edited',    actor: { type: 'ask',         name: 'Ask'                                                      }, affectedEmployee: { name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Ask BambooHR' }, { text: ' edited ' }, { text: 'Job Title', link: true }, { text: ' for ' }, { text: 'Marcus Rivera', link: true }],                                                                                  timestamp: '2:15 PM',  details: { ipAddress: '—',            area: 'Employee Records',  changes: [{ field: 'Job Title', before: 'Senior Engineer', after: 'Staff Engineer', comment: 'Promotion confirmed in performance review on Apr 21' }, { field: 'Pay Grade', before: 'L4', after: 'L5', comment: 'Updated to match new title band' }] } },
    { id: 'evt-via-2', action: 'edited', actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, viaAsk: true, description: [{ text: 'Derek Olson', link: true }, { text: ' edited ' }, { text: "Priya Patel's", link: true }, { text: ' department via Ask BambooHR' }],                                                                  timestamp: '1:30 PM',  details: { ipAddress: '192.168.2.20',  area: 'Employee Records', changes: [{ employee: 'Priya Patel', field: 'Department', before: 'Engineering', after: 'Product', comment: 'Team restructure confirmed in all-hands — Ask drafted the update' }, { employee: 'Priya Patel', field: 'Cost Center', before: 'ENG-001', after: 'PRD-003', comment: 'Auto-updated to match new department' }] } },
    { id: 'evt-9',  action: 'edited',    actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated ' }, { text: "Jamie Russo's", link: true }, { text: ' onboarding checklist' }],                                                                                        timestamp: '9:44 AM',  details: { ipAddress: '192.168.1.104', area: 'Hiring',            changes: [{ employee: 'Jamie Russo',   field: 'I-9 Verification',        before: 'Incomplete',         after: 'Complete'             }, { employee: 'Jamie Russo', field: 'Direct Deposit', before: 'Incomplete', after: 'Complete' }] } },
  ] },
  { key: 'apr-20', label: 'Apr 20',    date: new Date('2026-04-20'), events: [
    { id: 'evt-11', action: 'added',     actor: { type: 'user',        name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' created ' }, { text: 'new job opening', link: true }, { text: ' for Senior Designer' }],                                                                                     timestamp: '2:40 PM',  details: { ipAddress: '10.0.1.55',    area: 'Hiring',            changes: [{ field: 'Job Opening', before: '—', after: 'Senior Designer (open)' }] } },
    { id: 'evt-ask-2', action: 'edited', actor: { type: 'ask',         name: 'Ask'                                                      }, affectedEmployee: { name: 'Lena Brooks',    photo: 'https://i.pravatar.cc/40?img=25' }, description: [{ text: 'Ask BambooHR' }, { text: ' edited ' }, { text: 'benefits enrollment', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }], timestamp: '11:05 AM', details: { ipAddress: '—',            area: 'Benefits',          changes: [{ field: 'Health Plan', before: 'Basic PPO', after: 'Premium PPO', comment: 'Employee requested upgrade during open enrollment chat' }, { field: 'Dental', before: 'None', after: 'Delta Dental Plus', comment: 'Added per employee request after confirming eligibility' }] } },
    { id: 'evt-13', action: 'logged-in', actor: { type: 'user',        name: 'Blake Thompson', photo: 'https://i.pravatar.cc/40?img=53' }, description: [{ text: 'Blake Thompson', link: true }, { text: ' logged in' }],                                                                                                                                                               timestamp: '8:02 AM',  details: { ipAddress: '172.16.0.4',   area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
  ] },
  { key: 'apr-18', label: 'Apr 18',    date: new Date('2026-04-18'), events: [
    { id: 'evt-14', action: 'edited',    actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated access level for ' }, { text: 'Priya Patel', link: true }],                                                                                                             timestamp: '4:15 PM',  details: { ipAddress: '192.168.1.104', area: 'Settings',          changes: [{ employee: 'Priya Patel',   field: 'Access Level',            before: 'Employee',           after: 'Manager'              }] } },
  ] },
  { key: 'apr-15', label: 'Apr 15',    date: new Date('2026-04-15'), events: [
    { id: 'evt-17', action: 'edited',    actor: { type: 'user',        name: 'Priya Patel',    photo: 'https://i.pravatar.cc/40?img=44' }, description: [{ text: 'Priya Patel', link: true }, { text: ' edited ' }, { text: 'Department', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }],                                                                      timestamp: '11:22 AM', details: { ipAddress: '10.0.2.88',   area: 'Employee Records',  changes: [{ employee: 'Lena Brooks',   field: 'Department',              before: 'Marketing',          after: 'Sales'                }, { employee: 'Lena Brooks', field: 'Division', before: 'East', after: 'West' }] } },
  ] },
  { key: 'apr-12', label: 'Apr 12',    date: new Date('2026-04-12'), events: [
    { id: 'evt-20', action: 'edited',    actor: { type: 'system',      name: 'BambooHR System'                                          }, description: [{ text: 'Time Off Policy Update', link: true }, { text: ' applied to all employees' }],                                                                                                                              timestamp: '12:00 AM', details: { ipAddress: '—',            area: 'Time Off',          changes: [], automationSteps: [
      { name: 'Trigger',           description: 'Accrual rate change saved by HR Admin',       date: 'Apr 11', timestamp: '11:58 PM', status: 'completed' },
      { name: 'Validate changes',  description: 'No policy conflicts detected',                date: 'Apr 11', timestamp: '11:59 PM', status: 'completed' },
      { name: 'Apply policy',      description: 'New rate applied to 142 active employees',    date: 'Apr 12', timestamp: '12:00 AM', status: 'completed' },
      { name: 'Send digest',       description: 'HR summary report emailed',                   date: 'Apr 12', timestamp: '12:00 AM', status: 'completed' },
      { name: 'Notify employees',  description: 'Policy update email scheduled for 9:00 AM',  date: '',       timestamp: '',         status: 'pending'   },
    ] } },
  ] },
  { key: 'apr-10', label: 'Apr 10',    date: new Date('2026-04-10'), events: [
    { id: 'evt-ask-3', action: 'edited', actor: { type: 'ask',         name: 'Ask'                                                      }, affectedEmployee: { name: 'Jamie Russo',    photo: 'https://i.pravatar.cc/40?img=60' }, description: [{ text: 'Ask BambooHR' }, { text: ' edited ' }, { text: 'emergency contact', link: true }, { text: ' for ' }, { text: 'Jamie Russo', link: true }],           timestamp: '10:14 AM', details: { ipAddress: '—',            area: 'Employee Records',  changes: [{ field: 'Emergency Contact Name', before: '—', after: 'Alex Russo', comment: 'Updated via employee self-service chat' }, { field: 'Emergency Contact Phone', before: '—', after: '(801) 555-0142', comment: null }] } },
    { id: 'evt-21', action: 'removed',   actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' removed ' }, { text: 'Blake Thompson', link: true }, { text: ' from ' }, { text: 'Engineering', link: true }, { text: ' team' }],                                               timestamp: '4:00 PM',  details: { ipAddress: '192.168.1.104', area: 'Employee Records',  changes: [{ employee: 'Blake Thompson', field: 'Team',                    before: 'Engineering',        after: '—'                    }] } },
    { id: 'evt-22', action: 'edited',    actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' updated ' }, { text: 'company holiday schedule', link: true }],                                                                                                                 timestamp: '2:18 PM',  details: { ipAddress: '192.168.2.20', area: 'Settings',          changes: [{ field: 'Holiday: Apr 18', before: '—', after: 'Company Day Off' }] } },
    { id: 'evt-24', action: 'logged-in', actor: { type: 'user',        name: 'Blake Thompson', photo: 'https://i.pravatar.cc/40?img=53' }, description: [{ text: 'Blake Thompson', link: true }, { text: ' logged in' }],                                                                                                                                                               timestamp: '8:30 AM',  details: { ipAddress: '172.16.0.4',   area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
  ] },
  { key: 'dec-19-2025', label: 'Dec 19', date: new Date('2025-12-19'), events: [
    { id: 'evt-y1', action: 'edited',  actor: { type: 'user', name: 'Sarah Chen',    photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated ' }, { text: "Priya Patel's", link: true }, { text: ' job title' }],                    timestamp: '3:12 PM',  details: { ipAddress: '192.168.1.104', area: 'Employee Records', client: 'desktop', changes: [{ employee: 'Priya Patel',  field: 'Job Title',  before: 'Engineer II',    after: 'Senior Engineer'  }] } },
    { id: 'evt-y2', action: 'added',   actor: { type: 'user', name: 'Marcus Rivera', photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' added ' }, { text: 'Lena Brooks', link: true }, { text: ' to the Engineering team' }],      timestamp: '1:45 PM',  details: { ipAddress: '10.0.1.55',    area: 'Employee Records',              changes: [{ employee: 'Lena Brooks', field: 'Team',        before: '—',              after: 'Engineering'      }] } },
  ] },
  { key: 'nov-3-2025',  label: 'Nov 3',  date: new Date('2025-11-03'), events: [
    { id: 'evt-y3', action: 'removed', actor: { type: 'user', name: 'Derek Olson',   photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' removed ' }, { text: 'Jamie Russo', link: true }, { text: ' from ' }, { text: 'Benefits plan', link: true }], timestamp: '10:05 AM', details: { ipAddress: '192.168.2.20', area: 'Benefits',                          changes: [{ employee: 'Jamie Russo', field: 'Health Plan', before: 'Premium PPO',    after: '—'                }] } },
    { id: 'evt-y4', action: 'edited',  actor: { type: 'ask',  name: 'Ask'            }, affectedEmployee: { name: 'Blake Thompson', photo: 'https://i.pravatar.cc/40?img=53' }, description: [{ text: 'Ask BambooHR' }, { text: ' edited ' }, { text: 'emergency contact', link: true }, { text: ' for ' }, { text: 'Blake Thompson', link: true }], timestamp: '9:22 AM',  details: { ipAddress: '—',            area: 'Employee Records',              changes: [{ field: 'Emergency Contact Name', before: 'Alex Thompson', after: 'Jordan Thompson', comment: 'Updated per employee request via chat' }] } },
  ] },
];

interface ActorLeaf { id: string; label: string; }
interface ActorNode { id: string; label: string; children?: ActorLeaf[]; }

const ACTOR_TREE: ActorNode[] = [
  { id: 'user',   label: 'User' },
  { id: 'ask',    label: 'Ask BambooHR' },
  { id: 'system', label: 'Automations' },
];

function getActorLeafs(node: ActorNode): string[] {
  return node.children ? node.children.map(c => c.id) : [node.id];
}

function actorParentState(node: ActorNode, selectedIds: string[]): 'checked' | 'indeterminate' | 'unchecked' {
  const leafs = getActorLeafs(node);
  const n = leafs.filter(id => selectedIds.includes(id)).length;
  if (n === 0) return 'unchecked';
  if (n === leafs.length) return 'checked';
  return 'indeterminate';
}

const ACTIONS = [
  { id: 'added',     label: 'Added' },
  { id: 'edited',    label: 'Edited' },
  { id: 'removed',   label: 'Deleted' },
  { id: 'logged-in', label: 'Logged in' },
];

const AREAS = [
  { id: 'employee-records', label: 'Employee Records' },
  { id: 'time-off', label: 'Time Off' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'hiring', label: 'Hiring' },
  { id: 'settings', label: 'Settings' },
];

// ---------------------------------------------------------------------------
// Tags mock data
// ---------------------------------------------------------------------------

interface TagItem { id: string; label: string; categoryLabel: string; }

const ALL_TAGS: TagItem[] = [
  { id: 'emp-sarah',      label: 'Sarah Chen',        categoryLabel: 'People' },
  { id: 'emp-marcus',     label: 'Marcus Rivera',     categoryLabel: 'People' },
  { id: 'emp-derek',      label: 'Derek Olson',       categoryLabel: 'People' },
  { id: 'emp-priya',      label: 'Priya Patel',       categoryLabel: 'People' },
  { id: 'emp-lena',       label: 'Lena Brooks',       categoryLabel: 'People' },
  { id: 'emp-jamie',      label: 'Jamie Russo',       categoryLabel: 'People' },
  { id: 'emp-blake',      label: 'Blake Thompson',    categoryLabel: 'People' },
];

// ---------------------------------------------------------------------------
// TagsDropdown — button + panel containing AutocompleteMultiple
// ---------------------------------------------------------------------------

function TagsDropdown({ value, onChange }: {
  value: TagItem[];
  onChange: (tags: TagItem[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      const target = e.target as HTMLElement;
      if (target.closest('[role="listbox"],[role="option"],[class*="MuiAutocomplete"],[class*="MuiPopper"],[class*="autocomplete"]')) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  return (
    <div className="audit-filter-wrapper" ref={wrapperRef}>
      <Button
        variant="outlined"
        color="secondary"
        size="medium"
        startIcon={<IconV2 name="user-regular" size={16} />}
        endIcon={<IconV2 name="caret-down-solid" size={12} />}
        onClick={() => setOpen(prev => !prev)}
      >
        {value.length > 0 ? `People (${value.length})` : 'People'}
      </Button>

      {open && (
        <div className="audit-filter-panel audit-tags-panel">
          <AutocompleteMultiple
            id="audit-tags"
            label=""
            placeholder="Search people..."
            note="Filter by employee to see their activity across the audit trail."
            notePlacement="block"
            options={ALL_TAGS}
            value={value}
            onChange={({ value: next }) => onChange(next)}
            getOptionLabel={(opt) => opt.label}
            getOptionSelected={(opt, val) => opt.id === val.id}
            filterSelectedOptions
            isInputTextField
            {...{ groupBy: (opt: TagItem) => opt.categoryLabel } as any}
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Change table columns (Fabric Table)
// ---------------------------------------------------------------------------

function formatUndoneTime(d: Date) {
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${date} ${time}`;
}

function inferInputType(field: string): 'text' | 'select' {
  const f = field.toLowerCase();
  if (/\b(status|type|rating|grade|level|department|division|flsa|pay type|employment type|manager|supervisor|reports to|direct report)\b/.test(f)) {
    return 'select';
  }
  return 'text';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeChangeColumns(onUpdate: (change: ChangeDisplayRow) => void, fixedChanges: Record<string, Date>, isMvp: boolean, showComment = false): any[] {
  return [
    {
      header: 'Employee',
      cell: (row: ChangeDisplayRow) => row.showEmployee && row.employee ? (
        <button className="audit-link audit-employee-link" onClick={e => e.stopPropagation()}>
          {row.employee}
        </button>
      ) : null,
    },
    {
      header: 'Attribute',
      cell: (row: ChangeDisplayRow) => {
        return (
          <span>
            <BodyText size="small">{row.field}</BodyText>
          </span>
        );
      },
    },
    {
      header: 'Changes',
      cell: (row: ChangeDisplayRow) => {
        return (
          <span className="audit-changes-cell">
            <Pill muted type={PillType.Neutral}>
              {row.before === '—'
                ? <em>None</em>
                : <span className="audit-before-text">{row.before}</span>
              }
            </Pill>
            <span className="audit-changes-arrow">
              <IconV2 name="arrow-right-regular" size={12} color="neutral-medium" />
            </span>
            <Pill muted type={PillType.Success}>
              {row.after === '—' ? <em>None</em> : row.after}
            </Pill>
          </span>
        );
      },
    },
    ...(showComment ? [{
      header: 'Comment',
      cell: (row: ChangeDisplayRow) => (
        <BodyText size="small" color="neutral-weak">{row.comment ?? '—'}</BodyText>
      ),
    }] : []),
    {
      headerAriaLabel: 'Actions',
      cell: (row: ChangeDisplayRow) => {
        const key = `${row.employee ?? ''}|${row.field}`;
        const alreadyFixed = !!fixedChanges[key];
        if (isMvp) return null;
        return (
          <div className="audit-row-undo-wrap">
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              disabled={alreadyFixed}
              startIcon={<IconV2 name="pen-regular" size={12} />}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onUpdate(row); }}
            >
              Update
            </Button>
          </div>
        );
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Actor icon — Avatar for people, IconTile for system actors
// ---------------------------------------------------------------------------

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function ActorIcon({ actor }: { actor: AuditActor }) {
  if (actor.type === 'user') {
    return (
      <Avatar size={40} alt={actor.name} src={actor.photo}>
        {getInitials(actor.name)}
      </Avatar>
    );
  }

  if (actor.type === 'system') {
    return (
      <IconTile
        icon={<IconV2 name="bolt-solid" size={18} color="primary-strong" />}
        size={40}
        variant="muted"
      />
    );
  }

  if (actor.type === 'ask') {
    return (
      <IconTile
        icon={<div className="audit-ask-icon-inner" />}
        size={40}
        variant="muted"
      />
    );
  }

  return (
    <IconTile
      icon={<IconV2 name="plug-solid" size={16} color="info-strong" />}
      size={40}
      variant="muted"
    />
  );
}

// ---------------------------------------------------------------------------
// Date separator
// ---------------------------------------------------------------------------

const CURRENT_YEAR = new Date().getFullYear();

function formatGroupLabel(label: string, date: Date): string {
  if (label === 'Today' || label === 'Yesterday') return label;
  if (date.getFullYear() !== CURRENT_YEAR) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return label;
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="audit-date-sep-row">
      <Pill muted type={PillType.Neutral}>{label}</Pill>
      <div className="audit-date-sep-rule" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Description — inline text with primary-green links
// ---------------------------------------------------------------------------

function DescriptionText({ parts }: { parts: DescriptionPart[] }) {
  return (
    <p className="audit-event-description">
      {parts.map((part, i) =>
        part.link ? (
          <button key={i} className="audit-link" onClick={e => e.stopPropagation()}>
            {part.text}
          </button>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Action pill
// ---------------------------------------------------------------------------

const ACTION_PILL_CONFIG: Record<string, { type: PillType; label: string; icon: string }> = {
  added:      { type: PillType.Neutral, label: 'Added',     icon: 'circle-plus-regular'              },
  edited:     { type: PillType.Neutral, label: 'Edited',    icon: 'pen-regular'                      },
  removed:    { type: PillType.Neutral, label: 'Deleted',   icon: 'trash-can-regular'                },
  'logged-in':{ type: PillType.Neutral, label: 'Logged in', icon: 'arrow-right-to-bracket-regular'   },
};

function ActionPill({ action }: { action: string }) {
  const config = ACTION_PILL_CONFIG[action];
  if (!config) return null;
  return (
    <span className="audit-action-pill">
      <span className="audit-action-pill-inner">
        <IconV2 name={config.icon} size={14} color="neutral-medium" />
        <BodyText size="small" color="neutral-weak">{config.label}</BodyText>
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Avatar with Ask badge
// ---------------------------------------------------------------------------

function AvatarWithAskBadge({ photo, name }: { photo: string; name: string }) {
  return (
    <div className="audit-avatar-badge-wrap">
      <Avatar src={photo} size={40} alt={name} />
      <div className="audit-ask-badge">
        <div className="audit-ask-badge-icon" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Audit event card
// ---------------------------------------------------------------------------

function AuditEventCard({
  event,
  isExpanded,
  onToggle,
  isMvp,
  onEventAdded,
}: {
  event: AuditEventData;
  isExpanded: boolean;
  onToggle: () => void;
  isMvp: boolean;
  onEventAdded: (newEvent: AuditEventData) => void;
}) {
  const { actor, description, timestamp, details, affectedEmployee } = event;
  const [fixTarget, setFixTarget] = useState<ChangeDisplayRow | null>(null);
  const [fixedChanges, setFixedChanges] = useState<Record<string, Date>>({});
  const [updateValue, setUpdateValue] = useState<string>('');
  const [slidedownVisible, setSlidedownVisible] = useState(false);
  const [slidedownField, setSlidedownField] = useState('');

  const revertedCount = Object.keys(fixedChanges).length;
  const totalCount = details.changes.length;
  const hasAnyReverted = revertedCount > 0;
  const allReverted = revertedCount === totalCount;
  const isAsk = actor.type === 'ask';
  const showComment = isAsk || !!event.viaAsk;
  const changeColumns = makeChangeColumns(
    (row) => { setFixTarget(row); setUpdateValue(row.after); },
    fixedChanges, isMvp, showComment
  );

  return (
    <div id={event.id} className="audit-event-row">
      <div className={`audit-event-card ${isExpanded ? 'audit-event-card--expanded' : ''} ${actor.type === 'ask' ? 'audit-event-card--ask' : ''}`}>
        {/* Header — always visible */}
        <div className="audit-event-header" onClick={onToggle} role="button" aria-expanded={isExpanded}>
          <span className={`audit-event-toggle ${isExpanded ? 'audit-event-toggle--expanded' : ''}`}>
            <IconButton
              icon="angle-down-regular"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              noBoundingBox
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onToggle(); }}
            />
          </span>
          <div className="audit-event-actor-icon">
            {event.viaAsk && actor.photo ? (
              <AvatarWithAskBadge photo={actor.photo} name={actor.name} />
            ) : (
              <ActorIcon actor={actor} />
            )}
          </div>
          <DescriptionText parts={description} />
          <span className="audit-event-right-rail">
            <ActionPill action={event.action} />
            <span className="audit-event-timestamp">
              <BodyText size="small" color="neutral-weak">{timestamp}</BodyText>
            </span>
          </span>
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="audit-event-details">
            {/* Meta row */}
            <div className="audit-event-meta">
              <BodyText size="extra-small" color="neutral-weak">
                <span className="audit-meta-label">Area</span> {details.area}
              </BodyText>
              {details.ipAddress !== '—' && (
                <>
                  <span className="audit-meta-sep">·</span>
                  <BodyText size="small" color="neutral-weak">
                    <span className="audit-meta-label">IP</span> {details.ipAddress}
                  </BodyText>
                </>
              )}
              {details.client && (
                <>
                  <span className="audit-meta-sep">·</span>
                  <BodyText size="small" color="neutral-weak">
                    <span className="audit-meta-label">Client</span> {details.client === 'mobile' ? 'BambooHR Mobile' : 'BambooHR Desktop'}
                  </BodyText>
                </>
              )}
            </div>

            {/* Automation steps timeline / change table */}
            {event.action === 'logged-in' ? null : details.automationSteps ? (
              <div className="audit-automation-timeline">
                {details.automationSteps.map((step, i) => (
                  <div key={i} className={`audit-auto-step audit-auto-step--${step.status}`}>
                    <div className="audit-auto-step-icon-col">
                      <div className="audit-auto-step-icon">
                        <IconV2
                          name={step.status === 'completed' ? 'circle-check-solid' : 'circle-regular'}
                          size={16}
                          color={step.status === 'completed' ? 'success-strong' : 'neutral-medium'}
                        />
                      </div>
                      {i < details.automationSteps!.length - 1 && (
                        <div className="audit-auto-step-line" />
                      )}
                    </div>
                    <div className="audit-auto-step-content">
                      <span className="audit-auto-step-name">{step.name}</span>
                      {step.status === 'completed' ? (
                        <span className="audit-auto-step-ts">
                          {step.date} at {step.timestamp}
                        </span>
                      ) : (
                        <span className="audit-auto-step-pending-label">Pending</span>
                      )}
                      <span className="audit-auto-step-desc">{step.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Fabric Table for field changes */
              <div className="audit-change-table-wrap">
                <Table
                  caption="Field changes"
                  columns={changeColumns}
                  rows={flattenChanges(details.changes, affectedEmployee?.name)}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  rowKey={(row: any) => `${row.employee ?? ''}|${row.field}`}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Update field modal */}
      <StandardModal isOpen={!!fixTarget} onRequestClose={() => setFixTarget(null)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title={fixTarget ? `Update ${fixTarget.field}` : 'Update field'} />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setFixTarget(null)}>Cancel</TextButton>,
                <Button
                  key="confirm"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!fixTarget) return;
                    const key = `${fixTarget.employee ?? ''}|${fixTarget.field}`;
                    setFixedChanges(prev => ({ ...prev, [key]: new Date() }));
                    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                    onEventAdded({
                      id: `evt-new-${Date.now()}`,
                      actor: { type: 'user', name: 'Jess', photo: 'https://i.pravatar.cc/40?img=5' },
                      action: 'edited',
                      description: [
                        { text: 'Jess', link: true },
                        { text: ' edited ' },
                        { text: fixTarget.field, link: true },
                        ...(fixTarget.employee ? [{ text: ' for ' }, { text: fixTarget.employee, link: true }] : []),
                      ],
                      timestamp: timeStr,
                      details: {
                        ipAddress: '—',
                        area: event.details.area,
                        changes: [{
                          employee: fixTarget.employee,
                          field: fixTarget.field,
                          before: fixTarget.after,
                          after: updateValue,
                        }],
                      },
                    });
                    setSlidedownField(fixTarget.field);
                    setSlidedownVisible(true);
                    setTimeout(() => setSlidedownVisible(false), 4000);
                    setFixTarget(null);
                    setUpdateValue('');
                  }}
                >
                  Save Update
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '16px 0' }}>
              <div className="audit-update-changes-preview">
                <BodyText size="small" color="neutral-weak">Previous change</BodyText>
                <span className="audit-changes-cell" style={{ marginTop: 6 }}>
                  <Pill muted type={PillType.Neutral}>
                    <span className="audit-before-text">{fixTarget?.before ?? ''}</span>
                  </Pill>
                  <span className="audit-changes-arrow">
                    <IconV2 name="arrow-right-regular" size={12} color="neutral-medium" />
                  </span>
                  <Pill muted type={PillType.Success}>{fixTarget?.after ?? ''}</Pill>
                </span>
              </div>
              <div className="audit-update-field-wrap">
                <div style={{ marginBottom: 4 }}><BodyText size="small" color="neutral-weak">Update to</BodyText></div>
                {fixTarget && inferInputType(fixTarget.field) === 'select' ? (
                  <select
                    className="audit-update-native-select"
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                  >
                    <option value={fixTarget.after}>{fixTarget.after}</option>
                    <option value={fixTarget.before}>{fixTarget.before} (previous value)</option>
                  </select>
                ) : (
                  <TextField
                    label=""
                    value={updateValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateValue(e.target.value)}
                  />
                )}
              </div>
              <InlineMessage
                status="info"
                title="A new audit trail entry will be created"
                description="Saving this update will add a new entry showing you as the actor. The original change will still be visible in the audit trail."
              />
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
      <SlidedownPortal
        show={slidedownVisible}
        onDismiss={() => setSlidedownVisible(false)}
        message={`${slidedownField} has been updated.`}
        type={SLIDEDOWN_TYPES.success}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ActorsDropdown — hierarchical checkbox list with indeterminate parent state
// ---------------------------------------------------------------------------

function ParentCheckbox({ id, label, state, onChange }: {
  id: string;
  label: string;
  state: 'checked' | 'indeterminate' | 'unchecked';
  onChange: () => void;
}) {
  return (
    <Checkbox
      id={`actor-parent-${id}`}
      name={`actor-parent-${id}`}
      label={label}
      checked={state === 'checked'}
      indeterminate={state === 'indeterminate'}
      onChange={onChange}
    />
  );
}

function ActorsDropdown({ selectedIds, onSelectionChange }: {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [expandedParents, setExpandedParents] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  function toggleParent(node: ActorNode) {
    const leafs = getActorLeafs(node);
    const state = actorParentState(node, selectedIds);
    if (state === 'unchecked') {
      onSelectionChange([...selectedIds, ...leafs.filter(id => !selectedIds.includes(id))]);
      if (node.children) setExpandedParents(prev => [...prev, node.id]);
    } else {
      onSelectionChange(selectedIds.filter(id => !leafs.includes(id)));
      setExpandedParents(prev => prev.filter(id => id !== node.id));
    }
  }

  function toggleLeaf(id: string) {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(s => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  const activeGroups = ACTOR_TREE.filter(node =>
    getActorLeafs(node).some(id => selectedIds.includes(id))
  ).length;
  const isActive = activeGroups > 0;

  return (
    <div className="audit-filter-wrapper" ref={wrapperRef}>
      <Button
        variant="outlined"
        color="secondary"
        size="medium"
        startIcon={<IconV2 name="users-regular" size={16} />}
        endIcon={<IconV2 name="caret-down-solid" size={12} />}
        onClick={() => setOpen(prev => !prev)}
      >
        {isActive ? `Actors (${activeGroups})` : 'Actors'}
      </Button>

      {open && (
        <div className="audit-filter-panel">
          <div className="audit-filter-checkbox-list">
            {ACTOR_TREE.map(node => {
              const state = actorParentState(node, selectedIds);
              const isExpanded = expandedParents.includes(node.id) || state !== 'unchecked';
              return (
                <div key={node.id}>
                  <ParentCheckbox
                    id={node.id}
                    label={node.label}
                    state={state}
                    onChange={() => toggleParent(node)}
                  />
                  {node.children && isExpanded && (
                    <div className="audit-actor-children">
                      {node.children.map(child => (
                        <Checkbox
                          key={child.id}
                          id={`actor-child-${child.id}`}
                          name={`actor-child-${child.id}`}
                          label={child.label}
                          checked={selectedIds.includes(child.id)}
                          onChange={() => toggleLeaf(child.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FilterDropdown
// ---------------------------------------------------------------------------

interface DateRange {
  from: string;
  to: string;
}

interface FilterDropdownProps {
  label: string;
  icon: string;
  type: 'date' | 'checkbox';
  dateValue?: DateRange;
  onDateChange?: (value: DateRange) => void;
  options?: { id: string; label: string }[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

function FilterDropdown({
  label,
  icon,
  type,
  dateValue,
  onDateChange,
  options = [],
  selectedIds = [],
  onSelectionChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dateValue && !dateValue.from && !dateValue.to) {
      setSelectedDays(null);
    }
  }, [dateValue]);

  const count = type === 'date'
    ? (dateValue && (dateValue.from || dateValue.to) ? 1 : 0)
    : selectedIds.length;

  const isActive = count > 0;

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (wrapperRef.current?.contains(target)) return;
      if (target.closest('[role="grid"],[role="dialog"],[role="listbox"],[class*="DatePicker"],[class*="datepicker"],[class*="Calendar"],[class*="calendar"]')) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  function toggleCheckbox(id: string) {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(s => s !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  return (
    <div className="audit-filter-wrapper" ref={wrapperRef}>
      <Button
        variant="outlined"
        color="secondary"
        size="medium"
        startIcon={<IconV2 name={`${icon}-regular` as any} size={16} />}
        endIcon={<IconV2 name="caret-down-solid" size={12} />}
        onClick={() => setOpen(prev => !prev)}
      >
        {isActive ? `${label} (${count})` : label}
      </Button>

      {open && (
        <div className="audit-filter-panel">
          {type === 'date' && dateValue && onDateChange && (
            <>
              <div className="audit-filter-quick-options">
                <div className="audit-filter-quick-options-header">
                  <BodyText size="extra-small" weight="semibold" color="neutral-medium">Quick options</BodyText>
                  <TextButton
                    size="small"
                    disabled={!isActive}
                    onClick={() => {
                      onDateChange({ from: '', to: '' });
                      setSelectedDays(null);
                    }}
                  >
                    Clear
                  </TextButton>
                </div>
                <div className="audit-filter-quick-buttons">
                  <ButtonGroup variant="outlined" size="small">
                    {([
                      { label: '7 days',  days: 7   },
                      { label: '30 days', days: 30  },
                      { label: '90 days', days: 90  },
                      { label: '1 year',  days: 365 },
                    ] as const).map(({ label, days }) => (
                      <Button
                        key={label}
                        className={selectedDays === days ? 'audit-quick-btn--selected' : undefined}
                        onClick={() => {
                          const to   = new Date();
                          const from = new Date();
                          from.setDate(from.getDate() - days);
                          const fmt = (d: Date) =>
                            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                          onDateChange({ from: fmt(from), to: fmt(to) });
                          setSelectedDays(days);
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>
              <div className="audit-filter-date-range">
                <div className="audit-filter-date-label">
                  <BodyText size="small" color="neutral-weak">From</BodyText>
                  <DatePicker
                    value={dateValue.from || undefined}
                    onChange={({ value }: { value: string | undefined }) =>
                      onDateChange({ ...dateValue, from: value ?? '' })
                    }
                    size="small"
                  />
                </div>
                <span className="audit-filter-date-sep">–</span>
                <div className="audit-filter-date-label">
                  <BodyText size="small" color="neutral-weak">To</BodyText>
                  <DatePicker
                    value={dateValue.to || undefined}
                    onChange={({ value }: { value: string | undefined }) =>
                      onDateChange({ ...dateValue, to: value ?? '' })
                    }
                    size="small"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'checkbox' && (
            <div className="audit-filter-checkbox-list">
              {options.map(opt => (
                <Checkbox
                  key={opt.id}
                  value={opt.id}
                  checked={selectedIds.includes(opt.id)}
                  onChange={() => toggleCheckbox(opt.id)}
                  label={opt.label}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

const AREA_ID_MAP: Record<string, string> = {
  'employee-records': 'Employee Records',
  'time-off':         'Time Off',
  'payroll':          'Payroll',
  'benefits':         'Benefits',
  'hiring':           'Hiring',
  'settings':         'Settings',
};

// Maps leaf actor filter IDs → actor.type values they match
const ACTOR_LEAF_TO_TYPE: Record<string, ActorType[]> = {
  user:   ['user'],
  ask:    ['ask'],
  system: ['system'],
};

function applyFilters(
  groups: AuditGroup[],
  dateRange: DateRange,
  selectedActors: string[],
  selectedActions: string[],
  selectedAreas: string[],
  selectedTags: TagItem[],
): AuditGroup[] {
  const fromDate = dateRange.from ? new Date(dateRange.from) : null;
  const toDate   = dateRange.to   ? new Date(dateRange.to)   : null;
  if (fromDate) fromDate.setHours(0, 0, 0, 0);
  if (toDate)   toDate.setHours(23, 59, 59, 999);

  const allowedActorTypes = selectedActors.length > 0
    ? new Set(selectedActors.flatMap(id => ACTOR_LEAF_TO_TYPE[id] ?? []))
    : null;

  const allowedAreas = selectedAreas.length > 0
    ? new Set(selectedAreas.map(id => AREA_ID_MAP[id]))
    : null;

  const taggedActorNames = selectedTags
    .filter(t => t.categoryLabel === 'Employees')
    .map(t => t.label.toLowerCase());

  return groups
    .filter(group => {
      if (fromDate && group.date < fromDate) return false;
      if (toDate   && group.date > toDate)   return false;
      return true;
    })
    .map(group => ({
      ...group,
      events: group.events.filter(event => {
        if (allowedActorTypes && !allowedActorTypes.has(event.actor.type)) return false;
        if (selectedActions.length > 0 && !selectedActions.includes(event.action)) return false;
        if (allowedAreas && !allowedAreas.has(event.details.area)) return false;
        if (taggedActorNames.length > 0 && !taggedActorNames.includes(event.actor.name.toLowerCase())) return false;
        return true;
      }),
    }))
    .filter(group => group.events.length > 0);
}

// ---------------------------------------------------------------------------
// AuditTrail page
// ---------------------------------------------------------------------------

export default function AuditTrail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activeVersion } = useViewBar();
  const isMvp = activeVersion === 'mvp';

  const highlightEventId = searchParams.get('event');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    highlightEventId ? new Set([highlightEventId]) : new Set()
  );
  const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [auditGroups, setAuditGroups] = useState<AuditGroup[]>(AUDIT_GROUPS);

  function handleEventAdded(newEvent: AuditEventData) {
    setAuditGroups(prev => {
      const todayIdx = prev.findIndex(g => g.key === 'today');
      if (todayIdx >= 0) {
        const updated = prev.map((g, i) =>
          i === todayIdx ? { ...g, events: [newEvent, ...g.events] } : g
        );
        return updated;
      }
      const todayGroup: AuditGroup = { key: 'today', label: 'Today', date: new Date(), events: [newEvent] };
      return [todayGroup, ...prev];
    });
    setExpandedIds(prev => new Set([...prev, newEvent.id]));
  }

  useEffect(() => {
    if (!highlightEventId) return;
    let cancelled = false;
    const tid = setTimeout(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        const el = document.getElementById(highlightEventId);
        if (!el) return;
        const timeline = el.closest('.audit-timeline') as HTMLElement | null;
        if (timeline) {
          const elRect = el.getBoundingClientRect();
          const containerRect = timeline.getBoundingClientRect();
          const target = timeline.scrollTop + (elRect.top - containerRect.top) - (timeline.clientHeight / 2) + (el.clientHeight / 2);
          timeline.scrollTop = Math.max(0, target);
        }
        el.classList.add('audit-event-row--highlight');
        setTimeout(() => el.classList.remove('audit-event-row--highlight'), 2000);
      });
    }, 300);
    return () => { cancelled = true; clearTimeout(tid); };
  }, [highlightEventId]);

  useEffect(() => {
    function handleApplyFilters(e: Event) {
      const filters = (e as CustomEvent).detail as { actors?: string[]; actions?: string[]; areas?: string[]; dateRange?: DateRange };
      if (filters.actors) {
        const leafs = filters.actors.flatMap(id => {
          const node = ACTOR_TREE.find(n => n.id === id);
          return node ? getActorLeafs(node) : [id];
        });
        setSelectedActors(leafs);
      }
      if (filters.actions) setSelectedActions(filters.actions);
      if (filters.areas) setSelectedAreas(filters.areas);
      if (filters.dateRange) setDateRange(filters.dateRange);
    }
    window.addEventListener('bhr-apply-audit-filters', handleApplyFilters);
    return () => window.removeEventListener('bhr-apply-audit-filters', handleApplyFilters);
  }, []);

  function toggleExpand(id: string) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="audit-trail-page">
      <PageHeaderV2
        title="Audit Trail"
        breadcrumb={
          <PageHeaderV2.Breadcrumb
            href="/reports"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              navigate('/reports');
            }}
          >
            Reports
          </PageHeaderV2.Breadcrumb>
        }
        primaryContent={
          <div className="audit-header-actions">
            {!isMvp && (
              <IconButton
                icon="user-plus-regular"
                aria-label="Share report"
                variant="outlined"
                onClick={() => setIsShareOpen(true)}
              />
            )}
            <Dropdown
              type="icon"
              ButtonProps={{
                icon: 'arrow-up-from-bracket-regular',
                'aria-label': 'Export report',
                variant: 'outlined',
              } as any}
              showCaret={false}
              items={[{
                type: 'group',
                text: 'Export report as...',
                items: [
                  { text: 'Excel Spreadsheet', value: 'excel' },
                  { text: 'CSV',               value: 'csv' },
                  { text: 'PDF',               value: 'pdf' },
                ],
              }]}
              onSelect={() => {}}
            />
          </div>
        }
      />

      {/* Share modal */}
      <StandardModal isOpen={isShareOpen} onRequestClose={() => setIsShareOpen(false)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Share this Report" />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <Button key="done" variant="contained" color="primary" onClick={() => setIsShareOpen(false)}>
                  Done
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div className="share-modal-content">
              <BodyText size="small" weight="semibold">Who has access</BodyText>
              <div className="share-modal-divider" />
              <div className="share-modal-access-row">
                <IconTile
                  icon={<IconV2 name="users-solid" size={18} color="primary-strong" />}
                  size={40}
                  variant="muted"
                />
                <div className="share-modal-access-info">
                  <BodyText size="medium" weight="semibold">Full Admin</BodyText>
                  <BodyText size="small" color="neutral-weak">Group</BodyText>
                </div>
                <div className="share-modal-access-actions">
                  <IconButton icon="calendar-plus-regular" aria-label="Schedule access" size="small" variant="outlined" />
                  <IconButton icon="xmark-regular" aria-label="Remove access" size="small" variant="outlined" />
                </div>
              </div>
              <div className="share-modal-divider" />
              <div className="share-modal-add-people">
                <BodyText size="small" weight="semibold">Add People</BodyText>
                <div className="share-modal-field">
                  <TextField
                    label=""
                    placeholder="Enter names or groups"
                  />
                </div>
              </div>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>

      {/* Filter bar */}
      <div className="audit-trail-filter-bar">
        {!isMvp && (
          <Button
            color="ai"
            variant="outlined"
            size="medium"
            startIcon={<IconV2 name="sparkles-solid" size={16} />}
            onClick={() => window.dispatchEvent(new CustomEvent('bhr-open-ask', { detail: { context: 'audit-trail' } }))}
          >
            Filter with Ask
          </Button>
        )}

        <FilterDropdown label="Date"    icon="calendar"      type="date"     dateValue={dateRange}         onDateChange={setDateRange} />
        <ActorsDropdown selectedIds={selectedActors} onSelectionChange={setSelectedActors} />
        <FilterDropdown label="Actions" icon="clock-rotate-left"          type="checkbox" options={ACTIONS} selectedIds={selectedActions} onSelectionChange={setSelectedActions} />
        <FilterDropdown label="Areas"   icon="layer-group"   type="checkbox" options={AREAS}   selectedIds={selectedAreas}   onSelectionChange={setSelectedAreas} />
        <TagsDropdown value={selectedTags} onChange={setSelectedTags} />
        {(dateRange.from || dateRange.to || selectedActors.length > 0 || selectedActions.length > 0 || selectedAreas.length > 0 || selectedTags.length > 0) && (
          <TextButton
            onClick={() => {
              setDateRange({ from: '', to: '' });
              setSelectedActors([]);
              setSelectedActions([]);
              setSelectedAreas([]);
              setSelectedTags([]);
            }}
          >
            Clear all
          </TextButton>
        )}
      </div>

      {/* Timeline */}
      <div className="audit-timeline">

        {applyFilters(auditGroups, dateRange, selectedActors, selectedActions, selectedAreas, selectedTags).map(group => (
          <div key={group.key} className="audit-timeline-group">
            <DateSeparator label={formatGroupLabel(group.label, group.date)} />
            {group.events.map(event => (
              <AuditEventCard
                key={event.id}
                event={event}
                isExpanded={expandedIds.has(event.id)}
                onToggle={() => toggleExpand(event.id)}
                isMvp={isMvp}
                onEventAdded={handleEventAdded}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
