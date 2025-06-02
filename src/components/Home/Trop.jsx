import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

const TrophySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTrophy, setSelectedTrophy] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);

  // Эффект параллакса при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY - sectionRef.current.offsetTop;
        controls.start({
          y: -scrollY * 0.2,
          transition: { type: 'spring', damping: 30 }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const categories = [
    { id: 'all', name: 'Все трофеи', icon: '🏆', color: 'from-purple-600 to-blue-600' },
    { id: 'league', name: 'Чемпионаты', icon: '⭐', color: 'from-emerald-600 to-teal-500' },
    { id: 'cup', name: 'Кубки', icon: '🏅', color: 'from-amber-600 to-yellow-500' },
    { id: 'continental', name: 'Континентальные', icon: '🌍', color: 'from-red-600 to-orange-500' },
    { id: 'super', name: 'Суперкубки', icon: '⚡', color: 'from-indigo-600 to-purple-500' }
  ];

  const trophies = [
    {
      id: 1,
      title: "Чемпион Кыргызстана",
      year: "2023",
      category: "league",
      image: "https://fc-dordoi.kg/image?format=raw&id=12194&type=img",
      stats: {
        matches: 30,
        wins: 26,
        draws: 3,
        losses: 1,
        goals: 72,
        bestPlayer: "Алишер Азизов",
        topScorer: "Мухаммаджон Рахимов (18 голов)",
        cleanSheets: 15
      },
      highlight: "Рекордные 26 побед за сезон",
      description: "Доминирующий сезон, в котором Дордой установил рекорд лиги по количеству побед и очков. Команда демонстрировала яркий атакующий футбол и надежную оборону.",
      videoHighlight: "https://youtube.com/embed/example1"
    },
    {
      id: 2,
      title: "Кубок Кыргызстана",
      year: "2022",
      category: "cup",
      image: "https://sport.kg/uploads/posts/2020-09/1600968493_kubok-kyrgyzstana.jpg",
      stats: {
        matches: 5,
        wins: 5,
        draws: 0,
        losses: 0,
        goals: 14,
        bestPlayer: "Эрнист Батырканов",
        topScorer: "Кайрат Жыргалбеков (5 голов)",
        cleanSheets: 3
      },
      highlight: "Идеальный кубковый путь без поражений",
      description: "Бескомпромиссный кубковый турнир, где Дордой не оставил шансов соперникам. В финале была повержена главная команда-соперник со счетом 3:0.",
      videoHighlight: "https://youtube.com/embed/example2"
    },
    {
      id: 3,
      title: "Кубок AFC",
      year: "2021",
      category: "continental",
      image: "https://kfu.kg/newslists/December2023/7BSqsm7gEVeTG1iKEUPk.jpg",
      stats: {
        matches: 8,
        wins: 6,
        draws: 1,
        losses: 1,
        goals: 19,
        bestPlayer: "Талант Самыков",
        topScorer: "Айбек Омурзаков (7 голов)",
        cleanSheets: 4
      },
      highlight: "Первая международная победа в истории клуба",
      description: "Историческое достижение для кыргызстанского футбола. Дордой стал первой командой из Кыргызстана, выигравшей международный турнир под эгидой AFC.",
      videoHighlight: "https://youtube.com/embed/example3"
    },
    {
      id: 4,
      title: "Суперкубок Кыргызстана",
      year: "2023",
      category: "super",
      image: "https://sport.kg/uploads/posts/2025-01/1737585151_match-superkubok-kyrgyzstana.jpg",
      stats: {
        matches: 1,
        wins: 1,
        draws: 0,
        losses: 0,
        goals: 2,
        bestPlayer: "Азамат Байматов",
        topScorer: "Мухаммаджон Рахимов (1 гол)",
        cleanSheets: 0
      },
      highlight: "Драматичная победа в дополнительное время",
      description: "Напряженный матч против принципиального соперника, решившийся только на 107-й минуте благодаря точному удару капитана команды.",
      videoHighlight: "https://youtube.com/embed/example4"
    },
    {
      id: 5,
      title: "Чемпион Кыргызстана",
      year: "2020",
      category: "league",
      image: "https://fc-dordoi.kg/image?format=raw&id=11783&type=img",
      stats: {
        matches: 28,
        wins: 22,
        draws: 4,
        losses: 2,
        goals: 65,
        bestPlayer: "Виктор Майер",
        topScorer: "Виктор Майер (15 голов)",
        cleanSheets: 12
      },
      highlight: "Золотой дубль (чемпионат + кубок)",
      description: "Сезон полного доминирования, в котором Дордой не только уверенно выиграл чемпионат, но и взял Кубок страны, обыграв в финале главного конкурента.",
      videoHighlight: "https://youtube.com/embed/example5"
    }
  ];

  const filteredTrophies = activeCategory === 'all' 
    ? trophies 
    : trophies.filter(t => t.category === activeCategory);

  const trophyVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8, rotate: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }),
    hover: {
      y: -30,
      scale: 1.1,
      rotate: [0, -2, 2, 0],
      boxShadow: "0 35px 60px -15px rgba(234, 179, 8, 0.5)",
      transition: { 
        duration: 0.5,
        y: { type: "spring", stiffness: 300, damping: 10 }
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      y: -3,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Анимация перехода
    controls.start({
      scale: 0.9,
      opacity: 0.5,
      transition: { duration: 0.2 }
    }).then(() => {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5, type: "spring" }
      });
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-blue-900 to-gray-900 overflow-hidden"
    >
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0,
              background: `rgba(234, 179, 8, ${Math.random() * 0.3})`
            }}
            animate={{
              x: Math.random() * 3000 - 1500,
              y: Math.random() * 3000 - 1500,
              opacity: [0, Math.random() * 0.2, 0],
              scale: [0, Math.random() * 3 + 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 30 + 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 10 + 5}px)`
            }}
          />
        ))}
      </div>

      {/* Световые эффекты */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Эпичный заголовок с эффектом свечения */}
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", damping: 10 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={controls}
            className="inline-block"
          >
            <h2 
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-6 tracking-wider"
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                textShadow: '0 0 10px rgba(234, 179, 8, 0.5)',
                letterSpacing: '5px'
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.span
                animate={isHovering ? { 
                  textShadow: '0 0 20px rgba(234, 179, 8, 0.8)',
                  scale: 1.05
                } : {}}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ЗАЛ СЛАВЫ
              </motion.span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Великие победы и легендарные достижения <span className="font-bold text-yellow-400">ФК "Дордой"</span> в истории кыргызского футбола
          </motion.p>
          
          {/* Анимированная линия */}
          <motion.div
            className="mx-auto mt-8 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ delay: 0.8, duration: 1.5, type: "spring" }}
          />
        </motion.div>

        {/* Категории с эффектными анимациями */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              variants={categoryVariants}
              custom={i}
              whileHover="hover"
              whileTap="tap"
              className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-3 relative overflow-hidden ${
                activeCategory === category.id 
                  ? 'text-white shadow-2xl scale-105' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
              style={{
                background: activeCategory === category.id ? 
                  `linear-gradient(135deg, var(--tw-gradient-stops))` : ''
              }}
            >
              {/* Градиентный фон для активной категории */}
              {activeCategory === category.id && (
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-br opacity-80"
                  style={{
                    background: `linear-gradient(135deg, ${category.color.replace('from-', '').replace('to-', '').replace(' ', ', ')})`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              
              <span className="text-3xl z-10">{category.icon}</span>
              <span className="z-10">{category.name}</span>
              
              {/* Эффект при наведении */}
              {activeCategory !== category.id && (
                <motion.span 
                  className="absolute inset-0 bg-white/5 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Карусель трофеев с параллакс-эффектом */}
        {filteredTrophies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-24"
          >
            <Swiper
              ref={swiperRef}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              parallax={true}
              coverflowEffect={{
                rotate: 10,
                stretch: -50,
                depth: 200,
                modifier: 3,
                slideShadows: true
              }}
              modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Parallax]}
              className="mySwiper"
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
                renderBullet: (index, className) => {
                  return `<span class="${className}" style="background: linear-gradient(to right, #f59e0b, #fbbf24); width: 12px; height: 12px; margin: 0 8px;"></span>`;
                }
              }}
              autoplay={{ 
                delay: 4000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                640: {
                  coverflowEffect: {
                    rotate: 5,
                    stretch: 0,
                    depth: 150,
                    modifier: 2.5
                  }
                },
                1024: {
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 3
                  }
                }
              }}
            >
              {filteredTrophies.map(trophy => (
                <SwiperSlide 
                  key={trophy.id} 
                  className="max-w-xs lg:max-w-sm"
                  onClick={() => setSelectedTrophy(trophy)}
                >
                  <motion.div
                    className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/50 cursor-pointer"
                    whileHover={{ 
                      y: -30,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Лента трофея с анимацией */}
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center"
                      initial={{ y: -50 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="text-yellow-400 font-bold text-xl tracking-wider">{trophy.year}</span>
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                    </motion.div>
                    
                    {/* Изображение трофея с эффектом свечения */}
                    <div className="absolute top-20 left-0 right-0 bottom-0 flex items-center justify-center p-8">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img 
                          src={trophy.image} 
                          alt={trophy.title}
                          className="w-full h-full object-contain"
                          data-swiper-parallax="-100"
                        />
                        <motion.div 
                          className="absolute inset-0 bg-yellow-400/10 rounded-full blur-md"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.3, 0.1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Отражение с анимацией */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent opacity-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: 0.7 }}
                    />
                    
                    {/* Название и категория */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                      <motion.h3 
                        className="text-2xl font-bold text-white text-center mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {trophy.title}
                      </motion.h3>
                      <motion.div
                        className="text-yellow-400 text-sm font-medium text-center uppercase tracking-widest"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        {categories.find(c => c.id === trophy.category)?.name}
                      </motion.div>
                    </div>
                    
                    {/* Эффект при наведении */}
                    <motion.div 
                      className="absolute inset-0 bg-yellow-400/10 opacity-0 rounded-2xl"
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
              
              {/* Кастомные кнопки навигации */}
              <div className="swiper-button-next !text-yellow-400 !w-14 !h-14 !rounded-full !bg-black/50 !backdrop-blur-sm after:!text-xl"></div>
              <div className="swiper-button-prev !text-yellow-400 !w-14 !h-14 !rounded-full !bg-black/50 !backdrop-blur-sm after:!text-xl"></div>
            </Swiper>
          </motion.div>
        )}

        {/* Сетка трофеев с эффектной анимацией появления */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5
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
              className="relative h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl border border-yellow-400/30 cursor-pointer group"
              onClick={() => setSelectedTrophy(trophy)}
            >
              {/* Лента трофея */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-lg">{trophy.year}</span>
              </div>
              
              {/* Изображение трофея с эффектом свечения при наведении */}
              <div className="absolute top-16 left-0 right-0 bottom-0 flex items-center justify-center p-8">
                <img 
                  src={trophy.image} 
                  alt={trophy.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-yellow-400/0 rounded-full blur-md transition-all duration-500 group-hover:bg-yellow-400/10 group-hover:scale-105"></div>
              </div>
              
              {/* Отражение */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              {/* Название и категория */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white text-center mb-1">{trophy.title}</h3>
                <div className="text-yellow-400 text-xs font-medium text-center uppercase tracking-widest">
                  {categories.find(c => c.id === trophy.category)?.name}
                </div>
              </div>
              
              {/* Эффект при наведении */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="inline-block px-3 py-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full">
                    Подробнее
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Сообщение если нет трофеев */}
        {filteredTrophies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center py-20"
          >
            <motion.div 
              className="text-9xl mb-8 inline-block"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🏆
            </motion.div>
            <h3 className="text-4xl font-bold text-yellow-400 mb-6">Трофеи не найдены</h3>
            <p className="text-xl text-gray-300 mb-8">В этой категории пока нет завоеванных трофеев</p>
            <motion.button
              onClick={() => setActiveCategory('all')}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              Показать все трофеи
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Эпичное модальное окно с деталями трофея */}
      <AnimatePresence>
        {selectedTrophy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedTrophy(null)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-3xl border border-yellow-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия с анимацией */}
              <motion.button 
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-blue-900/80 hover:bg-blue-800 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg border border-yellow-400/30"
                onClick={() => setSelectedTrophy(null)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* Контент */}
              <div className="lg:flex">
                {/* Левая часть - изображение и видео */}
                <div className="lg:w-1/2 p-8 lg:p-12 relative">
                  {/* Лента с годом */}
                  <div className="absolute top-8 left-8 z-10 px-4 py-2 bg-yellow-400 text-blue-900 font-bold rounded-r-lg shadow-md">
                    {selectedTrophy.year}
                  </div>
                  
                  {/* Изображение трофея с эффектом свечения */}
                  <div className="relative h-96 lg:h-[500px] mb-8 flex items-center justify-center">
                    <img 
                      src={selectedTrophy.image} 
                      alt={selectedTrophy.title}
                      className="w-full h-full object-contain z-10 relative"
                    />
                    <div className="absolute inset-0 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                  </div>
                  
                  {/* Видео-хайлайты */}
                  {selectedTrophy.videoHighlight && (
                    <div className="rounded-xl overflow-hidden shadow-2xl border border-yellow-400/20">
                      <div className="bg-black py-3 px-4 flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-yellow-400 text-sm font-medium">ТУРНИРНЫЕ ХАЙЛАЙТЫ</span>
                      </div>
                      <iframe
                        src={selectedTrophy.videoHighlight}
                        className="w-full h-48 lg:h-64"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
                
                {/* Правая часть - информация */}
                <div className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-b from-gray-800/50 to-gray-900/80">
                  <div className="mb-8">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-4">
                      {selectedTrophy.title} <span className="text-white">{selectedTrophy.year}</span>
                    </h2>
                    
                    {/* Категория */}
                    <div className="inline-block px-3 py-1 bg-blue-900/80 text-yellow-400 text-sm font-bold rounded-full mb-6">
                      {categories.find(c => c.id === selectedTrophy.category)?.name}
                    </div>
                    
                    {/* Основное описание */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {selectedTrophy.description}
                    </p>
                    
                    {/* Особое достижение */}
                    {selectedTrophy.highlight && (
                      <div className="flex items-start mb-6">
                        <div className="text-2xl mr-3 text-yellow-400">✨</div>
                        <p className="text-yellow-300 font-medium flex-1">
                          <span className="font-bold">Исторический факт:</span> {selectedTrophy.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Статистика с анимацией появления */}
                  <motion.div 
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      СТАТИСТИКА ТУРНИРА
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedTrophy.stats).map(([key, value]) => (
                        <motion.div 
                          key={key}
                          className="bg-gray-800/50 rounded-lg p-4 shadow-sm border border-gray-700 hover:border-yellow-400/30 transition-all"
                          whileHover={{ y: -5 }}
                        >
                          <p className="text-gray-400 text-sm uppercase mb-1">
                            {key === 'matches' ? 'Матчи' : 
                             key === 'wins' ? 'Победы' : 
                             key === 'draws' ? 'Ничьи' : 
                             key === 'losses' ? 'Поражения' : 
                             key === 'goals' ? 'Голы' : 
                             key === 'bestPlayer' ? 'Лучший игрок' : 
                             key === 'topScorer' ? 'Лучший бомбардир' :
key === 'cleanSheets' ? 'Сухие матчи' : key}
</p>
<p className="text-white font-bold">
{value}
</p>
</motion.div>
))}
</div>
</motion.div>

              {/* Кнопка закрытия */}
              <motion.button
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg flex items-center justify-center gap-2 transition-all"
                onClick={() => setSelectedTrophy(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Закрыть
              </motion.button>
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