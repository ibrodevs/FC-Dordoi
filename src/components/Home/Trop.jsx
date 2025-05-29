import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TrophySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTrophy, setSelectedTrophy] = useState(null);
  const swiperRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Все трофеи', icon: '🏆' },
    { id: 'league', name: 'Чемпионаты', icon: '⭐' },
    { id: 'cup', name: 'Кубки', icon: '🏅' },
    { id: 'continental', name: 'Континентальные', icon: '🌍' },
    { id: 'super', name: 'Суперкубки', icon: '⚡' }
  ];

  const trophies = [
    {
      id: 1,
      title: "Чемпион Кыргызстана",
      year: "2023",
      category: "league",
      image: "/trophies/league-2023.png",
      stats: {
        matches: 30,
        wins: 26,
        draws: 3,
        losses: 1,
        goals: 72,
        bestPlayer: "Алишер Азизов"
      },
      highlight: "Рекордные 26 побед за сезон"
    },
    // Добавьте остальные трофеи...
  ];

  const filteredTrophies = activeCategory === 'all' 
    ? trophies 
    : trophies.filter(t => t.category === activeCategory);

  const trophyVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -20,
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.4)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Анимированные элементы фона */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-2 border-yellow-400 rounded-full"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: Math.random() * 2000 - 1000,
              y: Math.random() * 2000 - 1000,
              opacity: [0, 0.1, 0],
              scale: [0, Math.random() * 1.5 + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-blue-900 mb-4" 
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
            ЗАЛ ТРОФЕЕВ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            История побед и достижений ФК "Дордой"
          </p>
        </motion.div>

        {/* Категории */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                activeCategory === category.id 
                  ? 'bg-blue-900 text-yellow-400 shadow-xl scale-105' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Карусель трофеев */}
        {filteredTrophies.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <Swiper
              ref={swiperRef}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true
              }}
              modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
              className="mySwiper"
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {filteredTrophies.map(trophy => (
                <SwiperSlide key={trophy.id} className="max-w-xs">
                  <motion.div
                    className="relative h-96 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-2xl border-2 border-yellow-400 cursor-pointer"
                    whileHover={{ y: -15 }}
                    onClick={() => setSelectedTrophy(trophy)}
                  >
                    {/* Лента трофея */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-lg">{trophy.year}</span>
                    </div>
                    
                    {/* Изображение трофея */}
                    <div className="absolute top-16 left-0 right-0 bottom-0 flex items-center justify-center p-8">
                      <img 
                        src={trophy.image} 
                        alt={trophy.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Отражение */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent opacity-30"></div>
                    
                    {/* Название */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white text-center">{trophy.title}</h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* Сетка трофеев */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredTrophies.map((trophy, i) => (
            <motion.div
              key={trophy.id}
              variants={trophyVariants}
              custom={i}
              whileHover="hover"
              className="relative h-96 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-xl border-2 border-yellow-400 cursor-pointer"
              onClick={() => setSelectedTrophy(trophy)}
            >
              {/* Лента трофея */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-lg">{trophy.year}</span>
              </div>
              
              {/* Изображение трофея */}
              <div className="absolute top-16 left-0 right-0 bottom-0 flex items-center justify-center p-8">
                <img 
                  src={trophy.image} 
                  alt={trophy.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Отражение */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent opacity-30"></div>
              
              {/* Название */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white text-center">{trophy.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Сообщение если нет трофеев */}
        {filteredTrophies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🏆</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Трофеи не найдены</h3>
            <p className="text-gray-600">Выберите другую категорию</p>
          </motion.div>
        )}
      </div>

      {/* Модальное окно с деталями трофея */}
      <AnimatePresence>
        {selectedTrophy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTrophy(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button 
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all shadow-lg"
                onClick={() => setSelectedTrophy(null)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Контент */}
              <div className="md:flex">
                {/* Изображение трофея */}
                <div className="md:w-1/2 bg-gradient-to-b from-gray-100 to-white p-8 flex items-center justify-center">
                  <div className="relative w-full h-96">
                    <img 
                      src={selectedTrophy.image} 
                      alt={selectedTrophy.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
                  </div>
                </div>
                
                {/* Информация */}
                <div className="md:w-1/2 p-8 bg-gray-50">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-blue-900 mb-2">
                      {selectedTrophy.title} {selectedTrophy.year}
                    </h2>
                    <div className="w-20 h-1 bg-yellow-400 mb-4"></div>
                    {selectedTrophy.highlight && (
                      <p className="text-yellow-600 font-medium mb-4">✨ {selectedTrophy.highlight}</p>
                    )}
                  </div>
                  
                  {/* Статистика */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">СТАТИСТИКА ТУРНИРА</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedTrophy.stats).map(([key, value]) => (
                        <div key={key} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                          <p className="text-gray-500 text-sm uppercase">
                            {key === 'matches' ? 'Матчи' : 
                             key === 'wins' ? 'Победы' : 
                             key === 'draws' ? 'Ничьи' : 
                             key === 'losses' ? 'Поражения' : 
                             key === 'goals' ? 'Голы' : 
                             key === 'bestPlayer' ? 'Лучший игрок' : key}
                          </p>
                          <p className={`text-xl font-bold ${
                            key === 'bestPlayer' ? 'text-blue-600' : 'text-gray-800'
                          }`}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Кнопки */}
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-blue-900 hover:bg-blue-800 text-yellow-400 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      История
                    </button>
                    <button className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                      </svg>
                      Поделиться
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TrophySection;