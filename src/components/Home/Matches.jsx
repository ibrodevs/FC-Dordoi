import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { FiArrowUp, FiCalendar } from 'react-icons/fi';
import { RiLiveFill } from 'react-icons/ri';
import MatchesView from '../MatchesView';
import TableView from '../TableView';
import CalendarView from '../CalendarView';

const DordoyUltimate = () => {
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.6) setHeroVisible(false);
    else setHeroVisible(true);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1800));
        
        const mockMatches = [
          {
            id: 1,
            date: '2023-06-15',
            time: '18:00',
            competition: 'Премьер Лига Кыргызстана',
            homeTeam: 'Дордой',
            awayTeam: 'Алга',
            homeScore: null,
            awayScore: null,
            venue: 'Стадион Дордой, Бишкек',
            status: 'upcoming',
            competitionLogo: 'https://s.scr365.net/s1/logo/24_84_18/f56bGaRk_200_1299.png',
            highlights: null,
            ticketsAvailable: true
          },
          {
            id: 2,
            date: '2023-06-10',
            time: '17:30',
            competition: 'Кубок Кыргызстана',
            homeTeam: 'Абдыш-Ата',
            awayTeam: 'Дордой',
            homeScore: 1,
            awayScore: 3,
            venue: 'Стадион Спорт Комплекс Абдыш-Ата',
            status: 'completed',
            competitionLogo: 'https://data.vb.kg/image/big/2025-05-28_10-15-20_531305.jpg',
            highlights: 'https://youtu.be/dQw4w9WgXcQ',
            ticketsAvailable: false
          },
          {
            id: 3,
            date: '2023-06-05',
            time: '19:00',
            competition: 'Премьер Лига Кыргызстана',
            homeTeam: 'Дордой',
            awayTeam: 'Нефтчи',
            homeScore: 2,
            awayScore: 2,
            venue: 'Стадион Дордой, Бишкек',
            status: 'completed',
            competitionLogo: 'https://s.scr365.net/s1/logo/24_84_18/f56bGaRk_200_1299.png',
            highlights: 'https://youtu.be/dQw4w9WgXcQ',
            ticketsAvailable: false
          },
          {
            id: 4,
            date: '2023-06-20',
            time: '16:00',
            competition: 'АФК Кубок',
            homeTeam: 'Дордой',
            awayTeam: 'Истиклол',
            homeScore: null,
            awayScore: null,
            venue: 'Стадион Дордой, Бишкек',
            status: 'upcoming',
            competitionLogo: 'https://s.scr365.net/s1/logo/24_184_12/bDxPfOV_200_611.png',
            highlights: null,
            ticketsAvailable: true
          },
          {
            id: 5,
            date: '2023-06-25',
            time: '15:00',
            competition: 'Премьер Лига Кыргызстана',
            homeTeam: 'Дордой',
            awayTeam: 'Илбирс',
            homeScore: null,
            awayScore: null,
            venue: 'Стадион Дордой, Бишкек',
            status: 'upcoming',
            competitionLogo: 'https://s.scr365.net/s1/logo/24_84_18/f56bGaRk_200_1299.png',
            highlights: null,
            ticketsAvailable: true
          }
        ];
        
        const mockStandings = [
          { position: 1, team: 'Абдыш-Ата', played: 12, won: 9, drawn: 2, lost: 1, gf: 28, ga: 8, gd: +20, points: 29, form: ['W', 'W', 'D', 'W', 'L'] },
          { position: 2, team: 'Дордой', played: 12, won: 8, drawn: 3, lost: 1, gf: 25, ga: 10, gd: +15, points: 27, form: ['W', 'D', 'W', 'W', 'W'] },
          { position: 3, team: 'Алга', played: 12, won: 7, drawn: 2, lost: 3, gf: 20, ga: 12, gd: +8, points: 23, form: ['L', 'W', 'W', 'D', 'W'],  },
          { position: 4, team: 'Нефтчи', played: 12, won: 6, drawn: 1, lost: 5, gf: 18, ga: 16, gd: +2, points: 19, form: ['W', 'L', 'D', 'L', 'W'] },
          { position: 5, team: 'Илбирс', played: 12, won: 4, drawn: 3, lost: 5, gf: 14, ga: 18, gd: -4, points: 15, form: ['L', 'D', 'W', 'L', 'L'] },
          { position: 6, team: 'Кара-Балта', played: 12, won: 3, drawn: 2, lost: 7, gf: 10, ga: 22, gd: -12, points: 11, form: ['L', 'W', 'L', 'L', 'D'] },
          { position: 7, team: 'Алай', played: 12, won: 1, drawn: 1, lost: 10, gf: 6, ga: 31, gd: -25, points: 4, form: ['L', 'L', 'L', 'D', 'L'] }
        ];
        
        const mockPlayers = [
          { id: 1, name: 'Алиев Руслан', number: 1, position: 'GK', nationality: 'KG', age: 28, goals: 0, assists: 0, image: 'https://via.placeholder.com/150/FFFF00/000000?text=AR' },
          { id: 2, name: 'Исмаилов Талант', number: 5, position: 'DF', nationality: 'KG', age: 25, goals: 2, assists: 3, image: 'https://via.placeholder.com/150/FFFF00/000000?text=TI' },
          { id: 3, name: 'Сидоров Алексей', number: 8, position: 'MF', nationality: 'KG', age: 27, goals: 5, assists: 7, image: 'https://via.placeholder.com/150/FFFF00/000000?text=AS' },
          { id: 4, name: 'Жумабаев Марат', number: 10, position: 'FW', nationality: 'KG', age: 29, goals: 12, assists: 4, image: 'https://via.placeholder.com/150/FFFF00/000000?text=MJ' },
          { id: 5, name: 'Орозбеков Азамат', number: 7, position: 'MF', nationality: 'KG', age: 24, goals: 3, assists: 8, image: 'https://via.placeholder.com/150/FFFF00/000000?text=AO' },
          { id: 6, name: 'Камчибеков Улугбек', number: 9, position: 'FW', nationality: 'KG', age: 26, goals: 9, assists: 2, image: 'https://via.placeholder.com/150/FFFF00/000000?text=UK' }
        ];
        
        setMatches(mockMatches);
        setStandings(mockStandings);
        setPlayers(mockPlayers);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden" ref={containerRef}>

      {/* Hero Section with Parallax */}
      <AnimatePresence>
        {heroVisible && (
          <motion.div 
            className="relative h-screen overflow-hidden"
            style={{ opacity, y }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 1.5 }}
            />
            
            <motion.img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="ФК Дордой"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
                className="text-center px-4"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  ФК ДОРДОЙ
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-3xl lg:text-4xl font-semibold mb-6 md:mb-8 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Легенды кыргызского футбола
                </motion.p>
              </motion.div>
            </div>
            
            <motion.div 
              className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MatchesView matches={matches} />
      <TableView standings={standings} players={players} />
      <div className="container mx-auto px-4 py-8"></div>
      <CalendarView matches={matches} />

      {/* Floating Navigation */}
      <motion.div 
        className={`fixed top-4 left-0 right-0 z-50 px-4 transition-all ${heroVisible ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}
        initial={{ opacity: 0 }}
      >
        <div className="container mx-auto bg-gray-800/90 backdrop-blur-lg rounded-full shadow-lg p-2 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="./public/ФК_Дордой.png" alt="Дордой" className="w-10 h-10 mr-3 rounded-full" />
            <span className="font-bold text-yellow-400 text-lg">ФК ДОРДОЙ</span>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-full text-sm flex items-center"
          >
            <FiCalendar className="mr-2" /> Календарь
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-32">
        {/* Loading Animation */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-96">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                scale: { repeat: Infinity, duration: 1.5, repeatType: "reverse" }
              }}
              className="rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500 relative"
            >
              <motion.div 
                className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
                animate={{
                  x: [0, 40, 40, 0, 0],
                  y: [0, 0, 40, 40, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <motion.p 
              className="mt-8 text-xl text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Загрузка данных...
            </motion.p>
          </div>
        )}
      </div>

      {/* Live Match Banner */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-red-600 text-white z-40 py-3 px-6 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <RiLiveFill className="text-2xl mr-3 animate-pulse" />
            <div>
              <p className="font-bold">ИДЕТ ПРЯМАЯ ТРАНСЛЯЦИЯ</p>
              <p className="text-sm">Дордой - Алга • 2-1 • 67'</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black/30 hover:bg-black/40 px-4 py-2 rounded-lg flex items-center text-sm font-bold backdrop-blur-sm"
          >
            Смотреть
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div 
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button 
              onClick={scrollToTop}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold w-14 h-14 rounded-full shadow-xl shadow-yellow-500/30 flex items-center justify-center text-xl transition-all"
            >
              <FiArrowUp />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DordoyUltimate;