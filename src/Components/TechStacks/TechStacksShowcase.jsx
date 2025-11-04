import React, { useEffect, useRef, useState } from "react";
import styles from "./TechStacksShowcase.module.css";

const groups = [
    {
        key: "front-end", title: "FRONT END", items: [
            { name: "React", icon: "devicon-react-original" },
            { name: "TypeScript", icon: "devicon-typescript-plain" },
            { name: "JavaScript", icon: "devicon-javascript-plain" },
            { name: "HTML5", icon: "devicon-html5-plain" },
            { name: "CSS3", icon: "devicon-css3-plain" },
            { name: "Sass", icon: "devicon-sass-original" },
            { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain" },
            { name: "Storybook", icon: "devicon-storybook-plain" },
            { name: "Jest", icon: "devicon-jest-plain" },
        ]
    },
    {
        key: "back-end", title: "BACK END", items: [
            { name: "Node.js", icon: "devicon-nodejs-plain" },
            { name: "Python", icon: "devicon-python-plain" },
            { name: "Express", icon: "devicon-express-original" },
            { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
            { name: "MySQL", icon: "devicon-mysql-plain" },
            { name: "Bash", icon: "devicon-bash-plain" },
            { name: "PowerShell", icon: "devicon-powershell-plain" },
        ]
    },
    {
        key: "devops", title: "DEVOPS", items: [
            { name: "Jenkins", icon: "devicon-jenkins-plain" },
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "Ansible", icon: "devicon-ansible-plain" },
            { name: "Git", icon: "devicon-git-plain" },
            { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark" },
            { name: "Azure", icon: "devicon-azure-plain" },
            { name: "Linux (RHEL)", icon: "devicon-redhat-plain" },
            { name: "Groovy", icon: "devicon-groovy-plain" },
        ]
    },
    {
        key: "tools", title: "TOOLS", items: [
            { name: "Git", icon: "devicon-git-plain" },
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "VS Code", icon: "devicon-vscode-plain" },
            { name: "Postman", icon: "devicon-postman-plain" },
            { name: "Jira", icon: "devicon-jira-plain" },
            { name: "Figma", icon: "devicon-figma-plain" },
            { name: "Storybook", icon: "devicon-storybook-plain" },
        ]
    },
];

export default function TechStacksShowcase() {
    const [filter, setFilter] = useState("all");
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: .25 });
        if (ref.current) io.observe(ref.current);
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
        <section id="tech" ref={ref} className={`${styles.stack} ${visible ? styles.inView : ""}`} aria-labelledby="stack-title">
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 id="stack-title" className={`${styles.title} gradient-text`}>Tech stacks</h2>
                    <div className={styles.pills} role="tablist" aria-label="Filter tech stacks">
                        {pills.map(p => (
                            <button key={p.key} role="tab" aria-selected={filter === p.key}
                                className={`${styles.pill} ${filter === p.key ? styles.active : ""}`}
                                onClick={() => setFilter(p.key)}>{p.label}</button>
                        ))}
                    </div>
                </div>

                {groups.filter(g => filter === "all" || g.key === filter).map(g => (
                    <div key={g.title} className={styles.row}>
                        <h3 className={`${styles.cat} gradient-text`}>{g.title}</h3>
                        <ul className={styles.items}>
                            {g.items.map((it, i) => (
                                <li key={it.name} className={styles.chip} style={{ animationDelay: `${0.06 * i + 0.08}s` }}>
                                    <i className={`${styles.icon} ${it.icon}`} aria-hidden="true" />
                                    <span className={styles.label}>{it.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
