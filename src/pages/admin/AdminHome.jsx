import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { to: '/admin/projects', label: 'Projects', desc: 'Create and review program projects.' },
  { to: '/admin/tasks', label: 'Tasks', desc: 'Field and office tasks assigned to the team.' },
  { to: '/admin/milestones', label: 'Milestones', desc: 'Track progress against program milestones.' },
  { to: '/admin/resources', label: 'Resources', desc: 'Materials, docs, and shared references.' },
  { to: '/admin/profiles', label: 'Profiles', desc: 'Individuals working with HUFIDA.' },
  { to: '/admin/group-profiles', label: 'Group profiles', desc: 'Partner organizations and cohorts.' },
  { to: '/admin/roles', label: 'Roles', desc: 'Grant or revoke admin access for other users.' },
];

const AdminHome = () => (
  <div>
    <p className="eyebrow">Overview</p>
    <hr className="rule-gold" />
    <h2 className="text-2xl mb-6">Where would you like to work?</h2>
    <div className="grid sm:grid-cols-2 gap-4">
      {cards.map((c) => (
        <Link
          key={c.to}
          to={c.to}
          className="block border border-line bg-parchment/40 p-5 hover:border-gold transition"
        >
          <div className="font-display text-lg text-emerald-deep">{c.label}</div>
          <div className="text-sm text-ink-soft mt-1">{c.desc}</div>
        </Link>
      ))}
    </div>
  </div>
);

export default AdminHome;
