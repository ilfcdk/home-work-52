import { mockFetch } from './mockDb';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await mockFetch(url, options);
  if (!res.ok) throw new Error(`Mock API error ${res.status}`);
  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export const apiClient = {
  get:  <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  patch:<T>(url: string, body: unknown) =>
    request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
  delete:<T>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};
