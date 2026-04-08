import { useState, useRef, useEffect } from 'react';
import { IconV2, BodyText, Checkbox, Button, IconButton, TextButton, TextField, Dropdown } from '@bamboohr/fabric';
// @ts-expect-error Nub is exported from Fabric ESM but not in main type declarations
import { Nub } from '@bamboohr/fabric/dist/es/Nub.mjs';
import type { Employee } from '../../data/employees';

interface OrgChartControlsProps {
  employees: Employee[];
  depth: number | 'all';
  onDepthChange: (depth: number | 'all') => void;
  onEmployeeJump: (employeeId: number) => void;
  onGoUp?: () => void;
  showFilters?: {
    name: boolean;
    photo: boolean;
    department: boolean;
    division: boolean;
    location: boolean;
  };
  onFilterChange?: (filters: {
    name: boolean;
    photo: boolean;
    department: boolean;
    division: boolean;
    location: boolean;
  }) => void;
}

export function OrgChartControls({
  employees,
  depth,
  onDepthChange,
  onEmployeeJump,
  onGoUp,
  showFilters = { name: true, photo: true, department: false, division: false, location: false },
  onFilterChange,
}: OrgChartControlsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [filters, setFilters] = useState(showFilters);
  const searchRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim()
    ? employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchResults.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[highlightedIndex]) {
          onEmployeeJump(searchResults[highlightedIndex].id);
          setSearchQuery('');
          setShowSearchResults(false);
        }
        break;
      case 'Escape':
        setShowSearchResults(false);
        break;
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleFilterToggle = (key: keyof typeof filters) => {
    const updated = { ...filters, [key]: !filters[key] };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  // Clamp depth to valid option values (1-7 or 'all')
  const depthValue = depth === 'all' ? 'all' : String(Math.max(1, Math.min(7, Number(depth) || 1)));

  return (
    <div className="org-chart-controls">
      {/* Search */}
      <div ref={searchRef} className="org-chart-search-wrapper">
        <div onKeyDown={handleKeyDown}>
          <TextField
            size="medium"
            variant="single"
            placeholder="Jump to an employee..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            InputProps={{
              startAdornment: (
                <Nub position="start">
                  <IconV2 name="circle-user-solid" size={16} color="neutral-medium" />
                </Nub>
              ),
            }}
          />
        </div>

        {showSearchResults && searchResults.length > 0 && (
          <div className="org-chart-search-results">
            {searchResults.map((emp, index) => (
              <button
                key={emp.id}
                onClick={() => {
                  onEmployeeJump(emp.id);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`org-chart-search-result ${
                  index === highlightedIndex ? 'org-chart-search-result--highlighted' : ''
                }`}
              >
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="org-chart-search-result-avatar"
                />
                <div className="org-chart-search-result-info">
                  <div className="org-chart-search-result-name">{emp.name}</div>
                  <span className="org-chart-search-result-meta">
                    <BodyText size="extra-small" color="neutral-weak">
                      {emp.title} · {emp.department}
                    </BodyText>
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Depth Selector and Up Arrow */}
      <div className="org-chart-nav-controls">
        <Dropdown
          type="button"
          ButtonProps={{
            variant: 'outlined',
            color: 'secondary',
            size: 'medium',
          }}
          items={[
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: '6', value: '6' },
            { text: '7', value: '7' },
            { text: 'All', value: 'all' },
          ]}
          onSelect={(val: string) => {
            onDepthChange(val === 'all' ? 'all' : Number(val));
          }}
        >
          {depthValue === 'all' ? 'All' : depthValue}
        </Dropdown>

        {onGoUp && (
          <IconButton
            icon="angles-up-solid"
            aria-label="Go to parent"
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={onGoUp}
          />
        )}
      </div>

      {/* Right: Filter and Export */}
      <div className="org-chart-right-controls">
        {/* Filter Button */}
        <div ref={filterRef} className="org-chart-action-wrapper">
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<IconV2 name="sliders-solid" size={16} />}
            endIcon={<IconV2 name="caret-down-solid" size={10} />}
            onClick={() => { setFilterOpen(!filterOpen); setExportOpen(false); }}
            aria-label="Filter"
          >
            {null}
          </Button>

          {filterOpen && (
            <div className="org-chart-dropdown">
              <div className="org-chart-dropdown__title">Show on Org Chart</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                {([
                  { key: 'name' as const, label: 'Name' },
                  { key: 'photo' as const, label: 'Photo' },
                  { key: 'department' as const, label: 'Department' },
                  { key: 'division' as const, label: 'Division' },
                  { key: 'location' as const, label: 'Location' },
                ]).map(({ key, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    value={key}
                    checked={filters[key]}
                    onChange={() => handleFilterToggle(key)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export Button */}
        <div ref={exportRef} className="org-chart-action-wrapper">
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            startIcon={<IconV2 name="file-export-regular" size={16} />}
            endIcon={<IconV2 name="caret-down-solid" size={10} />}
            onClick={() => { setExportOpen(!exportOpen); setFilterOpen(false); }}
          >
            Export
          </Button>

          {exportOpen && (
            <div className="org-chart-dropdown">
              <div className="org-chart-dropdown__title">Download Org Chart</div>
              <div className="org-chart-dropdown__desc">
                Download a stylized version of the org chart in SVG or PNG format.
              </div>
              <div className="org-chart-dropdown__divider" />
              <div className="org-chart-dropdown__section-label">Download as .csv to import to</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TextButton onClick={() => setExportOpen(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <IconV2 name="file-lines-regular" size={16} color="neutral-medium" />
                    Lockchart
                  </span>
                </TextButton>
                <TextButton onClick={() => setExportOpen(false)}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <IconV2 name="file-csv-solid" size={16} color="neutral-medium" />
                    Unformatted CSV
                  </span>
                </TextButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
