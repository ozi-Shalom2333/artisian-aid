import { useCallback, useEffect, useState } from 'react';
// Pass a memoized loader when it depends on a route parameter.
export default function useResource(loader) {
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState({ data: null, loading: true, error: '' });
  useEffect(() => {
    let current = true;
    setResult({ data: null, loading: true, error: '' });
    Promise.resolve()
      .then(loader)
      .then(
        (data) => {
          if (current) setResult({ data, loading: false, error: '' });
        },
        (error) => {
          if (current)
            setResult({ data: null, loading: false, error: error.message || 'Please try again.' });
        },
      );
    return () => {
      current = false;
    };
  }, [loader, revision]);
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  return { ...result, reload };
}
