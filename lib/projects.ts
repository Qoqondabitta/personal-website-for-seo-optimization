export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  image: string;
  color: string;
  link: string;
  github: string;
  year: number;
}

export const projects: Project[] = [
  {
    slug: "vodiy-restaurant",
    title: "Vodiy Restaurant",
    category: "Client Work",
    description:
      "Digital menu and online ordering platform for a Central Asian restaurant with multi-language support and WhatsApp integration.",
    longDescription:
      "Vodiy Restaurant is a fully digital dining experience platform built for a Central Asian restaurant. It enables customers to browse an elegant, multi-language menu, view dish details and pricing, and place orders directly through WhatsApp — no app download required. The platform replaces printed menus entirely and gives the restaurant a modern, professional online presence.",
    highlights: [
      "Multi-language menu (English, Russian, Uzbek) with instant switching",
      "Category-filtered browsing across starters, mains, and drinks",
      "One-tap WhatsApp order submission — no account needed",
      "Supabase-backed CMS so the owner can update items without a developer",
      "Optimized for mobile — the primary device for in-restaurant guests",
    ],
    tags: ["React.js", "Tailwind CSS", "Supabase"],
    image: "/vodiy-menu-bg.jpeg",
    color: "#f59e0b",
    link: "https://vodiy-pl.netlify.app/",
    github: "https://github.com/Qoqondabitta/vodiy-restaurant",
    year: 2024,
  },
  {
    slug: "xon-clothing",
    title: "Xon Clothing Brand",
    category: "E-Commerce",
    description:
      "Full e-commerce storefront for a fashion label featuring product catalog, cart management, and Stripe-powered checkout.",
    longDescription:
      "Xon Clothing Brand is a complete e-commerce solution built for a fashion label from the ground up. It delivers a polished shopping experience — from product discovery through a filterable catalog, to cart management with real-time inventory checks, to a secure Stripe checkout. The platform handles the full purchase journey and includes an admin panel for managing the product lineup.",
    highlights: [
      "Filterable product catalog with category and size selectors",
      "Persistent shopping cart with real-time stock validation",
      "Stripe-powered checkout with payment status tracking",
      "User authentication and order history dashboard",
      "Admin panel for adding/editing products and viewing orders",
      "PostgreSQL-backed inventory with Node.js REST API",
    ],
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    image: "/xon-clothing-brand.jpeg",
    color: "#8b5cf6",
    link: "https://xon-org.netlify.app/",
    github: "https://github.com/Qoqondabitta/ecommerce",
    year: 2024,
  },
  {
    slug: "crown-de-balon-barber",
    title: "Crown De Balon Barber",
    category: "Client Work",
    description:
      "Booking and showcase platform for a barber shop with service menu, gallery, and real-time appointment scheduling.",
    longDescription:
      "Crown De Balon is a premium barber shop platform that digitizes the entire client experience. Customers can browse services with transparent pricing, view a curated gallery of past work, and book appointments in real time — eliminating phone-tag scheduling entirely. The shop gets a professional web presence and an automated calendar that fills itself.",
    highlights: [
      "Real-time appointment booking with time-slot selection",
      "Service menu with transparent pricing and estimated duration",
      "Photo gallery showcasing the barber's portfolio of work",
      "Prisma-backed appointment database with conflict detection",
      "Admin panel to manage upcoming bookings and block off times",
    ],
    tags: ["Next.js", "Tailwind CSS", "Prisma"],
    image: "/crown-de-balon.jpeg",
    color: "#10b981",
    link: "https://crown-de-balon.netlify.app/",
    github: "https://github.com/Qoqondabitta/crown-de-balon",
    year: 2024,
  },
  {
    slug: "turgunaliev-sarvar-portfolio",
    title: "Turgunaliev Sarvar Portfolio",
    category: "Client Work",
    description:
      "Personal portfolio site for a professional client, engineered for top SEO and Core Web Vitals with a clean, modern design.",
    longDescription:
      "A professional portfolio built for Turgunaliev Sarvar — crafted to rank prominently in search results and make a strong first impression on recruiters. The site is engineered for maximum search visibility using semantic HTML, JSON-LD structured data, and a perfect Lighthouse score. Every animation and interaction is performance-tuned to meet Core Web Vitals thresholds.",
    highlights: [
      "Perfect Lighthouse score across Performance, SEO, and Accessibility",
      "JSON-LD Person schema for Google name-recognition ranking",
      "Smooth scroll-reveal animations with zero layout shift",
      "TypeScript-safe component architecture throughout",
      "Fully responsive — tested on mobile, tablet, and wide-screen",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/turgunaliev-sarvar-bg.jpeg",
    color: "#3b82f6",
    link: "https://turgunaliev-sarvar.netlify.app/",
    github: "https://github.com/Qoqondabitta/Sarvar",
    year: 2024,
  },
  {
    slug: "resume-yourself",
    title: "Resume Builder Platform",
    category: "SaaS",
    description:
      "AI-powered resume builder with ATS optimization, live PDF export, and job-description tailoring via Claude API.",
    longDescription:
      "Resume Yourself is an AI-powered SaaS platform that transforms how job seekers present themselves. Users input their work experience and a target job description, and the platform uses Claude AI to generate ATS-optimized resume content keyword-matched to the role. The result is a polished, export-ready PDF that actually passes applicant tracking filters.",
    highlights: [
      "Claude API integration generates role-specific resume content",
      "ATS keyword analysis matched against the target job description",
      "Live preview with instant re-generation as you edit",
      "PDFKit-powered export in multiple clean templates",
      "TypeScript-safe API layer with structured AI output parsing",
    ],
    tags: ["Next.js", "Claude API", "PDFKit", "TypeScript"],
    image: "/resume-yourself-bg.jpeg",
    color: "#ec4899",
    link: "https://resume-yourself.netlify.app/",
    github: "https://github.com/Qoqondabitta/resume-builder",
    year: 2024,
  },
  {
    slug: "dynamic-restaurant-platform",
    title: "Dynamic Restaurant Platform",
    category: "SaaS",
    description:
      "Real-time menu management platform letting restaurant owners update items, apply event discounts, and control the customer-facing menu — instantly.",
    longDescription:
      "Dynamic Restaurant Platform is a CMS-driven solution giving restaurant owners complete control over their online menu without touching a line of code. From the admin dashboard, owners can add or remove items, update prices, and activate event-based discounts (happy hour, holidays, special events) — and every change appears on the customer-facing menu in real time. It bridges the gap between the back-of-house and the customer experience.",
    highlights: [
      "Admin dashboard for real-time menu item management",
      "Event-based discount engine — activate happy hour or holiday deals in one click",
      "Customer-facing menu updates instantly on every change",
      "MongoDB-backed flexible schema adapts to any restaurant's menu structure",
      "Multi-category organization for starters, mains, drinks, and specials",
      "Mobile-optimized customer view for in-restaurant and takeout guests",
    ],
    tags: ["React.js", "MongoDB", "Tailwind CSS"],
    image: "/vodiy-menu-bg.jpeg",
    color: "#f97316",
    link: "https://dynamic-restauarnat-platform.netlify.app",
    github: "https://github.com/Qoqondabitta/restaurant-dynamic-platform",
    year: 2025,
  },
  {
    slug: "xon-bike",
    title: "XonBike — E-Bike Rental",
    category: "Client Work",
    description:
      "E-bike rental platform for food delivery couriers — browse available bikes, view pricing plans, and complete bookings in minutes.",
    longDescription:
      "XonBike is a purpose-built e-bike rental service targeting food delivery couriers who need reliable, affordable transportation. The platform lets couriers browse available e-bikes, compare pricing plans, and complete a booking entirely online — so they spend less time finding wheels and more time earning. The site is fast, mobile-first, and built to convert.",
    highlights: [
      "Live bike availability display updated in real time",
      "Courier-focused pricing plans — daily, weekly, and monthly",
      "Online booking and reservation system with confirmation",
      "Location-based bike discovery for quick pickup",
      "Mobile-first design built for couriers on the go",
    ],
    tags: ["React.js", "Tailwind CSS", "Node.js"],
    image: "/xon-clothing-brand.jpeg",
    color: "#06b6d4",
    link: "https://xonbike.netlify.app/",
    github: "https://github.com/Qoqondabitta/XonBike",
    year: 2025,
  },
  {
    slug: "a-apply-consulting",
    title: "A-Apply Consulting",
    category: "Client Work",
    description:
      "Consulting agency website helping students navigate international university applications with expert guidance and personalized support.",
    longDescription:
      "A-Apply is a consulting agency platform connecting ambitious students with expert advisors who guide them through applying to universities abroad. The website clearly presents the agency's service packages, showcases student success stories, and gives prospective clients a clear path to starting their journey. Every section is designed to build trust and drive inquiries.",
    highlights: [
      "Service showcase detailing each consulting package and outcome",
      "Student success stories and testimonials from admitted applicants",
      "Advisor team profiles with credentials and specializations",
      "Multi-step inquiry form for personalized consultation requests",
      "University destination guides for popular study-abroad countries",
      "Fully responsive for a global student audience across all devices",
    ],
    tags: ["React.js", "Tailwind CSS"],
    image: "/turgunaliev-sarvar-bg.jpeg",
    color: "#84cc16",
    link: "https://a-apply.netlify.app/",
    github: "https://github.com/Qoqondabitta/aaply-consulting-firm",
    year: 2025,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
