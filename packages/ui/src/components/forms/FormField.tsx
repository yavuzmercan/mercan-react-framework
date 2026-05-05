import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactNode } from 'react';
import { cx, useUniqueId } from '../../core';
import { Label } from '../typography/Label';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  helpText?: ReactNode;
  errorText?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  helpText,
  errorText,
  required,
  htmlFor,
  className,
  children,
  ...rest
}: FormFieldProps) => {
  const generated = useUniqueId('field');
  const id = htmlFor ?? generated;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const invalid = !!errorText;

  const child = Children.only(children);
  const enhanced = isValidElement(child)
    ? cloneElement(child as React.ReactElement<any>, {
        id: (child.props as any).id ?? id,
        'aria-invalid': invalid || (child.props as any)['aria-invalid'],
        'aria-describedby':
          [helpText && helpId, errorText && errorId].filter(Boolean).join(' ') || undefined,
        invalid: invalid || (child.props as any).invalid,
      })
    : child;

  return (
    <div className={cx('mf-field', className)} {...rest}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {enhanced}
      {helpText && !errorText && (
        <span id={helpId} className="mf-field-help">
          {helpText}
        </span>
      )}
      {errorText && (
        <span id={errorId} className="mf-field-error" role="alert">
          {errorText}
        </span>
      )}
    </div>
  );
};
