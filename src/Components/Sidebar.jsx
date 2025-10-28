import React from "react";

export default function Sidebar() {
    return (
        <aside className="notes" aria-label="Notes and site information">
            <h3>Notes</h3>
            <ol className="notes-list">
                <li><strong>Animation:</strong> subtle scroll transitions</li>
                <li><strong>Color Palette:</strong> minimal with tropical accent</li>
                <li><strong>Typesetting:</strong> clear headings, roomy paragraphs</li>
                <li><strong>Accessibility:</strong> mobile-first, avoid autoplay media</li>
            </ol>

            <nav className="component-tree" aria-label="Quick links">
                <h4>Quick Links</h4>
                <ul className="quick-links">
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </aside>
    );
}
