const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
export const apiBaseHost = rawCodespaceName
  ? `https://${rawCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const API_BASE_URL = `${apiBaseHost}/api`;
export const isCodespaceFallback = !rawCodespaceName;

export function apiUrl(resource) {
  return `${API_BASE_URL}/${resource}`;
}

export async function fetchApiData(resource) {
  const response = await fetch(apiUrl(resource));
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload?.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  const firstArray = Object.values(payload).find((value) => Array.isArray(value));
  return Array.isArray(firstArray) ? firstArray : [];
}
