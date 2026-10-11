import React from 'react';
import { cn } from 'cn';

const toneByStatus = {
  succeeded: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  default: 'bg-muted text-muted-foreground ring-border',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  processing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  in_progress: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  declined: 'bg-red-50 text-red-700 ring-red-600/20',
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  restricted: 'bg-red-50 text-red-700 ring-red-600/20',
};

const StatusBadge = ({ status, label, className }) => {
  const key = String(status ?? '')
    .toLowerCase()
    .replace(/[\s_-]+/g, '_');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset',
        toneByStatus[key] ?? toneByStatus.default,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label ?? String(status ?? '').replace(/_/g, ' ')}
    </span>
  );
};

export default StatusBadge;
