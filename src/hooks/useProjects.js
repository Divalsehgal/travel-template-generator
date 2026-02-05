import { useState, useEffect, useCallback } from 'react';
import defaultContent from '../data/content.json';
import DATA from '../data/content.json';
export const useProjects = () => {
  const [projects, setProjects] = useState([DATA]);
  const [loading, setLoading] = useState(true);

  // Validate project structure
  const isValidProject = (project) => {
    return project && 
           typeof project === 'object' &&
           project.hero && 
           project.brand &&
           typeof project.hero === 'object' &&
           typeof project.brand === 'object';
  };

  // Load projects from localStorage or initialize with default
  useEffect(() => {
    try {
      const stored = localStorage.getItem('projects');
      if (stored) {
        const parsedProjects = JSON.parse(stored);
        // Validate all projects
        const validProjects = Array.isArray(parsedProjects) 
          ? parsedProjects.filter(isValidProject)
          : [];
        
        if (validProjects.length > 0) {
          setProjects(validProjects);
        } else {
          // If no valid projects, initialize with default
          const defaultProject = {
            ...defaultContent,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
          };
          const initialProjects = [defaultProject];
          localStorage.setItem('projects', JSON.stringify(initialProjects));
          setProjects(initialProjects);
        }
      } else {
        // Initialize with default project from content.json
        const defaultProject = {
          ...defaultContent,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        const initialProjects = [defaultProject];
        localStorage.setItem('projects', JSON.stringify(initialProjects));
        setProjects(initialProjects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // On error, reset to default
      const defaultProject = {
        ...defaultContent,
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
  const saveToStorage = useCallback((updatedProjects) => {
    try {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, []);

  // Get single project by ID
  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id);
  }, [projects]);

  // Add new project
  const addProject = useCallback((data) => {
    const newProject = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    saveToStorage([...projects, newProject]);
    return newProject;
  }, [projects, saveToStorage]);

  // Update existing project
  const updateProject = useCallback((id, data) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    );
    saveToStorage(updated);
  }, [projects, saveToStorage]);

  // Delete project
  const deleteProject = useCallback((id) => {
    saveToStorage(projects.filter(p => p.id !== id));
  }, [projects, saveToStorage]);

  // Reset to default project
  const resetToDefault = useCallback(() => {
    const defaultProject = {
      ...defaultContent,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const initialProjects = [defaultProject];
    saveToStorage(initialProjects);
  }, [saveToStorage]);

  return {
    projects,
    loading,
    getProject,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault
  };
};
