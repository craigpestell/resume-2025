import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import DynamicFontLoader from '@/components/DynamicFontLoader';
import { defaultFont } from '@/lib/fontLoader';
import "./globals.css";

export const metadata: Metadata = {
  title: "Craig Pestell - Senior Software Engineer | React, TypeScript, Enterprise Applications",
  description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, Node.js, and enterprise platform architecture. Available for senior engineering roles.",
  keywords: [
    "Senior Software Engineer",
    "React Developer", 
    "TypeScript Expert",
    "Full Stack Developer",
    "Enterprise Applications",
    "Apple Engineer",
    "Google Engineer",
    "Williams Sonoma",
    "Node.js",
    "Next.js",
    "Frontend Architecture",
    "Backend Development",
    "Software Engineering"
  ],
  authors: [{ name: "Craig Pestell" }],
  creator: "Craig Pestell",
  publisher: "Craig Pestell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://craigpestell.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Craig Pestell - Senior Software Engineer",
    description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, and enterprise platform architecture.",
    url: 'https://craigpestell.com',
    siteName: 'Craig Pestell Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Craig Pestell - Senior Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Craig Pestell - Senior Software Engineer",
    description: "Senior Software Engineer with 15+ years at Apple, Google, Williams Sonoma. Expert in React, TypeScript, and enterprise applications.",
    images: ['/images/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'hAqHzu_K3PfENU9q8cAvUnrUkR4i9mICr47ijQr3qgY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="nord" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Add js-enabled class when JavaScript is available
            document.documentElement.classList.add('js-enabled');
          `
        }} />
      </head>
      <body
        className={`${defaultFont.className} ${defaultFont.variable} tracking-normal antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <DynamicFontLoader />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
