import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiAward, FiClock, FiCheckCircle, FiInfo } from 'react-icons/fi';
import MatchCard from './MatchCard';

const TAB_CONFIG = {
  upcoming: {
    label: 'Ближайшие матчи',
    icon: <FiCalendar />,
    emptyText: 'Нет предстоящих матчей',
    emptyIcon: <FiClock className="text-4xl text-yellow-500 mb-3" />,
    emptySubText: 'Проверьте позже или настройте уведомления',
  },
  completed: {
    label: 'Прошедшие матчи',
    icon: <FiAward />,
    emptyText: 'Нет завершенных матчей',
    emptyIcon: <FiCheckCircle className="text-4xl text-green-500 mb-3" />,
    emptySubText: 'Здесь будут отображаться результаты матчей',
  },
};

const MatchesView = ({ matches = [] }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  const filteredMatches = useMemo(
    () =>
      matches.filter((match) =>
        activeTab === 'upcoming'
          ? match.status === 'upcoming'
          : match.status === 'completed'
      ),
    [matches, activeTab]
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowHelpTooltip(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-[70vh]">
      {/* Заголовок и помощь */}
      <div className="flex justify-between items-center mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-bold text-white"
        >
          Расписание матчей
        </motion.h2>
        
        <div className="relative">
          <button
            onClick={() => setShowHelpTooltip(!showHelpTooltip)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
            aria-label="Помощь"
          >
            <FiInfo size={20} />
          </button>
          
          <AnimatePresence>
            {showHelpTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 z-10"
              >
                <p className="text-sm text-gray-300">
                  {activeTab === 'upcoming'
                    ? 'Здесь отображаются предстоящие матчи. Нажмите на матч для подробностей.'
                    : 'Просматривайте результаты завершенных матчей и статистику.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <motion.div
          className="bg-gray-800 rounded-full p-1 inline-flex shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Object.entries(TAB_CONFIG).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`relative px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium flex items-center gap-2 transition-colors ${
                activeTab === key
                  ? 'text-gray-900 bg-yellow-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">
                {activeTab === key ? label.split(' ')[0] : '...'}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Список матчей */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -3 }}
                className="cursor-pointer"
              >
                <MatchCard match={match} activeTab={activeTab} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 bg-gray-800/50 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col items-center justify-center px-4">
                {TAB_CONFIG[activeTab].emptyIcon}
                <p className="text-xl sm:text-2xl font-medium text-gray-200 mb-2">
                  {TAB_CONFIG[activeTab].emptyText}
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  {TAB_CONFIG[activeTab].emptySubText}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Подсказка для мобильных */}
      <div className="mt-6 text-center sm:hidden">
        <p className="text-xs text-gray-500">
          Свайпайте влево/вправо для просмотра всех матчей
        </p>
      </div>
    </div>
  );
};

export default MatchesView;