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
const AVATAR_SIZE = 64;
const AVATAR_OFFSET = 32;

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

  return (
    <div style={{ position: 'relative', width: NODE_WIDTH, height: NODE_HEIGHT }}>
      {/* Avatar — overhangs top of card */}
      {showPhoto && (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: 12,
          top: 0,
          overflow: 'hidden',
          zIndex: 2,
          background: '#9d9490',
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        }}>
          {employee.avatar ? (
            <img
              src={employee.avatar}
              alt={employee.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#9d9490',
            }}>
              <IconV2 name="circle-user-regular" size={36} color="neutral-forcedwhite" />
            </div>
          )}
        </div>
      )}

      {/* Card */}
      <div
        onClick={() => onNodeClick?.(employee.id)}
        style={{
          position: 'absolute',
          width: NODE_WIDTH,
          top: AVATAR_OFFSET,
          borderRadius: 8,
          border: isSelected ? '2px solid #2e7918' : '1px solid #e4e3e0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          background: '#ffffff',
          padding: '8px 8px 6px',
          cursor: 'pointer',
          outline: isFocused ? '2px solid #2e7918' : 'none',
          outlineOffset: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Top icons: pin left, chevron right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <button
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', lineHeight: 1 }}
            onClick={(e) => { e.stopPropagation(); onPinClick?.(employee.id); }}
            aria-label="Pin"
          >
            <IconV2 name="thumbtack-regular" size={12} color="neutral-medium" />
          </button>

          {employee.directReports > 0 && (
            <button
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', lineHeight: 1 }}
              onClick={(e) => { e.stopPropagation(); onExpandClick?.(employee.id); }}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <IconV2
                name={isExpanded ? 'chevron-up-regular' : 'chevron-down-regular'}
                size={12}
                color="neutral-medium"
              />
            </button>
          )}
        </div>

        {/* Employee info */}
        <div style={{ textAlign: 'center', paddingTop: 14 }}>
          {/* Name */}
          <div style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '20px',
            color: '#2e7918',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {employee.name}
          </div>

          {/* Title */}
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '18px' }}>
            <BodyText size="extra-small" color="neutral-strong">{employee.title}</BodyText>
          </div>

          {/* Department */}
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: '18px' }}>
            <BodyText size="extra-small" color="neutral-medium">{employee.department}</BodyText>
          </div>

          {/* More... */}
          <div style={{ lineHeight: '18px' }}>
            <BodyText size="extra-small" color="neutral-weak">More...</BodyText>
          </div>
        </div>

        {/* Bottom: direct reports count + chevron */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 6, minHeight: 16 }}>
          {employee.directReports > 0 && (
            <button
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}
              onClick={(e) => { e.stopPropagation(); onExpandClick?.(employee.id); }}
            >
              <BodyText size="extra-small" color="neutral-strong">{employee.directReports}</BodyText>
              <IconV2
                name={isExpanded ? 'chevron-down-regular' : 'chevron-up-regular'}
                size={10}
                color="neutral-medium"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
