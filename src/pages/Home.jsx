import React from 'react';
import { Link } from 'react-router-dom';

const featured = {
  eyebrow: 'Featured Program',
  title: 'Clean water for 10,000 people across rural Kenya',
  lead:
    'Working with village councils and district health offices to build durable borehole systems and train local operators — moving communities from unsafe surface water to reliable, tested supply.',
  progress: 70,
  href: '/projects',
};

const supporting = [
  {
    eyebrow: 'Education',
    title: 'Five new primary schools underway in Uganda',
    excerpt:
      'A cohort of 1,000 students and 40 teachers now working from purpose-built classrooms with locally produced materials.',
    stat: '1,000',
    statLabel: 'students reached',
    href: '/projects',
  },
  {
    eyebrow: 'Healthcare',
    title: 'Three health centres renovated and re-equipped',
    excerpt:
      'Refurbished maternity and outpatient wings serving four districts, staffed and supplied to national standards.',
    stat: '80%',
    statLabel: 'programme complete',
    href: '/projects',
  },
];

const stats = [
  { value: '15+', label: 'Years in the field' },
  { value: '24', label: 'Active projects' },
  { value: '38k', label: 'People reached' },
  { value: '9', label: 'Countries' },
];

const news = [
  { date: 'Jul 2026', title: 'HUFIDA joins WASH coalition for the Great Lakes region', href: '/news' },
  { date: 'Jun 2026', title: '2025 impact report published', href: '/news' },
  { date: 'May 2026', title: 'New five-year partnership with district ministries', href: '/news' },
];

const Home = () => {
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
            <Link to="/get-involved#donate" className="btn btn-primary rounded-none font-display tracking-wide">
              Support the work
            </Link>
            <Link to="/projects" className="btn btn-outline rounded-none font-display tracking-wide">
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      {/* MAGAZINE: featured + supporting */}
      <section className="section border-b border-line">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Featured (2/3) */}
            <article className="lg:col-span-2 border-l-4 border-gold pl-6 md:pl-10">
              <p className="eyebrow">{featured.eyebrow}</p>
              <h2 className="text-3xl md:text-5xl mt-2 mb-4">{featured.title}</h2>
              <p className="text-lg text-ink-soft leading-relaxed max-w-2xl">
                {featured.lead}
              </p>
              <div className="mt-8 max-w-md">
                <div className="flex justify-between text-sm text-ink-soft mb-2">
                  <span className="font-semibold text-emerald-deep">Programme progress</span>
                  <span>{featured.progress}%</span>
                </div>
                <div
                  className="h-2 bg-base-300"
                  role="progressbar"
                  aria-valuenow={featured.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full bg-emerald" style={{ width: `${featured.progress}%` }} />
                </div>
              </div>
              <Link
                to={featured.href}
                className="inline-block mt-8 text-emerald-deep font-semibold underline underline-offset-4"
              >
                Read the full programme brief →
              </Link>
            </article>

            {/* Supporting (1/3 stack) */}
            <aside className="space-y-8">
              {supporting.map((s) => (
                <article key={s.title} className="border-t border-line pt-6">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3 className="text-xl mt-1 mb-3 leading-snug">
                    <Link to={s.href} className="hover:text-emerald">{s.title}</Link>
                  </h3>
                  <p className="text-sm text-ink-soft mb-4">{s.excerpt}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl text-gold">{s.stat}</span>
                    <span className="text-xs uppercase tracking-widest text-ink-soft">
                      {s.statLabel}
                    </span>
                  </div>
                </article>
              ))}
            </aside>
          </div>
        </div>
      </section>

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
            <Link to="/about-us" className="inline-block mt-6 btn btn-outline rounded-none">
              How we work
            </Link>
          </div>
          <aside className="border-l border-line pl-8">
            <p className="eyebrow">Latest</p>
            <hr className="rule-gold" />
            <ul className="space-y-6">
              {news.map((n) => (
                <li key={n.title}>
                  <div className="text-xs uppercase tracking-widest text-ink-soft">{n.date}</div>
                  <Link to={n.href} className="block mt-1 font-semibold text-emerald-deep hover:text-emerald">
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
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
            <Link to="/get-involved#donate" className="btn btn-primary rounded-none font-display">
              Donate
            </Link>
            <Link to="/get-involved" className="btn btn-outline rounded-none font-display">
              Volunteer
            </Link>
            <Link to="/partners" className="btn btn-ghost rounded-none font-display">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
