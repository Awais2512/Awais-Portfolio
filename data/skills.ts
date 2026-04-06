export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLMs",
    icon: "🧠",
    skills: [
      "OpenAI GPT-4/3.5",
      "LangChain",
      "LlamaIndex",
      "AutoGen",
      "RAG Pipelines",
      "Fine-tuning",
      "Prompt Engineering",
      "Pinecone",
      "Chroma",
      "FAISS",
      "OpenAI Whisper",
      "Hugging Face",
    ],
  },
  {
    category: "Backend & APIs",
    icon: "⚙️",
    skills: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Celery",
      "WebSockets",
    ],
  },
  {
    category: "Automation",
    icon: "🤖",
    skills: [
      "n8n",
      "Make (Integromat)",
      "Zapier",
      "Twilio",
      "Jira API",
      "GitHub Actions",
      "Cron Jobs",
      "Webhooks",
    ],
  },
  {
    category: "Data & Infra",
    icon: "☁️",
    skills: [
      "AWS EC2 / S3",
      "Vercel",
      "Docker",
      "CI/CD",
      "Google Ads API",
      "Meta API",
      "SEMrush API",
      "GA4 API",
      "Supabase",
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML/CSS",
      "Figma",
    ],
  },
];
