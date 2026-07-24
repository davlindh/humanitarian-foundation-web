import React from 'react';
import { cx } from './cx';

const variantClass = {
  neutral: '',
  brand: 'hf-badge--brand',
  gold: 'hf-badge--gold',
  success: 'hf-badge--success',
  warning: 'hf-badge--warning',
  danger: 'hf-badge--danger',
};

export default function Badge({ variant = 'neutral', className, children, ...rest }) {
  return (
    <span className={cx('hf-badge', variantClass[variant], className)} {...rest}>
      {children}
    </span>
  );
}
