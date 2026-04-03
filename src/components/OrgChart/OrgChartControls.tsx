import { useState, useRef, useEffect } from 'react';
import type { Employee } from '../../data/employees';
import { IconV2, TextField, SelectField, IconButton, Button, Avatar, BodyText } from '@bamboohr/fabric';

interface OrgChartControlsProps {
  employees: Employee[];
  depth: number | 'all';
  onDepthChange: (depth: number | 'all') => void;
  onEmployeeJump: (employeeId: number) => void;
  onGoUp?: () => void;
  onFilterOpen?: () => void;
  onExportOpen?: () => void;
}

export function OrgChartControls({
  employees,
  depth,
  onDepthChange,
  onEmployeeJump,
  onGoUp,
  onFilterOpen,
  onExportOpen,
}: OrgChartControlsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

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
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const depthValue = depth === 'all' ? 'all' : String(depth);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16 }}>
      {/* Jump to employee */}
      <div ref={searchRef} style={{ position: 'relative', width: 300, flexShrink: 0 }}>
        <TextField
          label=""
          placeholder="Jump to an employee..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchResults(true);
          }}
          onFocus={() => { if (searchQuery) setShowSearchResults(true); }}
          onKeyDown={handleKeyDown}
          startIcon={<IconV2 name="circle-user-regular" size={16} />}
          styling="single"
          size="medium"
        />

        {showSearchResults && searchResults.length > 0 && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: '100%',
            marginTop: 4,
            width: '100%',
            background: 'var(--fabric-surface-color-neutral-white)',
            border: '1px solid var(--fabric-border-color-neutral-weak)',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: 200,
            maxHeight: 260,
            overflowY: 'auto',
          }}>
            {searchResults.map((emp, index) => (
              <button
                key={emp.id}
                onClick={() => {
                  onEmployeeJump(emp.id);
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: index === highlightedIndex
                    ? 'var(--fabric-surface-color-neutral-xx-weak)'
                    : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Avatar src={emp.avatar} alt={emp.name} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <BodyText size="small" weight="medium">{emp.name}</BodyText>
                  <BodyText size="extra-small" color="neutral-weak">
                    {emp.title} · {emp.department}
                  </BodyText>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Depth selector — Fabric SelectField */}
      <div style={{ flexShrink: 0 }}>
        <SelectField
          label="Levels"
          labelPlacement="inline"
          size="medium"
          variant="single"
          value={depthValue}
          onChange={(e) => {
            const val = e.target.value;
            onDepthChange(val === 'all' ? 'all' : Number(val));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="all">All</option>
        </SelectField>
      </div>

      {/* Go up a level */}
      {onGoUp && (
        <IconButton
          icon="angles-up-regular"
          aria-label="Go up a level"
          variant="outlined"
          color="secondary"
          onClick={onGoUp}
        />
      )}

      {/* Right: Filter + Export */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        {onFilterOpen && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onFilterOpen}
            startIcon={<IconV2 name="sliders-regular" size={16} />}
            endIcon={<IconV2 name="caret-down-solid" size={12} />}
          />
        )}
        {onExportOpen && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onExportOpen}
            startIcon={<IconV2 name="file-export-regular" size={16} />}
            endIcon={<IconV2 name="caret-down-solid" size={12} />}
          >
            Export
          </Button>
        )}
      </div>
    </div>
  );
}
