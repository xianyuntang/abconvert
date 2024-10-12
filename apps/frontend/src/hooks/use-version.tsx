import { useEffect, useState } from 'react';

export const useVersion = (productId?: string) => {
  const [versionId, setVersionId] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const version = localStorage.getItem(`products/${productId}/version`);
      setVersionId(version);
    }
  }, [productId]);

  const saveVersionId = (versionId: string) => {
    localStorage.setItem(`products/${productId}/version`, versionId);
  };

  return { versionId, saveVersionId };
};
