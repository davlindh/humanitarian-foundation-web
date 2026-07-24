import React, { useEffect, useState } from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea, Select } from './_shared/primitives';
import { supabase } from '../../integrations/supabase/client';

const STATUSES = ['todo', 'in_progress', 'blocked', 'done'];
const defaults = { name: '', description: '', status: 'todo', project_id: '' };

const TasksAdmin = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    supabase.from('projects').select('id,name').order('name').then(({ data }) => {
      setProjects(data || []);
    });
  }, []);
  const projectName = (id) => projects.find((p) => p.id === id)?.name || '—';

  return (
    <ResourcePage
      table="tasks"
      eyebrow="Workstreams"
      title="Tasks"
      singular="task"
      defaults={defaults}
      renderRow={(r) => ({
        title: r.name,
        meta: `${r.status || 'todo'} · ${projectName(r.project_id)}`,
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
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Status">
              <Select
                value={form.status || 'todo'}
                onChange={(e) => setField('status', e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s.replace('_', ' ')}</option>
                ))}
              </Select>
            </Field>
            <Field label="Project">
              <Select
                value={form.project_id || ''}
                onChange={(e) => setField('project_id', e.target.value)}
              >
                <option value="">— None —</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
            </Field>
          </div>
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
        description: f.description?.trim() || null,
        status: f.status || 'todo',
        project_id: f.project_id || null,
      })}
    />
  );
};

export default TasksAdmin;
