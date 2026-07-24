import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput } from './_shared/primitives';

const defaults = { name: '', email: '', role: '' };

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
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Name" required>
          <TextInput
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Role" hint="e.g. Programme Director">
            <TextInput
              value={form.role || ''}
              onChange={(e) => setField('role', e.target.value)}
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              value={form.email || ''}
              onChange={(e) => setField('email', e.target.value)}
            />
          </Field>
        </div>
      </>
    )}
    toPayload={(f) => ({
      name: f.name.trim(),
      email: f.email?.trim() || null,
      role: f.role?.trim() || null,
    })}
  />
);

export default ProfilesAdmin;
