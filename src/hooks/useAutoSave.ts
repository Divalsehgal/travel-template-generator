import { useState, useEffect } from 'react';
import type { UseAutoSaveReturn, UseAutoSaveOptions } from '../types/hooks';

export const useAutoSave = <T>(
  data: T,
  saveCallback: (data: T) => void,
  options: UseAutoSaveOptions = {}
): UseAutoSaveReturn => {
  const { delay = 2000, onSuccess, onError } = options;
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!data) return;

    const timeoutId = setTimeout(async () => {
      setIsSaving(true);
      setError(null);
      
      try {
        await Promise.resolve(saveCallback(data));
        setLastSaved(new Date());
        onSuccess?.();
      } catch (err) {
        const saveError = err instanceof Error ? err : new Error('Save failed');
        setError(saveError);
        onError?.(saveError);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, saveCallback, delay, onSuccess, onError]);

  return { isSaving, lastSaved, error };
};
