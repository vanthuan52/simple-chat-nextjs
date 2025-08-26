import { CONFIG } from '@/common/config';
import { clearTokens } from './auth';

export async function api<T>(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

  let res: Response;
  try {
    res = await fetch(`${CONFIG.API_BASE}${path}`, {
      ...init,
      headers,
      cache: 'no-store',
    });
  } catch (err: any) {
    throw new Error('BACKEND_UNAVAILABLE');
  }
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      clearTokens();
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}
