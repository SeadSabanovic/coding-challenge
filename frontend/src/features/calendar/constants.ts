import type { EventColor } from './types';

// Time grid constants
export const HOUR_HEIGHT = 60; // pixels per hour

// Event color options for color picker
export const EVENT_COLORS: { value: EventColor; label: string; class: string }[] = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
];

// Event block colors (Day/Week views)
export const EVENT_BLOCK_COLORS: Record<EventColor, string> = {
  blue: 'bg-blue-100 border-blue-300 text-blue-800',
  green: 'bg-green-100 border-green-300 text-green-800',
  red: 'bg-red-100 border-red-300 text-red-800',
  yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  purple: 'bg-purple-100 border-purple-300 text-purple-800',
  orange: 'bg-orange-100 border-orange-300 text-orange-800',
};

// Event badge colors (Month view)
export const EVENT_BADGE_COLORS: Record<EventColor, string> = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700 [&_.dot]:bg-blue-500',
  green: 'border-green-200 bg-green-50 text-green-700 [&_.dot]:bg-green-500',
  red: 'border-red-200 bg-red-50 text-red-700 [&_.dot]:bg-red-500',
  yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700 [&_.dot]:bg-yellow-500',
  purple: 'border-purple-200 bg-purple-50 text-purple-700 [&_.dot]:bg-purple-500',
  orange: 'border-orange-200 bg-orange-50 text-orange-700 [&_.dot]:bg-orange-500',
};

// Popular timezones (IANA format)
export const TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
  { value: 'Europe/Sarajevo', label: 'Sarajevo (CET/CEST)' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)' },
  { value: 'America/Denver', label: 'Denver (MST/MDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'Kolkata (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
];

// Get browser's default timezone
export const getDefaultTimezone = (): string => {
  const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Return browser timezone if it's in our list, otherwise UTC
  return TIMEZONES.some((tz) => tz.value === browserTz) ? browserTz : 'UTC';
};
