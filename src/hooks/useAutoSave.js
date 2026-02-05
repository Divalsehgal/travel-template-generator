import { useState, useEffect } from 'react';

export const useAutoSave = (data, saveCallback, delay = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (!data) return;

    const timeoutId = setTimeout(() => {
      setIsSaving(true);
      saveCallback(data);
      setLastSaved(new Date());
      setIsSaving(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, saveCallback, delay]);

  return { isSaving, lastSaved };
};
