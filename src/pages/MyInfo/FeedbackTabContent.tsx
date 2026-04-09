import { useState } from 'react';
import {
  Section,
  SelectField,
  TextField,
  Button,
  TextButton,
  IconV2,
  BodyText,
  Avatar,
  StyledBox,
} from '@bamboohr/fabric';

interface FeedbackTabContentProps {
  employeeName: string;
}

const pendingRequests = [
  {
    id: '1',
    personName: 'Theo Hanley',
    personTitle: 'Director of Puppy Sciences',
    personAvatar: 'https://i.pravatar.cc/150?img=12',
    requestDate: 'March 25, 2024',
    emailSentDate: 'Tuesday, May 7, 2024',
    dueDate: 'Wed, May 22, 2024',
    daysRemaining: 14,
  },
];

const receivedFeedback = [
  {
    id: '1',
    authorName: 'Stevie Nordness',
    authorTitle: 'VP of Good Dogs',
    date: 'March 25, 2024',
    questions: [
      {
        question: 'What are some things Jessica does well?',
        answer:
          'Jessica is a really nice person. She does a great job of throwing the ball, giving good scritches, and she knows all of the best treats and toys to buy. She also likes cats, which is good because I love my cat friend.',
      },
      {
        question: 'How could Jessica improve?',
        answer:
          "She doesn't give the longest belly rubs, and I think if she did those for a bit longer, she'd get an A+ from me. Sometimes she washes my fur and I don't love that either.",
      },
    ],
  },
];

export function FeedbackTabContent({ employeeName }: FeedbackTabContentProps) {
  const [dateRange, setDateRange] = useState('last-6-months');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="feedback-content">

      {/* Filter bar */}
      <div className="feedback-filter-bar">
        <div className="feedback-filter-select">
          <SelectField
            label="Date range"
            labelPlacement="inline"
            variant="single"
            value={dateRange}
            onChange={(e: any) => setDateRange(e.target.value)}
          >
            <option value="last-6-months">Last 6 months</option>
            <option value="last-12-months">Last 12 months</option>
            <option value="all-time">All time</option>
          </SelectField>
        </div>
      </div>

      {/* Single section: request form + pending */}
      <Section>
        <div className="feedback-request-section">

          {/* Header row */}
          <div className="feedback-section-header-row">
            <IconV2 name="users-solid" size={20} color="neutral-strong" />
            <BodyText size="medium" weight="semibold">
              Request feedback about {employeeName}
            </BodyText>
            <IconV2 name="circle-question-regular" size={16} color="neutral-weak" />
          </div>

          {/* Description */}
          <BodyText size="small" color="neutral-weak">
            Select some employees who work with {employeeName}
          </BodyText>

          {/* Search + button */}
          <div className="feedback-request-form">
            <div className="feedback-search-field">
              <TextField
                label="Search"
                labelPlacement="hidden"
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
                placeholder="Search names"
              />
            </div>
            <Button variant="outlined" size="small">
              Send Request
            </Button>
          </div>

          {/* Visibility notice */}
          <div className="feedback-visibility-notice">
            <IconV2 name="eye-slash-regular" size={16} color="neutral-strong" />
            <BodyText size="small" color="neutral-weak">
              Just so you know, feedback is hidden from {employeeName}.
            </BodyText>
          </div>

          {/* Pending requests */}
          {pendingRequests.length > 0 && (
            <div className="feedback-pending-list">
              {pendingRequests.map((req) => (
                <StyledBox
                  key={req.id}
                  backgroundColor="neutral-xx-weak"
                  borderRadius="medium"
                  padding="medium"
                >
                  <div className="feedback-pending-card">
                    <div className="feedback-pending-top">
                      <BodyText size="small" color="neutral-weak">
                        Waiting for feedback from...
                      </BodyText>
                      <TextButton
                        startIcon={<IconV2 name="xmark-regular" size={12} />}
                      >
                        Cancel
                      </TextButton>
                    </div>
                    <div className="feedback-pending-person">
                      <Avatar
                        src={req.personAvatar}
                        alt={req.personName}
                        size={48}
                      />
                      <div className="feedback-pending-info">
                        <BodyText size="medium" weight="semibold">
                          {req.personName}
                        </BodyText>
                        <BodyText size="small" color="neutral-weak">
                          {req.personTitle}
                        </BodyText>
                        <BodyText size="small" color="neutral-weak">
                          {req.requestDate}
                        </BodyText>
                      </div>
                    </div>
                    <BodyText size="small" color="neutral-strong">
                      An email requesting {req.personName} to complete feedback was sent {req.emailSentDate}.
                    </BodyText>
                    <BodyText size="small" color="neutral-strong">
                      {req.personName} has until {req.dueDate} ({req.daysRemaining} days) to complete this.
                    </BodyText>
                  </div>
                </StyledBox>
              ))}
            </div>
          )}

        </div>
      </Section>

      {/* Received feedback */}
      {receivedFeedback.map((feedback) => (
        <Section key={feedback.id}>
          <div className="feedback-received-item">
            <div className="feedback-received-icon-box">
              <IconV2 name="face-smile-regular" size={20} color="primary-strong" />
            </div>
            <div className="feedback-received-body">
              <BodyText size="large" weight="semibold">{feedback.authorName}</BodyText>
              <BodyText size="small" color="neutral-weak">{feedback.authorTitle}</BodyText>
              <BodyText size="small" color="neutral-weak">{feedback.date}</BodyText>
              <div className="feedback-qa-list">
                {feedback.questions.map((q, i) => (
                  <div key={i} className="feedback-qa-item">
                    <BodyText size="medium" weight="semibold">{q.question}</BodyText>
                    <BodyText size="small" color="neutral-strong">{q.answer}</BodyText>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ))}

    </div>
  );
}

export default FeedbackTabContent;
