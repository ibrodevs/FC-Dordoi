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
    const response = await fetch(`${API_URL}/coaches/api/`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    console.log('Данные тренеров из API:', data);
    return data;
  } catch (err) {
    console.error('Ошибка в fetchCoaches:', err);
    throw err;
  }
}
