import { createContext, useContext } from 'react';

export const ServiceContext = createContext(null);
export function useServices() {
  const value = useContext(ServiceContext);
  if (!value) throw new Error('Service context is missing.');
  return value;
}
