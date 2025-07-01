import { motion } from 'framer-motion';
import { useState } from 'react';

const CoachCard = ({ coach, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <motion.div
      whileHover="hover"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(coach)}
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full cursor-pointer group"
    >
      <div className="relative h-80 overflow-hidden">
        {imageError || !coach.image ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-4xl text-gray-500 font-bold">
              {getInitials(coach.name)}
            </span>
          </div>
        ) : (
          <motion.img 
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          initial={{ y: 0 }}
          animate={isHovered ? { y: -10 } : { y: 0 }}
        >
          <h3 className="text-2xl font-bold text-white truncate">{coach.name}</h3>
          <p className="text-yellow-400 font-medium truncate">
            {coach.position || 'Тренер'}
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-5"
        initial={{ opacity: 1 }}
        animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
      >
        <div className="flex justify-between text-sm mb-4 flex-wrap gap-y-2">
          {[
            { label: 'Возраст', value: coach.age ? `${coach.age} лет` : '—' },
            { label: 'Национальность', value: coach.nationality || '—' },
            { label: 'Опыт', value: coach.experience || '—' },
          ].map((item, index) => (
            <div key={index} className="w-1/3 min-w-[100px]">
              <span className="block text-gray-400 text-xs">{item.label}</span>
              <span className="font-medium text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-yellow-400 font-medium border border-yellow-400 px-4 py-2 rounded-lg">
          Подробнее
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CoachCard;