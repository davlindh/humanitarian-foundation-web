import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HIDE_ON = new Set(['/', '/auth']);

const format = (seg) =>
  seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const Breadcrumb = () => {
  const location = useLocation();
  if (HIDE_ON.has(location.pathname)) return null;

  const parts = location.pathname.split('/').filter(Boolean);

  return (
    <nav
      className="border-b border-line bg-parchment/50 text-xs uppercase tracking-widest"
      aria-label="Breadcrumb"
    >
      <ol className="container-wide py-2 flex flex-wrap gap-x-2 gap-y-1 text-ink-soft">
        <li>
          <Link to="/" className="hover:text-emerald-deep">Home</Link>
        </li>
        {parts.map((seg, i) => {
          const to = '/' + parts.slice(0, i + 1).join('/');
          const last = i === parts.length - 1;
          return (
            <React.Fragment key={to}>
              <li aria-hidden>/</li>
              <li>
                {last ? (
                  <span className="text-emerald-deep">{format(seg)}</span>
                ) : (
                  <Link to={to} className="hover:text-emerald-deep">{format(seg)}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
