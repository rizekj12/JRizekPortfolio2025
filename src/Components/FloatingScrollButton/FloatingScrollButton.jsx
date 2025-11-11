import React, { useEffect, useState } from "react";
import styles from "./FloatingScrollButton.module.css";

function getSections() {
    // Be generous in what we treat as a "section"
    const nodes = [
        ...document.querySelectorAll(
            // prioritize real sections with ids
            "section[id]"
        ),
    ];

    // If your page wraps sections differently, fallback to common patterns:
    if (nodes.length === 0) {
        return [
            ...document.querySelectorAll("[data-section], main > section, main > div[id]"),
        ].filter(Boolean);
    }
    return nodes;
}

export default function FloatingScrollButton() {
    const [darkArrow, setDarkArrow] = useState(false);
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const sections = getSections();

            // Safe scrolling element (works across browsers)
            const el =
                document.scrollingElement ||
                document.documentElement ||
                document.body;

            const scrollTop = el.scrollTop;
            const viewH = window.innerHeight;
            const scrollH = el.scrollHeight;

            const mid = scrollTop + viewH * 0.5;

            // Find section whose vertical range contains the viewport center
            const current = sections.find((sec) => {
                const top = sec.offsetTop;
                const bottom = top + sec.offsetHeight;
                return mid >= top && mid < bottom;
            });

            // Light/white detection (for arrow color)
            const isLight =
                current?.dataset?.theme === "light" ||
                current?.classList?.contains("whiteSection") ||
                current?.classList?.contains("lightSection");

            setDarkArrow(Boolean(isLight));

            // Determine "last section"
            const lastSection = sections[sections.length - 1];

            // Two ways to consider we're "at bottom":
            // 1) Near the real bottom of the document
            const nearDocBottom = scrollTop + viewH >= scrollH - 4; // small epsilon
            // 2) Center is inside the last section, or last marked one
            const inLastSection =
                current &&
                lastSection &&
                (current === lastSection ||
                    current.id === "contact" ||
                    current.dataset?.last === "true");

            setAtBottom(nearDocBottom || inLastSection);
        };

        // Run on load + scroll/resize
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const handleClick = () => {
        const prefersReduced =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (atBottom) {
            // At bottom/last section → go back to top
            const el =
                document.scrollingElement ||
                document.documentElement ||
                document.body;
            el.scrollTo({
                top: 0,
                behavior: prefersReduced ? "auto" : "smooth",
            });
            return;
        }

        // Otherwise scroll to next section beyond viewport center
        const sections = getSections();
        const el =
            document.scrollingElement || document.documentElement || document.body;
        const mid = el.scrollTop + window.innerHeight * 0.5;

        const next = sections.find(
            (sec) => sec.getBoundingClientRect().top + el.scrollTop > mid
        );

        if (next) {
            next.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        }
    };

    return (
        <div className={`${styles.floating} ${styles.visible}`} role="presentation">
            <button
                className={`${styles.btn} ${darkArrow ? styles.dark : ""}`}
                onClick={handleClick}
                aria-label={atBottom ? "Scroll to top" : "Scroll to next section"}
            >
                <svg
                    className={`${styles.arrow} ${atBottom ? styles.up : styles.down}`}
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    {/* Down chevron; we rotate it 180° for "up" */}
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
        </div>
    );
}
