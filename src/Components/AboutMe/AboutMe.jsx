import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutMe.module.css";

export default function AboutMe() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: .3 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <section id="about" ref={ref} className={`${styles.about} ${visible ? styles.visible : ""}`} aria-label="About Joshua Rizek">
            <div className={styles.bg} aria-hidden />
            <div className={styles.inner}>
                <article className={styles.card}>
                    <h2 className="gradient-text">About Me</h2>
                    <p>Hey, I’m Josh! I’m an artist and problem solver who turned curiosity into a career in technology. My background in art, philosophy, and over five years in software engineering has shaped me into a developer who values creativity as much as precision.</p>
                    <p>I specialize in crafting beautiful front-end experiences, but I’ve also worn many hats—DevOps engineer, consultant, and even scrum master. I’m passionate about continuous growth, building meaningful products, and stepping into leadership roles where I can inspire teams to do their best work.</p>
                    <p>When I’m not coding, you’ll find me dancing salsa and bachata, practicing MMA, capturing photos, or painting something new. I’ve explored nine countries so far—and I’m nowhere near done.</p>
                    <p>Thanks for stopping by—keep scrolling to see what I’ve been working on!</p>
                </article>
            </div>
        </section>
    );
}
