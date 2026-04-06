export interface Project {
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  impactBadge: string;
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    name: "FinanceGPT",
    description: "LLM Inference System for Financial Applications",
    longDescription:
      "Production-grade financial analysis platform powered by fine-tuned LLMs. Processes real-time market data, generates investment insights, and answers complex financial queries with sub-2s latency at scale.",
    techStack: ["Python", "FastAPI", "OpenAI", "LangChain", "Pinecone", "Redis", "AWS"],
    impactBadge: "< 2s Latency",
    featured: true,
    category: "AI/LLM",
  },
  {
    name: "RankForge",
    description: "White-Label SEO & PPC Reporting SaaS Platform",
    longDescription:
      "Multi-tenant SaaS platform enabling digital agencies to deliver branded SEO and PPC performance reports. Aggregates data from Google Ads, Meta, SEMrush, and GA4 into automated white-label dashboards.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Google Ads API", "Meta API", "SEMrush API"],
    impactBadge: "75% Time Saved",
    featured: true,
    category: "SaaS",
  },
  {
    name: "Smart Reply Engine",
    description: "AI-Powered Social Media Automation",
    longDescription:
      "Intelligent automation system that monitors social media mentions and auto-generates context-aware replies using GPT-4. Processes 500+ interactions/day across Twitter, LinkedIn, and Instagram.",
    techStack: ["Python", "GPT-4", "Twitter API", "LinkedIn API", "Redis", "Celery"],
    impactBadge: "500+ Posts/Day",
    featured: true,
    category: "Automation",
  },
  {
    name: "AI Voice Appointment Setter",
    description: "Voice-based scheduling agent",
    longDescription:
      "Conversational voice AI agent that autonomously handles inbound calls, qualifies leads, and books appointments directly into calendar systems. Achieves 68% call-to-booking conversion rate.",
    techStack: ["Python", "Twilio", "OpenAI Whisper", "GPT-4", "Cal.com API", "FastAPI"],
    impactBadge: "68% Conversion",
    featured: true,
    category: "AI/LLM",
  },
  {
    name: "AI Appointment Booking Chatbot",
    description: "RAG-powered booking system",
    longDescription:
      "Embeddable chatbot widget using Retrieval-Augmented Generation to answer business-specific questions and handle appointment booking. Trained on company documentation with 87% answer accuracy.",
    techStack: ["Python", "LangChain", "Chroma", "OpenAI", "React", "FastAPI"],
    impactBadge: "87% Accuracy",
    featured: false,
    category: "AI/LLM",
  },
  {
    name: "Meeting-to-Tasks Automation",
    description: "Transcript-to-Jira pipeline",
    longDescription:
      "End-to-end automation pipeline that transcribes meeting recordings, extracts action items using LLMs, and automatically creates structured Jira tickets with assignees, priorities, and due dates.",
    techStack: ["Python", "OpenAI Whisper", "GPT-4", "Jira API", "n8n", "FastAPI"],
    impactBadge: "90% Less Manual Work",
    featured: false,
    category: "Automation",
  },
];

export const categories = ["All", "AI/LLM", "SaaS", "Automation"];
