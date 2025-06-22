import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight, FiArrowLeftCircle, FiArrowRightCircle, FiStar } from 'react-icons/fi';
import MatchCard from './MatchCard';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Для русской локализации

dayjs.locale('ru');

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const CalendarView = ({ matches }) => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-06-01'));
  const [selectedDate, setSelectedDate] = useState('2025-06-15');

  // Для быстрого поиска матчей по дате
  const matchMap = useMemo(() => {
    const map = {};
    matches.forEach(m => {
      map[m.date] = map[m.date] ? [...map[m.date], m] : [m];
    });
    return map;
  }, [matches]);

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = (currentMonth.startOf('month').day() || 7) - 1; // 0-based for grid
  const displayedMonth = currentMonth.format('MMMM YYYY');

  // Для навигации по неделям
  const currentWeek = useMemo(() => {
    const sel = dayjs(selectedDate);
    const weekStart = sel.startOf('week').add(1, 'day'); // Пн
    return Array.from({ length: 7 }, (_, i) => weekStart.add(i, 'day'));
  }, [selectedDate]);

  // Быстрое переключение на сегодня
  const goToToday = () => {
    setCurrentMonth(today.startOf('month'));
    setSelectedDate(today.format('YYYY-MM-DD'));
  };

  // Анимация смены месяца
  const [monthDirection, setMonthDirection] = useState(0);
  const handleMonthChange = (direction) => {
    setMonthDirection(direction);
    const newMonth = currentMonth.add(direction, 'month');
    setCurrentMonth(newMonth);
    // Если выбранная дата вне нового месяца — сбрасываем на 1 число
    const fallbackDate = newMonth.startOf('month').format('YYYY-MM-DD');
    setSelectedDate(fallbackDate);
  };

  // Анимация смены недели (на телефоне)
  const handleWeekChange = (direction) => {
    const newDate = dayjs(selectedDate).add(direction * 7, 'day');
    setCurrentMonth(newDate.startOf('month'));
    setSelectedDate(newDate.format('YYYY-MM-DD'));
  };

  // Рендер одного дня
  const renderDay = (dateObj, isMobile = false) => {
    const dateStr = dateObj.format('YYYY-MM-DD');
    const isToday = dateObj.isSame(today, 'day');
    const isSelected = dateStr === selectedDate;
    const matchesForDay = matchMap[dateStr] || [];
    const hasMatch = matchesForDay.length > 0;

    return (
      <motion.div
        key={dateStr}
        onClick={() => setSelectedDate(dateStr)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className={[
          'flex flex-col items-center justify-center cursor-pointer select-none transition-all',
          isMobile ? 'min-w-[48px] h-16 snap-center rounded-lg' : 'h-12 rounded-md',
          isSelected
            ? 'bg-yellow-400 text-black font-bold shadow-lg'
            : isToday
            ? 'border-2 border-yellow-400 bg-gray-900 text-yellow-300'
            : hasMatch
            ? 'bg-gray-800 hover:bg-yellow-500/10 hover:text-yellow-300'
            : 'bg-gray-800 hover:bg-gray-700/50 text-white',
        ].join(' ')}
        title={hasMatch ? `Матчей: ${matchesForDay.length}` : undefined}
      >
        <span>
          {dateObj.date()}
          {isToday && !isSelected && (
            <FiStar className="inline ml-1 text-yellow-400 animate-pulse" />
          )}
        </span>
        {hasMatch && (
          <div className={`mt-1 w-2 h-2 rounded-full ${isSelected ? 'bg-black' : 'bg-yellow-400'}`} />
        )}
        {hasMatch && matchesForDay.length > 1 && (
          <span className="text-xs text-yellow-600 font-bold">{matchesForDay.length}</span>
        )}
      </motion.div>
    );
  };

  return (
    <div className="text-white px-4 py-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
          <FiCalendar className="text-yellow-400 text-3xl" />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Календарь матчей
          </span>
        </h2>
        <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg shadow-inner text-sm sm:text-base">
          <button onClick={() => handleMonthChange(-1)} className="hover:text-yellow-400 transition">
            <FiChevronLeft />
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={displayedMonth}
              initial={{ opacity: 0, y: monthDirection * 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -monthDirection * 20 }}
              transition={{ duration: 0.3 }}
              className="font-semibold inline-block min-w-[120px] text-center"
            >
              {displayedMonth}
            </motion.span>
          </AnimatePresence>
          <button onClick={() => handleMonthChange(1)} className="hover:text-yellow-400 transition">
            <FiChevronRight />
          </button>
          <button
            onClick={goToToday}
            className="ml-2 px-2 py-1 rounded bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
          >
            Сегодня
          </button>
        </div>
      </div>

      {/* Mini-widget for phones (неделя) */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => handleWeekChange(-1)}
            className="text-2xl text-yellow-400 hover:text-yellow-500"
            aria-label="Предыдущая неделя"
          >
            <FiArrowLeftCircle />
          </button>
          <span className="text-lg font-semibold">{dayjs(selectedDate).format('D MMMM YYYY')}</span>
          <button
            onClick={() => handleWeekChange(1)}
            className="text-2xl text-yellow-400 hover:text-yellow-500"
            aria-label="Следующая неделя"
          >
            <FiArrowRightCircle />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x pb-3">
          {currentWeek.map(dateObj => renderDay(dateObj, true))}
        </div>
      </div>

      {/* Desktop Calendar */}
      <div className="bg-gray-900/80 rounded-xl shadow-xl p-3 sm:p-4 max-w-xl mx-auto hidden sm:block">
        <div className="grid grid-cols-7 text-center text-gray-400 text-sm font-medium mb-2">
          {DAYS.map(day => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dateObj = currentMonth.date(i + 1);
            return renderDay(dateObj, false);
          })}
        </div>
      </div>

      {/* Matches */}
      <motion.div
        key={selectedDate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <div className="w-full sm:w-4/5 lg:w-2/3 space-y-6">
          <h3 className="text-xl font-bold text-center flex justify-center items-center gap-2">
            <FiClock className="text-yellow-300" />
            Матчи на {dayjs(selectedDate).format('D MMMM YYYY')}
          </h3>
          <AnimatePresence mode="wait">
            {(matchMap[selectedDate]?.length > 0) ? (
              <motion.div
                key="match-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4"
              >
                {matchMap[selectedDate].map(match => (
                  <MatchCard key={match.id} match={match} activeTab="upcoming" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-matches"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-10 bg-gray-800/80 rounded-lg"
              >
                <p className="text-gray-400">На выбранную дату матчей не запланировано</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarView;
