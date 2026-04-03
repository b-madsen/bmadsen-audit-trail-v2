import { useState } from 'react';
import {
  Headline,
  BodyText,
  Button,
  IconButton,
  IconV2,
  TextButton,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Gridlet,
  ProgressBar,
  Pill,
  PillType,
} from '@bamboohr/fabric';
import avatarLarge from '../../assets/images/avatar-large.png';
import avatarSmall from '../../assets/images/avatar-small.png';
import './Home.css';

// ── Mock data ────────────────────────────────────────────────

const user = {
  name: 'Jess',
  title: 'Director, Demand Gen in Marketing',
  avatar: avatarLarge,
};

const timeEntries = [
  { start: '5:00 AM', end: '8:45 AM', duration: '3h 45m' },
  { start: '9:00 AM', end: '11:00 AM', duration: '2h 00m' },
  { start: '12:00 PM', end: '5:00 PM', duration: '4h 00m' },
];

const communityPosts = [
  { id: 1, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Photos from my hike this morning!', badge: null, avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 2, author: 'James Taggart', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Look at my cute puppies!', badge: null, avatar: 'https://i.pravatar.cc/40?img=15' },
  { id: 4, author: 'Dorothy Chou', group: 'Product Design', date: 'Jan 15', title: 'Doritos are better than Cheetos. Discuss.', badge: null, avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 5, author: 'Dorothy Chou', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Quarterly Sales Update', badge: 'announcement', avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 6, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: "LET'S GOOOOOO!!!!", badge: 'required', avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 7, author: 'James Taggart', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Did you guys see that meteor shower last night?', badge: null, avatar: 'https://i.pravatar.cc/40?img=15' },
  { id: 8, author: 'Stewart Little', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Photos from my hike this morning!', badge: null, avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 9, author: 'Dorothy Chou', group: 'Quarterly Sales Updates', date: 'Jan 15', title: "Here's a sweet video about ux design at the MOMA!", badge: null, avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 10, author: 'Marcus Webb', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Quarterly Sales Update', badge: null, avatar: 'https://i.pravatar.cc/40?img=33' },
  { id: 11, author: 'Sam Pandev', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Sam Pandev requested Thursday, Dec 27 off - 40 Hours of Vacation', badge: null, avatar: 'https://i.pravatar.cc/40?img=51' },
  { id: 12, author: 'Lucy Chen', group: 'Quarterly Sales Updates', date: 'Jan 15', title: 'Look at my cute puppies!', badge: null, avatar: 'https://i.pravatar.cc/40?img=47' },
];

const directReports = [
  { id: 1, name: 'Kristin Campbell', status: 'Out Jan 18 (1 day)', avatar: avatarSmall },
  { id: 2, name: 'Raj Patel', status: 'Out Jan 18 (1 day)', avatar: avatarSmall },
  { id: 3, name: 'Stacy Salmon', status: 'Out Jan 18 (1 day)', avatar: avatarLarge },
  { id: 4, name: 'Mylee Carlson', status: 'Out Jan 18 (1 day)', avatar: avatarLarge },
];

const todayOutAvatars = [avatarSmall, avatarLarge, avatarSmall, avatarLarge, avatarSmall, avatarSmall, avatarLarge, avatarSmall, avatarLarge, avatarSmall];
const tomorrowOutAvatars = [avatarSmall, avatarLarge, avatarSmall, avatarLarge];

const celebrations = [
  { id: 1, name: 'Andrew Michaelson', event: '4th Anniversary', date: 'Aug 31', avatar: avatarSmall },
  { id: 2, name: 'Stacy Salmon', event: 'Happy Birthday!', date: 'Sep 13', avatar: avatarLarge },
  { id: 3, name: 'Mylee Carlson', event: '1st Anniversary', date: 'Sep 21', avatar: avatarLarge },
  { id: 4, name: 'Mylee Carlson', event: '1st Anniversary', date: 'Sep 21', avatar: avatarLarge },
];

const companyHolidays = [
  { id: 1, name: 'Labor Day', date: 'Monday, Sep 2' },
  { id: 2, name: 'Thanksgiving Day', date: 'Thursday, Nov 28' },
  { id: 3, name: 'Christmas Day', date: 'Wednesday, Dec 25' },
];

const timeToHireJobs = [
  { title: 'Content Marketer', current: 33, total: 50 },
  { title: 'Sr. Director of Learning', current: 22, total: 50 },
  { title: 'Customer Retention Manager', current: 28, total: 50 },
  { title: 'UX Designer', current: 27, total: 50 },
  { title: 'Raptor Trainer', current: 18, total: 50 },
];

const incompleteTrainings = [
  { id: 1, name: 'CPR Certification', count: 132 },
  { id: 2, name: 'Microgravity Work Environments', count: 40 },
  { id: 3, name: 'Raptor Repulsion Gel and T...', count: 40 },
];

const welcomeAvatars = [avatarSmall, avatarLarge, avatarSmall, avatarLarge, avatarSmall];

const benefitPlans = [
  { name: 'Medical', icon: 'heart-pulse-regular', current: 68, total: 100 },
  { name: 'Dental', icon: 'tooth-regular', current: 62, total: 100 },
  { name: 'Vision', icon: 'eye-regular', current: 55, total: 100 },
  { name: 'Retirement', icon: 'piggy-bank-regular', current: 48, total: 100 },
];

const companyLinks = [
  { section: 'Company Documents', links: ['COVID-19 Updates', 'Company Handbook', 'Training and Certifications', 'Work from Home Guidelines', 'Company FAQs'] },
  { section: 'Benefits', links: ['401K', 'Health'] },
];

const whatsHappeningItems = [
  {
    id: 1,
    iconName: 'compass-regular',
    iconShape: 'circle' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a moment to complete your Employee Assessments.',
    subtitle: "Complete the assessments on the Performance tab on each employee's profile.",
    warningText: 'Please complete by Oct 16 (169 days ago).',
    isPastDue: true,
    actionLabel: 'Complete Assessment',
  },
  {
    id: 2,
    iconName: 'people-group-regular',
    iconShape: 'circle' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a moment to select people to give feedback about your team members.',
    subtitle: 'Requests for feedback must be sent before Apr 20 (17 days).',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Give Feedback',
  },
  {
    id: 3,
    iconName: 'address-card-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Take a few minutes to complete your Self Assessment.',
    subtitle: 'Please complete your assessment by Apr 22 (19 days).',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Complete Assessment',
  },
  {
    id: 4,
    iconName: 'file-pen-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: 'W-4 (2024)',
    title: ' is waiting for your signature!',
    subtitle: '6 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Sign Document',
  },
  {
    id: 5,
    iconName: 'circle-user-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: null,
    title: 'Olivia Sterling made a request: Compensation request for Ashley Adams.',
    subtitle: '7 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Review Request',
  },
  {
    id: 6,
    iconName: 'file-pen-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: 'I-9 (2024)',
    title: ' is waiting for your signature!',
    subtitle: '7 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Sign Document',
  },
  {
    id: 7,
    iconName: 'file-pen-regular',
    iconShape: 'square' as const,
    avatar: null,
    boldPrefix: 'Background_Check_Auth.pdf',
    title: ' is waiting for your signature!',
    subtitle: '8 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Sign Document',
  },
  {
    id: 8,
    iconName: null,
    iconShape: null,
    avatar: 'https://i.pravatar.cc/40?u=javier',
    boldPrefix: null,
    title: 'Javier Cruz is requesting an update to their personal information.',
    subtitle: '8 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Update Info',
  },
  {
    id: 9,
    iconName: null,
    iconShape: null,
    avatar: 'https://i.pravatar.cc/40?u=maja',
    boldPrefix: 'Maja Pandev',
    title: ' requested Friday, Jan 25 off – 40 hours of Vacation',
    subtitle: '8 months ago',
    warningText: null,
    isPastDue: false,
    actionLabel: 'Approve',
  },
];

// ── Types ────────────────────────────────────────────────────

type FeedTab = 'community' | 'happening';
type TeamTab = 'team' | 'turnover' | 'headcount';

// ── Component ────────────────────────────────────────────────

export function Home() {
  const [feedTab, setFeedTab] = useState<FeedTab>('community');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [teamTab, setTeamTab] = useState<TeamTab>('team');

  return (
    <div className="home-page">

      {/* ── Profile Header ── */}
      <div className="home-profile-header">
        <div className="home-profile-info">
          <Avatar src={user.avatar} size={96} />
          <div className="home-profile-text">
            <Headline size="extra-large" color="primary">{`Hi, ${user.name}`}</Headline>
            <BodyText size="medium" color="neutral-weak">{user.title}</BodyText>
          </div>
        </div>
        <div className="home-header-actions">
          <Button variant="outlined" color="secondary" startIcon={<IconV2 name="circle-plus-regular" size={16} />} endIcon={<IconV2 name="chevron-down-solid" size={12} />}>
            New...
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<IconV2 name="grid-2-regular" size={16} />}>
            Edit
          </Button>
        </div>
      </div>

      {/* ── Top Dashboard: Left widgets + Feed ── */}
      <div className="home-dashboard">

        {/* Left column: My Time, Time Off, My Stuff */}
        <div className="home-left-col">

          {/* My Time */}
          <Gridlet header={<Gridlet.Header title="My Time" icon="clock-regular" />}>
            <Gridlet.Body>
              <div className="home-widget-body">
                <div className="home-time-display">
                  <Headline size="medium" color="neutral-strong">4h 32m Today</Headline>
                  <BodyText size="small" color="neutral-weak">Clocked in today at 8:02am</BodyText>
                </div>
                <div className="home-clock-in-btn">
                  <Button variant="contained" color="primary" size="large" startIcon={<IconV2 name="clock-regular" size={16} color="neutral-inverted" />}>
                    Clock In
                  </Button>
                </div>
                <div className="home-time-entries">
                  <BodyText size="small" weight="semibold" color="neutral-strong">Today – 7h 45m</BodyText>
                  <div className="home-time-entry-list">
                    {timeEntries.map((entry, i) => (
                      <BodyText key={i} size="small" color="neutral-medium">
                        {entry.start} – {entry.end} → {entry.duration}
                      </BodyText>
                    ))}
                  </div>
                  <TextButton color="primary" size="small">+ Time Entry</TextButton>
                </div>
                <Divider />
                <div className="home-week-summary">
                  <div className="home-week-stats">
                    <div className="home-week-stat">
                      <BodyText size="extra-small" color="neutral-weak">This Week</BodyText>
                      <BodyText size="medium" weight="semibold" color="neutral-strong">35h 48m</BodyText>
                    </div>
                    <div className="home-week-stat">
                      <BodyText size="extra-small" color="neutral-weak">This Week</BodyText>
                      <BodyText size="medium" weight="semibold" color="neutral-strong">35h 48m</BodyText>
                    </div>
                  </div>
                  <Button variant="outlined" color="secondary" size="small">My Timesheet</Button>
                </div>
              </div>
            </Gridlet.Body>
          </Gridlet>

          {/* Time Off */}
          <Gridlet header={<Gridlet.Header title="Time Off" icon="calendar-regular" />}>
            <Gridlet.Body>
              <div className="home-widget-body">
                <div className="home-timeoff-balances">
                  <div className="home-timeoff-balance">
                    <BodyText size="small" weight="semibold" color="neutral-strong">Vacation</BodyText>
                    <div className="home-timeoff-amount">
                      <IconV2 name="umbrella-beach-solid" size={24} color="primary-strong" />
                      <Headline size="medium" color="primary">132.2</Headline>
                    </div>
                    <BodyText size="small" color="primary">hours available</BodyText>
                    <BodyText size="extra-small" color="neutral-weak">8 hours scheduled</BodyText>
                  </div>
                  <div className="home-timeoff-balance">
                    <BodyText size="small" weight="semibold" color="neutral-strong">Sick Leave</BodyText>
                    <div className="home-timeoff-amount">
                      <IconV2 name="kit-medical-solid" size={24} color="primary-strong" />
                      <Headline size="medium" color="primary">8</Headline>
                    </div>
                    <BodyText size="small" color="primary">hours available</BodyText>
                    <BodyText size="extra-small" color="neutral-weak">8 hours scheduled</BodyText>
                  </div>
                </div>
                <div className="home-timeoff-actions">
                  <Button variant="outlined" color="secondary" startIcon={<IconV2 name="calendar-regular" size={16} />}>
                    Request Time Off
                  </Button>
                  <IconButton icon="calendar-lines-regular" variant="outlined" color="secondary" aria-label="View calendar" />
                </div>
              </div>
            </Gridlet.Body>
          </Gridlet>

          {/* My Stuff */}
          <Gridlet header={<Gridlet.Header title="My Stuff" icon="box-open-regular" />}>
            <Gridlet.Body>
              <div className="home-widget-body home-widget-body--no-pad">
                <div className="home-stuff-item">
                  <div className="home-stuff-icon">
                    <IconV2 name="bullseye-arrow-solid" size={20} color="primary-strong" />
                  </div>
                  <div className="home-stuff-text">
                    <BodyText size="medium" weight="semibold" color="neutral-strong">Goals</BodyText>
                    <BodyText size="small" color="neutral-weak">5 goals, soonest is due Sep 2 (13 days).</BodyText>
                  </div>
                </div>
                <Divider />
                <div className="home-stuff-item">
                  <div className="home-stuff-icon">
                    <IconV2 name="graduation-cap-solid" size={20} color="primary-strong" />
                  </div>
                  <div className="home-stuff-text">
                    <BodyText size="medium" weight="semibold" color="neutral-strong">Training</BodyText>
                    <BodyText size="small" color="warning-strong">1 training past due, 3 about to expire.</BodyText>
                  </div>
                </div>
                <Divider />
                <div className="home-stuff-item">
                  <div className="home-stuff-icon">
                    <IconV2 name="heart-pulse-solid" size={20} color="primary-strong" />
                  </div>
                  <div className="home-stuff-text">
                    <BodyText size="medium" weight="semibold" color="neutral-strong">Benefits</BodyText>
                    <BodyText size="small" color="neutral-weak">You are enrolled in 4 benefit plans.</BodyText>
                  </div>
                </div>
              </div>
            </Gridlet.Body>
          </Gridlet>
        </div>

        {/* Right column: Community Feed */}
        <div className="home-right-col">
          <Gridlet>
            <Gridlet.Body>
              <div className="home-feed-widget">
                <div className="home-feed-tabs">
                  <Tabs value={feedTab} onChange={(value) => setFeedTab(value as FeedTab)}>
                    <Tab
                      value="community"
                      label={
                        <span className="home-tab-label">
                          <IconV2 name="award-solid" size={12} color={feedTab === 'community' ? 'primary-strong' : 'neutral-medium'} />
                          Employee Community
                        </span>
                      }
                    />
                    <Tab
                      value="happening"
                      label={
                        <span className="home-tab-label">
                          <IconV2 name="bullhorn-solid" size={12} color={feedTab === 'happening' ? 'primary-strong' : 'neutral-medium'} />
                          What's Happening
                        </span>
                      }
                    />
                  </Tabs>
                </div>

                {feedTab === 'community' && (
                  <div className="home-feed-content">
                    <div className="home-feed-toolbar">
                      <div className="home-feed-toolbar-left">
                        <Button variant="outlined" color="secondary" size="small" startIcon={<IconV2 name="pen-to-square-regular" size={12} />}>
                          New Post
                        </Button>
                        <Button variant="outlined" color="secondary" size="small" endIcon={<IconV2 name="chevron-down-solid" size={12} />}>
                          Personal Feed
                        </Button>
                      </div>
                      <TextButton color="primary" size="small">Visit Employee Community</TextButton>
                    </div>
                    <div className="home-post-list">
                      {communityPosts.map((post) => (
                        <div
                          key={post.id}
                          className={`home-post-item ${hoveredPost === post.id ? 'home-post-item--hovered' : ''}`}
                          onMouseEnter={() => setHoveredPost(post.id)}
                          onMouseLeave={() => setHoveredPost(null)}
                        >
                          <Avatar src={post.avatar} size={40} />
                          <div className="home-post-content">
                            <BodyText size="medium" weight="semibold" color="neutral-strong">{post.title}</BodyText>
                            <div className="home-post-meta">
                              {post.badge === 'announcement' && (
                                <span className="home-post-badge">
                                  <IconV2 name="bullhorn-solid" size={12} color="primary-strong" />
                                  <BodyText size="extra-small" color="primary">Announcement!</BodyText>
                                </span>
                              )}
                              {post.badge === 'required' && (
                                <span className="home-post-badge">
                                  <IconV2 name="circle-check-solid" size={12} color="primary-strong" />
                                  <BodyText size="extra-small" color="primary">Required Reading</BodyText>
                                </span>
                              )}
                              <BodyText size="small" color="neutral-weak">
                                {post.author} to {post.group} on {post.date}
                              </BodyText>
                            </div>
                          </div>
                          {hoveredPost === post.id && (
                            <div className="home-post-hover-actions">
                              <IconButton icon="heart-regular" variant="outlined" color="secondary" aria-label="Like post" />
                              <Button variant="outlined" color="secondary" size="small">View Post</Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {feedTab === 'happening' && (
                  <div className="home-feed-content">
                    <div className="home-post-list">
                      {whatsHappeningItems.map((item) => (
                        <div
                          key={item.id}
                          className={`home-post-item ${hoveredItem === item.id ? 'home-post-item--hovered' : ''}`}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {/* Left icon or avatar */}
                          {item.avatar ? (
                            <Avatar src={item.avatar} size={40} />
                          ) : (
                            <div className={`home-happening-icon home-happening-icon--${item.iconShape}`}>
                              <IconV2 name={item.iconName as any} size={20} color="neutral-medium" />
                            </div>
                          )}

                          {/* Content */}
                          <div className="home-post-content">
                            <BodyText size="medium" weight="semibold" color="neutral-strong">
                              {item.boldPrefix && <strong>{item.boldPrefix}</strong>}{item.title}
                            </BodyText>
                            <div className="home-happening-subtitle">
                              <BodyText size="small" color="neutral-weak">{item.subtitle}</BodyText>
                              {item.warningText && (
                                <span className="home-happening-warning">
                                  <BodyText size="small" color="warning-strong">{item.warningText}</BodyText>
                                  {item.isPastDue && (
                                    <Pill muted type={PillType.Warning}>PAST DUE</Pill>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Hover actions */}
                          {hoveredItem === item.id && (
                            <div className="home-post-hover-actions">
                              <Button variant="outlined" color="secondary" size="small">
                                {item.actionLabel}
                              </Button>
                              <IconButton
                                icon="xmark-regular"
                                variant="outlined"
                                color="secondary"
                                aria-label="Dismiss"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Gridlet.Body>
          </Gridlet>
        </div>
      </div>

      {/* ── My Direct Reports (full width) ── */}
      <div className="home-full-row">
        <Gridlet header={<Gridlet.Header title="My Direct Reports" icon="sitemap-regular" />}>
          <Gridlet.Body>
            <div className="home-team-layout">
              {/* Avatar cards */}
              <div className="home-team-avatars">
                {directReports.map((person) => (
                  <div key={person.id} className="home-team-card">
                    <Avatar src={person.avatar} size={96} />
                    <BodyText size="medium" weight="semibold" color="neutral-strong">{person.name}</BodyText>
                    <div className="home-team-status">
                      <IconV2 name="person-walking-arrow-right-solid" size={12} color="neutral-medium" />
                      <BodyText size="small" color="neutral-weak">{person.status}</BodyText>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar nav */}
              <div className="home-team-sidebar">
                <button
                  className={`home-team-nav-item ${teamTab === 'team' ? 'home-team-nav-item--active' : ''}`}
                  onClick={() => setTeamTab('team')}
                >
                  <IconV2 name={teamTab === 'team' ? 'sitemap-solid' : 'sitemap-regular'} size={16} color={teamTab === 'team' ? 'neutral-inverted' : 'neutral-medium'} />
                  <BodyText size="small" weight="semibold" color={teamTab === 'team' ? 'neutral-inverted' : 'neutral-strong'}>My Direct Reports</BodyText>
                </button>
                <button
                  className={`home-team-nav-item ${teamTab === 'turnover' ? 'home-team-nav-item--active' : ''}`}
                  onClick={() => setTeamTab('turnover')}
                >
                  <IconV2 name={teamTab === 'turnover' ? 'arrows-rotate-solid' : 'arrows-rotate-regular'} size={16} color={teamTab === 'turnover' ? 'neutral-inverted' : 'neutral-medium'} />
                  <BodyText size="small" weight="semibold" color={teamTab === 'turnover' ? 'neutral-inverted' : 'neutral-strong'}>Turnover</BodyText>
                </button>
                <button
                  className={`home-team-nav-item ${teamTab === 'headcount' ? 'home-team-nav-item--active' : ''}`}
                  onClick={() => setTeamTab('headcount')}
                >
                  <IconV2 name={teamTab === 'headcount' ? 'chart-simple-solid' : 'chart-simple-regular'} size={16} color={teamTab === 'headcount' ? 'neutral-inverted' : 'neutral-medium'} />
                  <BodyText size="small" weight="semibold" color={teamTab === 'headcount' ? 'neutral-inverted' : 'neutral-strong'}>Headcount</BodyText>
                </button>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>
      </div>

      {/* ── Bottom row: Who's Out | Celebrations | Company Links ── */}
      <div className="home-bottom-row">

        {/* Who's Out */}
        <Gridlet header={<Gridlet.Header title="Who's Out" icon="house-person-return-regular" />}>
          <Gridlet.Body>
            <div className="home-whosout-body">
              <div className="home-whosout-group">
                <BodyText size="small" weight="semibold" color="primary">Today (31)</BodyText>
                <div className="home-avatar-grid">
                  {todayOutAvatars.map((src, i) => (
                    <Avatar key={i} src={src} size={40} />
                  ))}
                  <BodyText size="small" color="neutral-weak">+21 more</BodyText>
                </div>
              </div>
              <div className="home-whosout-group">
                <BodyText size="small" weight="semibold" color="primary">Tomorrow (38)</BodyText>
                <div className="home-avatar-grid">
                  {tomorrowOutAvatars.map((src, i) => (
                    <Avatar key={i} src={src} size={40} />
                  ))}
                  <BodyText size="small" color="neutral-weak">+34 more</BodyText>
                </div>
              </div>
              <div className="home-whosout-footer">
                <TextButton size="extra-small">Full Calendar</TextButton>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Celebrations */}
        <Gridlet header={<Gridlet.Header title="Celebrations" icon="party-horn-regular" />}>
          <Gridlet.Body>
            <div className="home-celebrations-body">
              {celebrations.map((item, i) => (
                <div key={item.id}>
                  {i > 0 && <Divider />}
                  <div className="home-celebration-item">
                    <Avatar src={item.avatar} size={40} />
                    <div className="home-celebration-text">
                      <BodyText size="medium" weight="semibold" color="neutral-strong">{item.name}</BodyText>
                      <BodyText size="small" color="neutral-weak">{item.date} – {item.event}</BodyText>
                    </div>
                    <IconV2 name="calendar-star-regular" size={20} color="neutral-weak" />
                  </div>
                </div>
              ))}
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Company Links */}
        <Gridlet header={<Gridlet.Header title="Company Links" icon="link-regular" />}>
          <Gridlet.Body>
            <div className="home-links-body">
              <div className="home-links-content">
                {companyLinks.map((group) => (
                  <div key={group.section} className="home-links-group">
                    <BodyText size="small" weight="semibold" color="primary">{group.section}</BodyText>
                    <div className="home-links-list">
                      {group.links.map((link) => (
                        <TextButton key={link} size="small">{link}</TextButton>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="home-links-footer">
                <TextButton size="extra-small">7 more links...</TextButton>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

      </div>

      {/* ── Row: Onboarding | Divisions | Company Holidays ── */}
      <div className="home-bottom-row">

        {/* Onboarding at Company Name */}
        <Gridlet header={<Gridlet.Header title="Onboarding at Company Name" icon="id-card-clip-regular" />}>
          <Gridlet.Body>
            <div className="home-onboarding-body">
              <BodyText size="small" weight="semibold" color="primary">Already Started</BodyText>
              <div className="home-onboarding-card">
                <div className="home-onboarding-card-header">
                  <IconV2 name="people-group-regular" size={16} color="neutral-medium" />
                  <BodyText size="medium" weight="semibold" color="neutral-strong">4 people have overdue tasks</BodyText>
                </div>
                <BodyText size="small" color="neutral-weak">2 people on track</BodyText>
              </div>
              <BodyText size="small" weight="semibold" color="primary">Starting Monday, Aug 2</BodyText>
              <div className="home-onboarding-card">
                <div className="home-onboarding-card-header">
                  <IconV2 name="people-group-regular" size={16} color="neutral-medium" />
                  <BodyText size="medium" weight="semibold" color="neutral-strong">4 people have overdue tasks</BodyText>
                </div>
                <BodyText size="small" color="neutral-weak">2 people on track</BodyText>
              </div>
              <div className="home-onboarding-footer">
                <BodyText size="small" color="neutral-weak">6 more scheduled to start...</BodyText>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Divisions */}
        <Gridlet header={<Gridlet.Header title="Divisions" icon="id-card-clip-regular" />}>
          <Gridlet.Body>
            <div className="home-divisions-body">
              <div className="home-divisions-chart">
                <div className="home-divisions-ring" />
                <div className="home-divisions-center">
                  <IconV2 name="sitemap-solid" size={28} color="neutral-medium" />
                  <BodyText size="small" color="neutral-weak">Division</BodyText>
                </div>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Company Holidays */}
        <Gridlet header={<Gridlet.Header title="Company Holidays" icon="calendar-star-regular" />}>
          <Gridlet.Body>
            <div className="home-holidays-body">
              {companyHolidays.map((holiday, i) => (
                <div key={holiday.id}>
                  {i > 0 && <Divider />}
                  <div className="home-holiday-item">
                    <div className="home-holiday-icon">
                      <IconV2 name="calendar-star-regular" size={20} color="primary-strong" />
                    </div>
                    <div className="home-holiday-text">
                      <BodyText size="medium" weight="semibold" color="neutral-strong">{holiday.name}</BodyText>
                      <BodyText size="small" color="neutral-weak">{holiday.date}</BodyText>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Gridlet.Body>
        </Gridlet>

      </div>

      {/* ── Row: Time to Hire | Incomplete Trainings | Welcome ── */}
      <div className="home-bottom-row">

        {/* Time to Hire */}
        <Gridlet header={<Gridlet.Header title="Time to Hire" icon="business-time-regular" />}>
          <Gridlet.Body>
            <div className="home-tth-body">
              {timeToHireJobs.map((job) => (
                <div key={job.title} className="home-tth-item">
                  <BodyText size="small" color="neutral-strong">{job.title}</BodyText>
                  <ProgressBar current={job.current} total={job.total} />
                </div>
              ))}
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Incomplete Trainings */}
        <Gridlet header={<Gridlet.Header title="Incomplete Trainings" icon="graduation-cap-regular" />}>
          <Gridlet.Body>
            <div className="home-trainings-body">
              <div className="home-trainings-list">
                {incompleteTrainings.map((training) => (
                  <div key={training.id} className="home-training-card">
                    <BodyText size="medium" weight="semibold" color="neutral-strong">{training.name}</BodyText>
                    <div className="home-training-count">
                      <IconV2 name="people-group-regular" size={12} color="neutral-medium" />
                      <BodyText size="small" color="neutral-weak">{training.count} Employees</BodyText>
                    </div>
                  </div>
                ))}
              </div>
              <div className="home-trainings-footer">
                <TextButton size="small">7 more trainings...</TextButton>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Welcome to Company Name */}
        <Gridlet header={<Gridlet.Header title="Welcome to Company Name" icon="id-card-clip-regular" />}>
          <Gridlet.Body>
            <div className="home-welcome-body">
              <div className="home-welcome-content">
                <IconV2 name="hand-wave-solid" size={48} color="primary-strong" />
                <Headline size="small" color="neutral-strong">Welcome 1 New Team Member!</Headline>
                <BodyText size="medium" color="neutral-weak">Starting Today</BodyText>
              </div>
              <div className="home-welcome-avatars">
                {welcomeAvatars.map((src, i) => (
                  <Avatar key={i} src={src} size={48} />
                ))}
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

      </div>

      {/* ── Row: People Without Pay Raise | Benefit Plan Enrollment | Time Off Used ── */}
      <div className="home-bottom-row">

        {/* People Without a Pay Raise */}
        <Gridlet header={<Gridlet.Header title="People Without a Pay Raise" icon="money-check-dollar-regular" />}>
          <Gridlet.Body>
            <div className="home-stat-card-body">
              <div className="home-stat-card">
                <div className="home-stat-card-number">
                  <IconV2 name="money-check-dollar-regular" size={40} color="neutral-medium" />
                  <Headline size="large" color="neutral-strong">15</Headline>
                </div>
                <BodyText size="medium" color="neutral-weak">Without Pay Raise</BodyText>
                <BodyText size="small" color="neutral-weak">for 12+ months</BodyText>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Benefit Plan Enrollment */}
        <Gridlet header={<Gridlet.Header title="Benefit Plan Enrollment" icon="heart-circle-plus-regular" />}>
          <Gridlet.Body>
            <div className="home-benefit-body">
              <div className="home-benefit-list">
                {benefitPlans.map((plan) => (
                  <div key={plan.name} className="home-benefit-item">
                    <div className="home-benefit-label">
                      <IconV2 name={plan.icon as any} size={16} color="neutral-medium" />
                      <BodyText size="small" color="neutral-strong">{plan.name}</BodyText>
                    </div>
                    <ProgressBar current={plan.current} total={plan.total} />
                  </div>
                ))}
              </div>
              <div className="home-benefit-footer">
                <TextButton size="small">6 other plan types...</TextButton>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Time Off Used */}
        <Gridlet header={<Gridlet.Header title="Time Off Used" icon="id-card-clip-regular" />}>
          <Gridlet.Body>
            <div className="home-tou-body">
              <Button variant="outlined" color="secondary" size="small" endIcon={<IconV2 name="chevron-down-solid" size={12} />}>
                Vacation
              </Button>
              <div className="home-tou-chart">
                <svg viewBox="0 0 280 100" width="100%" height="100%">
                  <polyline
                    points="0,72 46,80 92,65 138,62 184,55 230,48 280,32"
                    fill="none"
                    stroke="#2e7918"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="72" r="4" fill="#2e7918" />
                  <circle cx="280" cy="32" r="5" fill="white" stroke="#2e7918" strokeWidth="2" />
                  <text x="0" y="98" fontSize="11" fill="#777270">Jan</text>
                  <text x="254" y="98" fontSize="11" fill="#777270">Jul</text>
                </svg>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

      </div>

      {/* ── Row: Candidates With Offers | Time Off Requests ── */}
      <div className="home-bottom-row">

        {/* Candidates With Offers */}
        <Gridlet header={<Gridlet.Header title="Candidates With Offers" icon="file-signature-regular" />}>
          <Gridlet.Body>
            <div className="home-onboarding-body">
              <BodyText size="small" weight="semibold" color="primary">Offers Pending</BodyText>
              <div className="home-onboarding-card">
                <div className="home-onboarding-card-header">
                  <IconV2 name="people-group-regular" size={16} color="neutral-medium" />
                  <BodyText size="medium" weight="semibold" color="neutral-strong">4 candidates</BodyText>
                </div>
              </div>
              <BodyText size="small" weight="semibold" color="primary">Offers Accepted</BodyText>
              <div className="home-onboarding-card">
                <div className="home-onboarding-card-header">
                  <IconV2 name="people-group-regular" size={16} color="neutral-medium" />
                  <BodyText size="medium" weight="semibold" color="neutral-strong">5 candidates</BodyText>
                </div>
                <BodyText size="small" color="neutral-weak">In the last 30 days</BodyText>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

        {/* Time Off Requests */}
        <Gridlet header={<Gridlet.Header title="Time Off Requests" icon="calendar-clock-regular" />}>
          <Gridlet.Body>
            <div className="home-tofr-body">
              <div className="home-tofr-stat">
                <div className="home-tofr-stat-number">
                  <IconV2 name="alarm-clock-regular" size={40} color="neutral-medium" />
                  <Headline size="large" color="neutral-strong">13</Headline>
                </div>
                <BodyText size="small" color="neutral-weak">Urgent Requests</BodyText>
              </div>
              <Divider />
              <div className="home-tofr-stat">
                <div className="home-tofr-stat-number">
                  <IconV2 name="calendar-clock-regular" size={40} color="neutral-medium" />
                  <Headline size="large" color="neutral-strong">4</Headline>
                </div>
                <BodyText size="small" color="neutral-weak">Other Requests</BodyText>
              </div>
            </div>
          </Gridlet.Body>
        </Gridlet>

      </div>
    </div>
  );
}

export default Home;
