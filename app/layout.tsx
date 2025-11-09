import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sagar Nepali | Digital Marketer & MERN Developer",
  description:
    "Digital Marketer & MERN Stack Developer from Kathmandu, Nepal — building responsive web apps and impactful digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sagar Nepali | Digital Marketer & MERN Developer",
    description:
      "Digital Marketer & MERN Stack Developer from Kathmandu, Nepal — building responsive web apps and impactful digital experiences.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sagar Nepali Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Nepali | Digital Marketer & MERN Developer",
    description:
      "Digital Marketer & MERN Stack Developer from Kathmandu, Nepal — building responsive web apps and impactful digital experiences.",
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
        <link rel="icon" href="/profilepic.svg" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b1024" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        ) : null}
        <script
          type="application/ld+json"
          // Note: replace siteUrl in env for production
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sagar Nepali",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np",
              jobTitle: "Digital Marketer & MERN Stack Developer",
              sameAs: [
                "https://github.com/alexsagar",
                "https://www.linkedin.com/in/sagar-nepali-293751217/",
                "https://www.instagram.com/unsagarized/",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kathmandu",
                addressCountry: "NP",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sagar Nepali Portfolio",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
