import React, { useEffect, useRef, useState } from 'react'
import OverlayMenu from './OverlayMenu'
import Logo from '../assets/logo.png'
import { FiMenu } from 'react-icons/fi'


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timeId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector('#home');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setIsVisible(true);
        } else {
          setForceVisible(false);
        }
      }, { threshold: 0.1 }
    )

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    }
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) return setIsVisible(true);

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);

        if (timeId.current) clearTimeout(timeId.current);

        timeId.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000)
      }

      lastScrollY.current = currentScrollY;
    }


    window.addEventListener('scroll', handleScroll, { passive: true });


    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeId.current) clearTimeout(timeId.current);
    }

  }, [forceVisible])


  return (
    <>


      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>

        <div className="flex items-center space-x-2">
          <img src={Logo} className="w-8 h-8 " />
          <span className="text-2xl font-bold text-white hidden sm:block">Manish Kumar</span>

        </div>

        <div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl focus:outline-none" aria-label="Open Menu">
            <FiMenu />
          </button>

        </div>


        <div className="hidden lg:block">
          <a href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >Reach Out</a>
        </div>

      </nav>

      <OverlayMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />


    </>
  )
}

export default Navbar