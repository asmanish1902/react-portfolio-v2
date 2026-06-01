import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const OverlayMenu = ({ isOpen, onClose }) => {
  const menuArr = [
    'Home',
    'About',
    'Skills',
    'Experience',
    'Projects',
    'Testimonials',
    'Contact',
  ];


  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const origin = isMobile ? '95% 5%' : '52% 5%';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0, 0.95)" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-4xl hover:text-pink-400 transition-colors"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          {/* Menu Items */}
          <ul className="space-y-8 text-center">
            {menuArr.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-2xl md:text-4xl font-bold text-white hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;