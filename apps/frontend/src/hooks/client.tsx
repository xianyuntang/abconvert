import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export const useClientId = () => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const existClientId = localStorage.getItem('clientId');
    if (!existClientId) {
      const newClientId = nanoid();
      setClientId(newClientId);
      localStorage.setItem('clientId', newClientId);
    } else if (clientId !== existClientId) {
      setClientId(existClientId);
    }
  }, [clientId]);

  return { clientId: clientId || '' };
};
