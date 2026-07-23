import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../auth/AuthContext';

const AuthPage = () => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';

  React.useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + '/admin' },
        });
        if (error) throw error;
        setMsg({ type: 'success', text: 'Check your email to confirm your account.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80dvh] bg-parchment/40">
      <div className="container-wide py-16">
        <div className="max-w-md mx-auto bg-base-100 border border-line rounded-none shadow-sm p-8">
          <p className="eyebrow">Team access</p>
          <hr className="rule-gold" />
          <h1 className="text-3xl mb-2">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h1>
          <p className="text-ink-soft mb-6 text-sm">
            Admin area for HUFIDA staff and program coordinators.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control w-full">
              <span className="label-text mb-1 font-medium">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full rounded-none"
                autoComplete="email"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1 font-medium">Password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full rounded-none"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </label>
            {msg && (
              <div
                role="alert"
                className={`text-sm p-3 border ${
                  msg.type === 'error'
                    ? 'border-error text-error bg-error/5'
                    : 'border-emerald text-emerald-deep bg-emerald-soft/40'
                }`}
              >
                {msg.text}
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary w-full rounded-none"
            >
              {busy ? '...' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <div className="mt-6 text-sm text-ink-soft flex justify-between">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="underline"
            >
              {mode === 'signin' ? 'Need an account?' : 'Already have an account?'}
            </button>
            <Link to="/" className="underline">Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
