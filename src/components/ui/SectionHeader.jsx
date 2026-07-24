import React from 'react';
import Eyebrow from './Eyebrow';
import Divider from './Divider';

export default function SectionHeader({ eyebrow, title, lead, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Divider variant="rule" className={align === 'center' ? 'mx-auto' : ''} />
      {title && <h2 className="font-serif">{title}</h2>}
      {lead && <p className="mt-4 text-lg text-content-soft leading-relaxed">{lead}</p>}
    </div>
  );
}
