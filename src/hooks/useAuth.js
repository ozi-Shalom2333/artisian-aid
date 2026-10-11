import { useMemo, useSyncExternalStore } from 'react';
import { services, subscribe } from '../services';
const snapshot = () => JSON.stringify(services.getSession());
export default function useAuth() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => 'null');
  const session = useMemo(() => JSON.parse(raw), [raw]);
  return {
    ...session,
    isAuthenticated: Boolean(session),
    login: services.login,
    logout: services.logout,
  };
}
