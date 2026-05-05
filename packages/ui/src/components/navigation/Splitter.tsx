import { useCallback, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../core';

export interface SplitterProps {
  direction?: 'horizontal' | 'vertical';
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children: [ReactNode, ReactNode];
  className?: string;
  style?: React.CSSProperties;
}

export const Splitter = ({
  direction = 'horizontal',
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  children,
  className,
  style,
}: SplitterProps) => {
  const [size, setSize] = useState(defaultSize);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = direction === 'horizontal'
        ? ((ev.clientX - rect.left) / rect.width) * 100
        : ((ev.clientY - rect.top) / rect.height) * 100;
      setSize(Math.max(minSize, Math.min(maxSize, pct)));
    };
    const onUp = (ev: PointerEvent) => {
      setDragging(false);
      target.releasePointerCapture(ev.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [direction, minSize, maxSize]);

  const isH = direction === 'horizontal';
  const firstStyle: React.CSSProperties = isH
    ? { width: `${size}%`, height: '100%' }
    : { height: `${size}%`, width: '100%' };
  const secondStyle: React.CSSProperties = isH
    ? { width: `${100 - size}%`, height: '100%' }
    : { height: `${100 - size}%`, width: '100%' };

  return (
    <div
      ref={containerRef}
      className={cx('mf-splitter', className)}
      data-dir={direction === 'vertical' ? 'vertical' : undefined}
      style={style}
    >
      <div className="mf-splitter-pane" style={firstStyle}>{children[0]}</div>
      <div
        className="mf-splitter-divider"
        data-dragging={dragging ? 'true' : undefined}
        onPointerDown={startDrag}
        role="separator"
        aria-orientation={isH ? 'vertical' : 'horizontal'}
        aria-valuenow={Math.round(size)}
      />
      <div className="mf-splitter-pane" style={secondStyle}>{children[1]}</div>
    </div>
  );
};
