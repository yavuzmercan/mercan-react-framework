import { useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cx } from '../../core';

export interface FileInputProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  hint?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const FileInput = ({
  value,
  onChange,
  accept,
  multiple,
  disabled,
  hint = 'Click or drop files here',
  className,
  children,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [internal, setInternal] = useState<File[]>([]);
  const files = value ?? internal;

  const setFiles = (next: File[]) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    setFiles(multiple ? arr : arr.slice(0, 1));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  return (
    <label
      className={cx('mf-file-input', className)}
      data-dragging={dragging ? 'true' : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
      {children ?? (
        <>
          <span style={{ fontWeight: 'var(--mf-fw-medium)' }}>{hint}</span>
          {accept && <span className="mf-file-input-files">Accepts: {accept}</span>}
          {files.length > 0 && (
            <span className="mf-file-input-files">
              {files.length === 1 ? files[0]!.name : `${files.length} files selected`}
            </span>
          )}
        </>
      )}
    </label>
  );
};
