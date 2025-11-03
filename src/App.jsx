import React from "react";
import Hero from "./Components/Hero";
import Snapshot from "./Components/Snapshot";
import Projects from "./Components/Projects";
import Sidebar from "./Components/Sidebar";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import AboutMe from "./Components/AboutMe";
import FloatingScrollButton from "./Components/FloatingScrollButton";
import TechStacksShowcase from "./Components/TechStacksShowCase";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="layout">
        <main className="main-column">
          <Hero />
          <AboutMe />
          <TechStacksShowcase />
          <div className="content">

            <Snapshot />
            <Projects />
            <Skills />
            <Experience />
            <Contact />

          </div>
        </main>
        <Sidebar />
        <FloatingScrollButton />
      </div>
    </div>
  );
}
