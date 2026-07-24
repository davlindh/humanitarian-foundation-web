import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { supabase } from '../integrations/supabase/client';

const Spinner = () => (
  <div className="min-h-[60dvh] flex items-center justify-center">
    <span className="loading loading-spinner text-primary" aria-label="Loading" />
  </div>
);

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [roles, setRoles] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);
      if (cancelled) return;
      if (error) setErr(error.message);
      setRoles((data || []).map((r) => r.role));
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  if (roles === null && !err) return <Spinner />;

  const isAdmin = (roles || []).includes('admin');
  if (!isAdmin) {
    return (
      <div className="container-narrow py-20">
        <p className="eyebrow">Access</p>
        <hr className="rule-gold" />
        <h1 className="text-3xl mb-4">Admin only</h1>
        <p className="text-ink-soft mb-6">
          You&rsquo;re signed in as <strong>{user.email}</strong>, but this workspace is
          restricted to administrators. Ask an existing admin to grant you access from
          <em> /admin/roles</em>.
        </p>
        {err && <p className="text-red-700 text-sm mb-4">Role check failed: {err}</p>}
        <Link
          to="/"
          className="text-xs tracking-widest uppercase border border-line px-4 py-2 hover:border-gold"
        >
          Back to site
        </Link>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
