import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiChevronDown, FiChevronUp, FiInfo, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useState } from 'react';

const TableView = ({ standings }) => {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleExpand = (teamName) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  const getPositionStyle = (position) => {
    if (position === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 shadow-md';
    if (position <= 2) return 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white';
    if (position <= 4) return 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white';
    if (position >= standings.length - 2) return 'bg-gradient-to-br from-red-500 to-rose-500 text-white';
    return 'bg-gradient-to-br from-gray-700 to-gray-800 text-white';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden"
    >
      {/* Заголовок с эффектным градиентом */}
      <div className="p-6 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"/>
        <h2 className="text-2xl md:text-3xl font-bold flex items-center text-white relative">
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mr-3"
          >
            <FiAward className="text-yellow-300 text-2xl" />
          </motion.span>
          Турнирная таблица
        </h2>
        <p className="text-gray-300 mt-1 text-sm">Сезон 2023/24</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="py-4 px-4 text-left">#</th>
              <th className="py-4 px-4 text-left">Команда</th>
              <th className="py-4 px-4 text-center">И</th>
              <th className="py-4 px-4 text-center">В</th>
              <th className="py-4 px-4 text-center">Н</th>
              <th className="py-4 px-4 text-center">П</th>
              <th className="py-4 px-4 text-center">О</th>
              <th className="py-4 px-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {standings.map((team, index) => (
              <motion.tr 
                key={team.team}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`hover:bg-gray-800/30 ${expandedTeam === team.team ? 'bg-gray-800/50' : ''}`}
              >
                <td className="py-3 px-4">
                  <motion.span 
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getPositionStyle(team.position)}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {team.position}
                  </motion.span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <motion.img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(team.team)}&background=random&color=fff&size=48`}
                      alt={team.team} 
                      className="w-8 h-8 rounded-full border-2 border-gray-600"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="font-medium text-white">
                      {team.team}
                      {team.position === 1 && (
                        <span className="ml-2 text-yellow-300 text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full">
                          лидер
                        </span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center text-gray-300">{team.played}</td>
                <td className="py-3 px-4 text-center text-green-400 font-medium">{team.won}</td>
                <td className="py-3 px-4 text-center text-blue-400 font-medium">{team.drawn}</td>
                <td className="py-3 px-4 text-center text-red-400 font-medium">{team.lost}</td>
                <td className="py-3 px-4 text-center font-bold text-white">{team.points}</td>
                <td className="py-3 px-2 text-center">
                  <motion.button
                    onClick={() => toggleExpand(team.team)}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
                  >
                    {expandedTeam === team.team ? <FiChevronUp /> : <FiChevronDown />}
                  </motion.button>
                </td>
              </motion.tr>
            ))}

            <AnimatePresence>
              {expandedTeam && (() => {
                const team = standings.find(t => t.team === expandedTeam);
                return (
                  <motion.tr
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td colSpan="8" className="bg-gray-800/70 p-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
                      >
                        <div className="flex-shrink-0 relative">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(team.team)}&background=4f46e5&color=fff&size=64`}
                            alt={team.team}
                            className="w-16 h-16 rounded-full border-2 border-yellow-400"
                          />
                          {team.position === 1 && (
                            <motion.div 
                              className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <span className="text-xs font-bold text-gray-900">1</span>
                            </motion.div>
                          )}
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="text-lg font-bold text-yellow-300 flex items-center gap-2">
                            <FiInfo className="text-yellow-400" />
                            {team.team} — статистика
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Stat 
                              icon={<FiTrendingUp className="text-green-400" />} 
                              label="Форма" 
                              value={team.form || '—'} 
                              highlight={team.form?.startsWith('W')}
                            />
                            <Stat 
                              icon={<FiUsers className="text-blue-400" />} 
                              label="Состав" 
                              value="22 игрока" 
                            />
                            <Stat 
                              icon={<FiAward className="text-yellow-400" />} 
                              label="Трофеи" 
                              value="3" 
                            />
                          </div>
                        </div>
                      </motion.div>
                    </td>
                  </motion.tr>
                );
              })()}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
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
    className={`flex items-center gap-3 bg-gray-800/50 rounded-lg px-3 py-2 ${highlight ? 'ring-1 ring-green-400/50' : ''}`}
    whileHover={{ y: -2 }}
  >
    <span className="text-lg">{icon}</span>
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className={`font-medium ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</div>
    </div>
  </motion.div>
);

const Legend = ({ color, label, icon }) => (
  <motion.div 
    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/50"
    whileHover={{ scale: 1.05 }}
  >
    <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${color}`}></span>
    <span className="text-gray-300 text-sm">{label}</span>
    {icon && <span className="text-xs">{icon}</span>}
  </motion.div>
);

export default TableView;