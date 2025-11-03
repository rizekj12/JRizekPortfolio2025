import React from "react";

export default function FloatingScrollButton() {
    const scrollToNextSection = () => {
        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        const sections = Array.from(document.querySelectorAll("section[id]"));
        if (!sections.length) return;

        const viewportTop = window.scrollY;
        const probeY = viewportTop + window.innerHeight * 0.5;

        let target = sections.find((sec) => {
            const r = sec.getBoundingClientRect();
            const y = r.top + window.scrollY;
            return y > probeY;
        });

        if (!target) {
            window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
            return;
        }

        target.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <div className="floating-scroll visible" role="presentation" aria-hidden="false">
            <button
                className="floating-scroll__btn"
                onClick={scrollToNextSection}
                aria-label="Scroll to next section"
            >
                <svg
                    className="floating-scroll__arrow"
                    xmlns="http://www.w3.org/2000/svg"
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
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
        </div>
    );
}
