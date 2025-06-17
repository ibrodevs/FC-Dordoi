import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiAward, FiClock, FiCheckCircle, FiInfo, FiBell, FiMapPin } from 'react-icons/fi';
import { FaTicketAlt, FaTrophy, FaCrown } from 'react-icons/fa';

const TAB_CONFIG = {
  upcoming: {
    label: 'Ближайшие матчи',
    icon: <FiCalendar className="text-lg" />,
    emptyText: 'Нет предстоящих матчей',
    emptyIcon: <FiClock className="text-4xl text-yellow-500 mb-3" />,
    emptySubText: 'Проверьте позже или настройте уведомления',
  },
  completed: {
    label: 'Прошедшие матчи',
    icon: <FiAward className="text-lg" />,
    emptyText: 'Нет завершенных матчей',
    emptyIcon: <FiCheckCircle className="text-4xl text-green-500 mb-3" />,
    emptySubText: 'Здесь будут отображаться результаты матчей',
  },
};

const MatchCard = ({ match, activeTab }) => {
  const isCompleted = activeTab === 'completed';
  const isDordoyWin = isCompleted && 
    ((match.homeTeam === 'Дордой' && match.homeScore > match.awayScore) || 
     (match.awayTeam === 'Дордой' && match.awayScore > match.homeScore));
  const isDordoyLoss = isCompleted && 
    ((match.homeTeam === 'Дордой' && match.homeScore < match.awayScore) || 
     (match.awayTeam === 'Дордой' && match.awayScore < match.homeScore));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative rounded-xl overflow-hidden border-2 ${
        isCompleted
          ? isDordoyWin
            ? 'border-yellow-500/40 bg-gradient-to-br from-yellow-500/15 to-gray-900'
            : isDordoyLoss
            ? 'border-red-500/40 bg-gradient-to-br from-red-500/15 to-gray-900'
            : 'border-gray-700 bg-gray-800'
          : 'border-blue-500/40 bg-gradient-to-br from-blue-900/25 to-gray-900'
      } shadow-xl backdrop-blur-sm w-full lg:w-[400px] xl:w-[600px]`} // Увеличиваем ширину только на десктопах
    >
      {/* Result badge */}
      {isCompleted && (isDordoyWin || isDordoyLoss) && (
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${
          isDordoyWin ? 'bg-yellow-400 text-gray-900' : 'bg-red-600 text-white'
        }`}>
          {isDordoyWin ? <FaCrown size={14} /> : null}
          {isDordoyWin ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}
        </div>
      )}

      <div className="p-5 lg:p-6"> {/* Увеличиваем padding на десктопах */}
        {/* Competition header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {match.competitionLogo && (
              <img src={match.competitionLogo} alt={match.competition} 
                className="w-6 h-6 rounded-full object-cover" /> 
            )}
            <span className="text-sm font-medium text-gray-300">
              {match.competition}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FiCalendar size={14} />
            <span>{match.date} • {match.time}</span>
          </div>
        </div>

        {/* Teams and score */}
        <div className="flex flex-col items-center py-4">
          <div className="w-full flex items-center justify-between">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-end pr-6">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl lg:text-2xl font-bold ${
                  match.homeTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'
                }`}>
                  {match.homeTeam}
                </h3>
                {match.homeTeamLogo && (
                  <img src={match.homeTeamLogo} alt={match.homeTeam} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600" />
                )}
              </div>
              {match.homeTeam === 'Дордой' && (
                <span className="text-xs text-yellow-500 font-medium mt-2">НАША КОМАНДА</span>
              )}
            </div>

            {/* Score */}
            <div className={`px-4 py-2 rounded-md text-2xl lg:text-3xl font-bold ${
              isCompleted 
                ? isDordoyWin 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : isDordoyLoss 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-gray-700 text-white'
                : 'text-blue-400'
            }`}>
              {isCompleted ? `${match.homeScore} : ${match.awayScore}` : 'VS'}
            </div>

            {/* Away team */}
            <div className="flex-1 flex flex-col items-start pl-6">
              <div className="flex items-center gap-3">
                {match.awayTeamLogo && (
                  <img src={match.awayTeamLogo} alt={match.awayTeam} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600" /> 
                )}
                <h3 className={`text-xl lg:text-2xl font-bold ${
                  match.awayTeam === 'Дордой' ? 'text-yellow-400' : 'text-white'
                }`}>
                  {match.awayTeam}
                </h3>
              </div>
              {match.awayTeam === 'Дордой' && (
                <span className="text-xs text-yellow-500 font-medium mt-2">НАША КОМАНДА</span>
              )}
            </div>
          </div>

          {/* Venue */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
            <FiMapPin size={14} />
            <span>{match.venue}</span>
          </div>
        </div>

        {/* Actions */}
        {!isCompleted ? (
          <div className="mt-6 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-sm font-medium py-3 px-5 rounded-lg flex items-center gap-2"
            >
              <FiBell size={16} />
              <span>Напомнить</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-5 rounded-lg flex items-center gap-2"
            >
              <FaTicketAlt size={16} />
              <a href="https://ticket.kg/events/football"><span>Билеты</span></a>
            </motion.button>
          </div>
        ) : isDordoyWin ? (
          <div className="mt-4 flex justify-center">
            <div className="bg-yellow-500/20 text-yellow-300 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
              <FaTrophy size={16} />
              <span>Дордой победил!</span>
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

const MatchesView = ({ matches = [] }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);

  const filteredMatches = useMemo(
    () => matches.filter(match => 
      activeTab === 'upcoming' 
        ? match.status === 'upcoming' 
        : match.status === 'completed'
    ),
    [matches, activeTab]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 min-h-[70vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl lg:text-3xl font-bold text-white"
        >
          Расписание матчей
        </motion.h2>
        
        <div className="relative">
          <button
            onClick={() => setShowHelpTooltip(!showHelpTooltip)}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <FiInfo size={22} />
          </button>
          
          <AnimatePresence>
            {showHelpTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 z-10"
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

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <motion.div
          className="bg-gray-800 rounded-full p-1.5 inline-flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Object.entries(TAB_CONFIG).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === key
                  ? 'text-gray-900 bg-yellow-500 shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Matches grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-6 sm:gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 justify-items-center" // Центрируем карточки
        >
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} activeTab={activeTab} />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16 bg-gray-800/50 rounded-xl w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center justify-center px-4">
                {TAB_CONFIG[activeTab].emptyIcon}
                <p className="text-xl lg:text-2xl font-medium text-gray-200 mb-3">
                  {TAB_CONFIG[activeTab].emptyText}
                </p>
                <p className="text-gray-400 text-sm lg:text-base">
                  {TAB_CONFIG[activeTab].emptySubText}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MatchesView;