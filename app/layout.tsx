import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { ThemeProvider } from "./provider";

export const metadata: Metadata = {
  title: "Sagar Nepali | Full-Stack Developer & Software Engineer",
  description:
    "Full-stack developer from Kathmandu, Nepal — building fast, scalable, and thoughtfully designed web applications.",
  keywords: [
    "Sagar Nepali",
    "Full-Stack Developer Nepal",
    "React Developer Kathmandu",
    "Next.js Developer Nepal",
    "Software Engineer Nepal",
    "PostgreSQL Node.js Developer",
  ],
  authors: [{ name: "Sagar Nepali" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sagar-nepali.com.np"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sagar Nepali | Full-Stack Developer & Software Engineer",
    description:
      "Full-stack developer from Kathmandu, Nepal — building fast, scalable, and thoughtfully designed web applications.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sagar Nepali Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagar Nepali | Full-Stack Developer & Software Engineer",
    description:
      "Full-stack developer from Kathmandu, Nepal — building fast, scalable, and thoughtfully designed web applications.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#070809] text-[#F4F4F0] antialiased selection:bg-[#67E8F9] selection:text-[#070809]">
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
