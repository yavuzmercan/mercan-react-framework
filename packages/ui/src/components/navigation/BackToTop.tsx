import { useEffect, useState } from 'react';
import { ChevronUp } from '../../icons';
import { cx } from '../../core';

export interface BackToTopProps {
  threshold?: number;
  ariaLabel?: string;
  className?: string;
}

export const BackToTop = ({ threshold = 300, ariaLabel = 'Back to top', className }: BackToTopProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  if (!show) return null;
  return (
    <button
      type="button"
      className={cx('mf-backtotop', className)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={ariaLabel}
    >
      <ChevronUp size={20} />
    </button>
  );
};
