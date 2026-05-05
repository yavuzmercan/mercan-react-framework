import { createContext, useContext, useState, type ReactNode } from 'react';
import { cx } from '../../core';

interface AccordionCtx {
  openItems: Set<string>;
  toggle: (id: string) => void;
  allowMultiple: boolean;
}
const AccordionContext = createContext<AccordionCtx | null>(null);
const useAccordionCtx = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside <Accordion>');
  return ctx;
};

export interface AccordionProps {
  defaultOpen?: string[];
  allowMultiple?: boolean;
  children: ReactNode;
  className?: string;
}

export const Accordion = ({ defaultOpen = [], allowMultiple = false, children, className }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));
  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  return (
    <AccordionContext.Provider value={{ openItems, toggle, allowMultiple }}>
      <div className={cx('mf-accordion', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
}

export const AccordionItem = ({ id, title, children }: AccordionItemProps) => {
  const ctx = useAccordionCtx();
  const open = ctx.openItems.has(id);
  return (
    <div className="mf-acc-item">
      <button
        type="button"
        className="mf-acc-trigger mf-focus-ring"
        aria-expanded={open}
        data-open={open ? 'true' : undefined}
        onClick={() => ctx.toggle(id)}
      >
        <span>{title}</span>
        <span className="mf-acc-icon" aria-hidden="true">▾</span>
      </button>
      {open && <div className="mf-acc-content">{children}</div>}
    </div>
  );
};
