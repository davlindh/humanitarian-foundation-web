import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../integrations/supabase/client';

const TIER_ORDER = ['Government', 'Coalition', 'Foundation', 'Assurance', 'Partner'];

const PartnerCard = ({ p }) => {
  const [open, setOpen] = useState(false);
  const long = (p.description || '').length > 240;
  const shown = !long || open ? p.description : (p.description || '').slice(0, 240).trimEnd() + '…';

  return (
    <article className="border border-line p-8 bg-surface flex flex-col">
      <p className="eyebrow">{p.tier || 'Partner'}</p>
      <h3 className="text-2xl mt-2 mb-3">{p.name}</h3>
      {p.description && (
        <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">{shown}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-4">
        {long && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-emerald-deep font-semibold underline underline-offset-4 text-sm"
          >
            {open ? 'Read less ←' : 'Read more →'}
          </button>
        )}
        {p.website && (
          <a
            href={p.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink-soft underline underline-offset-4 hover:text-emerald-deep"
          >
            Visit website ↗
          </a>
        )}
      </div>
    </article>
  );
};

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('group_profiles').select('*').order('name', { ascending: true });
      if (active) { setPartners(data || []); setLoading(false); }
    })();
    return () => { active = false; };
  }, []);

  const grouped = useMemo(() => {
    const buckets = {};
    partners.forEach((p) => {
      const tier = p.tier || 'Partner';
      (buckets[tier] ||= []).push(p);
    });
    return Object.entries(buckets).sort(([a], [b]) => {
      const ai = TIER_ORDER.indexOf(a);
      const bi = TIER_ORDER.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [partners]);

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="The organisations we work with."
        lead="HUFIDA works alongside ministries, foundations, and grassroots coalitions. Programmes are only as strong as the partnerships behind them."
      />
      <section className="section">
        <div className="container-wide space-y-16">
          {loading ? (
            <p className="text-ink-soft">Loading…</p>
          ) : partners.length === 0 ? (
            <p className="text-ink-soft">Partner organisations will be listed here once added.</p>
          ) : (
            grouped.map(([tier, rows]) => (
              <div key={tier}>
                <p className="eyebrow">{tier}</p>
                <hr className="rule-gold" />
                <h2 className="text-2xl md:text-3xl mb-8">{rows.length} organisation{rows.length === 1 ? '' : 's'}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {rows.map((p) => <PartnerCard key={p.id} p={p} />)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
