import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const HistorySection = () => {
  const ref = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Параллакс эффекты для декоративных элементов
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div 
      ref={ref}
      className="relative py-32 overflow-hidden bg-blue-950"
    >
      {/* Анимированный фон с частицами */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/sparkles.gif')] opacity-10 mix-blend-screen"
        style={{ scale: scaleBg }}
      />
      
      {/* Звездное небо */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              y: useTransform(scrollYProgress, [0, 1], [0, Math.random() * 100 - 50])
            }}
          />
        ))}
      </div>

      {/* 3D-декоративные элементы */}
      <motion.div 
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-yellow-400/20 to-transparent blur-[100px]"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-400/20 to-transparent blur-[120px]"
        style={{ y: y2 }}
      />
      
      {/* Анимированные линии */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]),
          scaleX: useTransform(scrollYProgress, [0, 1], [0.5, 1.5])
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Анимированный заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
            style={{
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
              letterSpacing: '0.05em'
            }}
          >
            ИСТОРИЯ ВЕЛИЧИЯ
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Путь от скромных начинаний до вершин кыргызского и азиатского футбола
          </motion.p>
        </motion.div>

        {/* Эпичная лента времени */}
        <div className="relative">
          {/* Центральная линия с анимацией */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent transform -translate-x-1/2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
            }}
          />
          
          {/* Годы с параллаксом */}
          <div className="hidden md:flex flex-col absolute left-1/2 top-0 h-full justify-between transform -translate-x-1/2">
            {historyItems.map((item, i) => (
              <motion.div
                key={`year-${i}`}
                style={{
                  y: useTransform(scrollYProgress, 
                    [i/historyItems.length, (i+1)/historyItems.length], 
                    [0, i % 2 === 0 ? -80 : 80]),
                  opacity: useTransform(scrollYProgress, 
                    [(i-0.5)/historyItems.length, i/historyItems.length, (i+0.5)/historyItems.length], 
                    [0, 1, 0])
                }}
                className="text-3xl font-bold text-yellow-400 px-6 py-3 bg-blue-900/70 rounded-full backdrop-blur-sm border-2 border-yellow-400/50 shadow-lg"
              >
                {item.year}
              </motion.div>
            ))}
          </div>

          {/* Карточки событий */}
          <div className="space-y-40 md:space-y-60">
            {historyItems.map((item, i) => (
              <HistoryCard 
                key={i}
                item={item}
                index={i}
                isEven={i % 2 === 0}
                scrollProgress={scrollYProgress}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryCard = ({ item, index, isEven, scrollProgress, isMobile }) => {
  // Анимация карточки при скролле
  const cardY = useTransform(
    scrollProgress,
    [index/historyItems.length, (index+1)/historyItems.length],
    [isMobile ? 0 : isEven ? 150 : -150, 0]
  );
  
  const cardOpacity = useTransform(
    scrollProgress,
    [(index-0.5)/historyItems.length, index/historyItems.length, (index+0.5)/historyItems.length],
    [0, 1, isMobile ? 1 : 0]
  );

  // Анимация для медиа-элементов
  const mediaScale = useTransform(
    scrollProgress,
    [index/historyItems.length, (index+1)/historyItems.length],
    [0.8, 1]
  );

  const glowColor = useTransform(
    scrollProgress,
    [index/historyItems.length, (index+1)/historyItems.length],
    ['rgba(255,215,0,0)', 'rgba(255,215,0,0.3)']
  );

  return (
    <motion.div
      className={`flex ${isMobile ? 'flex-col' : isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-10 md:gap-20`}
      style={{
        opacity: cardOpacity,
        y: cardY
      }}
    >
      {/* Медиа контент с эффектом свечения */}
      <motion.div 
        className={`${isMobile ? 'w-full' : 'w-1/2'} relative rounded-2xl overflow-hidden`}
        whileHover={!isMobile ? { scale: 1.03 } : {}}
        style={{ 
          scale: mediaScale,
          boxShadow: useTransform(glowColor, color => `0 0 30px ${color}`)
        }}
      >
        <div className="aspect-video bg-gradient-to-br from-blue-900/80 to-blue-950/90 flex items-center justify-center relative overflow-hidden">
          {/* Эффект сетки */}
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Заглушка для изображения */}
          <div className="relative z-10 text-7xl opacity-30">⚽</div>
          
          {/* Анимированные элементы */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-yellow-400"
            style={{
              scaleX: useTransform(scrollProgress, 
                [index/historyItems.length, (index+1)/historyItems.length], 
                [0, 1])
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
          <div className="text-sm text-yellow-400 font-mono tracking-wider">{item.year}</div>
        </div>
      </motion.div>

      {/* Текстовый контент с эффектом неона */}
      <div className={`${isMobile ? 'w-full' : 'w-1/2'} ${isMobile ? '' : isEven ? 'pr-10' : 'pl-10'}`}>
        <motion.div
          className="bg-gradient-to-br from-blue-900/70 to-blue-950/90 backdrop-blur-md p-10 rounded-2xl border border-blue-700 hover:border-yellow-400 transition-all duration-500 shadow-2xl relative overflow-hidden"
          whileHover={{ 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            y: -10
          }}
        >
          {/* Анимированный фон карточки */}
          <motion.div 
            className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"
            style={{
              x: useTransform(scrollProgress, 
                [index/historyItems.length, (index+1)/historyItems.length], 
                [isEven ? -50 : 50, 0])
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-8">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-blue-900 font-bold text-2xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {index + 1}
              </motion.div>
              <h3 className="text-3xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">{item.description}</p>
            <motion.button 
              className="px-8 py-3 text-sm bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-full transition-all hover:shadow-lg hover:shadow-yellow-500/30 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">УЗНАТЬ БОЛЬШЕ</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity"
                style={{
                  x: useTransform(scrollProgress, 
                    [index/historyItems.length, (index+1)/historyItems.length], 
                    [isEven ? -100 : 100, 0])
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Улучшенные данные истории
const historyItems = [
  {
    year: "2004",
    title: "Рождение легенды",
    description: "Основание ФК 'Дордой' стало отправной точкой в истории современного кыргызского футбола. С первых дней клуб заявил о своих амбициях стать флагманом национального футбола.",
    media: "dordoy-foundation.jpg"
  },
  {
    year: "2007-2009",
    title: "Золотая эра",
    description: "Три чемпионских титула подряд утвердили 'Дордой' в качестве доминирующей силы. Этот период заложил основы футбольной династии, которая продолжается по сей день.",
    media: "dordoy-trophy.jpg"
  },
  {
    year: "2012",
    title: "Азиатский прорыв",
    description: "Историческое выступление в Кубке АФК принесло клубу международное признание. 'Дордой' стал символом кыргызского футбола на континентальной арене.",
    media: "asia-cup.jpg"
  },
  {
    year: "2016",
    title: "Несокрушимая серия",
    description: "24 матча без поражений в национальном чемпионате - достижение, вошедшее в историю как одно из самых впечатляющих. Рекорд, который еще никто не повторил.",
    media: "record-series.jpg"
  },
  {
    year: "2020",
    title: "Арена мечты",
    description: "Открытие ультрасовременного тренировочного центра с полями международного уровня. Эти инвестиции вывели клуб на качественно новый этап развития.",
    media: "new-stadium.jpg"
  },
  {
    year: "2023",
    title: "Фабрика талантов",
    description: "Запуск академии мирового уровня для подготовки нового поколения футболистов. Стратегический проект, который определит будущее клуба и сборной Кыргызстана.",
    media: "academy.jpg"
  }
];

export default HistorySection;