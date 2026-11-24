import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { useServices } from '../services/context';
export default function useAuth() {
  const { services, subscribe } = useServices();
  const snapshot = useCallback(() => JSON.stringify(services.getSession()), [services]);
  const raw = useSyncExternalStore(subscribe, snapshot, () => 'null');
  const session = useMemo(() => JSON.parse(raw), [raw]);
  return {
    ...session,
    isAuthenticated: Boolean(session),
    login: services.login,
    logout: services.logout,
  };
}
