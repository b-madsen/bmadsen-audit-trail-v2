import { useState } from 'react';
import {
  Section,
  Button,
  Dropdown,
  StyledBox,
  IconV2,
  Headline,
  BodyText,
  TextField,
} from '@bamboohr/fabric';

interface FolderItem {
  id: number;
  icon: string;
  name: string;
  meta: string;
  deleted: boolean;
}

const folders: FolderItem[] = [
  { id: 1, icon: 'folder-user-regular', name: 'Employee Uploads', meta: '12 items', deleted: false },
  { id: 2, icon: 'folder-xmark-regular', name: 'Resumes', meta: 'Deleted July 2, 2023', deleted: true },
  { id: 3, icon: 'file-signature-regular', name: 'Signed Documents', meta: '0 items', deleted: false },
  { id: 4, icon: 'folder-regular', name: 'Task List Attachments', meta: '4 items', deleted: false },
  { id: 5, icon: 'folder-regular', name: 'Workflow attachments', meta: '4 items', deleted: false },
];

export function DocumentsTabContent() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="my-info-sections">

      {/* Section header */}
      <div className="my-info-section-header">
        <div className="my-info-section-header-left">
          <IconV2 name="file-regular" size={20} color="primary-strong" />
          <Headline size="medium" color="primary">Documents</Headline>
        </div>
      </div>

      {/* Toolbar */}
      <div className="docs-toolbar">
        <div className="docs-toolbar-left">
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className="my-info-add-entry-btn"
            startIcon={<IconV2 name="arrow-up-from-bracket-regular" size={12} />}
          >
            Upload
          </Button>
          <Dropdown
            type="button"
            ButtonProps={{
              icon: 'folder-plus-regular',
              size: 'medium',
              color: 'secondary',
              variant: 'outlined',
            }}
            items={[
              { text: 'New folder', value: 'new-folder' },
            ]}
            onSelect={() => {}}
          />
          <Dropdown
            type="button"
            ButtonProps={{
              icon: 'grid-2-regular',
              size: 'medium',
              color: 'secondary',
              variant: 'outlined',
            }}
            items={[
              { text: 'Grid view', value: 'grid' },
              { text: 'List view', value: 'list' },
            ]}
            onSelect={() => {}}
          />
        </div>
        <div className="docs-toolbar-right">
          <div className="docs-search-wrapper">
            <span className="docs-search-icon">
              <IconV2 name="magnifying-glass-regular" size={12} color="neutral-medium" />
            </span>
            <TextField
              label=""
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Documents..."
            />
          </div>
          <Dropdown
            type="button"
            ButtonProps={{
              icon: 'arrow-down-to-bracket-regular',
              size: 'medium',
              color: 'secondary',
              variant: 'outlined',
            }}
            items={[
              { text: 'Download all', value: 'download-all' },
              { text: 'Download selected', value: 'download-selected' },
            ]}
            onSelect={() => {}}
          />
        </div>
      </div>

      {/* Files section */}
      <Section>
        <div className="docs-tiles-grid">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`docs-folder-tile${folder.deleted ? ' docs-folder-tile--deleted' : ''}`}
            >
              <div className="docs-folder-icon">
                <IconV2
                  name={folder.icon as any}
                  size={28}
                  color={folder.deleted ? 'neutral-weak' : 'primary-strong'}
                />
              </div>
              <BodyText
                size="medium"
                weight="semibold"
                color={folder.deleted ? 'neutral-weak' : 'primary'}
              >
                {folder.name}
              </BodyText>
              <BodyText size="small" color="neutral-weak">
                {folder.meta}
              </BodyText>
            </div>
          ))}
        </div>

        {/* Drag and drop zone */}
        <div className="docs-dropzone-wrapper">
          <StyledBox
            backgroundColor="neutral-extra-weak"
            borderRadius="medium"
          >
            <div className="docs-dropzone">
              <div className="docs-dropzone-left">
                <IconV2 name="arrow-up-from-bracket-regular" size={12} color="neutral-medium" />
                <BodyText size="medium" color="neutral-weak">Drag and drop files to upload</BodyText>
              </div>
              <BodyText size="medium" color="neutral-weak">5 folders</BodyText>
            </div>
          </StyledBox>
        </div>
      </Section>

    </div>
  );
}

export default DocumentsTabContent;
