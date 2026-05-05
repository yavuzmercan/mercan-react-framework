import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../../core';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(({ className, ...rest }, ref) => (
  <input ref={ref} type="range" className={cx('mf-slider', className)} {...rest} />
));
Slider.displayName = 'Slider';
