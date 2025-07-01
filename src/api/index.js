// src/api/index.js
export async function fetchPlayers() {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://fc-backend-vxea.onrender.com'; // URL твоего бэкенда
  const response = await fetch(`${apiUrl}/api/players/`);
  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }
  const data = await response.json();
  return data;
}
