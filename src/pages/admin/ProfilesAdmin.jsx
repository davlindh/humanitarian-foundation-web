import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea } from './_shared/primitives';
import ImageUploader from './_shared/ImageUploader';

const defaults = { name: '', email: '', role: '', bio: '', avatar_url: '' };

const ProfilesAdmin = () => (
  <ResourcePage
    table="profiles"
    eyebrow="People"
    title="Profiles"
    singular="profile"
    defaults={defaults}
    renderRow={(r) => ({
      title: r.name,
      meta: [r.role, r.email].filter(Boolean).join(' · '),
      body: r.bio,
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Name" required>
          <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} required />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role" hint="e.g. Programme Director">
            <TextInput value={form.role || ''} onChange={(e) => setField('role', e.target.value)} />
          </Field>
          <Field label="Email">
            <TextInput type="email" value={form.email || ''} onChange={(e) => setField('email', e.target.value)} />
          </Field>
        </div>
        <ImageUploader
          label="Avatar"
          folder="avatars"
          value={form.avatar_url || ''}
          onChange={(url) => setField('avatar_url', url)}
        />
        <Field label="Short bio">
          <TextArea rows={4} value={form.bio || ''} onChange={(e) => setField('bio', e.target.value)} />
        </Field>
      </>
    )}
    toPayload={(f) => ({
      name: f.name.trim(),
      email: f.email?.trim() || null,
      role: f.role?.trim() || null,
      bio: f.bio?.trim() || null,
      avatar_url: f.avatar_url?.trim() || null,
    })}
  />
);

export default ProfilesAdmin;
