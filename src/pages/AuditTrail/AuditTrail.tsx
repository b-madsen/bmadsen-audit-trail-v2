import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewBar } from '../../contexts/ViewBarContext';
import {
  PageHeaderV2,
  Button,
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
  field: string;
  before: string;
  after: string;
}

interface AuditEventData {
  id: string;
  actor: AuditActor;
  action: string;
  description: DescriptionPart[];
  timestamp: string;
  details: {
    ipAddress: string;
    area: string;
    changes: AuditChange[];
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
    { id: 'evt-1',  action: 'removed',   actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' removed ' }, { text: 'Emergency Contact Phone', link: true }, { text: ' from ' }, { text: "Blake Thompson's", link: true }, { text: ' profile' }],                              timestamp: '9:22 AM', details: { ipAddress: '192.168.1.104', area: 'Employee Records', changes: [{ field: 'Emergency Contact Phone', before: '(801) 555-0192', after: '—' }] } },
    { id: 'evt-2',  action: 'edited',    actor: { type: 'user',        name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' edited ' }, { text: 'Annual Salary', link: true }, { text: ' for ' }, { text: 'Priya Patel', link: true }],                                                                  timestamp: '8:47 AM', details: { ipAddress: '10.0.1.55',    area: 'Payroll',           changes: [{ field: 'Annual Salary', before: '$82,000', after: '$91,000' }] } },
    { id: 'evt-3',  action: 'edited',    actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' updated ' }, { text: 'Benefits enrollment', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }],                                                             timestamp: '8:12 AM', details: { ipAddress: '192.168.2.20', area: 'Benefits',          changes: [{ field: 'Health Plan', before: 'Basic PPO', after: 'Premium PPO' }, { field: 'Dental Plan', before: 'None', after: 'Delta Dental Plus' }] } },
    { id: 'evt-4',  action: 'edited',    actor: { type: 'system',      name: 'BambooHR System'                                          }, description: [{ text: 'Platform' }, { text: ' edited ' }, { text: 'Time Off balance', link: true }, { text: ' for 3 employees' }],                                                                                                           timestamp: '12:01 AM', details: { ipAddress: '—',            area: 'Time Off',          changes: [{ field: 'Vacation Balance', before: '10.5 days', after: '11.0 days' }, { field: 'Sick Balance', before: '5.0 days', after: '5.5 days' }] } },
  ] },
  { key: 'yesterday', label: 'Yesterday', date: new Date('2026-04-22'), events: [
    { id: 'evt-5',  action: 'approved',  actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' approved ' }, { text: 'time off request', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }],                                                               timestamp: '4:30 PM', details: { ipAddress: '192.168.2.20', area: 'Time Off',          changes: [{ field: 'Request Status', before: 'Pending', after: 'Approved' }] } },
    { id: 'evt-6',  action: 'logged-in', actor: { type: 'user',        name: 'Priya Patel',    photo: 'https://i.pravatar.cc/40?img=44' }, description: [{ text: 'Priya Patel', link: true }, { text: ' logged in' }],                                                                                                                                                                  timestamp: '3:55 PM', details: { ipAddress: '10.0.2.88',    area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
    { id: 'evt-7',  action: 'edited',    actor: { type: 'ask',         name: 'Ask'                                                      }, description: [{ text: 'Ask BambooHR' }, { text: ' edited ' }, { text: 'Job Title', link: true }, { text: ' for ' }, { text: 'Marcus Rivera', link: true }],                                                                                  timestamp: '2:15 PM', details: { ipAddress: '—',            area: 'Employee Records',  changes: [{ field: 'Job Title', before: 'Senior Engineer', after: 'Staff Engineer' }] } },
    { id: 'evt-8',  action: 'added',     actor: { type: 'integration', name: 'Integration'                                              }, description: [{ text: 'Integration' }, { text: ' added a new employee record for ' }, { text: 'Jamie Russo', link: true }],                                                                                                                   timestamp: '10:08 AM', details: { ipAddress: '—',           area: 'Employee Records',  changes: [{ field: 'Employee Status', before: '—', after: 'Active' }, { field: 'Start Date', before: '—', after: 'Apr 22, 2026' }] } },
    { id: 'evt-9',  action: 'edited',    actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated ' }, { text: "Jamie Russo's", link: true }, { text: ' onboarding checklist' }],                                                                                        timestamp: '9:44 AM', details: { ipAddress: '192.168.1.104', area: 'Hiring',            changes: [{ field: 'I-9 Verification', before: 'Incomplete', after: 'Complete' }, { field: 'Direct Deposit', before: 'Incomplete', after: 'Complete' }] } },
  ] },
  { key: 'apr-20', label: 'Apr 20',    date: new Date('2026-04-20'), events: [
    { id: 'evt-10', action: 'exported',  actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' exported ' }, { text: 'Payroll Report — Q1 2026', link: true }],                                                                                                                timestamp: '5:01 PM', details: { ipAddress: '192.168.1.104', area: 'Payroll',           changes: [{ field: 'Export', before: '—', after: 'Downloaded' }] } },
    { id: 'evt-11', action: 'added',     actor: { type: 'user',        name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' created ' }, { text: 'new job opening', link: true }, { text: ' for Senior Designer' }],                                                                                     timestamp: '2:40 PM', details: { ipAddress: '10.0.1.55',    area: 'Hiring',            changes: [{ field: 'Job Opening', before: '—', after: 'Senior Designer (open)' }] } },
    { id: 'evt-12', action: 'denied',    actor: { type: 'system',      name: 'BambooHR System'                                          }, description: [{ text: 'Platform' }, { text: ' automatically denied ' }, { text: 'time off request', link: true }, { text: ' for ' }, { text: 'Derek Olson', link: true }],                                                                    timestamp: '11:30 AM', details: { ipAddress: '—',           area: 'Time Off',          changes: [{ field: 'Request Status', before: 'Pending', after: 'Denied' }] } },
    { id: 'evt-13', action: 'logged-in', actor: { type: 'user',        name: 'Blake Thompson', photo: 'https://i.pravatar.cc/40?img=53' }, description: [{ text: 'Blake Thompson', link: true }, { text: ' logged in' }],                                                                                                                                                               timestamp: '8:02 AM', details: { ipAddress: '172.16.0.4',   area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
  ] },
  { key: 'apr-18', label: 'Apr 18',    date: new Date('2026-04-18'), events: [
    { id: 'evt-14', action: 'edited',    actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' updated access level for ' }, { text: 'Priya Patel', link: true }],                                                                                                             timestamp: '4:15 PM', details: { ipAddress: '192.168.1.104', area: 'Settings',          changes: [{ field: 'Access Level', before: 'Employee', after: 'Manager' }] } },
    { id: 'evt-15', action: 'edited',    actor: { type: 'integration', name: 'Integration'                                              }, description: [{ text: 'Integration' }, { text: ' synced payroll data for ' }, { text: '12 employees', link: true }],                                                                                                                           timestamp: '1:00 AM', details: { ipAddress: '—',            area: 'Payroll',           changes: [{ field: 'Payroll Sync', before: 'Pending', after: 'Complete' }] } },
  ] },
  { key: 'apr-15', label: 'Apr 15',    date: new Date('2026-04-15'), events: [
    { id: 'evt-16', action: 'denied',    actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' denied ' }, { text: 'time off request', link: true }, { text: ' for ' }, { text: 'Blake Thompson', link: true }],                                                               timestamp: '3:50 PM', details: { ipAddress: '192.168.2.20', area: 'Time Off',          changes: [{ field: 'Request Status', before: 'Pending', after: 'Denied' }] } },
    { id: 'evt-17', action: 'edited',    actor: { type: 'user',        name: 'Priya Patel',    photo: 'https://i.pravatar.cc/40?img=44' }, description: [{ text: 'Priya Patel', link: true }, { text: ' edited ' }, { text: 'Department', link: true }, { text: ' for ' }, { text: 'Lena Brooks', link: true }],                                                                      timestamp: '11:22 AM', details: { ipAddress: '10.0.2.88',  area: 'Employee Records',  changes: [{ field: 'Department', before: 'Marketing', after: 'Sales' }, { field: 'Division', before: 'East', after: 'West' }] } },
    { id: 'evt-18', action: 'exported',  actor: { type: 'ask',         name: 'Ask'                                                      }, description: [{ text: 'Ask BambooHR' }, { text: ' exported ' }, { text: 'headcount report', link: true }],                                                                                                                                    timestamp: '9:05 AM', details: { ipAddress: '—',            area: 'Payroll',           changes: [{ field: 'Export', before: '—', after: 'Downloaded' }] } },
  ] },
  { key: 'apr-12', label: 'Apr 12',    date: new Date('2026-04-12'), events: [
    { id: 'evt-19', action: 'approved',  actor: { type: 'user',        name: 'Marcus Rivera',  photo: 'https://i.pravatar.cc/40?img=11' }, description: [{ text: 'Marcus Rivera', link: true }, { text: ' approved ' }, { text: "Jamie Russo's", link: true }, { text: ' offer letter' }],                                                                                              timestamp: '5:30 PM', details: { ipAddress: '10.0.1.55',    area: 'Hiring',            changes: [{ field: 'Offer Status', before: 'Draft', after: 'Approved' }] } },
    { id: 'evt-20', action: 'edited',    actor: { type: 'system',      name: 'BambooHR System'                                          }, description: [{ text: 'Platform' }, { text: ' updated ' }, { text: 'time off policy', link: true }, { text: ' for all employees' }],                                                                                                         timestamp: '12:00 AM', details: { ipAddress: '—',           area: 'Time Off',          changes: [{ field: 'Accrual Rate', before: '1.25 days/mo', after: '1.5 days/mo' }, { field: 'Max Carryover', before: '10 days', after: '15 days' }] } },
  ] },
  { key: 'apr-10', label: 'Apr 10',    date: new Date('2026-04-10'), events: [
    { id: 'evt-21', action: 'removed',   actor: { type: 'user',        name: 'Sarah Chen',     photo: 'https://i.pravatar.cc/40?img=47' }, description: [{ text: 'Sarah Chen', link: true }, { text: ' removed ' }, { text: 'Blake Thompson', link: true }, { text: ' from ' }, { text: 'Engineering', link: true }, { text: ' team' }],                                               timestamp: '4:00 PM', details: { ipAddress: '192.168.1.104', area: 'Employee Records',  changes: [{ field: 'Team', before: 'Engineering', after: '—' }] } },
    { id: 'evt-22', action: 'edited',    actor: { type: 'user',        name: 'Derek Olson',    photo: 'https://i.pravatar.cc/40?img=68' }, description: [{ text: 'Derek Olson', link: true }, { text: ' updated ' }, { text: 'company holiday schedule', link: true }],                                                                                                                 timestamp: '2:18 PM', details: { ipAddress: '192.168.2.20', area: 'Settings',          changes: [{ field: 'Holiday: Apr 18', before: '—', after: 'Company Day Off' }] } },
    { id: 'evt-23', action: 'added',     actor: { type: 'integration', name: 'Integration'                                              }, description: [{ text: 'Integration' }, { text: ' created benefit elections for ' }, { text: 'Lena Brooks', link: true }],                                                                                                                      timestamp: '10:45 AM', details: { ipAddress: '—',           area: 'Benefits',          changes: [{ field: 'Medical', before: '—', after: 'Enrolled' }, { field: 'Vision', before: '—', after: 'Enrolled' }] } },
    { id: 'evt-24', action: 'logged-in', actor: { type: 'user',        name: 'Blake Thompson', photo: 'https://i.pravatar.cc/40?img=53' }, description: [{ text: 'Blake Thompson', link: true }, { text: ' logged in' }],                                                                                                                                                               timestamp: '8:30 AM', details: { ipAddress: '172.16.0.4',   area: 'Settings',          changes: [{ field: 'Login', before: '—', after: 'Authenticated' }] } },
  ] },
];

