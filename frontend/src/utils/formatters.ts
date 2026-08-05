/**
 * Formats a date string (ISO or YYYY-MM-DD) into a human readable format (e.g. "Jan 2024").
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

/**
 * Formats date range (e.g. "Jan 2022 - Present" or "Mar 2020 - Dec 2021").
 */
export function formatDateRange(startDate: string, endDate?: string, current?: boolean): string {
  const start = formatDate(startDate);
  if (current || !endDate) {
    return `${start} — Present`;
  }
  const end = formatDate(endDate);
  return `${start} — ${end}`;
}

/**
 * Truncates text to a specified max length with an ellipsis.
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
