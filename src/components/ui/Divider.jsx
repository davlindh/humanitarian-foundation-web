import React from 'react';
import { cx } from './cx';

export default function Divider({ variant = 'hairline', className }) {
  if (variant === 'rule') return <hr className={cx('hf-divider--rule', className)} aria-hidden="true" />;
  if (variant === 'soft') return <hr className={cx('hf-divider hf-divider--soft', className)} />;
  return <hr className={cx('hf-divider', className)} />;
}
