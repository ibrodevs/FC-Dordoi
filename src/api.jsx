export const fetchPlayers = async () => {
  const response = await fetch('http://localhost:8000/api/players/');
  if (!response.ok) throw new Error('Ошибка загрузки данных');
  return response.json();
};

export const fetchCoaches = async () => {
  const response = await fetch('http://localhost:8000/api/coaches/');
  if (!response.ok) throw new Error('Ошибка загрузки данных');
  return response.json();
};