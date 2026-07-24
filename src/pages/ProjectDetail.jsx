import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

const statusProgress = { planned: 15, active: 60, completed: 100, paused: 40 };

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [state, setState] = useState('loading');
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    let c = false;
    (async () => {
      const { data, error } = await supabase
        .from('projects').select('*').eq('slug', slug).maybeSingle();
      if (c) return;
      if (error || !data) { setState('missing'); return; }
      setProject(data);
      const { data: ms } = await supabase
        .from('milestones').select('*').eq('project_id', data.id).order('due_date', { ascending: true });
      if (c) return;
      setMilestones(ms || []);
      setState('ready');
    })();
    return () => { c = true; };
  }, [slug]);

  if (state === 'loading') {
    return <section className="section"><div className="container-wide text-ink-soft">Loading…</div></section>;
  }
  if (state === 'missing') {
    return (
      <section className="section">
        <div className="container-wide max-w-3xl border border-dashed border-line p-10 text-center">
          <p className="text-ink-soft mb-4">Programme not found.</p>
          <Link to="/projects" className="text-emerald-deep underline">← Back to programmes</Link>
        </div>
      </section>
    );
  }

  const progress = statusProgress[project.status] ?? 50;

  return (
    <section className="section">
      <div className="container-wide max-w-4xl">
        <Link to="/projects" className="eyebrow inline-block mb-6 hover:text-emerald-deep">← All programmes</Link>
        {project.location && <p className="eyebrow">{project.location}</p>}
        <hr className="rule-gold" />
        <h1 className="font-display text-3xl md:text-5xl mb-6 text-emerald-deep">{project.name}</h1>

        {project.cover_image && (
          <img
            src={project.cover_image}
            alt={project.name}
            className="w-full aspect-[16/9] object-cover border border-line mb-10"
          />
        )}

        <div className="grid md:grid-cols-[1fr_240px] gap-10">
          <div>
            {project.description && (
              <div className="prose-hufida text-ink leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            )}

            {milestones.length > 0 && (
              <div className="mt-12">
                <p className="eyebrow">Milestones</p>
                <hr className="rule-gold" />
                <ul className="divide-y divide-line">
                  {milestones.map((m) => (
                    <li key={m.id} className="py-4 flex justify-between gap-4">
                      <div>
                        <div className="font-semibold text-ink">{m.name}</div>
                        {m.description && <p className="text-sm text-ink-soft mt-1">{m.description}</p>}
                      </div>
                      {m.due_date && (
                        <div className="text-xs uppercase tracking-widest text-ink-soft whitespace-nowrap">
                          {formatDate(m.due_date)}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="border-t md:border-t-0 md:border-l border-line md:pl-8 pt-8 md:pt-0">
            <p className="eyebrow">Status</p>
            <p className="text-ink capitalize mb-6">{project.status || 'unspecified'}</p>

            <p className="eyebrow">Progress</p>
            <div className="mb-6">
              <div className="flex justify-between text-xs uppercase tracking-widest text-ink-soft mb-2">
                <span>Programme</span>
                <span className="text-gold font-semibold">{progress}%</span>
              </div>
              <div className="h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <Link
              to="/get-involved#donate"
              className="btn btn-primary btn-sm w-full font-display tracking-wide"
            >
              Support this programme
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
