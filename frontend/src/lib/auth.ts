export type AuthTokens = { accessToken: string; refreshToken: string };
export type User = { id: string; username: string };

export type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const saveTokens = (t: AuthTokens) => {
  localStorage.setItem('accessToken', t.accessToken);
  localStorage.setItem('refreshToken', t.refreshToken);
};

export const loadTokens = (): AuthTokens | null => {
  if (typeof window === 'undefined') return null;
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!accessToken || !refreshToken) return null;
  return { accessToken, refreshToken };
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
