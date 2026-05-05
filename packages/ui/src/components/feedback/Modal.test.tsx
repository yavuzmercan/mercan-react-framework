import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '../test/utils';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    renderWithProvider(
      <Modal isOpen={false} onClose={() => {}} title="Hi">body</Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog with title and body when open', () => {
    renderWithProvider(
      <Modal isOpen onClose={() => {}} title="Hi">body</Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('calls onClose when escape is pressed', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProvider(
      <Modal isOpen onClose={onClose} title="Hi">body</Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProvider(
      <Modal isOpen onClose={onClose} title="Hi">body</Modal>,
    );
    const overlay = document.querySelector('.mf-modal-overlay')!;
    await user.click(overlay as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });
});
