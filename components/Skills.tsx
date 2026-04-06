"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const groupItem = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-primary text-sm font-medium tracking-widest uppercase">
            My Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
            Skills & Technologies
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={groupItem}
              className="card-base p-6 hover:border-accent-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" role="img" aria-label={group.category}>
                  {group.icon}
                </span>
                <h3 className="text-text-primary font-semibold text-base">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-text-secondary bg-bg-primary border border-white/10 px-3 py-1.5 rounded-full cursor-default
                               hover:border-accent-primary hover:text-accent-primary hover:shadow-[0_0_12px_rgba(22,199,154,0.2)]
                               transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
