import React from 'react';
import { Link } from 'react-router-dom';
import { cx } from './cx';

const variantClass = {
  primary: 'hf-btn--primary',
  secondary: 'hf-btn--secondary',
  ghost: 'hf-btn--ghost',
  link: 'hf-btn--link',
  donate: 'hf-btn--donate',
  danger: 'hf-btn--danger',
};

const sizeClass = {
  sm: 'hf-btn--sm',
  md: '',
  lg: 'hf-btn--lg',
};

const Button = React.forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', block, loading, className, children, ...rest },
  ref
) {
  const classes = cx(
    'hf-btn',
    variantClass[variant],
    sizeClass[size],
    block && 'hf-btn--block',
    className
  );

  const content = loading ? <span aria-live="polite">…</span> : children;

  if (to) return <Link ref={ref} to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a ref={ref} href={href} className={classes} {...rest}>{content}</a>;
  const Tag = as || 'button';
  return (
    <Tag ref={ref} className={classes} disabled={rest.disabled || loading} {...rest}>
      {content}
    </Tag>
  );
});

export default Button;
