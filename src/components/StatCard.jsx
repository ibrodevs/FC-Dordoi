import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const StatCard = ({ icon, value, label, color }) => {
  const cardRef = useRef(null);

  // Реакция на движение мыши для 3D-поворота карточки
  const dampen = 30; // чем больше - тем мягче поворот
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, (y) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    return -(y - centerY) / dampen;
  });

  const rotateY = useTransform(mouseX, (x) => {
    if (!cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    return (x - centerX) / dampen;
  });

  // Градиенты по цвету
  const getGradient = (colorType) => {
    switch (colorType) {
      case 'blue':
        return 'from-cyan-400 to-blue-600';
      case 'purple':
        return 'from-purple-400 to-indigo-600';
      case 'pink':
        return 'from-pink-400 to-rose-600';
      case 'green':
        return 'from-emerald-400 to-teal-600';
      case 'orange':
        return 'from-amber-400 to-orange-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  // Обработчики движения мыши
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl p-6 text-center overflow-hidden group shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 cursor-pointer`}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
    >
      {/* Динамичные лучи/всплески при hover */}
      <motion.div
        className={`absolute -top-12 -left-12 w-72 h-72 rounded-full blur-3xl opacity-20 group-hover:opacity-35 bg-gradient-to-br ${getGradient(color)}`}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 25, -25, 0],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />

      {/* Светящаяся рамка при hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl pointer-events-none border-4 border-transparent group-hover:border-opacity-100 group-hover:border-white/20`}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Анимированный фон */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-15 bg-gradient-to-r ${getGradient(color)}`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.15 }}
        transition={{ duration: 0.4 }}
      />

      {/* Блик при наведении */}
      <motion.div
        className="absolute -top-1/4 left-1/2 w-96 h-96 bg-white/20 blur-3xl rotate-45 opacity-0 group-hover:opacity-25 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.5 }}
      />

      {/* Иконка с анимацией "шайни" */}
      <motion.div
        className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${getGradient(color)} shadow-2xl`}
        whileHover={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 0.8, ease: 'easeInOut' },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.3, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className="drop-shadow-lg"
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Значение с градиентным текстом и анимацией */}
      <motion.h3
        className="text-5xl font-extrabold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        {value}
      </motion.h3>

      {/* Подпись */}
      <motion.p
        className="text-gray-400 font-medium text-xs uppercase tracking-wider select-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {label}
      </motion.p>

      {/* Подсветка снизу с анимацией */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 ${getGradient(color)} rounded-full blur-sm`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
      />

      {/* Дополнительный эффект пульсации подсветки */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 ${getGradient(color)} rounded-full blur-md opacity-40`}
        animate={{ scaleX: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default StatCard;
