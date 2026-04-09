import { useState, useCallback } from 'react';
import {
  IconV2,
  Headline,
  BodyText,
  Button,
  IconButton,
  Section,
  TextButton,
  Dropdown,
  Avatar,
  InlineMessage,
} from '@bamboohr/fabric';
import { currentEmployee } from '../../data/currentEmployee';

// ─── Types ────────────────────────────────────────────────────────

interface TimeEntry {
  start: string;
  end: string | null;
  duration: string;
  label?: string;
  variance?: string;
  varianceType?: 'positive' | 'negative';
  endTimeWarning?: boolean;
}

interface DayAnnotation {
  text: string;
  icon: string;
}

interface DayData {
  id: string;
  dayName: string;
  dateLabel: string;
  totalHours: string;
  timeRange?: string;
  annotations?: DayAnnotation[];
  entries?: TimeEntry[];
  isToday?: boolean;
  isDisabled?: boolean;
  isPrevPeriod?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const noop = () => {};

// ─── Mock Data ────────────────────────────────────────────────────

const satEntries: TimeEntry[] = [
  { start: '8:01 AM', end: '10:45 AM', duration: '2h 44m', label: '{Project}' },
  { start: '10:45 AM', end: '11:04 AM', duration: '0h 19m', variance: '+4m', varianceType: 'positive', label: '(break name)' },
  { start: '11:04 AM', end: '12:30 PM', duration: '0h 26m', label: '{Project}' },
  { start: '12:31 AM', end: '12:59 PM', duration: '0h 28m', variance: '-2m', varianceType: 'negative', endTimeWarning: true, label: '(break name)' },
  { start: '12:59 PM', end: '2:25 PM', duration: '1h 26m', label: '{Project}' },
  { start: '2:25 PM', end: '2:40 PM', duration: '0h 15m', variance: '-5m', varianceType: 'negative', label: '(break name)' },
];

const sunEntries: TimeEntry[] = [
  { start: '8:58 AM', end: null, duration: '5h 31m' },
];

const timesheetDays: DayData[] = [
  {
    id: 'thu-aug24', dayName: 'Thu', dateLabel: 'Aug 24', totalHours: '8h 58m',
    timeRange: '9:02 AM – 4:59 PM', isPrevPeriod: true, entries: [],
  },
  {
    id: 'fri-aug25', dayName: 'Fri', dateLabel: 'Aug 25', totalHours: '8h 03m',
    timeRange: '6:02 AM – 2:05 PM', isPrevPeriod: true, entries: [],
    annotations: [{ text: '3h 58m Early Mornings', icon: 'clock-regular' }],
  },
  {
    id: 'sat-aug17', dayName: 'Sat', dateLabel: 'Aug 17', totalHours: '8h 11m',
    timeRange: '8:21 AM – 5:00 PM', isToday: true,
    annotations: [{ text: '8h 11m Weekends', icon: 'umbrella-beach-regular' }],
    entries: satEntries,
  },
  {
    id: 'sun-aug18', dayName: 'Sun', dateLabel: 'Aug 18', totalHours: '5h 31m',
    timeRange: '8:58 AM – Now',
    annotations: [{ text: '5h 31m Weekends', icon: 'umbrella-beach-regular' }],
    entries: sunEntries,
  },
  { id: 'mon-aug19', dayName: 'Mon', dateLabel: 'Aug 19', totalHours: '0h 0m' },
  { id: 'tue-aug20', dayName: 'Tue', dateLabel: 'Aug 20', totalHours: '0h 0m' },
  {
    id: 'wed-aug21', dayName: 'Wed', dateLabel: 'Aug 21', totalHours: '0h 0m',
    annotations: [{ text: 'Holiday', icon: 'gift-solid' }],
  },
  { id: 'sun-aug24', dayName: 'Sun', dateLabel: 'Aug 24', totalHours: '0h 0m' },
  { id: 'mon-post', dayName: 'Mon', dateLabel: 'Aug 24', totalHours: '0h 0m', isDisabled: true },
  { id: 'tue-post', dayName: 'Tue', dateLabel: 'Aug 25', totalHours: '0h 0m', isDisabled: true },
];

// Derived from static data — hoisted to avoid recomputing on every render
const prevDays = timesheetDays.filter(d => d.isPrevPeriod);
const currentDays = timesheetDays.filter(d => !d.isPrevPeriod && !d.isDisabled);
const disabledDays = timesheetDays.filter(d => d.isDisabled);

// ─── Sub-components ───────────────────────────────────────────────

function PeriodDivider({ label }: { label: string }) {
  return (
    <div className="timesheet-period-divider">
      <IconV2 name="calendar-regular" size={12} color="neutral-weak" />
      <BodyText size="extra-small" color="neutral-weak">{label}</BodyText>
    </div>
  );
}

function TimeEntryRow({ entry }: { entry: TimeEntry }) {
  return (
    <div className="timesheet-entry">
      {/* Time columns use spans for min-width column alignment and conditional colors */}
      <span className="timesheet-entry-time">{entry.start}</span>
      <span className="timesheet-entry-sep">→</span>
      <span className={cx(
        'timesheet-entry-time',
        entry.end === null && 'timesheet-entry-time--now',
        entry.endTimeWarning && 'timesheet-entry-time--warning',
      )}>
        {entry.end ?? 'Now'}
      </span>
      <span className="timesheet-entry-sep">›</span>
      <span className="timesheet-entry-duration">
        {entry.duration}
        {entry.variance && (
          <span className={`timesheet-entry-variance--${entry.varianceType}`}>
            {' '}{entry.variance}
          </span>
        )}
      </span>
      {entry.label && (
        <BodyText size="extra-small" color="neutral-medium">on {entry.label}</BodyText>
      )}
    </div>
  );
}

interface DayRowProps {
  day: DayData;
  isExpanded: boolean;
  onToggle: () => void;
}

function DayRow({ day, isExpanded, onToggle }: DayRowProps) {
  const canExpand = !day.isDisabled && !!day.entries?.length;
  const hasNowTime = day.timeRange?.includes('Now');

  return (
    <div className={cx(
      'timesheet-day-row',
      day.isToday && 'timesheet-day-row--today',
      day.isDisabled && 'timesheet-day-row--disabled',
      canExpand && isExpanded && 'timesheet-day-row--expanded',
    )}>
      <div
        className="timesheet-day-row-header"
        onClick={() => canExpand && onToggle()}
        style={{ cursor: canExpand ? 'pointer' : 'default' }}
      >
        <div className={cx('timesheet-day-box', day.isToday && 'timesheet-day-box--today')}>
          {/* Day abbreviation needs text-transform, so BodyText sits inside a wrapper span */}
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <BodyText size="xx-small" weight="semibold" color={day.isToday ? 'neutral-inverted' : 'neutral-medium'}>
              {day.dayName}
            </BodyText>
          </span>
          <BodyText size="extra-small" weight="medium" color={day.isToday ? 'neutral-inverted' : 'neutral-strong'}>
            {day.dateLabel}
          </BodyText>
        </div>

        <div className="timesheet-day-summary">
          <BodyText size="medium" weight="semibold" color="neutral-strong">{day.totalHours}</BodyText>
          {day.timeRange && (
            <div className="timesheet-day-time-range">
              {hasNowTime ? (
                <>
                  <BodyText size="extra-small" color="neutral-medium">
                    {day.timeRange.replace('Now', '')}
                  </BodyText>
                  <BodyText size="extra-small" color="primary">Now</BodyText>
                </>
              ) : (
                <BodyText size="extra-small" color="neutral-medium">{day.timeRange}</BodyText>
              )}
            </div>
          )}
          {day.annotations?.map((ann, i) => (
            <div key={i} className="timesheet-day-annotation">
              <IconV2 name={ann.icon} size={12} color="neutral-weak" />
              <BodyText size="extra-small" color="neutral-medium">{ann.text}</BodyText>
            </div>
          ))}
        </div>

        {canExpand && (
          <div className="timesheet-expand-btn">
            <IconButton
              icon={<IconV2
                name={isExpanded ? 'angles-up-regular' : 'angles-down-regular'}
                size={14}
              />}
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              aria-label={isExpanded ? 'Collapse time entries' : 'Expand time entries'}
              size="small"
              color="secondary"
            />
          </div>
        )}
      </div>

      {canExpand && isExpanded && (
        <div className="timesheet-entries">
          {day.entries!.map((entry, i) => (
            <TimeEntryRow key={i} entry={entry} />
          ))}
          {day.isToday && (
            <TextButton startIcon={<IconV2 name="plus-solid" size={12} />}>
              Add Time Entry
            </TextButton>
          )}
        </div>
      )}
    </div>
  );
}

function PayPeriodSummary() {
  return (
    <div className="timesheet-summary">
      <div className="timesheet-summary-header">
        <Avatar src={currentEmployee.avatar} alt={currentEmployee.preferredName} size={48} />
        <BodyText size="small" color="neutral-medium">Previous Pay Period</BodyText>
      </div>

      <div className="timesheet-summary-total">
        <Headline size="medium" color="neutral-strong">80h 23m</Headline>
        <BodyText size="extra-small" color="neutral-weak">Aug 24 – 30</BodyText>
      </div>

      <div className="timesheet-summary-divider" />

      <div className="timesheet-summary-section">
        <BodyText size="small" weight="semibold" color="neutral-strong">Paid Hours</BodyText>
        <div className="timesheet-summary-rows">
          <div className="timesheet-summary-row">
            <BodyText size="small" weight="semibold">63h 30m</BodyText>
            <BodyText size="small" color="neutral-medium">REG</BodyText>
          </div>
          <div className="timesheet-summary-row">
            <BodyText size="small" weight="semibold">11h 45m</BodyText>
            <BodyText size="small" color="neutral-medium">(Shift Diff)</BodyText>
          </div>
          <div className="timesheet-summary-row">
            <BodyText size="small" weight="semibold">2h 31m</BodyText>
            <BodyText size="small" color="neutral-medium">(Holiday)</BodyText>
          </div>
          {/* Warning row: wrapper spans propagate warning color into BodyText */}
          <div className="timesheet-summary-row timesheet-summary-row--warning">
            <BodyText size="small" weight="semibold">12h 0m</BodyText>
            <BodyText size="small">Overtime (2x)</BodyText>
          </div>
          <div className="timesheet-summary-description">
            <BodyText size="extra-small" color="neutral-weak">
              (Project with a long name » Task with long name) &#123;Shift differentials&#125;
            </BodyText>
          </div>
        </div>
      </div>

      <div className="timesheet-summary-divider" />

      <div className="timesheet-summary-section">
        <BodyText size="small" weight="semibold" color="neutral-strong">Meal &amp; Rest Breaks</BodyText>
        <div className="timesheet-summary-rows">
          <div className="timesheet-summary-row">
            <BodyText size="small" weight="semibold">1h 30m</BodyText>
            <BodyText size="small" color="neutral-medium">Paid</BodyText>
          </div>
          <div className="timesheet-summary-row">
            <BodyText size="small" weight="semibold">3h 05m</BodyText>
            <BodyText size="small" color="neutral-medium">Unpaid</BodyText>
          </div>
        </div>
      </div>

      <div className="timesheet-summary-divider" />

      <div className="timesheet-summary-approved-section">
        <InlineMessage
          status="success"
          title="Approved"
          description="Approved by Mikey Warner on Sep 30, 2025"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────

export function TimesheetTabContent() {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['sat-aug17']));

  const toggleDay = useCallback((id: string) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="my-info-sections">

      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="clock-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Timesheet</Headline>
        </div>
        <div className="timesheet-header-actions">
          <Dropdown
            ButtonProps={{ variant: 'outlined', color: 'secondary', size: 'small' }}
            items={[
              { text: 'Current Pay Period', value: 'current' },
              { text: 'Previous Pay Period', value: 'previous' },
            ]}
            showCaret
          >
            Previous Pay Period
          </Dropdown>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<IconV2 name="clock-rotate-left-regular" size={14} />}
          >
            History
          </Button>
          <IconButton
            icon={<IconV2 name="arrow-down-to-bracket-regular" size={16} />}
            aria-label="Download timesheet"
            size="small"
            color="secondary"
          />
        </div>
      </div>

      <div className="timesheet-layout">
        <div className="timesheet-main">
          <div className="timesheet-timeline-card">

            <div className="timesheet-period-label">
              <IconV2 name="calendar-days-solid" size={14} color="primary-strong" />
              <BodyText size="small" weight="semibold" color="primary">Aug 17 – Aug 31</BodyText>
            </div>

            {prevDays.map(day => (
              <DayRow key={day.id} day={day} isExpanded={expandedDays.has(day.id)} onToggle={() => toggleDay(day.id)} />
            ))}

            <PeriodDivider label="Pay period begins" />

            {currentDays.map(day => (
              <DayRow key={day.id} day={day} isExpanded={expandedDays.has(day.id)} onToggle={() => toggleDay(day.id)} />
            ))}

            <PeriodDivider label="Pay period ends" />

            {disabledDays.map(day => (
              <DayRow key={day.id} day={day} isExpanded={false} onToggle={noop} />
            ))}

          </div>
        </div>

        <div className="timesheet-right">
          <Section>
            <PayPeriodSummary />
          </Section>
        </div>
      </div>

    </div>
  );
}

export default TimesheetTabContent;
