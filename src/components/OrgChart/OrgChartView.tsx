import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { Employee } from '../../data/employees';
import { OrgChartTree } from './OrgChartTree';
import { OrgChartControls } from './OrgChartControls';
import { OrgChartZoom } from './OrgChartZoom';
import './OrgChart.css';

interface OrgChartViewProps {
  employees: Employee[];
}

export function OrgChartView({ employees }: OrgChartViewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<number | undefined>();

  const ceo = useMemo(
    () => employees.find((e) => e.reportsTo === null),
    [employees]
  );

  const [rootEmployee, setRootEmployee] = useState<number | 'all'>(
    () => ceo?.id ?? 'all'
  );

  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(
    () => new Set(ceo ? [ceo.id] : [])
  );

  const getDirectReports = useCallback(
    (id: number) => employees.filter((e) => e.reportsTo === id),
    [employees]
  );

  const expandToDepth = useCallback(
    (rootId: number, target: number | 'all') => {
      const next = new Set<number>();
      const walk = (id: number, cur: number) => {
        const reports = getDirectReports(id);
        if (!reports.length) return;
        if (target === 'all' || cur < target) {
          next.add(id);
          reports.forEach((r) => walk(r.id, cur + 1));
        }
      };
      walk(rootId, 0);
      return next;
    },
    [getDirectReports]
  );

  // Explicit depth state so the SelectField always has a concrete initial value
  const [selectedDepth, setSelectedDepth] = useState<number | 'all'>(1);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(40);
  const [panY, setPanY] = useState(80);
  const [centered, setCentered] = useState(false);

  // Re-center whenever root changes
  useEffect(() => {
    setCentered(false);
  }, [rootEmployee]);

  // Center after DOM settles
  useEffect(() => {
    if (centered) return;
    const frame = requestAnimationFrame(() => {
      if (!canvasRef.current) return;
      const { width } = canvasRef.current.getBoundingClientRect();
      if (width === 0) return;
      const root = typeof rootEmployee === 'number'
        ? employees.find((e) => e.id === rootEmployee)
        : ceo;
      const numReports = root ? getDirectReports(root.id).length : 0;
      const treeW = Math.max((numReports || 1) * 210, 210);
      setPanX(Math.max((width - treeW) / 2, 40));
      setPanY(80);
      setCentered(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [centered, rootEmployee, employees, ceo, getDirectReports]);

  const handleNodeExpand = (id: number) => {
    const next = new Set(expandedNodes);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedNodes(next);
  };

  const handleNodeClick = (id: number) => {
    setSelectedEmployee(id);
    const next = new Set<number>();
    let cur: number | null = employees.find((e) => e.id === id)?.reportsTo ?? null;
    while (cur !== null) {
      next.add(cur);
      cur = employees.find((e) => e.id === cur)?.reportsTo ?? null;
    }
    const emp = employees.find((e) => e.id === id);
    if (emp && emp.directReports > 0) next.add(id);
    setExpandedNodes(next);
  };

  const handleJump = (id: number) => {
    setSelectedEmployee(id);
    setRootEmployee(id);
    const emp = employees.find((e) => e.id === id);
    setExpandedNodes(new Set(emp && emp.directReports > 0 ? [id] : []));
  };

  const handleGoUp = () => {
    if (typeof rootEmployee !== 'number') return;
    const emp = employees.find((e) => e.id === rootEmployee);
    if (emp?.reportsTo) handleJump(emp.reportsTo);
  };

  return (
    <div className="org-chart-view">
      <OrgChartControls
        employees={employees}
        depth={selectedDepth}
        onDepthChange={(d) => {
          setSelectedDepth(d);
          if (typeof rootEmployee === 'number') {
            setExpandedNodes(expandToDepth(rootEmployee, d));
          }
        }}
        onEmployeeJump={handleJump}
        onGoUp={handleGoUp}
      />

      <div className="org-chart-canvas">
        <div ref={canvasRef} className="org-chart-canvas-inner">
          <OrgChartTree
            employees={employees}
            rootEmployee={rootEmployee}
            depth="all"
            selectedEmployee={selectedEmployee}
            expandedNodes={expandedNodes}
            onNodeSelect={handleNodeClick}
            onNodeExpand={handleNodeExpand}
            onNodePin={() => {}}
            showPhotos={true}
            compact={false}
            zoomLevel={zoomLevel}
            panX={panX}
            panY={panY}
            onPanChange={(x, y) => { setPanX(x); setPanY(y); }}
            onZoomChange={setZoomLevel}
          />

          <OrgChartZoom
            zoomLevel={zoomLevel}
            onZoomIn={() => setZoomLevel((z) => Math.min(z + 0.1, 2))}
            onZoomOut={() => setZoomLevel((z) => Math.max(z - 0.1, 0.5))}
          />
        </div>
      </div>
    </div>
  );
}
