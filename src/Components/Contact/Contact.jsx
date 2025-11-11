import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
    const [status, setStatus] = useState({ state: "idle", message: "" });
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botField: "" });

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    async function onSubmit(e) {


        e.preventDefault();
        if (form.botField) return; // honeypot

        setStatus({ state: "loading", message: "Sending..." });
        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error(await res.text());
            setStatus({ state: "success", message: "Thanks! Your message has been sent." });
            setForm({ name: "", email: "", subject: "", message: "", botField: "" });
        } catch (err) {
            setStatus({ state: "error", message: "Something went wrong. Please try again or email me directly." });
        }


    }

    return (
        <section id="contact" data-last="true" data-theme="light" className={styles.section} aria-labelledby="contact-title">
            <div className={styles.inner}>
                <h2 id="contact-title" className={`${styles.title} gradient-text`}>Contact Me</h2>
                <p className={styles.subtitle}>
                    Have a project, role, or collaboration in mind? Send a message and I’ll get back to you.
                </p>

                <form className={styles.form} onSubmit={onSubmit} noValidate>
                    {/* Honeypot (hidden from humans) */}
                    <input type="text" name="botField" value={form.botField} onChange={onChange} className={styles.honeypot} tabIndex="-1" autoComplete="off" />

                    <div className={styles.grid}>
                        <label className={styles.field}>
                            <span>Name</span>
                            <input
                                type="text" name="name" value={form.name} onChange={onChange}
                                required placeholder="Your name" />
                        </label>

                        <label className={styles.field}>
                            <span>Email</span>
                            <input
                                type="email" name="email" value={form.email} onChange={onChange}
                                required placeholder="name@example.com" />
                        </label>
                    </div>

                    <label className={styles.field}>
                        <span>Subject</span>
                        <input
                            type="text" name="subject" value={form.subject} onChange={onChange}
                            required placeholder="What’s this about?" />
                    </label>

                    <label className={styles.field}>
                        <span>Message</span>
                        <textarea
                            name="message" rows="6" value={form.message} onChange={onChange}
                            required placeholder="Tell me a little about your idea, role, or timeline." />
                    </label>

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={status.state === "loading"}
                        aria-busy={status.state === "loading"}
                    >
                        {status.state === "loading" ? "Sending…" : "Send message"}
                    </button>

                    {status.state !== "idle" && (
                        <p
                            className={`${styles.status} ${status.state === "success" ? styles.ok : status.state === "error" ? styles.err : ""
                                }`}
                            role="status"
                        >
                            {status.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
