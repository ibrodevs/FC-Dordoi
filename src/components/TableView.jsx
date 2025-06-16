import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiChevronDown, FiChevronUp, FiInfo, FiTrendingUp, FiUsers, FiCalendar } from 'react-icons/fi';

// Объект с URL аватарками для каждой команды (используем локальные пути или работающие URL)
const teamAvatars = {
  'Абдыш-Ата': './public/Эмблема_ФК_Абдыш-Ата.svg.png',
  'Дордой': './public/ФК_Дордой.png',
  'Алга': './public/FK_Alga_Bishkek_Logo.svg.png',
  'Нефтчи': './public/ФК_Нефтчи_(Кочкор-Ата).png',
  'Илбирс': './public/IlbirsFC.png',
  'Кара-Балта': './public/ФК_Кара-Балта.png',
  'Алай': './public/FC_Alay_Logo.png'
};

// Запасные цвета для аватарок
const teamColors = {
  'Абдыш-Ата': 'bg-blue-600',
  'Дордой': 'bg-yellow-500',
  'Алга': 'bg-green-500',
  'Нефтчи': 'bg-red-500',
  'Илбирс': 'bg-orange-500',
  'Кара-Балта': 'bg-gray-500',
  'Алай': 'bg-indigo-500'
};

const TableView = ({ standings }) => {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const toggleExpand = (teamName) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const getPositionStyle = (position) => {
    if (position === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 shadow-md';
    if (position <= 2) return 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white';
    if (position <= 4) return 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white';
    if (position >= standings.length - 2) return 'bg-gradient-to-br from-red-500 to-rose-500 text-white';
    return 'bg-gradient-to-br from-gray-700 to-gray-800 text-white';
  };

  // Генерация случайных результатов для демонстрации
  const generateRandomResults = (teamName) => {
    const opponents = standings.filter(t => t.team !== teamName);
    return opponents.slice(0, 5).map(opponent => ({
      opponent: opponent.team,
      result: Math.random() > 0.5 ? 'W' : 'L',
      score: `${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 3)}`,
      date: `2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`
    }));
  };

  // Компонент для отображения аватарки команды
  const TeamAvatar = ({ team }) => {
    const fallbackColor = teamColors[team.team] || 'bg-gray-600';
    
    return (
      <div className={`w-8 h-8 rounded-full ${fallbackColor} flex items-center justify-center text-white font-bold text-sm border-2 border-gray-600`}>
        {teamAvatars[team.team] ? (
          <img 
            src={teamAvatars[team.team]} 
            alt={team.team} 
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.target.src = '';
              e.target.classList.add('hidden');
            }}
          />
        ) : (
          team.team.charAt(0)
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden mx-2 sm:mx-4 md:mx-6 lg:mx-8"
    >
      {/* Заголовок с эффектным градиентом */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-yellow-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"/>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-white relative">
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="inline-block mr-3"
              >
                <FiAward className="text-white text-xl sm:text-2xl" />
              </motion.span>
              Турнирная таблица
            </h2>
            <p className="text-gray-100 mt-1 text-xs sm:text-sm">Сезон 2023/24</p>
          </div>
          
          {/* Кнопка показать/скрыть результаты */}
          <motion.button
            onClick={toggleResults}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 sm:mt-0 flex items-center gap-2 text-xs sm:text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-all"
          >
            <FiCalendar className="text-yellow-400" />
            {showResults ? 'Скрыть результаты' : 'Показать результаты'}
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">#</th>
              <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Команда</th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">И</th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">В</th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">Н</th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">П</th>
              <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm">О</th>
              <th className="py-3 px-1 sm:px-2 text-xs sm:text-sm"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {standings.map((team, index) => (
              <React.Fragment key={team.team}>
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`hover:bg-gray-800/30 ${expandedTeam === team.team ? 'bg-gray-800/50' : ''}`}
                >
                  <td className="py-2 px-2 sm:px-4">
                    <motion.span 
                      className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold ${getPositionStyle(team.position)}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {team.position}
                    </motion.span>
                  </td>
                  <td className="py-2 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div 
                        className="relative"
                        whileHover={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <TeamAvatar team={team} />
                        {team.position === 1 && (
                          <motion.div 
                            className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center shadow-sm"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        )}
                      </motion.div>
                      <span className="font-medium text-white text-xs sm:text-sm">
                        {team.team}
                        {team.position === 1 && (
                          <span className="ml-1 sm:ml-2 text-yellow-300 text-xxs sm:text-xs bg-yellow-500/20 px-1 sm:px-2 py-0.5 rounded-full">
                            лидер
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-2 sm:px-4 text-center text-gray-300 text-xs sm:text-sm">{team.played}</td>
                  <td className="py-2 px-2 sm:px-4 text-center text-green-400 font-medium text-xs sm:text-sm">{team.won}</td>
                  <td className="py-2 px-2 sm:px-4 text-center text-blue-400 font-medium text-xs sm:text-sm">{team.drawn}</td>
                  <td className="py-2 px-2 sm:px-4 text-center text-red-400 font-medium text-xs sm:text-sm">{team.lost}</td>
                  <td className="py-2 px-2 sm:px-4 text-center font-bold text-white text-xs sm:text-sm">{team.points}</td>
                  <td className="py-2 px-1 sm:px-2 text-center">
                    <motion.button
                      onClick={() => toggleExpand(team.team)}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
                    >
                      {expandedTeam === team.team ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </motion.button>
                  </td>
                </motion.tr>

                {/* Блок с последними результатами */}
                {showResults && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-800/20"
                  >
                    <td colSpan="8" className="px-2 sm:px-4 py-1 sm:py-2">
                      <div className="flex overflow-x-auto gap-1 sm:gap-2 py-1 sm:py-2">
                        {generateRandomResults(team.team).map((match, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex-shrink-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xxs sm:text-xs flex items-center gap-1 sm:gap-2 ${
                              match.result === 'W' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            <span>{match.opponent.substring(0, 3)}</span>
                            <span className="font-bold">{match.score}</span>
                          </motion.div>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                )}

                {/* Расширенная информация о команде */}
                <AnimatePresence>
                  {expandedTeam === team.team && (
                    <motion.tr
                      key={`details-${team.team}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan="8" className="bg-gray-800/70 p-2 sm:p-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 p-2 sm:p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
                        >
                          <div className="flex-shrink-0 relative">
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${teamColors[team.team] || 'bg-gray-600'} flex items-center justify-center text-white text-xl sm:text-3xl font-bold border-2 border-yellow-400`}>
                              {teamAvatars[team.team] ? (
                                <img
                                  src={teamAvatars[team.team]}
                                  alt={team.team}
                                  className="w-full h-full rounded-full object-cover"
                                  onError={(e) => {
                                    e.target.src = '';
                                    e.target.classList.add('hidden');
                                  }}
                                />
                              ) : (
                                team.team.charAt(0)
                              )}
                            </div>
                            {team.position === 1 && (
                              <motion.div 
                                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-400 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                <span className="text-xs sm:text-sm font-bold text-gray-900">1</span>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2 sm:space-y-3">
                            <h3 className="text-sm sm:text-lg font-bold text-yellow-300 flex items-center gap-1 sm:gap-2">
                              <FiInfo className="text-yellow-400 text-sm sm:text-base" />
                              {team.team} — подробная статистика
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                              <Stat 
                                icon={<FiTrendingUp className="text-green-400 text-sm sm:text-base" />} 
                                label="Форма" 
                                value={team.form.join(' ')} 
                                highlight={team.form[0] === 'W'}
                              />
                              <Stat 
                                icon={<FiUsers className="text-blue-400 text-sm sm:text-base" />} 
                                label="Состав" 
                                value={`${Math.floor(Math.random() * 5) + 18} игроков`} 
                              />
                              <Stat 
                                icon={<FiAward className="text-yellow-400 text-sm sm:text-base" />} 
                                label="Трофеи" 
                                value={`${Math.floor(Math.random() * 5)}`} 
                              />
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 sm:p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xxs sm:text-sm">
          <Legend 
            color="from-yellow-400 to-yellow-500" 
            label="1 место" 
            icon="🏆"
          />
          <Legend 
            color="from-emerald-400 to-teal-500" 
            label="Лига Чемпионов" 
            icon="⭐"
          />
          <Legend 
            color="from-blue-500 to-indigo-500" 
            label="Еврокубки" 
            icon="🌍"
          />
          <Legend 
            color="from-red-500 to-rose-500" 
            label="Вылет" 
            icon="⚠️"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon, label, value, highlight }) => (
  <motion.div 
    className={`flex items-center gap-2 sm:gap-3 bg-gray-800/50 rounded-lg px-2 sm:px-3 py-1 sm:py-2 ${highlight ? 'ring-1 ring-green-400/50' : ''}`}
    whileHover={{ y: -2 }}
  >
    <span className="text-sm sm:text-base">{icon}</span>
    <div>
      <div className="text-xxs sm:text-xs text-gray-400">{label}</div>
      <div className={`font-medium text-xs sm:text-sm ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</div>
    </div>
  </motion.div>
);

const Legend = ({ color, label, icon }) => (
  <motion.div 
    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-700/50"
    whileHover={{ scale: 1.05 }}
  >
    <span className={`inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${color}`}></span>
    <span className="text-gray-300 text-xxs sm:text-sm">{label}</span>
    {icon && <span className="text-xxs sm:text-xs">{icon}</span>}
  </motion.div>
);

export default TableView;