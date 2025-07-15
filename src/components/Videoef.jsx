import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

function ClubInfo() {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardHoverEffect = {
    scale: 1.02,
    transition: { duration: 0.3 }
  };

  return (
    <div 
      className="min-h-screen w-full overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a1f44 0%, #1a3a8a 50%, #2a5fff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite'
      }}
    >
      {/* Анимированные частицы фона */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400 opacity-10"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .club-card {
          backdrop-filter: blur(16px);
          background: rgba(20, 40, 100, 0.5);
          border-top: 1px solid rgba(234, 179, 8, 0.5);
          border-left: 1px solid rgba(234, 179, 8, 0.5);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }
        .club-card:hover {
          border-color: rgba(234, 179, 8, 0.8);
          box-shadow: 0 15px 50px rgba(234, 179, 8, 0.2);
        }
        .glow-text {
          text-shadow: 0 0 15px rgba(234, 179, 8, 0.8);
          transition: text-shadow 0.3s ease;
        }
        .glow-text:hover {
          text-shadow: 0 0 20px rgba(234, 179, 8, 1);
        }
        .glow-box {
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.4);
        }
        .hex-mask {
          mask-image: url('/hexagon2.svg');
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
          filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.6));
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Видео с анимацией */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <section className="gap-2 rounded-lg p-5">
            <motion.figure 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full relative h-full object-cover aspect-square hex-mask"
              >
                <source src="/видео_дор.mp4" type="video/mp4" />
              </video>
              <motion.div 
                className="absolute inset-0 border-2 border-yellow-400 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              />
            </motion.figure>
          </section>
        </motion.div>

        {/* Информация о клубе */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="club-card rounded-2xl p-8 md:p-10 space-y-8 glow-box"
            whileHover={cardHoverEffect}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 glow-text mb-4">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block"
                >
                  ФК ДОРДОЙ
                </motion.span>
                <motion.span 
                  className="block text-white text-xl md:text-2xl mt-3 font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Сила. Честь. Победа.
                </motion.span>
              </h1>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Основная информация */}
              <motion.div 
                className="flex items-start bg-blue-900/40 p-4 rounded-xl border border-blue-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-1">История клуба</h3>
                  <p className="text-white/90">Основан в 1997 году. 11-кратный чемпион Кыргызстана. Участник международных турниров.</p>
                </div>
              </motion.div>

              {/* Достижения */}
              <motion.div 
                className="flex items-start bg-blue-900/40 p-4 rounded-xl border border-blue-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Достижения</h3>
                  <ul className="space-y-3 text-white/90">
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
                      Рекордные 11 титулов чемпиона Кыргызстана
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                      6 Кубков страны
                    </motion.li>
                    <motion.li 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      Участник Кубка АФК 2006-2007
                    </motion.li>
                  </ul>
                </div>
              </motion.div>

              {/* Стадион */}
              <motion.div 
                className="flex items-start bg-blue-900/40 p-4 rounded-xl border border-blue-700/50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-1">Стадион</h3>
                  <p className="text-white/90">Домашняя арена - стадион "Дордой" в Бишкеке вместимостью 10,000 зрителей</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Кнопка с анимацией */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                className="w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(234, 179, 8, 0.7)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Подробнее о клубе</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ClubInfo;