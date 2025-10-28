import React, { useMemo, useState } from "react";
import { PROJECTS } from "../data/projects";

const FILTERS = ["All", "Front End", "DevOps"];

export default function Projects() {
    const [active, setActive] = useState("All");

    const visible = useMemo(() => {
        if (active === "All") return PROJECTS;
        return PROJECTS.filter(p => p.tags.includes(active));
    }, [active]);

    return (
        <section id="projects" className="projects" aria-label="Projects">
            <div className="section-header">
                <h2>Projects</h2>
                <div className="filters" role="tablist" aria-label="project filters">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`pill ${active === f ? "active" : ""}`}
                            role="tab"
                            aria-selected={active === f}
                            onClick={() => setActive(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="project-grid">
                {visible.map(p => (
                    <article key={p.id} className="project-card" aria-labelledby={`${p.id}-title`}>
                        <div className="project-card-body">
                            <h3 id={`${p.id}-title`}>{p.title}</h3>
                            <p className="project-desc">{p.description}</p>
                            <ul className="tech-list">
                                {p.tech.map(t => (
                                    <li key={t} className="tech-chip">{t}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="project-card-footer">
                            {p.live && (
                                <a className="btn link" href={p.live} target="_blank" rel="noreferrer">
                                    Live
                                </a>
                            )}
                            {p.repo && (
                                <a className="btn ghost" href={p.repo} target="_blank" rel="noreferrer">
                                    Code
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
