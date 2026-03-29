import React from 'react';
import styles from './styles.module.scss';
import type { Project } from '../../types/project';
import PreviewLong from '../../pages/Preview/components/PreviewLong';
import PreviewShort from '../../pages/Preview/components/Short';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, project }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} role="dialog" aria-modal="true">
                <button className={styles.modal__close} onClick={onClose} aria-label="Close Preview">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className={styles.modal__content}>
                    {project.projectType === 'short' ? (
                        <PreviewShort project={project} />
                    ) : (
                        <PreviewLong project={project} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
