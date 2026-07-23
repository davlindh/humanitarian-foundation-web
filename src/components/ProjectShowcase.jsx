import React from 'react';

const gallery = [
  { src: '/images/project1.jpg', caption: 'Borehole commissioning, Nairobi County' },
  { src: '/images/project2.jpg', caption: 'Primary school opening, Kampala' },
  { src: '/images/project3.jpg', caption: 'Health centre reopening, Rift Valley' },
  { src: '/images/project4.jpg', caption: 'Agricultural cooperative harvest' },
  { src: '/images/project5.jpg', caption: 'Women\'s enterprise programme, cohort three' },
  { src: '/images/gallery1.jpg', caption: 'Community outreach event' },
];

const ProjectShowcase = () => (
  <section className="mt-24 border-t border-line pt-16">
    <p className="eyebrow">From the field</p>
    <hr className="rule-gold" />
    <h2 className="text-3xl md:text-4xl mb-10">Programme gallery.</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gallery.map((g) => (
        <figure key={g.src} className="group">
          <div className="aspect-[4/3] overflow-hidden border border-line">
            <img
              src={g.src}
              alt={g.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-soft">{g.caption}</figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default ProjectShowcase;
