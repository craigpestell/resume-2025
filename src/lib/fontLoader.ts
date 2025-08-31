import { Inconsolata } from 'next/font/google';

// Default font (always loaded) - Inconsolata
export const defaultFont = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

// Default font key
export const DEFAULT_FONT = 'inconsolata';

// Get all font names for the selector
export const fontOptions = [
  { name: 'DM Sans', value: 'dmsans', className: 'font-dmsans' },
  { name: 'Fira Code', value: 'firacode', className: 'font-firacode' },
  { name: 'Inconsolata', value: 'inconsolata', className: 'font-inconsolata' },
  { name: 'Inter', value: 'inter', className: 'font-inter' },
  { name: 'JetBrains Mono', value: 'jetbrains', className: 'font-jetbrains' },
  { name: 'Lato', value: 'lato', className: 'font-lato' },
  { name: 'Montserrat', value: 'montserrat', className: 'font-montserrat' },
  { name: 'Nunito', value: 'nunito', className: 'font-nunito' },
  { name: 'Open Sans', value: 'opensans', className: 'font-opensans' },
  { name: 'Outfit', value: 'outfit', className: 'font-outfit' },
  { name: 'Plus Jakarta Sans', value: 'plusjakarta', className: 'font-plusjakarta' },
  { name: 'Poppins', value: 'poppins', className: 'font-poppins' },
  { name: 'Roboto', value: 'roboto', className: 'font-roboto' },
  { name: 'Source Sans 3', value: 'sourcesans', className: 'font-sourcesans' },
  { name: 'Space Mono', value: 'spacemono', className: 'font-spacemono' },
  { name: 'Ubuntu Mono', value: 'ubuntu', className: 'font-ubuntu' },
  { name: 'Work Sans', value: 'worksans', className: 'font-worksans' },
];

// Client-side font loading with Google Fonts API
export async function loadGoogleFont(fontKey: string): Promise<void> {
  if (typeof window === 'undefined') return;
  
  const fontMap: Record<string, string> = {
    inter: 'Inter:wght@300;400;500;700',
    roboto: 'Roboto:wght@300;400;500;700',
    opensans: 'Open+Sans:wght@300;400;500;600;700',
    poppins: 'Poppins:wght@300;400;500;600;700',
    montserrat: 'Montserrat:wght@300;400;500;600;700',
    sourcesans: 'Source+Sans+3:wght@300;400;500;600;700',
    nunito: 'Nunito:wght@300;400;500;600;700',
    lato: 'Lato:wght@300;400;700;900',
    worksans: 'Work+Sans:wght@300;400;500;600;700',
    dmsans: 'DM+Sans:wght@300;400;500;600;700',
    plusjakarta: 'Plus+Jakarta+Sans:wght@300;400;500;600;700',
    outfit: 'Outfit:wght@300;400;500;600;700',
    jetbrains: 'JetBrains+Mono:wght@300;400;500;600;700',
    firacode: 'Fira+Code:wght@300;400;500;600;700',
    ubuntu: 'Ubuntu+Mono:wght@400;700',
    spacemono: 'Space+Mono:wght@400;700',
    inconsolata: 'Inconsolata:wght@300;400;500;600;700',
  };

  const fontQuery = fontMap[fontKey];
  if (!fontQuery) return;

  // Check if font is already loaded
  if (document.querySelector(`link[href*="${fontQuery}"]`)) {
    return;
  }

  // Create and append font link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}&display=swap`;
  
  // Add loading promise
  return new Promise((resolve, reject) => {
    link.onload = () => {
      // Set CSS variable for the loaded font
      const fontFamilyMap: Record<string, string> = {
        inter: 'Inter',
        roboto: 'Roboto',
        opensans: 'Open Sans',
        poppins: 'Poppins',
        montserrat: 'Montserrat',
        sourcesans: 'Source Sans 3',
        nunito: 'Nunito',
        lato: 'Lato',
        worksans: 'Work Sans',
        dmsans: 'DM Sans',
        plusjakarta: 'Plus Jakarta Sans',
        outfit: 'Outfit',
        jetbrains: 'JetBrains Mono',
        firacode: 'Fira Code',
        ubuntu: 'Ubuntu Mono',
        spacemono: 'Space Mono',
        inconsolata: 'Inconsolata',
      };
      
      const fontFamily = fontFamilyMap[fontKey];
      if (fontFamily) {
        document.documentElement.style.setProperty(`--font-${fontKey}`, fontFamily);
      }
      
      resolve();
    };
    link.onerror = () => reject();
    document.head.appendChild(link);
  });
}
