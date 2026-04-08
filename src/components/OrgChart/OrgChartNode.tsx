import { IconV2, BodyText } from '@bamboohr/fabric';
import type { Employee } from '../../data/employees';
import { TBHCard } from './TBHCard';

export interface OrgChartNodeProps {
  employee: Employee;
  isSelected?: boolean;
  isFocused?: boolean;
  onPinClick?: (id: number) => void;
  onExpandClick?: (id: number) => void;
  onNodeClick?: (id: number) => void;
  showPhoto?: boolean;
  compact?: boolean;
  isExpanded?: boolean;
}

export const NODE_WIDTH = 185;
export const NODE_HEIGHT = 185;


export function OrgChartNode({
  employee,
  isSelected = false,
  isFocused = false,
  onPinClick,
  onExpandClick,
  onNodeClick,
  showPhoto = true,
  compact: _compact = false,
  isExpanded = true,
}: OrgChartNodeProps) {
  if (employee.isTBH) {
    return <TBHCard title={employee.title} count={employee.tbhCount || 1} />;
  }

  const cardClasses = [
    'org-node__card',
    isSelected && 'org-node__card--selected',
    isFocused && 'org-node__card--focused',
  ].filter(Boolean).join(' ');

  return (
    <div className="org-node">
      {/* Avatar */}
      {showPhoto && (
        <div className="org-node__avatar">
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} />
          ) : (
            <div className="org-node__avatar-placeholder">
              <IconV2 name="user-solid" size={20} color="neutral-extra-weak" />
            </div>
          )}
        </div>
      )}

      {/* Card */}
      <div
        className={cardClasses}
        onClick={() => onNodeClick?.(employee.id)}
      >
        {/* Top row - pin and chevron icons */}
        <div className="org-node__top-row">
          <button
            className="org-node__icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPinClick?.(employee.id);
            }}
            aria-label="Pin employee"
          >
            <IconV2 name="thumbtack-solid" size={12} color="neutral-medium" />
          </button>

          {employee.directReports > 0 && (
            <button
              className="org-node__icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onExpandClick?.(employee.id);
              }}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <IconV2
                name={isExpanded ? 'chevron-up-solid' : 'chevron-down-solid'}
                size={12}
                color="neutral-medium"
              />
            </button>
          )}
        </div>

        {/* Content - name and title using BodyText */}
        <div className="org-node__content">
          <div className="org-node__name">{employee.name}</div>
          <span className="org-node__title">
            <BodyText size="extra-small" color="neutral-strong">{employee.title}</BodyText>
          </span>
          <span className="org-node__department">
            <BodyText size="extra-small" color="neutral-medium">{employee.department}</BodyText>
          </span>
        </div>

        {/* Bottom right - Direct reports count */}
        <div className="org-node__bottom-row">
          {employee.directReports > 0 && (
            <button
              className="org-node__reports-btn"
              onClick={(e) => {
                e.stopPropagation();
                onExpandClick?.(employee.id);
              }}
            >
              <span className="org-node__reports-count">
                <BodyText size="extra-small" color="neutral-strong">{employee.directReports}</BodyText>
              </span>
              <IconV2
                name={isExpanded ? 'chevron-down-solid' : 'chevron-up-solid'}
                size={12}
                color="neutral-medium"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
