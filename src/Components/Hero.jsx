import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
    const heroRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 } // visible when ~35% of hero is on screen
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <header
            ref={heroRef}
            className={`hero ${inView ? "in-view" : ""}`}
            role="banner"
            aria-label="Hero"
        >
            <div className="hero-bg" aria-hidden />

            {/* LEFT: name + roles (fade items) */}
            <div className="hero-content">
                <h1 className="hero-name fade-item">Joshua Rizek</h1>
                <div className="hero-roles fade-item">
                    <p>Front-End Developer</p>
                    <p>DevOps Engineer</p>
                    <p>Consultant</p>
                </div>
            </div>

            {/* RIGHT: divider slides in; inner elements fade */}
            <div className="divider slide-right" aria-hidden="true">
                <img
                    className="portrait fade-item"
                    src="/imgs/photoJosh.jpg"
                    alt="Portrait"
                    onError={(e) => console.log("Image failed to load:", e)}
                />
                <p className="hero-intro fade-item">
                    I build seamless digital experiences — from beautiful, responsive
                    front-end designs to automated CI/CD workflows — combining creativity,
                    precision, and expert technical consulting.
                </p>

                <div className="hero-icons fade-item">
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/joshua-rizek"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-icon linkedin"
                        aria-label="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.356c0-1.276-.026-2.919-1.78-2.919-1.784 0-2.056 1.393-2.056 2.83v5.445h-3v-10h2.881v1.367h.04c.402-.761 1.383-1.563 2.847-1.563 3.046 0 3.607 2.007 3.607 4.617v5.579z" /></svg>
                    </a>

                    {/* GitHub */}
                    <a href="#" className="hero-icon github" aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.396 7.864 10.922.575.106.786-.25.786-.554 0-.272-.01-1.18-.015-2.139-3.2.697-3.876-1.54-3.876-1.54-.523-1.327-1.277-1.68-1.277-1.68-1.045-.714.079-.7.079-.7 1.157.081 1.766 1.187 1.766 1.187 1.028 1.762 2.695 1.254 3.353.959.104-.745.403-1.254.733-1.542-2.553-.292-5.238-1.277-5.238-5.683 0-1.256.448-2.283 1.184-3.09-.118-.292-.512-1.468.112-3.062 0 0 .964-.309 3.164 1.181a11.017 11.017 0 0 1 2.88-.388c.976.005 1.958.132 2.879.388 2.199-1.49 3.162-1.181 3.162-1.181.626 1.594.232 2.77.115 3.062.738.807 1.184 1.834 1.184 3.09 0 4.419-2.69 5.387-5.253 5.673.415.358.785 1.068.785 2.154 0 1.557-.014 2.813-.014 3.193 0 .307.207.666.792.553C20.713 21.39 24 17.082 24 12 24 5.648 18.852.5 12 .5z" /></svg>
                    </a>

                    {/* Email */}
                    <a href="#" className="hero-icon email" aria-label="Email">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 13.065 0 6V18h24V6L12 13.065zM12 11.394 24 4H0l12 7.394z" /></svg>
                    </a>

                    {/* Resume */}
                    <a href="#" className="hero-icon resume" aria-label="Resume">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 9V3.5L18.5 9H13z" /></svg>
                    </a>
                </div>
            </div>
        </header>
    );
}
