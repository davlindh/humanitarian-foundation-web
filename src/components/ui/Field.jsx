import React from 'react';
import { cx } from './cx';

export function Field({ label, hint, error, required, children }) {
  return (
    <label className="block mb-4">
      {label && (
        <span className="hf-field-label">
          {label}
          {required && <span className="ml-1 text-content-accent">*</span>}
        </span>
      )}
      {children}
      {error && <span className="block text-xs text-danger mt-1">{error}</span>}
      {!error && hint && <span className="block text-xs text-content-soft mt-1">{hint}</span>}
    </label>
  );
}

export const Input = React.forwardRef(function Input({ error, className, ...rest }, ref) {
  return <input ref={ref} className={cx('hf-input', error && 'hf-input--error', className)} {...rest} />;
});

export const Textarea = React.forwardRef(function Textarea({ error, rows = 4, className, ...rest }, ref) {
  return <textarea ref={ref} rows={rows} className={cx('hf-textarea', error && 'hf-textarea--error', className)} {...rest} />;
});

export const Select = React.forwardRef(function Select({ error, className, children, ...rest }, ref) {
  return (
    <select ref={ref} className={cx('hf-select', error && 'hf-select--error', className)} {...rest}>
      {children}
    </select>
  );
});
