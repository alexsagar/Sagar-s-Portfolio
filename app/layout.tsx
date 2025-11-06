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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0b1024" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
