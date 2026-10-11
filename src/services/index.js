import { createDemoService, CHANGE_EVENT } from './demo.js';
import { createHttpService } from './http.js';
export const isDemo = import.meta.env.VITE_DATA_MODE !== 'api';
let storage;
try {
  storage = window.localStorage;
} catch {
  /* Demo supports memory sessions. */
}
const notify = () => window.dispatchEvent(new Event(CHANGE_EVENT));
export const services = isDemo
  ? createDemoService({ storage, notify })
  : createHttpService({ storage, notify, baseUrl: import.meta.env.VITE_API_BASE_URL });
export const subscribe = (callback) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
};
