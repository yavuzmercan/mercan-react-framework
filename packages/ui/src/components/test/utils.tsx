import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MercanProvider } from '../MercanProvider';

const Wrap = ({ children }: { children: ReactNode }) => (
  <MercanProvider locale="en" resources={{ en: {} }}>
    {children}
  </MercanProvider>
);

export const renderWithProvider = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrap, ...options });
