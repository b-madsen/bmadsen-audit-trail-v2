import { useState, useMemo } from 'react';
import { Headline, BodyText, IconV2, Divider, TextButton, Avatar } from '@bamboohr/fabric';
import './InboxTest.css';

// Types
interface RequestItem {
  id: string;
  title: string;
  date: string;
  subtitle: string;
  subtitleType: 'requester' | 'description';
  requesterName?: string;
  avatarUrl?: string;
  dueStatus?: 'past-due' | 'due-soon' | null;
  iconType: 'avatar' | 'document' | 'user';
}

interface SidebarItem {
  id: string;
  label: string;
  count?: number;
  icon?: string;
  children?: SidebarItem[];
}

// Mock data for the requests list (from inboxData)
const mockRequests: RequestItem[] = [
  {
    id: '1',
    title: 'Vacation Request - Dec 20-27',
    date: 'Dec 15, 2024',
    subtitle: 'Sarah Johnson',
    subtitleType: 'requester',
    requesterName: 'Sarah Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    dueStatus: 'past-due',
    iconType: 'avatar',
  },
  {
    id: '2',
    title: 'Personal Day - Dec 15',
    date: 'Dec 16, 2024',
    subtitle: 'Michael Chen',
    subtitleType: 'requester',
    requesterName: 'Michael Chen',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    dueStatus: 'due-soon',
    iconType: 'avatar',
  },
  {
    id: '3',
    title: 'Budget Approval Request',
    date: 'Dec 17, 2024',
    subtitle: 'Q1 2025 Marketing Budget Review and Approval',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '4',
    title: 'Policy Change Approval',
    date: 'Dec 18, 2024',
    subtitle: 'James Wilson',
    subtitleType: 'requester',
    requesterName: 'James Wilson',
    dueStatus: null,
    iconType: 'user',
  },
  {
    id: '5',
    title: 'Address Change',
    date: 'Dec 19, 2024',
    subtitle: 'Update home address for benefits and payroll',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '6',
    title: 'New Laptop Request',
    date: 'Dec 20, 2024',
    subtitle: 'David Kim',
    subtitleType: 'requester',
    requesterName: 'David Kim',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    dueStatus: 'due-soon',
    iconType: 'avatar',
  },
  {
    id: '7',
    title: 'Monitor Request',
    date: 'Dec 21, 2024',
    subtitle: 'Jennifer Martinez',
    subtitleType: 'requester',
    requesterName: 'Jennifer Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    dueStatus: null,
    iconType: 'avatar',
  },
  {
    id: '8',
    title: 'Office Chair Request',
    date: 'Dec 22, 2024',
    subtitle: 'Ergonomic chair for remote work setup',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'user',
  },
  {
    id: '9',
    title: 'Salary Review Request',
    date: 'Dec 23, 2024',
    subtitle: 'Amanda Brown',
    subtitleType: 'requester',
    requesterName: 'Amanda Brown',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    dueStatus: 'past-due',
    iconType: 'avatar',
  },
  {
    id: '10',
    title: 'Bonus Adjustment',
    date: 'Dec 24, 2024',
    subtitle: 'Year-end performance bonus adjustment review',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '11',
    title: 'Contract Extension',
    date: 'Dec 25, 2024',
    subtitle: 'Michelle Garcia',
    subtitleType: 'requester',
    requesterName: 'Michelle Garcia',
    dueStatus: 'due-soon',
    iconType: 'user',
  },
  {
    id: '12',
    title: 'Job Title Update',
    date: 'Dec 26, 2024',
    subtitle: 'Update job title to Senior Software Engineer',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '13',
    title: 'Department Transfer',
    date: 'Dec 27, 2024',
    subtitle: 'Jessica Harris',
    subtitleType: 'requester',
    requesterName: 'Jessica Harris',
    avatarUrl: 'https://i.pravatar.cc/150?img=13',
    dueStatus: null,
    iconType: 'avatar',
  },
  {
    id: '14',
    title: 'Training Program Approval',
    date: 'Dec 28, 2024',
    subtitle: 'Leadership development program for Q1',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '15',
    title: 'Equipment Purchase',
    date: 'Dec 29, 2024',
    subtitle: 'Ashley Lewis',
    subtitleType: 'requester',
    requesterName: 'Ashley Lewis',
    dueStatus: null,
    iconType: 'user',
  },
  {
    id: '16',
    title: 'Remote Work Policy',
    date: 'Dec 30, 2024',
    subtitle: 'Updated remote work policy for 2025',
    subtitleType: 'description',
    dueStatus: 'due-soon',
    iconType: 'document',
  },
  {
    id: '17',
    title: 'Project Approval',
    date: 'Dec 31, 2024',
    subtitle: 'Rachel Green',
    subtitleType: 'requester',
    requesterName: 'Rachel Green',
    avatarUrl: 'https://i.pravatar.cc/150?img=17',
    dueStatus: null,
    iconType: 'avatar',
  },
  {
    id: '18',
    title: 'Expense Report',
    date: 'Jan 1, 2025',
    subtitle: 'Q4 2024 business travel expenses',
    subtitleType: 'description',
    dueStatus: 'past-due',
    iconType: 'document',
  },
  {
    id: '19',
    title: 'Leave of Absence',
    date: 'Jan 2, 2025',
    subtitle: 'Sophia Martinez',
    subtitleType: 'requester',
    requesterName: 'Sophia Martinez',
    avatarUrl: 'https://i.pravatar.cc/150?img=19',
    dueStatus: null,
    iconType: 'avatar',
  },
  {
    id: '20',
    title: 'Hiring Approval',
    date: 'Jan 3, 2025',
    subtitle: 'New developer position for engineering team',
    subtitleType: 'description',
    dueStatus: 'due-soon',
    iconType: 'user',
  },
  {
    id: '21',
    title: 'Team Restructure',
    date: 'Jan 4, 2025',
    subtitle: 'Ava Wilson',
    subtitleType: 'requester',
    requesterName: 'Ava Wilson',
    avatarUrl: 'https://i.pravatar.cc/150?img=21',
    dueStatus: null,
    iconType: 'avatar',
  },
  {
    id: '22',
    title: 'Performance Review',
    date: 'Jan 5, 2025',
    subtitle: 'Annual performance review and rating approval',
    subtitleType: 'description',
    dueStatus: null,
    iconType: 'document',
  },
  {
    id: '23',
    title: 'Vendor Contract',
    date: 'Jan 6, 2025',
    subtitle: 'Isabella Taylor',
    subtitleType: 'requester',
    requesterName: 'Isabella Taylor',
    dueStatus: null,
    iconType: 'user',
  },
];

