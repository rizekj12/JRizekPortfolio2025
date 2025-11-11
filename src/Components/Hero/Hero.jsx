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
        <header id="hero" ref={heroRef} className={`${styles.hero} ${inView ? styles.inView : ""}`} aria-label="Hero">
            <div className={styles.heroBg} aria-hidden />
            <img
                className={`${styles.portraitMobile} ${styles.fadeItem}`}
                src="/imgs/photoJosh.jpg"
                alt="Portrait of Joshua Rizek"
            />
            <div className={styles.heroContent}>
                <h1 className={`${styles.heroName} ${styles.fadeItem}`}>Joshua Rizek</h1>
                <div className={`${styles.heroRoles} ${styles.fadeItem}`}>
                    <p>Front-End Developer</p><p>DevOps Engineer</p><p>Consultant</p>
                </div>
            </div>

            <div className={`${styles.divider} ${styles.slideRight}`} aria-hidden="true">

                {/* Gradient definition used for icon hovers */}
                <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--grad-start, #6a11cb)" />
                            <stop offset="50%" stopColor="var(--grad-mid,   #7f5af0)" />
                            <stop offset="100%" stopColor="var(--grad-end,   #00bcd4)" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className={styles.topStats}>
                    <div className={styles.stat}>
                        <span className={`gradient-text ${styles.statPrimary}`}>5+ Years</span>
                        <span className={styles.statLabel}>Experience</span>
                    </div>

                    <span className={styles.sep} />

                    <div className={styles.stat}>
                        <span className={`gradient-text ${styles.statPrimary}`}>Certified</span>
                        <span className={styles.statLabel}>Scrum Master</span>
                    </div>

                    <span className={styles.sep} />

                    <div className={styles.stat}>
                        <span className={`gradient-text ${styles.statPrimary}`}>Secret</span>
                        <span className={styles.statLabel}>Clearance</span>
                    </div>
                </div>
                <img className={`${styles.portrait} ${styles.fadeItem}`} src="/imgs/photoJosh.jpg" alt="Portrait of Joshua Rizek" />
                <p className={`${styles.heroIntro} ${styles.fadeItem} gradient-text`}>
                    I build seamless digital experiences — from beautiful, responsive front-end designs to automated CI/CD workflows — combining creativity, precision, and expert technical consulting.
                </p>
                <div className={`${styles.heroIcons} ${styles.fadeItem}`}>
                    <div className={styles.socials}>
                        {/* --- LinkedIn --- */}
                        <a
                            href="https://www.linkedin.com/in/joshua-rizek-1a6a28199/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className={styles.socialBtn}
                        >
                            <svg viewBox="0 0 24 24" className={styles.socialSvg} aria-hidden="true">
                                <defs>
                                    <linearGradient id="gradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--grad-start, #6a11cb)" />
                                        <stop offset="50%" stopColor="var(--grad-mid, #7f5af0)" />
                                        <stop offset="100%" stopColor="var(--grad-end, #00bcd4)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    className={styles.iconPath}
                                    d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3.5 9h3v12h-3V9zm7 0h2.9v1.7h.04c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.6V21h-3v-6.1c0-1.5 0-3.3-2-3.3-2 0-2.3 1.6-2.3 3.2V21h-3V9z"
                                />
                            </svg>
                        </a>

                        {/* --- GitHub --- */}
                        <a
                            href="https://github.com/rizekj12"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className={styles.socialBtn}
                        >
                            <svg viewBox="0 0 24 24" className={styles.socialSvg} aria-hidden="true">
                                <defs>
                                    <linearGradient id="gradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--grad-start, #6a11cb)" />
                                        <stop offset="50%" stopColor="var(--grad-mid, #7f5af0)" />
                                        <stop offset="100%" stopColor="var(--grad-end, #00bcd4)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    className={styles.iconPath}
                                    d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2c-3.4.8-4.1-1.6-4.1-1.6-.6-1.5-1.5-1.9-1.5-1.9-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.5 2.1 1.5 1.2 2.1 3.2 1.5 4 .9.1-.9.5-1.5.9-1.8-2.7-.3-5.5-1.4-5.5-6.3 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.3 3.6 1.3a12.4 12.4 0 016.6 0c2.5-1.6 3.6-1.3 3.6-1.3.7 1.8.2 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 4.9-2.9 6-5.6 6.3.5.4 1 1.3 1 2.7v4c0 .4.2.7.8.6A12 12 0 0012 .5z"
                                />
                            </svg>
                        </a>

                        {/* --- Resume --- */}
                        <a
                            href="/resume/Joshua_Rizek_Resume.pdf"
                            download="Joshua_Rizek_Resume.pdf"
                            aria-label="Download Resume"
                            className={styles.socialBtn}
                        >
                            <svg viewBox="0 0 24 24" className={styles.socialSvg} aria-hidden="true">
                                <defs>
                                    <linearGradient id="gradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--grad-start, #6a11cb)" />
                                        <stop offset="50%" stopColor="var(--grad-mid, #7f5af0)" />
                                        <stop offset="100%" stopColor="var(--grad-end, #00bcd4)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    className={styles.iconPath}
                                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm1 7h5l-5-5v5zM8 13h8v2H8v-2zm0 4h8v2H8v-2zM8 9h4v2H8V9z"
                                />
                            </svg>
                        </a>


                    </div>

                </div>

                {/* --- Contact info row under socials --- */}
                <div className={styles.contactRow}>
                    <a href="tel:+12038508658" className={styles.contactItem}>
                        <svg
                            className={styles.contactIcon}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M6.6 10.8a15.6 15.6 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24 11.4 11.4 0 003.6.58 1 1 0 011 1v3.6a1 1 0 01-1 1A17.6 17.6 0 012 6a1 1 0 011-1h3.6a1 1 0 011 1 11.4 11.4 0 00.58 3.6 1 1 0 01-.24 1.1L6.6 10.8z" />
                        </svg>
                        <span>+1 (203) 850-8658</span>
                    </a>

                    <a href="mailto:joshuarizek@gmail.com" className={styles.contactItem}>
                        <svg
                            className={styles.contactIcon}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <span>joshuarizek@gmail.com</span>
                    </a>
                </div>

                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="heroIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--grad-start, #6a11cb)" />
                            <stop offset="50%" stopColor="var(--grad-mid,   #7f5af0)" />
                            <stop offset="100%" stopColor="var(--grad-end,   #00bcd4)" />
                        </linearGradient>
                    </defs>
                </svg>


            </div>
        </header>
    );
}
