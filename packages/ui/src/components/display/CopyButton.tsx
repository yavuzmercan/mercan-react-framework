import { useState, type ReactNode } from 'react';
import { cx } from '../../core';
import { Copy, Check } from '../../icons';

export interface CopyButtonProps {
  value: string;
  children?: (copied: boolean) => ReactNode;
  label?: string;
  successLabel?: string;
  timeout?: number;
  className?: string;
}

export const CopyButton = ({
  value,
  children,
  label = 'Copy',
  successLabel = 'Copied!',
  timeout = 1500,
  className,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      /* ignore */
    }
  };

  if (children) {
    return (
      <button type="button" className={cx('mf-copy-btn', className)} data-copied={copied ? 'true' : undefined} onClick={onCopy}>
        {children(copied)}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cx('mf-copy-btn', className)}
      data-copied={copied ? 'true' : undefined}
      onClick={onCopy}
      aria-label={copied ? successLabel : label}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? successLabel : label}
    </button>
  );
};
