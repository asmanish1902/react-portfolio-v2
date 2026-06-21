import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Project from './sections/Project'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'

const App = () => {

  const [introFlag, setIntroFlag] = useState(false)
  return (
    <>
      {/* {!introFlag && <IntroAnimation onFinish={() => setIntroFlag(true)} />} */}
      <div className="relative gradient text-white">
        <CustomCursor />
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
    </>
  )
}

export default App