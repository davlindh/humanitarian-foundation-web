import React from 'react';
import PageHeader from '../components/PageHeader';

const partners = [
  { name: 'District Health Ministries', description: 'Joint delivery of primary care and maternal health services across four districts.', tier: 'Government' },
  { name: 'Great Lakes WASH Coalition', description: 'Regional coordination on water, sanitation, and hygiene standards.', tier: 'Coalition' },
  { name: 'East African Education Trust', description: 'Curriculum, teacher training, and school infrastructure grants.', tier: 'Foundation' },
  { name: 'Independent Auditors Africa', description: 'Annual financial and outcomes audits, published in full.', tier: 'Assurance' },
];

const PartnersPage = () => (
  <>
    <PageHeader
      eyebrow="Partners"
      title="The organisations we work with."
      lead="HUFIDA works alongside ministries, foundations, and grassroots coalitions. Programmes are only as strong as the partnerships behind them."
    />
    <section className="section">
      <div className="container-wide grid md:grid-cols-2 gap-8">
        {partners.map((p) => (
          <article key={p.name} className="border border-line p-8 bg-base-100">
            <p className="eyebrow">{p.tier}</p>
            <h2 className="text-2xl mt-2 mb-3">{p.name}</h2>
            <p className="text-ink-soft">{p.description}</p>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default PartnersPage;
