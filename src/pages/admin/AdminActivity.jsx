import React, { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';

const ACTION_STYLE = {
  INSERT: 'text-emerald-deep border-emerald-deep',
  UPDATE: 'text-ink border-gold',
  DELETE: 'text-red-700 border-red-700',
};

const TABLES = ['all', 'projects', 'tasks', 'milestones', 'resources', 'profiles', 'group_profiles', 'news_posts', 'user_roles'];

const AdminActivity = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [table, setTable] = useState('all');
  const [expanded, setExpanded] = useState({});

  const load = async () => {
    setLoading(true);
    setError(null);
    let q = supabase
      .from('admin_activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (table !== 'all') q = q.eq('table_name', table);
    const { data, error } = await q;
    if (error) setError(error.message);
    else setRows(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div>
      <p className="eyebrow">Audit</p>
      <hr className="rule-gold" />
      <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
        <h2 className="text-2xl">Activity log</h2>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="tbl" className="text-ink-soft">Table</label>
          <select
            id="tbl"
            value={table}
            onChange={(e) => setTable(e.target.value)}
            className="border border-line bg-paper px-2 py-1"
          >
            {TABLES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button onClick={load} className="btn btn-sm btn-outline rounded-none">Refresh</button>
        </div>
      </div>

      {loading && <p className="text-ink-soft">Loading…</p>}
      {error && <p className="text-red-700">{error}</p>}
      {!loading && !error && rows.length === 0 && (
        <p className="text-ink-soft">No activity yet.</p>
      )}

      <ul className="divide-y divide-line border border-line bg-paper">
        {rows.map((r) => (
          <li key={r.id} className="p-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className={`inline-block border px-2 py-0.5 text-xs font-semibold ${ACTION_STYLE[r.action] || 'border-line text-ink-soft'}`}>
                {r.action}
              </span>
              <span className="font-display text-emerald-deep">{r.table_name}</span>
              <span className="text-ink">{r.record_name}</span>
              <span className="text-ink-soft ml-auto">
                {new Date(r.created_at).toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-ink-soft mt-1">
              by {r.user_email || r.user_id || 'system'}
            </div>
            <button
              onClick={() => toggle(r.id)}
              className="text-xs text-emerald-deep underline mt-2"
            >
              {expanded[r.id] ? 'Hide' : 'Show'} payload
            </button>
            {expanded[r.id] && (
              <pre className="mt-2 text-xs bg-parchment/40 border border-line p-3 overflow-x-auto">
                {JSON.stringify(r.changes, null, 2)}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminActivity;
