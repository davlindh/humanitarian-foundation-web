import React, { useState } from 'react';

const blogPosts = [
  {
    title: 'Empowering communities through clean water',
    date: 'October 10, 2023',
    category: 'Field Report',
    excerpt: 'How HUFIDA is providing safe drinking water and long-term operator training in rural regions.',
    content: 'Detailed field notes on how the water programme was scoped with village councils, how boreholes were sited, and how local operators are being trained to run and maintain them for the next decade.',
    image: '/images/blog1.jpg',
  },
  {
    title: 'Educational programmes making a difference',
    date: 'September 20, 2023',
    category: 'Programme Update',
    excerpt: 'Five new schools, forty new teachers, and a curriculum built with local communities.',
    content: 'A summary of the year\'s work in the education programme: schools completed, cohort profiles, teacher-training results, and the materials produced with district education officers.',
    image: '/images/blog2.jpg',
  },
  {
    title: 'DIY solar water heater — a field guide',
    date: 'November 5, 2023',
    category: 'Technical Guide',
    excerpt: 'A step-by-step guide to building a low-cost solar water heater from locally available materials.',
    content: 'Materials list, tool requirements, and full assembly instructions for a solar water heater that can be built and maintained by a village technician.',
    image: '/images/blog3.jpg',
  },
  {
    title: 'Composting, from the ground up',
    date: 'November 12, 2023',
    category: 'Technical Guide',
    excerpt: 'Simple, low-cost composting methods for households and small farms.',
    content: 'The composting approaches our agricultural teams recommend for smallholder plots, including layout, materials, and troubleshooting.',
    image: '/images/blog4.jpg',
  },
];

const pressReleases = [
  {
    title: 'HUFIDA launches new healthcare initiative',
    date: 'August 15, 2023',
    content: 'HUFIDA is launching a healthcare initiative focused on medical supply chains, health-worker training, and the renovation of clinical infrastructure across four districts.',
  },
  {
    title: 'HUFIDA joins the Great Lakes WASH Coalition',
    date: 'July 30, 2023',
    content: 'A regional coordination partnership on water, sanitation, and hygiene standards. HUFIDA joins as a delivery partner covering three districts in the coalition\'s eastern zone.',
  },
];

const News = () => {
  const [sortType, setSortType] = useState('date');
  const [expanded, setExpanded] = useState({});
  const toggle = (k) => setExpanded((p) => ({ ...p, [k]: !p[k] }));
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedReleases = [...pressReleases].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-24">
      {/* Achievements infographic */}
      <section>
        <p className="eyebrow">Recent Achievements</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">The year in numbers.</h2>
        <figure className="border border-line bg-parchment/40 p-6">
          <img
            src="/images/infographics/achievements-infographic.png"
            alt="HUFIDA achievements — communities reached, programmes delivered"
            className="w-full h-auto"
          />
        </figure>
      </section>

      {/* Blog list */}
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
        <div className="divide-y divide-line">
          {sortedPosts.map((post, i) => (
            <article key={post.title} className="py-10 grid md:grid-cols-[240px_1fr] gap-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[4/3] object-cover border border-line"
              />
              <div>
                <p className="eyebrow">{post.category} · {post.date}</p>
                <h3 className="text-2xl md:text-3xl mt-2 mb-3">{post.title}</h3>
                <p className="text-ink-soft leading-relaxed">
                  {expanded[`b${i}`] ? post.content : post.excerpt}
                </p>
                <button
                  onClick={() => toggle(`b${i}`)}
                  className="mt-4 text-emerald-deep font-semibold underline underline-offset-4"
                >
                  {expanded[`b${i}`] ? 'Read less ←' : 'Read more →'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Press releases */}
      <section className="border-t border-line pt-16">
        <p className="eyebrow">Press Releases</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">Official announcements.</h2>
        <div className="space-y-6">
          {sortedReleases.map((r, i) => (
            <article key={r.title} className="border border-line p-8">
              <p className="eyebrow">{r.date}</p>
              <h3 className="text-xl md:text-2xl mt-2 mb-3">{r.title}</h3>
              <p className="text-ink-soft leading-relaxed">
                {expanded[`p${i}`] ? r.content : r.content.slice(0, 140) + '…'}
              </p>
              <button
                onClick={() => toggle(`p${i}`)}
                className="mt-4 text-emerald-deep font-semibold underline underline-offset-4"
              >
                {expanded[`p${i}`] ? 'Read less ←' : 'Read full release →'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
