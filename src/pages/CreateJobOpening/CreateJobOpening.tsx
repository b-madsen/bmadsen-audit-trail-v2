import { useNavigate } from 'react-router-dom';
import { IconV2, Headline } from '@bamboohr/fabric';
import { JobWizardSidebar } from '../../components/JobWizardSidebar';
import { JobInformationForm } from '../../components/JobInformationForm';
import './CreateJobOpening.css';

export function CreateJobOpening() {
  const navigate = useNavigate();

  const steps = [
    { id: 'job-information', label: 'Job Information', completed: false, active: true },
    { id: 'application-questions', label: 'Application Questions', completed: false, active: false },
    { id: 'job-pipeline', label: 'Job Pipeline', completed: false, active: false },
    { id: 'automated-emails', label: 'Automated Emails', completed: false, active: false },
    { id: 'job-boards', label: 'Job Boards', completed: false, active: false },
  ];

  const handleNextStep = () => {
    // Navigate to next step logic
    console.log('Next step');
  };

  const handleSaveAndFinishLater = () => {
    // Save and return to hiring page
    navigate('/hiring');
  };

  const handleCancel = () => {
    // Return to hiring page without saving
    navigate('/hiring');
  };

  const handleBackToJobOpenings = () => {
    navigate('/hiring');
  };

  return (
    <div className="create-job-page">
      {/* Back button */}
      <button onClick={handleBackToJobOpenings} className="create-job-back-button">
        <IconV2 name="angle-left-solid" size={16} color="neutral-strong" />
        Job Openings
      </button>

      {/* Page title */}
      <div className="create-job-header">
        <Headline size="large">Create Job Opening</Headline>
      </div>

      {/* Main content: Sidebar + Form */}
      <div className="create-job-content">
        {/* Left Sidebar */}
        <JobWizardSidebar
          steps={steps}
          onNextStep={handleNextStep}
          onSaveAndFinishLater={handleSaveAndFinishLater}
          onCancel={handleCancel}
        />

        {/* Right Content */}
        <div className="create-job-form-container">
          {/* Section Header */}
          <div className="create-job-section-header">
            <div className="create-job-section-icon">
              <IconV2 name="circle-info-solid" size={16} color="primary-strong" />
            </div>
            <h2 className="create-job-section-title">Job Information</h2>
          </div>

          {/* Form Content */}
          <div className="create-job-form-content">
            <JobInformationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJobOpening;
