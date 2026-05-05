import { useState, type ReactNode } from 'react';
import { highlight } from './highlight';

export interface StoryProps {
  title: string;
  code: string;
  children: ReactNode;
}

export const Story = ({ title, code, children }: StoryProps) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="story">
      <div className="story-title">
        <span>{title}</span>
        <button type="button" className="copy-btn" onClick={onCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="story-preview">{children}</div>
      <pre className="story-code" dangerouslySetInnerHTML={{ __html: highlight(code) }} />
    </div>
  );
};

export interface PropsTableRow {
  prop: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export const PropsTable = ({ rows }: { rows: PropsTableRow[] }) => (
  <table className="props-table">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((r) => (
        <tr key={r.prop}>
          <td><code>{r.prop}</code></td>
          <td><code>{r.type}</code></td>
          <td>{r.defaultValue ? <code>{r.defaultValue}</code> : <span style={{ color: 'var(--mf-color-textMuted)' }}>—</span>}</td>
          <td>{r.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
