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

            <div className="component-tree">
                <h4>Component Tree</h4>
                <pre>{`<Hero />
<ContentSwitch />
<Snapshot />
<ProjectGrid />
<CaseStudies />
<Skills />
<Experience />
<Contact />`}</pre>
            </div>
        </aside>
    );
}