import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../integrations/supabase/client';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('group_profiles')
        .select('*')
        .order('name', { ascending: true });
      if (active) {
        setPartners(data || []);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="The organisations we work with."
        lead="HUFIDA works alongside ministries, foundations, and grassroots coalitions. Programmes are only as strong as the partnerships behind them."
      />
      <section className="section">
        <div className="container-wide">
          {loading ? (
            <p className="text-ink-soft">Loading…</p>
          ) : partners.length === 0 ? (
            <p className="text-ink-soft">Partner organisations will be listed here once added.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {partners.map((p) => (
                <article key={p.id} className="border border-line p-8 bg-base-100 flex flex-col">
                  <p className="eyebrow">{p.tier || 'Partner'}</p>
                  <h2 className="text-2xl mt-2 mb-3">
                    {p.website ? (
                      <a href={p.website} target="_blank" rel="noreferrer" className="hover:text-emerald-deep underline underline-offset-4">
                        {p.name}
                      </a>
                    ) : p.name}
                  </h2>
                  {p.description && <p className="text-ink-soft leading-relaxed">{p.description}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
