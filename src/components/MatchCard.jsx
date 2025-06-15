import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { FaTrophy, FaTicketAlt, FaCrown } from 'react-icons/fa';

const MatchCard = ({ match, activeTab }) => {
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
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(255, 222, 89, 0.2)'
    }
  };

  const bgGradient = isCompleted
    ? isDordoyWin
      ? 'from-yellow-500/10 via-yellow-900/20 to-black/80'
      : isDordoyLoss
      ? 'from-red-500/10 via-red-900/20 to-black/80'
      : 'from-gray-700 via-gray-900 to-black'
    : 'from-blue-900/30 via-blue-900/10 to-gray-900';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className={`
        relative rounded-xl overflow-hidden border border-gray-700
        bg-gradient-to-br ${bgGradient}
        shadow-lg backdrop-blur-sm mx-2
      `}
    >
      {/* Result badge - mobile first */}
      <AnimatePresence>
        {(isDordoyWin || isDordoyLoss) && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10
              ${isDordoyWin ? 'bg-yellow-400 text-gray-900' : 'bg-red-600 text-white'}
            `}
          >
            {isDordoyWin ? (
              <>
                <FaCrown className="text-sm" /> ПОБЕДА
              </>
            ) : (
              'Поражение'
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 sm:p-5">
        {/* Competition and date */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
          <div className="flex items-center gap-2 bg-gray-800/70 px-3 py-1 rounded-lg max-w-full">
            {match.competitionLogo && (
              <img 
                src={match.competitionLogo} 
                alt={match.competition} 
                className="w-5 h-5 rounded-full" 
              />
            )}
            <span className="text-sm font-medium text-yellow-300 truncate">
              {match.competition}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FiCalendar size={14} />
            <span>{match.date} • {match.time}</span>
          </div>
        </div>

        {/* Teams and score */}
        <div className="flex flex-col items-center py-3 sm:py-4">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Home team */}
            <div className="w-full sm:w-auto sm:flex-1 text-center sm:text-right">
              <h3 className={`text-xl sm:text-2xl font-bold ${match.homeTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'}`}>
                {match.homeTeam}
              </h3>
              {match.homeTeam === 'Дордой' && (
                <span className="text-xs text-yellow-500 font-medium">НАША КОМАНДА</span>
              )}
            </div>

            {/* Score */}
            <motion.div 
              className="mx-0 sm:mx-4 my-2 sm:my-0"
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
                  className={`px-4 sm:px-5 py-2 bg-black/50 rounded-lg text-2xl sm:text-3xl font-bold
                    ${isDordoyWin ? 'text-yellow-400' : 
                      isDordoyLoss ? 'text-red-400' : 'text-white'}
                  `}
                >
                  {match.homeScore} : {match.awayScore}
                </motion.div>
              ) : (
                <div className="text-3xl font-bold text-blue-400">vs</div>
              )}
            </motion.div>

            {/* Away team */}
            <div className="w-full sm:w-auto sm:flex-1 text-center sm:text-left">
              <h3 className={`text-xl sm:text-2xl font-bold ${match.awayTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'}`}>
                {match.awayTeam}
              </h3>
              {match.awayTeam === 'Дордой' && (
                <span className="text-xs text-yellow-500 font-medium">НАША КОМАНДА</span>
              )}
            </div>
          </div>

          {/* Venue */}
          <div className="mt-3 sm:mt-4 flex items-center gap-1 text-gray-400 text-sm">
            <FiMapPin size={14} />
            <span className="text-center">{match.venue}</span>
          </div>
        </div>

        {/* Actions */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-3 sm:px-4 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <FiCalendar size={14} /> Напомнить
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <FaTicketAlt size={14} /> Билеты
            </motion.button>
          </motion.div>
        )}

        {/* Victory message */}
        <AnimatePresence>
          {isCompleted && isDordoyWin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex justify-center"
            >
              <div className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <FaTrophy size={16} /> Дордой победил!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MatchCard;