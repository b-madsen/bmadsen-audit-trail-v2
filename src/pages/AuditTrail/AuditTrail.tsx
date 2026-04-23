import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@bamboohr/fabric';
import './AuditTrail.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActorType = 'user' | 'system' | 'ask' | 'integration';

interface AuditActor {
  type: ActorType;
  name: string;
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
  events: AuditEventData[];
}

// ---------------------------------------------------------------------------
// Mock data — description starts with actor name
// ---------------------------------------------------------------------------

const AUDIT_GROUPS: AuditGroup[] = [
  {
    key: 'today',
    label: 'Today',
    events: [
      {
        id: 'evt-1',
        actor: { type: 'user', name: 'Sarah Chen' },
        description: [
          { text: 'Sarah Chen', link: true },
          { text: ' deleted ' },
          { text: 'Emergency Contact Phone', link: true },
          { text: ' from ' },
          { text: "Blake Thompson's", link: true },
          { text: ' profile' },
        ],
        timestamp: '9:22 AM',
        details: {
          ipAddress: '192.168.1.104',
          area: 'Employee Records',
          changes: [
            { field: 'Emergency Contact Phone', before: '(801) 555-0192', after: '—' },
          ],
        },
      },
      {
        id: 'evt-2',
        actor: { type: 'user', name: 'Marcus Rivera' },
        description: [
          { text: 'Marcus Rivera', link: true },
          { text: ' updated ' },
          { text: 'Annual Salary', link: true },
          { text: ' for ' },
          { text: 'Priya Patel', link: true },
        ],
        timestamp: '8:47 AM',
        details: {
          ipAddress: '10.0.1.55',
          area: 'Payroll',
          changes: [
            { field: 'Annual Salary', before: '$82,000', after: '$91,000' },
          ],
        },
      },
      {
        id: 'evt-3',
        actor: { type: 'system', name: 'BambooHR System' },
        description: [
          { text: 'BambooHR System' },
          { text: ' updated ' },
          { text: 'Time Off balance', link: true },
          { text: ' for 3 employees' },
        ],
        timestamp: '12:01 AM',
        details: {
          ipAddress: '—',
          area: 'Time Off',
          changes: [
            { field: 'Vacation Balance', before: '10.5 days', after: '11.0 days' },
            { field: 'Sick Balance', before: '5.0 days', after: '5.5 days' },
          ],
        },
      },
    ],
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    events: [
      {
        id: 'evt-4',
        actor: { type: 'user', name: 'Derek Olson' },
        description: [
          { text: 'Derek Olson', link: true },
          { text: ' approved ' },
          { text: 'time off request', link: true },
          { text: ' for ' },
          { text: 'Lena Brooks', link: true },
        ],
        timestamp: '4:30 PM',
        details: {
          ipAddress: '192.168.2.20',
          area: 'Time Off',
          changes: [
            { field: 'Request Status', before: 'Pending', after: 'Approved' },
          ],
        },
      },
      {
        id: 'evt-5',
        actor: { type: 'ask', name: 'Ask' },
        description: [
          { text: 'BambooHR Ask' },
          { text: ' edited ' },
          { text: 'Job Title', link: true },
          { text: ' for ' },
          { text: 'Marcus Rivera', link: true },
        ],
        timestamp: '2:15 PM',
        details: {
          ipAddress: '—',
          area: 'Employee Records',
          changes: [
            { field: 'Job Title', before: 'Senior Engineer', after: 'Staff Engineer' },
          ],
        },
      },
      {
        id: 'evt-6',
        actor: { type: 'integration', name: 'Integration' },
        description: [
          { text: 'Integration' },
          { text: ' created a new employee record for ' },
          { text: 'Jamie Russo', link: true },
        ],
        timestamp: '10:08 AM',
        details: {
          ipAddress: '—',
          area: 'Employee Records',
          changes: [
            { field: 'Employee Status', before: '—', after: 'Active' },
            { field: 'Start Date', before: '—', after: 'Apr 22, 2026' },
          ],
        },
      },
    ],
  },
  {
    key: 'apr-20',
    label: 'Apr 20',
    events: [
      {
        id: 'evt-7',
        actor: { type: 'user', name: 'Sarah Chen' },
        description: [
          { text: 'Sarah Chen', link: true },
          { text: ' exported ' },
          { text: 'Payroll Report — Q1 2026', link: true },
        ],
        timestamp: '5:01 PM',
        details: {
          ipAddress: '192.168.1.104',
          area: 'Payroll',
          changes: [
            { field: 'Export', before: '—', after: 'Downloaded' },
          ],
        },
      },
      {
        id: 'evt-8',
        actor: { type: 'system', name: 'BambooHR System' },
        description: [
          { text: 'BambooHR System' },
          { text: ' automatically denied ' },
          { text: 'time off request', link: true },
          { text: ' for ' },
          { text: 'Derek Olson', link: true },
        ],
        timestamp: '11:30 AM',
        details: {
          ipAddress: '—',
          area: 'Time Off',
          changes: [
            { field: 'Request Status', before: 'Pending', after: 'Denied' },
          ],
        },
      },
    ],
  },
];

const ACTORS = [
  { id: 'user', label: 'Person' },
  { id: 'ask', label: 'Ask' },
  { id: 'system', label: 'BambooHR System' },
  { id: 'integration', label: 'Integration' },
];

