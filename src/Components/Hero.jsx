import React from "react";

export default function Hero() {
    return (
        <header className="hero" role="banner" aria-label="Hero">
            <div className="hero-bg" aria-hidden />
            <div className="divider" aria-hidden>
                <img
                    className="portrait"
                    src="/imgs/photoJosh.JPG"
                    alt="Portrait"
                    onError={(e) => console.log("Image failed to load:", e)}
                />
            </div>
            <div className="hero-grid">
                <h1 className="hero-name">Joshua Rizek</h1>
                <div className="hero-roles">
                    <p>Front‑End Developer</p>
                    <p>DevOps Engineer</p>
                    <p>Consultant</p>
                </div>
            </div>
        </header>
    );
}