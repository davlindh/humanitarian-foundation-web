import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../integrations/supabase/client';

const ROLES = ['admin', 'editor', 'viewer'];

const RoleBadge = ({ role }) => (
  <span className="inline-block text-[10px] tracking-widest uppercase border border-line px-2 py-0.5 mr-1 text-emerald-deep">
    {role}
  </span>
);

const AdminRoles = () => {
  const [users, setUsers] = useState([]);
  const [callerId, setCallerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const call = useCallback(async (body) => {
    const { data, error } = await supabase.functions.invoke('admin-users', {
      body,
    });
    if (error) throw new Error(error.message || 'Request failed');
    if (data?.error) throw new Error(data.error);
    return data;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await call({ action: 'list' });
      setUsers(data.users || []);
      setCallerId(data.callerId);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [call]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRole = async (user, role) => {
    const has = user.roles.includes(role);
    const action = has ? 'revoke' : 'grant';
    setBusy(`${user.id}:${role}`);
    setError(null);
    setNotice(null);
    try {
      await call({ action, userId: user.id, role });
      setNotice(`${has ? 'Revoked' : 'Granted'} ${role} for ${user.email}`);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  return (
    <div>
      <p className="eyebrow">Access</p>
      <hr className="rule-gold" />
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl">Role management</h2>
        <button
          onClick={load}
          className="text-xs tracking-widest uppercase border border-line px-3 py-1.5 hover:border-gold"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 border border-line bg-parchment p-3 text-sm text-ink">
          <strong className="text-emerald-deep">Error:</strong> {error}
        </div>
      )}
      {notice && (
        <div className="mb-4 border border-line bg-parchment/60 p-3 text-sm text-ink-soft">
          {notice}
        </div>
      )}

      {loading ? (
        <p className="text-ink-soft">Loading users…</p>
      ) : users.length === 0 ? (
        <p className="text-ink-soft">No users yet.</p>
      ) : (
        <div className="border border-line divide-y divide-line">
          {users.map((u) => (
            <div key={u.id} className="p-4 flex flex-wrap items-center gap-4 justify-between">
              <div className="min-w-0">
                <div className="font-display text-emerald-deep truncate">
                  {u.email || u.id}
                  {u.id === callerId && (
                    <span className="ml-2 text-[10px] tracking-widest uppercase text-ink-soft">
                      (you)
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  {u.roles.length === 0 ? (
                    <span className="text-xs text-ink-soft">No roles</span>
                  ) : (
                    u.roles.map((r) => <RoleBadge key={r} role={r} />)
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => {
                  const has = u.roles.includes(role);
                  const key = `${u.id}:${role}`;
                  const isBusy = busy === key;
                  return (
                    <button
                      key={role}
                      onClick={() => toggleRole(u, role)}
                      disabled={isBusy}
                      className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition ${
                        has
                          ? 'bg-emerald-deep text-paper border-emerald-deep hover:bg-emerald-deep/90'
                          : 'border-line text-ink hover:border-gold'
                      } ${isBusy ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      {has ? `Revoke ${role}` : `Grant ${role}`}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-ink-soft">
        The final admin cannot be demoted, and you cannot revoke your own admin role.
      </p>
    </div>
  );
};

export default AdminRoles;
