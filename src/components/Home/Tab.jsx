import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatchesPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [calendarView, setCalendarView] = useState(false);

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setMatches(activeTab === 'upcoming' ? upcomingMatches : pastMatches);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeTab, selectedMonth]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredMatches = matches.filter(match => {
    const matchMonth = parseInt(match.date.split('.')[1]) - 1;
    return matchMonth === selectedMonth;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-900 text-white relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400 opacity-10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Шапка с параллакс эффектом */}
      <motion.header 
        className="py-12 px-4 text-center relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            background: 'linear-gradient(to right, #facc15, #ffffff, #facc15)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 10px rgba(250, 204, 21, 0.3)'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          ФК "Дордой"
        </motion.h1>
        <p className="text-xl md:text-2xl text-blue-300 font-light tracking-wider">
          Календарь матчей и результаты
        </p>
      </motion.header>

      {/* Переключатель вида */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCalendarView(false)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              !calendarView
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                : 'bg-transparent text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10'
            }`}
          >
            Список
          </button>
          <button
            onClick={() => setCalendarView(true)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              calendarView
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                : 'bg-transparent text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:bg-opacity-10'
            }`}
          >
            Календарь
          </button>
        </div>
      </div>

      {/* Выбор месяца */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="flex items-center space-x-2 bg-black bg-opacity-40 rounded-full px-4 py-2 border border-blue-700">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`px-4 py-1 rounded-full text-sm transition-all duration-300 ${
                selectedMonth === index
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-white hover:bg-blue-800 hover:bg-opacity-50'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Табы */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="flex bg-black bg-opacity-40 rounded-full overflow-hidden border border-blue-700 shadow-lg">
          <button
            onClick={() => handleTabChange('upcoming')}
            className={`px-8 py-3 font-semibold transition-all duration-300 flex items-center ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'text-yellow-400 hover:bg-blue-800 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Ближайшие
          </button>
          <button
            onClick={() => handleTabChange('past')}
            className={`px-8 py-3 font-semibold transition-all duration-300 flex items-center ${
              activeTab === 'past'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'text-yellow-400 hover:bg-blue-800 hover:bg-opacity-50'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            Прошедшие
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="container mx-auto px-4 pb-16 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        ) : calendarView ? (
          <CalendarView matches={filteredMatches} isPast={activeTab === 'past'} />
        ) : (
          <AnimatePresence>
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <MatchCard 
                    key={`${index}-${match.date}`} 
                    match={match} 
                    isPast={activeTab === 'past'} 
                    index={index}
                  />
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-16 text-blue-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg className="w-16 h-16 mx-auto mb-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-2">Матчей не найдено</h3>
                  <p>В выбранном месяце нет {activeTab === 'upcoming' ? 'запланированных' : 'сыгранных'} матчей</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Декоративные элементы */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
};

const MatchCard = ({ match, isPast, index }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 to-blue-900 border-2 border-yellow-400 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-500 group"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Эффект свечения при наведении */}
      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      
      {/* Верхний декоративный элемент */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400" />
      
      {/* Основное содержимое */}
      <div className="p-6">
        {/* Турнир и дата */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium text-yellow-300">
            {match.tournament}
          </span>
          <span className="text-sm font-light text-blue-200">
            {match.date}
          </span>
        </div>
        
        {/* Команды и счет */}
        <div className="flex justify-between items-center py-4">
          <div className="flex flex-col items-center w-1/3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden shadow-md">
              <img src={match.homeLogo} alt={match.homeTeam} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <span className="text-center font-bold text-sm md:text-base">{match.homeTeam}</span>
          </div>
          
          <div className="flex flex-col items-center mx-2 w-1/3">
            {isPast ? (
              <>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">
                  {match.score.home} - {match.score.away}
                </div>
                <div className="text-xs text-white opacity-70">Финальный счет</div>
              </>
            ) : (
              <>
                <div className="text-xl md:text-2xl font-bold text-yellow-400 mb-1">
                  {match.time}
                </div>
                <div className="text-xs text-white opacity-70">Время</div>
              </>
            )}
          </div>
          
          <div className="flex flex-col items-center w-1/3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden shadow-md">
              <img src={match.awayLogo} alt={match.awayTeam} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>
            <span className="text-center font-bold text-sm md:text-base">{match.awayTeam}</span>
          </div>
        </div>
        
        {/* Место проведения */}
        <div className="mt-4 flex items-center justify-center text-sm text-blue-200">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {match.location}
        </div>
        
        {/* События матча (для прошедших) */}
        {isPast && match.events && (
          <div className="mt-6 pt-4 border-t border-blue-700">
            <h4 className="font-bold text-yellow-300 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Ключевые моменты
            </h4>
            <ul className="space-y-2">
              {match.events.slice(0, 3).map((event, i) => (
                <li key={i} className="flex items-start">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full mr-2 mt-0.5 flex-shrink-0 ${
                    event.type === 'goal' ? 'bg-green-500' : 
                    event.type === 'card-yellow' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}>
                    {event.type === 'goal' ? (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : event.type === 'card-yellow' ? (
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm">{event.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Кнопка */}
        <motion.div 
          className="mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
            {isPast ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Обзор матча
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Купить билет
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CalendarView = ({ matches, isPast }) => {
  const daysInMonth = new Date(2023, 7, 0).getDate(); // Для июля 2023
  const firstDayOfMonth = new Date(2023, 6, 1).getDay(); // 0 - воскресенье, 1 - понедельник и т.д.
  
  const matchDays = matches.map(match => parseInt(match.date.split('.')[0]));
  
  return (
    <motion.div 
      className="bg-black bg-opacity-30 rounded-2xl p-6 backdrop-blur-sm border border-blue-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-7 gap-2">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="text-center font-bold text-yellow-400 pb-2">
            {day}
          </div>
        ))}
        
        {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill().map((_, i) => (
          <div key={`empty-${i}`} className="h-12"></div>
        ))}
        
        {Array(daysInMonth).fill().map((_, i) => {
          const day = i + 1;
          const hasMatch = matchDays.includes(day);
          const match = matches.find(m => parseInt(m.date.split('.')[0]) === day);
          
          return (
            <motion.div
              key={day}
              className={`h-24 border rounded-lg p-1 overflow-hidden transition-all duration-300 ${
                hasMatch 
                  ? 'border-yellow-400 bg-blue-900 bg-opacity-50 shadow-md'
                  : 'border-blue-800 hover:border-blue-600'
              }`}
              whileHover={{ scale: hasMatch ? 1.05 : 1.02 }}
            >
              <div className="text-right text-sm mb-1">{day}</div>
              {hasMatch && (
                <div className="text-xs">
                  <div className="font-bold truncate">{match.tournament}</div>
                  <div className="flex items-center justify-between">
                    <span className="truncate">{match.homeTeam}</span>
                    {isPast ? (
                      <span className="font-bold text-yellow-400">
                        {match.score.home}-{match.score.away}
                      </span>
                    ) : (
                      <span className="text-yellow-400">{match.time}</span>
                    )}
                  </div>
                  <div className="truncate">{match.awayTeam}</div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Моковые данные (расширенные)
const upcomingMatches = [
  // Июль
  {
    homeTeam: "Дордой",
    awayTeam: "Алга",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=A",
    date: "15.07.2023",
    time: "18:00",
    tournament: "Премьер Лига",
    location: "Стадион Дордой, Бишкек",
  },
  {
    homeTeam: "Дордой",
    awayTeam: "Абдыш-Ата",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=AA",
    date: "22.07.2023",
    time: "17:30",
    tournament: "Премьер Лига",
    location: "Стадион Дордой, Бишкек",
  },
  {
    homeTeam: "Нефтчи",
    awayTeam: "Дордой",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=N",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    date: "30.07.2023",
    time: "19:00",
    tournament: "Премьер Лига",
    location: "Стадион Нефтчи, Кочкор-Ата",
  },
  // Август
  {
    homeTeam: "Дордой",
    awayTeam: "Алай",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=AL",
    date: "05.08.2023",
    time: "17:00",
    tournament: "Кубок Кыргызстана",
    location: "Стадион Дордой, Бишкек",
  },
  {
    homeTeam: "Кара-Балта",
    awayTeam: "Дордой",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=KB",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    date: "12.08.2023",
    time: "16:00",
    tournament: "Премьер Лига",
    location: "Городской стадион, Кара-Балта",
  },
  {
    homeTeam: "Дордой",
    awayTeam: "Алга",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=A",
    date: "19.08.2023",
    time: "18:30",
    tournament: "Премьер Лига",
    location: "Стадион Дордой, Бишкек",
  },
  {
    homeTeam: "Абдыш-Ата",
    awayTeam: "Дордой",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=AA",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    date: "26.08.2023",
    time: "17:00",
    tournament: "Кубок Кыргызстана",
    location: "Стадион Абдыш-Ата, Кант",
  },
];

const pastMatches = [
  // Июль
  {
    homeTeam: "Дордой",
    awayTeam: "Алай",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=AL",
    date: "08.07.2023",
    score: { home: 3, away: 1 },
    tournament: "Премьер Лига",
    location: "Стадион Дордой, Бишкек",
    events: [
      { type: 'goal', text: 'Гол: Исмаилов (15\')' },
      { type: 'goal', text: 'Гол: Петров (42\')' },
      { type: 'card-yellow', text: 'Желтая карточка: Сидоров (65\')' },
      { type: 'goal', text: 'Гол: Алиев (78\')' },
    ],
  },
  // Июнь
  {
    homeTeam: "Дордой",
    awayTeam: "Кара-Балта",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=KB",
    date: "24.06.2023",
    score: { home: 2, away: 0 },
    tournament: "Кубок Кыргызстана",
    location: "Стадион Дордой, Бишкек",
    events: [
      { type: 'goal', text: 'Гол: Иванов (28\')' },
      { type: 'goal', text: 'Гол: Смирнов (67\')' },
      { type: 'card-yellow', text: 'Желтая карточка: Козлов (45\')' },
    ],
  },
  {
    homeTeam: "Алга",
    awayTeam: "Дордой",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=A",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    date: "17.06.2023",
    score: { home: 1, away: 1 },
    tournament: "Премьер Лига",
    location: "Стадион Алга, Бишкек",
    events: [
      { type: 'goal', text: 'Гол: Федоров (12\')' },
      { type: 'card-red', text: 'Красная карточка: Васильев (55\')' },
      { type: 'goal', text: 'Гол: Орлов (89\')' },
    ],
  },
  // Май
  {
    homeTeam: "Дордой",
    awayTeam: "Нефтчи",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=N",
    date: "13.05.2023",
    score: { home: 4, away: 0 },
    tournament: "Премьер Лига",
    location: "Стадион Дордой, Бишкек",
    events: [
      { type: 'goal', text: 'Гол: Петров (8\')' },
      { type: 'goal', text: 'Гол: Иванов (23\')' },
      { type: 'goal', text: 'Гол: Сидоров (45\')' },
      { type: 'goal', text: 'Гол: Алиев (76\')' },
    ],
  },
  {
    homeTeam: "Абдыш-Ата",
    awayTeam: "Дордой",
    homeLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=AA",
    awayLogo: "https://via.placeholder.com/100/1E40AF/FFFFFF?text=D",
    date: "06.05.2023",
    score: { home: 0, away: 2 },
    tournament: "Премьер Лига",
    location: "Стадион Абдыш-Ата, Кант",
    events: [
      { type: 'goal', text: 'Гол: Орлов (34\')' },
      { type: 'goal', text: 'Гол: Федоров (67\')' },
      { type: 'card-yellow', text: 'Желтая карточка: Козлов (72\')' },
    ],
  },
];

export default MatchesPage;