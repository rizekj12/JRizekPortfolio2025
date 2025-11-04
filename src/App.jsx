import React from 'react';
import Hero from "./Components/Hero/Hero";
import AboutMe from "./Components/AboutMe/AboutMe";
import TechStacksShowcase from "./Components/TechStacks/TechStacksShowcase";
import FloatingScrollButton from "./Components/FloatingScrollButton/FloatingScrollButton";
import Experience from "./Components/Experience/Experience";

export default function App() {
  return (
    <div className="layout">
      <main className="main-column">
        <Hero />
        <AboutMe />
        <TechStacksShowcase />
        <Experience />
      </main>
      <FloatingScrollButton />
    </div>
  );
}

