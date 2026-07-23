import React, { useState } from 'react';
import PageHeader from './PageHeader';

const inputCls =
  'w-full border border-line bg-paper px-3 py-2 text-ink placeholder:text-ink-soft/70 focus:outline-none focus:border-gold transition';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [privacy, setPrivacy] = useState({ showEmail: false, showBio: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating user profile:', { name, email, bio, profilePicture, privacy });
  };

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Your profile"
        lead="Public presentation of how you appear to the HUFIDA community."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p className="text-xs tracking-widest uppercase text-ink-soft mb-8">
            Demo view — data is not saved yet.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left: avatar */}
            <div className="md:col-span-1">
              <p className="eyebrow mb-3">Profile picture</p>
              <div className="border border-line bg-parchment/40 aspect-square flex items-center justify-center text-ink-soft">
                {profilePicture ? profilePicture.name : 'No image'}
              </div>
              <label className="mt-4 block border border-line px-4 py-2 text-center text-sm text-ink hover:border-gold transition cursor-pointer">
                Choose file
                <input
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right: fields */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="eyebrow block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="eyebrow block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="eyebrow block mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  className={inputCls}
                  placeholder="A short introduction"
                />
              </div>

              <div>
                <p className="eyebrow mb-3">Privacy</p>
                <div className="border border-line divide-y divide-line">
                  <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                    <span className="text-ink">Show email publicly</span>
                    <input
                      type="checkbox"
                      checked={privacy.showEmail}
                      onChange={(e) =>
                        setPrivacy({ ...privacy, showEmail: e.target.checked })
                      }
                      className="accent-emerald-deep h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between px-4 py-3 cursor-pointer">
                    <span className="text-ink">Show bio publicly</span>
                    <input
                      type="checkbox"
                      checked={privacy.showBio}
                      onChange={(e) =>
                        setPrivacy({ ...privacy, showBio: e.target.checked })
                      }
                      className="accent-emerald-deep h-4 w-4"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-block bg-emerald-deep text-paper px-8 py-3 text-sm tracking-wide hover:bg-emerald-deep/90 transition"
                >
                  Update profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
