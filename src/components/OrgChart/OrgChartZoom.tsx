import { IconV2 } from '@bamboohr/fabric';

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
    <div className="absolute right-6 top-6 flex flex-col gap-2 z-10">
      {/* Zoom In */}
      <button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className="w-12 h-12 rounded-full bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-medium)] flex items-center justify-center transition-all shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Zoom in"
      >
        <IconV2 name="magnifying-glass-plus-solid" size={20} color="neutral-strong" />
      </button>

      {/* Zoom Out */}
      <button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className="w-12 h-12 rounded-full bg-[var(--fabric-surface-color-neutral-white)] border border-[var(--fabric-border-color-neutral-medium)] flex items-center justify-center transition-all shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Zoom out"
      >
        <IconV2 name="magnifying-glass-minus-solid" size={20} color="neutral-strong" />
      </button>
    </div>
  );
}
