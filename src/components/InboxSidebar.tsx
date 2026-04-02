import { useState } from 'react';
import { IconV2, BodyText, Divider } from '@bamboohr/fabric';
import type { InboxTab, InboxSubItem } from '../data/inboxData';

interface InboxSidebarProps {
  tabs: InboxTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function InboxSidebar({ tabs, activeTab, onTabChange }: InboxSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['assigned-to-me', 'inbox', 'approvals'])
  );

  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Convert icon name to Fabric format
  const getFabricIconName = (iconName: string) => {
    if (iconName.includes('-solid') || iconName.includes('-regular')) {
      return iconName;
    }
    return `${iconName}-solid`;
  };

  // Render a sub-item recursively
  const renderSubItem = (item: InboxSubItem) => {
    const isActive = activeTab === item.id;
    const isExpanded = expandedSections.has(item.id);
    const hasChildren = item.subItems && item.subItems.length > 0;
    const hasIcon = !!item.icon;

    const marginLeft = hasIcon ? '0px' : '24px';

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            onTabChange(item.id);
          }}
          className="flex items-center transition-colors cursor-pointer border-none outline-none text-left w-full py-2 px-3 rounded-lg gap-2 bg-transparent"
          style={{ marginLeft }}
        >
          {/* Icon */}
          {hasIcon && (
            <IconV2
              name={getFabricIconName(item.icon!) as any}
              size={16}
              color={isActive ? 'primary-strong' : 'neutral-strong'}
            />
          )}

          {/* Label with count in parentheses */}
          <span className="flex-1">
            <BodyText
              size="small"
              weight={isActive ? 'bold' : 'regular'}
              color={isActive ? 'primary' : 'neutral-weak'}
            >
              {item.label}
              {item.count !== undefined && item.count > 0 && ` (${item.count})`}
            </BodyText>
          </span>
        </button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col gap-0.5 mt-0.5">
            {item.subItems?.map((subItem) => renderSubItem(subItem))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="shrink-0 w-[264px]">
      <div className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isExpanded = expandedSections.has(tab.id);
          const hasSubItems = tab.subItems && tab.subItems.length > 0;

          return (
            <div key={tab.id}>
              {/* Top-level item */}
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(tab.id);
                  }
                  onTabChange(tab.id);
                }}
                className="flex items-center transition-colors cursor-pointer border-none outline-none text-left w-[264px] py-2 px-3 rounded-lg gap-2 bg-transparent"
              >
                {/* Icon */}
                {tab.icon && (
                  <IconV2
                    name={getFabricIconName(tab.icon) as any}
                    size={16}
                    color="neutral-strong"
                  />
                )}

                {/* Label with inline caret */}
                <span className="flex items-center gap-1">
                  <BodyText size="small" color="neutral-strong">
                    {tab.label}
                  </BodyText>
                  {tab.hasDropdown && (
                    <IconV2
                      name={isExpanded ? 'chevron-up-solid' : 'chevron-down-solid'}
                      size={12}
                      color="neutral-medium"
                    />
                  )}
                </span>
              </button>

              {/* Divider after top-level item */}
              <div className="my-2">
                <Divider />
              </div>

              {/* Sub-items */}
              {hasSubItems && isExpanded && (
                <div className="flex flex-col gap-0.5">
                  {tab.subItems?.map((subItem) => {
                    const isInbox = subItem.id === 'inbox';
                    const isCompleted = subItem.id === 'completed';

                    return (
                      <div key={subItem.id}>
                        {renderSubItem(subItem)}

                        {/* Divider after Inbox section */}
                        {isInbox && (
                          <div className="my-2">
                            <Divider />
                          </div>
                        )}

                        {/* Divider after Completed */}
                        {isCompleted && (
                          <div className="my-2">
                            <Divider />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InboxSidebar;