interface ActorLeaf { id: string; label: string; }
interface ActorNode { id: string; label: string; children?: ActorLeaf[]; }

const ACTOR_TREE: ActorNode[] = [
  {
    id: 'user', label: 'User',
    children: [
      { id: 'employee', label: 'Employee' },
      { id: 'admin',    label: 'Admin' },
      { id: 'manager',  label: 'Manager' },
    ],
  },
  { id: 'ask',    label: 'Ask BambooHR' },
  { id: 'system', label: 'Platform' },
  {
    id: 'integration', label: 'Integrations',
    children: [
      { id: 'remote',      label: 'Remote' },
      { id: 'gusto',       label: 'Gusto' },
      { id: 'greenhouse',  label: 'Greenhouse' },
      { id: 'indeed',      label: 'Indeed' },
    ],
  },
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
  { id: 'added', label: 'Added' },
  { id: 'edited', label: 'Edited' },
  { id: 'removed', label: 'Removed' },
  { id: 'approved', label: 'Approved' },
  { id: 'denied', label: 'Denied' },
  { id: 'exported', label: 'Exported' },
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
  { id: 'emp-sarah',      label: 'Sarah Chen',        categoryLabel: 'Employees' },
  { id: 'emp-marcus',     label: 'Marcus Rivera',     categoryLabel: 'Employees' },
  { id: 'emp-derek',      label: 'Derek Olson',       categoryLabel: 'Employees' },
  { id: 'emp-priya',      label: 'Priya Patel',       categoryLabel: 'Employees' },
  { id: 'emp-lena',       label: 'Lena Brooks',       categoryLabel: 'Employees' },
  { id: 'emp-jamie',      label: 'Jamie Russo',       categoryLabel: 'Employees' },
  { id: 'emp-blake',      label: 'Blake Thompson',    categoryLabel: 'Employees' },
  { id: 'dept-eng',       label: 'Engineering',       categoryLabel: 'Departments' },
  { id: 'dept-mkt',       label: 'Marketing',         categoryLabel: 'Departments' },
  { id: 'dept-sales',     label: 'Sales',             categoryLabel: 'Departments' },
  { id: 'dept-hr',        label: 'HR & Operations',   categoryLabel: 'Departments' },
  { id: 'dept-fin',       label: 'Finance',           categoryLabel: 'Departments' },
  { id: 'loc-nyc',        label: 'New York',          categoryLabel: 'Locations' },
  { id: 'loc-aus',        label: 'Austin',            categoryLabel: 'Locations' },
  { id: 'loc-remote',     label: 'Remote',            categoryLabel: 'Locations' },
  { id: 'loc-chi',        label: 'Chicago',           categoryLabel: 'Locations' },
  { id: 'loc-sf',         label: 'San Francisco',     categoryLabel: 'Locations' },
  { id: 'team-platform',  label: 'Platform',          categoryLabel: 'Teams' },
  { id: 'team-growth',    label: 'Growth',            categoryLabel: 'Teams' },
  { id: 'team-people',    label: 'People Experience', categoryLabel: 'Teams' },
  { id: 'team-revenue',   label: 'Revenue',           categoryLabel: 'Teams' },
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
        startIcon={<IconV2 name="tag-regular" size={16} />}
        endIcon={<IconV2 name="caret-down-solid" size={12} />}
        onClick={() => setOpen(prev => !prev)}
      >
        {value.length > 0 ? `Tags (${value.length})` : 'Tags'}
      </Button>

      {open && (
        <div className="audit-filter-panel audit-tags-panel">
          <AutocompleteMultiple
            id="audit-tags"
            label=""
            placeholder="Add tags..."
            note="Tag people, departments, locations, or teams to filter the audit trail."
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeChangeColumns(onUndo: (change: AuditChange) => void, undoneChanges: Record<string, Date>, isMvp: boolean): any[] {
  return [
    {
      header: 'Attribute',
      cell: (row: AuditChange) => (
        <span className={undoneChanges[row.field] ? 'audit-cell--reverted' : ''}>
          <BodyText size="small">{row.field}</BodyText>
        </span>
      ),
    },
    {
      header: 'Before',
      cell: (row: AuditChange) => (
        <span className={undoneChanges[row.field] ? 'audit-cell--reverted' : ''}>
          <del className="audit-change-before">{row.before}</del>
        </span>
      ),
    },
    {
      header: 'After',
      cell: (row: AuditChange) => (
        <span className={undoneChanges[row.field] ? 'audit-cell--reverted' : ''}>
          <span className="audit-change-after">{row.after}</span>
        </span>
      ),
    },
    {
      headerAriaLabel: 'Actions',
      cell: (row: AuditChange) => {
        const revertedAt = undoneChanges[row.field];
        if (revertedAt) {
          return (
            <div className="audit-row-reverted-pill">
              <Pill muted type={PillType.Neutral}>Reverted · {formatUndoneTime(revertedAt)}</Pill>
            </div>
          );
        }
        if (isMvp) return null;
        return (
          <div className="audit-row-undo-wrap">
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={<IconV2 name="rotate-left-regular" size={12} />}
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onUndo(row); }}
            >
              Undo
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
        icon={<IconV2 name="display-solid" size={18} color="neutral-medium" />}
        size={40}
        variant="muted"
      />
    );
  }

  if (actor.type === 'ask') {
    return (
      <IconTile
        icon={<img src="/assets/images/ask-icon.svg" alt="" width={18} height={18} />}
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
// Audit event card
// ---------------------------------------------------------------------------

function AuditEventCard({
  event,
  isExpanded,
  onToggle,
  isMvp,
}: {
  event: AuditEventData;
  isExpanded: boolean;
  onToggle: () => void;
  isMvp: boolean;
}) {
  const { actor, description, timestamp, details } = event;
  const [undoTarget, setUndoTarget] = useState<AuditChange | null>(null);
  const [undoneChanges, setUndoneChanges] = useState<Record<string, Date>>({});

  const revertedCount = Object.keys(undoneChanges).length;
  const totalCount = details.changes.length;
  const hasAnyReverted = revertedCount > 0;
  const allReverted = revertedCount === totalCount;
  const changeColumns = makeChangeColumns(setUndoTarget, undoneChanges, isMvp);

  return (
    <div className="audit-event-row">
      <div className={`audit-event-card ${isExpanded ? 'audit-event-card--expanded' : ''}`}>
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
            <ActorIcon actor={actor} />
          </div>
          <DescriptionText parts={description} />
          {hasAnyReverted && (
            <Pill muted type={PillType.Neutral}>
              {allReverted ? 'Reverted' : `${revertedCount} Reverted`}
            </Pill>
          )}
          <span className="audit-event-timestamp">
            <BodyText size="small" color="neutral-weak">{timestamp}</BodyText>
          </span>
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="audit-event-details">
            {/* Meta row */}
            <div className="audit-event-meta">
              <BodyText size="small" color="neutral-weak">
                <span className="audit-meta-label">Area</span> {details.area}
              </BodyText>
              <span className="audit-meta-sep">·</span>
              <BodyText size="small" color="neutral-weak">
                <span className="audit-meta-label">IP</span> {details.ipAddress}
              </BodyText>
            </div>

            {/* Fabric Table for field changes */}
            <div className="audit-change-table-wrap">
              <Table
                caption="Field changes"
                columns={changeColumns}
                rows={details.changes}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rowKey={(row: any) => row.field as string}
              />
            </div>
          </div>
        )}
      </div>

      {/* Undo confirmation modal */}
      <StandardModal isOpen={!!undoTarget} onRequestClose={() => setUndoTarget(null)}>
        <StandardModal.Body
          renderHeader={<StandardModal.Header title="Just checking..." />}
          renderFooter={
            <StandardModal.Footer
              actions={[
                <TextButton key="cancel" onClick={() => setUndoTarget(null)}>Cancel</TextButton>,
                <Button key="confirm" variant="contained" color="primary" onClick={() => { setUndoneChanges(prev => ({ ...prev, [undoTarget!.field]: new Date() })); setUndoTarget(null); }}>
                  Undo
                </Button>,
              ]}
            />
          }
        >
          <StandardModal.UpperContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 0 16px', width: '100%' }}>
              <IconTile
                icon={<IconV2 name="rotate-left-regular" color="warning-strong" size={24} />}
                size={56}
                variant="muted"
              />
              <Headline size="small" component="h4" color="neutral-strong">
                Undo this change?
              </Headline>
              <BodyText size="medium" color="neutral-weak">
                {undoTarget && (
                  <>
                    This will revert <strong>{undoTarget.field}</strong> from{' '}
                    <strong>{undoTarget.after}</strong> back to{' '}
                    <strong>{undoTarget.before}</strong>. This can't be undone.
                  </>
                )}
              </BodyText>
            </div>
          </StandardModal.UpperContent>
        </StandardModal.Body>
      </StandardModal>
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const count = type === 'date'
    ? (dateValue ? [dateValue.from, dateValue.to].filter(Boolean).length : 0)
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
                <BodyText size="extra-small" weight="semibold" color="neutral-medium">Quick options</BodyText>
                <div className="audit-filter-quick-buttons">
                  {([
                    { label: '7 days',  days: 7   },
                    { label: '30 days', days: 30  },
                    { label: '90 days', days: 90  },
                    { label: '1 year',  days: 365 },
                  ] as const).map(({ label, days }) => (
                    <Button
                      key={label}
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const to   = new Date();
                        const from = new Date();
                        from.setDate(from.getDate() - days);
                        const fmt = (d: Date) =>
                          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                        onDateChange({ from: fmt(from), to: fmt(to) });
                      }}
                    >
                      {label}
                    </Button>
                  ))}
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
  employee:    ['user'],
  admin:       ['user'],
  manager:     ['user'],
  ask:         ['ask'],
  system:      ['system'],
  remote:      ['integration'],
  gusto:       ['integration'],
  greenhouse:  ['integration'],
  indeed:      ['integration'],
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
  const { activeVersion } = useViewBar();
  const isMvp = activeVersion === 'mvp';

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagItem[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);

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
        <FilterDropdown label="Actions" icon="bolt"          type="checkbox" options={ACTIONS} selectedIds={selectedActions} onSelectionChange={setSelectedActions} />
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

        {applyFilters(AUDIT_GROUPS, dateRange, selectedActors, selectedActions, selectedAreas, selectedTags).map(group => (
          <div key={group.key} className="audit-timeline-group">
            <DateSeparator label={group.label} />
            {group.events.map(event => (
              <AuditEventCard
                key={event.id}
                event={event}
                isExpanded={expandedIds.has(event.id)}
                onToggle={() => toggleExpand(event.id)}
                isMvp={isMvp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
