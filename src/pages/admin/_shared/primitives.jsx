import React from 'react';

export const Eyebrow = ({ children }) => (
  <p className="eyebrow">{children}</p>
);

export const AdminHeader = ({ eyebrow, title, actions }) => (
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <hr className="rule-gold" />
    <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
      <h2 className="text-2xl">{title}</h2>
      {actions}
    </div>
  </div>
);

export const Notice = ({ kind = 'info', children, onDismiss }) => {
  if (!children) return null;
  const styles = {
    info: 'border-line bg-parchment/60 text-ink',
    success: 'border-emerald-deep bg-emerald-soft/40 text-emerald-deep',
    error: 'border-red-700 bg-red-50 text-red-800',
  }[kind];
  return (
    <div className={`mb-4 border px-3 py-2 text-sm flex items-start gap-3 ${styles}`}>
      <span className="flex-1">{children}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
};

export const Field = ({ label, children, hint, required }) => (
  <label className="block mb-4">
    <span className="block text-xs tracking-widest uppercase text-ink-soft mb-1">
      {label}
      {required && <span className="text-gold ml-1">*</span>}
    </span>
    {children}
    {hint && <span className="block text-xs text-ink-soft mt-1">{hint}</span>}
  </label>
);

const inputCls =
  'w-full bg-paper border border-line px-3 py-2 text-sm text-ink focus:outline-none focus:border-gold';

export const TextInput = (props) => <input {...props} className={inputCls} />;
export const TextArea = (props) => (
  <textarea rows={4} {...props} className={inputCls} />
);
export const Select = ({ children, ...props }) => (
  <select {...props} className={inputCls}>
    {children}
  </select>
);

export const PrimaryButton = ({ children, ...props }) => (
  <button
    type="submit"
    {...props}
    className="text-xs tracking-widest uppercase bg-emerald-deep text-paper px-4 py-2 border border-emerald-deep hover:bg-emerald-deep/90 disabled:opacity-50"
  >
    {children}
  </button>
);

export const GhostButton = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className="text-xs tracking-widest uppercase border border-line px-3 py-2 hover:border-gold disabled:opacity-50"
  >
    {children}
  </button>
);

export const DangerButton = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className="text-xs tracking-widest uppercase border border-red-700 text-red-700 px-3 py-2 hover:bg-red-700 hover:text-paper disabled:opacity-50"
  >
    {children}
  </button>
);

export const EmptyState = ({ children }) => (
  <div className="border border-dashed border-line bg-parchment/30 p-8 text-center text-ink-soft text-sm">
    {children}
  </div>
);

export const RowList = ({ children }) => (
  <ul className="border border-line divide-y divide-line bg-paper">{children}</ul>
);

export const Row = ({ title, meta, children, actions }) => (
  <li className="p-4 flex flex-wrap items-start gap-4 justify-between">
    <div className="min-w-0 flex-1">
      <div className="font-display text-emerald-deep">{title}</div>
      {meta && <div className="text-xs text-ink-soft mt-0.5">{meta}</div>}
      {children && <div className="text-sm text-ink mt-2">{children}</div>}
    </div>
    {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
  </li>
);
