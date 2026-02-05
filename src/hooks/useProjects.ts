import { useState, useEffect, useCallback } from 'react';
import defaultContent from '../data/content.json';
import type { Project, ProjectCreate } from '../types/project';
import { isProject } from '../types/project';
import type { UseProjectsReturn } from '../types/hooks';

export const useProjects = (): UseProjectsReturn => {
  const [error, setError] = useState<Error | null>(null);
  const [projects, setProjects] = useState<Project[]>([defaultContent as Project]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load projects from localStorage or initialize with default
  useEffect(() => {
    try {
      const stored = localStorage.getItem('projects');
      if (stored) {
        const parsedProjects = JSON.parse(stored);
        // Validate all projects
        const validProjects = Array.isArray(parsedProjects) 
          ? parsedProjects.filter(isProject)
          : [];
        
        if (validProjects.length > 0) {
          setProjects(validProjects);
        } else {
          // If no valid projects, initialize with default
          const defaultProject: Project = {
            ...(defaultContent as Project),
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
          };
          const initialProjects = [defaultProject];
          localStorage.setItem('projects', JSON.stringify(initialProjects));
          setProjects(initialProjects);
        }
      } else {
        // Initialize with default project from content.json
        const defaultProject: Project = {
          ...(defaultContent as Project),
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        const initialProjects = [defaultProject];
        localStorage.setItem('projects', JSON.stringify(initialProjects));
        setProjects(initialProjects);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Error loading projects');
      console.error('Error loading projects:', errorMessage);
      setError(errorMessage);
      // On error, reset to default
      const defaultProject: Project = {
        ...(defaultContent as Project),
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      const initialProjects = [defaultProject];
      localStorage.setItem('projects', JSON.stringify(initialProjects));
      setProjects(initialProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save projects to localStorage
  const saveToStorage = useCallback((updatedProjects: Project[]) => {
    try {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, []);

  // Get single project by ID
  const getProject = useCallback((id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  }, [projects]);

  // Add new project
  const addProject = useCallback((data: ProjectCreate): Project => {
    const newProject: Project = {
      ...data as Project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    saveToStorage([...projects, newProject]);
    return newProject;
  }, [projects, saveToStorage]);

  // Update existing project
  const updateProject = useCallback((id: string, data: Partial<Project>): void => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    );
    saveToStorage(updated);
  }, [projects, saveToStorage]);

  // Delete project
  const deleteProject = useCallback((id: string): void => {
    saveToStorage(projects.filter(p => p.id !== id));
  }, [projects, saveToStorage]);

  // Reset to default project
  const resetToDefault = useCallback((): void => {
    const defaultProject: Project = {
      ...(defaultContent as Project),
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const initialProjects = [defaultProject];
    saveToStorage(initialProjects);
  }, [saveToStorage]);

  return {
    projects,
    loading,
    error,
    getProject,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault
  };
};
