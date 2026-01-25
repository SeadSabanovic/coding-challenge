export function resolveApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL;

  if (!raw) {
    if (import.meta.env.DEV) {
      throw new Error(
        'Missing VITE_API_URL. Set frontend/.env VITE_API_URL=http://localhost:3000/api'
      );
    }

    return 'http://localhost:3000/api';
  }

  const url = new URL(raw);

  let pathname = url.pathname;
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  if (!pathname.endsWith('/api')) pathname = `${pathname}/api`;
  url.pathname = pathname;

  return url.toString();
}

export const API_BASE_URL = resolveApiBaseUrl();
