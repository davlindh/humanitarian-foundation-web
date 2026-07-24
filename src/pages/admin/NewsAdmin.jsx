import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import {
  AdminHeader, Notice, Field, TextInput, TextArea, Select,
  PrimaryButton, GhostButton, DangerButton, EmptyState, RowList, Row,
} from './_shared/primitives';
import ImageUploader from './_shared/ImageUploader';

const POST_TYPES = ['blog', 'press'];
const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Drafts' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'live', label: 'Live' },
];

const slugify = (s) =>
  (s || '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const statusOf = (row) => {
  if (!row.is_published) return 'draft';
  if (row.published_at && new Date(row.published_at) > new Date()) return 'scheduled';
  return 'live';
};

const STATUS_STYLE = {
  draft: 'border-ink-soft text-ink-soft',
  scheduled: 'border-gold text-gold',
  live: 'border-emerald-deep bg-emerald-deep text-paper',
};

const toDateTimeInput = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const defaults = {
  title: '',
  slug: '',
  post_type: 'blog',
  category: '',
  excerpt: '',
  content: '',
  image_url: '',
  is_published: false,
  published_at: '',
};

const NewsAdmin = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaults);
  const [slugDirty, setSlugDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState('');
  const [params, setParams] = useSearchParams();
  const statusTab = params.get('status') || 'all';

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const load = async () => {
    setLoading(true);
    const { data, error: err } = await supabase
      .from('news_posts')
      .select('*')
      .order('updated_at', { ascending: false });
    if (err) setError(err.message);
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Handle ?new=1 quick-create
  useEffect(() => {
    if (params.get('new') === '1' && editing == null) {
      openNew();
      const p = new URLSearchParams(params);
      p.delete('new');
      setParams(p, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setForm(defaults);
    setSlugDirty(false);
    setEditing('new');
  };
  const openEdit = (row) => {
    const next = { ...defaults };
    Object.keys(defaults).forEach((k) => { next[k] = row[k] ?? defaults[k]; });
    if (row.published_at) next.published_at = toDateTimeInput(row.published_at);
    setForm(next);
    setSlugDirty(true);
    setEditing(row.id);
  };
  const cancel = () => { setEditing(null); setForm(defaults); setSlugDirty(false); };

  const onTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: slugDirty ? f.slug : slugify(title),
    }));
  };

  const onSlugChange = (e) => {
    setSlugDirty(true);
    setField('slug', slugify(e.target.value));
  };

  const buildPayload = (overrides = {}) => {
    const merged = { ...form, ...overrides };
    return {
      title: merged.title.trim(),
      slug: merged.slug?.trim() || slugify(merged.title),
      post_type: merged.post_type || 'blog',
      category: merged.category?.trim() || null,
      excerpt: merged.excerpt?.trim() || null,
      content: merged.content?.trim() || null,
      image_url: merged.image_url?.trim() || null,
      is_published: !!merged.is_published,
      published_at: merged.published_at
        ? new Date(merged.published_at).toISOString()
        : null,
    };
  };

  const save = async (overrides = {}) => {
    setError(null); setNotice(null);
    const payload = buildPayload(overrides);
    if (!payload.title) { setError('Title is required.'); return false; }
    if (!payload.slug) { setError('Slug is required.'); return false; }
    if (payload.is_published && !payload.published_at) {
      payload.published_at = new Date().toISOString();
    }
    // Slug uniqueness (client-side pre-check)
    const dup = rows.find((r) => r.slug === payload.slug && r.id !== editing);
    if (dup) { setError(`Slug "${payload.slug}" is already used by "${dup.title}".`); return false; }

    setSaving(true);
    let res;
    if (editing === 'new') {
      res = await supabase.from('news_posts').insert([payload]);
    } else {
      res = await supabase.from('news_posts').update(payload).eq('id', editing);
    }
    setSaving(false);
    if (res.error) { setError(res.error.message); return false; }
    setNotice('Saved.');
    await load();
    cancel();
    return true;
  };

  const publishNow = () => save({ is_published: true, published_at: toDateTimeInput(new Date().toISOString()) });
  const saveDraft = () => save({ is_published: false });
  const schedule = () => {
    if (!form.published_at) { setError('Pick a publish date to schedule.'); return; }
    return save({ is_published: true });
  };

  const doDelete = async (id) => {
    setSaving(true);
    const { error: err } = await supabase.from('news_posts').delete().eq('id', id);
    setSaving(false);
    setConfirmId(null);
    if (err) setError(err.message);
    else { setNotice('Deleted.'); await load(); }
  };

  const copyLink = async (slug) => {
    const url = `${window.location.origin}/news/${slug}`;
    try { await navigator.clipboard.writeText(url); setNotice('Link copied.'); }
    catch { setError('Could not copy link.'); }
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (statusTab !== 'all' && statusOf(r) !== statusTab) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [rows, statusTab, search]);

  const counts = useMemo(() => {
    const c = { all: rows.length, draft: 0, scheduled: 0, live: 0 };
    rows.forEach((r) => { c[statusOf(r)] += 1; });
    return c;
  }, [rows]);

  const setStatusTab = (key) => {
    const p = new URLSearchParams(params);
    if (key === 'all') p.delete('status'); else p.set('status', key);
    setParams(p, { replace: true });
  };

  return (
    <div>
      <AdminHeader
        eyebrow="Newsroom"
        title="News posts"
        actions={editing == null && <PrimaryButton type="button" onClick={openNew}>+ New post</PrimaryButton>}
      />

      <Notice kind="error" onDismiss={() => setError(null)}>{error}</Notice>
      <Notice kind="success" onDismiss={() => setNotice(null)}>{notice}</Notice>

      {editing != null && (
        <form
          onSubmit={(e) => { e.preventDefault(); save(); }}
          className="border border-line bg-parchment/40 p-5 mb-6"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-lg text-emerald-deep">
              {editing === 'new' ? 'New post' : 'Edit post'}
            </h3>
            {editing !== 'new' && (
              <span className={`text-[10px] tracking-widest uppercase border px-2 py-0.5 ${STATUS_STYLE[statusOf(form)]}`}>
                {statusOf(form)}
              </span>
            )}
          </div>

          <Field label="Title" required>
            <TextInput value={form.title} onChange={onTitleChange} required />
          </Field>
          <div className="grid sm:grid-cols-[2fr_1fr_1fr] gap-4">
            <Field label="Slug" hint="Used in the public URL (/news/…)">
              <TextInput value={form.slug} onChange={onSlugChange} required />
            </Field>
            <Field label="Type">
              <Select value={form.post_type} onChange={(e) => setField('post_type', e.target.value)}>
                {POST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Category" hint="e.g. Water">
              <TextInput value={form.category || ''} onChange={(e) => setField('category', e.target.value)} />
            </Field>
          </div>

          <ImageUploader
            label="Cover image"
            folder="news"
            value={form.image_url || ''}
            onChange={(url) => setField('image_url', url)}
          />

          <Field label="Excerpt" hint="Shown in list previews.">
            <TextArea value={form.excerpt || ''} onChange={(e) => setField('excerpt', e.target.value)} />
          </Field>
          <Field label="Content" hint="Markdown supported.">
            <TextArea rows={12} value={form.content || ''} onChange={(e) => setField('content', e.target.value)} />
          </Field>

          <div className="border-t border-line pt-4 mt-4">
            <Field label="Publish date" hint="Future date = scheduled. Blank = uses 'now' when published.">
              <TextInput
                type="datetime-local"
                value={form.published_at || ''}
                onChange={(e) => setField('published_at', e.target.value)}
              />
            </Field>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                type="button" disabled={saving} onClick={publishNow}
                className="text-xs tracking-widest uppercase bg-emerald-deep text-paper px-4 py-2 border border-emerald-deep hover:bg-emerald-deep/90 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Publish now'}
              </button>
              {form.published_at && (
                <button
                  type="button" disabled={saving} onClick={schedule}
                  className="text-xs tracking-widest uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-paper disabled:opacity-50"
                >
                  Schedule
                </button>
              )}
              <button
                type="button" disabled={saving} onClick={saveDraft}
                className="text-xs tracking-widest uppercase border border-line px-4 py-2 hover:border-gold disabled:opacity-50"
              >
                Save as draft
              </button>
              {editing !== 'new' && form.slug && (
                <button
                  type="button" onClick={() => copyLink(form.slug)}
                  className="text-xs tracking-widest uppercase border border-line px-4 py-2 hover:border-gold"
                >
                  Copy public link
                </button>
              )}
              <GhostButton onClick={cancel} disabled={saving}>Cancel</GhostButton>
            </div>
          </div>
        </form>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 flex-wrap">
          {STATUS_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setStatusTab(t.key)}
              className={`text-xs tracking-widest uppercase px-3 py-1.5 border ${
                statusTab === t.key
                  ? 'bg-emerald-deep text-paper border-emerald-deep'
                  : 'border-line text-ink hover:border-gold'
              }`}
            >
              {t.label} <span className="opacity-70">({counts[t.key] ?? 0})</span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search titles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-paper border border-line px-3 py-1.5 text-sm text-ink focus:outline-none focus:border-gold min-w-[220px]"
        />
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState>No posts match the current filter.</EmptyState>
      ) : (
        <RowList>
          {filtered.map((r) => {
            const st = statusOf(r);
            const isConfirming = confirmId === r.id;
            return (
              <Row
                key={r.id}
                title={
                  <span className="flex items-center gap-2 flex-wrap">
                    <span>{r.title}</span>
                    <span className={`text-[10px] tracking-widest uppercase border px-2 py-0.5 ${STATUS_STYLE[st]}`}>
                      {st}
                    </span>
                  </span>
                }
                meta={[
                  r.post_type,
                  r.category,
                  r.published_at ? new Date(r.published_at).toLocaleString() : 'no date',
                  `/news/${r.slug}`,
                ].filter(Boolean).join(' · ')}
                actions={
                  isConfirming ? (
                    <>
                      <DangerButton disabled={saving} onClick={() => doDelete(r.id)}>
                        {saving ? '…' : 'Confirm delete'}
                      </DangerButton>
                      <GhostButton onClick={() => setConfirmId(null)}>Cancel</GhostButton>
                    </>
                  ) : (
                    <>
                      <GhostButton onClick={() => openEdit(r)}>Edit</GhostButton>
                      <DangerButton onClick={() => setConfirmId(r.id)}>Delete</DangerButton>
                    </>
                  )
                }
              >
                {r.excerpt}
              </Row>
            );
          })}
        </RowList>
      )}
    </div>
  );
};

export default NewsAdmin;
