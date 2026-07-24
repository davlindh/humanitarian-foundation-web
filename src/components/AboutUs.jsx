import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

const AboutUs = () => {
  const [team, setTeam] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    (async () => {
      const [tRes, pRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: true }),
        supabase.from('group_profiles').select('*').order('created_at', { ascending: true }),
      ]);
      if (c) return;
      setTeam(tRes.data || []);
      setPartners(pRes.data || []);
      setLoading(false);
    })();
    return () => { c = true; };
  }, []);

  return (
    <div className="space-y-24">
      <section className="grid md:grid-cols-[1fr_2fr] gap-10">
        <div>
          <p className="eyebrow">Our Story</p>
          <hr className="rule-gold" />
          <h2 className="text-3xl md:text-4xl">Founded to work with communities, not for them.</h2>
        </div>
        <div className="prose-hufida text-lg text-ink-soft max-w-2xl">
          <p>
            The Humanitarian Foundation for Integrated Development in Africa (HUFIDA)
            was founded on a plain idea: the people closest to a problem should own
            the solution. We started with a single borehole programme in western
            Kenya and grew from there — always slowly, always with local councils
            alongside.
          </p>
          <p>
            Fifteen years on, we run multi-year water, education, and healthcare
            programmes across nine countries. Every programme is designed with the
            district it serves, published with a budget, and audited on outcomes we
            agreed together.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10 border-t border-line pt-16">
        <div>
          <p className="eyebrow">Mission</p>
          <hr className="rule-gold" />
          <h2 className="text-2xl md:text-3xl mb-4">Long-term programmes, community-owned.</h2>
          <p className="text-ink-soft leading-relaxed">
            Deliver water, education, and healthcare programmes that continue
            working long after our teams have handed them over.
          </p>
        </div>
        <div>
          <p className="eyebrow">Vision</p>
          <hr className="rule-gold" />
          <h2 className="text-2xl md:text-3xl mb-4">Every district resourced by its own people.</h2>
          <p className="text-ink-soft leading-relaxed">
            A generation of African districts where the councils, clinics, and
            schools that serve them are run — and funded — by the communities
            themselves.
          </p>
        </div>
      </section>

      <section className="border-t border-line pt-16">
        <p className="eyebrow">Our Impact</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">Fifteen years, measured.</h2>
        <figure className="border border-line bg-parchment/40 p-6">
          <img
            src="/images/infographics/impact-infographic.png"
            alt="HUFIDA impact"
            className="w-full h-auto"
          />
        </figure>
      </section>

      <section className="border-t border-line pt-16">
        <p className="eyebrow">Team</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">The people leading the work.</h2>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : team.length === 0 ? (
          <p className="text-ink-soft">Team profiles coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {team.map((m) => <TeamMember key={m.id} m={m} />)}
          </div>
        )}
      </section>

      <section className="border-t border-line pt-16">
        <p className="eyebrow">Partners & Sponsors</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">Who we work with.</h2>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : partners.length === 0 ? (
          <p className="text-ink-soft">Partners will be listed here.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((p) => (
              <article key={p.id} className="border border-line p-6 flex flex-col">
                <div className="h-24 flex items-center">
                  {p.logo_url ? (
                    <img src={p.logo_url} alt={p.name} className="max-h-20 object-contain" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="w-16 h-16 flex items-center justify-center bg-parchment/60 border border-line font-display text-xl text-emerald-deep tracking-wider"
                    >
                      {p.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                    </span>
                  )}
                </div>
                <h3 className="text-lg mt-4 mb-2">
                  {p.website ? (
                    <a href={p.website} target="_blank" rel="noreferrer" className="hover:text-emerald-deep underline underline-offset-4">
                      {p.name}
                    </a>
                  ) : p.name}
                </h3>
                {p.description && (
                  <p className="text-ink-soft text-sm leading-relaxed">{p.description}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutUs;
