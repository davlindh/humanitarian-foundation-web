import React from 'react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Divider from '../../../components/ui/Divider';
import { Field as UiField, Input, Textarea as UiTextarea, Select as UiSelect } from '../../../components/ui/Field';

export const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;

export const AdminHeader = ({ eyebrow, title, actions }) => (
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <Divider variant="rule" />
    <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      {actions}
    </div>
  </div>
);

const noticeVariant = { info: 'neutral', success: 'success', error: 'danger' };
const noticeSurface = {
  info: 'bg-surface-elevated border-border-subtle text-content',
  success: 'bg-emerald-soft/40 border-emerald text-content-brand',
  error: 'bg-danger/5 border-danger text-danger',
};

export const Notice = ({ kind = 'info', children, onDismiss }) => {
  if (!children) return null;
  return (
    <div className={`mb-4 border rounded-md px-4 py-3 text-sm flex items-start gap-3 ${noticeSurface[kind]}`}>
      <Badge variant={noticeVariant[kind]}>{kind}</Badge>
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-xs opacity-70 hover:opacity-100" aria-label="Dismiss">×</button>
      )}
    </div>
  );
};

export const Field = ({ label, children, hint, required }) => (
  <UiField label={label} hint={hint} required={required}>{children}</UiField>
);

export const TextInput = (props) => <Input {...props} />;
export const TextArea = (props) => <UiTextarea {...props} />;
export const Select = ({ children, ...props }) => <UiSelect {...props}>{children}</UiSelect>;

export const PrimaryButton = ({ children, ...props }) => (
  <Button type="submit" variant="primary" size="sm" {...props}>{children}</Button>
);
export const GhostButton = ({ children, ...props }) => (
  <Button type="button" variant="ghost" size="sm" {...props}>{children}</Button>
);
export const DangerButton = ({ children, ...props }) => (
  <Button type="button" variant="danger" size="sm" {...props}>{children}</Button>
);

export const EmptyState = ({ children }) => (
  <div className="border border-dashed border-border-subtle rounded-card bg-surface-paper/50 p-8 text-center text-content-soft text-sm">
    {children}
  </div>
);

export const RowList = ({ children }) => (
  <ul className="rounded-card overflow-hidden bg-surface-elevated shadow-hairline divide-y divide-border-subtle/60">
    {children}
  </ul>
);

export const Row = ({ title, meta, children, actions }) => (
  <li className="p-4 md:p-5 flex flex-wrap items-start gap-4 justify-between transition-fast ease-editorial hover:bg-surface-muted/40">
    <div className="min-w-0 flex-1">
      <div className="font-serif text-xl text-content-brand">{title}</div>
      {meta && <div className="text-xs text-content-soft mt-0.5 tracking-wide">{meta}</div>}
      {children && <div className="text-sm text-content mt-2">{children}</div>}
    </div>
    {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
  </li>
);
