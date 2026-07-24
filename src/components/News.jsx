import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, {
  year: 'numeric', month: 'long', day: 'numeric',
}) : '';

const PostView = ({ slug }) => {
  const [post, setPost] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let c = false;
    (async () => {
      const { data, error } = await supabase
        .from('news_posts').select('*').eq('slug', slug).maybeSingle();
      if (c) return;
      if (error || !data) setState('missing');
      else { setPost(data); setState('ready'); }
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
    </article>
  );
};

const News = () => {
  const { slug } = useParams();
  const [sortType, setSortType] = useState('date');
  const [expanded, setExpanded] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) return;
    let c = false;
    (async () => {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .lte('published_at', now)
        .order('published_at', { ascending: false });
      if (!c) { setPosts(data || []); setLoading(false); }
    })();
    return () => { c = true; };
  }, [slug]);

  if (slug) return <PostView slug={slug} />;

  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));
  const blogs = posts.filter((p) => (p.post_type || 'blog') === 'blog');
  const releases = posts.filter((p) => p.post_type === 'press');

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
          <label className="text-sm text-ink-soft">
            <span className="eyebrow mr-2">Sort</span>
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="border border-line bg-transparent px-3 py-2 text-ink"
            >
              <option value="date">Newest first</option>
            </select>
          </label>
        </div>
        {loading ? (
          <p className="text-ink-soft">Loading…</p>
        ) : blogs.length === 0 ? (
          <div className="border border-dashed border-line p-10 text-center text-ink-soft">
            No posts yet. Check back soon.
          </div>
        ) : (
          <div className="divide-y divide-line">
            {blogs.map((post, i) => (
              <article key={post.id} className="py-10 grid md:grid-cols-[240px_1fr] gap-8">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover border border-line"
                  />
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
                  <p className="text-ink-soft leading-relaxed">
                    {expanded[`b${i}`] ? (post.content || post.excerpt) : (post.excerpt || (post.content || '').slice(0, 200))}
                  </p>
                  <div className="mt-4 flex gap-4">
                    {post.content && (
                      <button
                        onClick={() => toggle(`b${i}`)}
                        className="text-emerald-deep font-semibold underline underline-offset-4"
                      >
                        {expanded[`b${i}`] ? 'Read less ←' : 'Read more →'}
                      </button>
                    )}
                    <Link to={`/news/${post.slug}`} className="text-ink-soft underline underline-offset-4 hover:text-emerald-deep">
                      Permalink
                    </Link>
                  </div>
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
            {releases.map((r, i) => (
              <article key={r.id} className="border border-line p-8">
                <p className="eyebrow">{formatDate(r.published_at || r.created_at)}</p>
                <h3 className="text-xl md:text-2xl mt-2 mb-3">
                  <Link to={`/news/${r.slug}`} className="hover:text-emerald-deep">{r.title}</Link>
                </h3>
                <p className="text-ink-soft leading-relaxed">
                  {expanded[`p${i}`] ? (r.content || r.excerpt) : ((r.excerpt || r.content || '').slice(0, 200) + '…')}
                </p>
                {r.content && (
                  <button
                    onClick={() => toggle(`p${i}`)}
                    className="mt-4 text-emerald-deep font-semibold underline underline-offset-4"
                  >
                    {expanded[`p${i}`] ? 'Read less ←' : 'Read full release →'}
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default News;
