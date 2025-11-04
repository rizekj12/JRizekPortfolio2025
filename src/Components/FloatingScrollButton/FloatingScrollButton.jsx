import React from "react";
import styles from "./FloatingScrollButton.module.css";

export default function FloatingScrollButton() {
    const goNext = () => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const sections = [...document.querySelectorAll("section[id]")];
        const mid = window.scrollY + window.innerHeight * 0.5;
        const target = sections.find(sec => (sec.getBoundingClientRect().top + window.scrollY) > mid);
        if (target) target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        else window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    };
    return (
        <div className={`${styles.floating} ${styles.visible}`} role="presentation">
            <button className={styles.btn} onClick={goNext} aria-label="Scroll to next section">
                <svg className={styles.arrow} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
        </div>
    );
}
