import React from 'react';
import PageHeader from '../components/PageHeader';
import GetInvolved from '../components/GetInvolved';

const GetInvolvedPage = () => (
  <>
    <PageHeader
      eyebrow="Get Involved"
      title="Support the work. Change the outcome."
      lead="Donate, volunteer, or partner with HUFIDA. Every contribution goes into programmes with published budgets and audited outcomes."
    />
    <section className="section">
      <div className="container-wide" id="donate">
        <GetInvolved />
      </div>
    </section>
  </>
);

export default GetInvolvedPage;
