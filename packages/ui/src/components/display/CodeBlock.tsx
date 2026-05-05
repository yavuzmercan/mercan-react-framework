import { type ReactNode } from 'react';
import { cx } from '../../core';
import { CopyButton } from './CopyButton';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  children?: ReactNode;
  className?: string;
}

export const CodeBlock = ({ code, language, showCopy = true, children, className }: CodeBlockProps) => (
  <div className={cx('mf-codeblock', className)}>
    {(language || showCopy) && (
      <div className="mf-codeblock-header">
        <span>{language ?? ''}</span>
        {showCopy && <CopyButton value={code} />}
      </div>
    )}
    <pre>
      <code>{children ?? code}</code>
    </pre>
  </div>
);
