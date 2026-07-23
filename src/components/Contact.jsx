import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => (
  <div id="contact" className="grid md:grid-cols-[1fr_1.2fr] gap-16">
    {/* Details */}
    <div>
      <p className="eyebrow">Get in touch</p>
      <hr className="rule-gold" />
      <h2 className="text-3xl md:text-4xl mb-6">Talk to the team.</h2>
      <p className="text-ink-soft leading-relaxed mb-10">
        For partnerships, media enquiries, or general questions about our
        programmes — the fastest response is by email. We reply within two
        working days.
      </p>

      <dl className="space-y-6">
        <div>
          <dt className="eyebrow mb-1">Office</dt>
          <dd>1234 HUFIDA Street, Nairobi, Kenya</dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">General enquiries</dt>
          <dd><a href="mailto:info@hufida.org" className="text-emerald-deep underline underline-offset-4">info@hufida.org</a></dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Donations</dt>
          <dd><a href="mailto:donations@hufida.org" className="text-emerald-deep underline underline-offset-4">donations@hufida.org</a></dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Volunteering</dt>
          <dd><a href="mailto:volunteer@hufida.org" className="text-emerald-deep underline underline-offset-4">volunteer@hufida.org</a></dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Phone</dt>
          <dd>+254 700 000 000</dd>
        </div>
      </dl>

      <div className="mt-10">
        <p className="eyebrow mb-3">Follow</p>
        <div className="flex gap-5 text-emerald-deep">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={22} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={22} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={22} /></a>
        </div>
      </div>
    </div>

    {/* Form */}
    <form className="border border-line p-8 md:p-10 bg-parchment/30 space-y-6">
      <div>
        <label className="eyebrow block mb-2" htmlFor="c-name">Name</label>
        <input
          id="c-name"
          type="text"
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-ink focus:border-emerald-deep outline-none"
        />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="c-email">Email</label>
        <input
          id="c-email"
          type="email"
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-ink focus:border-emerald-deep outline-none"
        />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="c-subject">Subject</label>
        <input
          id="c-subject"
          type="text"
          className="w-full border border-line bg-transparent px-4 py-3 text-ink focus:border-emerald-deep outline-none"
        />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="c-msg">Message</label>
        <textarea
          id="c-msg"
          rows={6}
          required
          className="w-full border border-line bg-transparent px-4 py-3 text-ink focus:border-emerald-deep outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-deep text-parchment px-8 py-3 font-semibold tracking-wide hover:bg-emerald transition"
      >
        Send message
      </button>
    </form>
  </div>
);

export default Contact;
