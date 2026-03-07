import { useState, useEffect, useCallback } from 'react';
import { useProjects } from './useFirestoreProjects';
import type { Project } from '../types/project';

interface UseProjectLoaderReturn {
    project: Project | undefined;
    isLoading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export const useProjectLoader = (id?: string): UseProjectLoaderReturn => {
    const { getProject, fetchProject } = useProjects();
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(!!id);
    const [error, setError] = useState<Error | null>(null);

    const normalizeProject = useCallback((data: Project): Project => {
        const normalized = { ...data };

        // Normalize hero images
        if (!normalized.hero.images) normalized.hero.images = [];
        if (normalized.hero.image && !normalized.hero.images[0]) {
            normalized.hero.images[0] = normalized.hero.image;
        }

        // Migrate legacy social links
        if (!normalized.header.links) {
            normalized.header.links = [];
            if (normalized.header.instagram) {
                normalized.header.links.push({
                    platform: 'instagram',
                    url: normalized.header.instagram,
                    alias: normalized.header.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@')
                });
            }
            if (normalized.header.facebook) {
                normalized.header.links.push({
                    platform: 'facebook',
                    url: normalized.header.facebook,
                    alias: 'Facebook'
                });
            }
        }

        // Normalize itinerary images
        if (normalized.itinerary) {
            normalized.itinerary = normalized.itinerary.map((day: any) => {
                const dayCopy = { ...day };
                if (!dayCopy.images) dayCopy.images = [];
                if (dayCopy.image && !dayCopy.images[0]) {
                    dayCopy.images[0] = dayCopy.image;
                }
                return dayCopy;
            });
        }

        return normalized;
    }, []);

    const loadProject = useCallback(async () => {
        if (!id) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // First try local state
            let data = getProject(id);

            // If not found locally, fetch from Firestore
            if (!data && fetchProject) {
                data = await fetchProject(id) || undefined;
            }

            if (data) {
                setProject(normalizeProject(data));
            } else {
                setError(new Error('Project not found'));
            }
        } catch (err) {
            console.error('Error loading project:', err);
            setError(err instanceof Error ? err : new Error('Unknown error loading project'));
        } finally {
            setIsLoading(false);
        }
    }, [id, getProject, fetchProject, normalizeProject]);

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    return {
        project,
        isLoading,
        error,
        refresh: loadProject
    };
};
