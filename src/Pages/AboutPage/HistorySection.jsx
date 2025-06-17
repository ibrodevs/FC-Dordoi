import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineItem = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const HistorySection = ({ clubInfo }) => (
  <section id="history" className="relative bg-gradient-to-br from-blue-900 to-blue-800 py-44 overflow-hidden">
    {/* Parallax background layers */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/hexagon.svg')] opacity-5 animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-5 w-72 h-72 bg-yellow-400/20 rounded-full blur-2xl animate-pulse animation-delay-2000" />
    </div>

    <div className="relative z-10 container mx-auto px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-24">
        <motion.h2
          className="text-7xl md:text-8xl font-extrabold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          История клуба Дордой
        </motion.h2>
        <motion.p
          className="mt-2 text-2xl md:text-3xl text-yellow-300 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Сила в единстве
        </motion.p>
        <motion.p
          className="mt-4 text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Путешествие от основания до громких побед — каждый шаг истории ФК "Дордой".
        </motion.p>
      </div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Central line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent" />

        <AnimatePresence>
          {clubInfo.history.map((era, index) => (
            <motion.div
              key={era.id}
              className={`flex flex-col md:flex-row items-start mb-32 ${index % 2 === 0 ? 'md:pl-20 md:items-end' : 'md:pr-20 md:flex-row-reverse md:items-end'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={timelineItem}
            >
              {/* Marker */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-blue-900">{era.title.split('-')[0]}</span>
                </div>
              </div>

              {/* Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-950/80 to-blue-900/80 backdrop-blur-xl border border-blue-700/60 rounded-3xl p-10 min-h-[24rem] shadow-2xl hover:shadow-yellow-500/40 transition-shadow duration-300 w-full md:w-7/12"
                whileHover={{ scale: 1.04 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-snug">{era.title}</h3>
                  <span className="px-4 py-2 bg-yellow-300 text-blue-900 font-semibold rounded-full text-lg">{era.years}</span>
                </div>
                <p className="text-blue-200 mb-6 text-lg leading-relaxed">{era.description}</p>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <h4 className="flex items-center text-xl md:text-2xl font-semibold text-yellow-300 mb-3">
                      <span className="mr-3">🏆</span>Достижения
                    </h4>
                    <ul className="list-disc list-inside text-blue-200 text-base md:text-lg space-y-1">
                      {era.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center text-xl md:text-2xl font-semibold text-yellow-300 mb-3">
                      <span className="mr-3">⭐</span>Легенды
                    </h4>
                    <ul className="list-none text-blue-200 grid grid-cols-2 gap-3 text-base md:text-lg">
                      {era.players.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
                <blockquote className="mt-8 border-l-4 border-yellow-400 pl-6 italic text-yellow-300 text-lg md:text-xl">
                  {era.keyEvent}
                </blockquote>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </section>
);

export default HistorySection;