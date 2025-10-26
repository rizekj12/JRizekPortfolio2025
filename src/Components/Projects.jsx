import React from "react";

export default function Projects() {
    return (
        <section className="projects" aria-label="Projects">
            <div className="section-header">
                <h2>Projects</h2>
                <div className="filters" role="tablist" aria-label="project filters">
                    <button className="pill active" role="tab">All</button>
                    <button className="pill" role="tab">Front End</button>
                    <button className="pill" role="tab">DeDove</button>
                </div>
            </div>

            <div className="project-grid">
                <div className="project-card" />
                <div className="project-card" />
                <div className="project-card" />
            </div>
        </section>
    );
}