import React, { useEffect, useRef, useState } from "react";

const stacks = [
    {
        key: "front-end",
        title: "FRONT END",
        items: [
            { name: "React", icon: "devicon-react-original" },
            { name: "TypeScript", icon: "devicon-typescript-plain" },
            { name: "JavaScript", icon: "devicon-javascript-plain" },
            { name: "HTML5", icon: "devicon-html5-plain" },
            { name: "CSS3", icon: "devicon-css3-plain" },
            { name: "Sass", icon: "devicon-sass-original" },
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
            { name: "Storybook", icon: "devicon-storybook-plain" },
            { name: "Jest", icon: "devicon-jest-plain" },
        ],
    },
    {
        key: "back-end",
        title: "BACK END",
        items: [
            { name: "Node.js", icon: "devicon-nodejs-plain" },
            { name: "Python", icon: "devicon-python-plain" },
            { name: "Express", icon: "devicon-express-original" },
            { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
            { name: "MySQL", icon: "devicon-mysql-plain" },
            { name: "Bash", icon: "devicon-bash-plain" },
            { name: "PowerShell", icon: "devicon-powershell-plain" },
        ],
    },
    {
        key: "devops",
        title: "DEVOPS",
        items: [
            { name: "Jenkins", icon: "devicon-jenkins-plain" },
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "Ansible", icon: "devicon-ansible-plain" },
            { name: "Git", icon: "devicon-git-plain" },
            { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
            { name: "Azure", icon: "devicon-azure-plain" },
            { name: "Linux (RHEL)", icon: "devicon-redhat-plain" },
            { name: "Groovy", icon: "devicon-groovy-plain" },
        ],
    },
    {
        key: "tools",
        title: "TOOLS",
        items: [
            { name: "Git", icon: "devicon-git-plain" },
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "VS Code", icon: "devicon-vscode-plain" },
            { name: "Postman", icon: "devicon-postman-plain" },
            { name: "Jira", icon: "devicon-jira-plain" },
            { name: "Figma", icon: "devicon-figma-plain" },
            { name: "Storybook", icon: "devicon-storybook-plain" },
        ],
    },
];

export default function TechStacksShowcase() {
    const [filter, setFilter] = useState("all");
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    // Animate when section comes into view
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const pills = [
        { key: "all", label: "All" },
        { key: "front-end", label: "Front End" },
        { key: "back-end", label: "Back End" },
        { key: "devops", label: "DevOps" },
        { key: "tools", label: "Tools" },
    ];

    return (
        <section id="tech" ref={sectionRef} className={`stack ${visible ? "in-view" : ""}`} aria-labelledby="stack-title">
            <div className="stack-inner">
                <div className="stack-header">
                    <h2 id="stack-title" className="stack-title">Tech stacks</h2>

                    <div className="stack-pills" role="tablist" aria-label="Filter tech stacks">
                        {pills.map(p => (
                            <button
                                key={p.key}
                                role="tab"
                                aria-selected={filter === p.key}
                                className={`stack-pill ${filter === p.key ? "active" : ""}`}
                                onClick={() => setFilter(p.key)}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {stacks
                    .filter(group => filter === "all" || group.key === filter)
                    .map((group, idx) => (
                        <div key={group.title} className="stack-row">
                            <h3 className="stack-cat gradient-text">{group.title}</h3>

                            <ul className="stack-items">
                                {group.items.map((it, i) => (
                                    <li key={it.name} className="stack-chip" style={{ animationDelay: `${0.06 * i + 0.08}s` }}>
                                        <i className={`stack-icon ${it.icon}`} aria-hidden="true" />
                                        <span className="stack-label">{it.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </section>
    );
}
