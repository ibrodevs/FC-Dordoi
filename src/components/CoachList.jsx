import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoachCard from './CoachCard';
import CoachModal from './CoachModal';

import { fetchCoaches } from '../api';


const CoachList = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Все тренеры' },
    { id: 'head', label: 'Главные тренеры' },
    { id: 'assistant', label: 'Ассистенты' },
    { id: 'gk', label: 'Тренеры вратарей' },
    { id: 'fitness', label: 'Фитнес-тренеры' },
  ];

  useEffect(() => {
  const loadCoaches = async () => {
    setLoading(true);
    try {
      const data = await fetchCoaches();  // импортированная функция
      setCoaches(data);
      setFilteredCoaches(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadCoaches();
}, []);


  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCoaches(coaches);
    } else {
      setFilteredCoaches(coaches.filter(coach => coach.position === activeFilter));
    }
  }, [activeFilter, coaches]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-8">
      Ошибка: {error}. Пожалуйста, попробуйте позже.
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-white">Тренерский штаб</h1>
        
        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Список тренеров */}
        {filteredCoaches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCoaches.map(coach => (
                <CoachCard 
                  key={coach.id} 
                  coach={coach} 
                  onClick={setSelectedCoach}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            Нет тренеров в этой категории
          </div>
        )}
        
        {/* Модальное окно */}
        <CoachModal 
          coach={selectedCoach} 
          onClose={() => setSelectedCoach(null)} 
        />
      </div>
    </div>
  );
};

export default CoachList;