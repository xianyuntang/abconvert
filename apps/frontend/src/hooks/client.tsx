import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export const useClientId = () => {
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    const existClientId = localStorage.getItem('clientId');
    if (existClientId) {
      setClientId(existClientId);
    } else {
      const newClientId = nanoid();
      setClientId(newClientId);
      localStorage.setItem('clientId', newClientId);
    }
  }, []);

  return { clientId };
};
