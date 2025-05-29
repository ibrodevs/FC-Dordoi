import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFutbol, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { RiLiveFill } from "react-icons/ri";

const MatchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const controls = useAnimation();
  
  // Дата следующего матча (можно заменить на реальную дату)
  const nextMatchDate = new Date();
  nextMatchDate.setDate(nextMatchDate.getDate() + 3);
  nextMatchDate.setHours(19, 30, 0, 0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = nextMatchDate - now;
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 1 }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeValue = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-2xl my-12"
    >
      {/* Фоновое изображение с оверлеем */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
      </div>
      
      {/* Эффект частиц (можно заменить на реальные частицы) */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Информация о матче */}
          <div className="mb-8 md:mb-0 md:w-1/2">
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Дордой <span className="text-yellow-400">vs</span> Абдыш-Ата
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center text-white">
                <FaCalendarAlt className="text-yellow-400 mr-3 text-xl" />
                <span>{nextMatchDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              
              <div className="flex items-center text-white">
                <FaCalendarAlt className="text-yellow-400 mr-3 text-xl" />
                <span>{nextMatchDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              <div className="flex items-center text-white">
                <FaMapMarkerAlt className="text-yellow-400 mr-3 text-xl" />
                <span>Стадион "Дордой", Бишкек</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg font-bold flex items-center shadow-lg"
            >
              <FaTicketAlt className="mr-2" />
              Купить билеты
            </motion.button>
          </div>
          
          {/* Таймер обратного отсчета */}
          <div className="w-full md:w-1/2">
            <motion.div
              animate={controls}
              className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400/30"
            >
              <h3 className="text-xl text-center text-yellow-400 font-bold mb-6">
                До начала матча осталось:
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="bg-blue-900/80 rounded-lg p-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${unit}-${value}`}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-3xl md:text-4xl font-bold text-yellow-400"
                        >
                          {formatTimeValue(value)}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-white text-sm mt-2 uppercase">
                        {unit === 'days' ? 'дней' : 
                         unit === 'hours' ? 'часов' :
                         unit === 'minutes' ? 'минут' : 'секунд'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <FaFutbol className="text-yellow-400 text-4xl" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Прогресс бар */}
        <div className="mt-8">
          <div className="h-1 bg-blue-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${100 - (timeLeft.days * 100 / 3)}%`,
                background: ['#FFCC00', '#FF9900', '#FFCC00']
              }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
            />
          </div>
          <div className="flex justify-between text-xs text-white mt-2">
            <span>Матч приближается!</span>
            <span>Готовы поддержать Дордой?</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCountdown;