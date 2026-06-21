import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { DiCodeigniter, DiMongodb } from 'react-icons/di';
import { FaCss3, FaHtml5, FaJava, FaLaravel, FaPhp, FaReact, FaNodeJs } from 'react-icons/fa';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiJquery, SiMysql, SiRedis } from 'react-icons/si';
import { TbBrandBootstrap, TbBrandJavascript } from 'react-icons/tb';

const Skills = () => {

  const skills = [
    { icon: <FaPhp />, name: "PHP", color: "#777BB4" },
    { icon: <FaLaravel />, name: "Laravel", color: "#FF2D20" },
    { icon: <DiCodeigniter />, name: "Codeigniter", color: "#EE4323" },
    { icon: <SiMysql />, name: "MySQL", color: "#00758F" },
    { icon: <DiMongodb />, name: "MongoDB", color: "#47A248" },
    { icon: <SiRedis />, name: "Redis", color: "#DC382D" },
    { icon: <FaHtml5 />, name: "HTML5", color: "#E34F26" },
    { icon: <FaCss3 />, name: "CSS3", color: "#1572B6" },
    { icon: <TbBrandJavascript />, name: "Javascript", color: "#F7DF1E" },
    { icon: <TbBrandBootstrap />, name: "Bootstrap", color: "#7952B3" },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS", color: "#06B6D4" },
    { icon: <SiJquery />, name: "JQuery", color: "#0769AD" },
    { icon: <FaReact />, name: "React", color: "#61DAFB" },
    { icon: <FaNodeJs />, name: "NodeJS", color: "#339933" },
  ];

  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);


  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    },
      {
        threshold: [0.1]
      }
    )

    io.observe(el);
    return () => io.disconnect();
  }, [])


  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1)
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;

      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });


    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    }
  }, [active])


  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick)
    }

    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id);
  }, [dir, x])

  return (
    <section id='skills'
      ref={sectionRef}
      className='w-full h-1/2 pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse' />

        <div className='absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-200' />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className='relative w-full overflow-hidden'>
        <motion.div
          ref={trackRef}
          className='flex gap-10 text-6xl'
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {
            repeated.map((s, i) => (
              <div key={i} className='flex flex-col items-center gap-2 min-w-[120px]'
                aria-label={s.name}
                title={s.name}
              >
                <span
                  className='hover:scale-115 transition-transform duration-300'
                  style={{ color: s.color }}
                >
                  {s.icon}
                </span>
                <p className='text-sm text-neutral-400'>{s.name}</p>
              </div>
            ))
          }
        </motion.div>
      </div>


    </section>
  )
}

export default Skills