import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../integrations/supabase/client';

// Default map coordinates when project has no explicit location
const DEFAULT_POS = [0.5, 34];
// Simple deterministic jitter so multiple markers don't overlap
const jitter = (i) => [DEFAULT_POS[0] + (i % 3) * 0.5, DEFAULT_POS[1] + Math.floor(i / 3) * 0.5];

const ProgressBar = ({ value }) => (
  <div>
    <div className="flex justify-between text-xs uppercase tracking-widest text-ink-soft mb-2">
      <span>Progress</span>
      <span className="text-gold font-semibold">{value}%</span>
    </div>
    <div className="h-1.5 bg-line rounded-full overflow-hidden">
      <div className="h-full bg-gold" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const statusProgress = { planned: 15, active: 60, completed: 100, paused: 40 };

const Projects = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    (async () => {
      const { data } = await supabase
        .from('projects').select('*').order('created_at', { ascending: false });
      if (!c) { setRows(data || []); setLoading(false); }
    })();
    return () => { c = true; };
  }, []);

  const current = useMemo(
    () => rows.filter((r) => r.status !== 'completed'),
    [rows]
  );
  const past = useMemo(
    () => rows.filter((r) => r.status === 'completed'),
    [rows]
  );

  return (
    <div className="space-y-24">
      <section>
        <p className="eyebrow">Progress & Impact</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">Programme progress at a glance.</h2>
        <figure className="border border-line bg-parchment/40 p-6">
          <img
            src="/images/infographics/project-progress-infographic.png"
            alt="Programme progress"
            className="w-full h-auto"
          />
        </figure>
      </section>

      <section className="border-t border-line pt-16">
        <p className="eyebrow">Current Programmes</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-12">Running now, in the districts we serve.</h2>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : current.length === 0 ? (
          <div className="border border-dashed border-line p-10 text-center text-ink-soft">
            No active programmes to show.
          </div>
        ) : (
          <div className="space-y-16">
            {current.map((p, i) => (
              <article key={p.id} className="grid md:grid-cols-2 gap-10 items-start">
                {p.cover_image ? (
                  <img
                    src={p.cover_image}
                    alt={p.name}
                    className={`w-full aspect-[4/3] object-cover border border-line ${i % 2 ? 'md:order-2' : ''}`}
                  />
                ) : (
                  <div className={`w-full aspect-[4/3] border border-line bg-parchment/40 flex items-center justify-center text-ink-soft ${i % 2 ? 'md:order-2' : ''}`}>
                    No image
                  </div>
                )}
                <div>
                  {p.location && <p className="eyebrow">{p.location}</p>}
                  <h3 className="text-2xl md:text-3xl mt-2 mb-4">{p.name}</h3>
                  {p.description && (
                    <p className="text-ink-soft leading-relaxed mb-6">{p.description}</p>
                  )}
                  {p.status && (
                    <p className="text-sm mb-6">
                      <span className="eyebrow mr-2">Status</span>
                      <span className="text-ink capitalize">{p.status}</span>
                    </p>
                  )}
                  <ProgressBar value={statusProgress[p.status] ?? 50} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="border-t border-line pt-16">
          <p className="eyebrow">Handed-over Programmes</p>
          <hr className="rule-gold" />
          <h2 className="text-3xl md:text-4xl mb-10">Delivered and handed to the community.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {past.map((p) => (
              <article key={p.id} className="border border-line">
                {p.cover_image && (
                  <img src={p.cover_image} alt={p.name} className="w-full aspect-[16/9] object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl mb-3">{p.name}</h3>
                  {p.description && (
                    <p className="text-ink-soft leading-relaxed">{p.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line pt-16">
        <p className="eyebrow">Where we work</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">Active programme locations.</h2>
        <div className="border border-line overflow-hidden">
          <MapContainer center={DEFAULT_POS} zoom={5} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {current.map((p, i) => (
              <Marker key={p.id} position={jitter(i)}>
                <Popup>
                  <strong>{p.name}</strong>
                  {p.location && <><br />{p.location}</>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Projects;
