import React from 'react';
import PageHeader from '../components/PageHeader';

const posts = [
  {
    title: 'Empowering communities through clean water',
    date: 'October 10, 2023',
    excerpt: 'How HUFIDA is delivering safe drinking water and long-term operator training in rural regions.',
    author: 'Field Team',
  },
  {
    title: 'Educational programmes making a difference',
    date: 'September 20, 2023',
    excerpt: 'Five new schools, forty new teachers, and a curriculum built with local communities.',
    author: 'Programmes Team',
  },
  {
    title: 'What "long-term" actually means',
    date: 'August 4, 2023',
    excerpt: 'Why HUFIDA measures success in decades, not deployment cycles.',
    author: 'Executive Director',
  },
];

const BlogPage = () => (
  <>
    <PageHeader
      eyebrow="Blog"
      title="Notes from the programme."
      lead="Longer-form writing from the HUFIDA team on how the work gets done, what we learn, and where we're headed."
    />
    <section className="section">
      <div className="container-wide max-w-5xl">
        <div className="divide-y divide-line">
          {posts.map((p) => (
            <article key={p.title} className="py-10 grid md:grid-cols-[160px_1fr] gap-6">
              <div className="text-xs uppercase tracking-widest text-ink-soft">
                <div>{p.date}</div>
                <div className="mt-1 text-gold font-semibold not-italic">{p.author}</div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl mb-3">{p.title}</h2>
                <p className="text-ink-soft leading-relaxed">{p.excerpt}</p>
                <button className="mt-4 text-emerald-deep font-semibold underline underline-offset-4">
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default BlogPage;
