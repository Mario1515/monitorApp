import { useState, useCallback } from 'react';

const useLoading = (delay = 1500) => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback((callback) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, delay);
  }, [delay]);

  return [loading, startLoading];
};

export default useLoading;