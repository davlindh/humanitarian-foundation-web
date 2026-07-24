import React from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea, Select } from './_shared/primitives';

const POST_TYPES = ['blog', 'press'];
const defaults = {
  title: '',
  category: '',
  excerpt: '',
  content: '',
  image_url: '',
  post_type: 'blog',
  published_at: '',
};

const toDateInput = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');

const NewsAdmin = () => (
  <ResourcePage
    table="news_posts"
    eyebrow="Newsroom"
    title="News posts"
    singular="post"
    orderBy="published_at"
    ascending={false}
    defaults={defaults}
    renderRow={(r) => ({
      title: r.title,
      meta: [
        r.post_type,
        r.category,
        r.published_at ? new Date(r.published_at).toLocaleDateString() : 'unpublished',
      ]
        .filter(Boolean)
        .join(' · '),
      body: r.excerpt,
    })}
    renderForm={({ form, setField }) => (
      <>
        <Field label="Title" required>
          <TextInput
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            required
          />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Type">
            <Select
              value={form.post_type || 'blog'}
              onChange={(e) => setField('post_type', e.target.value)}
            >
              {POST_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Category" hint="e.g. Water, Education">
            <TextInput
              value={form.category || ''}
              onChange={(e) => setField('category', e.target.value)}
            />
          </Field>
          <Field label="Publish date">
            <TextInput
              type="date"
              value={toDateInput(form.published_at)}
              onChange={(e) => setField('published_at', e.target.value)}
            />
          </Field>
        </div>
        <Field label="Cover image URL">
          <TextInput
            value={form.image_url || ''}
            onChange={(e) => setField('image_url', e.target.value)}
            placeholder="/images/blog1.jpg"
          />
        </Field>
        <Field label="Excerpt" hint="One or two sentences used in list previews.">
          <TextArea
            value={form.excerpt || ''}
            onChange={(e) => setField('excerpt', e.target.value)}
          />
        </Field>
        <Field label="Content">
          <TextArea
            rows={10}
            value={form.content || ''}
            onChange={(e) => setField('content', e.target.value)}
          />
        </Field>
      </>
    )}
    toPayload={(f) => ({
      title: f.title.trim(),
      post_type: f.post_type || 'blog',
      category: f.category?.trim() || null,
      excerpt: f.excerpt?.trim() || null,
      content: f.content?.trim() || null,
      image_url: f.image_url?.trim() || null,
      published_at: f.published_at
        ? new Date(f.published_at).toISOString()
        : null,
    })}
  />
);

export default NewsAdmin;
