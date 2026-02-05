import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useFirestoreProjects';
import { useAuth } from '../../contexts/AuthContext';
import ProjectCard from '../../components/ProjectCard/index.tsx';
import styles from './styles.module.scss';

export default function Projects(): JSX.Element {
  const { projects, loading, deleteProject, createDefaultProject } = useProjects();
  const { user, signOut } = useAuth();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateSample = async (): Promise<void> => {
    if (createDefaultProject) {
      try {
        await createDefaultProject();
      } catch (error) {
        console.error('Error creating sample project:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.projects}>
        <div className={styles.projects__container}>
          {/* Skeleton User Header */}
          <div className={`${styles.projects__user} ${styles['projects__user--skeleton']}`}>
            <div className={styles['projects__user-info']}>
              <div className={styles['skeleton__avatar']} />
              <div className={styles['skeleton__user-details']}>
                <div className={styles['skeleton__text']} style={{ width: '120px' }} />
                <div className={styles['skeleton__text']} style={{ width: '180px', height: '12px' }} />
              </div>
            </div>
            <div className={styles['skeleton__button']} />
          </div>

          {/* Skeleton Header */}
          <div className={styles.projects__header}>
            <div className={styles['skeleton__title']} />
            <div className={styles['skeleton__button']} style={{ width: '140px' }} />
          </div>

          {/* Skeleton Grid */}
          <div className={styles.projects__grid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles['skeleton__card']}>
                <div className={styles['skeleton__card-image']} />
                <div className={styles['skeleton__card-content']}>
                  <div className={styles['skeleton__text']} style={{ width: '60%', height: '20px' }} />
                  <div className={styles['skeleton__text']} style={{ width: '80%' }} />
                  <div className={styles['skeleton__text']} style={{ width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.projects}>
      <div className={styles.projects__container}>
        {/* User Profile Header */}
        <div className={styles.projects__user}>
          <div className={styles['projects__user-info']}>
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'User'} 
                className={styles['projects__user-avatar']}
              />
            ) : (
              <span className={`material-symbols-outlined ${styles['projects__user-avatar--default']}`}>
                account_circle
              </span>
            )}
            <div className={styles['projects__user-details']}>
              <span className={styles['projects__user-name']}>{user?.displayName || 'User'}</span>
              <span className={styles['projects__user-email']}>{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className={styles['projects__user-signout']}
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>

        <div className={styles.projects__header}>
          <h1 className={styles['projects__header-title']}>Projects</h1>
          <div className={styles['projects__header-actions']}>
            <Link 
              to="/projects/new"
              className={styles['projects__header-btn']}
            >
              <span className="material-symbols-outlined">add</span>
              New Project
            </Link>
          </div>
        </div>

        <div className={styles.projects__grid}>
          {projects.length === 0 ? (
            <div className={styles.projects__empty}>
              <span className="material-symbols-outlined">folder_open</span>
              <p>No projects yet. Create your first trek project!</p>
              <div className={styles['projects__empty-actions']}>
                <Link 
                  to="/projects/new"
                  className={styles.projects__cta}
                >
                  Create Project
                </Link>
                <button 
                  onClick={handleCreateSample}
                  className={styles['projects__cta--secondary']}
                >
                  <span className="material-symbols-outlined">content_copy</span>
                  Create Sample Project
                </button>
              </div>
            </div>
          ) : (
            projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={deleteProject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
