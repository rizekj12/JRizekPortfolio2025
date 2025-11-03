import React from "react";

export default function SectionDivider({ toId, label = "Next section" }) {
    const handleClick = () => {
        const el = document.getElementById(toId);
        if (!el) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <div className="section-divider" role="separator" aria-label={`Divider to ${label}`}>
            <button
                className="section-divider__btn"
                onClick={handleClick}
                aria-label={label}
            >
                {/* ↓ Downward arrow icon */}
                <svg
                    className="section-divider__arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
        </div>
    );
}
