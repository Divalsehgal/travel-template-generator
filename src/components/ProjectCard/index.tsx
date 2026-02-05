import { Link } from 'react-router-dom';
import type { ProjectCardProps } from '../../types/components';
import styles from './styles.module.scss';

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  // Use hero title or brand title as the display name
  const displayTitle = project.hero?.title || project.brand?.title || 'Untitled Project';
  const displayDescription = project.overview?.text || project.hero?.badge || 'No description available';
  const displayImage = project.hero?.image || null;

  return (
    <div className={styles.card}>
      {displayImage && (
        <div className={styles.card__image}>
          <img src={displayImage} alt={displayTitle} />
          {project.hero?.badge && (
            <span className={styles.card__badge}>{project.hero.badge}</span>
          )}
        </div>
      )}
      
      <div className={styles.card__content}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{displayTitle}</h3>
          <div className={styles.card__actions}>
            <Link
              to={`/projects/${project.id}/edit`}
              className={styles.card__btn}
              title="Edit"
            >
              <span className="material-symbols-outlined">edit</span>
            </Link>
            <button
              className={styles['card__btn--danger']}
              onClick={handleDelete}
              title="Delete"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>

        <p className={styles.card__description}>{displayDescription}</p>

        {project.hero?.stats && (
          <div className={styles.card__meta}>
            {project.hero.stats.duration && (
              <span className={styles.card__tag}>
                <span className="material-symbols-outlined">schedule</span>
                {project.hero.stats.duration}
              </span>
            )}
            {project.hero.stats.altitude && (
              <span className={styles.card__tag}>
                <span className="material-symbols-outlined">terrain</span>
                {project.hero.stats.altitude}
              </span>
            )}
            {project.hero.stats.difficulty && (
              <span className={styles.card__tag}>
                <span className="material-symbols-outlined">speed</span>
                {project.hero.stats.difficulty}
              </span>
            )}
          </div>
        )}

        <div className={styles.card__footer}>
          <Link
            to={`/projects/${project.id}/edit`}
            className={styles.card__link}
          >
            <span className="material-symbols-outlined">edit_note</span>
            Edit Details
          </Link>
          <Link
            to={`/projects/${project.id}/preview`}
            className={styles['card__link--primary']}
          >
            <span className="material-symbols-outlined">visibility</span>
            Preview & Export
          </Link>
        </div>
      </div>
    </div>
  );
}
