'use client';

import { useEffect } from 'react';
import { loadGoogleFont, fontOptions } from '@/lib/fontLoader';

export default function DynamicFontLoader() {
  useEffect(() => {
    // Load user's preferred font if it's different from default
    const savedFont = localStorage.getItem('selected-font');
    if (savedFont && savedFont !== 'inconsolata') {
      loadGoogleFont(savedFont).catch(console.error);
      
      // Apply the font class to body
      const selectedFontOption = fontOptions.find(font => font.value === savedFont);
      if (selectedFontOption) {
        document.body.classList.add(selectedFontOption.className);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
