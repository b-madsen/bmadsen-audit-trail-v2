import { useState, useMemo } from 'react';
import {
  Section,
  IconV2,
  Headline,
  BodyText,
  Checkbox,
  SelectField,
} from '@bamboohr/fabric';
import { getCategoryLabel, getFilesByCategory } from '../../data/files';
import './Files.css';

/**
 * Files Page
 *
 * Files page content without GlobalNavigation/Header (handled by App layout).
 * Category is controlled by the GlobalNav accordion - no sidebar needed.
 */

type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest';

interface FilesProps {
  category?: string;
}

export function Files({ category = 'all' }: FilesProps) {
  // Files page state - category comes from props (controlled by GlobalNav)
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const sortOptions = [
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'date-recent', label: 'Date: Recent First' },
    { value: 'date-oldest', label: 'Date: Oldest First' },
  ];

  // Get filtered files based on category prop
  const filteredFiles = useMemo(() => {
    return getFilesByCategory(category);
  }, [category]);

  const sortedFiles = useMemo(() => {
    const sorted = [...filteredFiles];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent':
        return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest':
        return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      default:
        return sorted;
    }
  }, [sortBy, filteredFiles]);

  // Get current category label for header
  const currentCategoryLabel = getCategoryLabel(category);

  const allSelected = selectedFiles.size === filteredFiles.length && filteredFiles.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
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
        return { name: 'file-pdf-solid' as const, color: 'error-strong' as const };
      case 'image':
        return { name: 'file-image-solid' as const, color: 'info-strong' as const };
      case 'audio':
        return { name: 'file-video-solid' as const, color: 'error-strong' as const };
      default:
        return { name: 'file-solid' as const, color: 'neutral-medium' as const };
    }
  };

  return (
    <div className="files-page files-page--no-sidebar">
      {/* Page Title */}
      <div className="files-title">
        <Headline size="large">{currentCategoryLabel}</Headline>
      </div>

      {/* Main Content - Full Width */}
      <div className="files-main">
          <Section>
            <Section.Header
              title="Files"
              size="medium"
              actions={[
                <SelectField
                  key="sort"
                  label="Sort by"
                  labelPlacement="inline"
                  size="small"
                  variant="single"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  width={10}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectField>,
              ]}
            />

            {/* Select All Row */}
            <div className="files-select-all">
              <Checkbox
                value="select-all"
                checked={allSelected}
                onChange={toggleSelectAll}
                label={`Select All Files (${filteredFiles.length})`}
              />
            </div>

            {/* File Rows */}
            {sortedFiles.map((file, index) => {
              const icon = getFileIcon(file.type);
              const isSelected = selectedFiles.has(file.id);
              const showCategory = category === 'all';

              return (
                <div key={file.id} className="file-row-wrapper">
                  <div className={`file-row ${isSelected ? 'file-row--selected' : ''}`}>
                    <Checkbox
                      value={`file-${file.id}`}
                      checked={isSelected}
                      onChange={() => toggleFileSelection(file.id)}
                    />
                    <IconV2 name={icon.name} size={24} color={icon.color} />
                    <div className="file-info">
                      <div className="file-name-row">
                        <a href="#" className="file-name" onClick={(e) => e.preventDefault()}>
                          {file.name.replace(/_/g, ' ').replace('.pdf', '.pdf').replace('.mp4', '.mp4')}
                        </a>
                        <IconV2 name="circle-info-solid" size={12} color="neutral-weak" />
                      </div>
                      <div className="file-meta">
                        <IconV2 name="arrow-up-from-bracket-solid" size={12} color="neutral-medium" />
                        <BodyText size="small" color="neutral-medium">
                          Added {file.addedDate} by {file.addedBy} ({file.size})
                        </BodyText>
                        {showCategory && (
                          <>
                            <IconV2 name="folder-solid" size={12} color="neutral-medium" />
                            <BodyText size="small" color="neutral-medium">{file.category}</BodyText>
                          </>
                        )}
                      </div>
                    </div>
                    {index % 3 === 0 && (
                      <a href="#" className="secure-download-link" onClick={(e) => e.preventDefault()}>
                        <IconV2 name="link-solid" size={12} color="primary-strong" />
                        <span>1 Secure Download Link</span>
                      </a>
                    )}
                  </div>
                  {index < sortedFiles.length - 1 && <hr className="file-divider" />}
                </div>
              );
            })}
          </Section>
        </div>
    </div>
  );
}

export default Files;
