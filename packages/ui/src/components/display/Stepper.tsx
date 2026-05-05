import { Fragment, type ReactNode } from 'react';
import { cx } from '../../core';

export interface StepperStep {
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  active: number;
  className?: string;
}

export const Stepper = ({ steps, active, className }: StepperProps) => (
  <div className={cx('mf-stepper', className)}>
    {steps.map((step, i) => {
      const state = i < active ? 'complete' : i === active ? 'active' : 'pending';
      const isLast = i === steps.length - 1;
      return (
        <Fragment key={i}>
          <div className="mf-stepper-step" data-state={state}>
            <span className="mf-stepper-marker" aria-current={state === 'active' ? 'step' : undefined}>
              {state === 'complete' ? '✓' : i + 1}
            </span>
            <span className="mf-stepper-label">{step.label}</span>
          </div>
          {!isLast && <div className="mf-stepper-line" data-complete={i < active ? 'true' : undefined} />}
        </Fragment>
      );
    })}
  </div>
);
