import React from "react";

const groups = [
    { title: "Front-End", items: ["React", "TypeScript", "Vite", "Accessibility", "Responsive Design"] },
    { title: "DevOps", items: ["CI/CD", "Docker", "GitHub Actions", "Linux"] },
    { title: "Testing", items: ["Jest", "React Testing Library", "ESLint", "Prettier"] }
];

export default function Skills() {
    return (
        <section id="skills" className="skills" aria-label="Skills">
            <h2>Skills</h2>
            <div className="skill-grid">
                {groups.map(g => (
                    <div key={g.title} className="card">
                        <h3>{g.title}</h3>
                        <div className="chip-row">
                            {g.items.map(i => (
                                <span key={i} className="chip">{i}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