// Sidebar navigation structure (from inboxData)
const sidebarData: SidebarItem[] = [
  {
    id: 'assigned-to-me',
    label: 'Assigned to Me',
    icon: 'circle-user-solid',
    children: [
      {
        id: 'inbox',
        label: 'Inbox',
        count: 69,
        icon: 'inbox-solid',
        children: [
          {
            id: 'approvals',
            label: 'Approvals',
            count: 66,
            icon: 'thumbs-up-solid',
            children: [
              { id: 'timesheets', label: 'Timesheets', count: 63 },
              { id: 'time-off-requests', label: 'Time Off Requests', count: 1 },
              { id: 'asset-request', label: 'Asset Request', count: 1 },
              { id: 'job-information', label: 'Job Information', count: 1 },
            ],
          },
          { id: 'onboarding', label: 'Onboarding', count: 3, icon: 'id-badge-solid' },
        ],
      },
      { id: 'completed', label: 'Completed', count: 0, icon: 'circle-check-solid' },
      { id: 'sent', label: 'Sent', count: 0, icon: 'paper-plane-solid' },
    ],
  },
];

const ITEMS_PER_PAGE = 10;

export function InboxTest() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['assigned-to-me', 'inbox', 'approvals'])
  );

  // Pagination logic
  const totalItems = mockRequests.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedRequests = mockRequests.slice(startIndex, endIndex);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4);
      if (totalPages > 5) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages]);

  // Render request icon based on type
  const renderRequestIcon = (request: RequestItem) => {
    if (request.iconType === 'avatar' && request.avatarUrl) {
      return <Avatar src={request.avatarUrl} alt={request.requesterName || ''} size={40} />;
    } else if (request.iconType === 'document') {
      return (
        <div className="inbox-test-request-icon">
          <IconV2 name="file-lines-solid" size={20} color="neutral-medium" />
        </div>
      );
    } else {
      return (
        <div className="inbox-test-request-icon">
          <IconV2 name="circle-user-solid" size={24} color="neutral-medium" />
        </div>
      );
    }
  };

  // Render due status
  const renderDueStatus = (dueStatus: 'past-due' | 'due-soon' | null | undefined) => {
    if (!dueStatus) return null;
    const config = {
      'past-due': { text: 'Past due', color: 'error-strong' as const },
      'due-soon': { text: 'Due soon', color: 'warning-strong' as const },
    };
    const { text, color } = config[dueStatus];
    return (
      <div className="inbox-test-due-status">
        <IconV2 name="clock-solid" size={12} color={color} />
        <BodyText size="extra-small" weight="medium" color={color}>
          {text}
        </BodyText>
      </div>
    );
  };

  // Render sidebar item recursively
  const renderSidebarItem = (item: SidebarItem, depth: number = 0) => {
    const isActive = activeTab === item.id;
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = depth === 0 ? 12 : 12 + depth * 20;

    return (
      <div key={item.id} className="inbox-test-sidebar-item-wrapper">
        <button
          onClick={() => {
            setActiveTab(item.id);
            if (hasChildren) {
              toggleSection(item.id);
            }
          }}
          className={`inbox-test-sidebar-item ${isActive ? 'inbox-test-sidebar-item--active' : ''}`}
          style={{ paddingLeft }}
        >
          {item.icon && (
            <IconV2
              name={item.icon as any}
              size={16}
              color={isActive ? 'neutral-inverted' : 'neutral-strong'}
            />
          )}
          <span className="inbox-test-sidebar-label">
            <BodyText
              size="small"
              weight={isActive ? 'semibold' : 'regular'}
              color={isActive ? 'neutral-inverted' : 'neutral-strong'}
            >
              {item.label}
              {item.count !== undefined && ` (${item.count})`}
            </BodyText>
          </span>
        </button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="inbox-test-sidebar-children">
            {item.children!.map((child) => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="inbox-test-page">
      {/* Back button */}
      <div className="inbox-test-back">
        <TextButton
          startIcon={<IconV2 name="chevron-left-solid" size={12} color="neutral-medium" />}
          size="small"
          color="secondary"
        >
          Back
        </TextButton>
      </div>

      {/* Page Header */}
      <div className="inbox-test-header">
        <Headline size="large" color="primary">
          Requests
        </Headline>
      </div>

      {/* Main content area */}
      <div className="inbox-test-content">
        {/* Sidebar */}
        <div className="inbox-test-sidebar">
          {sidebarData.map((item) => (
            <div key={item.id}>
              {renderSidebarItem(item)}
              {item.id === 'assigned-to-me' && item.children && (
                <>
                  {item.children.map((child) => (
                    <div key={child.id}>
                      {renderSidebarItem(child, 1)}
                      {(child.id === 'inbox' || child.id === 'completed') && (
                        <div className="inbox-test-sidebar-divider">
                          <Divider />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Request list */}
        <div className="inbox-test-list-container">
          <div className="inbox-test-list">
            {paginatedRequests.map((request) => (
              <div key={request.id} className="inbox-test-request-item">
                {renderRequestIcon(request)}
                <div className="inbox-test-request-content">
                  <div className="inbox-test-request-header">
                    <BodyText size="medium" weight="medium" color="neutral-strong">
                      {request.title}
                    </BodyText>
                    <BodyText size="medium" color="neutral-weak">
                      {' - '}
                      {request.date}
                    </BodyText>
                  </div>
                  <div className="inbox-test-request-subtitle">
                    {request.subtitleType === 'requester' ? (
                      <div className="inbox-test-requester">
                        <IconV2 name="circle-user-solid" size={12} color="neutral-medium" />
                        <BodyText size="extra-small" color="neutral-medium">
                          {request.requesterName}
                        </BodyText>
                      </div>
                    ) : (
                      <BodyText size="extra-small" color="neutral-medium">
                        {request.subtitle}
                      </BodyText>
                    )}
                    {renderDueStatus(request.dueStatus)}
                  </div>
                </div>
                <div className="inbox-test-request-arrow">
                  <IconV2 name="chevron-right-solid" size={16} color="neutral-weak" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="inbox-test-pagination">
            <div className="inbox-test-pagination-info">
              <BodyText size="small" color="neutral-weak">
                {startIndex + 1}-{endIndex} of {totalItems}
              </BodyText>
            </div>
            <div className="inbox-test-pagination-controls">
              {pageNumbers.map((page, index) => (
                <button
                  key={index}
                  className={`inbox-test-page-button ${
                    page === currentPage ? 'inbox-test-page-button--active' : ''
                  } ${page === '...' ? 'inbox-test-page-button--ellipsis' : ''}`}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
              <button
                className="inbox-test-next-button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <BodyText size="small" color="primary">
                  Next
                </BodyText>
                <IconV2 name="arrow-right-solid" size={12} color="primary-strong" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxTest;
