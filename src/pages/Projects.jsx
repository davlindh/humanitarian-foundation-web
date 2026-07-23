import React from 'react';
import PageHeader from '../components/PageHeader';
import Projects from '../components/Projects';
import FeaturedProjects from '../components/FeaturedProjects';
import ProjectShowcase from '../components/ProjectShowcase';

const ProjectsPage = () => (
  <>
    <PageHeader
      eyebrow="Programmes & Projects"
      title="Where we work, what we deliver."
      lead="Multi-year water, education, and healthcare programmes running across nine countries in East and Central Africa."
    />
    <section className="section">
      <div className="container-wide">
        <FeaturedProjects />
        <Projects />
        <ProjectShowcase />
      </div>
    </section>
  </>
);

export default ProjectsPage;
