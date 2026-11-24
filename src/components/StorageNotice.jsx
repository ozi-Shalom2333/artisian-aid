import { useSyncExternalStore } from 'react';
import { useServices } from '../services/context';

export default function StorageNotice() {
  const { services, subscribe } = useServices();
  const warning = useSyncExternalStore(subscribe, services.getStorageWarning);
  if (!warning) return null;
  return (
    <p className="storage-warning" role="status">
      {warning}
    </p>
  );
}
