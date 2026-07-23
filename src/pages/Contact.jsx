import React from 'react';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

const ContactPage = () => (
  <>
    <PageHeader
      eyebrow="Contact"
      title="Talk to us."
      lead="For partnership enquiries, media, or general questions about our programmes."
    />
    <section className="section">
      <div className="container-wide">
        <Contact />
      </div>
    </section>
  </>
);

export default ContactPage;
