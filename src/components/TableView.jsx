import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiChevronDown, FiChevronUp, FiInfo, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useState } from 'react';

const TableView = ({ standings }) => {
  const [expandedTeam, setExpandedTeam] = useState(null);

  const toggleExpand = (teamName) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };

  const getPositionStyle = (position) => {
    if (position === 1) return 'bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-500 text-black shadow-[0_0_16px_4px_rgba(255,255,0,0.5)]';
    if (position <= 2) return 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_0_12px_2px_rgba(16,185,129,0.4)]';
    if (position <= 4) return 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white';
    if (position >= standings.length - 2) return 'bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-[0_0_12px_2px_rgba(239,68,68,0.4)]';
    return 'bg-gradient-to-br from-gray-700 to-gray-800 text-white';
  };

  // Для анимации блесток в заголовке
  const Sparkles = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-yellow-200 opacity-70 blur-[2px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.8, 0.2, 0.8],
            scale: [1, 1.5, 1],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-[0_8px_48px_rgba(80,0,180,0.25)] border border-gray-700 overflow-hidden relative"
    >
      {/* Заголовок с параллаксом и блестками */}
      <div className="p-7 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"/>
        <Sparkles />
        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-white drop-shadow-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 16px #fff, 0 0 32px #facc15',
                '0 0 32px #fff, 0 0 64px #facc15',
                '0 0 16px #fff, 0 0 32px #facc15'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiAward className="mr-4 text-yellow-400 animate-pulse drop-shadow" />
          </motion.span>
          Турнирная таблица Премьер Лиги
        </motion.h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 uppercase tracking-wider">
            <tr>
              <th className="py-5 px-6 text-left">Поз.</th>
              <th className="py-5 px-6 text-left">Команда</th>
              <th className="py-5 px-6 text-center">И</th>
              <th className="py-5 px-6 text-center">В</th>
              <th className="py-5 px-6 text-center">Н</th>
              <th className="py-5 px-6 text-center">П</th>
              <th className="py-5 px-6 text-center">О</th>
              <th className="py-5 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/40">
            {standings.map((team, index) => (
              <motion.tr 
                key={team.team}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, type: 'spring', stiffness: 80 }}
                className={`transition-all duration-300 ease-in-out transform hover:scale-[1.012] ${expandedTeam === team.team ? 'bg-gradient-to-r from-gray-800/80 to-gray-900/80' : 'hover:bg-gray-800/60'} ${team.team === 'Дордой' ? 'bg-yellow-800/20 font-bold' : ''}`}
              >
                <td className="py-4 px-6">
                  <span 
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-base font-extrabold shadow-inner ring-2 ring-yellow-200/30 ${getPositionStyle(team.position)} transition-all duration-300`}
                  >
                    {team.position}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <motion.img 
                        whileHover={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(team.team)}&background=${index % 2 === 0 ? 'ffd700' : '4f46e5'}&color=222&size=48&bold=true`}
                        alt={team.team} 
                        className="w-12 h-12 rounded-full border-2 border-yellow-400/70 shadow-lg bg-gradient-to-br from-gray-700 to-gray-900"
                      />
                      {team.position === 1 && (
                        <motion.div 
                          className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <span className="text-base font-bold text-gray-900">👑</span>
                        </motion.div>
                      )}
                    </div>
                    <span className={`${team.team === 'Дордой' ? 'text-yellow-300' : 'text-gray-100'} text-lg font-semibold`}>
                      {team.team}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center text-gray-300">{team.played}</td>
                <td className="py-4 px-6 text-center text-green-400 font-bold">{team.won}</td>
                <td className="py-4 px-6 text-center text-blue-400 font-bold">{team.drawn}</td>
                <td className="py-4 px-6 text-center text-red-400 font-bold">{team.lost}</td>
                <td className="py-4 px-6 text-center font-extrabold text-white text-lg">{team.points}</td>
                <td className="py-4 px-3 text-center">
                  <motion.button
                    onClick={() => toggleExpand(team.team)}
                    whileTap={{ scale: 0.85 }}
                    className="text-gray-400 hover:text-yellow-300 p-2 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg transition-all"
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
                  >
                    <td colSpan="8" className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-7 text-gray-100 relative overflow-hidden">
                      <motion.div
                        initial={{ scale: 0.95, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row items-center gap-6"
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(team.team)}&background=ffd700&color=222&size=72&bold=true`}
                            alt={team.team}
                            className="w-20 h-20 rounded-full border-4 border-yellow-400/70 shadow-xl bg-gradient-to-br from-yellow-300 to-yellow-400"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xl font-bold text-yellow-200">
                            <FiInfo className="text-yellow-400" />
                            {team.team} — подробная информация
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <Stat icon={<FiTrendingUp />} label="Последние матчи" value="W W D L W" color="text-emerald-400" />
                            <Stat icon={<FiUsers />} label="Состав" value="22 игрока" color="text-blue-300" />
                            <Stat icon={<FiAward />} label="Трофеи" value="3" color="text-yellow-300" />
                          </div>
                          <div className="mt-3 text-gray-300/90">
                            <span className="text-yellow-300 font-semibold">Форма:</span> {team.form || 'Нет данных'}
                          </div>
                        </div>
                      </motion.div>
                      {/* Красивый неоновый фон */}
                      <motion.div
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-32 blur-2xl opacity-30 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 pointer-events-none"
                        animate={{ opacity: [0.2, 0.35, 0.2] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      />
                    </td>
                  </motion.tr>
                );
              })()}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 text-sm">
        <div className="flex flex-wrap items-center gap-5">
          <Legend color="from-yellow-400 to-yellow-600" label="Чемпион" glow="shadow-[0_0_18px_4px_rgba(250,204,21,0.7)]" />
          <Legend color="from-emerald-400 to-teal-500" label="Лига чемпионов АФК" glow="shadow-[0_0_16px_3px_rgba(16,185,129,0.5)]" />
          <Legend color="from-blue-500 to-indigo-500" label="Кубок АФК" glow="shadow-[0_0_12px_2px_rgba(59,130,246,0.4)]" />
          <Legend color="from-red-600 to-rose-600" label="Зона вылета" glow="shadow-[0_0_14px_2px_rgba(239,68,68,0.5)]" />
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-2 bg-gray-800/80 rounded-xl px-4 py-2 shadow-inner">
    <span className={`text-xl ${color}`}>{icon}</span>
    <span className="text-gray-300">{label}:</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

const Legend = ({ color, label, glow }) => (
  <div className="flex items-center">
    <span className={`inline-block w-4 h-4 rounded-full bg-gradient-to-r ${color} mr-2 ${glow}`}></span>
    <span className="text-gray-300 font-semibold drop-shadow">{label}</span>
  </div>
);

export default TableView;
