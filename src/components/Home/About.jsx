import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedText = ({ text, className }) => {
  const letters = Array.from(text);
  
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.03 } }
      }}
      className={className}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const GlowingStat = ({ value, label, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.7 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      whileHover={{ y: -15 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-xl overflow-hidden"
    >
      <div className="absolute -inset-1 bg-yellow-400 blur-lg opacity-30"></div>
      <div className="relative z-10 text-center">
        <motion.p 
          className="text-4xl font-extrabold text-yellow-400 mb-2"
          whileInView={{ scale: [1, 1.1, 1] }}
          transition={{ delay: delay + 0.3, duration: 1 }}
        >
          {value}
        </motion.p>
        <p className="text-blue-100 uppercase tracking-wider text-sm font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { value: "25+", label: "Лет легендарной истории" },
    { value: "14", label: "Кубков страны" },
    { value: "50+", label: "Звездных воспитанников" },
    { value: "1000+", label: "Незабываемых матчей" }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute top-10 right-1/4 w-20 h-20 bg-blue-400 rounded-full filter blur-xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Заголовок с анимацией букв */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
              <AnimatedText text="ФК " className="text-white"/>
              <AnimatedText text="ДОРДОЙ" className="text-yellow-400"/>
            </h2>
            <motion.div 
              className="w-32 h-1.5 bg-yellow-400 mx-auto mt-6"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.h3
              className="text-2xl md:text-3xl text-blue-200 font-medium mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              ГОРДОСТЬ КЫРГЫЗСКОГО ФУТБОЛА
            </motion.h3>
          </motion.div>

          {/* Основной текст с параллакс эффектом */}
          <motion.div 
            className="space-y-8 text-lg md:text-xl text-blue-100 mb-24 max-w-4xl mx-auto relative"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <motion.div 
              className="absolute -left-20 -top-10 w-40 h-40 bg-yellow-400 rounded-full filter blur-3xl opacity-10 -z-10"
              whileInView={{ x: [-50, 0], opacity: [0, 0.1] }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="leading-relaxed"
              whileInView={{ x: [-50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-yellow-300">Основанный в 1997 году</span>, ФК "Дордой" стал настоящей 
              легендой кыргызского футбола, символом несгибаемой воли и спортивного 
              мастерства.
            </motion.p>
            
            <motion.p
              className="leading-relaxed"
              whileInView={{ x: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Мы не просто клуб - мы <span className="font-bold text-yellow-300">кузница чемпионов</span>, 
              объединяющая тысячи болельщиков по всей стране.
            </motion.p>
            
            <motion.p 
              className="text-2xl md:text-3xl font-bold text-yellow-400 mt-12 leading-snug"
              whileInView={{ scale: [0.95, 1.02, 1], opacity: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              "Дордой" - это дух, традиции и страсть, которые живут в каждом из нас!
            </motion.p>
          </motion.div>

          {/* Статистика с эффектом свечения */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {stats.map((item, index) => (
              <GlowingStat 
                key={index}
                value={item.value}
                label={item.label}
                delay={0.5 + index * 0.15}
              />
            ))}
          </motion.div>

          {/* Кнопка с эффектом пульсации */}
          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </motion.div>
      </div>

      {/* Анимированные элементы фона */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-950 to-transparent z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </section>
  );
};

export default AboutSection;