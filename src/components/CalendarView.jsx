import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight, FiBell, FiZap } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import MatchCard from './MatchCard';

// Демо-матчи
const demoMatches = [
  {
    id: 1,
    date: '2025-06-15',
    time: '19:00',
    homeTeam: 'Дордой',
    awayTeam: 'Алга',
    homeLogo: '/ФК_Дордой.png',
    awayLogo: '/FK_Alga_Bishkek_Logo.svg.png',
    league: 'РПЛ',
    isLive: false,
    homeScore: null,
    awayScore: null
  },
  {
    id: 2,
    date: '2025-06-18',
    time: '21:30',
    homeTeam: 'Дордой',
    awayTeam: 'Абдыш-Ата',
    homeLogo: '/ФК_Дордой.png',
    awayLogo: '/Эмблема_ФК_Абдыш-Ата.svg.png',
    league: 'РПЛ',
    isLive: false,
    homeScore: null,
    awayScore: null
  },
  {
    id: 3,
    date: '2025-06-25',
    time: '18:00',
    homeTeam: 'Дордой',
    awayTeam: 'Нефтчи',
    homeLogo: '/ФК_Дордой.png',
    awayLogo: '/ФК_Нефтчи_(Кочкор-Ата).png',
    league: 'РПЛ',
    isLive: false,
    homeScore: null,
    awayScore: null
  }
];

const CalendarView = ({ matches = demoMatches }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [direction, setDirection] = useState(0);

  // Форматирование даты в YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Получение дней месяца
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const days = [];
    
    // Дни предыдущего месяца
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 2, day);
      days.push({
        day,
        currentMonth: false,
        date: formatDate(date)
      });
    }
    
    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      days.push({
        day: i,
        currentMonth: true,
        date: formatDate(date)
      });
    }
    
    // Дни следующего месяца
    const daysToAdd = 42 - days.length;
    for (let i = 1; i <= daysToAdd; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        currentMonth: false,
        date: formatDate(date)
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(year, month);
  const matchDatesSet = new Set(matches.map(m => m.date));
  const selectedDateMatches = matches.filter(m => m.date === selectedDate);
  const matchCountByDate = matches.reduce((acc, match) => {
    acc[match.date] = (acc[match.date] || 0) + 1;
    return acc;
  }, {});

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 
    'Май', 'Июнь', 'Июль', 'Август', 
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const changeMonth = (dir) => {
    setDirection(dir);
    if (dir === -1) {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  const handleReminder = () => {
    toast.success(
      <div>
        <p className="font-medium">Мы уведомим вас о матчах!</p>
        <p className="text-sm text-gray-200">Напоминание установлено на {new Date(selectedDate).toLocaleDateString('ru-RU')}</p>
      </div>,
      {
        icon: <FiBell className="text-yellow-400" />,
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
        },
        duration: 4000
      }
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Только при первом рендере выбираем ближайший матч
  useEffect(() => {
    if (selectedDateMatches.length === 0 && selectedDate === today) {
      const futureMatches = matches.filter(m => m.date >= today);
      if (futureMatches.length > 0) {
        setSelectedDate(futureMatches[0].date);
      }
    }
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="relative"
        >
          <FiCalendar className="text-3xl text-yellow-400 mr-3" />
          <motion.span 
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Календарь матчей
        </h2>
      </motion.div>

      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={() => changeMonth(-1)}
          whileHover={{ scale: 1.05, backgroundColor: '#4B5563' }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-gray-700 text-white transition-all flex items-center justify-center w-12 h-12"
          aria-label="Предыдущий месяц"
        >
          <FiChevronLeft className="text-xl" />
        </motion.button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`month-${month}-${year}`}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            className="text-xl font-bold text-yellow-400 px-6 py-3 bg-gray-700 rounded-xl flex items-center justify-center min-w-[200px] shadow-lg"
          >
            {monthNames[month - 1]} {year}
          </motion.div>
        </AnimatePresence>
        
        <motion.button
          onClick={() => changeMonth(1)}
          whileHover={{ scale: 1.05, backgroundColor: '#4B5563' }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-gray-700 text-white transition-all flex items-center justify-center w-12 h-12"
          aria-label="Следующий месяц"
        >
          <FiChevronRight className="text-xl" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-700"
      >
        <div className="grid grid-cols-7 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 text-center font-medium py-4">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <motion.div 
              key={day} 
              className="text-yellow-300 text-sm uppercase tracking-wider"
              whileHover={{ scale: 1.1 }}
            >
              {day}
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 p-2">
          {days.map(({ day, currentMonth, date }) => {
            const hasMatch = matchDatesSet.has(date);
            const isSelected = date === selectedDate;
            const isToday = date === today;
            const matchCount = matchCountByDate[date] || 0;

            return (
              <motion.div
                key={`day-${date}`}
                className={`h-16 flex flex-col items-center justify-center rounded-xl cursor-pointer relative transition-all
                  ${isSelected ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-gray-900 font-bold shadow-lg' :
                    !currentMonth ? 'text-gray-600' :
                    hasMatch ? 'bg-gray-750 hover:bg-gray-700' : 'hover:bg-gray-700'}
                `}
                onClick={() => currentMonth && handleDateSelect(date)}
                whileHover={{ scale: currentMonth ? 1.05 : 1 }}
                whileTap={{ scale: currentMonth ? 0.95 : 1 }}
              >
                {isToday && !isSelected && (
                  <motion.div
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                <div className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>{day}</div>
                {hasMatch && (
                  <motion.div 
                    className={`flex items-center justify-center mt-1 ${isSelected ? 'text-gray-900' : 'text-yellow-400'}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FiZap className="text-xs" />
                    {matchCount > 1 && (
                      <span className="text-xs ml-0.5">{matchCount}</span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h3 
            className="text-xl font-semibold text-white flex items-center"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              <FiClock className="text-yellow-400" />
            </motion.div>
            Матчи на {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
          </motion.h3>
          
          {selectedDateMatches.length === 0 && (
            <motion.button
              onClick={handleReminder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-medium rounded-xl transition-all text-sm shadow-lg"
            >
              <FiBell className="mr-2" />
              Напомнить
            </motion.button>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {selectedDateMatches.length > 0 ? (
            <motion.div
              key={`matches-${selectedDate}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid gap-4"
            >
              {selectedDateMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <MatchCard 
                    match={match} 
                    activeTab="upcoming"
                    glow={index % 2 === 0 ? 'from-blue-500/20' : 'from-yellow-500/20'}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`no-matches-${selectedDate}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700"
            >
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <FiClock className="text-4xl text-gray-500" />
                </motion.div>
              </div>
              <p className="text-gray-400 mb-2">На выбранную дату матчей нет</p>
              <p className="text-sm text-gray-500 mb-6">Попробуйте выбрать другую дату</p>
              <motion.button
                onClick={() => setSelectedDate(today)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all text-sm shadow-lg border border-gray-600"
              >
                Сегодня
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CalendarView;