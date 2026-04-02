import { IconV2, BodyText, Divider } from '@bamboohr/fabric';
import { RatingCircles } from './RatingCircles';

interface Question {
  question: string;
  answer: string;
}

interface RatingQuestion {
  question: string;
  rating: number;
  answer: string;
}

interface AssessmentBlockProps {
  selfAssessment: {
    completedBy: string;
    completedDate: string;
    questions: Question[];
  };
  managerAssessment: {
    completedBy: string;
    completedDate: string;
    hiddenQuestions: RatingQuestion[];
    visibleQuestions: Question[];
  };
}

export function AssessmentBlock({ selfAssessment, managerAssessment }: AssessmentBlockProps) {
  return (
    <div className="bg-[var(--fabric-surface-color-neutral-white)] rounded-lg border border-[var(--fabric-border-color-neutral-extra-weak)] p-8 relative">
      {/* Two Column Layout */}
      <div className="flex gap-8">
        {/* Left Column: Self Assessment */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            <IconV2 name="compass-solid" size={20} color="primary-strong" />
            <div className="flex-1">
              <BodyText size="large" weight="semibold" color="primary">
                Self Assessment
              </BodyText>
              <BodyText size="small">
                Completed: {selfAssessment.completedDate} by {selfAssessment.completedBy}
              </BodyText>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {selfAssessment.questions.map((q, index) => (
              <div key={index}>
                <BodyText size="medium" weight="semibold">
                  {q.question}
                </BodyText>
                <BodyText size="small">
                  {q.answer}
                </BodyText>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-[var(--fabric-border-color-neutral-weak)] shrink-0" />

        {/* Right Column: Manager Assessment */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-6">
            <IconV2 name="compass-solid" size={20} color="primary-strong" />
            <div className="flex-1">
              <BodyText size="large" weight="semibold" color="primary">
                Manager Assessment
              </BodyText>
              <BodyText size="small">
                Completed: {managerAssessment.completedDate} by {managerAssessment.completedBy}
              </BodyText>
            </div>
          </div>

          {/* Hidden Section */}
          <div className="mb-6">
            {/* Visibility Indicator */}
            <div className="flex items-start gap-2 mb-4">
              <IconV2 name="eye-slash-solid" size={16} color="neutral-strong" />
              <BodyText size="small" color="neutral-medium">
                Jess will <span className="font-bold">NOT</span> be able to see the following:
              </BodyText>
            </div>

            <Divider />

            {/* Hidden Questions */}
            <div className="space-y-6 mt-4">
              {managerAssessment.hiddenQuestions.map((q, index) => (
                <div key={index}>
                  <BodyText size="medium" weight="semibold">
                    {q.question}
                  </BodyText>
                  <RatingCircles selectedRating={q.rating} className="my-2" />
                  <BodyText size="small">
                    {q.answer}
                  </BodyText>
                </div>
              ))}
            </div>
          </div>

          {/* Visible Section */}
          <div>
            <Divider />

            {/* Visibility Indicator */}
            <div className="flex items-start gap-2 my-4">
              <IconV2 name="eye-solid" size={16} color="neutral-strong" />
              <BodyText size="small" color="neutral-medium">
                Jess <span className="font-bold">will</span> be able to see the following:
              </BodyText>
            </div>

            {/* Visible Questions */}
            <div className="space-y-6">
              {managerAssessment.visibleQuestions.map((q, index) => (
                <div key={index}>
                  <BodyText size="medium" weight="semibold">
                    {q.question}
                  </BodyText>
                  <BodyText size="small">
                    {q.answer}
                  </BodyText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentBlock;
