import { useEffect, useState } from 'react';

export const useVersionId = (productId?: string) => {
  const [versionId, setVersionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (productId) {
      const version = localStorage.getItem(`products/${productId}/version`);
      setVersionId(version || undefined);
    }
  }, [productId]);

  const saveVersionId = (versionId: string) => {
    localStorage.setItem(`products/${productId}/version`, versionId);
    setVersionId(versionId);
  };

  const removeVersionId = (productId: string) => {
    localStorage.removeItem(`products/${productId}/version`);
    setVersionId(undefined);
  };

  return { versionId, saveVersionId, removeVersionId };
};
