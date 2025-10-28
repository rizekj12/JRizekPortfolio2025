import React from "react";

export default function Contact() {
    return (
        <section id="contact" className="contact" aria-label="Contact">
            <h2>Contact</h2>
            <p className="muted">Open to DevOps and Front-End roles, contract or full-time.</p>
            <div className="contact-row">
                <a className="btn" href="mailto:joshuarizek@gmail.com">Email me</a>
                <a className="btn ghost" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="btn ghost" href="#" target="_blank" rel="noreferrer">GitHub</a>
            </div>
        </section>
    );
}
