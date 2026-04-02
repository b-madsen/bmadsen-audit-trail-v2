import { useState, useRef, useEffect } from 'react';
import { IconV2, BodyText, Link, Headline, Section, TextButton } from '@bamboohr/fabric';
import { candidates } from '../../data/candidates';
import './CandidatesTabContent.css';

// Star Rating component using Fabric IconV2
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="candidates-star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <IconV2
          key={star}
          name={star <= rating ? "star-solid" : "star-regular"}
          size={16}
          color={star <= rating ? "warning-strong" : "neutral-weak"}
        />
      ))}
    </div>
  );
}

export function CandidatesTabContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('still-in-running');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['job-statuses']));
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  // expandedFilters is used by toggleFilter for future filter expansion UI
  void expandedFilters;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions = [
    { value: 'still-in-running', label: 'Still in the Running' },
    { value: 'all', label: 'All Candidates' },
    { value: 'reviewed', label: 'Reviewed' },
  ];

  const filterSections = [
    { id: 'job-statuses', label: '2 Job Statuses', hasActive: true },
    { id: 'job-openings', label: 'Job Openings', hasActive: false },
    { id: 'candidate-statuses', label: 'Candidate Statuses', hasActive: false },
    { id: 'star-rating', label: 'Star Rating', hasActive: false },
    { id: 'application-dates', label: 'Application Dates', hasActive: false },
    { id: 'job-locations', label: 'Job Locations', hasActive: false },
    { id: 'hiring-leads', label: 'Hiring Leads', hasActive: false },
  ];

  const toggleFilter = (filterId: string) => {
    setExpandedFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filterId)) {
        newSet.delete(filterId);
      } else {
        newSet.add(filterId);
      }
      return newSet;
    });
  };

  const getStatusLabel = () => {
    return statusOptions.find(opt => opt.value === filterStatus)?.label || 'Still in the Running';
  };

  return (
    <div className="candidates-content">
      {/* Search Input - Full Width */}
      <div className="candidates-search">
        <div className="candidates-search-input">
          <IconV2 name="magnifying-glass-solid" size={20} color="neutral-medium" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, name, location, etc."
            className="candidates-search-field"
          />
        </div>
      </div>

      {/* Main Content Area - Filters + Table */}
      <div className="candidates-main">
        {/* Left Sidebar - Filters */}
        <div className="candidates-filters-sidebar">
          {/* Status Filter Dropdown */}
          <div className="candidates-status-dropdown-wrapper" ref={statusDropdownRef}>
            <button
              className="candidates-dropdown-button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              <span>{getStatusLabel()}</span>
              <IconV2 name={isStatusDropdownOpen ? "chevron-up-solid" : "chevron-down-solid"} size={12} color="neutral-strong" />
            </button>
            {isStatusDropdownOpen && (
              <div className="candidates-dropdown-menu">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`candidates-dropdown-item ${filterStatus === option.value ? 'candidates-dropdown-item--selected' : ''}`}
                    onClick={() => {
                      setFilterStatus(option.value);
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    <BodyText size="medium">{option.label}</BodyText>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Save Filter / Reset Buttons */}
          <div className="candidates-filter-actions">
            <TextButton size="small" type="secondary">
              <span className="candidates-filter-action-content">
                <IconV2 name="star-solid" size={12} color="neutral-medium" />
                Save Filter
              </span>
            </TextButton>
            <TextButton size="small" type="secondary">
              <span className="candidates-filter-action-content">
                <IconV2 name="circle-xmark-solid" size={12} color="neutral-medium" />
                Reset
              </span>
            </TextButton>
          </div>

          {/* Filter Results Panel */}
          <div className="candidates-filter-panel">
            {/* Filter Results Header */}
            <div className="candidates-filter-header">
              <BodyText size="medium" weight="bold" color="neutral-inverted">Filter Results</BodyText>
            </div>

            {/* Filter Sections */}
            {filterSections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleFilter(section.id)}
                className={`candidates-filter-section ${section.hasActive ? 'candidates-filter-section--active' : ''}`}
              >
                <IconV2
                  name="chevron-right-solid"
                  size={16}
                  color={section.hasActive ? 'primary-strong' : 'neutral-strong'}
                />
                <BodyText
                  size="medium"
                  weight={section.hasActive ? 'semibold' : 'medium'}
                  color={section.hasActive ? 'primary' : 'neutral-strong'}
                >
                  {section.label}
                </BodyText>
                {section.hasActive && (
                  <IconV2 name="circle-xmark-solid" size={12} color="neutral-medium" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Candidates Table */}
        <div className="candidates-table-section">
          <Section>
            {/* Header */}
            <div className="candidates-section-header">
              <Headline size="small" color="primary">20 Candidates</Headline>
            </div>

            {/* Table */}
            <div className="candidates-table-container">
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th>Candidate Info</th>
                    <th>Job Opening</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Last Email</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      {/* Candidate Info */}
                      <td>
                        <div className="candidates-cell-content">
                          <Link href="#">{candidate.name}</Link>
                          <BodyText size="extra-small" color="neutral-medium">{candidate.location}</BodyText>
                          <BodyText size="extra-small" color="neutral-medium">{candidate.phone}</BodyText>
                        </div>
                      </td>

                      {/* Job Opening */}
                      <td>
                        <div className="candidates-cell-content">
                          <Link href="#">{candidate.jobTitle}</Link>
                          <BodyText size="extra-small" color="neutral-medium">{candidate.jobLocation}</BodyText>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className="candidates-cell-content">
                          <BodyText size="medium">{candidate.status}</BodyText>
                          <BodyText size="extra-small" color="neutral-medium">{candidate.statusTimestamp}</BodyText>
                        </div>
                      </td>

                      {/* Rating */}
                      <td>
                        <StarRating rating={candidate.rating} />
                      </td>

                      {/* Last Email */}
                      <td>
                        <div className="candidates-cell-content">
                          <BodyText size="medium">{candidate.lastEmail}</BodyText>
                          <BodyText size="extra-small" color="neutral-medium">{candidate.lastEmailTimestamp}</BodyText>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default CandidatesTabContent;
