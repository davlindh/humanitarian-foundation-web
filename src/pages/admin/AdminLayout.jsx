import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { useAuth } from '../auth/AuthContext';

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/tasks', label: 'Tasks' },
  { to: '/admin/milestones', label: 'Milestones' },
  { to: '/admin/resources', label: 'Resources' },
  { to: '/admin/profiles', label: 'Profiles' },
  { to: '/admin/group-profiles', label: 'Group profiles' },
];

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-[80dvh] bg-parchment/30">
      <div className="container-wide py-8">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="text-3xl">HUFIDA workspace</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-ink-soft">{user?.email}</span>
            <button onClick={signOut} className="btn btn-sm btn-outline rounded-none">
              Sign out
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-[220px_1fr] gap-8">
          <aside>
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible" aria-label="Admin navigation">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm border-l-2 whitespace-nowrap ${
                      isActive
                        ? 'border-gold bg-emerald-soft/40 text-emerald-deep font-semibold'
                        : 'border-transparent text-ink-soft hover:text-emerald-deep hover:bg-base-200/60'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="bg-base-100 border border-line p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
