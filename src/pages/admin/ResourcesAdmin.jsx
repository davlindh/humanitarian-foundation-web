import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea } from './_shared/primitives';

const defaults = { name: '', description: '', url: '' };

const ResourcesAdmin = () => (
  <ResourcePage
    table="resources"
    eyebrow="Library"
    title="Resources"
    singular="resource"
    defaults={defaults}
    renderRow={(r) => ({
      title: r.name,
      meta: r.url ? (
        <a href={r.url} target="_blank" rel="noreferrer" className="underline text-emerald-deep">
          {r.url}
        </a>
      ) : null,
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
        <Field label="URL" hint="Optional link to the document or page.">
          <TextInput
            type="url"
            placeholder="https://…"
            value={form.url || ''}
            onChange={(e) => setField('url', e.target.value)}
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
    toPayload={(f) => ({
      name: f.name.trim(),
      url: f.url?.trim() || null,
      description: f.description?.trim() || null,
    })}
  />
);

export default ResourcesAdmin;
