import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea } from './_shared/primitives';
import ImageUploader from './_shared/ImageUploader';

const defaults = { name: '', description: '', website: '', logo_url: '' };

const GroupProfilesAdmin = () => (
  <ResourcePage
    table="group_profiles"
    eyebrow="Partners"
    title="Group profiles"
    singular="group"
    defaults={defaults}
    renderRow={(r) => ({
      title: r.name,
      meta: [r.website, `Updated ${new Date(r.updated_at).toLocaleDateString()}`].filter(Boolean).join(' · '),
      body: r.description,
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Name" required>
          <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} required />
        </Field>
        <Field label="Website">
          <TextInput type="url" value={form.website || ''} onChange={(e) => setField('website', e.target.value)} placeholder="https://…" />
        </Field>
        <ImageUploader
          label="Logo"
          folder="logos"
          value={form.logo_url || ''}
          onChange={(url) => setField('logo_url', url)}
        />
        <Field label="Description">
          <TextArea value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
        </Field>
      </>
    )}
    toPayload={(f) => ({
      name: f.name.trim(),
      description: f.description?.trim() || null,
      website: f.website?.trim() || null,
      logo_url: f.logo_url?.trim() || null,
    })}
  />
);

export default GroupProfilesAdmin;
