import { useState } from 'react';
import {
  IconV2,
  Headline,
  TextButton,
  Section,
  BodyText,
  Checkbox,
  Dropdown,
  Pill,
  PillType,
  StyledBox,
} from '@bamboohr/fabric';

interface TrainingItem {
  id: number;
  name: string;
  date: string | null;
  assignee: string | null;
  isOverdue: boolean;
  isRequired: boolean;
  files: { name: string; type: string }[];
}

interface CompletedItem {
  id: number;
  name: string;
  completedDate: string;
  files: { name: string; type: string }[];
}

const upcomingItems: TrainingItem[] = [
  {
    id: 1,
    name: 'Office Security',
    date: 'May 11, 2024',
    assignee: null,
    isOverdue: true,
    isRequired: false,
    files: [],
  },
  {
    id: 2,
    name: 'Unlawful Harassment',
    date: 'Aug 05, 2024',
    assignee: null,
    isOverdue: false,
    isRequired: true,
    files: [{ name: 'File name', type: 'File type' }],
  },
  {
    id: 3,
    name: 'Fill out W4',
    date: null,
    assignee: 'Jessica Cordova',
    isOverdue: false,
    isRequired: false,
    files: [],
  },
];

const completedItems: CompletedItem[] = [
  {
    id: 1,
    name: 'Email Phishing',
    completedDate: 'May 11, 2024',
    files: [
      { name: 'File name', type: 'File type' },
      { name: 'File name', type: 'File type' },
      { name: 'File name', type: 'File type' },
    ],
  },
];

function FileCard({ name, type }: { name: string; type: string }) {
  return (
    <StyledBox
      backgroundColor="neutral-extra-extra-weak"
      borderColor="neutral-extra-extra-weak"
      borderStyle="solid"
      borderRadius="small"
      v2
    >
      <div className="training-file-card">
        <TextButton>{name}</TextButton>
        <div className="training-file-type">
          <IconV2 name="circle-regular" size={16} color="neutral-medium" />
          <BodyText size="small" color="neutral-weak">{type}</BodyText>
        </div>
      </div>
    </StyledBox>
  );
}

function TrainingRow({
  item,
  isExpanded,
  onToggle,
}: {
  item: TrainingItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="training-item">
      <button className="training-item-row" onClick={onToggle} aria-expanded={isExpanded}>
        <span className="training-item-checkbox" onClick={e => e.stopPropagation()}>
          <Checkbox value={String(item.id)} checked={false} onChange={() => {}} />
        </span>
        <span className="training-item-name">
          <BodyText size="medium">{item.name}</BodyText>
        </span>
        <span className="training-item-meta">
          {item.assignee && (
            <BodyText size="medium" color="neutral-medium">{item.assignee} – </BodyText>
          )}
          <BodyText size="medium" color={item.isOverdue ? 'warning' : 'neutral-medium'}>
            {item.date ?? 'No due date'}
          </BodyText>
        </span>
        <span className="training-item-caret">
          <IconV2
            name={isExpanded ? 'chevron-down-solid' : 'chevron-right-solid'}
            size={12}
            color="neutral-medium"
          />
        </span>
      </button>

      {isExpanded && (
        <div className="training-item-expanded">
          {item.isRequired && (
            <div className="training-required-notice">
              <IconV2 name="asterisk-solid" size={12} color="primary-strong" />
              <BodyText size="small" color="neutral-medium">Training is required</BodyText>
            </div>
          )}
          {item.files.length > 0 && (
            <div className="training-files-row">
              {item.files.map((file, i) => (
                <FileCard key={i} name={file.name} type={file.type} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CompletedRow({
  item,
  isExpanded,
  onToggle,
}: {
  item: CompletedItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="training-item">
      <button className="training-item-row" onClick={onToggle} aria-expanded={isExpanded}>
        <span className="training-item-checkbox" onClick={e => e.stopPropagation()}>
          <Checkbox value={String(item.id)} checked={true} onChange={() => {}} />
        </span>
        <span className="training-item-name">
          <BodyText size="medium">{item.name}</BodyText>
        </span>
        <span className="training-item-meta">
          <BodyText size="medium" color="neutral-medium">Completed {item.completedDate}</BodyText>
        </span>
        <span className="training-item-caret">
          <IconV2
            name={isExpanded ? 'chevron-down-solid' : 'chevron-right-solid'}
            size={12}
            color="neutral-medium"
          />
        </span>
      </button>

      {isExpanded && item.files.length > 0 && (
        <div className="training-item-expanded">
          <div className="training-files-grid">
            {item.files.map((file, i) => (
              <FileCard key={i} name={file.name} type={file.type} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TrainingTabContent() {
  const [expandedUpcoming, setExpandedUpcoming] = useState<Set<number>>(new Set([2]));
  const [expandedCompleted, setExpandedCompleted] = useState<Set<number>>(new Set([1]));

  const toggleUpcoming = (id: number) => {
    setExpandedUpcoming(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompleted = (id: number) => {
    setExpandedCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="my-info-sections">

      {/* Page-level section header */}
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="graduation-cap-solid" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Training</Headline>
        </div>
        <TextButton
          startIcon={<IconV2 name="grid-2-plus-solid" size={16} />}
          endIcon={<IconV2 name="caret-down-solid" size={12} />}
        >
          Customize Layout
        </TextButton>
      </div>

      {/* Upcoming Training */}
      <Section>
        <Section.Header title="Upcoming Training" />
        <div className="training-section-body">
          <div className="training-chips">
            <Pill muted type={PillType.Neutral}>Security Training</Pill>
          </div>
          <div className="training-list">
            {upcomingItems.map((item, index) => (
              <div key={item.id} className={index > 0 ? 'training-item-divider' : ''}>
                <TrainingRow
                  item={item}
                  isExpanded={expandedUpcoming.has(item.id)}
                  onToggle={() => toggleUpcoming(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Completed Training */}
      <Section>
        <Section.Header
          title="Completed Training"
          actions={[
            <TextButton
              key="record"
              startIcon={<IconV2 name="circle-plus-regular" size={16} />}
            >
              Record a Training
            </TextButton>,
            <Dropdown
              key="category"
              ButtonProps={{ variant: 'outlined', size: 'small' }}
              items={[
                { text: 'All Categories', value: 'all' },
                { text: 'Security Training', value: 'security' },
                { text: 'Compliance', value: 'compliance' },
              ]}
              showCaret
            >
              Category
            </Dropdown>,
            <Dropdown
              key="year"
              ButtonProps={{ variant: 'outlined', size: 'small' }}
              items={[
                { text: '2024', value: '2024' },
                { text: '2023', value: '2023' },
                { text: '2022', value: '2022' },
              ]}
              showCaret
            >
              Year
            </Dropdown>,
          ]}
        />
        <div className="training-section-body">
          <div className="training-list">
            {completedItems.map((item, index) => (
              <div key={item.id} className={index > 0 ? 'training-item-divider' : ''}>
                <CompletedRow
                  item={item}
                  isExpanded={expandedCompleted.has(item.id)}
                  onToggle={() => toggleCompleted(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

    </div>
  );
}

export default TrainingTabContent;
