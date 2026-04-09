import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Section,
  IconV2,
  IconButton,
  PageHeaderV2,
  BodyText,
  Checkbox,
  SelectField,
  SideNavigation,
} from '@bamboohr/fabric';
import { getCategoryLabel, getFilesByCategory, fileCategories } from '../../data/files';
import './Files.css';

type SortOption = 'name-asc' | 'name-desc' | 'date-recent' | 'date-oldest' | 'size-largest' | 'size-smallest';

interface FilesProps {
  category?: string;
}

const categoryIconMap: Record<string, { icon: string; activeIcon: string }> = {
  'all': { icon: 'folders-regular', activeIcon: 'folders-solid' },
  'signature-templates': { icon: 'file-signature-regular', activeIcon: 'file-signature-solid' },
  'benefits-docs': { icon: 'folder-user-regular', activeIcon: 'folder-user-solid' },
  'payroll': { icon: 'folder-user-regular', activeIcon: 'folder-user-solid' },
  'trainings': { icon: 'folder-user-regular', activeIcon: 'folder-user-solid' },
  'company-policies': { icon: 'folder-user-regular', activeIcon: 'folder-user-solid' },
};

export function Files({ category = 'all' }: FilesProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const sortOptions = [
    { value: 'name-asc', label: 'Name: A - Z' },
    { value: 'name-desc', label: 'Name: Z - A' },
    { value: 'date-recent', label: 'Date: Recent First' },
    { value: 'date-oldest', label: 'Date: Oldest First' },
    { value: 'size-largest', label: 'Size: Largest First' },
    { value: 'size-smallest', label: 'Size: Smallest First' },
  ];

  const filteredFiles = useMemo(() => getFilesByCategory(category), [category]);

  const sortedFiles = useMemo(() => {
    const sorted = [...filteredFiles];
    switch (sortBy) {
      case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'date-recent': return sorted.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
      case 'date-oldest': return sorted.sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
      case 'size-largest': return sorted.sort((a, b) => b.sizeBytes - a.sizeBytes);
      case 'size-smallest': return sorted.sort((a, b) => a.sizeBytes - b.sizeBytes);
      default: return sorted;
    }
  }, [sortBy, filteredFiles]);

  const currentCategoryLabel = getCategoryLabel(category);
  const allSelected = selectedFiles.size === filteredFiles.length && filteredFiles.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedFiles(new Set());
    else setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
  };

  const toggleFileSelection = (fileId: number) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(fileId)) newSelection.delete(fileId);
    else newSelection.add(fileId);
    setSelectedFiles(newSelection);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return { name: 'file-lines-regular' as const, color: 'error-strong' as const };
      case 'image':
        return { name: 'file-image-regular' as const, color: 'info-strong' as const };
      case 'audio':
        return { name: 'file-waveform-regular' as const, color: 'discovery-strong' as const };
      default:
        return { name: 'file-regular' as const, color: 'neutral-strong' as const };
    }
  };

  const navItems = [
    <SideNavigation.Link
      key="all"
      component={RouterLink}
      to="/files"
      active={category === 'all'}
      icon={'cabinet-filing-regular' as any}
      activeIcon={'cabinet-filing-solid' as any}
    >
      All Files
    </SideNavigation.Link>,
    <SideNavigation.Divider key="divider" />,
    ...fileCategories.filter(c => c.id !== 'all').map(cat => {
      const icons = categoryIconMap[cat.id] || { icon: 'folder-regular', activeIcon: 'folder-solid' };
      return (
        <SideNavigation.Link
          key={cat.id}
          component={RouterLink}
          to={`/files/${cat.id}`}
          active={category === cat.id}
          icon={icons.icon as any}
          activeIcon={icons.activeIcon as any}
        >
          {cat.label}
        </SideNavigation.Link>
      );
    }),
  ];

  return (
    <div className="files-page">
      <PageHeaderV2
        title="Files"
        primaryContent={
          <IconButton
            icon="folder-plus-regular"
            aria-label="New Folder"
            variant="outlined"
            color="secondary"
          />
        }
      />

      <div className="files-layout">
        <SideNavigation items={navItems} />

        <div className="files-main">
          <Section>
            <Section.Header
              title={currentCategoryLabel}
              size="medium"
              actions={[
                <div key="actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <SelectField
                    label="Sort by"
                    labelPlacement="inline"
                    size="small"
                    variant="single"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    width={7}
                    items={sortOptions.map((option) => ({
                      text: option.label,
                      value: option.value,
                    }))}
                  />
                  <IconButton
                    icon="arrow-down-to-line-regular"
                    aria-label="Download"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    disabled
                  />
                </div>,
              ]}
            />

            <div className="files-select-all">
              <Checkbox
                value="select-all"
                checked={allSelected}
                onChange={toggleSelectAll}
                label={`Select All Files (${filteredFiles.length})`}
              />
            </div>

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
                    <IconV2 name={icon.name} size={30} color={icon.color} />
                    <div className="file-info">
                      <div className="file-name-row">
                        <a href="#" className="file-name" onClick={(e) => e.preventDefault()}>
                          {file.name.replace(/_/g, ' ')}
                        </a>
                        <IconV2 name="circle-user-regular" size={12} color="neutral-medium" />
                      </div>
                      <div className="file-meta">
                        <IconV2 name="folder-arrow-up-regular" size={16} color="neutral-medium" />
                        <BodyText size="extra-small" color="neutral-weak">
                          Added {file.addedDate} by {file.addedBy} ({file.size})
                        </BodyText>
                        {showCategory && (
                          <>
                            <IconV2 name="folder-regular" size={16} color="neutral-medium" />
                            <BodyText size="extra-small" color="neutral-weak">{file.category}</BodyText>
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
    </div>
  );
}

export default Files;
