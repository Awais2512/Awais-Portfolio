# AI Agent Implementation Plan
## Muhammad Awais — Portfolio Website

> Generated from PRD v1.0 | April 6, 2026
> Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · MDX · Resend · Vercel

---

## Phase 1: Foundation (Week 1–2)

### 1.1 Project Initialization
- [x] Scaffold Next.js 14 project with TypeScript
  ```bash
  npx create-next-app@14 awais-portfolio --typescript --tailwind --app --eslint
  ```
- [x] Install all core dependencies
  ```bash
  npm install framer-motion next-mdx-remote shiki resend @cal.com/embed-react react-icons gray-matter
  npm install -D prettier husky lint-staged @types/node
  ```
- [ ] Configure Husky pre-commit hooks with lint-staged (ESLint + Prettier)
- [ ] Set up `.prettierrc` and `.eslintrc` configs
- [ ] Initialize git repo, set `user.name` and `user.email`, push to GitHub

### 1.2 Project Structure Setup
Create the following directory structure:
```
awais-portfolio/
├── app/
│   ├── layout.tsx              ← root layout, metadata, fonts
│   ├── page.tsx                ← home page (all section imports)
│   ├── blog/
│   │   ├── page.tsx            ← blog index
│   │   └── [slug]/page.tsx     ← individual post
│   └── api/contact/route.ts    ← Resend email handler
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   └── ui/                     ← reusable primitives (Button, Badge, Card)
├── content/blog/               ← .mdx post files
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── skills.ts
├── lib/
│   ├── mdx.ts                  ← MDX parsing helpers
│   └── utils.ts                ← cn(), formatDate(), readingTime()
├── public/
│   └── images/
└── styles/globals.css
```

### 1.3 Design System (Tailwind + CSS Variables)
- [ ] Define CSS variables in `globals.css`:
  ```css
  --bg-primary:      #0A0A0F
  --bg-secondary:    #1A1A2E
  --bg-tertiary:     #16213E
  --accent-primary:  #16C79A
  --accent-secondary:#0F3460
  --text-primary:    #E4E4E7
  --text-secondary:  #A1A1AA
  --text-tertiary:   #71717A
  ```
- [ ] Extend `tailwind.config.ts` to map CSS variables to Tailwind tokens
- [ ] Configure `Inter` (display/body) and `JetBrains Mono` (code) via `next/font`
- [ ] Implement 8px base grid, max-width 1200px container class

### 1.4 Navigation Component
- [ ] Fixed top navbar with blur backdrop (`backdrop-blur-md`)
- [ ] Logo / name on left, anchor links on right: About · Experience · Projects · Skills · Blog · Contact
- [ ] Active section highlight via `IntersectionObserver`
- [ ] Mobile hamburger menu with slide-down drawer (Framer Motion)
- [ ] Smooth scroll behavior on anchor clicks

### 1.5 Hero Section (`/components/Hero.tsx`)
- [ ] Full-viewport height layout
- [ ] Heading: "Muhammad Awais" — `Inter 800, 48–60px`
- [ ] Subtitle with **typing animation** (cycle through roles): "AI Engineer", "Building Production-Grade AI Systems", etc.
- [ ] CTA buttons: "View My Work" → `#projects` | "Get In Touch" → `#contact`
- [ ] Social icons row: GitHub · LinkedIn · Email (react-icons)
- [ ] Background: dark gradient `#1A1A2E → #16213E` + **animated particle/grid** (CSS canvas or tsparticles)
- [ ] Framer Motion fade-in stagger on mount

### 1.6 About Section (`/components/About.tsx`)
- [ ] Two-column layout: text left, photo right (stack on mobile)
- [ ] First-person professional summary paragraph
- [ ] Animated stat counters (scroll-triggered via Framer Motion `useInView`):
  - `2.5+` Years Experience
  - `10+` APIs Integrated
  - `90%` Automation Achieved
  - `6+` Production Projects
- [ ] Brief philosophy paragraph below stats

---

## Phase 2: Core Sections (Week 3–4)

### 2.1 Data Files
- [ ] `data/experience.ts` — typed array of work entries:
  ```ts
  { company, role, dateRange, logo, bullets: string[] }
  ```
  - MindRind · AI Engineer · Sep 2024 – Present
  - Sakonnet Systems · Nov 2023 – Jul 2024

- [ ] `data/projects.ts` — typed array of projects:
  ```ts
  { name, description, techStack: string[], impactBadge, demoUrl, codeUrl, featured }
  ```
  - FinanceGPT · RankForge · Smart Reply Engine
  - AI Voice Appointment Setter · AI Booking Chatbot · Meeting-to-Tasks Automation

