// Shared "Mon YYYY" formatting for experience/project dates, used by both the
// web UI and the generated resume PDF so they never drift from each other.

export function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  if (year && month) {
    return new Date(year, month - 1, day ?? 1);
  }
  return new Date(dateString);
}

export function formatShortMonthYear(dateString: string): string {
  const date = parseDateString(dateString);
  const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  // Intl abbreviates September as "Sep"; we spell it "Sept" everywhere for consistency.
  return formatted.replace(/^Sep\b/, 'Sept');
}
