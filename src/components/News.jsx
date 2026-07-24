import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric',
}) : '';

const PostView = ({ slug }) => {
  const [post, setPost] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let c = false;
    (async () => {
      setState('loading');
      const { data, error } = await supabase
        .from('news_posts').select('*').eq('slug', slug).maybeSingle();
      if (c) return;
      if (error || !data) { setState('missing'); return; }
      setPost(data);
      setState('ready');

      const pivot = data.published_at || data.created_at;
      const [prevRes, nextRes, relRes] = await Promise.all([
        supabase.from('news_posts').select('slug,title,published_at')
          .eq('is_published', true).lt('published_at', pivot)
          .order('published_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('news_posts').select('slug,title,published_at')
          .eq('is_published', true).gt('published_at', pivot)
          .order('published_at', { ascending: true }).limit(1).maybeSingle(),
        data.category
          ? supabase.from('news_posts').select('slug,title,published_at,category,image_url,excerpt')
              .eq('is_published', true).eq('category', data.category).neq('id', data.id)
              .order('published_at', { ascending: false }).limit(3)
          : Promise.resolve({ data: [] }),
      ]);
      if (c) return;
      setPrev(prevRes.data || null);
      setNext(nextRes.data || null);
      setRelated(relRes.data || []);
    })();
    return () => { c = true; };
  }, [slug]);

  if (state === 'loading') return <p className="text-ink-soft">Loading…</p>;
  if (state === 'missing') return (
    <div className="border border-dashed border-line p-10 text-center">
      <p className="text-ink-soft mb-4">Post not found.</p>
      <Link to="/news" className="text-emerald-deep underline">← Back to news</Link>
    </div>
  );

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/news" className="eyebrow inline-block mb-6 hover:text-emerald-deep">← All news</Link>
      <p className="eyebrow">{post.category || post.post_type} · {formatDate(post.published_at || post.created_at)}</p>
      <hr className="rule-gold" />
      <h1 className="font-display text-3xl md:text-5xl mb-8 text-emerald-deep">{post.title}</h1>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="w-full aspect-[16/9] object-cover border border-line mb-8" />
      )}
      {post.excerpt && <p className="text-lg text-ink-soft leading-relaxed mb-6">{post.excerpt}</p>}
      {post.content && (
        <div className="prose-hufida text-ink leading-relaxed whitespace-pre-wrap">{post.content}</div>
      )}

      <nav className="mt-16 pt-8 border-t border-line grid sm:grid-cols-2 gap-6" aria-label="Post navigation">
        <div>
          {prev && (
            <Link to={`/news/${prev.slug}`} className="block group">
              <p className="eyebrow">← Previous</p>
              <p className="mt-1 font-semibold text-ink group-hover:text-emerald-deep">{prev.title}</p>
            </Link>
          )}
        </div>
        <div className="sm:text-right">
          {next && (
            <Link to={`/news/${next.slug}`} className="block group">
              <p className="eyebrow">Next →</p>
              <p className="mt-1 font-semibold text-ink group-hover:text-emerald-deep">{next.title}</p>
            </Link>
          )}
        </div>
      </nav>

      {related.length > 0 && (
        <section className="mt-16 pt-8 border-t border-line">
          <p className="eyebrow">More from {post.category}</p>
          <hr className="rule-gold" />
          <ul className="mt-6 space-y-6">
            {related.map((r) => (
              <li key={r.slug}>
                <div className="text-xs uppercase tracking-widest text-ink-soft">
                  {formatDate(r.published_at)}
                </div>
                <Link
                  to={`/news/${r.slug}`}
                  className="mt-1 block font-semibold text-emerald-deep hover:text-emerald"
                >
                  {r.title}
                </Link>
                {r.excerpt && <p className="text-sm text-ink-soft mt-1 line-clamp-2">{r.excerpt}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

const News = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) return;
    let c = false;
    (async () => {
      setLoading(true);
      const now = new Date().toISOString();
      let q = supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .lte('published_at', now)
        .order('published_at', { ascending: false });
      if (category) q = q.eq('category', category);
      const { data } = await q;
      if (!c) { setPosts(data || []); setLoading(false); }
    })();
    return () => { c = true; };
  }, [slug, category]);

  useEffect(() => {
    if (slug) return;
    let c = false;
    (async () => {
      const { data } = await supabase
        .from('news_posts').select('category').eq('is_published', true).not('category', 'is', null);
      if (c) return;
      const uniq = Array.from(new Set((data || []).map((r) => r.category).filter(Boolean))).sort();
      setCategories(uniq);
    })();
    return () => { c = true; };
  }, [slug]);

  if (slug) return <PostView slug={slug} />;

  const blogs = posts.filter((p) => (p.post_type || 'blog') === 'blog');
  const releases = posts.filter((p) => p.post_type === 'press');

  const setCategory = (v) => {
    const next = new URLSearchParams(searchParams);
    if (v) next.set('category', v); else next.delete('category');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="space-y-24">
      <section>
        <p className="eyebrow">Recent Achievements</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">The year in numbers.</h2>
        <figure className="border border-line bg-parchment/40 p-6">
          <img
            src="/images/infographics/achievements-infographic.png"
            alt="HUFIDA achievements"
            className="w-full h-auto"
          />
        </figure>
      </section>

      <section className="border-t border-line pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow">From the Field</p>
            <hr className="rule-gold" />
            <h2 className="text-3xl md:text-4xl">Reports, guides, and updates.</h2>
          </div>
          {categories.length > 0 && (
            <label className="text-sm text-ink-soft">
              <span className="eyebrow mr-2">Category</span>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="border border-line bg-transparent px-3 py-2 text-ink"
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : blogs.length === 0 ? (
          <div className="border border-dashed border-line p-10 text-center text-ink-soft">
            {category ? `No posts in “${category}” yet.` : 'No posts yet. Check back soon.'}
          </div>
        ) : (
          <div className="divide-y divide-line">
            {blogs.map((post) => (
              <article key={post.id} className="py-10 grid md:grid-cols-[240px_1fr] gap-8">
                {post.image_url && (
                  <Link to={`/news/${post.slug}`} className="block">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full aspect-[4/3] object-cover border border-line"
                    />
                  </Link>
                )}
                <div className={post.image_url ? '' : 'md:col-span-2'}>
                  <p className="eyebrow">
                    {[post.category, formatDate(post.published_at || post.created_at)]
                      .filter(Boolean).join(' · ')}
                  </p>
                  <h3 className="text-2xl md:text-3xl mt-2 mb-3">
                    <Link to={`/news/${post.slug}`} className="hover:text-emerald-deep">
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-ink-soft leading-relaxed line-clamp-3">{post.excerpt}</p>
                  )}
                  <Link
                    to={`/news/${post.slug}`}
                    className="mt-4 inline-block text-emerald-deep font-semibold underline underline-offset-4"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {releases.length > 0 && (
        <section className="border-t border-line pt-16">
          <p className="eyebrow">Press Releases</p>
          <hr className="rule-gold" />
          <h2 className="text-3xl md:text-4xl mb-10">Official announcements.</h2>
          <div className="space-y-6">
            {releases.map((r) => (
              <article key={r.id} className="border border-line p-8">
                <p className="eyebrow">{formatDate(r.published_at || r.created_at)}</p>
                <h3 className="text-xl md:text-2xl mt-2 mb-3">
                  <Link to={`/news/${r.slug}`} className="hover:text-emerald-deep">{r.title}</Link>
                </h3>
                {r.excerpt && (
                  <p className="text-ink-soft leading-relaxed line-clamp-3">{r.excerpt}</p>
                )}
                <Link
                  to={`/news/${r.slug}`}
                  className="mt-4 inline-block text-emerald-deep font-semibold underline underline-offset-4"
                >
                  Read full release →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default News;
