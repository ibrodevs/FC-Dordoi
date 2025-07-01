import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

// Компоненты
import PlayerCard from './PlayerCard';
import CoachCard from './CoachCard';
import PlayerModal from './PlayerModal';

// API
import { fetchPlayers } from '../api';

const  UltraTeamPage = () => {
  // Состояния
  const [activeTab, setActiveTab] = useState('players');
  const [isLoading, setIsLoading] = useState(true);
  const [activePosition, setActivePosition] = useState('all');
  const [activeAcademyPosition, setActiveAcademyPosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [academySearchQuery, setAcademySearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [academyCoaches, setAcademyCoaches] = useState([]);
  
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Фильтрация данных
  const filteredPlayers = players.filter(player => {
  const matchesPosition = activePosition === 'all' || player.position === activePosition;
  const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       player.positionName.toLowerCase().includes(searchQuery.toLowerCase());
  
  console.log('Фильтрация:', player.name, matchesPosition, matchesSearch); // ← Добавьте это
  
  return matchesPosition && matchesSearch;
});

  // Загрузка данных
  useEffect(() => {
    const loadData = async () => {
      try {
        const [playersData] = await Promise.all([
          fetchPlayers(),
        ]);
        
        setPlayers(playersData);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-1 bg-gray-800 rounded-full mb-8 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4"
        >
          ДОРДОЙ 2025
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-400 text-lg"
        >
          Загружаем состав...
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pt-[50px] relative min-h-screen bg-gray-950 text-white overflow-hidden" style={{ position: 'relative' }}>
      {/* Основное содержимое */}
      <section id="team-content" className="relative z-30 -mt-20">
        <div className="container mx-auto px-4 pt-12">
          {/* Табы для переключения между разделами */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-gray-900 rounded-xl p-1.5 inline-flex border border-gray-800 shadow-lg">
              <button
                onClick={() => handleTabChange('players')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'players'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg'
                    : 'bg-transparent hover:bg-gray-800 text-gray-300'
                }`}
              >
                <span className="text-lg">👥</span>
                Игроки
              </button>
              <button
                onClick={() => handleTabChange('coaches')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'coaches'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg'
                    : 'bg-transparent hover:bg-gray-800 text-gray-300'
                }`}
              >
                <span className="text-lg">👔</span>
                Тренеры
              </button>
              <button
                onClick={() => handleTabChange('academy')}
                className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'academy'
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg'
                    : 'bg-transparent hover:bg-gray-800 text-gray-300'
                }`}
              >
                <span className="text-lg">🌟</span>
                Академия
              </button>
            </div>
          </motion.div>

          {activeTab === 'players' ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-8 mb-12 border border-gray-800 shadow-xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Игроки</span> сезона 2024
                </h2>
                
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                  <div className="relative w-full lg:w-96">
                    <input
                      type="text"
                      placeholder="Поиск по имени или позиции..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-800 rounded-xl py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 text-white placeholder-gray-500"
                    />
                    <svg className="absolute right-4 top-3.5 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  {filteredPlayers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {filteredPlayers.map((player) => (
                        <PlayerCard 
                          key={player.id} 
                          player={player} 
                          onClick={() => handlePlayerClick(player)}
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800"
                    >
                      <div className="text-6xl mb-6">🔍</div>
                      <h3 className="text-2xl font-bold mb-3">Игроки не найдены</h3>
                      <p className="text-gray-400 max-w-md mx-auto">Попробуйте изменить параметры поиска или выбрать другую позицию</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          ) : activeTab === 'coaches' ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-8 mb-12 border border-gray-800 shadow-xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Тренерский</span> штаб
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coaches.map((coach) => (
                  <CoachCard key={coach.id} coach={coach} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-2xl p-8 mb-12 border border-gray-800 shadow-xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Академия</span> Дордой
              </h2>
              
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                <div className="relative w-full lg:w-96">
                  <input
                    type="text"
                    placeholder="Поиск по имени или позиции..."
                    value={academySearchQuery}
                    onChange={(e) => setAcademySearchQuery(e.target.value)}
                    className="w-full bg-gray-800 rounded-xl py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 text-white placeholder-gray-500"
                  />
                  <svg className="absolute right-4 top-3.5 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">Тренерский штаб академии</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {academyCoaches.map((coach) => (
                    <CoachCard key={coach.id} coach={coach} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Эпичная статистика команды */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl p-8 mb-12 border border-gray-800 shadow-xl overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">Статистика команды</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{players.length}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Игроков в составе</div>
                </div>
                <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{players.reduce((acc, player) => acc + (player.matches || 0), 0)}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Всего матчей</div>
                </div>
                <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{players.reduce((acc, player) => acc + (player.goals || 0), 0)}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Забито голов</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Галерея достижений */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-white">Наши <span className="text-yellow-400">достижения</span></h3>
            
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{ delay: 3000 }}
              className="rounded-2xl overflow-hidden"
            >
              <SwiperSlide>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
                  <img src="https://prosports.kg/upload/news/content/202410/204165_01c9a0fe0ac1c48512d62500c58e5a66.jpeg" alt="Кубок" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                    <div>
                      <h4 className="text-xl font-bold text-white">Кубок Кыргызстана 2023</h4>
                      <p className="text-yellow-400">Победители турнира</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
                  <img src="https://cdn-1.aki.kg/cdn-st-0/qgH/1/3154690.b93c5d2ca14ad9a7f9be4972a4bbe069.jpg" alt="Чемпионат" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                    <div>
                      <h4 className="text-xl font-bold text-white">Чемпионат Кыргызстана 2023</h4>
                      <p className="text-yellow-400">Золотые медали</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
                  <img src="https://cdn-1.aki.kg/st_gallery/92/984092.c3e0fd8ea426512df2d6049966d4669d.jpg" alt="Международный турнир" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                    <div>
                      <h4 className="text-xl font-bold text-white">Кубок AFC 2022</h4>
                      <p className="text-yellow-400">Лучший клуб Центральной Азии</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
                  <img src="https://sport.kg/uploads/posts/2024-09/1725275320_img_9316.jpg" alt="Суперкубок" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                    <div>
                      <h4 className="text-xl font-bold text-white">Суперкубок 2023</h4>
                      <p className="text-yellow-400">Победа в дерби</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно игрока */}
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={closeModal} />
      )}
    </div>
  );
};

export default UltraTeamPage;