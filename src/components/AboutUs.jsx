import React from 'react';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & Executive Director',
    bio: 'Twenty years in humanitarian programme design across East and Central Africa. Founded HUFIDA to build programmes that outlast the funding cycle.',
    image: '/images/team/john_doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Chief Operating Officer',
    bio: 'Leads programme delivery, field operations, and partner reporting. Previously ran district health logistics for the Great Lakes region.',
    image: '/images/team/jane_smith.jpg',
  },
];

const partners = [
  {
    name: 'Partner One',
    description: 'Long-standing funding partner for water, sanitation, and hygiene programmes across four districts.',
    logo: '/images/partners/partner1.png',
  },
  {
    name: 'Partner Two',
    description: 'Provides medical supplies, training grants, and technical assistance for our healthcare programme.',
    logo: '/images/partners/partner2.png',
  },
  {
    name: 'Partner Three',
    description: 'Collaborates on curriculum design and teacher training for the primary schools programme.',
    logo: '/images/partners/partner3.png',
  },
];

const AboutUs = () => (
  <div className="space-y-24">
    {/* Story */}
    <section className="grid md:grid-cols-[1fr_2fr] gap-10">
      <div>
        <p className="eyebrow">Our Story</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl">Founded to work with communities, not for them.</h2>
      </div>
      <div className="prose-hufida text-lg text-ink-soft max-w-2xl">
        <p>
          The Humanitarian Foundation for Integrated Development in Africa (HUFIDA)
          was founded on a plain idea: the people closest to a problem should own
          the solution. We started with a single borehole programme in western
          Kenya and grew from there — always slowly, always with local councils
          alongside.
        </p>
        <p>
          Fifteen years on, we run multi-year water, education, and healthcare
          programmes across nine countries. Every programme is designed with the
          district it serves, published with a budget, and audited on outcomes we
          agreed together.
        </p>
      </div>
    </section>

    {/* Mission split */}
    <section className="grid md:grid-cols-2 gap-10 border-t border-line pt-16">
      <div>
        <p className="eyebrow">Mission</p>
        <hr className="rule-gold" />
        <h2 className="text-2xl md:text-3xl mb-4">Long-term programmes, community-owned.</h2>
        <p className="text-ink-soft leading-relaxed">
          Deliver water, education, and healthcare programmes that continue
          working long after our teams have handed them over.
        </p>
      </div>
      <div>
        <p className="eyebrow">Vision</p>
        <hr className="rule-gold" />
        <h2 className="text-2xl md:text-3xl mb-4">Every district resourced by its own people.</h2>
        <p className="text-ink-soft leading-relaxed">
          A generation of African districts where the councils, clinics, and
          schools that serve them are run — and funded — by the communities
          themselves.
        </p>
      </div>
    </section>

    {/* Impact figure */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Our Impact</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-8">Fifteen years, measured.</h2>
      <figure className="border border-line bg-parchment/40 p-6">
        <img
          src="/images/infographics/impact-infographic.png"
          alt="HUFIDA impact — communities reached, boreholes built, schools opened, and clinics renovated"
          className="w-full h-auto"
        />
      </figure>
    </section>

    {/* Team */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Team</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-10">The people leading the work.</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {teamMembers.map((m) => (
          <article key={m.name} className="grid grid-cols-[120px_1fr] gap-6 items-start">
            <img
              src={m.image}
              alt={m.name}
              className="w-[120px] h-[120px] object-cover border border-line grayscale hover:grayscale-0 transition"
            />
            <div>
              <h3 className="text-xl mb-1">{m.name}</h3>
              <p className="eyebrow mb-3">{m.role}</p>
              <p className="text-ink-soft leading-relaxed">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Partners */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Partners & Sponsors</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-10">Who we work with.</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {partners.map((p) => (
          <article key={p.name} className="border border-line p-6 flex flex-col">
            <div className="h-24 flex items-center">
              <img src={p.logo} alt={p.name} className="max-h-20 object-contain" />
            </div>
            <h3 className="text-lg mt-4 mb-2">{p.name}</h3>
            <p className="text-ink-soft text-sm leading-relaxed">{p.description}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default AboutUs;
