import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
const DordoyBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef(null);

const slides = [
  {
    title: "АЛГА ДОРДОЙ",
    subtitle: "Непобедимый дух Кыргызстана",
    media: "/Champ10n.mp4",
    cta: "Купить билеты",
    link: "https://kassir.kg/ru/category/sport", // ссылка на билеты
    color: "#FFD700",
    stats: [
      { value: "26", label: "Трофеев" },
      { value: "1997", label: "Основан" },
      { value: "12K", label: "Фанатов" }
    ]
  },
  {
    title: "БААТЫРЛАР",
    subtitle: "Гордость нации",
    cta: "Состав команды",
    link: "/team", // ссылка на состав команды
    color: "#E10600",
    secondaryColor: "#A80500",
    stats: [
      { value: "23", label: "Игрока" },
      { value: "100%", label: "Отдача" },
      { value: "7", label: "Легенд" }
    ]
  },
  {
    title: "ДУХ ПОБЕДЫ",
    subtitle: "История великих достижений",
    cta: "История клуба",
    link: "/about", // ссылка на историю клуба
    color: "#005BBB",
    secondaryColor: "#003D7A",
    stats: [
      { value: "150+", label: "Матчей" },
      { value: "82%", label: "Побед" },
      { value: "3", label: "Звезды" }
    ]
  }
];


  useEffect(() => {
    // Запускаем вступительную анимацию только при первом рендере
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // Общее время анимации
    
    const interval = setInterval(() => {
      if (!showIntro) handleNext();
    }, 8000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentSlide, showIntro]);

  
  const handleNext = () => {
    controls.start("exit");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      controls.start("enter");
    }, 800);
  };

  const handlePrev = () => {
    controls.start("exit");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      controls.start("enter");
    }, 800);
  };

  const WaveText = ({ children, delay = 0 }) => {
    return (
      <div className="overflow-hidden inline-flex">
        <motion.span
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Статичное видео-фон — всегда только первый слайд */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={slides[0].media} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Вступительная анимация */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {showIntro && (
  <motion.div
    className="absolute inset-0 z-50 flex items-center justify-center bg-black"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.1, 1],
        opacity: [0, 1, 1],
        rotate: [0, 5, -3, 0]
      }}
      transition={{ 
        duration: 1.8,
        times: [0, 0.6, 1],
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.h1
        className="text-8xl font-black uppercase tracking-tighter text-center"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: "#FFD700",
          textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
          lineHeight: 0.9
        }}
        initial={{ letterSpacing: "50px", opacity: 0 }}
        animate={{ 
          letterSpacing: "10px",
          opacity: 1
        }}
        transition={{
          delay: 0.3,
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          АЛГА
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ color: "#0000ff", textShadow: "0 0 20px rgba(0, 0, 255, 0.8)" }}
        >
          ДОРДОЙ
        </motion.div>
      </motion.h1>
      
      {/* Эффект вспышки */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-full mix-blend-overlay"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 4],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          delay: 0.8,
          duration: 1.2,
          ease: "easeOut"
        }}
      />
      
      {/* Эффект частиц золота */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-yellow-400 rounded-full"
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0]
          }}
          transition={{ 
            delay: 1 + i * 0.03,
            duration: 1.5,
            ease: "easeOut"
          }}
          style={{
            left: "50%",
            top: "50%",
            boxShadow: "0 0 10px #FFD700"
          }}
        />
      ))}
      
      {/* Эффект волны */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: 1.5,
          opacity: [0, 0.5, 0]
        }}
        transition={{
          delay: 0.7,
          duration: 1.5,
          ease: "easeOut"
        }}
      >
        <div className="absolute inset-0 border-4 border-yellow-400 rounded-full"></div>
      </motion.div>
    </motion.div>
  </motion.div>
)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Основной контент (показывается только после вступительной анимации) */}
      {!showIntro && (
        <div className="relative h-full flex items-center z-10 px-8 md:px-16 lg:px-24">
          <motion.div
            className="max-w-3xl"
            variants={{
              enter: { x: 0, opacity: 1 },
              exit: { x: -100, opacity: 0 }
            }}
            initial="exit"
            animate={controls}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-6 tracking-tight">
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: slides[currentSlide].color,
                  textShadow: `0 0 20px ${slides[currentSlide].color}80`
                }}
              >
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <WaveText delay={0.1 + i * 0.1}>{word}</WaveText>
                  </div>
                ))}
              </span>
            </h1>

            <motion.h2
              className="text-2xl md:text-3xl text-white mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {slides[currentSlide].subtitle}
            </motion.h2>

            <Link to={slides[currentSlide].link}>
  <motion.button
    className="px-8 py-4 font-bold rounded-lg text-lg uppercase tracking-wider relative overflow-hidden group"
    style={{
      background: slides[currentSlide].color,
      color: '#111'
    }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    whileHover={{
      scale: 1.05,
      boxShadow: `0 0 30px ${slides[currentSlide].color}`
    }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="relative z-10 flex items-center">
      {slides[currentSlide].cta}
      <svg className="ml-3" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </motion.button>
</Link>


            {/* Статистика */}
            <motion.div
              className="flex gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {slides[currentSlide].stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold" style={{ color: slides[currentSlide].color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-white/80 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Навигация (показывается только после вступительной анимации) */}
      {!showIntro && (
        <div className="absolute bottom-8 left-0 right-0 z-20 px-8 md:px-16 lg:px-24">
          <div className="flex justify-between items-center">
            {/* Индикаторы */}
            <div className="flex gap-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentSlide) {
                      controls.start("exit");
                      setTimeout(() => {
                        setCurrentSlide(i);
                        controls.start("enter");
                      }, 800);
                    }
                  }}
                  className="relative"
                >
                  <div className={`w-8 h-1 rounded-full transition-all ${currentSlide === i ? 'bg-white' : 'bg-white/30'}`}>
                    {currentSlide === i && (
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 8, ease: 'linear' }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Кнопки стрелок */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DordoyBanner;