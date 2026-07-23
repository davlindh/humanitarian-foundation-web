import React from 'react';

const projects = [
  {
    title: 'Clean Water Initiative',
    tag: 'Water',
    description: 'Boreholes and operator training with village councils.',
    image: '/images/project1.jpg',
  },
  {
    title: 'Educational Programmes',
    tag: 'Education',
    description: 'Primary schools, curricula, and teacher training.',
    image: '/images/project2.jpg',
  },
  {
    title: 'Healthcare Services',
    tag: 'Healthcare',
    description: 'Renovated maternity and outpatient wings, community health workers.',
    image: '/images/project3.jpg',
  },
];

const FeaturedProjects = () => (
  <section className="mb-20">
    <p className="eyebrow">Highlighted Programmes</p>
    <hr className="rule-gold" />
    <h2 className="text-3xl md:text-4xl mb-10">Three programmes we're running now.</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((p) => (
        <article key={p.title} className="border border-line group">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <p className="eyebrow">{p.tag}</p>
            <h3 className="text-xl mt-2 mb-2">{p.title}</h3>
            <p className="text-ink-soft text-sm leading-relaxed">{p.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default FeaturedProjects;
