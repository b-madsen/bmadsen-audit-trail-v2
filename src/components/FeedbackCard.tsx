import { Avatar, IconV2, BodyText, Headline } from '@bamboohr/fabric';

interface FeedbackCardProps {
  authorName: string;
  authorTitle: string;
  date: string;
  iconName?: string;
  avatar?: string;
  strengths: {
    question: string;
    answer: string;
  };
  improvements: {
    question: string;
    answer: string;
  };
}

export function FeedbackCard({
  authorName,
  authorTitle,
  date,
  iconName = 'face-smile-solid',
  avatar,
  strengths,
  improvements,
}: FeedbackCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Author Badge */}
      <div className="flex items-center gap-4">
        {/* Icon or Avatar */}
        {avatar ? (
          <Avatar src={avatar} alt={authorName} size={48} />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] flex items-center justify-center">
            <IconV2 name={iconName as any} size={24} color="primary-strong" />
          </div>
        )}

        {/* Name and Title */}
        <div className="flex flex-col">
          <Headline size="extra-small">
            {authorName}
          </Headline>
          <BodyText size="medium" color="neutral-medium">
            {authorTitle}
          </BodyText>
          <BodyText size="small" color="neutral-medium">
            {date}
          </BodyText>
        </div>
      </div>

      {/* Strengths Section */}
      <div className="pl-16">
        <BodyText size="medium" weight="semibold">
          {strengths.question}
        </BodyText>
        <BodyText size="small">
          {strengths.answer}
        </BodyText>
      </div>

      {/* Improvements Section */}
      <div className="pl-16">
        <BodyText size="medium" weight="semibold">
          {improvements.question}
        </BodyText>
        <BodyText size="small">
          {improvements.answer}
        </BodyText>
      </div>
    </div>
  );
}

export default FeedbackCard;
