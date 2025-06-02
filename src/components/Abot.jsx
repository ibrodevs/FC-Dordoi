import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutPage = () => {
  // Анимация для основного заголовка
  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({ threshold: 0.1 });

  // Анимация для карточек ценностей
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });
  const valuesControls = useAnimation();

  useEffect(() => {
    if (titleInView) {
      titleControls.start('visible');
    }
    if (valuesInView) {
      valuesControls.start('visible');
    }
  }, [titleControls, titleInView, valuesControls, valuesInView]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Hero Section с параллакс эффектом */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Анимированный фон */}
        <motion.div 
          className="absolute inset-0 bg-blue-900/90 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Эффект частиц */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-400"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Содержимое */}
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
            className="text-center"
          >
            {/* Логотип с анимацией */}
            <motion.div
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { 
                  scale: 1, 
                  opacity: 1,
                  transition: { type: 'spring', stiffness: 100 }
                }
              }}
              className="mx-auto mb-8 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-4xl md:text-5xl font-bold text-yellow-400"><img src="/vite.png" alt="" /></span>
            </motion.div>

            {/* Заголовок с анимацией букв */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            >
              {["Д", "О", "Р", "Д", "О", "Й"].map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: 'spring', stiffness: 300 }
                    }
                  }}
                  whileHover={{ y: -5 }}
                  style={{ color: i % 2 === 0 ? '#facc15' : 'white' }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span 
                className="block text-2xl md:text-3xl mt-4 font-medium text-blue-200"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.6 } }
                }}
              >
                Легенда кыргызского футбола
              </motion.span>
            </motion.h1>

            {/* Кнопки с волновой анимацией */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { delay: 0.8 }
                }
              }}
            >
              <motion.button
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-full transition-all duration-300 shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">О клубе</span>
                <motion.span
                  className="absolute inset-0 bg-yellow-300 rounded-full opacity-0"
                  initial={{ scale: 0.3 }}
                  whileHover={{ 
                    opacity: 0.2,
                    scale: 1.5,
                    transition: { duration: 0.6 }
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Анимированный футбольный мяч */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
        >
          <svg className="w-12 h-12 text-yellow-400" viewBox="0 0 24 24">
            <path 
              fill="currentColor" 
              d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8s3.58-8,8-8s8,3.58,8,8S16.42,20,12,20z M16.5,12c0,2.5-2,4.5-4.5,4.5S7.5,14.5,7.5,12s2-4.5,4.5-4.5S16.5,9.5,16.5,12z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Секция ценностей */}
      <div className="relative py-20 bg-gradient-to-b from-blue-900/80 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Наши <span className="text-yellow-400">ценности</span>
          </motion.h2>
          
          <motion.div
            ref={valuesRef}
            initial="hidden"
            animate={valuesControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <ValueCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Командный дух"
              description="Мы едины в стремлении к победе, поддерживаем друг друга на поле и за его пределами."
              color="from-blue-600 to-blue-800"
            />
            
            <ValueCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Стремление к победе"
              description="Каждая игра - это вызов, который мы принимаем с уверенностью в своих силах."
              color="from-yellow-500 to-yellow-600"
              delay={0.2}
            />
            
            <ValueCard 
              icon={
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              }
              title="Гордость за страну"
              description="Мы представляем Кыргызстан на международной арене с честью и достоинством."
              color="from-blue-700 to-blue-900"
              delay={0.4}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon, title, description, color = 'from-blue-600 to-blue-800', delay = 0 }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${color} p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300 h-full`}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { delay, duration: 0.6 }
        }
      }}
      whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
    >
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-yellow-400 mb-6 backdrop-blur-sm border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const AchievementItem = ({ number, title, delay = 0 }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{number}</div>
      <div className="text-sm md:text-base text-gray-300">{title}</div>
    </motion.div>
  );
};

export default AboutPage;