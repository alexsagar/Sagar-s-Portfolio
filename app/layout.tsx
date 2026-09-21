import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import "./creative.css";
import { ThemeProvider } from "./provider";
import SmoothScroll from "@/components/portfolio/SmoothScroll";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Sagar Nepali | Digital Marketing & Website Development Specialist Kathmandu",
  description:
    "Sagar Nepali is a Digital Marketing Specialist and Website Developer based in Kathmandu, Nepal. Providing custom Next.js/React website development, SEO, performance marketing, photo editing, and video editing services.",
  keywords: [
    "Digital Marketing",
    "Digital Marketing Nepal",
    "Digital Marketer Kathmandu",
    "Website Development",
    "Website Development Nepal",
    "Web Developer Kathmandu",
    "Website Design Kathmandu",
    "SEO Specialist Nepal",
    "Search Engine Optimization Kathmandu",
    "Performance Marketing Nepal",
    "Social Media Marketing Kathmandu",
    "React Developer Nepal",
    "Next.js Developer Nepal",
    "Photo Editing Nepal",
    "Video Editing Nepal",
    "DA Investment Digital Marketer",
    "Sagar Nepali",
  ],
  authors: [{ name: "Sagar Nepali" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sagar Nepali | Digital Marketing & Website Development Specialist Kathmandu",
    description:
      "Digital marketing, custom website development, SEO optimization, and creative media by Sagar Nepali, based in Kathmandu, Nepal.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sagar Nepali - Digital Marketing & Website Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Nepali | Digital Marketing & Website Development Specialist Kathmandu",
    description:
      "Digital marketing, custom website development, SEO optimization, and creative media by Sagar Nepali, based in Kathmandu, Nepal.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/profilepic.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#141414" />
        {/** Preconnects removed to avoid unused-preconnect warnings; Next/font handles fonts. */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Sagar Nepali",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np",
                jobTitle: "Digital Marketing Specialist & Website Developer",
                image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"}/profilepic.webp`,
                sameAs: [
                  "https://github.com/alexsagar",
                  "https://www.linkedin.com/in/sagar-nepali-293751217/",
                  "https://www.instagram.com/unsagarized/",
                ],
                worksFor: {
                  "@type": "Organization",
                  name: "DA Investment Pvt. Ltd.",
                  url: "https://np.linkedin.com/company/dainepaldd",
                },
                knowsAbout: [
                  "Digital Marketing",
                  "Website Development",
                  "Search Engine Optimization (SEO)",
                  "Performance Marketing",
                  "Social Media Marketing",
                  "React.js",
                  "Next.js",
                  "Photo Editing",
                  "Video Editing",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Kathmandu",
                  addressRegion: "Bagmati",
                  addressCountry: "NP",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Sagar Nepali - Digital Marketing & Website Development",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np",
                image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"}/profilepic.webp`,
                description: "Professional website development, digital marketing campaigns, search engine optimization (SEO), photo and video editing services in Kathmandu, Nepal.",
                priceRange: "$$",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Kathmandu",
                  addressRegion: "Bagmati",
                  addressCountry: "NP",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 27.7172,
                  longitude: 85.3240,
                },
                knowsAbout: [
                  "Digital Marketing",
                  "Website Development",
                  "SEO Strategy",
                  "Performance Ads",
                  "Video Editing",
                  "Photo Editing",
                ],
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Creative & Marketing Services",
                  itemListElement: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Website Design & Development",
                        description: "Lightning-fast, mobile-first websites designed and engineered with Next.js, React, and Tailwind CSS.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Digital Marketing & Performance Campaigns",
                        description: "High-ROI digital advertising and growth marketing across Meta, Google, and social platforms.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Search Engine Optimization (SEO)",
                        description: "Local SEO, technical search architecture, and keyword optimization to rank higher on Google.",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "Photo & Video Editing",
                        description: "Commercial post-production, storytelling reels, and high-impact brand visuals using Adobe Photoshop & After Effects.",
                      },
                    },
                  ],
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Sagar Nepali Portfolio & Insights",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np",
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"}/blog?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
