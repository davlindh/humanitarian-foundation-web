import React from 'react';
import { cx } from './cx';

const surfaceClass = {
  elevated: '',
  paper: 'hf-card--paper',
  inverse: 'hf-card--inverse',
};

export default function Card({ surface = 'elevated', hoverable, as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag
      className={cx('hf-card', surfaceClass[surface], hoverable && 'hf-card--hoverable', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
