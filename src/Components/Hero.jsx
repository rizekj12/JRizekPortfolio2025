import React from "react";

export default function Hero() {
    return (
        <header className="hero" role="banner" aria-label="Hero">
            <div className="hero-bg" aria-hidden />
            <div className="hero-content">
                <h1 className="hero-name">Joshua Rizek</h1>
                <p className="hero-intro">
                    I build seamless digital experiences — from beautiful, responsive front-end designs to automated CI/CD workflows — combining creativity, precision, and expert technical consulting.
                </p>
            </div>
            <div className="divider" aria-hidden>
                <img
                    className="portrait"
                    src="/imgs/photoJosh.JPG"
                    alt="Portrait"
                    onError={(e) => console.log("Image failed to load:", e)}
                />
                <div className="hero-roles">
                    <p>Front‑End Developer</p>
                    <p>DevOps Engineer</p>
                    <p>Consultant</p>
                </div>
            </div>
        </header>
    );
}