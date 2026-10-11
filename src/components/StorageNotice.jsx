import { useSyncExternalStore } from 'react';
import { services, subscribe } from '../services';

export default function StorageNotice() {
  const warning = useSyncExternalStore(subscribe, services.getStorageWarning);
  if (!warning) return null;
  return (
    <p className="storage-warning" role="status">
      {warning}
    </p>
  );
}
