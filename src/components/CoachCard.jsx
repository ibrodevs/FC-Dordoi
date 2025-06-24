import { motion } from 'framer-motion';
import { useState } from 'react';

const CoachCard = ({ coach, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full cursor-pointer"
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img 
          src={coach.image || '/images/coach-default.jpg'} 
          alt={coach.name}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.src = '/images/coach-default.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          initial={{ y: 0 }}
          animate={isHovered ? { y: -10 } : { y: 0 }}
        >
          <h3 className="text-2xl font-bold text-white">{coach.name}</h3>
          <p className="text-yellow-400 font-medium">{coach.position}</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-5"
        initial={{ opacity: 1 }}
        animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
      >
        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="block text-gray-400">Возраст</span>
            <span className="font-medium">{coach.age}</span>
          </div>
          <div>
            <span className="block text-gray-400">Национальность</span>
            <span className="font-medium">{coach.nationality}</span>
          </div>
          <div>
            <span className="block text-gray-400">Опыт</span>
            <span className="font-medium">{coach.experience}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CoachCard;