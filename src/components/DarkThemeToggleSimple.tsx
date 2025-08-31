'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface DarkThemeToggleSimpleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'secondary' | 'ghost';
  showLabel?: boolean;
}

export default function DarkThemeToggleSimple({ 
  className = '', 
  size = 'md',
  variant = 'secondary',
  showLabel = false 
}: DarkThemeToggleSimpleProps) {
  const { isDarkMode, setDarkMode, isHydrated } = useTheme();

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      default: return 'w-5 h-5';
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none';
    
    let sizeClasses = '';
    switch (size) {
      case 'sm':
        sizeClasses = showLabel ? 'px-2 py-1 text-sm' : 'p-1';
        break;
      case 'md':
        sizeClasses = showLabel ? 'px-3 py-2 text-sm' : 'p-2';
        break;
      case 'lg':
        sizeClasses = showLabel ? 'px-4 py-2 text-base' : 'p-3';
        break;
    }

    let variantClasses = '';
    switch (variant) {
      case 'default':
        variantClasses = 'bg-primary hover:bg-primary/90 text-primary-foreground';
        break;
      case 'secondary':
        variantClasses = 'bg-secondary hover:bg-secondary/80 text-secondary-foreground';
        break;
      case 'ghost':
        variantClasses = 'text-muted-foreground hover:text-foreground hover:bg-muted';
        break;
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;
  };

  const getThemeIcon = () => {
    const iconClass = getIconSize();
    return isDarkMode ? <Sun className={iconClass} /> : <Moon className={iconClass} />;
  };

  const getThemeLabel = () => {
    return isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  // Show default state for SEO/no-JS (light mode), then enhance with JavaScript
  if (!isHydrated) {
    return (
      <button
        className={getButtonClasses()}
        aria-label="Theme toggle (loading, default light mode)"
        disabled
        suppressHydrationWarning
      >
        <Sun className={getIconSize()} />
        {showLabel && (
          <span>Light</span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={getButtonClasses()}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
      suppressHydrationWarning
    >
      {getThemeIcon()}
      {showLabel && (
        <span>{isDarkMode ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}
