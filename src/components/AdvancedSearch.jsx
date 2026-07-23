import React, { useState } from 'react';
import PageHeader from './PageHeader';

const inputCls =
  'w-full border border-line bg-paper px-3 py-2 text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-gold transition';

const AdvancedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with:', { searchTerm, category, tag, startDate, endDate });
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Advanced search"
        lead="Filter across projects, news, and events by keyword, category, tag, and date."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="eyebrow block mb-2">Keyword</label>
              <input
                type="text"
                placeholder="e.g. clean water, girls education"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="eyebrow block mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputCls}
                >
                  <option value="">All categories</option>
                  <option value="projects">Projects</option>
                  <option value="news">News</option>
                  <option value="events">Events</option>
                </select>
              </div>
              <div>
                <label className="eyebrow block mb-2">Tag</label>
                <input
                  type="text"
                  placeholder="e.g. health"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="eyebrow block mb-2">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="eyebrow block mb-2">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-block bg-emerald-deep text-paper px-8 py-3 text-sm tracking-wide hover:bg-emerald-deep/90 transition"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-12 border-t border-line pt-8">
            <p className="eyebrow">Results</p>
            <div className="mt-4 border border-line bg-parchment/40 p-8 text-center text-ink-soft">
              {submitted
                ? 'No matching entries yet. Try broadening your filters.'
                : 'Run a search to see results here.'}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvancedSearch;
