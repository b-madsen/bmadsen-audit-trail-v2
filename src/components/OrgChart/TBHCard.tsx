import { useState } from 'react';
import { IconV2, Button, TextButton } from '@bamboohr/fabric';

export interface TBHCardProps {
  title?: string;
  count?: number;
  onTitleChange?: (newTitle: string) => void;
}

export function TBHCard({
  title = 'Financial Analyst',
  count = 1,
  onTitleChange,
}: TBHCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    setCurrentTitle(editedTitle);
    onTitleChange?.(editedTitle);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditedTitle(currentTitle);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="tbh-node">
        {/* Avatar placeholder */}
        <div className="tbh-node__avatar">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="10" r="6" fill="white" />
            <path
              d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
              fill="white"
            />
          </svg>
        </div>

        {/* Card with dashed border */}
        <div className="tbh-node__card">
          <div className="tbh-node__content">
            <div className="tbh-node__name">To Be Hired</div>
            <div className="tbh-node__title-row">
              <span className="tbh-node__title">{currentTitle}</span>
              <button
                className="tbh-node__edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                aria-label="Edit title"
              >
                <IconV2 name="pen-solid" size={12} color="neutral-medium" />
              </button>
            </div>
          </div>

          <div className="tbh-node__bottom-row">
            {count > 1 && (
              <div className="tbh-node__count">
                <span className="tbh-node__count-text">{count}</span>
                <IconV2 name="chevron-down-solid" size={12} color="neutral-medium" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Title Modal */}
      {isModalOpen && (
        <div className="tbh-modal-overlay" onClick={handleCancel}>
          <div className="tbh-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tbh-modal__title">Edit Job Title</div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="tbh-modal__input"
              autoFocus
            />
            <div className="tbh-modal__actions">
              <TextButton onClick={handleCancel}>Cancel</TextButton>
              <Button variant="contained" color="primary" size="small" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TBHCard;
