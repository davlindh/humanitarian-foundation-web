import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

const FeaturedProjects = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let c = false;
    (async () => {
      const { data } = await supabase
        .from('projects').select('*')
        .neq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(3);
      if (!c) setRows(data || []);
    })();
    return () => { c = true; };
  }, []);

  if (rows.length === 0) return null;

  return (
    <section className="mb-20">
      <p className="eyebrow">Highlighted Programmes</p>
      <hr className="rule-gold" />
      <div className="flex items-baseline justify-between flex-wrap gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl">Programmes we're running now.</h2>
        <Link to="/projects" className="eyebrow text-emerald-deep hover:text-gold">All programmes →</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {rows.map((p) => (
          <article key={p.id} className="border border-line group flex flex-col">
            <Link to={`/projects/${p.slug}`} className="aspect-[4/3] overflow-hidden bg-parchment/40 block">
              {p.cover_image ? (
                <img
                  src={p.cover_image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-soft">No image</div>
              )}
            </Link>
            <div className="p-6 flex-1 flex flex-col">
              {p.location && <p className="eyebrow">{p.location}</p>}
              <h3 className="text-xl mt-2 mb-2">
                <Link to={`/projects/${p.slug}`} className="hover:text-emerald-deep">{p.name}</Link>
              </h3>
              {p.description && (
                <p className="text-ink-soft text-sm leading-relaxed line-clamp-3">{p.description}</p>
              )}
              <Link
                to={`/projects/${p.slug}`}
                className="mt-4 text-sm text-emerald-deep font-semibold underline underline-offset-4"
              >
                Learn more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
