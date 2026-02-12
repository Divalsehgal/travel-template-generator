import React from 'react';
import type { LeaderData } from '../../../../types/project';
import styles from "./styles.module.scss";

interface PreviewLeaderProps {
    leader: LeaderData;
}

const PreviewLeader = ({ leader }: PreviewLeaderProps): React.JSX.Element | null => {
    if (!leader?.name) return null;

    return (
        <section className={styles["leader"]}>
            <h3 className={styles["section__title"]}>Your Trek Leader</h3>
            <div className={styles["leader__content"]}>
                {leader.image && (
                    <img src={leader.image} alt={leader.name} className={styles["leader__image"]} />
                )}
                <div className={styles["leader__info"]}>
                    <h4 className={styles["leader__name"]}>{leader.name}</h4>
                    <p className={styles["leader__role"]}>{leader.role}</p>
                </div>
            </div>
        </section>
    );
};

export default PreviewLeader;
