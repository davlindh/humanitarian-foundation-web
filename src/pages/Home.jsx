import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

const stats = [
  { value: '15+', label: 'Years in the field' },
  { value: '24', label: 'Active projects' },
  { value: '38k', label: 'People reached' },
  { value: '9', label: 'Countries' },
];

const statusProgress = { planned: 15, active: 60, completed: 100, paused: 40 };

const formatMonthYear = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : '';

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [supporting, setSupporting] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    let c = false;
    (async () => {
      const [feat, all, news] = await Promise.all([
        supabase.from('projects').select('*').eq('is_featured', true).limit(1).maybeSingle(),
        supabase.from('projects').select('*').neq('status', 'completed')
          .order('created_at', { ascending: false }).limit(4),
        supabase.from('news_posts').select('slug,title,published_at,created_at')
          .eq('is_published', true).lte('published_at', new Date().toISOString())
          .order('published_at', { ascending: false }).limit(3),
      ]);
      if (c) return;
      const featuredRow = feat.data || (all.data && all.data[0]) || null;
      setFeatured(featuredRow);
      const rest = (all.data || []).filter((p) => !featuredRow || p.id !== featuredRow.id).slice(0, 2);
      setSupporting(rest);
      setLatest(news.data || []);
    })();
    return () => { c = true; };
  }, []);

  const featuredProgress = featured ? (statusProgress[featured.status] ?? 50) : 0;

  return (
    <div className="bg-surface">
      {/* HERO */}
      <section className="border-b border-line bg-parchment">
        <div className="container-wide py-16 md:py-24">
          <p className="eyebrow">Humanitarian Foundation for Integrated Development in Africa</p>
          <hr className="rule-gold" />
          <h1 className="text-5xl md:text-7xl max-w-4xl leading-[0.95]">
            Long-term work.<br />
            <span className="text-emerald">Built with</span> the communities we serve.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft leading-relaxed">
            HUFIDA designs and runs multi-year water, education, and healthcare programmes across
            East and Central Africa — measured, transparent, and owned by the people they change.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-involved#donate" className="btn btn-primary font-display tracking-wide">
              Support the work
            </Link>
            <Link to="/projects" className="btn btn-outline font-display tracking-wide">
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      {/* MAGAZINE: featured + supporting */}
      {featured && (
        <section className="section border-b border-line">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
              <article className="lg:col-span-2 border-l-4 border-gold pl-6 md:pl-10">
                <p className="eyebrow">Featured programme{featured.location ? ` · ${featured.location}` : ''}</p>
                <h2 className="text-3xl md:text-5xl mt-2 mb-4">
                  <Link to={`/projects/${featured.slug}`} className="hover:text-emerald-deep">
                    {featured.name}
                  </Link>
                </h2>
                {featured.description && (
                  <p className="text-lg text-ink-soft leading-relaxed max-w-2xl line-clamp-4">
                    {featured.description}
                  </p>
                )}
                <div className="mt-8 max-w-md">
                  <div className="flex justify-between text-sm text-ink-soft mb-2">
                    <span className="font-semibold text-emerald-deep">Programme progress</span>
                    <span>{featuredProgress}%</span>
                  </div>
                  <div
                    className="h-2 bg-line"
                    role="progressbar"
                    aria-valuenow={featuredProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="h-full bg-emerald" style={{ width: `${featuredProgress}%` }} />
                  </div>
                </div>
                <Link
                  to={`/projects/${featured.slug}`}
                  className="inline-block mt-8 text-emerald-deep font-semibold underline underline-offset-4"
                >
                  Read the full programme brief →
                </Link>
              </article>

              <aside className="space-y-8">
                {supporting.map((s) => (
                  <article key={s.id} className="border-t border-line pt-6">
                    <p className="eyebrow">{s.location || s.status || 'Programme'}</p>
                    <h3 className="text-xl mt-1 mb-3 leading-snug">
                      <Link to={`/projects/${s.slug}`} className="hover:text-emerald">{s.name}</Link>
                    </h3>
                    {s.description && (
                      <p className="text-sm text-ink-soft mb-4 line-clamp-3">{s.description}</p>
                    )}
                    <Link
                      to={`/projects/${s.slug}`}
                      className="text-sm text-emerald-deep font-semibold underline underline-offset-4"
                    >
                      Read more →
                    </Link>
                  </article>
                ))}
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* STATS BAND */}
      <section className="bg-emerald-deep text-parchment">
        <div className="container-wide py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl md:text-5xl text-gold">{s.value}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-parchment/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION + NEWS split */}
      <section className="section">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div>
            <p className="eyebrow">Our approach</p>
            <hr className="rule-gold" />
            <h2 className="text-3xl md:text-4xl mb-6">Programmes, not projects.</h2>
            <div className="prose-hufida text-lg">
              <p>
                We commit to communities for years, not funding cycles. Every programme starts with
                a district-level assessment, is designed alongside local councils, and is handed
                over to community ownership once outcomes are measurable and durable.
              </p>
              <p>
                Independent audits, published budgets, and annual impact reports keep the work
                honest — and keep donors, partners, and the people we serve informed.
              </p>
            </div>
            <Link to="/about-us" className="inline-block mt-6 btn btn-outline">
              How we work
            </Link>
          </div>
          <aside className="border-l border-line pl-8">
            <p className="eyebrow">Latest</p>
            <hr className="rule-gold" />
            {latest.length === 0 ? (
              <p className="text-ink-soft text-sm">No news posts yet.</p>
            ) : (
              <ul className="space-y-6">
                {latest.map((n) => (
                  <li key={n.slug}>
                    <div className="text-xs uppercase tracking-widest text-ink-soft">
                      {formatMonthYear(n.published_at || n.created_at)}
                    </div>
                    <Link
                      to={`/news/${n.slug}`}
                      className="block mt-1 font-semibold text-emerald-deep hover:text-emerald"
                    >
                      {n.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link to="/news" className="inline-block mt-6 text-sm underline underline-offset-4">
              All news →
            </Link>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-parchment border-t border-line">
        <div className="container-wide py-16 text-center">
          <p className="eyebrow">Get involved</p>
          <hr className="rule-gold mx-auto" />
          <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">
            The work continues because people choose to support it.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/get-involved#donate" className="btn btn-primary font-display">
              Donate
            </Link>
            <Link to="/get-involved" className="btn btn-outline font-display">
              Volunteer
            </Link>
            <Link to="/partners" className="btn btn-ghost font-display">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
