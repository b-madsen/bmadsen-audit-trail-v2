import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  IconV2,
  Headline,
  Button,
  IconButton,
  BodyText,
  Link,
  Section,
  Tabs,
  Tab,
} from '@bamboohr/fabric';
import { jobOpenings } from '../../data/jobOpenings';
import { CandidatesTabContent } from './CandidatesTabContent';
import { TalentPoolsTabContent } from './TalentPoolsTabContent';
import './Hiring.css';

type TabValue = 'openings' | 'candidates' | 'pools';

export function Hiring() {
  const [activeTab, setActiveTab] = useState<TabValue>('openings');
  const [filterStatus, setFilterStatus] = useState('draft-and-open');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter job openings based on status
  const filteredOpenings = jobOpenings.filter((job) => {
    if (filterStatus === 'open-only') return job.status === 'Open';
    if (filterStatus === 'draft-only') return job.status === 'Draft';
    return true; // draft-and-open shows all
  });

  const openCount = jobOpenings.filter((j) => j.status === 'Open').length;
  const totalCount = jobOpenings.length;

  const statusOptions = [
    { value: 'draft-and-open', label: 'Draft and open' },
    { value: 'open-only', label: 'Open only' },
    { value: 'draft-only', label: 'Draft only' },
  ];

  const getFilterLabel = () => {
    return statusOptions.find(opt => opt.value === filterStatus)?.label || 'Draft and open';
  };

  return (
    <div className="hiring-page">
      {/* Page Header */}
      <div className="hiring-header">
        <Headline size="large" color="primary">Hiring</Headline>
      </div>

      {/* Tabs */}
      <div className="hiring-tabs-container">
        <div className="hiring-tabs">
          <Tabs
            value={activeTab}
            onChange={(value: unknown, _event: ChangeEvent<Element>) => setActiveTab(value as TabValue)}
            mode="line"
          >
            <Tab label="Job Openings" value="openings" />
            <Tab label="Candidates" value="candidates" />
            <Tab label="Talent Pools" value="pools" />
          </Tabs>
        </div>

        <div className="hiring-tab-links">
          <Link href="#">View Careers Website</Link>
          <BodyText size="small" color="neutral-medium">·</BodyText>
          <Link href="#">Get Embed Code</Link>
        </div>
      </div>

      {/* Render Candidates Tab Content */}
      {activeTab === 'candidates' && <CandidatesTabContent />}

      {/* Card with Table - Job Openings */}
      {activeTab === 'openings' && (
        <Section>
          {/* Actions Bar */}
          <div className="hiring-actions-bar">
            <RouterLink to="/hiring/new">
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                startIcon={<IconV2 name="circle-plus-solid" size={16} />}
              >
                New Job Opening
              </Button>
            </RouterLink>

            <div className="hiring-actions-right">
              <BodyText size="medium" color="neutral-medium">
                {openCount} of {totalCount} open · Show
              </BodyText>
              <div className="hiring-dropdown-wrapper" ref={filterDropdownRef}>
                <button
                  className="hiring-dropdown-button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                >
                  <span>{getFilterLabel()}</span>
                  <IconV2 name={isFilterDropdownOpen ? "chevron-up-solid" : "chevron-down-solid"} size={12} color="neutral-strong" />
                </button>
                {isFilterDropdownOpen && (
                  <div className="hiring-dropdown-menu">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`hiring-dropdown-item ${filterStatus === option.value ? 'hiring-dropdown-item--selected' : ''}`}
                        onClick={() => {
                          setFilterStatus(option.value);
                          setIsFilterDropdownOpen(false);
                        }}
                      >
                        <BodyText size="medium">{option.label}</BodyText>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <IconButton
                icon="arrow-down-to-line-solid"
                aria-label="Download"
                variant="outlined"
                color="secondary"
                size="small"
              />
            </div>
          </div>

          {/* Table */}
          <div className="hiring-table-container">
            <table className="hiring-table">
              <thead>
                <tr>
                  <th>Candidates</th>
                  <th>Job Opening</th>
                  <th>Hiring Lead</th>
                  <th>Created On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOpenings.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="hiring-candidates-cell">
                        <div className="hiring-candidates-icon">
                          <IconV2 name="circle-user-solid" size={16} color="neutral-inverted" />
                        </div>
                        <BodyText size="medium" weight="semibold">{job.candidatesCount}</BodyText>
                        {job.newCandidatesCount > 0 && (
                          <BodyText size="small" color="primary">{job.newCandidatesCount} new</BodyText>
                        )}
                      </div>
                    </td>
                    <td>
                      <Link href={`/hiring/job/${job.id}`}>
                        {job.title}
                      </Link>
                      <BodyText size="small" color="neutral-medium">{job.location}</BodyText>
                    </td>
                    <td>
                      <BodyText size="medium">{job.hiringLead}</BodyText>
                    </td>
                    <td>
                      <BodyText size="medium">{job.createdOn}</BodyText>
                    </td>
                    <td>
                      <BodyText size="medium">{job.status}</BodyText>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Talent Pools Tab */}
      {activeTab === 'pools' && <TalentPoolsTabContent />}
    </div>
  );
}

export default Hiring;
