import React from 'react';
import PageHeader from './PageHeader';

const userActivity = [
  { id: 1, type: 'Donation', details: 'Donated $50 to Clean Water Initiative', date: '2023-03-15' },
  { id: 2, type: 'Volunteer', details: 'Signed up for Community Outreach event', date: '2023-03-10' },
];

const savedContent = [
  { id: 1, title: 'Educational Programs in Rural Areas', type: 'Article' },
  { id: 2, title: 'Upcoming Fundraising Gala', type: 'Event' },
];

const UserDashboard = () => (
  <>
    <PageHeader
      eyebrow="Account"
      title="Your dashboard"
      lead="A snapshot of your recent activity and the stories you’ve saved."
    />
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-xs tracking-widest uppercase text-ink-soft mb-8">
          Demo view — data is not saved yet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow">Recent activity</p>
            <hr className="rule-gold" />
            <ul className="mt-4 border border-line divide-y divide-line bg-parchment/40">
              {userActivity.map((a) => (
                <li key={a.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-widest uppercase text-emerald-deep">
                      {a.type}
                    </span>
                    <span className="text-xs text-ink-soft">{a.date}</span>
                  </div>
                  <p className="mt-2 text-ink">{a.details}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Saved content</p>
            <hr className="rule-gold" />
            <ul className="mt-4 border border-line divide-y divide-line bg-parchment/40">
              {savedContent.map((c) => (
                <li key={c.id} className="p-5">
                  <span className="text-xs tracking-widest uppercase text-emerald-deep">
                    {c.type}
                  </span>
                  <p className="mt-2 text-ink font-display text-lg">{c.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default UserDashboard;
