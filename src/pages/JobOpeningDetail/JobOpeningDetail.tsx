import { useParams, useNavigate } from 'react-router-dom';
import { IconV2, Headline, BodyText } from '@bamboohr/fabric';
import { Button, Avatar, StarRating } from '../../components';
import { jobOpenings } from '../../data/jobOpenings';
import { jobCandidates } from '../../data/jobCandidates';
import './JobOpeningDetail.css';

export function JobOpeningDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const jobId = id || '0';
  const jobIdNum = parseInt(jobId, 10);
  const job = jobOpenings.find((j) => j.id === jobId);
  const candidates = jobCandidates.filter((c) => c.jobOpeningId === jobIdNum);

  if (!job) {
    return <div className="job-detail-page">Job opening not found</div>;
  }

  // Find next job for navigation
  const currentIndex = jobOpenings.findIndex((j) => j.id === jobId);
  const nextJob = jobOpenings[currentIndex + 1];

  const newCandidatesCount = 5; // Mock value

  return (
    <div className="job-detail-page">
      {/* Back link and title */}
      <div className="job-detail-header">
        <button onClick={() => navigate('/hiring')} className="job-detail-back">
          <IconV2 name="chevron-left-solid" size={16} color="neutral-strong" />
          Job Openings
        </button>

        <div className="job-detail-title-row">
          <Headline size="large">{job.title}</Headline>

          {nextJob && (
            <button onClick={() => navigate(`/hiring/job/${nextJob.id}`)} className="job-detail-next-button">
              <div className="job-detail-next-info">
                <div className="job-detail-next-title">{nextJob.title}</div>
                <div>{nextJob.location}</div>
              </div>
              <IconV2 name="chevron-right-solid" size={16} color="neutral-strong" />
            </button>
          )}
        </div>

        <p className="job-detail-subtitle">
          Engineering – {job.location}
        </p>
      </div>

      {/* Action bar */}
      <div className="job-detail-actions">
        <div className="job-detail-actions-left">
          <Button variant="primary" icon="pen-to-square">
            Edit Job Opening
          </Button>
          <button className="job-detail-icon-button">
            <IconV2 name="users-solid" size={16} color="neutral-strong" />
          </button>
          <button className="job-detail-dropdown-button">
            <IconV2 name="chart-line-solid" size={16} color="neutral-strong" />
            <IconV2 name="caret-down-solid" size={10} color="neutral-strong" />
          </button>
          <Button variant="standard">Share Job Link</Button>
          <a href="#" className="job-detail-link" onClick={(e) => e.preventDefault()}>
            View Job Description
          </a>
        </div>

        <div className="job-detail-actions-right">
          {/* Hiring Lead Badge */}
          <div className="job-detail-hiring-lead">
            <Avatar size={40} />
            <div className="job-detail-hiring-lead-info">
              <BodyText size="small" color="neutral-weak">Hiring Lead</BodyText>
              <BodyText size="medium" weight="semibold">{job.hiringLead}</BodyText>
            </div>
          </div>

          <div className="job-detail-meta-divider" />

          {/* Status */}
          <div className="job-detail-meta-item">
            <span className="job-detail-meta-label">Status</span>
            <span className="job-detail-meta-value">{job.status}</span>
          </div>

          <div className="job-detail-meta-divider" />

          {/* Days open */}
          <div className="job-detail-meta-item">
            <span className="job-detail-meta-label">Open</span>
            <span className="job-detail-meta-value">23 days</span>
          </div>
        </div>
      </div>

      {/* Candidates table */}
      <div className="job-detail-card">
        {/* Header */}
        <div className="job-detail-card-header">
          <h2 className="job-detail-card-title">
            {candidates.length} Candidates ({newCandidatesCount} New)
          </h2>

          <div className="job-detail-card-actions">
            <button className="job-detail-small-button">
              <IconV2 name="gear-solid" size={16} color="neutral-strong" />
              <IconV2 name="caret-down-solid" size={10} color="neutral-strong" />
            </button>
            <button className="job-detail-small-button">
              <IconV2 name="envelope-solid" size={16} color="neutral-strong" />
              <IconV2 name="caret-down-solid" size={10} color="neutral-strong" />
            </button>
            <Button size="small" variant="standard" icon="circle-user">
              New Candidate
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="job-detail-table-container">
          <table className="job-detail-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className="file-checkbox" />
                </th>
                <th>Candidate Info</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Applied</th>
                <th>Last Email</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>
                    <input type="checkbox" className="file-checkbox" />
                  </td>
                  <td>
                    <a href="#" className="job-detail-candidate-link" onClick={(e) => e.preventDefault()}>
                      {candidate.name}
                    </a>
                    <div className="job-detail-candidate-meta">{candidate.location}</div>
                    <div className="job-detail-candidate-meta">{candidate.phone}</div>
                  </td>
                  <td>
                    <div className="job-detail-status">{candidate.status}</div>
                    <div className="job-detail-timestamp">{candidate.statusTimestamp}</div>
                  </td>
                  <td>
                    <StarRating rating={candidate.rating} />
                  </td>
                  <td>
                    <div className="job-detail-date">{candidate.appliedDate}</div>
                  </td>
                  <td>
                    <div className="job-detail-status">{candidate.lastEmail}</div>
                    <div className="job-detail-timestamp">{candidate.lastEmailTimestamp}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default JobOpeningDetail;
