"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";

const roles = [
  "AI Engineer",
  "LLM Systems Builder",
  "RAG Architect",
  "Automation Engineer",
  "Production AI Developer",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [charIndex,   setCharIndex]   = useState(0);
  const [deleting,    setDeleting]    = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing animation
  useEffect(() => {
    const current = roles[roleIndex];
    const speed   = deleting ? 50 : 90;
    const pause   = deleting ? 0 : 1800;

    const timeout = setTimeout(
      () => {
        if (!deleting && charIndex < current.length) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else if (!deleting && charIndex === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIndex > 0) {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      },
      speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number; r: number; alpha: number;
    }[] = Array.from({ length: 60 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.4,
      vy:    (Math.random() - 0.5) * 0.4,
      r:     Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22, 199, 154, ${p.alpha})`;
        ctx.fill();
      });

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(22, 199, 154, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, type: "tween" as const } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0A0A0F 100%)" }}
    >
      {/* Particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-max relative z-10 text-center pt-16"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-block text-xs font-medium text-accent-primary border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-text-primary mb-4 leading-tight"
        >
          Muhammad{" "}
          <span className="text-accent-primary">Awais</span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          variants={item}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-secondary mb-6 h-9"
        >
          <span>{displayText}</span>
          <span className="inline-block w-0.5 h-7 bg-accent-primary ml-1 animate-blink align-middle" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="max-w-2xl mx-auto text-text-secondary text-base sm:text-lg leading-relaxed mb-10"
        >
          Building{" "}
          <span className="text-text-primary font-medium">production-grade AI systems</span>{" "}
          that ship and scale. Specializing in LLMs, RAG pipelines, and multi-agent
          orchestration.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="px-7 py-3 bg-accent-primary text-bg-primary font-semibold rounded-full hover:bg-accent-primary/90 transition-all hover:shadow-lg hover:shadow-accent-primary/25 active:scale-95"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3 border border-white/20 text-text-primary font-semibold rounded-full hover:border-accent-primary hover:text-accent-primary transition-all active:scale-95"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={item} className="flex items-center justify-center gap-5 mb-16">
          {[
            { href: "https://github.com/muhammadawais", icon: <FiGithub size={20} />, label: "GitHub" },
            { href: "https://linkedin.com/in/muhammadawais", icon: <FiLinkedin size={20} />, label: "LinkedIn" },
            { href: "mailto:awais@example.com", icon: <FiMail size={20} />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 text-text-tertiary border border-white/10 rounded-full hover:text-accent-primary hover:border-accent-primary transition-all"
            >
              {icon}
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          variants={item}
          onClick={() => scrollTo("about")}
          className="flex flex-col items-center gap-1 text-text-tertiary hover:text-accent-primary transition-colors mx-auto"
          aria-label="Scroll to about"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FiArrowDown size={16} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
