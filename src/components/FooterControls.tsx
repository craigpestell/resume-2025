'use client';

import FontSelector from './FontSelector';
import LetterSpacingSelector from './LetterSpacingSelector';
import ThemeChooser from './ThemeChooser';
import HydrationSafeWrapper from './HydrationSafeWrapper';

/**
 * Footer controls component that shows theme/font controls only when JavaScript is enabled.
 * This prevents showing non-functional controls when JavaScript is disabled.
 */
export default function FooterControls() {
  return (
    <HydrationSafeWrapper 
      as="fragment"
      fallback={null}
    >
      <div className="flex flex-wrap items-center justify-center gap-6">
        <ThemeChooser 
          showLabels={true}
          spacing="sm"
          darkToggleVariant="ghost"
          darkToggleSize="sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Font:</span>
          <FontSelector />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Spacing:</span>
          <LetterSpacingSelector />
        </div>
      </div>
    </HydrationSafeWrapper>
  );
}
