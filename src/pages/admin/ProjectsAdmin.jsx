import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea, Select } from './_shared/primitives';
import ImageUploader from './_shared/ImageUploader';

const STATUSES = ['', 'planned', 'active', 'completed', 'paused'];

const defaults = {
  name: '',
  description: '',
  location: '',
  status: '',
  cover_image: '',
};

const ProjectsAdmin = () => (
  <ResourcePage
    table="projects"
    eyebrow="Programmes"
    title="Projects"
    singular="project"
    defaults={defaults}
    renderRow={(r) => ({
      title: r.name,
      meta: [r.status, r.location, `Updated ${new Date(r.updated_at).toLocaleDateString()}`]
        .filter(Boolean).join(' · '),
      body: r.description,
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Name" required>
          <TextInput value={form.name} onChange={(e) => setField('name', e.target.value)} required />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Location" hint="e.g. Rift Valley, Kenya">
            <TextInput value={form.location || ''} onChange={(e) => setField('location', e.target.value)} />
          </Field>
          <Field label="Status">
            <Select value={form.status || ''} onChange={(e) => setField('status', e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s || '— none —'}</option>
              ))}
            </Select>
          </Field>
        </div>
        <ImageUploader
          label="Cover image"
          folder="projects"
          value={form.cover_image || ''}
          onChange={(url) => setField('cover_image', url)}
        />
        <Field label="Description">
          <TextArea rows={6} value={form.description || ''} onChange={(e) => setField('description', e.target.value)} />
        </Field>
      </>
    )}
    toPayload={(f) => ({
      name: f.name.trim(),
      description: f.description?.trim() || null,
      location: f.location?.trim() || null,
      status: f.status?.trim() || null,
      cover_image: f.cover_image?.trim() || null,
    })}
  />
);

export default ProjectsAdmin;
