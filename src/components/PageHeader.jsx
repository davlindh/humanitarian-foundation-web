import React from 'react';

const PageHeader = ({ eyebrow, title, lead, children }) => (
  <>
    <header className="bg-emerald-deep text-parchment">
      <div className="container-wide py-16 md:py-24">
        {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
        <hr className="rule-gold" />
        <h1 className="font-serif text-parchment max-w-3xl leading-[1.05]">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg text-parchment/85 leading-relaxed">{lead}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
    <div className="emerald-fade-out" aria-hidden="true" />
  </>
);

export default PageHeader;
