import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const givingLevels = [
  { amount: 10, description: 'School supplies for one child, for a year.' },
  { amount: 25, description: 'Clean water for a family, for one month.' },
  { amount: 50, description: 'Consumables for a rural clinic, for a week.' },
  { amount: 100, description: 'Foundation contribution to a district programme.' },
];

const impactStats = [
  {
    figure: '42',
    label: 'Districts reached',
    body: 'Primary care, WASH and education programmes running across East and Central Africa.',
  },
  {
    figure: '$1.4M',
    label: 'Programme spend',
    body: 'Every dollar tied to a published budget and an independently audited outcome.',
  },
  {
    figure: '18k',
    label: 'Lives supported',
    body: 'Patients treated, students enrolled, households on clean water in the last cycle.',
  },
];

const engagementTiles = [
  {
    eyebrow: 'Finances',
    title: 'Donate',
    body: 'One-time or monthly gifts fund a specific programme with a public budget. Every gift is receipted.',
    action: 'Make a contribution',
    href: '#donate',
    isRoute: false,
  },
  {
    eyebrow: 'Presence',
    title: 'Volunteer',
    body: 'Field outreach, event coordination, fundraising and communications — remote or in-country.',
    action: 'Email the team',
    href: 'mailto:volunteer@hufida.org',
    isRoute: false,
  },
  {
    eyebrow: 'Collaboration',
    title: 'Partner',
    body: 'Institutional, corporate and coalition partnerships that align mandates with delivery on the ground.',
    action: 'See current partners',
    href: '/partners',
    isRoute: true,
  },
  {
    eyebrow: 'Community',
    title: 'Events',
    body: 'Donor briefings, community days and partner visits. Small, deliberate, on the record.',
    action: 'View the diary',
    href: '#events',
    isRoute: false,
  },
];

const upcomingEvents = [
  {
    title: 'Annual Programme Briefing',
    date: 'December 15, 2026',
    description: "A closed briefing for major donors and partners on the year's programme results and next cycle.",
  },
  {
    title: 'Community Clean-up',
    date: 'January 20, 2027',
    description: 'A public volunteer day working with partner councils on riverbank restoration.',
  },
];

const TileInner = ({ tile }) => (
  <>
    <div>
      <span className="block eyebrow mb-8 group-hover:text-gold transition-colors">
        {tile.eyebrow}
      </span>
      <h3 className="font-display text-3xl uppercase text-emerald-deep mb-4 group-hover:text-parchment transition-colors">
        {tile.title}
      </h3>
      <p className="text-ink-soft leading-relaxed mb-8 group-hover:text-parchment/80 transition-colors">
        {tile.body}
      </p>
    </div>
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-deep group-hover:text-gold transition-colors">
      {tile.action} <span aria-hidden className="text-lg leading-none">&rarr;</span>
    </span>
  </>
);

const GetInvolved = () => {
  const [donation, setDonation] = useState('');
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Donation intent', { donation, recurring });
  };

  const tileClass =
    'group bg-paper p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:bg-emerald-deep transition-colors duration-500';

  return (
    <div className="space-y-24">
      {/* Impact strip */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">The harvest of your support</p>
            <h2 className="font-display text-3xl md:text-5xl uppercase text-emerald-deep leading-tight">
              What contributions have funded so far
            </h2>
          </div>
          <p className="max-w-xs text-ink-soft leading-relaxed">
            Your investment goes beyond a donation — it underwrites infrastructure,
            sustains families, and keeps programmes accountable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {impactStats.map((s) => (
            <div key={s.label} className="pt-8 border-t border-gold">
              <div className="font-display text-6xl text-emerald-deep mb-2">{s.figure}</div>
              <p className="uppercase tracking-tight font-semibold text-emerald">{s.label}</p>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
        {engagementTiles.map((tile) =>
          tile.isRoute ? (
            <Link key={tile.title} to={tile.href} className={tileClass}>
              <TileInner tile={tile} />
            </Link>
          ) : (
            <a key={tile.title} href={tile.href} className={tileClass}>
              <TileInner tile={tile} />
            </a>
          )
        )}
      </section>

      {/* Donate */}
      <section id="donate" className="scroll-mt-24 border-t border-line pt-16">
        <p className="eyebrow">Donate</p>
        <hr className="rule-gold" />
        <h2 className="font-display text-3xl md:text-4xl uppercase text-emerald-deep mb-10">
          Fund a programme directly.
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-ink-soft leading-relaxed mb-8">
              Choose an amount below, or set a monthly recurring gift. Each level
              maps to a specific line item in a published programme budget.
            </p>
            <ul className="divide-y divide-line border-y border-line">
              {givingLevels.map((g) => (
                <li key={g.amount} className="py-4 grid grid-cols-[80px_1fr] gap-4">
                  <div className="text-2xl font-display text-emerald-deep">${g.amount}</div>
                  <div className="text-ink-soft">{g.description}</div>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="border border-line p-8 bg-parchment/30 space-y-6">
            <div>
              <label className="eyebrow block mb-2" htmlFor="d-name">Name</label>
              <input id="d-name" required className="w-full border border-line bg-transparent px-4 py-3 focus:border-emerald-deep outline-none" />
            </div>
            <div>
              <label className="eyebrow block mb-2" htmlFor="d-email">Email</label>
              <input id="d-email" type="email" required className="w-full border border-line bg-transparent px-4 py-3 focus:border-emerald-deep outline-none" />
            </div>
            <div>
              <label className="eyebrow block mb-2" htmlFor="d-amt">Amount (USD)</label>
              <div className="flex gap-2 mb-3 flex-wrap">
                {givingLevels.map((g) => (
                  <button
                    type="button"
                    key={g.amount}
                    onClick={() => setDonation(String(g.amount))}
                    className={`px-4 py-2 border text-sm ${donation === String(g.amount) ? 'bg-emerald-deep text-parchment border-emerald-deep' : 'border-line text-ink hover:border-emerald-deep'}`}
                  >
                    ${g.amount}
                  </button>
                ))}
              </div>
              <input
                id="d-amt"
                type="number"
                min="1"
                value={donation}
                onChange={(e) => setDonation(e.target.value)}
                placeholder="Custom amount"
                className="w-full border border-line bg-transparent px-4 py-3 focus:border-emerald-deep outline-none"
              />
            </div>
            <label className="flex items-center gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="w-4 h-4 accent-emerald-deep"
              />
              Make this a monthly gift
            </label>
            <button type="submit" className="w-full bg-emerald-deep text-parchment px-8 py-3 font-semibold tracking-wide hover:bg-emerald transition">
              Donate {donation ? `$${donation}` : ''}
            </button>
          </form>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-24 border-t border-line pt-16">
        <p className="eyebrow">Upcoming events</p>
        <hr className="rule-gold" />
        <h2 className="font-display text-3xl md:text-4xl uppercase text-emerald-deep mb-10">
          Diary.
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {upcomingEvents.map((e) => (
            <article key={e.title} className="py-8 grid md:grid-cols-[180px_1fr] gap-6">
              <p className="eyebrow">{e.date}</p>
              <div>
                <h3 className="text-xl md:text-2xl mb-2">{e.title}</h3>
                <p className="text-ink-soft leading-relaxed">{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
