import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../auth/AuthContext';
import { Button, Link, Field, Input, Divider } from '../components/ui';

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
    <div className="min-h-[80dvh] bg-surface-paper/40">
      <div className="container-wide py-16">
        <div className="max-w-md mx-auto bg-surface-elevated rounded-card shadow-soft p-8">
          <p className="eyebrow">Team access</p>
          <Divider variant="rule" />
          <h1 className="font-serif text-3xl mb-2">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h1>
          <p className="text-content-soft mb-6 text-sm">
            Admin area for HUFIDA staff and program coordinators.
          </p>
          <form onSubmit={handleSubmit} className="space-y-1">
            <Field label="Email" required>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>
            <Field label="Password" required>
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
            </Field>
            {msg && (
              <div
                role="alert"
                className={`text-sm p-3 rounded-md border ${
                  msg.type === 'error'
                    ? 'border-danger text-danger bg-danger/5'
                    : 'border-emerald text-content-brand bg-emerald-soft/40'
                }`}
              >
                {msg.text}
              </div>
            )}
            <Button type="submit" disabled={busy} block>
              {busy ? '…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
          <div className="mt-6 text-sm text-content-soft flex justify-between">
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="hf-link hf-link--muted"
            >
              {mode === 'signin' ? 'Need an account?' : 'Already have an account?'}
            </button>
            <Link to="/" variant="muted">Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
