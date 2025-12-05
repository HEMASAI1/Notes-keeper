const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(`Request failed: ${res.status} ${res.statusText} ${text || ''}`);
  }
  // If no content
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchNotes(q = '') {
  const url = `/notes${q ? `?q=${encodeURIComponent(q)}` : ''}`;
  return request(url);
}

export async function createNote(data) {
  return request(`/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function updateNote(id, updates) {
  return request(`/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
}

export async function deleteNote(id) {
  return request(`/notes/${id}`, { method: 'DELETE' });
}
