import React from 'react';
import Hero from "./Components/Hero/Hero";
import AboutMe from "./Components/AboutMe/AboutMe";
import TechStacksShowcase from "./Components/TechStacks/TechStacksShowcase";
import Experience from "./Components/Experience/Experience";
import Contact from "./Components/Contact/Contact";
import SideNav from "./Components/SideNav/SideNav";


export default function App() {
  return (
    <div className="layout">
      <main className="main-column">
        <Hero />
        <AboutMe />
        <TechStacksShowcase />
        <Experience />
        <Contact />
        <div id="page-end" style={{ height: 1 }} />
      </main>
      <SideNav />

    </div>
  );
}

