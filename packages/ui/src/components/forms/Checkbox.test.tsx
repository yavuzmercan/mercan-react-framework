import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../test/utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles checked state and calls onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProvider(<Checkbox label="Agree" onChange={onChange} />);
    const cb = screen.getByLabelText('Agree') as HTMLInputElement;
    expect(cb.checked).toBe(false);
    await user.click(cb);
    expect(onChange).toHaveBeenCalled();
  });

  it('respects disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderWithProvider(<Checkbox label="X" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('X'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
