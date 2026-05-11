import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, MultiSelect, DatePicker, Calendar } from '../forms';
import { I18nProvider } from '../../core';

const I18nWrap = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider resources={{ en: {} }} defaultLocale="en">
    {children}
  </I18nProvider>
);

const FRUITS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango', label: 'Mango' },
];

describe('Combobox', () => {
  it('opens listbox on focus and shows options', async () => {
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  it('filters options as the user types', async () => {
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'an');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Mango' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Cherry' })).not.toBeInTheDocument();
  });

  it('selects an option on click and fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(onChange).toHaveBeenCalledWith('cherry');
    // Display should now be the selected label
    expect((input as HTMLInputElement).value).toBe('Cherry');
  });

  it('keyboard navigation: ArrowDown then Enter selects highlighted option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalled();
    // After two ArrowDowns from active=0 → active=2 → Cherry
    expect(onChange.mock.calls[0]![0]).toBe('cherry');
  });

  it('Escape closes the listbox', async () => {
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows emptyMessage when no options match', async () => {
    const user = userEvent.setup();
    render(<Combobox options={FRUITS} emptyMessage="No fruit" />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'zzz');
    expect(screen.getByText('No fruit')).toBeInTheDocument();
  });
});

describe('MultiSelect', () => {
  it('toggles selection and renders Tags for each value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<MultiSelect options={FRUITS} onChange={onChange} />);
    await user.click(container.querySelector('.mf-multiselect-control')!);
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenLastCalledWith(['apple']);
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'banana']);
  });

  it('Backspace on empty input removes the last selected tag', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <MultiSelect options={FRUITS} defaultValue={['apple', 'banana']} onChange={onChange} />,
    );
    const input = container.querySelector('.mf-multiselect-input') as HTMLInputElement;
    input.focus();
    await user.keyboard('{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith(['apple']);
  });
});

describe('Calendar', () => {
  it('renders the current month label and 42 day cells', () => {
    const { container } = render(
      <I18nWrap>
        <Calendar value={new Date(2025, 0, 15)} />
      </I18nWrap>,
    );
    const days = container.querySelectorAll('.mf-calendar-day');
    expect(days.length).toBe(42);
  });

  it('highlights the selected day with data-selected', () => {
    const { container } = render(
      <I18nWrap>
        <Calendar value={new Date(2025, 0, 15)} />
      </I18nWrap>,
    );
    const selected = container.querySelector('.mf-calendar-day[data-selected="true"]');
    expect(selected?.textContent).toBe('15');
  });

  it('disables days outside [minDate, maxDate]', () => {
    const { container } = render(
      <I18nWrap>
        <Calendar
          value={new Date(2025, 0, 15)}
          minDate={new Date(2025, 0, 10)}
          maxDate={new Date(2025, 0, 20)}
        />
      </I18nWrap>,
    );
    const allDays = Array.from(
      container.querySelectorAll('.mf-calendar-day'),
    ) as HTMLButtonElement[];
    // The day labelled "5" inside Jan 2025 should be disabled (before minDate)
    const day5 = allDays.find((d) => d.textContent === '5' && d.getAttribute('data-outside') !== 'true');
    expect(day5?.disabled).toBe(true);
    const day25 = allDays.find((d) => d.textContent === '25' && d.getAttribute('data-outside') !== 'true');
    expect(day25?.disabled).toBe(true);
    const day15 = allDays.find((d) => d.textContent === '15' && d.getAttribute('data-outside') !== 'true');
    expect(day15?.disabled).toBe(false);
  });

  it('navigates to next/previous month with the chevron buttons', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <I18nWrap>
        <Calendar value={new Date(2025, 0, 15)} />
      </I18nWrap>,
    );
    const title = () => container.querySelector('.mf-calendar-title')!.textContent;
    const initial = title();
    await user.click(screen.getByLabelText('Next month'));
    expect(title()).not.toBe(initial);
    await user.click(screen.getByLabelText('Previous month'));
    expect(title()).toBe(initial);
  });

  it('fires onChange when a day is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <I18nWrap>
        <Calendar value={new Date(2025, 0, 15)} onChange={onChange} />
      </I18nWrap>,
    );
    await user.click(screen.getByRole('button', { name: '20' }));
    expect(onChange).toHaveBeenCalled();
    const arg = onChange.mock.calls[0]![0] as Date;
    expect(arg.getDate()).toBe(20);
    expect(arg.getMonth()).toBe(0);
    expect(arg.getFullYear()).toBe(2025);
  });
});

describe('DatePicker', () => {
  it('opens the calendar popover when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <I18nWrap>
        <DatePicker />
      </I18nWrap>,
    );
    expect(container.querySelector('.mf-calendar')).not.toBeInTheDocument();
    await user.click(screen.getByRole('textbox'));
    expect(container.querySelector('.mf-calendar')).toBeInTheDocument();
  });

  it('selecting a day fires onChange and closes the popover', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <I18nWrap>
        <DatePicker defaultValue={new Date(2025, 0, 15)} onChange={onChange} />
      </I18nWrap>,
    );
    await user.click(screen.getByRole('textbox'));
    await user.click(within(container.querySelector('.mf-calendar')!).getByRole('button', { name: '22' }));
    expect(onChange).toHaveBeenCalled();
    expect(container.querySelector('.mf-calendar')).not.toBeInTheDocument();
  });

  it('renders the formatted date in the input', () => {
    render(
      <I18nWrap>
        <DatePicker value={new Date(2025, 0, 15)} />
      </I18nWrap>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toMatch(/2025/);
    expect(input.value.length).toBeGreaterThan(0);
  });
});
