import React from "react";
import PreviewHeader from "./PreviewHeader";
import PreviewHero from "./PreviewHero";
import PreviewLeader from "./PreviewLeader";
import PreviewItinerary from "./PreviewItinerary";
import PreviewInclusions from "./PreviewInclusions";
import PreviewCarry from "./PreviewCarry";
import PreviewFAQs from "./PreviewFAQs";
import PreviewFooter from "./PreviewFooter";
import styles from "../styles.module.scss";
import type { Project } from "../../../types/project";

interface PreviewLongProps {
    project: Project;
}

const PreviewLong = ({ project }: PreviewLongProps) => {
    return (
        <>
            <PreviewHeader header={project.header} brand={project.brand} />
            <PreviewHero hero={project.hero} />

            {project.overview?.text && (
                <section className={styles["section"]}>
                    <h3 className={styles["section__title"]}>Overview</h3>
                    <p className={styles["section__text"]}>{project.overview.text}</p>
                </section>
            )}

            {project.leader?.visible && (
                <PreviewLeader leader={project.leader} />
            )}
            <PreviewItinerary itinerary={project.itinerary} />
            <PreviewInclusions inclusions={project.inclusions} />
            <PreviewCarry thingsToCarry={project.thingsToCarry} />
            <PreviewFAQs faqs={project.faqs} />
            <PreviewFooter footer={project.footer} />
        </>
    );
};

export default PreviewLong;
