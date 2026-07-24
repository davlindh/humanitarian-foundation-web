import React, { useEffect, useState } from 'react';
import ResourcePage from './_shared/ResourcePage';
import { Field, TextInput, TextArea, Select } from './_shared/primitives';
import { supabase } from '../../integrations/supabase/client';

const defaults = { name: '', description: '', due_date: '', project_id: '' };

const MilestonesAdmin = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    supabase.from('projects').select('id,name').order('name').then(({ data }) => {
      setProjects(data || []);
    });
  }, []);
  const projectName = (id) => projects.find((p) => p.id === id)?.name || '—';

  return (
    <ResourcePage
      table="milestones"
      eyebrow="Progress"
      title="Milestones"
      singular="milestone"
      defaults={defaults}
      renderRow={(r) => ({
        title: r.name,
        meta: `${projectName(r.project_id)}${r.due_date ? ` · due ${r.due_date}` : ''}`,
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
            <Field label="Due date">
              <TextInput
                type="date"
                value={form.due_date || ''}
                onChange={(e) => setField('due_date', e.target.value)}
              />
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
        due_date: f.due_date || null,
        project_id: f.project_id || null,
      })}
    />
  );
};

export default MilestonesAdmin;
