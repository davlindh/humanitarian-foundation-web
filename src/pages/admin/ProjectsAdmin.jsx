import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea, Select } from './_shared/primitives';
import ImageUploader from './_shared/ImageUploader';
import { slugify } from '../../lib/slug';

const STATUSES = ['', 'planned', 'active', 'completed', 'paused'];

const defaults = {
  name: '',
  slug: '',
  description: '',
  location: '',
  status: '',
  cover_image: '',
  is_featured: false,
};

const ProjectsAdmin = () => (
  <ResourcePage
    table="projects"
    eyebrow="Programmes"
    title="Projects"
    singular="project"
    defaults={defaults}
    renderRow={(r) => ({
      title: `${r.name}${r.is_featured ? ' ★' : ''}`,
      meta: [r.status, r.location, r.slug && `/projects/${r.slug}`, `Updated ${new Date(r.updated_at).toLocaleDateString()}`]
        .filter(Boolean).join(' · '),
      body: r.description,
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Name" required>
          <TextInput
            value={form.name}
            onChange={(e) => {
              setField('name', e.target.value);
              if (!form.slug || form.slug === slugify(form.name)) {
                setField('slug', slugify(e.target.value));
              }
            }}
            required
          />
        </Field>
        <Field label="Slug" hint="URL segment — leave blank to auto-generate from name.">
          <TextInput
            value={form.slug || ''}
            onChange={(e) => setField('slug', slugify(e.target.value))}
            placeholder="clean-water-kenya"
          />
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
        <Field label="Featured on home page" hint="Highlighted as the main programme on the landing page.">
          <label className="inline-flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) => setField('is_featured', e.target.checked)}
            />
            Show as featured
          </label>
        </Field>
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
      slug: (f.slug?.trim() || slugify(f.name)) || null,
      description: f.description?.trim() || null,
      location: f.location?.trim() || null,
      status: f.status?.trim() || null,
      cover_image: f.cover_image?.trim() || null,
      is_featured: !!f.is_featured,
    })}
  />
);

export default ProjectsAdmin;
