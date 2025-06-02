import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParallax } from 'react-scroll-parallax';

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState('league');
  const [isHovered, setIsHovered] = useState(null);
  const containerRef = useRef(null);
  
  const { ref: parallaxRef } = useParallax({
    speed: -10,
  });

  const trophies = {
    league: [
      { year: '2023', name: 'Чемпион Премьер-лиги', count: 14, image: '/trophy1.png' },
      { year: '2022', name: 'Чемпион Премьер-лиги', count: 13, image: '/trophy1.png' },
      { year: '2021', name: 'Чемпион Премьер-лиги', count: 12, image: '/trophy1.png' },
      { year: '2019', name: 'Чемпион Премьер-лиги', count: 11, image: '/trophy1.png' },
      { year: '2018', name: 'Чемпион Премьер-лиги', count: 10, image: '/trophy1.png' },
      { year: '2017', name: 'Чемпион Премьер-лиги', count: 9, image: '/trophy1.png' },
    ],
    cup: [
      { year: '2023', name: 'Обладатель Кубка', count: 8, image: '/cup.png' },
      { year: '2020', name: 'Обладатель Кубка', count: 7, image: '/cup.png' },
      { year: '2016', name: 'Обладатель Кубка', count: 6, image: '/cup.png' },
      { year: '2014', name: 'Обладатель Кубка', count: 5, image: '/cup.png' },
    ],
    international: [
      { year: '2023', name: 'Кубок АФК', count: 1, image: '/afc.png' },
      { year: '2021', name: 'Кубок Президента АФК', count: 2, image: '/president.png' },
      { year: '2019', name: 'Кубок Президента АФК', count: 1, image: '/president.png' },
    ]
  };

  const stats = [
    { number: "14", label: "Чемпионских титулов", icon: "🏆" },
    { number: "8", label: "Кубков страны", icon: "🥇" },
    { number: "3", label: "Международных трофеев", icon: "🌍" },
    { number: "25+", label: "Лет истории", icon: "📅" },
    { number: "150+", label: "Европейских матчей", icon: "⚽" },
    { number: "10", label: "Золотых мячей", icon: "⭐" },
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden"
      ref={containerRef}
    >
      {/* Параллакс фоновые элементы */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/stadium-pattern.svg')] opacity-5"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-64 h-64 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Анимированный заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-6">
            ДОСТИЖЕНИЯ
          </h1>
          <div className="relative inline-block">
            <div className="w-48 h-2 bg-yellow-400 mx-auto mb-2"></div>
            <div className="w-48 h-1 bg-yellow-200 mx-auto opacity-70"></div>
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ width: '100%' }}
            />
          </div>
        </motion.div>

        {/* 3D Табы */}
        <motion.div 
          className="flex justify-center mb-16 space-x-2 md:space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Object.keys(trophies).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-500/50'
                  : 'bg-blue-800/70 text-yellow-100 hover:bg-blue-700/80 backdrop-blur-sm border border-blue-600'
              }`}
            >
              {tab === 'league' && 'Чемпионаты'}
              {tab === 'cup' && 'Кубки'}
              {tab === 'international' && 'Международные'}
            </motion.button>
          ))}
        </motion.div>

        {/* Анимированные трофеи */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {trophies[activeTab].map((trophy, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-2xl bg-yellow-400/20 blur-md transition-all duration-500 ${
                  isHovered === index ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
                }`}></div>
                
                <motion.div
                  whileHover={{ y: -10 }}
                  className={`relative bg-gradient-to-br from-blue-800/90 to-blue-900/90 rounded-2xl p-6 shadow-2xl border-2 ${
                    isHovered === index 
                      ? 'border-yellow-400 shadow-yellow-400/20' 
                      : 'border-yellow-400/30'
                  } backdrop-blur-sm overflow-hidden`}
                >
                  {/* Эффект блика */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent transition-all duration-700 ${
                    isHovered === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  
                  <div className="flex items-start justify-between z-10 relative">
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-1">{trophy.name}</h3>
                      <p className="text-blue-200 text-lg font-medium">{trophy.year}</p>
                    </div>
                    <motion.div 
                      animate={{ 
                        rotate: isHovered === index ? [0, 15, -15, 0] : 0,
                        scale: isHovered === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="w-20 h-20 flex items-center justify-center">
                        {/* Здесь можно вставить SVG или изображение трофея */}
                        <div className="text-4xl">
                          {activeTab === 'league' && '🏆'}
                          {activeTab === 'cup' && '🏅'}
                          {activeTab === 'international' && '🌎'}
                        </div>
                      </div>
                      <span className="absolute bottom-0 right-0 bg-yellow-400 text-blue-900 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                        {trophy.count}
                      </span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isHovered === index ? '100%' : 0 }}
                    className="h-0.5 bg-yellow-400 my-4 transition-all duration-300"
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 font-medium">ФК "Дордой"</span>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6 text-blue-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Статистика с параллаксом */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-blue-800/70 to-blue-900/70 rounded-2xl p-8 shadow-2xl border border-blue-600/30 backdrop-blur-sm"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
              ИСТОРИЯ В ЦИФРАХ
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-blue-900/60 rounded-xl p-4 text-center border border-blue-700/50 hover:border-yellow-400/50 transition-all"
              >
                <div className="text-5xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-yellow-400 mb-1">{stat.number}</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Эпичный баннер с параллаксом */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 relative rounded-2xl overflow-hidden h-96 bg-gradient-to-r from-blue-700/90 to-blue-900/90 border-2 border-yellow-400/30 shadow-2xl"
        >
          {/* Параллакс фон */}
          <div className="absolute inset-0 bg-[url('/stadium-bg.jpg')] bg-cover bg-center opacity-20"></div>
          
          {/* Контент */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            <motion.h3 
              className="text-5xl md:text-7xl font-extrabold text-yellow-400 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="text-stroke">ДОРДОЙ</span> - ЭТО ЛЕГЕНДА
            </motion.h3>
            
            <motion.p 
              className="text-xl text-blue-100 max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              Великие победы, незабываемые моменты и бесконечная страсть к футболу
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl text-lg uppercase tracking-wider shadow-lg"
            >
              Вся история клуба
            </motion.button>
          </div>
          
          {/* Эффекты */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-950/90 via-transparent to-blue-950/90"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-yellow-400 opacity-10 blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;