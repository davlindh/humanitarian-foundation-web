import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { logPageView } from '../utils/analytics';
import { useAuth } from '../auth/AuthContext';

const primaryLinks = [
  { to: '/about-us', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/news', label: 'News' },
  { to: '/blog', label: 'Blog' },
  { to: '/partners', label: 'Partners' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium tracking-wide transition ${
    isActive
      ? 'text-emerald-deep border-b-2 border-gold'
      : 'text-ink hover:text-emerald-deep border-b-2 border-transparent hover:border-emerald/40'
  }`;

const NavigationBar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    logPageView();
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-line">
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-emerald-deep tracking-tight">HUFIDA</span>
          <span className="hidden sm:inline text-xs text-ink-soft uppercase tracking-widest">
            Sustainable Development
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primaryLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/get-involved#donate"
            className="ml-3 btn btn-primary btn-sm font-display tracking-wide"
          >
            Donate
          </Link>
          {user ? (
            <Link to="/admin" className="ml-1 btn btn-ghost btn-sm">Admin</Link>
          ) : null}
        </nav>

        <button
          type="button"
          className="lg:hidden btn btn-ghost btn-sm"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-surface">
          <nav className="container-wide py-3 flex flex-col" aria-label="Mobile">
            {primaryLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-3 border-b border-line text-base ${
                    isActive ? 'text-emerald-deep font-semibold' : 'text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/get-involved#donate"
              className="mt-4 btn btn-primary font-display"
            >
              Donate
            </Link>
            {user && (
              <Link to="/admin" className="mt-2 btn btn-outline">Admin</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationBar;
