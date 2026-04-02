import { useState, useEffect } from 'react';
import { Gridlet, BodyText, Button, IconV2, InlineMessage, TextField } from '@bamboohr/fabric';
import './InsightsCards.css';

export interface NewEmployeeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  startDate: string;
  email: string;
  phone: string;
  sourceFile: string;
}

interface NewEmployeeSummaryCardProps {
  employee: NewEmployeeInfo;
  onEmployeeUpdated?: (employee: NewEmployeeInfo) => void;
}

type ViewMode = 'summary' | 'edit' | 'welcomeEmail';

// Generate welcome email message
function generateWelcomeMessage(employee: NewEmployeeInfo): string {
  return `Welcome to the team, ${employee.firstName}! 🎉

We're thrilled to have you join us as a ${employee.jobTitle} in the ${employee.department} department. Your start date is set for ${formatDateLong(employee.startDate)}, and we can't wait to see the amazing contributions you'll bring to our team.

Please don't hesitate to reach out if you have any questions before your first day. We've prepared everything to ensure you have a smooth onboarding experience.

Looking forward to working with you!

Best regards,
The HR Team`;
}

function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function NewEmployeeSummaryCard({
  employee: initialEmployee,
  onEmployeeUpdated
}: NewEmployeeSummaryCardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('summary');
  const [employee, setEmployee] = useState<NewEmployeeInfo>(initialEmployee);
  const [editForm, setEditForm] = useState<NewEmployeeInfo>(initialEmployee);
  const [welcomeMessage, setWelcomeMessage] = useState(() => generateWelcomeMessage(initialEmployee));
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [slidedownMessage, setSlidedownMessage] = useState<string | null>(null);

  // Auto-dismiss slidedown
  useEffect(() => {
    if (slidedownMessage) {
      const timer = setTimeout(() => setSlidedownMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [slidedownMessage]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Edit Details handlers
  const handleEditDetails = () => {
    setEditForm(employee);
    setViewMode('edit');
  };

  const handleSaveDetails = () => {
    setEmployee(editForm);
    setWelcomeMessage(generateWelcomeMessage(editForm));
    onEmployeeUpdated?.(editForm);
    setSlidedownMessage(`Employee details updated for ${editForm.firstName} ${editForm.lastName}`);
    setViewMode('summary');
  };

  const handleCancelEdit = () => {
    setEditForm(employee);
    setViewMode('summary');
  };

  // Welcome Email handlers
  const handleSendWelcomeEmail = () => {
    setWelcomeMessage(generateWelcomeMessage(employee));
    setViewMode('welcomeEmail');
  };

  const handleEditMessage = () => {
    setIsEditingMessage(true);
  };

  const handleSaveMessage = () => {
    setIsEditingMessage(false);
  };

  const handleCancelMessageEdit = () => {
    setWelcomeMessage(generateWelcomeMessage(employee));
    setIsEditingMessage(false);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const variations = [
        `Hi ${employee.firstName}! 👋

Welcome aboard! We're excited to have you join us as our new ${employee.jobTitle}. The ${employee.department} team has been looking forward to your arrival on ${formatDateLong(employee.startDate)}.

Your desk is ready, your equipment is set up, and your team is eager to meet you. We've planned a welcome lunch for your first day!

See you soon!
The HR Team`,
        `Dear ${employee.firstName},

On behalf of everyone at the company, welcome to the family! 🌟

As our newest ${employee.jobTitle} in ${employee.department}, you're joining an amazing group of people who are passionate about what they do. Your journey starts on ${formatDateLong(employee.startDate)}, and we have an exciting onboarding program planned for you.

Feel free to reach out with any questions!

Warm regards,
The HR Team`,
        `Hello ${employee.firstName}! 🚀

The countdown is on! We can't wait to welcome you to ${employee.department} as a ${employee.jobTitle} on ${formatDateLong(employee.startDate)}.

We've heard great things about you and know you'll be an incredible addition to our team. Get ready for an amazing journey ahead!

Cheers,
The HR Team`,
      ];
      setWelcomeMessage(variations[crypto.getRandomValues(new Uint32Array(1))[0] % variations.length]);
      setIsRegenerating(false);
    }, 1000);
  };

  const handleSendEmail = (method: 'email' | 'slack') => {
    setSlidedownMessage(`Welcome message sent to ${employee.firstName} ${employee.lastName} via ${method === 'email' ? 'email' : 'Slack'}!`);
    setViewMode('summary');
  };

  const handleBackToSummary = () => {
    setIsEditingMessage(false);
    setViewMode('summary');
  };

  // Render Edit Form
  if (viewMode === 'edit') {
    return (
      <Gridlet header={<Gridlet.Header title="Edit Employee Details" />}>
        <Gridlet.Body>
          <div className="insights-card-content">
            <div className="new-employee-edit-form">
              <div className="new-employee-edit-row">
                <TextField
                  id="firstName"
                  label="First Name"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </div>
              <div className="new-employee-edit-row">
                <TextField
                  id="jobTitle"
                  label="Job Title"
                  value={editForm.jobTitle}
                  onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                />
                <TextField
                  id="department"
                  label="Department"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                />
              </div>
              <div className="new-employee-edit-row">
                <TextField
                  id="email"
                  label="Email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
                <TextField
                  id="phone"
                  label="Phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
              <TextField
                id="startDate"
                label="Start Date"
                value={editForm.startDate}
                onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
              />
            </div>

            <div className="new-employee-actions">
              <Button
                size="small"
                color="primary"
                onClick={handleSaveDetails}
              >
                Save Changes
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Gridlet.Body>
      </Gridlet>
    );
  }

  // Render Welcome Email View
  if (viewMode === 'welcomeEmail') {
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

        <Gridlet header={<Gridlet.Header title={`Welcome Email for ${employee.firstName}`} />}>
          <Gridlet.Body>
            <div className="insights-card-content">
              {/* Employee info */}
              <div className="employee-cell">
                <div className="new-employee-avatar">
                  <IconV2 name="user-solid" size={24} color="neutral-medium" />
                </div>
                <div className="employee-info">
                  <BodyText weight="semibold">
                    {employee.firstName} {employee.lastName}
                  </BodyText>
                  <BodyText size="small" color="neutral-weak">
                    {employee.jobTitle} • {employee.department}
                  </BodyText>
                  <BodyText size="small" color="neutral-weak">
                    Start Date: {formatDate(employee.startDate)}
                  </BodyText>
                </div>
              </div>

              {/* AI Generated message notice */}
              <InlineMessage
                status="ai"
                title="AI-Generated Welcome Message"
                description="I've drafted a personalized welcome email based on their role and start date."
              />

              {/* Message box - editable or display */}
              {isEditingMessage ? (
                <div className="ai-message-edit-container">
                  <TextField
                    id="welcome-message-edit"
                    label="Edit Message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    multiline
                    rows={8}
                  />
                  <div className="ai-message-edit-actions">
                    <Button
                      size="small"
                      color="primary"
                      onClick={handleSaveMessage}
                    >
                      Save Changes
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelMessageEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={`ai-message-box ${isRegenerating ? 'ai-message-box--regenerating' : ''}`} style={{ whiteSpace: 'pre-wrap' }}>
                  <BodyText>{welcomeMessage}</BodyText>
                </div>
              )}

              {/* Action buttons */}
              {!isEditingMessage && (
                <div className="ai-message-actions">
                  <Button
                    color="ai"
                    variant="outlined"
                    startIcon={<IconV2 name="paper-plane-solid" size={16} />}
                    onClick={() => handleSendEmail('email')}
                  >
                    Send via Email
                  </Button>
                  <Button
                    color="ai"
                    variant="outlined"
                    startIcon={<IconV2 name="comment-solid" size={16} />}
                    onClick={() => handleSendEmail('slack')}
                  >
                    Send via Slack
                  </Button>
                  <Button
                    color="ai"
                    variant="outlined"
                    startIcon={<IconV2 name="pen-solid" size={16} />}
                    onClick={handleEditMessage}
                  >
                    Edit Message
                  </Button>
                  <Button
                    color="ai"
                    variant="outlined"
                    startIcon={<IconV2 name="arrows-rotate-solid" size={16} />}
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                  >
                    {isRegenerating ? 'Regenerating...' : 'Regenerate'}
                  </Button>
                </div>
              )}

              {/* Back button */}
              <div className="new-employee-back-link">
                <Button
                  size="small"
                  variant="text"
                  color="secondary"
                  startIcon={<IconV2 name="arrow-left-solid" size={16} />}
                  onClick={handleBackToSummary}
                >
                  Back to Employee Summary
                </Button>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>
      </>
    );
  }

  // Render Summary View (default)
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

      <Gridlet header={<Gridlet.Header title="New Employee Information" />}>
        <Gridlet.Body>
          <div className="insights-card-content">
            {/* Employee Details Grid */}
            <div className="new-employee-details">
              <div className="new-employee-header">
                <div className="new-employee-avatar">
                  <IconV2 name="user-solid" size={32} color="neutral-medium" />
                </div>
                <div className="new-employee-name-section">
                  <BodyText size="large" weight="semibold">
                    {employee.firstName} {employee.lastName}
                  </BodyText>
                  <BodyText size="small" color="neutral-weak">
                    {employee.jobTitle} • {employee.department}
                  </BodyText>
                </div>
              </div>

              <div className="new-employee-info-grid">
                <div className="new-employee-info-item">
                  <div className="new-employee-info-icon">
                    <IconV2 name="calendar-solid" size={16} color="neutral-medium" />
                  </div>
                  <div className="new-employee-info-content">
                    <BodyText size="extra-small" color="neutral-weak">Start Date</BodyText>
                    <BodyText size="small" weight="medium">{formatDate(employee.startDate)}</BodyText>
                  </div>
                </div>

                <div className="new-employee-info-item">
                  <div className="new-employee-info-icon">
                    <IconV2 name="envelope-solid" size={16} color="neutral-medium" />
                  </div>
                  <div className="new-employee-info-content">
                    <BodyText size="extra-small" color="neutral-weak">Email</BodyText>
                    <BodyText size="small" weight="medium">{employee.email}</BodyText>
                  </div>
                </div>

                <div className="new-employee-info-item">
                  <div className="new-employee-info-icon">
                    <IconV2 name="phone-solid" size={16} color="neutral-medium" />
                  </div>
                  <div className="new-employee-info-content">
                    <BodyText size="extra-small" color="neutral-weak">Phone</BodyText>
                    <BodyText size="small" weight="medium">{employee.phone}</BodyText>
                  </div>
                </div>

                <div className="new-employee-info-item">
                  <div className="new-employee-info-icon">
                    <IconV2 name="file-lines-solid" size={16} color="neutral-medium" />
                  </div>
                  <div className="new-employee-info-content">
                    <BodyText size="extra-small" color="neutral-weak">Source Document</BodyText>
                    <BodyText size="small" weight="medium">{employee.sourceFile}</BodyText>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="new-employee-actions">
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<IconV2 name="pen-solid" size={16} />}
                onClick={handleEditDetails}
              >
                Edit Details
              </Button>
              <Button
                size="small"
                color="ai"
                variant="outlined"
                startIcon={<IconV2 name="paper-plane-solid" size={16} />}
                onClick={handleSendWelcomeEmail}
              >
                Send Welcome Email
              </Button>
            </div>
          </div>
        </Gridlet.Body>
      </Gridlet>
    </>
  );
}
