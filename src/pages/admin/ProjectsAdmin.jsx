import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea } from './_shared/primitives';

const defaults = { name: '', description: '' };

const ProjectsAdmin = () => (
  <ResourcePage
    table="projects"
    eyebrow="Programmes"
    title="Projects"
    singular="project"
    defaults={defaults}
    renderRow={(r) => ({
      title: r.name,
      meta: `Updated ${new Date(r.updated_at).toLocaleDateString()}`,
      body: r.description,
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
        <Field label="Description">
          <TextArea
            value={form.description || ''}
            onChange={(e) => setField('description', e.target.value)}
          />
        </Field>
      </>
    )}
    toPayload={(f) => ({ name: f.name.trim(), description: f.description?.trim() || null })}
  />
);

export default ProjectsAdmin;
