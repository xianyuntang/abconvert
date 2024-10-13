import { useCallback, useRef } from 'react';

export const useThrottle = (
  callback: (...args: never[]) => void,
  limit: number
) => {
  const lastCall = useRef<number>(0);

  return useCallback(
    (...args: never[]) => {
      const now = Date.now();

      if (now - lastCall.current >= limit) {
        callback(...args);
        lastCall.current = now;
      }
    },
    [callback, limit]
  );
};
