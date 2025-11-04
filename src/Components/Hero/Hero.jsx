import React, { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
    const heroRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: .35 });
        if (heroRef.current) io.observe(heroRef.current);
        return () => io.disconnect();
    }, []);

    return (
        <header ref={heroRef} className={`${styles.hero} ${inView ? styles.inView : ""}`} aria-label="Hero">
            <div className={styles.heroBg} aria-hidden />
            <div className={styles.heroContent}>
                <h1 className={`${styles.heroName} ${styles.fadeItem}`}>Joshua Rizek</h1>
                <div className={`${styles.heroRoles} ${styles.fadeItem}`}>
                    <p>Front-End Developer</p><p>DevOps Engineer</p><p>Consultant</p>
                </div>
            </div>

            <div className={`${styles.divider} ${styles.slideRight}`} aria-hidden="true">
                <img className={`${styles.portrait} ${styles.fadeItem}`} src="/imgs/photoJosh.jpg" alt="Portrait of Joshua Rizek" />
                <p className={`${styles.heroIntro} ${styles.fadeItem} gradient-text`}>
                    I build seamless digital experiences — from beautiful, responsive front-end designs to automated CI/CD workflows — combining creativity, precision, and expert technical consulting.
                </p>
                <div className={`${styles.heroIcons} ${styles.fadeItem}`}>
                    <a className={styles.iconBtn} href="https://www.linkedin.com/in/joshua-rizek" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zM6.5 6.75A1.75 1.75 0 1 1 6.5 3.25 1.75 1.75 0 0 1 6.5 6.75zM20 19h-3v-5.36c0-1.28-.03-2.92-1.78-2.92-1.78 0-2.06 1.39-2.06 2.83V19h-3V9h2.88v1.37h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62V19z" /></svg>
                    </a>
                    <a className={styles.iconBtn} href="#" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.55 0-.27-.01-1.18-.02-2.14-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.16 1.18.92-.26 1.9-.39 2.88-.39s1.96.13 2.88.39c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.42.36.79 1.07.79 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.71 21.39 24 17.08 24 12 24 5.65 18.85.5 12 .5z" /></svg>
                    </a>
                    <a className={styles.iconBtn} href="#" aria-label="Email">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 13.065 0 6V18h24V6L12 13.065zM12 11.394 24 4H0l12 7.394z" /></svg>
                    </a>
                    <a className={styles.iconBtn} href="#" aria-label="Resume">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 9V3.5L18.5 9H13z" /></svg>
                    </a>
                </div>
            </div>
        </header>
    );
}
