import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Project from './sections/Project'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'

const App = () => {
  return (
    <div className="relative gradient text-white">
      <CustomCursor />
      <ParticleBackground />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Project />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App