'use client';

import { useState, useEffect, useRef } from 'react';
import { Type } from 'lucide-react';
import { fontOptions, loadGoogleFont } from '@/lib/fontLoader';

export default function FontSelector() {
  const [selectedFont, setSelectedFont] = useState('inconsolata');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load saved font preference
    const savedFont = localStorage.getItem('selected-font') || 'inconsolata';
    setSelectedFont(savedFont);
    applyFont(savedFont);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyFont = async (fontValue: string) => {
    const body = document.body;
    
    // Remove all font classes
    fontOptions.forEach(font => {
      body.classList.remove(font.className);
    });
    
    // Load the font if it's not the default
    if (fontValue !== 'inconsolata') {
      try {
        await loadGoogleFont(fontValue);
      } catch (error) {
        console.error('Failed to load font:', fontValue, error);
      }
    }
    
    // Add the selected font class
    const selectedFontOption = fontOptions.find(font => font.value === fontValue);
    if (selectedFontOption) {
      body.classList.add(selectedFontOption.className);
    }
  };

  const handleFontChange = async (fontValue: string) => {
    setSelectedFont(fontValue);
    localStorage.setItem('selected-font', fontValue);
    await applyFont(fontValue);
    setIsOpen(false);
  };

  const currentFont = fontOptions.find(font => font.value === selectedFont);

  // Show default state for SEO/no-JS, then enhance with JavaScript
  if (!mounted) {
    const defaultFont = fontOptions.find(font => font.value === 'inconsolata');
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
          aria-label="Font selector"
          suppressHydrationWarning
        >
          <Type className="w-4 h-4" />
          <span>{defaultFont?.name || 'Inconsolata'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef} suppressHydrationWarning>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        aria-label="Select font"
        suppressHydrationWarning
      >
        <Type className="w-4 h-4" />
        <span>{currentFont?.name || 'inconsolata'}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[160px] z-50">
          <div className="py-1">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                onClick={() => handleFontChange(font.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  selectedFont === font.value
                    ? 'text-primary bg-primary/10'
                    : 'text-card-foreground'
                }`}
                style={{ fontFamily: getFontFamily(font.value) }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get the actual font family for preview
function getFontFamily(fontValue: string): string {
  const fontFamilies: Record<string, string> = {
    inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
    roboto: 'Roboto, ui-sans-serif, system-ui, sans-serif',
    opensans: 'Open Sans, ui-sans-serif, system-ui, sans-serif',
    poppins: 'Poppins, ui-sans-serif, system-ui, sans-serif',
    montserrat: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
    sourcesans: 'Source Sans 3, ui-sans-serif, system-ui, sans-serif',
    nunito: 'Nunito, ui-sans-serif, system-ui, sans-serif',
    lato: 'Lato, ui-sans-serif, system-ui, sans-serif',
    worksans: 'Work Sans, ui-sans-serif, system-ui, sans-serif',
    dmsans: 'DM Sans, ui-sans-serif, system-ui, sans-serif',
    plusjakarta: 'Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif',
    outfit: 'Outfit, ui-sans-serif, system-ui, sans-serif',
    jetbrains: 'JetBrains Mono, ui-monospace, Menlo, Monaco, monospace',
    firacode: 'Fira Code, ui-monospace, Menlo, Monaco, monospace',
    ubuntu: 'Ubuntu Mono, ui-monospace, Menlo, Monaco, monospace',
    spacemono: 'Space Mono, ui-monospace, Menlo, Monaco, monospace',
    inconsolata: 'Inconsolata, ui-monospace, Menlo, Monaco, monospace',
  };
  
  return fontFamilies[fontValue] || 'ui-sans-serif, system-ui, sans-serif';
}
