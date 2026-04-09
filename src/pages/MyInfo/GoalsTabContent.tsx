import { useState } from 'react';
import {
  Button,
  SelectField,
  BodyText,
  Headline,
  Avatar,
  StyledBox,
  IconV2,
  ProgressBar,
} from '@bamboohr/fabric';

interface GoalsTabContentProps {
  employeeName: string;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface Goal {
  id: string;
  goalText: string;
  progress: number;
  dueDate: string;
  collaborators: Collaborator[];
}

const COLLABORATORS: Collaborator[] = [
  { id: '1', name: 'Person 1', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Person 2', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Person 3', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Person 4', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Person 5', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Person 6', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Person 7', avatar: 'https://i.pravatar.cc/150?img=7' },
];

const goals: Goal[] = [
  {
    id: '1',
    goalText:
      'I would like to reduce the amount of overtime that employees work. This can increase job satisfaction and ensure employees feel well-rested.',
    progress: 75,
    dueDate: 'Dec 30, 2024',
    collaborators: COLLABORATORS,
  },
  {
    id: '2',
    goalText: "I want to feel like I've really made a difference in the world.",
    progress: 75,
    dueDate: 'Dec 30, 2024',
    collaborators: COLLABORATORS,
  },
  {
    id: '3',
    goalText:
      "This is what a medium-length goal might look like. It's going to be about three lines, like this.",
    progress: 0,
    dueDate: 'Dec 30, 2024',
    collaborators: COLLABORATORS,
  },
  {
    id: '4',
    goalText:
      "I'm curious what a super long gigantic goal would look like. Goal sounds like coal which reminds me of a coal train which can also be super duper long and can t...",
    progress: 25,
    dueDate: 'Dec 30, 2024',
    collaborators: COLLABORATORS,
  },
];

function GoalCard({ goal }: { goal: Goal }) {
  const visibleAvatars = goal.collaborators.slice(0, 2);
  const extraCount = goal.collaborators.length - visibleAvatars.length;

  return (
    <StyledBox
      backgroundColor="neutral-forced-white"
      borderColor="neutral-extra-extra-weak"
      borderStyle="solid"
      borderRadius="small"
      boxShadow="small"
      v2
    >
      <div className="goal-card-inner">
        {/* Goal text */}
        <div className="goal-card-text">
          <BodyText size="medium">{goal.goalText}</BodyText>
        </div>

        {/* Progress percentage + label */}
        <div className="goal-card-progress-label">
          <div className="goal-card-percent">
            <Headline size="extra-small" color="primary">{goal.progress}%</Headline>
          </div>
          <BodyText size="medium" color="neutral-strong">complete</BodyText>
        </div>

        {/* Progress bar */}
        <div className="goal-card-bar">
          <ProgressBar current={goal.progress} total={100} height={4} />
        </div>

        {/* Footer: due date + avatars */}
        <div className="goal-card-footer">
          <BodyText size="small" color="neutral-strong">
            <strong>Due:</strong> {goal.dueDate}
          </BodyText>
          <div className="goal-card-avatars">
            {visibleAvatars.map((person) => (
              <div key={person.id} className="goal-card-avatar-item">
                <Avatar src={person.avatar} alt={person.name} size={32} />
              </div>
            ))}
            {extraCount > 0 && (
              <div className="goal-card-avatar-more">
                <BodyText size="extra-small" color="neutral-strong">+{extraCount}</BodyText>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledBox>
  );
}

export function GoalsTabContent({ employeeName }: GoalsTabContentProps) {
  void employeeName;
  const [statusFilter, setStatusFilter] = useState('in-progress');

  return (
    <div className="goals-content">

      {/* Filter bar */}
      <div className="goals-filter-bar">
        <Button
          variant="outlined"
          startIcon={<IconV2 name="circle-plus-regular" size={16} />}
        >
          New Goal
        </Button>
        <div className="goals-status-filter">
          <SelectField
            label="Status"
            labelPlacement="inline"
            variant="single"
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </SelectField>
        </div>
      </div>

      {/* Goals grid */}
      <div className="goals-grid">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

    </div>
  );
}

export default GoalsTabContent;
