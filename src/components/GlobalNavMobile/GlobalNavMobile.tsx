import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconV2, BodyText, Avatar, Tooltip, GlobalNavigation } from '@bamboohr/fabric';
import './GlobalNavMobile.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  iconStyle?: 'regular' | 'solid';
  count?: number;
  children?: NavItem[];
  subtitle?: string;
  dividerAfter?: boolean;
  defaultPage?: string; // When set, clicking the parent navigates to this page instead of just expanding
}

interface GlobalNavMobileProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  onClose?: () => void;
  defaultCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
  isOverlay?: boolean;
  onOverlayClose?: () => void;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'house-regular' },
  { id: 'my-info', label: 'My Info', icon: 'circle-user-regular' },
  { id: 'recognition', label: 'Recognition', icon: 'award-regular' },
  {
    id: 'people',
    label: 'People',
    icon: 'users-regular',
    defaultPage: 'people-list',
    children: [
      { id: 'people-directory', label: 'Directory', icon: 'address-book-regular' },
      { id: 'people-org-chart', label: 'Org Chart', icon: 'sitemap-regular' },
    ],
  },
  {
    id: 'hiring',
    label: 'Hiring',
    icon: 'id-badge-regular',
    defaultPage: 'job-openings',
    children: [
      { id: 'candidates', label: 'Candidates', icon: 'user-group-regular' },
      { id: 'talent-pools', label: 'Talent Pools', icon: 'users-rectangle-regular' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'chart-pie-simple-regular',
    defaultPage: 'reports-recent',
    children: [
      { id: 'reports-standard', label: 'Standard Reports', icon: 'file-chart-column-regular' },
      { id: 'reports-benchmarks', label: 'Benchmarks', icon: 'chart-line-regular' },
      { id: 'reports-custom', label: 'Custom Reports', icon: 'file-pen-regular' },
      { id: 'reports-new-custom', label: 'New Custom Reports', icon: 'file-circle-plus-regular' },
      { id: 'reports-signed-documents', label: 'Signed Documents', icon: 'file-signature-regular' },
    ],
  },
  {
    id: 'files',
    label: 'Files',
    icon: 'file-lines-solid',
    defaultPage: 'files',
    children: [
      { id: 'signature-templates', label: 'Signature Templates', icon: 'signature-regular' },
      { id: 'benefits-docs', label: 'Benefits Docs', icon: 'folder-user-regular', count: 137 },
      { id: 'payroll-files', label: 'Payroll', icon: 'folder-regular', count: 12 },
      { id: 'trainings', label: 'Trainings', icon: 'folder-regular', count: 23 },
      { id: 'company-policies', label: 'Company Policies', icon: 'folder-user-regular', count: 7 },
    ],
  },
  { id: 'payroll', label: 'Payroll', icon: 'circle-dollar-regular' },
  { id: 'benefits', label: 'Benefits', icon: 'heart-pulse-regular' },
  {
    id: 'compensation',
    label: 'Compensation',
    icon: 'money-bill-wave-regular',
    defaultPage: 'compensation-levels',
    children: [
      { id: 'compensation-total-rewards', label: 'Total Rewards', icon: 'gift-regular' },
      { id: 'compensation-more', label: 'More', icon: 'ellipsis-regular' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: 'bee-regular',
    children: [
      { id: 'community-feed', label: 'My feed', icon: 'rss-regular' },
      { id: 'community-groups', label: 'Groups', icon: 'people-group-regular' },
      { id: 'community-members', label: 'Members', icon: 'users-regular' },
      { id: 'community-events', label: 'Events', icon: 'calendar-regular' },
      { id: 'community-resources', label: 'Resources', icon: 'book-open-regular' },
    ],
  },
  { id: 'global-employment', label: 'Global Employment', icon: 'globe-regular', subtitle: 'Powered by Remote', dividerAfter: true },
  { id: 'resources', label: 'Resources', icon: 'circle-question-regular' },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'gear-regular',
    defaultPage: 'settings-account',
    children: [
      { id: 'settings-access-levels', label: 'Access Levels', icon: 'lock-regular' },
      { id: 'settings-employee-fields', label: 'Employee Fields', icon: 'input-text-regular' },
      { id: 'settings-approvals', label: 'Approvals', icon: 'check-double-regular' },
      { id: 'settings-apps', label: 'Apps', icon: 'grid-2-regular' },
      { id: 'settings-ask-bamboohr', label: 'Ask BambooHR', icon: 'message-bot-regular' },
      { id: 'settings-benefits', label: 'Benefits', icon: 'heart-pulse-regular' },
      { id: 'settings-company-directory', label: 'Company Directory', icon: 'address-book-regular' },
      { id: 'settings-compensation', label: 'Compensation', icon: 'money-bill-wave-regular' },
      { id: 'settings-custom-fields', label: 'Custom Fields & Tables', icon: 'table-regular' },
      { id: 'settings-email-alerts', label: 'Email Alerts', icon: 'envelope-regular' },
      { id: 'settings-employee-community', label: 'Employee Community', icon: 'bee-regular' },
      { id: 'settings-employee-satisfaction', label: 'Employee Satisfaction', icon: 'face-smile-regular' },
      { id: 'settings-employee-wellbeing', label: 'Employee Wellbeing', icon: 'spa-regular' },
      { id: 'settings-global-employment', label: 'Global Employment', icon: 'globe-regular' },
      { id: 'settings-hiring', label: 'Hiring', icon: 'id-badge-regular' },
      { id: 'settings-holidays', label: 'Holidays', icon: 'calendar-star-regular' },
      { id: 'settings-logo-color', label: 'Logo & Color', icon: 'palette-regular' },
      { id: 'settings-offboarding', label: 'Offboarding', icon: 'door-open-regular' },
      { id: 'settings-onboarding', label: 'Onboarding', icon: 'handshake-regular' },
      { id: 'settings-payroll', label: 'Payroll', icon: 'circle-dollar-regular' },
      { id: 'settings-performance', label: 'Performance', icon: 'chart-line-up-regular' },
      { id: 'settings-time-off', label: 'Time Off', icon: 'island-tropical-regular' },
      { id: 'settings-time-tracking', label: 'Time Tracking', icon: 'clock-regular' },
      { id: 'settings-total-rewards', label: 'Total Rewards', icon: 'gift-regular' },
      { id: 'settings-training', label: 'Training', icon: 'graduation-cap-regular' },
    ],
  },
];

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  dividerAfter?: boolean;
}

const profileMenuItems: ProfileMenuItem[] = [
  { id: 'account-settings', label: 'Account Settings', icon: 'gear-regular' },
  { id: 'change-password', label: 'Change Password', icon: 'lock-regular' },
  { id: '2-step-login', label: '2-Step Login', icon: 'shield-check-regular' },
  { id: 'passkeys', label: 'Passkeys', icon: 'key-regular', dividerAfter: true },
  { id: 'app-integrations', label: 'App Integrations', icon: 'grid-2-regular' },
  { id: 'api-keys', label: 'API Keys', icon: 'code-regular', dividerAfter: true },
  { id: 'logout', label: 'Logout', icon: 'arrow-right-from-bracket-regular' },
];

export function GlobalNavMobile({ activeItem = 'files', onItemClick, onClose, defaultCollapsed = false, onCollapseChange, isOverlay = false, onOverlayClose }: GlobalNavMobileProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['files']));
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [flyoutItem, setFlyoutItem] = useState<string | null>(null);
  const [flyoutPosition, setFlyoutPosition] = useState<{ top: number; bottom?: number; flipped: boolean } | null>(null);
  const [isProfileFlyoutOpen, setIsProfileFlyoutOpen] = useState(false);
  const [profileFlyoutPosition, setProfileFlyoutPosition] = useState<{ top: number; bottom?: number; left?: number; width?: number; flipped: boolean; isExpanded?: boolean } | null>(null);
  const navListRef = useRef<HTMLElement>(null);
  const profileSheetRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const profileFlyoutRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const flyoutCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileFlyoutCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle click outside to close profile sheet
  useEffect(() => {
    if (!isProfileSheetOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileSheetRef.current && !profileSheetRef.current.contains(target)) {
        setIsProfileSheetOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileSheetOpen]);

  // Handle click outside to close flyout
  useEffect(() => {
    if (!flyoutItem) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (flyoutRef.current && !flyoutRef.current.contains(target)) {
        setFlyoutItem(null);
        setFlyoutPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [flyoutItem]);

  // Close flyout on Escape
  useEffect(() => {
    if (!flyoutItem) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFlyoutItem(null);
        setFlyoutPosition(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [flyoutItem]);

  // Handle click outside to close profile flyout
  useEffect(() => {
    if (!isProfileFlyoutOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Don't close if clicking the profile button (let the button handler toggle)
      if (profileButtonRef.current && profileButtonRef.current.contains(target)) {
        return;
      }
      if (profileFlyoutRef.current && !profileFlyoutRef.current.contains(target)) {
        setIsProfileFlyoutOpen(false);
        setProfileFlyoutPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileFlyoutOpen]);

  // Close profile flyout on Escape
  useEffect(() => {
    if (!isProfileFlyoutOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileFlyoutOpen(false);
        setProfileFlyoutPosition(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isProfileFlyoutOpen]);

  // Handle Escape key to close profile sheet
  useEffect(() => {
    if (!isProfileSheetOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileSheetOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isProfileSheetOpen]);

  const handleScroll = () => {
    const el = navListRef.current;
    if (!el) return;

    setShowTopFade(el.scrollTop > 0);
    const hasMoreBelow = el.scrollHeight - el.scrollTop - el.clientHeight > 1;
    setShowBottomFade(hasMoreBelow);
  };

  useEffect(() => {
    const el = navListRef.current;
    if (el) {
      handleScroll();
    }
  }, [expandedItems]);

  const toggleExpand = (itemId: string) => {
    if (expandedItems.has(itemId)) {
      setExpandedItems(new Set());
    } else {
      setExpandedItems(new Set([itemId]));
    }
  };

  const handleItemClick = (item: NavItem) => {
    if (isCollapsed && item.children) {
      return;
    } else if (item.children && item.defaultPage) {
      // Items with defaultPage: navigate to the default page and expand accordion
      toggleExpand(item.id);
      setFlyoutItem(null);
      setFlyoutPosition(null);
      onItemClick?.(item.defaultPage);
      if (isOverlay) {
        onOverlayClose?.();
      }
    } else if (item.children) {
      toggleExpand(item.id);
    } else {
      setFlyoutItem(null);
      setFlyoutPosition(null);
      onItemClick?.(item.id);
      // Close overlay when an item is clicked
      if (isOverlay) {
        onOverlayClose?.();
      }
    }
  };

  const handleNavItemHover = (item: NavItem, event: React.MouseEvent) => {
    if (!isCollapsed || !item.children) return;

    if (flyoutCloseTimeoutRef.current) {
      clearTimeout(flyoutCloseTimeoutRef.current);
      flyoutCloseTimeoutRef.current = null;
    }

    setIsProfileFlyoutOpen(false);
    setProfileFlyoutPosition(null);

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const childCount = item.children.length;
    const headerHeight = 44;
    const itemHeight = 40;
    const padding = 16;
    const dividerHeight = item.children.some(c => c.count) && item.children.some(c => !c.count) ? 9 : 0;
    const estimatedHeight = headerHeight + (childCount * itemHeight) + padding + dividerHeight;

    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.top;
    const spaceAbove = rect.bottom;

    const shouldFlip = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

    if (shouldFlip) {
      setFlyoutPosition({
        top: 0,
        bottom: viewportHeight - rect.bottom,
        flipped: true
      });
    } else {
      setFlyoutPosition({ top: rect.top, flipped: false });
    }
    setFlyoutItem(item.id);
  };

  const handleFlyoutItemClick = (childId: string) => {
    setFlyoutItem(null);
    setFlyoutPosition(null);
    onItemClick?.(childId);
  };

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    setFlyoutItem(null);
    setFlyoutPosition(null);
    setIsProfileFlyoutOpen(false);
    setProfileFlyoutPosition(null);
    if (newCollapsed) {
      setExpandedItems(new Set());
    }
    onCollapseChange?.(newCollapsed);
  };

  const handleProfileClick = (event: React.MouseEvent) => {
    // Toggle flyout
    if (isProfileFlyoutOpen) {
      setIsProfileFlyoutOpen(false);
      setProfileFlyoutPosition(null);
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    if (effectiveCollapsed) {
      // Collapsed mode: position to the right of the button
      const itemHeight = 40;
      const dividerCount = profileMenuItems.filter(item => item.dividerAfter).length;
      const estimatedHeight = (profileMenuItems.length * itemHeight) + (dividerCount * 17) + 16;

      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.top;
      const spaceAbove = rect.bottom;

      const shouldFlip = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

      if (shouldFlip) {
        setProfileFlyoutPosition({
          top: 0,
          bottom: viewportHeight - rect.bottom,
          flipped: true,
          isExpanded: false
        });
      } else {
        setProfileFlyoutPosition({ top: rect.top, flipped: false, isExpanded: false });
      }
    } else {
      // Expanded mode: position above the profile button, aligned to the sidebar
      setProfileFlyoutPosition({
        top: 0,
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
        width: rect.width,
        flipped: true,
        isExpanded: true
      });
    }
    setIsProfileFlyoutOpen(true);
  };

  const handleProfileHover = (event: React.MouseEvent) => {
    if (!isCollapsed) return;

    if (profileFlyoutCloseTimeoutRef.current) {
      clearTimeout(profileFlyoutCloseTimeoutRef.current);
      profileFlyoutCloseTimeoutRef.current = null;
    }

    setFlyoutItem(null);
    setFlyoutPosition(null);

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const headerHeight = 70;
    const itemHeight = 40;
    const dividerCount = profileMenuItems.filter(item => item.dividerAfter).length;
    const estimatedHeight = headerHeight + (profileMenuItems.length * itemHeight) + (dividerCount * 17) + 16;

    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.top;
    const spaceAbove = rect.bottom;

    const shouldFlip = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

    if (shouldFlip) {
      setProfileFlyoutPosition({
        top: 0,
        bottom: viewportHeight - rect.bottom,
        flipped: true
      });
    } else {
      setProfileFlyoutPosition({ top: rect.top, flipped: false });
    }
    setIsProfileFlyoutOpen(true);
  };

  const getFlyoutItemData = (): NavItem | undefined => {
    if (!flyoutItem) return undefined;
    return [...mainNavItems, ...footerNavItems].find(item => item.id === flyoutItem);
  };

  const renderNavItem = (item: NavItem, isChild = false) => {
    const isActive = activeItem === item.id || (item.defaultPage && activeItem === item.defaultPage);
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isFlyoutOpen = flyoutItem === item.id;

    const primaryChildren = item.children?.filter(c => !c.count) || [];
    const secondaryChildren = item.children?.filter(c => c.count) || [];

    const isExpandedAccordion = hasChildren && isExpanded && !effectiveCollapsed;

    if (effectiveCollapsed && !isChild) {
      const buttonContent = (
        <button
          className={`global-nav-item global-nav-item--collapsed ${isActive ? 'global-nav-item--active' : ''} ${isFlyoutOpen ? 'global-nav-item--flyout-open' : ''}`}
          onClick={() => handleItemClick(item)}
          onMouseEnter={(e) => hasChildren && handleNavItemHover(item, e)}
          onMouseLeave={() => {
            if (hasChildren && flyoutItem === item.id) {
              flyoutCloseTimeoutRef.current = setTimeout(() => {
                setFlyoutItem(null);
                setFlyoutPosition(null);
              }, 100);
            }
          }}
        >
          <div className="global-nav-item-icon">
            <IconV2
              name={isActive ? item.icon.replace('-regular', '-solid') as any : item.icon as any}
              size={20}
              color={isActive ? 'primary-strong' : 'neutral-extra-strong'}
            />
          </div>
        </button>
      );

      return (
        <div key={item.id} className="global-nav-item-wrapper global-nav-item-wrapper--collapsed">
          {hasChildren ? (
            buttonContent
          ) : (
            <Tooltip content={item.label} placement="right">
              {buttonContent}
            </Tooltip>
          )}
        </div>
      );
    }

    return (
      <div key={item.id} className="global-nav-item-wrapper">
        <button
          className={`global-nav-item ${isActive ? 'global-nav-item--active' : ''} ${isExpandedAccordion ? 'global-nav-item--expanded' : ''} ${isChild ? 'global-nav-item--child' : ''} ${item.subtitle ? 'global-nav-item--with-subtitle' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <div className="global-nav-item-icon">
            <IconV2
              name={isActive ? item.icon.replace('-regular', '-solid') as any : item.icon as any}
              size={20}
              color={isActive ? 'primary-strong' : 'neutral-extra-strong'}
            />
          </div>
          <div className="global-nav-item-content">
            <BodyText
              size="medium"
              weight={isActive ? 'bold' : isChild && item.count ? 'regular' : 'medium'}
              color={isActive ? 'primary' : 'neutral-strong'}
            >
              {item.label}
              {item.count !== undefined && ` (${item.count})`}
            </BodyText>
            {item.subtitle && (
              <BodyText size="extra-small" color="neutral-medium">
                {item.subtitle}
              </BodyText>
            )}
          </div>
          {hasChildren && (
            <div className="global-nav-item-caret">
              <IconV2
                name={isExpanded ? 'angle-up-solid' : 'angle-down-solid'}
                size={16}
                color="neutral-medium"
              />
            </div>
          )}
        </button>

        {hasChildren && isExpanded && !effectiveCollapsed && (
          <div className="global-nav-children">
            {primaryChildren.map((child) => {
              const isChildActive = activeItem === child.id;
              return (
                <button
                  key={child.id}
                  className={`global-nav-item global-nav-item--child ${isChildActive ? 'global-nav-item--active' : ''}`}
                  onClick={() => {
                    onItemClick?.(child.id);
                    if (isOverlay) {
                      onOverlayClose?.();
                    }
                  }}
                >
                  <div className="global-nav-item-icon">
                    <IconV2
                      name={isChildActive ? child.icon.replace('-regular', '-solid') as any : child.icon as any}
                      size={20}
                      color={isChildActive ? 'primary-strong' : 'neutral-extra-strong'}
                    />
                  </div>
                  <div className="global-nav-item-content">
                    <BodyText size="medium" weight={isChildActive ? 'bold' : 'medium'} color={isChildActive ? 'primary' : 'neutral-strong'}>
                      {child.label}
                    </BodyText>
                  </div>
                </button>
              );
            })}

            {primaryChildren.length > 0 && secondaryChildren.length > 0 && (
              <div className="global-nav-divider" />
            )}

            {secondaryChildren.map((child) => {
              const isChildActive = activeItem === child.id;
              return (
                <button
                  key={child.id}
                  className={`global-nav-item global-nav-item--child ${isChildActive ? 'global-nav-item--active' : ''}`}
                  onClick={() => {
                    onItemClick?.(child.id);
                    if (isOverlay) {
                      onOverlayClose?.();
                    }
                  }}
                >
                  <div className="global-nav-item-icon">
                    <IconV2
                      name={isChildActive ? child.icon.replace('-regular', '-solid') as any : child.icon as any}
                      size={20}
                      color={isChildActive ? 'primary-strong' : 'neutral-extra-strong'}
                    />
                  </div>
                  <div className="global-nav-item-content">
                    <BodyText size="medium" weight={isChildActive ? 'bold' : 'regular'} color={isChildActive ? 'primary' : 'neutral-strong'}>
                      {child.label} ({child.count})
                    </BodyText>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderFlyout = () => {
    const flyoutData = getFlyoutItemData();
    if (!flyoutData || !flyoutPosition || !flyoutData.children) return null;

    const primaryChildren = flyoutData.children.filter(c => !c.count);
    const secondaryChildren = flyoutData.children.filter(c => c.count);
    const isFlipped = flyoutPosition.flipped;

    const header = (
      <div className={`global-nav-flyout-header ${isFlipped ? 'global-nav-flyout-header--bottom' : ''}`}>
        <BodyText size="medium" weight="semibold" color="neutral-strong">
          {flyoutData.label}
        </BodyText>
      </div>
    );

    const items = (
      <div className="global-nav-flyout-items">
        {primaryChildren.map((child) => {
          const isChildActive = activeItem === child.id;
          return (
            <button
              key={child.id}
              className={`global-nav-flyout-item ${isChildActive ? 'global-nav-flyout-item--active' : ''}`}
              onClick={() => handleFlyoutItemClick(child.id)}
            >
              <div className="global-nav-flyout-item-icon">
                <IconV2
                  name={isChildActive ? child.icon.replace('-regular', '-solid') as any : child.icon as any}
                  size={16}
                  color={isChildActive ? 'primary-strong' : 'neutral-extra-strong'}
                />
              </div>
              <BodyText size="small" weight={isChildActive ? 'bold' : 'medium'} color={isChildActive ? 'primary' : 'neutral-strong'}>
                {child.label}
              </BodyText>
            </button>
          );
        })}

        {primaryChildren.length > 0 && secondaryChildren.length > 0 && (
          <div className="global-nav-flyout-divider" />
        )}

        {secondaryChildren.map((child) => {
          const isChildActive = activeItem === child.id;
          return (
            <button
              key={child.id}
              className={`global-nav-flyout-item ${isChildActive ? 'global-nav-flyout-item--active' : ''}`}
              onClick={() => handleFlyoutItemClick(child.id)}
            >
              <div className="global-nav-flyout-item-icon">
                <IconV2
                  name={isChildActive ? child.icon.replace('-regular', '-solid') as any : child.icon as any}
                  size={16}
                  color={isChildActive ? 'primary-strong' : 'neutral-extra-strong'}
                />
              </div>
              <BodyText size="small" weight={isChildActive ? 'bold' : 'regular'} color={isChildActive ? 'primary' : 'neutral-strong'}>
                {child.label} {child.count !== undefined && `(${child.count})`}
              </BodyText>
            </button>
          );
        })}
      </div>
    );

    const flyoutStyle = isFlipped
      ? { bottom: flyoutPosition.bottom }
      : { top: flyoutPosition.top };

    return (
      <div
        ref={flyoutRef}
        className={`global-nav-flyout ${isFlipped ? 'global-nav-flyout--flipped' : ''}`}
        style={flyoutStyle}
        onMouseEnter={() => {
          if (flyoutCloseTimeoutRef.current) {
            clearTimeout(flyoutCloseTimeoutRef.current);
            flyoutCloseTimeoutRef.current = null;
          }
        }}
        onMouseLeave={() => {
          flyoutCloseTimeoutRef.current = setTimeout(() => {
            setFlyoutItem(null);
            setFlyoutPosition(null);
          }, 100);
        }}
      >
        {isFlipped ? (
          <>
            {items}
            {header}
          </>
        ) : (
          <>
            {header}
            {items}
          </>
        )}
      </div>
    );
  };

  const renderProfileFlyout = () => {
    if (!profileFlyoutPosition) return null;

    const isFlipped = profileFlyoutPosition.flipped;
    const isExpanded = profileFlyoutPosition.isExpanded;

    const flyoutStyle: React.CSSProperties = isExpanded
      ? {
          bottom: profileFlyoutPosition.bottom,
        }
      : isFlipped
        ? { bottom: profileFlyoutPosition.bottom }
        : { top: profileFlyoutPosition.top };

    return (
      <div
        ref={profileFlyoutRef}
        className={`global-nav-flyout global-nav-flyout--profile ${isFlipped ? 'global-nav-flyout--flipped' : ''} ${isExpanded ? 'global-nav-flyout--expanded' : ''}`}
        style={flyoutStyle}
        onMouseEnter={() => {
          if (profileFlyoutCloseTimeoutRef.current) {
            clearTimeout(profileFlyoutCloseTimeoutRef.current);
            profileFlyoutCloseTimeoutRef.current = null;
          }
        }}
        onMouseLeave={() => {
          if (effectiveCollapsed) {
            profileFlyoutCloseTimeoutRef.current = setTimeout(() => {
              setIsProfileFlyoutOpen(false);
              setProfileFlyoutPosition(null);
            }, 100);
          }
        }}
      >
        <div className="global-nav-flyout-items">
          {profileMenuItems.map((item) => (
            <div key={item.id}>
              <button
                className="global-nav-flyout-item"
                onClick={() => {
                  setIsProfileFlyoutOpen(false);
                  setProfileFlyoutPosition(null);
                  onItemClick?.(item.id);
                  if (isOverlay) {
                    onOverlayClose?.();
                  }
                }}
              >
                <div className="global-nav-flyout-item-icon">
                  <IconV2
                    name={item.icon as any}
                    size={16}
                    color="neutral-extra-strong"
                  />
                </div>
                <BodyText size="small" weight="medium" color="neutral-strong">
                  {item.label}
                </BodyText>
              </button>
              {item.dividerAfter && <div className="global-nav-flyout-divider" />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const mainNavItems = navItems.slice(0, 11);
  const footerNavItems = navItems.slice(11);

  // In overlay mode, always show expanded nav (not collapsed)
  const effectiveCollapsed = isOverlay ? false : isCollapsed;

  const navContent = (
    <div className={`global-nav-mobile ${effectiveCollapsed ? 'global-nav-mobile--collapsed' : ''} ${isOverlay ? 'global-nav-mobile--overlay' : ''}`}>
      {isOverlay && (
        <button
          className="global-nav-overlay-close"
          onClick={onOverlayClose}
          aria-label="Close navigation"
        >
          <IconV2 name="xmark-regular" size={24} color="neutral-extra-strong" />
        </button>
      )}
      <div className={`global-nav-header ${!effectiveCollapsed && !isOverlay ? 'global-nav-header--expanded' : ''}`}>
        {isOverlay ? (
          <img
            src="/assets/images/bamboohr-logo.svg"
            alt="BambooHR"
            className="global-nav-overlay-logo"
          />
        ) : effectiveCollapsed ? (
          <GlobalNavigation.FooterItem
            ariaLabel="Expand navigation"
            onClick={toggleCollapse}
          >
            <IconV2
              name="bars-regular"
              size={20}
              color="neutral-extra-strong"
            />
          </GlobalNavigation.FooterItem>
        ) : (
          <>
            <img
              src="/assets/images/bamboohr-logo.svg"
              alt="BambooHR"
              className="global-nav-header-logo"
            />
            <button
              className="global-nav-close"
              aria-label={window.innerWidth > 1024 ? "Collapse navigation" : "Close navigation"}
              onClick={() => {
                if (window.innerWidth > 1024) {
                  toggleCollapse();
                } else {
                  onClose?.();
                }
              }}
            >
              <IconV2
                name={window.innerWidth > 1024 ? "angles-left-regular" : "xmark-regular"}
                size={20}
                color="neutral-extra-strong"
              />
            </button>
          </>
        )}
      </div>

      <div className={`global-nav-fade-top ${showTopFade ? 'global-nav-fade--visible' : ''}`} />

      <nav className={`global-nav-list ${effectiveCollapsed ? 'global-nav-list--collapsed' : ''}`} ref={navListRef} onScroll={handleScroll}>
        {mainNavItems.map((item) => renderNavItem(item))}
        <div className={`global-nav-section-divider ${effectiveCollapsed ? 'global-nav-section-divider--collapsed' : ''}`} />
        {footerNavItems.map((item) => (
          <div key={item.id}>
            {renderNavItem(item)}
            {item.dividerAfter && (
              <div className={`global-nav-section-divider ${effectiveCollapsed ? 'global-nav-section-divider--collapsed' : ''}`} />
            )}
          </div>
        ))}
      </nav>

      {effectiveCollapsed && flyoutItem && createPortal(renderFlyout(), document.body)}
      {isProfileFlyoutOpen && createPortal(renderProfileFlyout(), document.body)}

      <div className={`global-nav-fade-bottom ${showBottomFade ? 'global-nav-fade--visible' : ''}`} />
      <div className="global-nav-bottom-divider" />

      <div className={`global-nav-bottom-section ${effectiveCollapsed ? 'global-nav-bottom-section--collapsed' : ''}`}>
        <button
          ref={profileButtonRef}
          className={`global-nav-profile-button ${effectiveCollapsed ? 'global-nav-profile-button--collapsed' : ''} ${isProfileFlyoutOpen ? 'global-nav-profile-button--active' : ''}`}
          onClick={handleProfileClick}
          onMouseEnter={effectiveCollapsed ? handleProfileHover : undefined}
          onMouseLeave={() => {
            if (effectiveCollapsed && isProfileFlyoutOpen) {
              profileFlyoutCloseTimeoutRef.current = setTimeout(() => {
                setIsProfileFlyoutOpen(false);
                setProfileFlyoutPosition(null);
              }, 100);
            }
          }}
        >
          <Avatar src="https://i.pravatar.cc/48?u=jessica" size={40} />
          {!effectiveCollapsed && (
            <div className="global-nav-account-info">
              <BodyText size="medium" weight="medium" color="neutral-strong">
                Jessica Cordovoa
              </BodyText>
              <BodyText size="small" color="neutral-medium">
                HR Manager
              </BodyText>
            </div>
          )}
        </button>

      </div>
    </div>
  );

  // In overlay mode, wrap with backdrop and use portal
  if (isOverlay) {
    return createPortal(
      <>
        <div className="global-nav-overlay-backdrop" onClick={onOverlayClose} />
        {navContent}
      </>,
      document.body
    );
  }

  return navContent;
}

export default GlobalNavMobile;
