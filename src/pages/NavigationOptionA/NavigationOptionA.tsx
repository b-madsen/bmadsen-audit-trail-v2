import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconV2, BodyText, Button, IconButton, PageHeaderV2, Section, Checkbox } from '@bamboohr/fabric';
import { files } from '../../data/files';
import './NavigationOptionA.css';

type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';

export function NavigationOptionA() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('size-largest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  const sortOptions = [
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'date-recent', label: 'Date: Recent First' },
    { value: 'date-oldest', label: 'Date: Oldest First' },
    { value: 'size-largest', label: 'Size: Largest First' },
    { value: 'size-smallest', label: 'Size: Smallest First' },
  ];

  const sortedFiles = useMemo(() => {
    const sorted = [...files];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent':
        return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest':
        return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      case 'size-largest':
        return sorted.sort((a, b) => b.sizeBytes - a.sizeBytes);
      case 'size-smallest':
        return sorted.sort((a, b) => a.sizeBytes - b.sizeBytes);
      default:
        return sorted;
    }
  }, [sortBy]);

  const allSelected = selectedFiles.size === files.length && files.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.id)));
    }
  };

  const toggleFileSelection = (fileId: number) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) {
      newSelection.delete(fileId);
    } else {
      newSelection.add(fileId);
    }
    setSelectedFiles(newSelection);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return { name: 'file-lines-solid' as const, color: 'error-strong' as const };
      case 'image':
        return { name: 'image-solid' as const, color: 'info-strong' as const };
      case 'audio':
        return { name: 'file-audio-solid' as const, color: 'discovery-strong' as const };
      default:
        return { name: 'file-solid' as const, color: 'neutral-medium' as const };
    }
  };

  return (
    <div className="nav-option-a-page">
      {/* Page Header with Breadcrumb and Actions */}
      <div style={{ marginBottom: '12px' }}>
        <PageHeaderV2
          title="All Files"
          breadcrumb={
            <PageHeaderV2.Breadcrumb href="/" onClick={(e: React.MouseEvent) => { e.preventDefault(); handleBackToHome(); }}>
              Home
            </PageHeaderV2.Breadcrumb>
          }
          primaryContent={
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<IconV2 name="arrow-up-from-bracket-solid" size={16} />}
              >
                Upload file
              </Button>
              <IconButton icon="table-cells-solid" variant="outlined" color="secondary" aria-label="Grid view" />
            </div>
          }
        />
      </div>

      {/* Content Area */}
      <Section>
        <div style={{ padding: '20px' }}>
        {/* Header Row with Select All and Actions */}
        <div className="nav-option-a-card-header">
          <Checkbox
            value="select-all"
            checked={allSelected}
            onChange={toggleSelectAll}
            label={`Select All Files (${files.length})`}
          />
          <div className="nav-option-a-card-actions">
            {/* Sort Dropdown */}
            <div className="sort-dropdown">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="sort-dropdown-trigger"
              >
                <span className="sort-dropdown-label">Sort by</span>
                <span className="sort-dropdown-value">
                  {sortOptions.find(opt => opt.value === sortBy)?.label}
                </span>
                <IconV2 name="chevron-down-solid" size={12} />
              </button>
              {sortDropdownOpen && (
                <>
                  <div
                    className="sort-dropdown-overlay"
                    onClick={() => setSortDropdownOpen(false)}
                  />
                  <div className="sort-dropdown-menu">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as SortOption);
                          setSortDropdownOpen(false);
                        }}
                        className={`sort-dropdown-option ${sortBy === option.value ? 'sort-dropdown-option--active' : ''}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <IconButton icon="arrow-down-to-line-solid" variant="outlined" color="secondary" aria-label="Download" />
            <IconButton icon="trash-can-solid" variant="outlined" color="secondary" aria-label="Delete" />
          </div>
        </div>
        <hr className="nav-option-a-divider" />

        {/* File Rows */}
        <div>
          {sortedFiles.map((file, index) => {
            const icon = getFileIcon(file.type);
            const isSelected = selectedFiles.has(file.id);

            return (
              <div key={file.id}>
                <div className={`file-row ${isSelected ? 'file-row--selected' : ''}`}>
                  <Checkbox
                    value={`file-${file.id}`}
                    checked={isSelected}
                    onChange={() => toggleFileSelection(file.id)}
                  />
                  <IconV2 name={icon.name} size={20} color={icon.color} />
                  <div className="file-info">
                    <a href="#" className="file-name" onClick={(e) => e.preventDefault()}>
                      {file.name}
                    </a>
                    <div className="file-meta">
                      <IconV2 name="folder-regular" size={12} color="neutral-medium" />
                      <BodyText size="small" color="neutral-medium">
                        Added {file.addedDate} by {file.addedBy} ({file.size})
                      </BodyText>
                      <IconV2 name="folder-regular" size={16} color="neutral-medium" />
                      <BodyText size="small" color="neutral-medium">{file.category}</BodyText>
                    </div>
                  </div>
                </div>
                {index < sortedFiles.length - 1 && <hr className="nav-option-a-divider" />}
              </div>
            );
          })}
        </div>
        </div>
      </Section>
    </div>
  );
}

export default NavigationOptionA;
