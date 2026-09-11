'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';

const DarkThemeToggleSimple = dynamic(() => import('./DarkThemeToggleSimple'), {
  ssr: false,
  loading: () => (
    <span
      className="inline-flex h-9 w-9 rounded-lg bg-secondary"
      aria-hidden="true"
    />
  ),
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Highlight the nav link for whichever section currently crosses the
    // 100px-from-top line (just below the fixed header). IntersectionObserver
    // gets this from the browser's own rendering pipeline instead of reading
    // layout geometry (getBoundingClientRect) on every scroll event, which
    // forced a synchronous reflow on each of dozens of scroll events/second.
    const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
    const elements = sections
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-100px 0px -100% 0px' }
    );

    elements.forEach(el => observer.observe(el));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only prevent default and use smooth scroll if JavaScript is enabled
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="header-fade fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-sm shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo — opening tag; the footer closes it with </CraigPestell> */}
          <Link href="/" className="font-jetbrains font-bold text-xl text-foreground hover:text-primary">
            {"<CraigPestell>"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`font-semibold text-foreground hover:text-primary transition-colors lg:text-xl relative cursor-pointer ${
                  activeSection === link.href.substring(1) 
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[\'\']' 
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <DarkThemeToggleSimple size="md" variant="secondary" />

            {/* Download Resume Button */}
            <a
              href="/api/resume"
              className="hidden lg:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden bg-card border-t border-border">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`block w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary bg-primary/10 border-l-2 border-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/api/resume"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors ml-4 mt-4"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
