import React, { useState } from 'react';

const givingLevels = [
  { amount: 10, description: 'School supplies for one child, for a year.' },
  { amount: 25, description: 'Clean water for a family, for one month.' },
  { amount: 50, description: 'Consumables for a rural clinic, for a week.' },
  { amount: 100, description: 'Foundation contribution to a district programme.' },
];

const volunteerRoles = [
  {
    title: 'Community Outreach',
    description: 'Support field teams during programme launches and community consultations in East and Central Africa.',
  },
  {
    title: 'Event & Programme Coordination',
    description: 'Help organise fundraising events, donor briefings, and partner visits from a home base or in-country.',
  },
  {
    title: 'Fundraising',
    description: 'Run a campaign for a specific programme — schools, boreholes, or maternity ward equipment.',
  },
  {
    title: 'Communications',
    description: 'Contribute writing, translation, or social media work to help programmes reach new supporters.',
  },
];

const upcomingEvents = [
  {
    title: 'Annual Programme Briefing',
    date: 'December 15, 2026',
    description: 'A closed briefing for major donors and partners on the year\'s programme results and next cycle.',
  },
  {
    title: 'Community Clean-up',
    date: 'January 20, 2027',
    description: 'A public volunteer day working with partner councils on riverbank restoration.',
  },
];

const GetInvolved = () => {
  const [donation, setDonation] = useState('');
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Donation intent', { donation, recurring });
  };

  return (
    <div className="space-y-24">
      {/* Impact figure */}
      <section>
        <p className="eyebrow">Your Support</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-8">What contributions have funded so far.</h2>
        <figure className="border border-line bg-parchment/40 p-6">
          <img
            src="/images/infographics/support-impact-infographic.png"
            alt="Impact of donor and volunteer contributions"
            className="w-full h-auto"
          />
        </figure>
      </section>

      {/* Donate */}
      <section className="border-t border-line pt-16">
        <p className="eyebrow">Donate</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">Fund a programme directly.</h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-ink-soft leading-relaxed mb-8">
              Every contribution goes into a specific programme with a published
              budget and audited outcomes. Choose an amount, or set a monthly
              recurring gift.
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

      {/* Volunteer */}
      <section className="border-t border-line pt-16">
        <p className="eyebrow">Volunteer</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">Roles we're recruiting for.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {volunteerRoles.map((r) => (
            <article key={r.title} className="border border-line p-8">
              <h3 className="text-xl mb-3">{r.title}</h3>
              <p className="text-ink-soft leading-relaxed">{r.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-ink-soft">
          Interested? Email <a href="mailto:volunteer@hufida.org" className="text-emerald-deep underline underline-offset-4">volunteer@hufida.org</a> with your background and availability.
        </p>
      </section>

      {/* Events */}
      <section className="border-t border-line pt-16">
        <p className="eyebrow">Upcoming events</p>
        <hr className="rule-gold" />
        <h2 className="text-3xl md:text-4xl mb-10">Diary.</h2>
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
