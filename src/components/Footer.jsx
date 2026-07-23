import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-emerald-deep text-parchment/90 mt-auto">
    <div className="container-wide py-14 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="font-display text-2xl text-parchment">HUFIDA</div>
        <p className="mt-3 max-w-sm text-sm text-parchment/70 leading-relaxed">
          Humanitarian Foundation for Integrated Development in Africa. Long-term water,
          education, and healthcare programmes designed with the communities they serve.
        </p>
      </div>
      <div>
        <div className="eyebrow text-gold mb-3">Programme</div>
        <ul className="space-y-2 text-sm">
          <li><Link to="/projects" className="hover:text-gold">Projects</Link></li>
          <li><Link to="/news" className="hover:text-gold">News</Link></li>
          <li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
          <li><Link to="/partners" className="hover:text-gold">Partners</Link></li>
        </ul>
      </div>
      <div>
        <div className="eyebrow text-gold mb-3">Organisation</div>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about-us" className="hover:text-gold">About</Link></li>
          <li><Link to="/get-involved" className="hover:text-gold">Get involved</Link></li>
          <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          <li><Link to="/auth" className="hover:text-gold">Team login</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-parchment/10">
      <div className="container-wide py-5 text-xs text-parchment/60 flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} HUFIDA. All rights reserved.</span>
        <span>Registered non-profit organisation.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
