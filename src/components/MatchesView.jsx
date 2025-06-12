import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiAward, FiClock, FiCheckCircle } from 'react-icons/fi';
import MatchCard from './MatchCard';

const TAB_CONFIG = {
  upcoming: {
    label: 'Ближайшие матчи',
    icon: <FiCalendar />,
    emptyText: 'Нет предстоящих матчей',
    emptyIcon: (
      <FiClock className="text-5xl text-yellow-400 mb-3 animate-pulse drop-shadow-glow" />
    ),
  },
  completed: {
    label: 'Прошедшие матчи',
    icon: <FiAward />,
    emptyText: 'Нет завершенных матчей',
    emptyIcon: (
      <FiCheckCircle className="text-5xl text-green-400 mb-3 animate-bounce drop-shadow-glow" />
    ),
  },
};

const tabGradient =
  'bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500';

const MatchesView = ({ matches = [] }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredMatches = useMemo(
    () =>
      matches.filter((match) =>
        activeTab === 'upcoming'
          ? match.status === 'upcoming'
          : match.status === 'completed'
      ),
    [matches, activeTab]
  );

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh] overflow-x-hidden">
      {/* Эпичный фон */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(251,191,36,0.12),transparent_60%)]" />
        {/* Можно добавить частицы или SVG-узоры */}
      </motion.div>

      {/* Вкладки */}
      <div className="flex justify-center mb-12">
        <motion.div
          className="relative bg-gray-900/90 rounded-full p-2 inline-flex shadow-2xl border border-yellow-500/20 backdrop-blur-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
        >
          {Object.entries(TAB_CONFIG).map(([key, { label, icon }]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`relative px-7 sm:px-10 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 overflow-hidden group
                  ${isActive
                    ? 'text-gray-900'
                    : 'text-gray-400 hover:text-white hover:scale-105'}
                `}
                tabIndex={0}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabEpic"
                    className={`absolute inset-0 ${tabGradient} animate-glossy-shine shadow-[0_0_40px_10px_rgba(251,191,36,0.40)] rounded-full z-0`}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 text-lg sm:text-xl">
                  <motion.span
                    animate={
                      isActive
                        ? { scale: [1, 1.2, 1], rotate: [0, 15, -10, 0] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: isActive ? 0.7 : 0.3,
                      repeat: isActive ? Infinity : 0,
                      repeatType: 'mirror',
                    }}
                  >
                    {icon}
                  </motion.span>
                  <span className="drop-shadow-glow">{label}</span>
                </span>
                {/* Подсказка при наведении */}
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-20 text-xs text-yellow-300 font-medium">
                  {isActive ? 'Выбрано' : 'Нажмите'}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Список матчей */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 30 }}
          transition={{ duration: 0.5, ease: 'anticipate' }}
          className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.07,
                  type: 'spring',
                  stiffness: 120,
                  damping: 18,
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    '0 8px 40px 0 rgba(251,191,36,0.18), 0 1.5px 4px 0 rgba(0,0,0,0.10)',
                }}
              >
                <MatchCard match={match} activeTab={activeTab} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-20 bg-gray-800/70 rounded-2xl shadow-inner border border-gray-700/70 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            >
              <div className="flex flex-col items-center justify-center">
                {TAB_CONFIG[activeTab].emptyIcon}
                <p className="text-3xl font-extrabold text-white tracking-wide drop-shadow-glow">
                  {TAB_CONFIG[activeTab].emptyText}
                </p>
                {activeTab === 'upcoming' && (
                  <p className="text-gray-400 mt-3 text-base sm:text-lg font-medium">
                    Проверьте позже или&nbsp;
                    <span className="text-yellow-400 underline decoration-wavy decoration-yellow-400/70 cursor-pointer hover:text-pink-400 transition">
                      настройте уведомления
                    </span>
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MatchesView;
