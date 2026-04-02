import { useState, useEffect } from 'react';
import { Gridlet, BodyText, Avatar, Button, InlineMessage, IconV2, TextField } from '@bamboohr/fabric';
import type { Celebration } from '../../../../data/hrManagerHomeTypes';
import { aiGeneratedMessages } from '../../../../data/mockHRManagerData';
import './InsightsCards.css';

interface BirthdayMessageStackCardProps {
  celebrations: Celebration[];
  onAllMessagesSent?: () => void;
}

interface CardState {
  celebration: Celebration;
  message: string;
  isEditing: boolean;
  isRegenerating: boolean;
}

export function BirthdayMessageStackCard({ celebrations, onAllMessagesSent }: BirthdayMessageStackCardProps) {
  // Initialize card states with generated messages
  const [cardStack, setCardStack] = useState<CardState[]>(() =>
    celebrations.map(celebration => ({
      celebration,
      message: aiGeneratedMessages.birthdayMessage(celebration.employee),
      isEditing: false,
      isRegenerating: false,
    }))
  );

  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  // Clear slidedown after delay
  useEffect(() => {
    if (slidedownMessage) {
      const timer = setTimeout(() => {
        setSlidedownMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [slidedownMessage]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const handleEdit = (index: number) => {
    setCardStack(prev => prev.map((card, i) =>
      i === index ? { ...card, isEditing: true } : card
    ));
  };

  const handleSaveEdit = (index: number) => {
    setCardStack(prev => prev.map((card, i) =>
      i === index ? { ...card, isEditing: false } : card
    ));
  };

  const handleCancelEdit = (index: number, originalMessage: string) => {
    setCardStack(prev => prev.map((card, i) =>
      i === index ? { ...card, message: originalMessage, isEditing: false } : card
    ));
  };

  const handleMessageChange = (index: number, newMessage: string) => {
    setCardStack(prev => prev.map((card, i) =>
      i === index ? { ...card, message: newMessage } : card
    ));
  };

  const handleRegenerate = (index: number) => {
    const card = cardStack[index];
    setCardStack(prev => prev.map((c, i) =>
      i === index ? { ...c, isRegenerating: true } : c
    ));

    // Simulate regeneration delay
    setTimeout(() => {
      const variations = [
        `Happy Birthday, ${card.celebration.employee.firstName}! 🎂 On this special day, we celebrate you and all the amazing contributions you bring to our ${card.celebration.employee.department} team. May this year bring you incredible success and happiness!`,
        `Wishing you the happiest of birthdays, ${card.celebration.employee.firstName}! 🎉 Your positive energy and dedication make our ${card.celebration.employee.department} team stronger every day. Here's to celebrating you today and always!`,
        `Happy Birthday, ${card.celebration.employee.firstName}! 🌟 Your talent and hard work as a ${card.celebration.employee.jobTitle} inspire everyone around you. We hope your special day is as wonderful as you are!`,
      ];
      const randomMessage = variations[crypto.getRandomValues(new Uint32Array(1))[0] % variations.length];

      setCardStack(prev => prev.map((c, i) =>
        i === index ? { ...c, message: randomMessage, isRegenerating: false } : c
      ));
    }, 1000);
  };

  const handleSend = (index: number, method: 'email' | 'slack') => {
    const card = cardStack[index];
    const employee = card.celebration.employee;

    // Start exit animation
    setExitingIndex(index);

    // After animation, remove the card and show slidedown
    setTimeout(() => {
      setCardStack(prev => prev.filter((_, i) => i !== index));
      setExitingIndex(null);
      setSlidedownMessage(`Birthday message sent to ${employee.firstName} ${employee.lastName} via ${method === 'email' ? 'email' : 'Slack'}!`);

      // Check if all messages are sent
      if (cardStack.length === 1 && onAllMessagesSent) {
        setTimeout(() => {
          onAllMessagesSent();
        }, 500);
      }
    }, 300);
  };

  if (cardStack.length === 0) {
    return null;
  }

  return (
    <>
      {/* Success notification */}
      {slidedownMessage && (
        <div className="birthday-stack-slidedown">
          <div className="birthday-stack-success-toast">
            <IconV2 name="circle-check-solid" size={20} color="success-strong" />
            <BodyText weight="medium">{slidedownMessage}</BodyText>
          </div>
        </div>
      )}

      {/* Stacked cards container */}
      <div className="birthday-stack-container">
        {cardStack.map((card, index) => {
          const employee = card.celebration.employee;
          const isTopCard = index === 0;
          const isExiting = exitingIndex === index;
          const stackOffset = index * 8;
          const stackScale = 1 - index * 0.02;

          return (
            <div
              key={card.celebration.id}
              className={`birthday-stack-card ${isTopCard ? 'birthday-stack-card--top' : ''} ${isExiting ? 'birthday-stack-card--exiting' : ''}`}
              style={{
                transform: `translateY(${stackOffset}px) scale(${stackScale})`,
                zIndex: cardStack.length - index,
                opacity: isExiting ? 0 : 1,
              }}
            >
              <Gridlet header={<Gridlet.Header title={`Birthday Message for ${employee.firstName}`} />}>
                <Gridlet.Body>
                  <div className="insights-card-content">
                    {/* Employee info */}
                    <div className="employee-cell">
                      <Avatar src={employee.photoUrl} alt={`${employee.firstName} ${employee.lastName}`} size={48} />
                      <div className="employee-info">
                        <BodyText weight="semibold">
                          {employee.firstName} {employee.lastName}
                        </BodyText>
                        <BodyText size="small" color="neutral-weak">
                          {employee.jobTitle} • {employee.department}
                        </BodyText>
                        <BodyText size="small" color="neutral-weak">
                          Birthday: {formatDate(card.celebration.date)}
                        </BodyText>
                      </div>
                    </div>

                    {/* AI Generated message notice */}
                    <InlineMessage
                      status="ai"
                      title="AI-Generated Message"
                      description="I've drafted a personalized message based on their role and recent achievements."
                    />

                    {/* Message box - editable or display */}
                    {card.isEditing ? (
                      <div className="ai-message-edit-container">
                        <TextField
                          id={`message-edit-${card.celebration.id}`}
                          label="Edit Message"
                          value={card.message}
                          onChange={(e) => handleMessageChange(index, e.target.value)}
                          multiline
                          rows={4}
                        />
                        <div className="ai-message-edit-actions">
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleSaveEdit(index)}
                          >
                            Save Changes
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleCancelEdit(index, aiGeneratedMessages.birthdayMessage(employee))}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className={`ai-message-box ${card.isRegenerating ? 'ai-message-box--regenerating' : ''}`}>
                        <BodyText>{card.message}</BodyText>
                      </div>
                    )}

                    {/* Action buttons - only show for top card and when not editing */}
                    {isTopCard && !card.isEditing && (
                      <div className="ai-message-actions">
                        <Button
                          color="ai"
                          variant="outlined"
                          startIcon={<IconV2 name="paper-plane-solid" size={16} />}
                          onClick={() => handleSend(index, 'email')}
                        >
                          Send via Email
                        </Button>
                        <Button
                          color="ai"
                          variant="outlined"
                          startIcon={<IconV2 name="comment-solid" size={16} />}
                          onClick={() => handleSend(index, 'slack')}
                        >
                          Send via Slack
                        </Button>
                        <Button
                          color="ai"
                          variant="outlined"
                          startIcon={<IconV2 name="pen-solid" size={16} />}
                          onClick={() => handleEdit(index)}
                        >
                          Edit Message
                        </Button>
                        <Button
                          color="ai"
                          variant="outlined"
                          startIcon={<IconV2 name="arrows-rotate-solid" size={16} />}
                          onClick={() => handleRegenerate(index)}
                          disabled={card.isRegenerating}
                        >
                          {card.isRegenerating ? 'Regenerating...' : 'Regenerate'}
                        </Button>
                      </div>
                    )}

                    {/* Show remaining count for stacked cards */}
                    {isTopCard && cardStack.length > 1 && (
                      <div className="birthday-stack-remaining">
                        <IconV2 name="layer-group-solid" size={16} color="neutral-weak" />
                        <BodyText size="small" color="neutral-weak">
                          {cardStack.length - 1} more birthday message{cardStack.length > 2 ? 's' : ''} to send
                        </BodyText>
                      </div>
                    )}
                  </div>
                </Gridlet.Body>
              </Gridlet>
            </div>
          );
        })}
      </div>
    </>
  );
}
