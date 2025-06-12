import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MatchCard from './MatchCard';

const CalendarView = ({ matches }) => {
  const [selectedDate, setSelectedDate] = useState('2023-06-15');
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(2023);
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

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

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [month]);

  // Неоновый градиент для кнопок
  const neonButton =
    "p-3 rounded-full bg-gradient-to-br from-pink-600 to-yellow-400 shadow-[0_0_16px_2px_rgba(255,221,51,0.6)] border border-yellow-400/30 hover:from-yellow-400 hover:to-pink-600 hover:shadow-[0_0_32px_6px_rgba(255,221,51,0.7)] transition-all";

  // Неоновый градиент для активного дня
  const neonDay =
    "bg-gradient-to-br from-yellow-400 via-pink-400 to-pink-600 text-gray-900 font-extrabold shadow-[0_0_16px_4px_rgba(255,0,128,0.3)] border-2 border-yellow-300 animate-glow";

  return (
    <div className="relative overflow-visible">
      {/* НЕОНОВЫЙ СВЕТЯЩИЙСЯ ФОН */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-400 via-yellow-400 to-transparent rounded-full filter blur-3xl opacity-20 pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.22, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* ЭПИЧНЫЙ ЗАГОЛОВОК */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-700 drop-shadow-[0_0_18px_rgba(255,0,128,0.4)] mb-8"
        initial={{ opacity: 0, y: -40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <FiCalendar className="mr-4 text-yellow-400 text-5xl animate-spin-slow" />
        Календарь матчей
      </motion.h2>
      {/* КНОПКИ МЕСЯЦА */}
      <div className="flex justify-between items-center mb-8 z-10 relative">
        <motion.button
          whileTap={{ scale: 0.93, rotate: -10 }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 24px #FFD700" }}
          onClick={() => changeMonth(-1)}
          className={neonButton}
        >
          <FiChevronLeft className="text-3xl text-white drop-shadow-[0_0_8px_#FFD700]" />
        </motion.button>
        <AnimatePresence mode="wait">
          <motion.div
            key={`month-${month}-${year}`}
            initial={{ opacity: 0, scale: 0.9, y: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-8 py-3 shadow-xl border-2 border-yellow-400/30"
          >
            <span className="font-extrabold text-2xl text-yellow-300 tracking-wide drop-shadow-[0_0_8px_#FFD700]">
              {monthNames[month - 1]} {year}
            </span>
          </motion.div>
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.93, rotate: 10 }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 24px #FFD700" }}
          onClick={() => changeMonth(1)}
          className={neonButton}
        >
          <FiChevronRight className="text-3xl text-white drop-shadow-[0_0_8px_#FFD700]" />
        </motion.button>
      </div>
      {/* КАЛЕНДАРЬ */}
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-pink-500/10"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-7 bg-gray-800 text-gray-300 text-center font-semibold">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="py-4 tracking-wide uppercase text-yellow-200 drop-shadow-[0_0_6px_#FFD700]">
              {day}
            </div>
          ))}
        </div>
        <motion.div
          className="grid grid-cols-7 gap-1 p-2"
          key={`calendar-${month}-${year}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {days.map(({ day, currentMonth, date }) => {
            const hasMatch = matchDates.includes(date);
            const isSelected = date === selectedDate;
            const isToday = date === new Date().toISOString().split('T')[0];

            return (
              <motion.div
                key={`day-${date}`}
                className={`h-16 flex flex-col items-center justify-center rounded-xl cursor-pointer relative transition-all duration-300
                  ${isSelected ? neonDay :
                    !currentMonth ? 'text-gray-600' :
                    hasMatch ? 'bg-gray-750 hover:bg-gray-700 border border-yellow-400/20' : 'hover:bg-gray-700'}
                `}
                onClick={() => currentMonth && setSelectedDate(date)}
                whileHover={{ scale: currentMonth ? 1.12 : 1, boxShadow: currentMonth ? "0 0 16px #FFD700" : "none" }}
                whileTap={{ scale: currentMonth ? 0.95 : 1, rotate: currentMonth && isSelected ? [0, 8, -8, 0] : 0 }}
                animate={isSelected ? { boxShadow: "0 0 32px #FF00A8, 0 0 64px #FFD700" } : {}}
              >
                {/* Пульсация для сегодняшней даты */}
                {isToday && (
                  <motion.div
                    className="absolute top-1 right-1 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_#00BFFF] border-2 border-white"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                <div className="text-lg font-bold">{day}</div>
                {/* Неоновый индикатор матча */}
                {hasMatch && (
                  <motion.div
                    className={`mt-1 w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-gray-900' : 'bg-yellow-400'} shadow-[0_0_8px_#FFD700]`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      {/* МАТЧИ ДНЯ */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center text-yellow-400 drop-shadow-[0_0_12px_#FFD700]">
          <FiClock className="mr-2 animate-pulse" /> Матчи на {new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
        </h3>
        <AnimatePresence mode="wait">
          {matches.filter(m => m.date === selectedDate).length > 0 ? (
            <motion.div
              className="grid gap-6"
              key={`matches-${selectedDate}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              {matches.filter(m => m.date === selectedDate).map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 24px #FF00A8" }}
                >
                  <MatchCard match={match} activeTab="upcoming" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl border-2 border-pink-400/30"
              key={`no-matches-${selectedDate}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-400 text-lg">На выбранную дату матчей не запланировано</p>
              <motion.button
                className="mt-4 px-7 py-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-pink-600 text-white rounded-lg shadow-[0_0_12px_#FFD700] hover:from-pink-600 hover:to-yellow-400 transition-all font-bold"
                whileHover={{ scale: 1.07, boxShadow: "0 0 24px #FF00A8" }}
                whileTap={{ scale: 0.96 }}
              >
                Установить напоминание
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* СЕКСУАЛЬНЫЙ СИЯЮЩИЙ АУРА */}
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-600 rounded-full filter blur-3xl opacity-20 -z-10 pointer-events-none"
        animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* ЭПИЧНЫЙ БЛИК ВНИЗУ */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-gradient-to-t from-yellow-400 via-pink-400 to-transparent rounded-full filter blur-2xl opacity-10 -z-10 pointer-events-none"
        animate={{ scaleX: [1, 1.2, 1], opacity: [0.08, 0.13, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* КАСТОМНЫЙ CSS для анимации glow */}
      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 16px #FFD700, 0 0 32px #FF00A8; }
          50% { box-shadow: 0 0 32px #FFD700, 0 0 64px #FF00A8; }
          100% { box-shadow: 0 0 16px #FFD700, 0 0 32px #FF00A8; }
        }
        .animate-glow {
          animation: glow 2.5s infinite alternate;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default CalendarView;
