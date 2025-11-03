import React, { useEffect, useRef, useState } from "react";

export default function AboutMe() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Fade-in when in view (you already added this, keep it)
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setIsVisible(true),
            { threshold: 0.3 }
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    // Smooth parallax shift
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const vh = window.innerHeight || 1;

                // progress: 0 (top just enters) -> 1 (bottom leaves)
                const progress = 1 - Math.min(Math.max((rect.bottom) / (rect.height + vh), 0), 1);

                // Shift amount: tweak 80–140 for stronger/weaker effect
                const shift = -(progress * 120);
                el.style.setProperty("--bgShift", `${shift}px`);
                ticking = false;
            });
        };

        // Run once and on scroll
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section
            id="about"
            className={`about ${isVisible ? "visible" : ""}`}
            ref={ref}
            aria-label="About Joshua Rizek"
        >
            <div className="about-bg" aria-hidden="true" />
            <div className="about-inner">
                <article className="about-card">
                    <h2>About Me</h2>
                    <p>
                        Hey, I’m Josh! I’m an artist and problem solver who turned curiosity into a career in
                        technology. My background in art, philosophy, and over five years in software engineering
                        has shaped me into a developer who values creativity as much as precision.
                    </p>
                    <p>
                        I specialize in crafting beautiful front-end experiences, but I’ve also worn many hats—
                        DevOps engineer, consultant, and even scrum master. I’m passionate about continuous growth,
                        building meaningful products, and stepping into leadership roles where I can inspire teams
                        to do their best work.
                    </p>
                    <p>
                        When I’m not coding, you’ll find me dancing salsa and bachata, practicing MMA, capturing
                        photos, or painting something new. I’ve explored nine countries so far—and I’m nowhere near
                        done.
                    </p>
                    <p>Thanks for stopping by—keep scrolling to see what I’ve been working on!</p>
                </article>
            </div>
        </section>
    );
}
