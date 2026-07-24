import React, { useState } from 'react';
import { useCrud } from './useCrud';
import {
  AdminHeader,
  Notice,
  GhostButton,
  PrimaryButton,
  DangerButton,
  EmptyState,
  RowList,
  Row,
} from './primitives';

/**
 * Generic list + inline editor.
 * Props:
 *  - table: string (Supabase table name)
 *  - eyebrow, title, singular
 *  - orderBy: string (default created_at desc)
 *  - select: string (columns to fetch)
 *  - defaults: object (blank form)
 *  - renderRow: (row) => { title, meta, body? }
 *  - renderForm: ({ form, setField }) => JSX
 *  - toPayload: (form) => payload (strip empty strings etc.)
 */
const ResourcePage = ({
  table,
  eyebrow,
  title,
  singular,
  orderBy,
  ascending,
  select,
  defaults,
  renderRow,
  renderForm,
  toPayload = (f) => f,
}) => {
  const {
    rows,
    loading,
    error,
    notice,
    setNotice,
    setError,
    create,
    update,
    remove,
  } = useCrud(table, { orderBy, ascending, select });

  const [editing, setEditing] = useState(null); // null = closed, 'new' or row.id
  const [form, setForm] = useState(defaults);
  const [saving, setSaving] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const openNew = () => {
    setForm(defaults);
    setEditing('new');
  };
  const openEdit = (row) => {
    const next = { ...defaults };
    Object.keys(defaults).forEach((k) => {
      next[k] = row[k] ?? defaults[k];
    });
    setForm(next);
    setEditing(row.id);
  };
  const cancel = () => {
    setEditing(null);
    setForm(defaults);
  };
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = toPayload(form);
    const ok =
      editing === 'new' ? await create(payload) : await update(editing, payload);
    setSaving(false);
    if (ok) cancel();
  };

  const doDelete = async (id) => {
    setSaving(true);
    await remove(id);
    setSaving(false);
    setConfirmId(null);
  };

  return (
    <div>
      <AdminHeader
        eyebrow={eyebrow}
        title={title}
        actions={
          editing == null && (
            <GhostButton onClick={openNew}>+ New {singular}</GhostButton>
          )
        }
      />

      <Notice kind="error" onDismiss={() => setError(null)}>{error}</Notice>
      <Notice kind="success" onDismiss={() => setNotice(null)}>{notice}</Notice>

      {editing != null && (
        <form
          onSubmit={submit}
          className="border border-line bg-parchment/40 p-5 mb-6"
        >
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-display text-lg text-emerald-deep">
              {editing === 'new' ? `New ${singular}` : `Edit ${singular}`}
            </h3>
          </div>
          {renderForm({ form, setField })}
          <div className="flex gap-2 mt-4">
            <PrimaryButton disabled={saving}>
              {saving ? 'Saving…' : editing === 'new' ? `Create ${singular}` : 'Save changes'}
            </PrimaryButton>
            <GhostButton onClick={cancel} disabled={saving}>
              Cancel
            </GhostButton>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState>No {title.toLowerCase()} yet. Create the first one.</EmptyState>
      ) : (
        <RowList>
          {rows.map((r) => {
            const view = renderRow(r);
            const isConfirming = confirmId === r.id;
            return (
              <Row
                key={r.id}
                title={view.title}
                meta={view.meta}
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
                      <DangerButton onClick={() => setConfirmId(r.id)}>
                        Delete
                      </DangerButton>
                    </>
                  )
                }
              >
                {view.body}
              </Row>
            );
          })}
        </RowList>
      )}
    </div>
  );
};

export default ResourcePage;
