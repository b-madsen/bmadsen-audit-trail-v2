import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconV2, BodyText, Avatar } from '@bamboohr/fabric';
import { useTheme } from '../contexts/ThemeContext';
import avatarSmall from '../../assets/images/avatar-small.png';

const NAV_STORAGE_KEY = 'bhr-nav-expanded';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/my-info', label: 'Profile', icon: 'circle-user' },
  { path: '/people', label: 'People', icon: 'user-group' },
  { path: '/hiring', label: 'Hiring', icon: 'id-badge' },
  { path: '/reports', label: 'Reports', icon: 'chart-pie-simple' },
  { path: '/files', label: 'Files', icon: 'file-lines' },
  { path: '/payroll', label: 'Payroll', icon: 'circle-dollar' },
];

interface GlobalNavProps {
  className?: string;
}

export function GlobalNav({ className = '' }: GlobalNavProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem(NAV_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  useEffect(() => {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(isExpanded));
  }, [isExpanded]);

  const effectiveExpanded = isTablet ? false : isExpanded;

  const toggleNav = () => {
    if (!isTablet) {
      setIsExpanded(!isExpanded);
    }
  };

  const getIconName = (icon: string, isActive: boolean) => {
    return isActive ? `${icon}-solid` : `${icon}-regular`;
  };

  return (
    <nav
      className={`fixed left-0 top-0 h-full z-50 flex flex-col justify-between bg-[var(--fabric-surface-color-neutral-white)] pt-6 pb-10 px-8 transition-[width] duration-300 ease-in-out ${effectiveExpanded ? 'w-[240px] delay-0' : 'w-[120px] delay-[50ms]'} ${className}`}
    >
      {/* Top Section - Nav Items */}
      <div className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center rounded-lg transition-colors duration-200 ${effectiveExpanded ? 'gap-4 px-4 py-4' : 'w-14 h-14 justify-center'} ${isActive ? 'bg-[var(--fabric-surface-color-neutral-extra-weak)]' : 'hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)]'}`}
            >
              <IconV2
                name={getIconName(item.icon, isActive) as any}
                size={24}
                color={isActive ? 'primary-strong' : 'neutral-strong'}
              />
              <span
                className={`font-medium text-base leading-6 whitespace-nowrap transition-opacity duration-300 ${effectiveExpanded ? 'opacity-100 delay-[50ms]' : 'opacity-0 w-0 overflow-hidden delay-0'}`}
              >
                <BodyText weight="medium" color={isActive ? 'neutral-strong' : 'neutral-weak'}>
                  {item.label}
                </BodyText>
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Section - Theme Toggle, Account, and Expand/Collapse */}
      <div className="flex flex-col gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center rounded-lg transition-colors duration-200 hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] ${effectiveExpanded ? 'gap-4 px-4 py-4' : 'w-14 h-14 justify-center'}`}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <IconV2
            name={isDark ? 'sun-solid' : 'moon-solid'}
            size={24}
            color="neutral-strong"
          />
          <span
            className={`transition-opacity duration-300 ${effectiveExpanded ? 'opacity-100 delay-[50ms]' : 'opacity-0 w-0 overflow-hidden delay-0'}`}
          >
            <BodyText weight="medium" color="neutral-strong">
              {isDark ? 'Light mode' : 'Dark mode'}
            </BodyText>
          </span>
        </button>

        {/* Account */}
        <NavLink
          to="/my-info"
          className={`flex items-center bg-[var(--fabric-surface-color-neutral-extra-weak)] rounded-lg transition-colors duration-200 hover:bg-[var(--fabric-surface-color-neutral-weak)] ${effectiveExpanded ? 'gap-4 px-4 py-3' : 'w-14 h-14 justify-center'}`}
        >
          <Avatar src={avatarSmall} alt="Account" size={32} />
          <span
            className={`transition-opacity duration-300 ${effectiveExpanded ? 'opacity-100 delay-[50ms]' : 'opacity-0 w-0 overflow-hidden delay-0'}`}
          >
            <BodyText weight="medium" color="neutral-strong">
              Account
            </BodyText>
          </span>
        </NavLink>

        {/* Expand/Collapse Button - hidden on tablet */}
        {!isTablet && (
          <button
            onClick={toggleNav}
            className={`flex items-center bg-[var(--fabric-surface-color-neutral-extra-weak)] rounded-lg transition-colors duration-200 hover:bg-[var(--fabric-surface-color-neutral-extra-extra-weak)] ${effectiveExpanded ? 'gap-4 px-4 py-4' : 'w-14 h-14 justify-center'}`}
            aria-label={effectiveExpanded ? 'Collapse navigation' : 'Expand navigation'}
          >
            <IconV2
              name={effectiveExpanded ? 'arrow-left-from-line-solid' : 'arrow-right-from-line-solid'}
              size={24}
              color="neutral-strong"
            />
            <span
              className={`transition-opacity duration-300 ${effectiveExpanded ? 'opacity-100 delay-[50ms]' : 'opacity-0 w-0 overflow-hidden delay-0'}`}
            >
              <BodyText weight="medium" color="neutral-strong">
                Collapse
              </BodyText>
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default GlobalNav;
