import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { supabase } from '../integrations/supabase/client';

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : '';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    (async () => {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .eq('post_type', 'blog')
        .eq('is_published', true)
        .lte('published_at', now)
        .order('published_at', { ascending: false });
      if (!c) { setPosts(data || []); setLoading(false); }
    })();
    return () => { c = true; };
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the programme."
        lead="Longer-form writing from the HUFIDA team on how the work gets done, what we learn, and where we're headed."
      />
      <section className="section">
        <div className="container-wide max-w-5xl">
          {loading ? (
            <p className="text-ink-soft">Loading…</p>
          ) : posts.length === 0 ? (
            <div className="border border-dashed border-line p-10 text-center text-ink-soft">
              No blog posts yet. Check back soon.
            </div>
          ) : (
            <div className="divide-y divide-line">
              {posts.map((p) => (
                <article key={p.id} className="py-10 grid md:grid-cols-[160px_1fr] gap-6">
                  <div className="text-xs uppercase tracking-widest text-ink-soft">
                    <div>{formatDate(p.published_at || p.created_at)}</div>
                    {p.category && (
                      <div className="mt-1 text-gold font-semibold not-italic">{p.category}</div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl mb-3">
                      <Link to={`/news/${p.slug}`} className="hover:text-emerald-deep">{p.title}</Link>
                    </h2>
                    {p.excerpt && <p className="text-ink-soft leading-relaxed">{p.excerpt}</p>}
                    <Link
                      to={`/news/${p.slug}`}
                      className="mt-4 inline-block text-emerald-deep font-semibold underline underline-offset-4"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
