import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const currentProjects = [
  {
    title: 'Clean Water Initiative',
    location: 'Nairobi County, Kenya',
    description: 'Borehole construction and water-safety training with village councils and district health offices.',
    goals: 'Reach 10,000 people with tested, reliable water supply by year end.',
    progress: 70,
    involvement: 'Support borehole equipment, sponsor a village, or volunteer for a water-testing rotation.',
    image: '/images/project1.jpg',
    position: [1.2921, 36.8219],
  },
  {
    title: 'Educational Programmes',
    location: 'Kampala, Uganda',
    description: 'Building primary schools and training a cohort of local teachers in partnership with the East African Education Trust.',
    goals: 'Five new schools, forty new teachers, materials for 1,000 children.',
    progress: 50,
    involvement: 'Fund a classroom, donate materials, or join a teacher-training rotation.',
    image: '/images/project2.jpg',
    position: [0.3476, 32.5825],
  },
  {
    title: 'Healthcare Services',
    location: 'Rift Valley, Kenya',
    description: 'Renovating maternity and outpatient wings and equipping community health workers.',
    goals: 'Three health centres renovated and re-equipped to national standard.',
    progress: 80,
    involvement: 'Fund a maternity ward refit or supply consumables for a quarter.',
    image: '/images/project3.jpg',
    position: [-1.2921, 36.8219],
  },
];

const pastProjects = [
  {
    title: 'Agricultural Development',
    description: 'Introduced drought-tolerant seed varieties and modern farming practice with district agricultural offices.',
    outcomes: 'Crop yields up 40%. Food security stabilised for 5,000 families.',
    image: '/images/project4.jpg',
  },
  {
    title: 'Women\'s Enterprise Programme',
    description: 'Vocational training and micro-loans in partnership with regional co-operatives.',
    outcomes: '500 women launched independent businesses; loan repayment rate above 90%.',
    image: '/images/project5.jpg',
  },
];

const ProgressBar = ({ value }) => (
  <div>
    <div className="flex justify-between text-xs uppercase tracking-widest text-ink-soft mb-2">
      <span>Progress</span>
      <span className="text-gold font-semibold">{value}%</span>
    </div>
    <div className="h-1.5 bg-line rounded-full overflow-hidden">
      <div className="h-full bg-gold" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const Projects = () => (
  <div className="space-y-24">
    {/* Progress infographic */}
    <section>
      <p className="eyebrow">Progress & Impact</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-8">Programme progress at a glance.</h2>
      <figure className="border border-line bg-parchment/40 p-6">
        <img
          src="/images/infographics/project-progress-infographic.png"
          alt="Programme progress across water, education, and healthcare"
          className="w-full h-auto"
        />
      </figure>
    </section>

    {/* Current programmes */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Current Programmes</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-12">Running now, in the districts we serve.</h2>
      <div className="space-y-16">
        {currentProjects.map((p, i) => (
          <article key={p.title} className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={p.image}
              alt={p.title}
              className={`w-full aspect-[4/3] object-cover border border-line ${i % 2 ? 'md:order-2' : ''}`}
            />
            <div>
              <p className="eyebrow">{p.location}</p>
              <h3 className="text-2xl md:text-3xl mt-2 mb-4">{p.title}</h3>
              <p className="text-ink-soft leading-relaxed mb-6">{p.description}</p>
              <dl className="space-y-3 text-sm mb-6">
                <div>
                  <dt className="eyebrow inline mr-2">Goals</dt>
                  <dd className="inline text-ink">{p.goals}</dd>
                </div>
                <div>
                  <dt className="eyebrow inline mr-2">Get involved</dt>
                  <dd className="inline text-ink">{p.involvement}</dd>
                </div>
              </dl>
              <ProgressBar value={p.progress} />
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Past programmes */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Handed-over Programmes</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-10">Delivered, evaluated, and handed to the community.</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {pastProjects.map((p) => (
          <article key={p.title} className="border border-line">
            <img src={p.image} alt={p.title} className="w-full aspect-[16/9] object-cover" />
            <div className="p-6">
              <h3 className="text-xl mb-3">{p.title}</h3>
              <p className="text-ink-soft leading-relaxed mb-4">{p.description}</p>
              <p className="text-sm">
                <span className="eyebrow mr-2">Outcomes</span>
                <span className="text-ink">{p.outcomes}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* Map */}
    <section className="border-t border-line pt-16">
      <p className="eyebrow">Where we work</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-8">Active programme locations.</h2>
      <div className="border border-line overflow-hidden">
        <MapContainer center={[0.5, 34]} zoom={5} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {currentProjects.map((p) => (
            <Marker key={p.title} position={p.position}>
              <Popup>
                <strong>{p.title}</strong>
                <br />
                {p.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  </div>
);

export default Projects;
