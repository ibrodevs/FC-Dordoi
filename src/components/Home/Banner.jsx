import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useViewportScroll } from 'framer-motion';

const DordoyBanner = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useViewportScroll();
  
  // Параллакс эффект для фона
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Данные для слайдов с улучшенными эффектами
  const slides = [
    {
      title: "ДОРДОЙ",
      subtitle: "НЕПОБЕДИМЫЕ",
      media: "../public/видео_дор.mp4",
      cta: "КУПИТЬ БИЛЕТЫ",
      color: "#FFD700",
      secondaryColor: "#C5A300",
      particles: 60,
      glow: true
    },
    {
      title: "БАТЫРЛАР",
      subtitle: "СИЛА КЫРГЫЗСТАНА",
      media: "../public/Champ10n.mp4",
      cta: "СМОТРЕТЬ РАСПИСАНИЕ",
      color: "#E10600",
      secondaryColor: "#A80500",
      particles: 80,
      glow: true
    },
    {
      title: "1997",
      subtitle: "ИСТОРИЯ ВЕЛИКИХ ПОБЕД",
      media: "/videos/fans-ultra.mp4",
      cta: "ИСТОРИЯ КЛУБА",
      color: "#005BBB",
      secondaryColor: "#003D7A",
      particles: 50,
      glow: false
    }
  ];

  // Эффекты для анимации
  useEffect(() => {
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);

    return () => {
      clearTimeout(introTimeout);
      clearInterval(slideInterval);
    };
  }, [slides.length]);

  // Эффект частиц с физикой
  const Particle = ({ index, total, color }) => {
    const size = Math.random() * 12 + 3;
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * 4;
    const rotation = Math.random() * 360;
    const path = Math.random() > 0.5 ? '150vw' : '-50vw';
    
    return (
      <motion.div
        className={`absolute rounded-full`}
        style={{ backgroundColor: color }}
        initial={{
          x: -200,
          y: `${(index / total) * 150 - 25}%`,
          scale: 0,
          opacity: 0,
          rotate: rotation,
        }}
        animate={{
          x: path,
          y: `${((index + Math.random() * 0.8 - 0.4) / total) * 150 - 25}%`,
          scale: [0, 1.5, 0],
          opacity: [0, 0.8, 0],
          rotate: rotation + 360,
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: delay,
        }}
      />
    );
  };

  // Взрыв света при смене слайда
  const LightExplosion = () => (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      initial={{ 
        opacity: 0,
        background: `radial-gradient(circle at center, ${slides[currentSlide].color}80, transparent 70%)`
      }}
      animate={{ 
        opacity: [0, 0.9, 0],
        scale: [0.5, 1.5]
      }}
      transition={{ 
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1]
      }}
    />
  );

  // Эффект "голограммы" для текста
  const HologramText = ({ children }) => (
    <motion.span
      className="relative inline-block"
      animate={{
        textShadow: [
          `0 0 10px ${slides[currentSlide].color}`,
          `0 0 20px ${slides[currentSlide].secondaryColor}`,
          `0 0 30px ${slides[currentSlide].color}`,
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
      {slides[currentSlide].glow && (
        <motion.span
          className="absolute inset-0 blur-md opacity-30"
          style={{
            background: `linear-gradient(90deg, ${slides[currentSlide].color}, ${slides[currentSlide].secondaryColor})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          {children}
        </motion.span>
      )}
    </motion.span>
  );

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black"
      ref={containerRef}
    >
      {/* ===== КИНОШНОЕ ИНТРО ===== */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black"
          >
            {/* Анимация "сборки" логотипа */}
            <motion.div
              initial={{ scale: 2.5, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Взрыв света */}
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400 mix-blend-color-dodge"
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [1, 0] }}
                transition={{ 
                  delay: 0.8,
                  duration: 1.5,
                }}
              />

              {/* Логотип с 3D-эффектом */}
              <motion.h1 
                className="text-center relative z-10"
                initial={{ y: 0 }}
                animate={{ y: -40 }}
                transition={{
                  delay: 2.5,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.span
                  className="block text-8xl md:text-10xl font-black text-yellow-400 uppercase tracking-tighter"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    perspective: '1000px',
                  }}
                  initial={{ 
                    opacity: 0, 
                    y: 80, 
                    letterSpacing: "60px",
                    rotateX: 85,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    letterSpacing: "8px",
                    rotateX: 0,
                    filter: 'blur(0px)',
                    textShadow: '0 0 30px rgba(255, 215, 0, 0.9)'
                  }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 1.8, 
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  АЛГА
                </motion.span>
                <motion.span
                  className="block text-9xl md:text-12xl font-black text-white uppercase tracking-tighter mt-4"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    perspective: '1000px',
                  }}
                  initial={{ 
                    opacity: 0, 
                    y: 80, 
                    letterSpacing: "60px",
                    rotateX: 85,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    letterSpacing: "8px",
                    rotateX: 0,
                    filter: 'blur(0px)',
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.7)'
                  }}
                  transition={{ 
                    delay: 1, 
                    duration: 1.8, 
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  ДОРДОЙ
                </motion.span>
              </motion.h1>

              {/* Эффект "разлетающихся осколков" */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 0, 
                    scale: 0,
                    rotate: Math.random() * 360
                  }}
                  animate={{
                    x: Math.random() * 600 - 300,
                    y: Math.random() * 600 - 300,
                    opacity: [1, 0],
                    scale: [1, 0.2],
                    rotate: Math.random() * 720
                  }}
                  transition={{
                    delay: 2 + i * 0.03,
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                  style={{
                    boxShadow: `0 0 15px ${i % 2 ? '#FFD700' : '#FFFFFF'}`
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ОСНОВНОЙ БАННЕР ===== */}
      <AnimatePresence>
        {!showIntro && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Взрыв света при смене слайда */}
            <LightExplosion />

            {/* Частицы с физикой */}
            <div className="absolute inset-0 overflow-hidden z-0">
              {[...Array(slides[currentSlide].particles)].map((_, i) => (
                <Particle 
                  key={i} 
                  index={i} 
                  total={slides[currentSlide].particles} 
                  color={slides[currentSlide].color}
                />
              ))}
            </div>

            {/* Видео-фон с параллаксом */}
            <motion.div
              key={`video-${currentSlide}`}
              className="absolute inset-0 z-0"
              style={{ y: yBg }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={slides[currentSlide].media} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </motion.div>

            {/* Контент с 3D-эффектами */}
            <div className="relative h-full flex flex-col justify-center pl-16 md:pl-32 lg:pl-48 xl:pl-64 z-10">
              <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl relative"
              >
                {/* Заголовок с эффектом голограммы */}
<motion.h1
  className="text-8xl md:text-9xl lg:text-[12rem] font-black uppercase mb-10 tracking-wider w-full whitespace-nowrap"
  style={{
    fontFamily: "'Bebas Neue', sans-serif",
    lineHeight: 0.8,
    WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
    perspective: '1730px',
    letterSpacing: '0.05em',
  }}
  initial={{ opacity: 0, y: 180, rotateX: 60, scaleX: 0.8 }}
  animate={{ opacity: 1, y: 0, rotateX: 0, scaleX: 1 }}
  transition={{ delay: 1.2, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
>

                  {slides[currentSlide].title.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ 
                        y: 150, 
                        opacity: 0, 
                        rotateX: 90,
                        textShadow: '0 0 0px transparent'
                      }}
                      animate={{ 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0,
                        color: slides[currentSlide].color,
                        textShadow: `0 0 20px ${slides[currentSlide].color}`
                      }}
                      transition={{ 
                        delay: 1.2 + i * 0.07,
                        duration: 0.8,
                        ease: "backOut"
                      }}
                    >
                      <HologramText>{letter}</HologramText>
                    </motion.span>
                  ))}
                </motion.h1>
                
                {/* Подзаголовок с эффектом "появления из тумана" */}
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-wider"
                  style={{ textShadow: '0 2px 15px rgba(0,0,0,0.9)' }}
                  initial={{ opacity: 0, y: 80, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.8, duration: 1.2, ease: "backOut" }}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>
                
                {/* Кнопка с неоновым свечением */}
                <motion.button
                  className={`relative px-16 py-6 font-bold rounded-lg transition-all duration-300 uppercase tracking-widest text-xl overflow-hidden group border-2`}
                  style={{ 
                    background: `linear-gradient(145deg, ${slides[currentSlide].color}, ${slides[currentSlide].secondaryColor})`,
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "#111",
                    boxShadow: `0 0 20px ${slides[currentSlide].color}80`
                  }}
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2.2, duration: 1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 40px ${slides[currentSlide].color}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {slides[currentSlide].cta}
                    <motion.svg
                      className="ml-4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      initial={{ x: -15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.5 }}
                      whileHover={{ x: 10 }}
                    >
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%', transition: { duration: 1 } }}
                  />
                </motion.button>
              </motion.div>
            </div>

            {/* Нижняя панель (как в кинотеатрах) */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent z-20 py-8"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
            >
              <div className="container mx-auto flex justify-between items-center px-16">
                <motion.h2 
                  className="text-5xl font-black uppercase tracking-tighter"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    perspective: '500px'
                  }}
                  initial={{ rotateX: 45, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ delay: 2.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="inline-block"
                    style={{ color: slides[currentSlide].color }}
                    animate={{ 
                      textShadow: [
                        `0 0 10px ${slides[currentSlide].color}`,
                        `0 0 20px ${slides[currentSlide].secondaryColor}`,
                        `0 0 30px ${slides[currentSlide].color}`,
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    АЛГА
                  </motion.span>{" "}
                  <motion.span className="text-white">ДОРДОЙ</motion.span>
                </motion.h2>

                {/* Индикаторы слайдов (как в трейлерах фильмов) */}
                <motion.div 
                  className="flex space-x-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="relative group flex flex-col items-center"
                    >
                      <motion.div
                        className={`h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'} relative overflow-hidden`}
                        initial={{ width: 30 }}
                        whileHover={{ width: 60 }}
                        animate={{ width: currentSlide === index ? 60 : 30 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          className="absolute h-full bg-white rounded-full top-0 left-0"
                          initial={{ width: 0 }}
                          animate={{ width: currentSlide === index ? '100%' : '0%' }}
                          transition={{ 
                            duration: 11, 
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                      {currentSlide === index && (
                        <motion.span 
                          className="mt-2 text-xs text-white/80 opacity-0 group-hover:opacity-100"
                          initial={{ y: -10 }}
                          animate={{ y: 0, opacity: 0.8 }}
                          transition={{ delay: 0.2 }}
                        >
                          {index + 1}/{slides.length}
                        </motion.span>
                      )}
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DordoyBanner;