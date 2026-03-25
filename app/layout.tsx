import type { Metadata } from "next";
import "./globals.css";

const FULL_NAME = "Abdulakhad Turgunaliev";
const SITE_URL = "https://abdulakhadturgunaliev.com"; // ← update after deploying
const TAGLINE = "AI Developer | Entrepreneur | Student";
const META_DESCRIPTION =
  "Abdulakhad Turgunaliev — AI Developer, Entrepreneur, and Student building intelligent products. Explore projects, background, and get in touch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${FULL_NAME} — ${TAGLINE}`,
    template: `%s | ${FULL_NAME}`,
  },
  description: META_DESCRIPTION,
  keywords: [
    "Abdulakhad Turgunaliev",
    "AI Developer",
    "Entrepreneur",
    "Full Stack Developer",
    "Next.js",
    "Machine Learning",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: FULL_NAME,
    title: `${FULL_NAME} — ${TAGLINE}`,
    description: META_DESCRIPTION,
    images: [
      {
        url: "/abdulakhad-turgunaliev.jpg",
        width: 1200,
        height: 630,
        alt: "Abdulakhad Turgunaliev portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${FULL_NAME} — ${TAGLINE}`,
    description: META_DESCRIPTION,
    images: ["/abdulakhad-turgunaliev.jpg"],
    creator: "@abdulakhaddev", // ← update with your Twitter/X handle
  },
  alternates: { canonical: SITE_URL },
};

// JSON-LD Person schema — the most important SEO signal for name searches
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdulakhad Turgunaliev",
  url: SITE_URL,
  image: `${SITE_URL}/abdulakhad-turgunaliev.jpg`,
  jobTitle: ["AI Developer", "Entrepreneur", "Student"],
  description: META_DESCRIPTION,
  sameAs: [
    "https://linkedin.com/in/abdulakhad-turgunaliev", // ← update
    "https://github.com/abdulakhad-turgunaliev",       // ← update
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Full Stack Development",
    "Next.js",
    "Python",
    "Entrepreneurship",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