- [ ] `data/skills.ts` — categorized skill groups:
  ```ts
  { category: string, skills: string[] }
  ```
  Categories: AI & LLMs · Backend & APIs · Automation · Data & Infra · Frontend

### 2.2 Experience Timeline (`/components/Experience.tsx`)
- [ ] Vertical timeline with center line
- [ ] Alternating left/right card layout on desktop, single column on mobile
- [ ] Each card: role title, company, date range, bullet points
- [ ] Company logo/icon placeholder
- [ ] Framer Motion `staggerChildren` + `whileInView` scroll animations
- [ ] `border-l-4 border-accent-primary` timeline connector style

### 2.3 Projects Showcase (`/components/Projects.tsx`)
- [ ] 2-column card grid on desktop, 1-column on mobile
- [ ] Each card:
  - Project name + one-line description
  - Tech stack pill badges
  - Impact metric badge (accent color)
  - "View Demo" button (opens modal or iframe)
  - "View Code" button (GitHub link)
- [ ] Card hover: lift shadow + accent border glow (`box-shadow: 0 0 20px #16C79A33`)
- [ ] Modal component for live demo iframe (lazy-loaded)
- [ ] Optional tag/category filter bar above grid

### 2.4 Skills Section (`/components/Skills.tsx`)
- [ ] Group skills by category with section heading per group
- [ ] Each skill as a pill badge: `bg-bg-tertiary border border-white/10 rounded-full`
- [ ] Hover glow: `hover:border-accent-primary hover:shadow-[0_0_12px_#16C79A55]`
- [ ] Framer Motion stagger reveal on scroll

### 2.5 Contact Section (`/components/Contact.tsx`)
- [ ] Two-column layout: form left, calendar + socials right
- [ ] **Contact form fields:** Name · Email · Subject · Message
- [ ] Form submits to `POST /api/contact` → Resend sends email
- [ ] Add honeypot hidden field for spam protection
- [ ] Success/error toast notification on submit
- [ ] **Cal.com embed** (`@cal.com/embed-react`) for 30-min consultation booking
- [ ] Social links with copy-to-clipboard for email
- [ ] Location note: "Based in Lahore, Pakistan — Available for remote work worldwide"

### 2.6 Contact API Route (`/app/api/contact/route.ts`)
- [ ] `POST` handler using Resend SDK
- [ ] Validate required fields (name, email, message) — return 400 on missing
- [ ] Check honeypot field — return 200 silently if filled (bot trap)
- [ ] Rate limiting: max 3 requests per IP per hour (use `Map` or Upstash Redis)
- [ ] Send email via `resend.emails.send()` to Awais's address
- [ ] Store `RESEND_API_KEY` in `.env.local` and Vercel env vars

---

## Phase 3: Blog & Polish (Week 5–6)

### 3.1 MDX Pipeline (`/lib/mdx.ts`)
- [ ] Install and configure `next-mdx-remote` with `gray-matter`
- [ ] `getAllPosts()` — reads all `.mdx` files from `content/blog/`, returns frontmatter list sorted by date
- [ ] `getPostBySlug(slug)` — returns compiled MDX + frontmatter for a single post
- [ ] Frontmatter schema:
  ```yaml
  title: string
  date: YYYY-MM-DD
  tags: string[]
  description: string
  readingTime: number  # auto-calculated
  ```

### 3.2 Blog Index Page (`/app/blog/page.tsx`)
- [ ] Grid of all post cards: title, date, reading time, tags
- [ ] Tag filter bar (client component) — clicking a tag filters visible posts
- [ ] Search input filtering post titles/descriptions
- [ ] Responsive: 2-col desktop, 1-col mobile

### 3.3 Blog Post Page (`/app/blog/[slug]/page.tsx`)
- [ ] Render MDX content via `next-mdx-remote`
- [ ] **Auto-generated Table of Contents** from H2/H3 headings
- [ ] **Syntax highlighting** via Shiki (dark theme matching site palette)
- [ ] **Copy-to-clipboard** button on all code blocks
- [ ] **Reading progress bar** at top of page (scroll-based)
- [ ] Post metadata header: title, date, tags, reading time
- [ ] Back to blog link

### 3.4 Blog Preview on Homepage (`/components/Blog.tsx`)
- [ ] Show latest 3 posts as cards (fetched server-side)
- [ ] "View All Posts" link to `/blog`

### 3.5 Initial Blog Posts (3 posts)
- [ ] `content/blog/building-rag-systems.mdx` — RAG architecture deep dive
- [ ] `content/blog/multi-agent-orchestration.mdx` — multi-agent patterns
- [ ] `content/blog/llm-inference-optimization.mdx` — FinanceGPT lessons learned

