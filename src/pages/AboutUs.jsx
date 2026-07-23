import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutUs from '../components/AboutUs';

const AboutUsPage = () => (
  <>
    <PageHeader
      eyebrow="About HUFIDA"
      title="Rooted in community. Built for the long term."
      lead="For over fifteen years HUFIDA has partnered with district councils, health ministries, and village committees to deliver programmes that outlast the funding cycle."
    />
    <section className="section">
      <div className="container-wide">
        <AboutUs />
      </div>
    </section>
  </>
);

export default AboutUsPage;
