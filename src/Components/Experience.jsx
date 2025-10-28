import React from "react";

const roles = [
    {
        title: "Front-End Developer",
        org: "IRS (Contract)",
        time: "2023 – 2025",
        bullets: [
            "Built new features with React and TypeScript; focused on mobile UX and performance.",
            "Created reusable components and improved consistency across pages."
        ]
    },
    {
        title: "DevOps-oriented Engineer",
        org: "Consulting Clients",
        time: "2021 – 2023",
        bullets: [
            "Improved CI pipelines: caching, lint/test gates, and artifact storage.",
            "Automated quality checks to reduce regressions and speed up releases."
        ]
    }
];

export default function Experience() {
    return (
        <section id="experience" className="experience" aria-label="Experience">
            <h2>Experience</h2>
            <ol className="timeline">
                {roles.map((r, idx) => (
                    <li key={idx} className="timeline-item">
                        <div className="t-meta">
                            <h3>{r.title}</h3>
                            <p className="muted">{r.org} · {r.time}</p>
                        </div>
                        <ul className="t-bullets">
                            {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </li>
                ))}
            </ol>
        </section>
    );
}
