import { useState } from 'react';
import {
  Section,
  TextButton,
  IconV2,
  BodyText,
  SelectField,
} from '@bamboohr/fabric';
import { RatingCircles } from '../../components/RatingCircles';

interface AssessmentsTabContentProps {
  employeeName: string;
}

const selfAssessmentData = {
  completedBy: 'Jess Cordova',
  completedDate: 'Dec 18 at 12:43 PM',
  questions: [
    {
      question: 'How well does Initech recognize my value?',
      answer: 'I feel I am highly valued.',
    },
    {
      question: 'What would have the greatest impact on my ability to do my best work more often?',
      answer: 'Nothing, I have all I need.',
    },
    {
      question: 'What are some things I do well?',
      answer: '"Quantum mechanics" is the descriptor of the behavior of matter and light in all its details and, in particular, of the happenings on an atomic scale.',
    },
    {
      question: 'How could I improve?',
      answer: 'We know how large objects will act, but things on a small scale just do not act that way.',
    },
  ],
};

const managerAssessmentData = {
  completedBy: 'Lucy Samuels',
  completedDate: 'Dec 21 at 9:00 AM',
  employeeName: 'Jess',
  hiddenQuestions: [
    {
      question: 'If Jess got a job offer elsewhere, I would...',
      rating: 3,
      answer: 'Convince Jess to stay. Jess would be difficult to replace.',
    },
    {
      question: 'How engaged is Jess at work?',
      rating: 3,
      answer: 'High engagement and great attitude.',
    },
  ],
  visibleQuestions: [
    {
      question: 'What are some things Jess does well?',
      answer: '"Quantum mechanics" is the descriptor of the behavior of matter and light in all its details and, in particular, of the happenings on an atomic scale.',
      isPrimary: false,
    },
    {
      question: 'How could Jess improve?',
      answer: 'We know how large objects will act, but things on a small scale just do not act that way.',
      isPrimary: true,
    },
  ],
};

export function AssessmentsTabContent({ employeeName }: AssessmentsTabContentProps) {
  void employeeName;
  const [dateRange, setDateRange] = useState('jan-apr-2024');

  return (
    <div className="assessments-content">

      {/* Filter bar */}
      <div className="assessments-filter-bar">
        <div className="assessments-filter-left">
          <SelectField
            label="Assessments"
            labelPlacement="inline"
            variant="single"
            value={dateRange}
            onChange={(e: any) => setDateRange(e.target.value)}
          >
            <option value="jan-apr-2024">January 21, 2024 – Apr 20, 2024</option>
            <option value="last-6-months">Last 6 months</option>
            <option value="last-12-months">Last 12 months</option>
            <option value="all-time">All time</option>
          </SelectField>
        </div>
        <TextButton startIcon={<IconV2 name="temperature-half-regular" size={16} />}>
          Start Assessment
        </TextButton>
      </div>

      {/* Assessment block */}
      <Section>
        <div className="assessments-columns">

          {/* Left: Self Assessment */}
          <div className="assessments-col">
            <div className="assessments-col-header">
              <IconV2 name="compass-solid" size={20} color="primary-strong" />
              <div className="assessments-col-header-text">
                <BodyText size="medium" weight="semibold" color="primary">Self Assessment</BodyText>
                <BodyText size="small" color="neutral-weak">
                  Completed: {selfAssessmentData.completedDate} by {selfAssessmentData.completedBy}
                </BodyText>
              </div>
            </div>

            <div className="assessments-qa-list">
              {selfAssessmentData.questions.map((q, i) => (
                <div key={i} className="assessments-qa-item">
                  <BodyText size="medium" weight="semibold">{q.question}</BodyText>
                  <BodyText size="small" color="neutral-strong">{q.answer}</BodyText>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="assessments-col-divider" />

          {/* Right: Manager Assessment */}
          <div className="assessments-col">
            <div className="assessments-col-header">
              <IconV2 name="compass-solid" size={20} color="primary-strong" />
              <div className="assessments-col-header-text">
                <BodyText size="medium" weight="semibold" color="primary">Manager Assessment</BodyText>
                <BodyText size="small" color="neutral-weak">
                  Completed: {managerAssessmentData.completedDate} by {managerAssessmentData.completedBy}
                </BodyText>
              </div>
            </div>

            {/* Hidden section */}
            <div className="assessments-visibility-notice">
              <IconV2 name="eye-slash-regular" size={16} color="neutral-strong" />
              <BodyText size="small" color="neutral-weak">
                {managerAssessmentData.employeeName} will <strong>NOT</strong> be able to see the following:
              </BodyText>
            </div>
            <div className="assessments-section-divider" />

            <div className="assessments-qa-list">
              {managerAssessmentData.hiddenQuestions.map((q, i) => (
                <div key={i} className="assessments-qa-item">
                  <BodyText size="medium" weight="semibold">{q.question}</BodyText>
                  <RatingCircles selectedRating={q.rating} />
                  <BodyText size="small" color="neutral-strong">{q.answer}</BodyText>
                </div>
              ))}
            </div>

            {/* Visible section */}
            <div className="assessments-section-divider assessments-section-divider--spaced" />
            <div className="assessments-visibility-notice">
              <IconV2 name="eye-regular" size={16} color="neutral-strong" />
              <BodyText size="small" color="neutral-weak">
                {managerAssessmentData.employeeName} <strong>will</strong> be able to see the following:
              </BodyText>
            </div>

            <div className="assessments-qa-list">
              {managerAssessmentData.visibleQuestions.map((q, i) => (
                <div key={i} className="assessments-qa-item">
                  <BodyText size="medium" weight="semibold">{q.question}</BodyText>
                  <BodyText size="small" color={q.isPrimary ? 'primary' : 'neutral-strong'}>
                    {q.answer}
                  </BodyText>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

    </div>
  );
}

export default AssessmentsTabContent;
