import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import defaultContent from '../data/content.json';
import type { Project, ProjectCreate } from '../types/project';
import type { UseProjectsReturn } from '../types/hooks';

export const useProjects = (): UseProjectsReturn => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Get the user's projects collection reference
  const getProjectsRef = useCallback(() => {
    if (!user) return null;
    return collection(db, 'users', user.uid, 'projects');
  }, [user]);

  // Load projects from Firestore
  useEffect(() => {
    const loadProjects = async () => {
      if (!user) {
        setProjects([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const projectsRef = getProjectsRef();
        if (!projectsRef) return;

        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        const loadedProjects: Project[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate().toISOString() 
              : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp 
              ? data.updatedAt.toDate().toISOString() 
              : data.updatedAt
          } as Project;
        });

        setProjects(loadedProjects);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err : new Error('Error loading projects');
        console.error('Error loading projects:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user, getProjectsRef]);

  // Get single project by ID
  const getProject = useCallback((id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  }, [projects]);

  // Fetch single project from Firestore (async version)
  const fetchProject = useCallback(async (id: string): Promise<Project | null> => {
    if (!user) return null;
    
    try {
      const projectRef = doc(db, 'users', user.uid, 'projects', id);
      const projectSnap = await getDoc(projectRef);
      
      if (!projectSnap.exists()) return null;
      
      const data = projectSnap.data();
      return {
        ...data,
        id: projectSnap.id,
        createdAt: data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString() 
          : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp 
          ? data.updatedAt.toDate().toISOString() 
          : data.updatedAt
      } as Project;
    } catch (err) {
      console.error('Error fetching project:', err);
      return null;
    }
  }, [user]);

  // Add new project
  const addProject = useCallback(async (data: ProjectCreate): Promise<Project> => {
    if (!user) {
      throw new Error('Must be logged in to create projects');
    }

    const projectsRef = getProjectsRef();
    if (!projectsRef) {
      throw new Error('Could not access projects collection');
    }

    const projectData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(projectsRef, projectData);
    
    const newProject: Project = {
      ...data as Project,
      id: docRef.id,
      createdAt: new Date().toISOString()
    };

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, [user, getProjectsRef]);

  // Update existing project
  const updateProject = useCallback(async (id: string, data: Partial<Project>): Promise<void> => {
    if (!user) {
      throw new Error('Must be logged in to update projects');
    }

    const projectRef = doc(db, 'users', user.uid, 'projects', id);
    
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    // Remove id from update data if present
    delete (updateData as any).id;
    delete (updateData as any).createdAt;

    await updateDoc(projectRef, updateData);
    
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    ));
  }, [user]);

  // Delete project
  const deleteProject = useCallback(async (id: string): Promise<void> => {
    if (!user) {
      throw new Error('Must be logged in to delete projects');
    }

    const projectRef = doc(db, 'users', user.uid, 'projects', id);
    await deleteDoc(projectRef);
    
    setProjects(prev => prev.filter(p => p.id !== id));
  }, [user]);

  // Create default project for new users
  const createDefaultProject = useCallback(async (): Promise<Project> => {
    // Remove id, createdAt, updatedAt from default content as Firestore will generate these
    const { id, createdAt, updatedAt, ...projectData } = defaultContent as any;
    return await addProject(projectData as ProjectCreate);
  }, [addProject]);

  // Reset to default (creates a new default project)
  const resetToDefault = useCallback(async (): Promise<void> => {
    await createDefaultProject();
  }, [createDefaultProject]);

  return {
    projects,
    loading,
    error,
    getProject,
    fetchProject,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault,
    createDefaultProject
  };
};
