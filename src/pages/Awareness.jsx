import React from 'react';
import PageHeader from '../components/PageHeader';

const items = [
  {
    title: 'Development challenges in Africa',
    body: 'A plain-language primer on the issues our programmes address: water scarcity, primary education gaps, maternal health, and rural livelihood pressure across East and Central Africa.',
    image: '/images/awareness/development_issues.jpg',
    tag: 'Primer',
  },
  {
    title: 'Educational resources',
    body: 'Articles, infographics, and briefings for supporters, students, and journalists who want to understand the work in more depth.',
    image: '/images/awareness/educational_resources.jpg',
    tag: 'Library',
  },
  {
    title: 'News & updates',
    body: 'The latest programme reports, coalition announcements, and field notes from the countries where HUFIDA works.',
    image: '/images/awareness/news_updates.jpg',
    tag: 'Updates',
  },
];

const AwarenessPage = () => (
  <>
    <PageHeader
      eyebrow="Awareness & Education"
      title="Understand the work before you support it."
      lead="Short reads on the development challenges HUFIDA addresses and how our programmes are designed to answer them."
    />
    <section className="section">
      <div className="container-wide grid md:grid-cols-3 gap-8">
        {items.map((it) => (
          <article key={it.title} className="border border-line flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="eyebrow">{it.tag}</p>
              <h2 className="text-xl md:text-2xl mt-2 mb-3">{it.title}</h2>
              <p className="text-ink-soft leading-relaxed">{it.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default AwarenessPage;
