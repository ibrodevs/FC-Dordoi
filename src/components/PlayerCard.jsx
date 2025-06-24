import { motion } from 'framer-motion';
import { useState } from 'react';


const PlayerCard = ({ player, onClick }) => {
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
      onClick={() => onClick(player)}
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full cursor-pointer"
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img 
          src={player.image || '/images/player-default.jpg'} 
          alt={player.name}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.src = '/images/player-default.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <motion.div 
          className="absolute top-4 left-4 bg-yellow-500 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          initial={{ scale: 1 }}
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {player.number}
        </motion.div>
        
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          initial={{ y: 0 }}
          animate={isHovered ? { y: -10 } : { y: 0 }}
        >
          <h3 className="text-2xl font-bold text-white">{player.name}</h3>
          <p className="text-yellow-400 font-medium">{player.positionName}</p>
        </motion.div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="block text-gray-400">Возраст</span>
            <span className="font-medium">{player.age}</span>
          </div>
          <div>
            <span className="block text-gray-400">Национальность</span>
            <span className="font-medium">{player.nationality}</span>
          </div>
          <div>
            <span className="block text-gray-400">Рейтинг</span>
            <span className="font-medium">{player.rating}/10</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{player.matches}</div>
            <div className="text-xs text-gray-400 uppercase">Матчи</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{player.goals}</div>
            <div className="text-xs text-gray-400 uppercase">Голы</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-400">{player.assists}</div>
            <div className="text-xs text-gray-400 uppercase">Ассисты</div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-yellow-600/30 opacity-0 pointer-events-none"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />
    </motion.div>
  );
};

export default PlayerCard;