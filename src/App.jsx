import React from "react";
import Hero from "./Components/Hero";
import Snapshot from "./Components/Snapshot";
import Projects from "./Components/Projects";
import Sidebar from "./Components/Sidebar";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="layout">
        <main className="main-column">
          <Hero />
          <div className="content">
            <Snapshot />
            <Projects />
            {/* add CaseStudies, Skills, Experience, Contact components here as they are created */}
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
