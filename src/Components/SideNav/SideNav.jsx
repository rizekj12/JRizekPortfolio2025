import React, { useEffect, useState, useRef } from "react";
import styles from "./SideNav.module.css";

const SECTIONS = [
    { id: "hero", label: "Intro" },
    { id: "about", label: "About Me" },
    { id: "tech", label: "Tech Stack" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact Me" },
];

export default function SideNav() {
    const [active, setActive] = useState(SECTIONS[0].id);
    const clickingRef = useRef(false);
    const unlockTimer = useRef(null);

    useEffect(() => {
        const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                if (clickingRef.current) return;
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]?.target?.id) setActive(visible[0].target.id);
            },
            {
                root: null,
                // Favor the center of the screen; activate early
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                rootMargin: "-25% 0px -50% 0px",
            }
        );

        els.forEach(el => io.observe(el));

        const onScroll = () => {
            if (clickingRef.current) return;
            if (window.scrollY < 140) setActive("hero");
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            if (unlockTimer.current) clearTimeout(unlockTimer.current);
        };
    }, []);

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        setActive(id);                     // instant visual feedback
        clickingRef.current = true;        // don’t let IO override during scroll
        if (unlockTimer.current) clearTimeout(unlockTimer.current);

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });

        unlockTimer.current = setTimeout(() => {
            clickingRef.current = false;
        }, 900);
    };

    return (
        <nav className={styles.sideNav} aria-label="Section navigation">
            <div className={styles.surface}>
                <div className={styles.rail} aria-hidden="true" />
                <ul className={styles.list}>
                    {SECTIONS.map(({ id, label }) => {
                        const isActive = active === id;
                        return (
                            <li key={id} className={styles.item}>
                                <button
                                    className={`${styles.dotBtn} ${isActive ? styles.active : ""}`}
                                    aria-current={isActive ? "true" : "false"}
                                    aria-label={`Go to ${label}`}
                                    onClick={() => handleClick(id)}
                                >
                                    <span className={styles.dot} />
                                </button>
                                <button
                                    className={`${styles.labelBtn} ${isActive ? styles.activeLabel : ""}`}
                                    onClick={() => handleClick(id)}
                                >
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
