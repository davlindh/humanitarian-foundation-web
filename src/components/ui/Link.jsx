import React from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { cx } from './cx';

const variantClass = {
  inline: 'hf-link',
  muted: 'hf-link hf-link--muted',
  standalone: 'hf-link hf-link--standalone',
};

export function Link({ to, href, variant = 'inline', className, children, ...rest }) {
  const cls = cx(variantClass[variant], className);
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <RouterLink to={to} className={cls} {...rest}>{children}</RouterLink>;
}

export function NavItem({ to, className, children, ...rest }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          'px-3 py-2 text-sm font-medium tracking-wide transition-fast ease-editorial border-b-2',
          isActive
            ? 'text-content-brand border-content-accent'
            : 'text-content border-transparent hover:text-content-brand hover:border-content-accent/40',
          className
        )
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}

export default Link;
