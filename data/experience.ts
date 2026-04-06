export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;
  location: string;
  bullets: string[];
  current: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: "MindRind",
    role: "AI Engineer",
    dateRange: "Sep 2024 – Present",
    location: "Remote",
    current: true,
    bullets: [
      "Architected and deployed production LLM inference pipelines handling financial data analysis with sub-2s latency.",
      "Built multi-agent orchestration systems using LangChain and AutoGen, reducing manual workflow overhead by 90%.",
      "Designed RAG-powered chatbots with vector stores (Pinecone/Chroma) achieving 87% answer accuracy on domain-specific queries.",
      "Integrated 10+ third-party APIs (Twilio, OpenAI, Stripe, Jira) into automated business workflows.",
    ],
  },
  {
    company: "Sakonnet Systems",
    role: "AI & Backend Engineer",
    dateRange: "Nov 2023 – Jul 2024",
    location: "Remote",
    current: false,
    bullets: [
      "Developed a white-label SEO & PPC reporting SaaS platform (RankForge) serving multiple agency clients.",
      "Built REST APIs with FastAPI and Node.js, deploying on AWS EC2 with CI/CD pipelines via GitHub Actions.",
      "Implemented AI-powered social media automation engine processing 500+ posts/day across platforms.",
      "Reduced client reporting time by 75% through automated data aggregation from Google Ads, Meta, and SEMrush APIs.",
    ],
  },
];
