import React from 'react';
import PageHeader from '../components/PageHeader';
import News from '../components/News';

const NewsPage = () => (
  <>
    <PageHeader
      eyebrow="News"
      title="From the field, from the office."
      lead="Programme announcements, partnership updates, and reports from HUFIDA teams on the ground."
    />
    <section className="section">
      <div className="container-wide">
        <News />
      </div>
    </section>
  </>
);

export default NewsPage;
