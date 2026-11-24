import { createHttpService } from './http.js';

export function createEnvironment(factory, { event, keys = [], ...options }) {
  let storage;
  try {
    storage = window.localStorage;
  } catch {
    /* Services handle unavailable storage. */
  }
  const notify = () => window.dispatchEvent(new Event(event));
  const services = factory({ storage, notify, ...options });
  const subscribe = (callback) => {
    const onStorage = (change) => {
      if (change.key === null || keys.includes(change.key)) callback();
    };
    window.addEventListener(event, callback);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(event, callback);
      window.removeEventListener('storage', onStorage);
    };
  };
  return { services, subscribe };
}

export function createPublicEnvironment() {
  return createEnvironment(createHttpService, {
    event: 'artisanaid:public-session',
    keys: ['artisanaid.api-session.v1'],
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  });
}
