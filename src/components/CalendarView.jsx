import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MatchCard from './MatchCard';

const CalendarView = ({ matches }) => {
  const [selectedDate, setSelectedDate] = useState('2023-06-15');
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2023);
  const [direction, setDirection] = useState(0);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const days = [];
    const startDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(0);
    const prevMonthDays = date.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false,
        date: new Date(year, month - 2, prevMonthDays - i).toISOString().split('T')[0]
      });
    }

    date.setMonth(month - 1);
    date.setDate(1);
    const daysCount = new Date(year, month, 0).getDate();

    for (let i = 1; i <= daysCount; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(year, month - 1, i).toISOString().split('T')[0]
      });
    }

    const totalCells = Math.ceil(days.length / 7) * 7;
    const nextMonthDays = totalCells - days.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(year, month, i).toISOString().split('T')[0]
      });
    }

    return days;
  };

  const days = getDaysInMonth(year, month);
  const matchDates = matches.map(m => m.date);

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

  return (
    <div className="relative">
      {/* Заголовок с анимацией */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <FiCalendar className="text-3xl text-yellow-400 mr-3" />
        </motion.div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          Календарь матчей
        </h2>
      </motion.div>

      {/* Навигация по месяцам */}
      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={() => changeMonth(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-white transition-all"
        >
          <FiChevronLeft className="text-xl" />
        </motion.button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`month-${month}-${year}`}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            className="text-xl font-bold text-yellow-400 px-4 py-2 bg-gray-700 rounded-lg"
          >
            {monthNames[month - 1]} {year}
          </motion.div>
        </AnimatePresence>
        
        <motion.button
          onClick={() => changeMonth(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-white transition-all"
        >
          <FiChevronRight className="text-xl" />
        </motion.button>
      </div>

      {/* Календарь */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-700"
      >
        <div className="grid grid-cols-7 bg-gray-700 text-gray-300 text-center font-medium py-3">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="text-yellow-300">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 p-2">
          {days.map(({ day, currentMonth, date }) => {
            const hasMatch = matchDates.includes(date);
            const isSelected = date === selectedDate;
            const isToday = date === new Date().toISOString().split('T')[0];

            return (
              <motion.div
                key={`day-${date}`}
                className={`h-14 flex flex-col items-center justify-center rounded-lg cursor-pointer relative transition-all
                  ${isSelected ? 'bg-yellow-500 text-gray-900 font-bold shadow-md' :
                    !currentMonth ? 'text-gray-600' :
                    hasMatch ? 'bg-gray-750 hover:bg-gray-700' : 'hover:bg-gray-700'}
                `}
                onClick={() => currentMonth && setSelectedDate(date)}
                whileHover={{ scale: currentMonth ? 1.05 : 1 }}
                whileTap={{ scale: currentMonth ? 0.95 : 1 }}
              >
                {isToday && (
                  <motion.div
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-400"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                <div>{day}</div>
                {hasMatch && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-yellow-400 mt-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Матчи выбранного дня */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FiClock className="mr-2 text-yellow-400 animate-pulse" />
          Матчи на {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </h3>
        
        <AnimatePresence mode="wait">
          {matches.filter(m => m.date === selectedDate).length > 0 ? (
            <motion.div
              key={`matches-${selectedDate}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid gap-6"
            >
              {matches.filter(m => m.date === selectedDate).map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MatchCard match={match} activeTab="upcoming" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`no-matches-${selectedDate}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center bg-gray-800 rounded-lg border border-gray-700"
            >
              <p className="text-gray-400 mb-4">На выбранную дату матчей нет</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-lg transition-all"
              >
                Установить напоминание
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CalendarView;