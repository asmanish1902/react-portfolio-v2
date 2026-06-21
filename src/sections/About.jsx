import React from 'react'
import { motion } from 'framer-motion';
import profile from '../assets/p.jpg'

const About = () => {

  const glowingBlobs = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];

  const stats = [
    { label: 'Experience', value: '3+ years' },
    { label: 'Speciality', value: 'Full Stack' },
    { label: 'Focus', value: 'Performance and UX' },

  ]


  return (
    <section id="about"
      className='min-h-screen w-full flex justify-center items-center relative bg-black text-white overflow-hidden'>

      {/* Glowing */}
      <div>
        {
          glowingBlobs.map((c, i) => (
            <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`} />
          ))
        }
      </div>

      {/* section */}
      <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
        <motion.div className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >

          <motion.div className='relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}>
            <img src={profile} alt="Manish Kumar" />
          </motion.div>

          <div className='flex-1 flex flex-col justify-center text-center md:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]'>Manish Kumar</h2>
            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold'>Full Stack Developer</p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg mx-w-2xl md:mx-w-3xl'>I specialize in building modern, scalable applications with an emphasis on clean architecture, performance optimization, and seamless user experiences. Leveraging technologies such as PHP, Laravel, CodeIgniter, MySQL, Redis, React.js, Node.js, Bootstrap, Tailwind CSS, and RESTful APIs, I develop end-to-end solutions that are secure, maintainable, and built to scale. From backend infrastructure to polished frontend interfaces, I transform ideas into production-ready applications that deliver real business value. </p>
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-xl'>
              {
                stats.map((s, i) => (
                  <motion.div key={i} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className='text-sm text-gray-400'>{s.label}</div>
                    <div className='text-base font-semibold'>{s.value}</div>
                  </motion.div>
                ))
              }
            </div>

            <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-300 transition'>View Projects</a>

              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition'>Get in Touch</a>
            </div>



          </div>
        </motion.div>

        <motion.div className='text-center md:text-left'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>About Me</h3>
          <p className='text-gray-300 leading-relaxed text-base sm:text-lg'>I'm a Full Stack Web Application Developer with a passion for building fast, scalable, and resilient applications. I enjoy designing efficient backend systems, creating intuitive user experiences, and delivering reliable solutions that solve real-world business problems</p>
          <p className='mt-4 text-gray-400 text-base sm:text-lg'>I love turning ideas into scalable, user-freindly products that make an inpact.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default About