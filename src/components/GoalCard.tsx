import { Avatar, BodyText, Headline, ProgressBar } from '@bamboohr/fabric';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface GoalCardProps {
  goalText: string;
  progress: number;
  dueDate: string;
  collaborators: Collaborator[];
}

export function GoalCard({ goalText, progress, dueDate, collaborators }: GoalCardProps) {
  const percentage = Math.min(Math.max(progress, 0), 100);
  const displayedCollaborators = collaborators.slice(0, 2);
  const remainingCount = Math.max(collaborators.length - 2, 0);

  return (
    <div className="bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-extra-weak)] rounded-lg p-6 hover:border-[var(--fabric-border-color-neutral-weak)] transition-colors cursor-pointer">
      {/* Goal Text */}
      <div className="mb-6">
        <BodyText size="medium">{goalText}</BodyText>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        {/* Progress Percentage */}
        <div className="flex items-baseline gap-2 mb-2">
          <Headline size="small" color="primary">
            {percentage}%
          </Headline>
          <BodyText size="medium" color="neutral-medium">
            complete
          </BodyText>
        </div>

        {/* Progress Bar */}
        <ProgressBar current={percentage} total={100} />
      </div>

      {/* Due Date and Collaborators */}
      <div className="flex items-center justify-between">
        {/* Due Date */}
        <BodyText size="extra-small" color="neutral-medium">
          <span className="font-semibold">Due:</span> {dueDate}
        </BodyText>

        {/* Collaborator Avatars */}
        <div className="flex items-center -space-x-2">
          {displayedCollaborators.map((collaborator) => (
            <div key={collaborator.id} className="border-2 border-white rounded-full">
              <Avatar src={collaborator.avatar} alt={collaborator.name} size={32} />
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--fabric-surface-color-neutral-weak)] flex items-center justify-center">
              <BodyText size="extra-small" weight="medium">
                +{remainingCount}
              </BodyText>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
