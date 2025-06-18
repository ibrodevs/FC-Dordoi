import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TeamHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen max-h-[1200px] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Фоновые слои с параллаксом */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 bg-[url('/images/stadium-night.jpg')] bg-cover bg-center scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/30 to-gray-950 z-10" />
      <div className="absolute inset-0 bg-gradient-to-l from-gray-950 via-gray-950/30 to-gray-950 z-10" />

      {/* Контент с анимацией */}
      <motion.div 
        style={{ y: yText, opacity }}
        className="relative z-20 text-center px-4 container mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png" 
            alt="Team Logo" 
            className="h-28 mx-auto drop-shadow-lg"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
        >
          <span className="text-stroke">ДОРДОЙ</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300 font-medium"
        >
          Легенды кыргызского футбола. Самый титулованный клуб Центральной Азии.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="#team"
            className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all"
          >
            Состав команды
          </a>
          
        </motion.div>
      </motion.div>

      {/* Анимированная стрелка вниз */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
      >
        <a 
          href="#about"
          className="animate-bounce p-3 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-all border border-yellow-500/30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>

      {/* Градиент внизу */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10" />
    </section>
  );
};

export default TeamHero;