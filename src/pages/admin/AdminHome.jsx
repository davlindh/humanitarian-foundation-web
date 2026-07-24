import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';

const resources = [
  { key: 'projects', to: '/admin/projects', label: 'Projects' },
  { key: 'tasks', to: '/admin/tasks', label: 'Tasks' },
  { key: 'milestones', to: '/admin/milestones', label: 'Milestones' },
  { key: 'resources', to: '/admin/resources', label: 'Resources' },
  { key: 'profiles', to: '/admin/profiles', label: 'People' },
  { key: 'group_profiles', to: '/admin/group-profiles', label: 'Partners' },
];

const fmt = (n) => (n === null || n === undefined ? '—' : n.toLocaleString());

const ACTION_LABEL = {
  INSERT: 'created',
  UPDATE: 'updated',
  DELETE: 'deleted',
};

const AdminHome = () => {
  const [counts, setCounts] = useState({});
  const [news, setNews] = useState({ live: 0, drafts: 0, scheduled: 0 });
  const [activity, setActivity] = useState([]);
  const [attention, setAttention] = useState({ drafts: 0, scheduled: 0, orphanTasks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const countPromises = resources.map((r) =>
        supabase.from(r.key).select('*', { count: 'exact', head: true })
      );
      const now = new Date().toISOString();
      const [countsRes, liveRes, draftsRes, schedRes, actRes, orphanRes] = await Promise.all([
        Promise.all(countPromises),
        supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', true).lte('published_at', now),
        supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', false),
        supabase.from('news_posts').select('*', { count: 'exact', head: true }).eq('is_published', true).gt('published_at', now),
        supabase.from('admin_activity_log').select('id,user_email,table_name,action,record_name,created_at').order('created_at', { ascending: false }).limit(8),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).is('project_id', null),
      ]);
      if (cancelled) return;
      const nextCounts = {};
      resources.forEach((r, i) => { nextCounts[r.key] = countsRes[i].count ?? 0; });
      setCounts(nextCounts);
      setNews({ live: liveRes.count ?? 0, drafts: draftsRes.count ?? 0, scheduled: schedRes.count ?? 0 });
      setActivity(actRes.data ?? []);
      setAttention({ drafts: draftsRes.count ?? 0, scheduled: schedRes.count ?? 0, orphanTasks: orphanRes.count ?? 0 });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <hr className="rule-gold" />
      <h2 className="text-2xl mb-6">Workspace at a glance</h2>

      {/* Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {resources.map((r) => (
          <Link
            key={r.key}
            to={r.to}
            className="block border border-line bg-parchment/40 p-4 hover:border-gold transition"
          >
            <div className="text-3xl font-display text-emerald-deep">{loading ? '…' : fmt(counts[r.key])}</div>
            <div className="text-xs tracking-widest uppercase text-ink-soft mt-1">{r.label}</div>
          </Link>
        ))}
        <Link to="/admin/news" className="block border border-line bg-parchment/40 p-4 hover:border-gold transition col-span-2">
          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-3xl font-display text-emerald-deep">{loading ? '…' : fmt(news.live)}</div>
              <div className="text-xs tracking-widest uppercase text-ink-soft mt-1">News · Live</div>
            </div>
            <div className="text-sm text-ink-soft">
              {fmt(news.drafts)} drafts · {fmt(news.scheduled)} scheduled
            </div>
          </div>
        </Link>
        <Link to="/admin/roles" className="block border border-line bg-parchment/40 p-4 hover:border-gold transition">
          <div className="font-display text-emerald-deep">Roles</div>
          <div className="text-xs text-ink-soft mt-1">Manage admin access</div>
        </Link>
        <Link to="/admin/activity" className="block border border-line bg-parchment/40 p-4 hover:border-gold transition">
          <div className="font-display text-emerald-deep">Activity log</div>
          <div className="text-xs text-ink-soft mt-1">Full audit trail</div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        {/* Recent activity */}
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-lg text-emerald-deep">Recent activity</h3>
            <Link to="/admin/activity" className="text-xs tracking-widest uppercase text-ink-soft hover:text-emerald-deep">
              View all →
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : activity.length === 0 ? (
            <div className="border border-dashed border-line bg-parchment/30 p-6 text-sm text-ink-soft text-center">
              No admin actions yet. Create or edit content to populate the log.
            </div>
          ) : (
            <ul className="border border-line divide-y divide-line bg-paper">
              {activity.map((a) => (
                <li key={a.id} className="p-3 text-sm">
                  <div className="text-ink">
                    <span className="text-emerald-deep font-semibold">{a.user_email || 'system'}</span>{' '}
                    {ACTION_LABEL[a.action] || a.action.toLowerCase()}{' '}
                    <span className="italic">{a.record_name}</span>{' '}
                    <span className="text-ink-soft">in {a.table_name}</span>
                  </div>
                  <div className="text-xs text-ink-soft mt-0.5">
                    {new Date(a.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Needs attention */}
        <section>
          <h3 className="font-display text-lg text-emerald-deep mb-4">Needs attention</h3>
          <ul className="border border-line divide-y divide-line bg-paper text-sm">
            <li className="p-3 flex justify-between items-center">
              <div>
                <div className="text-ink">News drafts</div>
                <div className="text-xs text-ink-soft">Unpublished posts</div>
              </div>
              <Link to="/admin/news?status=draft" className="text-emerald-deep font-semibold">
                {fmt(attention.drafts)} →
              </Link>
            </li>
            <li className="p-3 flex justify-between items-center">
              <div>
                <div className="text-ink">Scheduled posts</div>
                <div className="text-xs text-ink-soft">Future publish date</div>
              </div>
              <Link to="/admin/news?status=scheduled" className="text-emerald-deep font-semibold">
                {fmt(attention.scheduled)} →
              </Link>
            </li>
            <li className="p-3 flex justify-between items-center">
              <div>
                <div className="text-ink">Unassigned tasks</div>
                <div className="text-xs text-ink-soft">No linked project</div>
              </div>
              <Link to="/admin/tasks" className="text-emerald-deep font-semibold">
                {fmt(attention.orphanTasks)} →
              </Link>
            </li>
          </ul>

          <h3 className="font-display text-lg text-emerald-deep mt-8 mb-4">Quick create</h3>
          <div className="flex flex-col gap-2">
            <Link to="/admin/news?new=1" className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold text-center">
              + New news post
            </Link>
            <Link to="/admin/projects?new=1" className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold text-center">
              + New project
            </Link>
            <Link to="/admin/profiles?new=1" className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold text-center">
              + New team member
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
