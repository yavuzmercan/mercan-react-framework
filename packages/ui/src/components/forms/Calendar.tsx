import { useState } from 'react';
import { cx, useTranslation } from '../../core';
import { ChevronLeft, ChevronRight } from '../../icons';

export interface CalendarProps {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1; // 0 = Sunday, 1 = Monday
  className?: string;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export const Calendar = ({
  value: controlled,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  weekStartsOn = 1,
  className,
}: CalendarProps) => {
  const { locale, formatDate } = useTranslation();
  const initial = controlled ?? defaultValue ?? new Date();
  const [view, setView] = useState(startOfMonth(initial));
  const value = controlled ?? defaultValue;

  const today = new Date();
  const monthStart = startOfMonth(view);
  const firstDow = (monthStart.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - firstDow);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }

  const dowFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dows: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    dows.push(dowFormatter.format(d));
  }

  const monthLabel = formatDate(view, { month: 'long', year: 'numeric' });

  const goPrev = () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  const goNext = () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));

  const isDisabled = (d: Date) => {
    if (minDate && d < startOfMonth(minDate) && d.getMonth() !== minDate.getMonth() && !sameDay(d, minDate)) {
      // simple check
    }
    if (minDate) {
      const a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const b = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (a < b) return true;
    }
    if (maxDate) {
      const a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const b = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      if (a > b) return true;
    }
    return false;
  };

  return (
    <div className={cx('mf-calendar', className)} role="group" aria-label={`Calendar — ${monthLabel}`}>
      <div className="mf-calendar-header">
        <button type="button" className="mf-calendar-nav" onClick={goPrev} aria-label="Previous month">
          <ChevronLeft size={16} />
        </button>
        <span className="mf-calendar-title" aria-live="polite">{monthLabel}</span>
        <button type="button" className="mf-calendar-nav" onClick={goNext} aria-label="Next month">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mf-calendar-grid">
        {dows.map((d) => (
          <div key={d} className="mf-calendar-dow" aria-hidden="true">{d}</div>
        ))}
        {days.map((d, i) => {
          const outside = d.getMonth() !== view.getMonth();
          const selected = value ? sameDay(d, value) : false;
          const isToday = sameDay(d, today);
          const disabled = isDisabled(d);
          return (
            <button
              key={i}
              type="button"
              className="mf-calendar-day"
              data-outside={outside ? 'true' : undefined}
              data-selected={selected ? 'true' : undefined}
              data-today={isToday ? 'true' : undefined}
              disabled={disabled}
              onClick={() => onChange?.(d)}
              aria-pressed={selected}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