const ACTIONS = [
  { id: 'created', label: 'Created' },
  { id: 'updated', label: 'Updated' },
  { id: 'deleted', label: 'Deleted' },
  { id: 'approved', label: 'Approved' },
  { id: 'denied', label: 'Denied' },
  { id: 'exported', label: 'Exported' },
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
// Change table columns (Fabric Table)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeColumns: any[] = [
  {
    header: 'Field',
    cell: (row: AuditChange) => (
      <BodyText size="small">{row.field}</BodyText>
    ),
  },
  {
    header: 'Before',
    cell: (row: AuditChange) => (
      <del className="audit-change-before">{row.before}</del>
    ),
  },
  {
    header: 'After',
    cell: (row: AuditChange) => (
      <span className="audit-change-after">{row.after}</span>
    ),
  },
];

// ---------------------------------------------------------------------------
// Actor icon — Avatar for people, IconTile for system actors
// ---------------------------------------------------------------------------

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function ActorIcon({ actor }: { actor: AuditActor }) {
  if (actor.type === 'user') {
    return (
      <Avatar size={40} alt={actor.name}>
        {getInitials(actor.name)}
      </Avatar>
    );
  }

  const iconConfig: Record<string, { name: string; color: string }> = {
    system:      { name: 'leaf-solid',      color: 'primary-strong' },
    ask:         { name: 'sparkles-solid',  color: 'discovery-strong' },
    integration: { name: 'plug-solid',      color: 'info-strong' },
  };

  const cfg = iconConfig[actor.type] ?? iconConfig.system;

  return (
    <IconTile
      icon={
        <IconV2
          name={cfg.name as any}
          size={16}
          color={cfg.color as any}
        />
      }
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
      <div className="audit-actor-slot audit-date-sep-dot" />
      <div className="audit-date-sep-content">
        <Pill muted type={PillType.Neutral}>{label}</Pill>
        <div className="audit-date-sep-rule" />
      </div>
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
}: {
  event: AuditEventData;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { actor, description, timestamp, details } = event;

  return (
    <div className="audit-event-row">
      <div className="audit-actor-slot audit-event-dot" />

      <div className={`audit-event-card ${isExpanded ? 'audit-event-card--expanded' : ''}`}>
        {/* Header — always visible */}
        <div className="audit-event-header" onClick={onToggle} role="button" aria-expanded={isExpanded}>
          <div className="audit-event-actor-icon">
            <ActorIcon actor={actor} />
          </div>
          <DescriptionText parts={description} />
          <span className="audit-event-timestamp">
            <BodyText size="small" color="neutral-weak">{timestamp}</BodyText>
          </span>
          <span className={`audit-event-toggle ${isExpanded ? 'audit-event-toggle--expanded' : ''}`}>
            <IconButton
              icon="chevron-down-regular"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              noBoundingBox
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onToggle(); }}
            />
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

            {/* Undo action */}
            <div className="audit-event-actions">
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<IconV2 name="rotate-left-regular" size={12} />}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                Undo change
              </Button>
            </div>
          </div>
        )}
      </div>
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
        size="small"
        startIcon={<IconV2 name={`${icon}-regular` as any} size={16} />}
        endIcon={<IconV2 name="chevron-down-solid" size={10} />}
        onClick={() => setOpen(prev => !prev)}
      >
        {isActive ? `${label} (${count})` : label}
      </Button>

      {open && (
        <div className="audit-filter-panel">
          {type === 'date' && dateValue && onDateChange && (
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
// AuditTrail page
// ---------------------------------------------------------------------------

export default function AuditTrail() {
  const navigate = useNavigate();

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<DateRange>({ from: '', to: '' });
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

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
      />

      {/* Filter bar */}
      <div className="audit-trail-filter-bar">
        <Button
          color="ai"
          variant="outlined"
          size="small"
          startIcon={<IconV2 name="sparkles-solid" size={16} />}
        >
          Filter with Ask
        </Button>

        <FilterDropdown label="Date"    icon="calendar-days" type="date"     dateValue={dateRange}         onDateChange={setDateRange} />
        <FilterDropdown label="Actors"  icon="user"          type="checkbox" options={ACTORS}  selectedIds={selectedActors}  onSelectionChange={setSelectedActors} />
        <FilterDropdown label="Actions" icon="bolt"          type="checkbox" options={ACTIONS} selectedIds={selectedActions} onSelectionChange={setSelectedActions} />
        <FilterDropdown label="Areas"   icon="layer-group"   type="checkbox" options={AREAS}   selectedIds={selectedAreas}   onSelectionChange={setSelectedAreas} />

        <div className="audit-trail-filter-bar-spacer" />

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<IconV2 name="arrow-up-from-bracket-regular" size={16} />}
        >
          Export
        </Button>
      </div>

      {/* Timeline */}
      <div className="audit-timeline">
        <div className="audit-timeline-line" />

        {AUDIT_GROUPS.map(group => (
          <div key={group.key} className="audit-timeline-group">
            <DateSeparator label={group.label} />
            {group.events.map(event => (
              <AuditEventCard
                key={event.id}
                event={event}
                isExpanded={expandedIds.has(event.id)}
                onToggle={() => toggleExpand(event.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
