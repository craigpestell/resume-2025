'use client';

import { ReactNode, useEffect, useState } from 'react';
import type { Transition } from 'framer-motion';

interface MotionWrapperProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileInView?: Record<string, any>;
  transition?: Transition;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewport?: Record<string, any>;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Motion wrapper that gracefully degrades when JavaScript is disabled
 * or when the user prefers reduced motion
 */
export default function MotionWrapper({
  children,
  initial,
  animate,
  whileInView,
  transition,
  viewport,
  className,
  as = 'div'
}: MotionWrapperProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [MotionComponent, setMotionComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldUseMotion = !prefersReducedMotion;
    setShouldAnimate(shouldUseMotion);
    
    // Dynamically import framer-motion only when needed
    if (shouldUseMotion) {
      import('framer-motion').then(({ motion }) => {
        setMotionComponent(() => motion[as]);
      });
    }
  }, [as]);

  // Before mounting (SSR/initial render), render a regular div that's visible
  if (!mounted) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  // After mounting, use motion if animations are enabled and component is loaded
  if (shouldAnimate && MotionComponent) {
    return (
      <MotionComponent
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        transition={transition}
        viewport={viewport}
        className={className}
      >
        {children}
      </MotionComponent>
    );
  }

  // Fallback to regular element if motion is disabled
  const Component = as;
  return <Component className={className}>{children}</Component>;
}
