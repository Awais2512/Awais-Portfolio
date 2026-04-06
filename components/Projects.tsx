"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, categories } from "@/data/projects";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";

export default function Projects() {
  const ref       = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive]   = useState("All");
  const [modal,  setModal]    = useState<typeof projects[0] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="section-padding bg-bg-primary">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            What I&apos;ve Built
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            Projects
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-accent-primary text-bg-primary"
                  : "border border-white/10 text-text-secondary hover:border-accent-primary/50 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.name}
                variants={item}
                layout
                className="card-base p-6 flex flex-col group hover:border-accent-primary/30 transition-all duration-300 hover:accent-glow cursor-pointer"
                onClick={() => setModal(project)}
              >
                {/* Impact badge */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2.5 py-1 rounded-full">
                    {project.impactBadge}
                  </span>
                  <span className="text-xs text-text-tertiary border border-white/10 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Name & description */}
                <h3 className="text-text-primary font-bold text-lg mb-1 group-hover:text-accent-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-text-tertiary bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="text-xs text-text-tertiary px-2 py-0.5">
                      +{project.techStack.length - 5} more
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-accent-primary border border-accent-primary/30 px-3 py-1.5 rounded-full hover:bg-accent-primary hover:text-bg-primary transition-all"
                    >
                      <FiExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-text-secondary border border-white/10 px-3 py-1.5 rounded-full hover:border-white/30 hover:text-text-primary transition-all"
                    >
                      <FiGithub size={12} /> Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="card-base p-8 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              <span className="text-xs font-semibold text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2.5 py-1 rounded-full">
                {modal.impactBadge}
              </span>

              <h3 className="text-text-primary font-bold text-2xl mt-4 mb-2">
                {modal.name}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {modal.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {modal.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-text-secondary bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {modal.demoUrl && (
                  <a
                    href={modal.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium bg-accent-primary text-bg-primary px-4 py-2 rounded-full hover:bg-accent-primary/90 transition-all"
                  >
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                )}
                {modal.codeUrl && (
                  <a
                    href={modal.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium border border-white/20 text-text-primary px-4 py-2 rounded-full hover:border-white/40 transition-all"
                  >
                    <FiGithub size={14} /> View Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
