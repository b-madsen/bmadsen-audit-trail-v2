import React, { useMemo, useState, useRef, useEffect } from 'react';
import { IconV2, BodyText } from '@bamboohr/fabric';
import type { Employee } from '../../data/employees';
import { OrgChartNode } from './OrgChartNode';
import { buildVisibleTree, calculateTreeLayout } from '../../utils/orgChartLayout';
import type { TreeNode } from '../../utils/orgChartLayout';

export interface OrgChartTreeProps {
  employees: Employee[];
  rootEmployee: number | 'all';
  depth: number | 'all';
  focusedEmployee?: number;
  selectedEmployee?: number;
  expandedNodes?: Set<number>;
  onNodeSelect?: (id: number) => void;
  onNodeExpand?: (id: number) => void;
  onNodePin?: (id: number) => void;
  showPhotos?: boolean;
  compact?: boolean;
  zoomLevel?: number;
  panX?: number;
  panY?: number;
  onPanChange?: (x: number, y: number) => void;
  onZoomChange?: (zoom: number) => void;
}

export function OrgChartTree({
  employees,
  rootEmployee,
  depth,
  focusedEmployee,
  selectedEmployee,
  expandedNodes = new Set(),
  onNodeSelect,
  onNodeExpand,
  onNodePin,
  showPhotos = true,
  compact = false,
  zoomLevel = 1,
  panX = 0,
  panY = 0,
  onPanChange,
  onZoomChange,
}: OrgChartTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Calculate tree layout based on visible (expanded) nodes only
  const layout = useMemo(() => {
    const tree = buildVisibleTree(employees, rootEmployee, expandedNodes);
    return calculateTreeLayout(tree, depth);
  }, [employees, rootEmployee, depth, expandedNodes]);

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onPanChange?.(newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle wheel for zooming - zoom to cursor position
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (!containerRef.current) return;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(2, zoomLevel + delta));

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - panX) / zoomLevel;
    const worldY = (mouseY - panY) / zoomLevel;

    const newPanX = mouseX - worldX * newZoom;
    const newPanY = mouseY - worldY * newZoom;

    onZoomChange?.(newZoom);
    onPanChange?.(newPanX, newPanY);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
  }, [isDragging]);

  // Render connecting lines between nodes
  // Pattern: vertical drop from parent -> horizontal bar across children -> vertical rise to each child
  const renderConnections = () => {
    const lines: React.JSX.Element[] = [];
    const lineColor = '#cbd5e1';

    const processNode = (node: TreeNode) => {
      if (!expandedNodes.has(node.employee.id)) {
        return;
      }

      const children = node.children;
      if (children.length === 0) return;

      const parentCenterX = node.x;
      const parentBottomY = node.y + 140; // Visual card bottom (org-node CSS height)
      const midY = (parentBottomY + children[0].y) / 2;

      // 1. Vertical line from parent bottom center down to midpoint
      lines.push(
        <line
          key={`drop-${node.employee.id}`}
          x1={parentCenterX}
          y1={parentBottomY}
          x2={parentCenterX}
          y2={midY}
          stroke={lineColor}
          strokeWidth="1"
        />
      );

      // 2. Horizontal bar spanning from leftmost to rightmost child at midpoint
      if (children.length > 1) {
        const leftX = Math.min(...children.map(c => c.x));
        const rightX = Math.max(...children.map(c => c.x));
        lines.push(
          <line
            key={`bar-${node.employee.id}`}
            x1={leftX}
            y1={midY}
            x2={rightX}
            y2={midY}
            stroke={lineColor}
            strokeWidth="1"
          />
        );
      }

      // 3. Vertical line from midpoint down to each child's top center
      children.forEach((child) => {
        lines.push(
          <line
            key={`rise-${child.employee.id}`}
            x1={child.x}
            y1={midY}
            x2={child.x}
            y2={child.y}
            stroke={lineColor}
            strokeWidth="1"
          />
        );

        // Recurse into children
        processNode(child);
      });
    };

    if (layout.root) {
      processNode(layout.root);
    }

    return lines;
  };

  // Flatten tree nodes for rendering
  const flattenNodes = (node: TreeNode | null, result: TreeNode[] = []): TreeNode[] => {
    if (!node) return result;

    result.push(node);

    if (expandedNodes.has(node.employee.id)) {
      node.children.forEach((child) => flattenNodes(child, result));
    }

    return result;
  };

  const visibleNodes = layout.root ? flattenNodes(layout.root) : [];

  const viewWidth = Math.max(layout.width, 800);
  const viewHeight = Math.max(layout.height, 600);

  if (!layout.root) {
    return (
      <div className="org-chart-tree-empty">
        <div className="org-chart-tree-empty-content">
          <IconV2 name="users-solid" size={32} color="neutral-medium" />
          <BodyText color="neutral-weak">No org chart data available</BodyText>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`org-chart-tree ${isDragging ? 'org-chart-tree--dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div
        className={`org-chart-tree-transform ${!isDragging ? 'org-chart-tree-transform--smooth' : ''}`}
        style={{
          position: 'absolute',
          transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
        }}
      >
        <svg
          width={viewWidth}
          height={viewHeight}
          className="org-chart-tree-svg"
        >
          {renderConnections()}
        </svg>

        <div className="org-chart-tree-nodes" style={{ width: viewWidth, height: viewHeight }}>
          {visibleNodes.map((node) => (
            <div
              key={node.employee.id}
              className="org-chart-tree-node"
              style={{
                left: node.x - 92.5,
                top: node.y,
              }}
            >
              <OrgChartNode
                employee={node.employee}
                isSelected={selectedEmployee === node.employee.id}
                isFocused={focusedEmployee === node.employee.id}
                onPinClick={onNodePin}
                onExpandClick={(id) => onNodeExpand?.(id)}
                onNodeClick={onNodeSelect}
                showPhoto={showPhotos}
                compact={compact}
                isExpanded={expandedNodes.has(node.employee.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
