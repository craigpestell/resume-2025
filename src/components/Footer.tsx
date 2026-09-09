'use client';

import { ArrowUp } from 'lucide-react';
import { PersonalInfo } from '@/data/portfolio';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export default function Footer({ personalInfo }: FooterProps) {
  const scrollToTop = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative border-t border-border"
      style={{
        background: 'color-mix(in srgb, var(--primary) 7%, var(--background))',
      }}
    >
      {/* Primary hairline along the top edge — echoes the header's fade. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, color-mix(in srgb, var(--primary) 70%, transparent), transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl pt-20 pb-10 md:pt-24 md:pb-12">
          <h2 className="max-w-[24ch] text-2xl md:text-3xl font-semibold leading-snug text-foreground">
            Building something people need to rely on?
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            That&apos;s the work I do best. Send me the details.
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="font-jetbrains mt-8 inline-block text-foreground underline-offset-8 hover:underline focus-visible:underline focus-visible:outline-none"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)' }}
          >
            {personalInfo.email}
          </a>

          <div className="mt-8 flex flex-col gap-1 text-sm text-muted-foreground">
            <span>Based in {personalInfo.location}. Working Pacific hours, open to remote.</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-primary underline-offset-4 hover:text-primary/80 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* The closing tag: the page's terminal mark, rhyming with the header logo. */}
        <div className="flex flex-col items-start gap-4 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <p
            aria-hidden="true"
            className="font-jetbrains max-w-full select-none font-bold leading-none tracking-tight text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 8vw, 6rem)' }}
          >
            &lt;/CraigPestell&gt;
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex shrink-0 items-center gap-1.5 pb-2 text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 font-jetbrains text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {personalInfo.name}
          </span>
          <span>Built with Next.js and Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
