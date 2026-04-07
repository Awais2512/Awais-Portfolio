export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;
  location: string;
  bullets: string[];
  keyProjects?: string;
  current: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: "MindRind",
    role: "Senior AI Engineer",
    dateRange: "Apr 2024 – Present",
    location: "Remote",
    current: true,
    bullets: [
      "Architecting and deploying production-grade LLM pipelines using LangChain and OpenAI API for content generation, document summarization, and intelligent customer support agents.",
      "Built a voice AI agent integrated with Google Calendar for real-time appointment scheduling, eliminating 90% of manual booking effort — showcased as a flagship investor demo product.",
      "Designed multi-agent agentic workflows using CrewAI for autonomous multi-step reasoning and task delegation across AI agents.",
      "Implemented RAG systems with vector databases (Pinecone/FAISS) for context-aware document retrieval and question answering.",
      "Integrated 10+ third-party APIs (Google Calendar, Jira, GitHub, Meta Graph API) into AI-driven automation flows using n8n and Python.",
      "Developed FastAPI backend services and Next.js frontends for multi-tenant SaaS platforms with secure RBAC, Docker-based deployment, and CI/CD pipelines.",
    ],
    keyProjects:
      "FinanceGPT (production-grade LLM inference system for financial applications with CPU/GPU optimization), RankForge (white-label SEO & PPC reporting SaaS with FastAPI, Next.js, Celery, Redis, PostgreSQL), Smart Reply Engine (AI-powered social media automation platform with Meta Graph API and LangChain).",
  },
  {
    company: "Digital Elites .Dev",
    role: "AI & Automation Engineer",
    dateRange: "Sep 2023 – Apr 2024",
    location: "Remote",
    current: false,
    bullets: [
      "Built GenAI-powered solutions using LangChain and Retrieval-Augmented Generation (RAG).",
      "Developed custom workflows integrating LLMs for intelligent search, summarization, and chatbot functionality.",
      "Designed and deployed AI voice agents for real-time appointment booking integrated with Google Calendar, eliminating manual scheduling overhead.",
      "Built RAG chatbots for automated appointment handling with full context awareness, improving booking conversion rates by 60% and saving 15+ hours/week.",
      "Automated end-to-end pipelines from meeting transcripts to structured Jira stories and GitHub issues, boosting team productivity by 40%.",
    ],
    keyProjects:
      "AI Voice Appointment Setter (LangChain, LiveKit, Google GenAI), AI Appointment Booking Chatbot with RAG (OpenAI API, Vector DB, Google Calendar API), Meeting-to-Tasks Automation (n8n, Jira API, GitHub API, Whisper).",
  },
  {
    company: "Sakonet Systems",
    role: "AI Engineer",
    dateRange: "Nov 2021 – Aug 2023",
    location: "Remote",
    current: false,
    bullets: [
      "Developed and deployed automation solutions using Python, Selenium, and OpenAI's API.",
      "Built web automation bots for data scraping, form submissions, and reporting, reducing manual processing workloads by 60%.",
      "Implemented system-level scripts for task scheduling and file handling.",
      "Automated repetitive web-based workflows using Selenium, improving team throughput and eliminating error-prone manual steps.",
      "Built reliable API integration layers for seamless data exchange across internal and external platforms.",
      "Integrated AI to enable dynamic content generation, including text summarization and intelligent data processing pipelines.",
    ],
  },
];
