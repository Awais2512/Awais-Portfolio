"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/experience";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";

export default function Experience() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, type: "tween" as const } },
  };

  return (
    <section id="experience" className="section-padding bg-bg-secondary">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            Where I&apos;ve Worked
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-12"
          >
            {experience.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={entry.company}
                  variants={item}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className="md:w-[calc(50%-2rem)] w-full">
                    <div className="card-base p-6 hover:border-accent-primary/30 hover:accent-glow transition-all duration-300 group">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-text-primary font-bold text-lg group-hover:text-accent-primary transition-colors">
                            {entry.role}
                          </h3>
                          <div className="flex items-center gap-1.5 text-accent-primary font-semibold text-sm mt-0.5">
                            <FiBriefcase size={13} />
                            {entry.company}
                          </div>
                        </div>
                        {entry.current && (
                          <span className="text-xs font-medium text-accent-primary border border-accent-primary/30 bg-accent-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 mb-4 text-text-tertiary text-xs">
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} />
                          {entry.dateRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMapPin size={12} />
                          {entry.location}
                        </span>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2">
                        {entry.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2 text-text-secondary text-sm leading-relaxed">
                            <span className="text-accent-primary mt-1 flex-shrink-0">▸</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {entry.keyProjects && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <p className="text-xs text-text-tertiary">
                            <span className="text-accent-primary font-semibold">Key Projects:</span>{" "}
                            {entry.keyProjects}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-primary border-4 border-bg-secondary z-10 flex-shrink-0" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
