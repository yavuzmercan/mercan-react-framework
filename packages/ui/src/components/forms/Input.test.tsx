import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../test/utils';
import { Input } from './Input';

describe('Input', () => {
  it('forwards typed value', async () => {
    const user = userEvent.setup();
    renderWithProvider(<Input placeholder="Name" />);
    const input = screen.getByPlaceholderText('Name');
    await user.type(input, 'Ada');
    expect(input).toHaveValue('Ada');
  });

  it('marks invalid via data-attr', () => {
    renderWithProvider(<Input invalid placeholder="x" />);
    expect(screen.getByPlaceholderText('x')).toHaveAttribute('data-invalid', 'true');
  });
});
