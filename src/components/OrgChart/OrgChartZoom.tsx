import { IconButton } from '@bamboohr/fabric';

interface OrgChartZoomProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  minZoom?: number;
  maxZoom?: number;
}

export function OrgChartZoom({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  minZoom = 0.5,
  maxZoom = 2,
}: OrgChartZoomProps) {
  const canZoomIn = zoomLevel < maxZoom;
  const canZoomOut = zoomLevel > minZoom;

  return (
    <div style={{
      position: 'absolute',
      right: 24,
      top: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 10,
    }}>
      <IconButton
        icon="magnifying-glass-plus-regular"
        aria-label="Zoom in"
        variant="outlined"
        color="secondary"
        onClick={onZoomIn}
        disabled={!canZoomIn}
      />
      <IconButton
        icon="magnifying-glass-minus-regular"
        aria-label="Zoom out"
        variant="outlined"
        color="secondary"
        onClick={onZoomOut}
        disabled={!canZoomOut}
      />
    </div>
  );
}
