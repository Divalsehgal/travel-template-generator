import { useState, useEffect, useRef } from 'react';
import { useProjects } from './useFirestoreProjects';
import type { Project } from '../types/project';

interface UseProjectAutoSaveReturn {
    isSaving: boolean;
    lastSaved: Date | null;
    error: Error | null;
}

export const useProjectAutoSave = (
    id: string | undefined,
    data: Partial<Project>,
    enabled: boolean = true,
    delay: number = 30000
): UseProjectAutoSaveReturn => {
    const { updateProject } = useProjects();
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const initialMount = useRef(true);

    useEffect(() => {
        // Skip initial mount and disabled state
        if (!id || !enabled) return;

        // Don't save on the very first mount after loading data
        if (initialMount.current) {
            initialMount.current = false;
            return;
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(async () => {
            try {
                setIsSaving(true);
                setError(null);
                await updateProject(id, data);
                setLastSaved(new Date());
            } catch (err) {
                console.error('Auto-save error:', err);
                setError(err instanceof Error ? err : new Error('Unknown error during auto-save'));
            } finally {
                setIsSaving(false);
            }
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [data, id, updateProject, enabled, delay]);

    return {
        isSaving,
        lastSaved,
        error
    };
};
