import React, { useEffect, useRef, useState } from "react";
import styles from "./Experience.module.css";

/**
 * NOTE: Dates based on the ranges you gave earlier.
 * Tweak any bullets/wording you want—this is your single source of truth.
 */
const ROLES = [
    {
        title: "Software Engineer",
        company: "Internal Revenue Service (IRS) — via Cherokee Federal",
        location: "Remote / Orlando, FL",
        dates: "Oct 2022 – Oct 2025",
        bullets: [
            "Built new IRS site features in React, HTML, CSS, and TypeScript, ensuring responsive UX on desktop and mobile.",
            "Created reusable React components in Storybook aligned to IRS design standards.",
            "Led code reviews and Scrum ceremonies; removed blockers and coordinated with leadership to hit sprint goals.",
        ],
    },
    {
        title: "Senior Front-End Developer",
        company: "Deloitte",
        location: "Remote",
        dates: "Jan 2024 – Jul 2024",
        bullets: [
            "Shipped user-facing features using React + TypeScript with strong accessibility and testing coverage.",
            "Implemented unit tests (Jest, React Testing Library) to ensure stable, maintainable delivery.",
            "Contributed to shared component library and design consistency.",
        ],
    },
    {
        title: "Software Engineer Senior Consultant",
        company: "Booz Allen Hamilton",
        location: "Remote",
        dates: "Oct 2022 – Jan 2024",
        bullets: [
            "Managed a portfolio of 4 front-end projects; improved delivery speed and team KPIs.",
            "Drove process improvements with React, TypeScript, Tailwind, and AWS.",
            "Prototyped CI/CD pipelines with Jenkins, Ansible, and Docker for new client work.",
        ],
    },
    {
        title: "Software Engineering Senior Analyst",
        company: "Accenture Federal Services",
        location: "Remote",
        dates: "Oct 2021 – Oct 2022",
        bullets: [
            "Led consulting portfolio across 3 major military clients with 98% YoY satisfaction.",
            "Delivered automation on RHEL/Windows with scripting and VM-based QA.",
            "Tested cloud + on-prem requirements for seamless deployment.",
        ],
    },
    {
        title: "Junior DevOps Engineer (Contract)",
        company: "Chubb North America",
        location: "Remote",
        dates: "Apr 2021 – Oct 2021",
        bullets: [
            "Migrated apps to Jenkins pipelines and modernized legacy scripts.",
            "Improved configuration, source control, and CI reliability (Git/GitHub).",
        ],
    },
    {
        title: "Junior Software Engineer (Contract)",
        company: "Verizon",
        location: "Remote",
        dates: "Jan 2021 – Apr 2021",
        bullets: [
            "Established front-end structure with HTML, CSS/Sass, React; ensured Android/desktop compatibility.",
            "Resolved accessibility issues, improving UX and reducing risk.",
        ],
    },
];

export default function Experience() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <section id="experience" ref={ref} className={`${styles.section} ${visible ? styles.inView : ""}`} aria-labelledby="exp-title">
            <div className={styles.inner}>
                <h2 id="exp-title" className={`${styles.title}`}>Professional Experience</h2>

                <ol className={styles.timeline}>
                    {ROLES.map((r, idx) => (
                        <li key={r.title + idx} className={styles.item}>
                            {/* timeline node */}
                            <span className={styles.node} aria-hidden="true">
                                <span className={styles.nodeInner} />
                            </span>

                            {/* card */}
                            <article className={styles.card}>
                                <header className={styles.header}>
                                    <div className={styles.hgroup}>
                                        <h3 className={styles.role}>{r.title}</h3>
                                        <p className={styles.meta}>
                                            <span className={styles.company}>{r.company}</span>
                                            {r.location ? <> · <span>{r.location}</span></> : null}
                                        </p>
                                    </div>
                                    <span className={styles.dates} aria-label="Dates">{r.dates}</span>
                                </header>

                                <ul className={styles.bullets}>
                                    {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </article>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
