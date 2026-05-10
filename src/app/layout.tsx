import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import DynamicFontLoader from '@/components/DynamicFontLoader';
import { portfolioData } from '@/data/portfolio';
import { defaultFont } from '@/lib/fontLoader';
import "./globals.css";

const { personalInfo } = portfolioData;

const siteTitle = `${personalInfo.name} - ${personalInfo.title} | React, TypeScript, Enterprise Applications`;
const siteDescription = `${personalInfo.title} with 15+ years of experience designing enterprise-scale computer systems for organizations including Apple, Google, and Macy's. Expert in React, TypeScript, Node.js, and scalable information workflows.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Senior Computer Systems Analyst",
    "Systems Analysis",
    "React Developer",
    "TypeScript Expert",
    "Enterprise Applications",
    "Apple Engineer",
    "Google Engineer",
    "Macy's",
    "Node.js",
    "Next.js",
    "Information Workflows",
    "Scalable System Infrastructure"
  ],
  authors: [{ name: "Craig Pestell" }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
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
    title: siteTitle,
    description: siteDescription,
    url: 'https://craigpestell.com',
    siteName: 'Craig Pestell Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/banner.webp',
        width: 1280,
        height: 426,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/banner.webp'],
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
