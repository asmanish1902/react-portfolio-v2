import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { img1, img2, img3, photo1, photo2, photo3 } from "../assets/img.js";

const useIsMobile = (query = "(max-width:639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);

    const handler = (e) => {
      setIsMobile(e.matches);
    };

    mql.addEventListener("change", handler);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  return isMobile;
};

const ProjectCard = memo(({ project, active, isMobile }) => {
  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.96,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "85%",
        maxWidth: "1200px",
        zIndex: active ? 20 : 0,
        pointerEvents: active ? "auto" : "none",
        willChange: "transform, opacity",
      }}
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.h3
            key={project.title}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45 }}
            className={`block text-center text-[clamp(3rem,6vw,4rem)] text-white/95 italic font-semibold
            ${isMobile
                ? "-mt-24 mb-4"
                : "sm:absolute sm:-top-20 sm:left-[35%] lg:left-[2%]"
              }`}
            style={{
              zIndex: 5,
              textAlign: isMobile ? "center" : "left",
              willChange: "transform, opacity",
            }}
          >
            {project.title}
          </motion.h3>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          y: active ? [0, -8, 0] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative w-full overflow-hidden bg-black/20 shadow-2xl
  md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]
  ${isMobile
            ? "mb-6 rounded-lg"
            : "mb-10 sm:mb-12 rounded-xl"
          }
  h-[60vh] sm:h-[66vh]`}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} project`}
          className="block w-full h-full group"
        >
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="
        w-full
        h-full
        object-fill
        rounded-xl
        transition-all
        duration-500
        group-hover:scale-[1.02]
        group-hover:brightness-110
      "
            style={{
              filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.45))",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />

          <div
            className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-black/0
        group-hover:bg-black/20
        transition-all
        duration-300
        rounded-xl
      "
          >
            <span
              className="
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          text-white
          font-semibold
          text-lg
          backdrop-blur-sm
          px-5
          py-2
          rounded-full
          border
          border-white/30
        "
            >
              Visit Website →
            </span>
          </div>
        </a>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
});

const Project = () => {
  const isMobile = useIsMobile();

  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Peppinos Dosa",
        link: "https://peppinosdosa.com",
        bgColor: "#1E7D4D",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "FMS Alumni",
        link: "https://fmsalumni.co.in",
        bgColor: "#8B1E2D",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Tritech Media",
        link: "https://tdmebooks.com",
        bgColor: "#1E3A5F",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      Math.floor(value * projects.length),
      projects.length - 1
    );

    setActiveIndex((prev) => (prev !== index ? index : prev));
  });

  useEffect(() => {
    const nextProject =
      projects[(activeIndex + 1) % projects.length];

    const preloadImage = new Image();
    preloadImage.src = nextProject.image;
  }, [activeIndex, projects]);

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white transition-colors duration-500"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* Counter */}
        <div className="absolute top-8 right-6 text-white/70 font-medium text-sm md:text-base">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </div>

        {/* Progress Bar */}
        <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 h-40 w-[3px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-white rounded-full"
            style={{
              height: `${((activeIndex + 1) / projects.length) * 100}%`,
            }}
          />
        </div>

        <h2
          className={`text-3xl font-semibold z-10 text-center mb-10 ${isMobile ? "mt-4" : "mt-8"
            }`}
        >
          My Work
        </h2>

        <div
          className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""
            }`}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              active={activeIndex === index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;