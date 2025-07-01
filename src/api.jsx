const API_URL = 'https://fc-backend-vxea.onrender.com';

export async function fetchPlayers() {
  try {
    const response = await fetch(`${API_URL}/api/players/`);
    if (!response.ok) throw new Error('Ошибка сети');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCoaches() {
  try {
    const response = await fetch(`${API_URL}/api/coaches/`);
    if (!response.ok) throw new Error('Ошибка сети');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchAcademyCoaches() {
  try {
    const response = await fetch(`${API_URL}/api/academy-coaches/`);
    if (!response.ok) throw new Error('Ошибка сети');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
