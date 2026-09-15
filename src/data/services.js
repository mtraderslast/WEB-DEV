import { Code2, Smartphone, Palette, Search, Megaphone, Cloud, Cpu } from "lucide-react";

export const services = [
    {
        id: "web-development",
        icon: Code2,
        shortTitle: "Web Development",
        subtitle: "Scalable & Modern Web Applications",
        badge: "Next.js & React Focused",
        description: "We design and build high-performance, secure, and SEO-friendly websites and modern web applications tailored to scale your enterprise business operations seamlessly.",
        features: [
            "Custom frontend development with React, Next.js, and Tailwind CSS",
            "Robust backend engineering using Node.js, Python, or Go",
            "Headless CMS integration (Strapi, Sanity, Contentful)",
            "High-grade API architecture and database optimization",
            "Performance optimization (Core Web Vitals 95+ score target)",
            "Comprehensive post-launch maintenance and security updates",
        ],
        tags: ["Full-Stack", "PWA", "Custom Web Apps"]
    },
    {
        id: "mobile-app",
        icon: Smartphone,
        shortTitle: "Mobile App",
        subtitle: "Native & Cross-Platform Apps",
        badge: "iOS & Android",
        description: "From conceptualization to App Store release, we craft intuitive and feature-rich mobile applications that offer effortless user journeys and top-tier performance.",
        features: [
            "Cross-platform app development using React Native / Flutter",
            "Native iOS (Swift) and Android (Kotlin) software development",
            "Seamless RESTful & GraphQL API backend integration",
            "Offline-first architecture with local database sync",
            "Biometric authentication and secure payment gateway setups",
            "App Store (iOS) and Google Play Store deployment handling",
        ],
        tags: ["Cross-Platform", "React Native", "iOS & Android"]
    },
    {
        id: "ui-ux-design",
        icon: Palette,
        shortTitle: "UI/UX Design",
        subtitle: "Human-Centered Product Design",
        badge: "Figma & Design Systems",
        description: "Transform complex user flows into beautiful, accessible, and high-converting user interfaces backed by deep user research and usability testing.",
        features: [
            "In-depth user research, persona creation, and empathy mapping",
            "Wireframing, interactive prototyping, and user journey flows",
            "Scalable design systems and UI component libraries",
            "Accessibility (WCAG 2.1 AAA) compliance engineering",
            "Micro-interactions and motion UI design for enhanced engagement",
            "Usability testing and interface iteration based on real metrics",
        ],
        tags: ["User Research", "Design System", "Figma Design"]
    },
    {
        id: "seo",
        icon: Search,
        shortTitle: "SEO Optimization",
        subtitle: "Search Engine Optimization",
        badge: "Data-Driven Growth",
        description: "Dominate search engine rankings and attract qualified organic traffic with our comprehensive technical, on-page, and authority-building SEO strategies.",
        features: [
            "Technical SEO audits, site speed optimization, and crawl error fixes",
            "Comprehensive keyword research and competitor gap analysis",
            "On-page optimization (Meta structures, schema markup, content)",
            "High-authority backlink building and digital PR outreach",
            "Local SEO strategy and Google Business Profile optimization",
            "Monthly ranking tracking and transparent analytical reporting",
        ],
        tags: ["Technical SEO", "Organic Traffic", "Rank Tracking"]
    },
    {
        id: "digital-marketing",
        icon: Megaphone,
        shortTitle: "Digital Marketing",
        subtitle: "Performance Marketing & Branding",
        badge: "ROI Focused",
        description: "Drive predictable revenue growth with targeted digital campaigns across search, social media, and email channels engineered to convert browsers into customers.",
        features: [
            "Pay-Per-Click (PPC) ad campaigns on Google Ads & Bing",
            "Targeted Social Media Marketing (Meta, LinkedIn, TikTok Ads)",
            "Conversion Rate Optimization (CRO) and A/B landing page testing",
            "Automated email marketing sequences and customer retention workflows",
            "Brand positioning, copywriting, and visual media strategy",
            "Multi-channel attribution tracking and ROI dashboard creation",
        ],
        tags: ["Performance Ads", "CRO Strategy", "Brand Growth"]
    },
    {
        id: "cloud-solutions",
        icon: Cloud,
        shortTitle: "Cloud Solutions",
        subtitle: "DevOps & Cloud Infrastructure",
        badge: "AWS & Azure Certified",
        description: "Modernize your infrastructure with secure, cost-optimized, and auto-scaling cloud architectures built on top platforms like AWS, GCP, and Azure.",
        features: [
            "Cloud migration strategies (Lift-and-Shift or Refactoring)",
            "DevOps pipeline setup (CI/CD) with GitHub Actions / GitLab",
            "Infrastructure as Code (IaC) using Terraform and Ansible",
            "Containerization and orchestration using Docker and Kubernetes",
            "24/7 server monitoring, automated backups, and disaster recovery",
            "Cloud cost optimization and infrastructure security auditing",
        ],
        tags: ["AWS/GCP", "Kubernetes", "CI/CD Pipelines"]
    },
    {
        id: "business-automation",
        icon: Cpu,
        shortTitle: "Business Automation",
        subtitle: "Workflow & AI Integration",
        badge: "Process Optimization",
        description: "Eliminate repetitive tasks and optimize operational workflows by integrating custom software, automated pipelines, and intelligent AI tools into your business.",
        features: [
            "Custom workflow automation (Zapier, Make, custom scripts)",
            "CRM and ERP software setup and enterprise integration",
            "AI integration (OpenAI API, LLMs, automated chatbots)",
            "Automated document processing and data extraction solutions",
            "Database synchronization across disparate business platforms",
            "Process auditing and operational bottleneck identification",
        ],
        tags: ["AI Tools", "Workflow Systems", "CRM Integration"]
    }
];