import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiAward, FiMapPin } from 'react-icons/fi';
import { FaTrophy, FaTicketAlt, FaCrown } from 'react-icons/fa';

const epicGlow = 'shadow-[0_0_40px_10px_rgba(255,222,89,0.25),0_0_10px_2px_rgba(0,0,0,0.4)]';

const particleVariants = {
  animate: i => ({
    x: [0, Math.random() * 60 - 30, 0],
    y: [0, Math.random() * 60 - 30, 0],
    opacity: [0.7, 0.2, 0.7],
    transition: { duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3 }
  })
};

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
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 16 }
    },
    hover: {
      scale: 1.025,
      boxShadow: '0 0 60px 5px rgba(255,222,89,0.15),0 0 30px rgba(0,0,0,0.4)'
    }
  };

  // Эпичные динамические градиенты
  const bgGradient = isCompleted
    ? isDordoyWin
      ? 'from-yellow-400/30 via-yellow-900/60 to-black'
      : isDordoyLoss
      ? 'from-red-700/40 via-red-900/60 to-black'
      : 'from-gray-700 via-gray-900 to-black'
    : 'from-blue-800/60 via-blue-900/30 to-gray-900';

  // Эффект сияния для команды
  const teamGlow = 'drop-shadow-[0_0_12px_rgba(255,222,89,0.7)]';

  // Частицы победы
  const VictoryParticles = () => (
    <AnimatePresence>
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleVariants}
          animate="animate"
          className={`absolute w-3 h-3 bg-yellow-200 rounded-full pointer-events-none`}
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${10 + Math.random() * 70}%`,
            filter: 'blur(2px) brightness(1.4)'
          }}
        />
      ))}
    </AnimatePresence>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className={`
        relative rounded-3xl overflow-hidden border-2 border-yellow-400/30 bg-gradient-to-br
        ${bgGradient}
        shadow-2xl backdrop-blur-2xl transition-all duration-500
        ${isDordoyWin ? epicGlow : ''}
      `}
    >
      {/* Глянцевый фильтр и динамический блик */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-tr from-yellow-200/60 via-transparent to-transparent blur-2xl pointer-events-none z-20"
      />

      {/* Победа / Поражение */}
      <AnimatePresence>
        {isDordoyWin && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ x: 50, opacity: 0 }}
            className="absolute top-0 right-0 bg-yellow-400/90 text-gray-900 px-6 py-2 text-lg font-black rounded-bl-2xl shadow-lg flex items-center gap-3 z-30 animate-pulse"
          >
            <FaCrown size={22} className="text-yellow-800 animate-bounce" /> ПОБЕДА!
          </motion.div>
        )}
        {isDordoyLoss && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ x: 50, opacity: 0 }}
            className="absolute top-0 right-0 bg-red-700/90 text-white px-6 py-2 text-lg font-black rounded-bl-2xl shadow-lg z-30"
          >
            Поражение
          </motion.div>
        )}
      </AnimatePresence>

      {/* Частицы победы */}
      {isDordoyWin && <VictoryParticles />}

      <div className="p-7 relative z-20 text-white">
        {/* Турнир и дата */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 bg-gray-900/70 px-4 py-2 rounded-full shadow-md border border-yellow-400/20">
            <img src={match.competitionLogo} alt={match.competition} className="w-7 h-7 rounded-full border-2 border-yellow-400/40" />
            <span className="text-base font-bold text-yellow-200">{match.competition}</span>
          </div>
          <div className="flex items-center bg-gray-900/60 px-4 py-2 rounded-full shadow-md border border-blue-400/20">
            <FiCalendar className="mr-2 text-blue-400" size={16} />
            <span className="text-base text-blue-200 font-semibold">
              {match.date} • <span className="font-bold">{match.time}</span>
            </span>
          </div>
        </div>

        {/* Команды и счёт */}
        <div className="flex justify-between items-center py-7">
          <div className="flex-1 text-right pr-4">
            <h3 className={`text-3xl font-extrabold transition-all duration-300 ${match.homeTeam === 'Дордой' ? 'text-yellow-400 ' + teamGlow : 'text-white'}`}>
              {match.homeTeam}
            </h3>
            {match.homeTeam === 'Дордой' && (
              <motion.div
                whileHover={{ scale: 1.08, rotate: -2 }}
                className="text-xs font-black mt-2 px-4 py-1 rounded-full bg-yellow-400 text-black shadow-md border border-yellow-600/40"
              >
                НАША КОМАНДА
              </motion.div>
            )}
          </div>

          <motion.div
            className="mx-6 flex flex-col items-center"
            animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0], transition: { duration: 4, repeat: Infinity } }}
          >
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
                className={`px-8 py-4 bg-black/80 border-2 border-yellow-300/30 rounded-2xl shadow-inner text-4xl font-black tracking-widest
                  ${isDordoyWin ? 'text-yellow-300' : isDordoyLoss ? 'text-red-400' : 'text-white'}
                `}
                style={{ letterSpacing: '0.1em', textShadow: '0 0 12px #fff6, 0 0 24px #ffde59aa' }}
              >
                {match.homeScore} : {match.awayScore}
              </motion.div>
            ) : (
              <>
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-700 animate-pulse drop-shadow-lg">
                  vs
                </span>
                <span className="text-xs text-blue-200 mt-2 font-bold tracking-wide">{match.time}</span>
              </>
            )}
          </motion.div>

          <div className="flex-1 text-left pl-4">
            <h3 className={`text-3xl font-extrabold transition-all duration-300 ${match.awayTeam === 'Дордой' ? 'text-yellow-400 ' + teamGlow : 'text-white'}`}>
              {match.awayTeam}
            </h3>
            {match.awayTeam === 'Дордой' && (
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="text-xs font-black mt-2 px-4 py-1 rounded-full bg-yellow-400 text-black shadow-md border border-yellow-600/40"
              >
                НАША КОМАНДА
              </motion.div>
            )}
          </div>
        </div>

        {/* Место */}
        <div className="mt-7 pt-5 border-t border-yellow-400/20">
          <div className="flex justify-center items-center gap-3 bg-gray-900/60 px-6 py-3 rounded-xl text-base text-yellow-200 font-semibold border border-yellow-400/10">
            <FiMapPin size={18} className="text-blue-400" /> {match.venue}
          </div>
        </div>

        {/* Кнопки */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            className="mt-10 grid grid-cols-2 gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: '0 0 20px 3px #ffde59cc' }}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:to-yellow-700 text-black font-black py-4 px-6 rounded-2xl shadow-lg border-2 border-yellow-300/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiCalendar size={18} /> Напомнить
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: '0 0 20px 3px #3b82f6cc' }}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:to-blue-800 text-white font-black py-4 px-6 rounded-2xl shadow-lg border-2 border-blue-300/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaTicketAlt size={18} /> Билеты
            </motion.button>
          </motion.div>
        )}

        {/* Доп. информация при победе */}
        <AnimatePresence>
          {isCompleted && isDordoyWin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 flex justify-center"
            >
              <div className="bg-yellow-300/20 border border-yellow-400/40 text-yellow-200 px-7 py-3 rounded-full flex items-center text-lg font-bold shadow-inner gap-2 animate-pulse">
                <FaTrophy className="mr-2 text-yellow-400 animate-bounce" size={22} /> Дордой одержал победу!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MatchCard;
