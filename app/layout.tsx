import type { Metadata } from "next";
import "./globals.css";
import FloatingRobot from "@/components/FloatingRobot";

const FULL_NAME = "Abdulakhad Turgunaliev";
const SITE_URL = "https://abdulakhad-turgunaliev.netlify.app"; // ← update after deploying
const TAGLINE = "Entrepreneur | Accountant | Software Engineer";
const META_DESCRIPTION =
  "Abdulakhad Turgunaliev — Young Entrepreneur from Uzbekistan specializing in mobile and app development. Strong background in Accounting.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${FULL_NAME} — ${TAGLINE}`,
    template: `%s | ${FULL_NAME}`,
  },
  description: META_DESCRIPTION,
  keywords: [
    "Abdulakhad Turgunaliev",
    "Abdulaxad Turg'unaliyev",
    "Абдулахад Тургуналиев",
    "Abdulakhad",
    "Abdulaxad",
    "Абдулахад",
    "Тургуналиев",
    "Turgunaliev",
    "Turg'unaliyev",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png",    type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple:    "/apple-touch-icon.png",
  },
};

// JSON-LD Person schema — the most important SEO signal for name searches
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdulakhad Turgunaliev",
  birthDate: "2005-09-02",
  url: SITE_URL,
  image: `${SITE_URL}/Abdulakhad-Turgunaliev.png`,
  jobTitle: "Entrepreneur, Full-Stack Developer",
  description: META_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressCountry: "Canada",
  },
  sameAs: [
    "https://linkedin.com/in/abdulakhad-turgunaliev",
    "https://github.com/abdulakhad-turgunaliev",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Web Development",
    "Business Development",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="O7Kc5EKsqXSSrMn1dbZ8xCQFLLE8rce4Ti6-OZukvyg" />
      </head>
      <body className="antialiased">
        {children}
        <FloatingRobot />
      </body>
    </html>
  );
}
