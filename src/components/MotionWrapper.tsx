'use client';

import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileInView?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewport?: Record<string, any>;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Compatibility wrapper retained so existing section components can keep their
 * structure without animation-specific markup changes.
 */
export default function MotionWrapper({
  children,
  className,
  as = 'div'
}: MotionWrapperProps) {
  const Component = as;
  return <Component className={className}>{children}</Component>;
}
