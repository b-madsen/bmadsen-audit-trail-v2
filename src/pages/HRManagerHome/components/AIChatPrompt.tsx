import { useState, useRef } from 'react';
import { IconButton, IconV2, BodyText } from '@bamboohr/fabric';
import './AIChatPrompt.css';

interface AttachedFile {
  name: string;
  file: File;
}

interface AIChatPromptProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFileSubmit?: (file: File, context: string) => void;
  onVoiceClick?: () => void;
  onAttachmentClick?: () => void;
  onImageClick?: () => void;
}

export function AIChatPrompt({
  placeholder = 'Ask about your workforce...',
  value,
  onChange,
  onSubmit,
  onFileSubmit,
  onVoiceClick,
  onAttachmentClick,
  onImageClick,
}: AIChatPromptProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitWithFile = () => {
    if (attachedFile && onFileSubmit) {
      onFileSubmit(attachedFile.file, value);
      setAttachedFile(null);
      onChange('');
    } else if (value.trim()) {
      onSubmit?.(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitWithFile();
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
    onAttachmentClick?.();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        file: file,
      });
    }
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only deactivate if leaving the component entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    console.log('Drop event - files:', files.length, files[0]?.name);
    if (files.length > 0) {
      const file = files[0];
      // Validate file type
      const validTypes = ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.csv'];
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      console.log('File extension:', fileExt, 'Valid:', validTypes.includes(fileExt));
      if (validTypes.includes(fileExt)) {
        setAttachedFile({ name: file.name, file });
      }
    }
  };

  return (
    <div
      className={`ai-chat-prompt ${isFocused ? 'ai-chat-prompt--focused' : ''} ${isDragActive ? 'ai-chat-prompt--drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="ai-chat-prompt-border">
        <div className="ai-chat-prompt-content">
          {attachedFile && (
            <div className="ai-chat-prompt-file-chip">
              <IconV2 name="file-lines-solid" size={16} color="info-strong" />
              <span className="ai-chat-prompt-file-name">
                <BodyText size="small">{attachedFile.name}</BodyText>
              </span>
              <button
                type="button"
                className="ai-chat-prompt-file-remove"
                aria-label="Remove file"
                onClick={handleRemoveFile}
              >
                <IconV2 name="xmark-solid" size={10} color="neutral-medium" />
              </button>
            </div>
          )}
          <textarea
            className="ai-chat-prompt-input"
            placeholder={attachedFile ? 'Add context about this file...' : placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <div className="ai-chat-prompt-actions">
            <div className="ai-chat-prompt-actions-left">
              <IconButton
                icon="paperclip-solid"
                aria-label="Attach file"
                size="small"
                variant="outlined"
                color="secondary"
                onClick={handleAttachClick}
              />
              <IconButton
                icon="image-solid"
                aria-label="Add image"
                size="small"
                variant="outlined"
                color="secondary"
                onClick={onImageClick}
              />
            </div>
            <div className="ai-chat-prompt-actions-right">
              <IconButton
                icon="microphone-solid"
                aria-label="Voice input"
                size="small"
                variant="outlined"
                color="secondary"
                onClick={onVoiceClick}
              />
              <IconButton
                icon="arrow-up-solid"
                aria-label="Send"
                size="small"
                color="ai"
                variant="outlined"
                onClick={handleSubmitWithFile}
              />
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="ai-chat-prompt-file-input"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv"
      />
    </div>
  );
}
