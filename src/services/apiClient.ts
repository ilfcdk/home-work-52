// src/services/apiClient.ts
import { apiClient as mockApiClient } from './apiClient.mock';

const useMock =
  import.meta.env.VITE_USE_MOCK === '1' ||
  import.meta.env.VITE_USE_MOCK === 'true';

const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  // 204
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

const realApiClient = {
  get:  <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  patch:<T>(url: string, body: unknown) =>
    request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete:<T>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};

export const apiClient = useMock ? mockApiClient : realApiClient;