### 3.6 SEO (`/app/layout.tsx` + post pages)
- [ ] Root `metadata` export: title template, description, Open Graph, Twitter Card
- [ ] Per-post dynamic `generateMetadata()` from MDX frontmatter
- [ ] `Person` JSON-LD structured data in root layout
- [ ] `BlogPosting` JSON-LD in post pages
- [ ] `generateStaticParams()` for all blog slugs (SSG)
- [ ] `app/sitemap.ts` — auto-generates `sitemap.xml` including blog posts
- [ ] `app/robots.ts` — generates `robots.txt`
- [ ] Alt text on all `<Image>` components

---

## Phase 4: Launch (Week 7)

### 4.1 Performance Optimization
- [ ] Run Lighthouse CI — target 95+ on all four categories
- [ ] All images via `next/image` with WebP format + `lazy` loading
- [ ] Lazy-load all iframe demos with `loading="lazy"` + loading skeleton
- [ ] Defer non-critical JS (Cal.com embed, particle background)
- [ ] Bundle analysis: `npm run build && npx @next/bundle-analyzer`
- [ ] Ensure total gzipped first-load JS < 200KB
- [ ] Verify CLS < 0.1 (reserve space for images with explicit width/height)
- [ ] Verify FCP < 1.2s and LCP < 2.5s

### 4.2 Accessibility
- [ ] Test with `axe-core` or Lighthouse accessibility audit
- [ ] All interactive elements keyboard-navigable (`focus:ring-accent-primary`)
- [ ] WCAG AA contrast ratios on all text (use contrast checker for `#16C79A` on dark bg)
- [ ] ARIA labels on icon-only buttons (social links, close modal)
- [ ] `prefers-reduced-motion` media query to disable Framer Motion animations

### 4.3 Cross-browser & Responsive Testing
- [ ] Test on Chrome, Firefox, Safari (macOS + iOS)
- [ ] Test all breakpoints: 375px · 640px · 768px · 1024px · 1440px
- [ ] Verify hamburger nav on mobile
- [ ] Verify timeline stacks correctly on mobile
- [ ] Verify Cal.com embed renders on mobile

### 4.4 Vercel Deployment
- [ ] Connect GitHub repo to Vercel project
- [ ] Set environment variables in Vercel dashboard:
  - `RESEND_API_KEY`
  - `NEXT_PUBLIC_CAL_USERNAME` (Cal.com username)
- [ ] Configure custom domain (if available)
- [ ] Enable Vercel Analytics in project settings
- [ ] Test preview deploy on a feature branch before merging to main
- [ ] Verify production deploy passes all Lighthouse checks

### 4.5 Post-Launch
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify Open Graph previews using [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Test contact form end-to-end in production
- [ ] Test Cal.com booking flow in production
- [ ] Monitor Vercel Analytics for first traffic

---

## Component Checklist Summary

| Component | File | Status |
|---|---|---|
| Navigation | `components/Navigation.tsx` | [ ] |
| Hero | `components/Hero.tsx` | [ ] |
| About | `components/About.tsx` | [ ] |
| Experience | `components/Experience.tsx` | [ ] |
| Projects | `components/Projects.tsx` | [ ] |
| Skills | `components/Skills.tsx` | [ ] |
| Blog Preview | `components/Blog.tsx` | [ ] |
| Contact | `components/Contact.tsx` | [ ] |
| Blog Index | `app/blog/page.tsx` | [ ] |
| Blog Post | `app/blog/[slug]/page.tsx` | [ ] |
| Contact API | `app/api/contact/route.ts` | [ ] |
| Sitemap | `app/sitemap.ts` | [ ] |
| Robots | `app/robots.ts` | [ ] |
| MDX Utils | `lib/mdx.ts` | [ ] |
| Data: Projects | `data/projects.ts` | [ ] |
| Data: Experience | `data/experience.ts` | [ ] |
| Data: Skills | `data/skills.ts` | [ ] |

---

## Environment Variables

```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CAL_USERNAME=muhammadawais
```

---

## Key Decisions & Notes

- **No CMS** — blog content lives as `.mdx` files in the repo. Simple, fast, version-controlled.
- **SSG by default** — all pages are statically generated at build time. Contact form uses a Server Action / API route only for the POST handler.
- **No database** — contact form emails go directly via Resend. No persistence needed for MVP.
- **Spam protection** — honeypot field + IP rate limiting on the contact route. No reCAPTCHA to avoid Google dependency.
- **Cal.com** — use the free hosted version. Pin the embed package version to avoid breaking changes (see PRD Risk #5).
- **Particle background** — if `tsparticles` is too heavy, replace with a pure CSS animated grid/gradient to keep bundle size under target.
