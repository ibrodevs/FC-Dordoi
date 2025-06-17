import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBell } from 'react-icons/fi';
import { FaTrophy, FaTicketAlt, FaCrown } from 'react-icons/fa';

const MatchCard = ({ match, activeTab = 'upcoming' }) => {
  // Проверяем наличие обязательных полей
  if (!match || !match.homeTeam || !match.awayTeam) {
    console.error('Match data is incomplete:', match);
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-lg">
        Ошибка: данные матча неполные или отсутствуют
      </div>
    );
  }

  const isCompleted = activeTab === 'completed';
  const isDordoyWin =
    isCompleted &&
    ((match.homeTeam === 'Дордой' && match.homeScore > match.awayScore) ||
      (match.awayTeam === 'Дордой' && match.awayScore > match.homeScore));
  const isDordoyLoss =
    isCompleted &&
    ((match.homeTeam === 'Дордой' && match.homeScore < match.awayScore) ||
      (match.awayTeam === 'Дордой' && match.awayScore < match.homeScore));

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      y: -8,
      boxShadow: '0 15px 30px -5px rgba(255, 222, 89, 0.3)'
    }
  };

  // Определяем классы для разных состояний
  let borderClass = 'border-blue-500/40';
  let bgGradientClass = 'bg-gradient-to-br from-blue-900/40 via-blue-900/15 to-gray-900';

  if (isCompleted) {
    if (isDordoyWin) {
      borderClass = 'border-yellow-500/40';
      bgGradientClass = 'bg-gradient-to-br from-yellow-500/15 via-yellow-900/25 to-black/80';
    } else if (isDordoyLoss) {
      borderClass = 'border-red-500/40';
      bgGradientClass = 'bg-gradient-to-br from-red-500/15 via-red-900/25 to-black/80';
    } else {
      borderClass = 'border-gray-700';
      bgGradientClass = 'bg-gradient-to-br from-gray-700 via-gray-900 to-black';
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className={`
        relative rounded-xl overflow-hidden border-2
        ${bgGradientClass}
        ${borderClass}
        shadow-xl backdrop-blur-sm mx-2
        w-full max-w-md
      `}
    >
      {/* Бейдж результата */}
      <AnimatePresence>
        {(isDordoyWin || isDordoyLoss) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute top-3 right-3 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 z-10
              ${isDordoyWin ? 'bg-yellow-400 text-gray-900' : 'bg-red-600 text-white'}
              shadow-md
            `}
          >
            {isDordoyWin ? (
              <>
                <FaCrown className="text-base" /> ПОБЕДА
              </>
            ) : (
              'ПОРАЖЕНИЕ'
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 lg:p-6">
        {/* Турнир и дата */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-5">
          <div className="flex items-center gap-3 bg-gray-800/70 px-4 py-1.5 rounded-lg max-w-full">
            {match.competitionLogo && (
              <img 
                src={match.competitionLogo} 
                alt={match.competition || 'Лого турнира'} 
                className="w-6 h-6 rounded-full object-contain" 
              />
            )}
            <span className="text-sm lg:text-base font-medium text-yellow-300 truncate">
              {match.competition || 'Турнир'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm lg:text-base">
            <FiCalendar size={16} />
            <span>
              {match.date || 'Дата'} • {match.time || 'Время'}
            </span>
          </div>
        </div>

        {/* Команды и счет */}
        <div className="flex flex-col items-center py-4 lg:py-5">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-5">
            {/* Хозяева */}
            <div className="w-full sm:w-auto sm:flex-1 text-center sm:text-right">
              <div className="flex flex-col items-end">
                <h3 className={`text-2xl lg:text-3xl font-bold ${match.homeTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'}`}>
                  {match.homeTeam}
                </h3>
                {match.homeTeam === 'Дордой' && (
                  <span className="text-xs lg:text-sm text-yellow-500 font-medium mt-1">НАША КОМАНДА</span>
                )}
              </div>
            </div>

            {/* Счет */}
            <motion.div 
              className="mx-0 sm:mx-5 my-2 sm:my-0"
              animate={{ 
                rotate: isCompleted ? [0, 3, -3, 0] : [0, 0, 0, 0],
                transition: { 
                  duration: 6, 
                  repeat: Infinity 
                } 
              }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`px-5 py-3 bg-black/50 rounded-lg text-3xl lg:text-4xl font-bold
                    ${isDordoyWin ? 'text-yellow-400' : 
                      isDordoyLoss ? 'text-red-400' : 'text-white'}
                    shadow-inner
                  `}
                >
                  {match.homeScore ?? '0'} : {match.awayScore ?? '0'}
                </motion.div>
              ) : (
                <div className="text-4xl font-bold text-blue-400">vs</div>
              )}
            </motion.div>

            {/* Гости */}
            <div className="w-full sm:w-auto sm:flex-1 text-center sm:text-left">
              <div className="flex flex-col items-start">
                <h3 className={`text-2xl lg:text-3xl font-bold ${match.awayTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'}`}>
                  {match.awayTeam}
                </h3>
                {match.awayTeam === 'Дордой' && (
                  <span className="text-xs lg:text-sm text-yellow-500 font-medium mt-1">НАША КОМАНДА</span>
                )}
              </div>
            </div>
          </div>

          {/* Место проведения */}
          {match.venue && (
            <div className="mt-4 lg:mt-5 flex items-center justify-center gap-2 text-gray-400 text-sm lg:text-base">
              <FiMapPin size={16} />
              <span>{match.venue}</span>
            </div>
          )}
        </div>

        {/* Действия для предстоящих матчей */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 grid grid-cols-2 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-4 rounded-lg text-sm lg:text-base flex items-center justify-center gap-2"
            >
              <FiBell size={16} /> Напомнить
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-sm lg:text-base flex items-center justify-center gap-2"
            >
              <FaTicketAlt size={16} /> Билеты
            </motion.button>
          </motion.div>
        )}

        {/* Сообщение о победе */}
        <AnimatePresence>
          {isCompleted && isDordoyWin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-5 flex justify-center"
            >
              <div className="bg-yellow-500/25 text-yellow-300 px-5 py-2.5 rounded-full text-sm lg:text-base font-medium flex items-center gap-3">
                <FaTrophy size={18} /> Дордой победил!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MatchCard;