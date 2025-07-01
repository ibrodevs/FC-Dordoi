
const API_URL = 'https://fc-backend-vxea.onrender.com';

export async function fetchPlayers() {
  try {
    const res = await fetch(`${API_URL}/api/players/`);
    if (!res.ok) throw new Error('Ошибка сети');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchCoaches() {
  try {
    const res = await fetch(`${API_URL}/api/coaches/`);
    if (!res.ok) throw new Error('Ошибка сети');
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}