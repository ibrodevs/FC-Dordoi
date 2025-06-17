import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const UltraTeamPage = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [isLoading, setIsLoading] = useState(true);
  const [activePosition, setActivePosition] = useState('all');
  const [activeAcademyPosition, setActiveAcademyPosition] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [academySearchQuery, setAcademySearchQuery] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Эпичные позиции с иконками
  const positions = [
    { id: 'all', name: 'Все', icon: '👥' },
    { id: 'goalkeeper', name: 'Вратари', icon: '🧤' },
    { id: 'defender', name: 'Защитники', icon: '🛡️' },
    { id: 'midfielder', name: 'Полузащитники', icon: '⚡' },
    { id: 'forward', name: 'Нападающие', icon: '⚽' },
  ];

  // Данные игроков с доп статистикой
  const players = [
    { id: 1, name: 'Адилет Абдырайымов', number: 1, position: 'goalkeeper', positionName: 'Вратарь', age: 21, nationality: 'Кыргызстан', matches: 145, goals: 0, assists: 2, rating: 8.7, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/abdyraiymov_1.jpg'},
    { id: 2, name: 'Салим Мамбетов', number: 5, position: 'defender', positionName: 'Центрбек', age: 26, nationality: 'Кыргызстан', matches: 178, goals: 15, assists: 22, rating: 8.9, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/mambetov_1.jpg'},
    { id: 3, name: 'Лука Джорджевич', number: 15, position: 'defender', positionName: 'Левый защитник', age: 27, nationality: 'Кыргызстан', matches: 192, goals: 13, assists: 35, rating: 8.5, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/jhordzhevich_1.jpg' },
    { id: 4, name: 'Мирлан Бекбердинов', number: 20, position: 'midfielder', positionName: 'Опорный полузащитник', age: 30, nationality: 'Кыргызстан', matches: 165, goals: 22, assists: 42, rating: 9.1, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/bekberdinov_m_1.jpg'},
    { id: 5, name: 'Эрназ Абилов', number: 10, position: 'midfielder', positionName: 'Атакующий полузащитник', age: 25, nationality: 'Кыргызстан', matches: 210, goals: 58, assists: 78, rating: 9.4, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/abilov_1.jpg'},
    { id: 6, name: 'Кадырбек Шаарбеков', number: 9, position: 'forward', positionName: 'Центральный нападающий', age: 24, nationality: 'Кыргызстан', matches: 185, goals: 92, assists: 28, rating: 9.3, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/shaarbekov_1.jpg' },
    { id: 7, name: 'Алекса Мрджа', number: 7, position: 'forward', positionName: 'Правый вингер', age: 29, nationality: 'Кыргызстан', matches: 220, goals: 87, assists: 65, rating: 9.2, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/mrdzhaalexa_1.jpg'},
    { id: 8, name: 'Юрий Сеницкий', number: 11, position: 'forward', positionName: 'Левый вингер', age: 23, nationality: 'Украина', matches: 95, goals: 35, assists: 42, rating: 8.8, image: 'https://fc-dordoi.kg/images/stories/photos/mar_2025/senyitskij_1.jpg'},
  ];

  // Игроки академии
  const academyPlayers = [
    { id: 101, name: 'Айбек Ташбаев', number: 31, position: 'goalkeeper', positionName: 'Вратарь', age: 17, nationality: 'Кыргызстан', matches: 12, goals: 0, assists: 0, rating: 7.2, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2025 },
    { id: 102, name: 'Нурлан Сарыбаев', number: 42, position: 'defender', positionName: 'Центрбек', age: 16, nationality: 'Кыргызстан', matches: 18, goals: 2, assists: 3, rating: 7.8, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2024 },
    { id: 103, name: 'Данияр Усубалиев', number: 45, position: 'defender', positionName: 'Правый защитник', age: 17, nationality: 'Кыргызстан', matches: 15, goals: 1, assists: 4, rating: 7.5, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2025 },
    { id: 104, name: 'Эрбол Атамбаев', number: 38, position: 'midfielder', positionName: 'Центральный полузащитник', age: 16, nationality: 'Кыргызстан', matches: 20, goals: 5, assists: 7, rating: 8.1, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2024 },
    { id: 105, name: 'Алишер Касымов', number: 47, position: 'midfielder', positionName: 'Атакующий полузащитник', age: 17, nationality: 'Кыргызстан', matches: 22, goals: 8, assists: 10, rating: 8.4, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2025 },
    { id: 106, name: 'Бекжан Турдумаматов', number: 39, position: 'forward', positionName: 'Центральный нападающий', age: 16, nationality: 'Кыргызстан', matches: 19, goals: 12, assists: 4, rating: 8.3, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2024 },
    { id: 107, name: 'Мирбек Айдаралиев', number: 41, position: 'forward', positionName: 'Правый вингер', age: 17, nationality: 'Кыргызстан', matches: 21, goals: 9, assists: 6, rating: 8.0, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2025 },
    { id: 108, name: 'Дастан Омурзаков', number: 44, position: 'forward', positionName: 'Левый вингер', age: 16, nationality: 'Кыргызстан', matches: 17, goals: 7, assists: 8, rating: 7.9, image: 'https://cdn-icons-png.flaticon.com/512/5600/5600954.png', year: 2024 },
  ];

  // Тренерский штаб с достижениями
  const coaches = [
    { id: 1, name: 'Александр Крестинин', position: 'Главный тренер', age: 45, nationality: 'Россия', experience: '15 лет', achievements: ['5× Чемпион Кыргызстана', '3× Обладатель Кубка', '2× Лучший тренер года'], image: 'https://fc-dordoi.kg/images/stories/photos/jan_2025/trener/salo.jpg' },
    { id: 2, name: 'Талайбек Джумашев', position: 'Ассистент тренера', age: 42, nationality: 'Кыргызстан', experience: '12 лет', achievements: ['Эксперт по тактике', 'Специалист по защите'], image: 'https://fc-dordoi.kg/images/stories/photos/jan_2025/trener/kaleutin.jpg' },
    { id: 3, name: 'Игорь Кудренко', position: 'Тренер вратарей', age: 38, nationality: 'Беларусь', experience: '10 лет', achievements: ['Лучший тренер вратарей 2022', 'Подготовил 3 сборников'], image: 'https://fc-dordoi.kg/images/stories/photos/jan_2025/trener/bulgak.jpg' },
    { id: 4, name: 'Анвар Березиков', position: 'Тренер по физподготовке', age: 40, nationality: 'Кыргызстан', experience: '8 лет', achievements: ['Специалист по восстановлению', 'Фитнес-эксперт'], image: 'https://fc-dordoi.kg/images/stories/photos/jan_2025/trener/tsoy.jpg' },
  ];

  // Тренеры академии
  const academyCoaches = [
    { id: 201, name: 'Арсен Айдаралиев', position: 'Главный тренер академии', age: 38, nationality: 'Кыргызстан', experience: '10 лет', achievements: ['Подготовил 15 игроков для основной команды', 'Победитель Юношеской лиги 2023'], image: 'https://fc-dordoi.kg/images/stories/photos/new_aug_2017/dyishenaliev_2.jpg' },
    { id: 202, name: 'Марат Садыров', position: 'Тренер вратарей', age: 35, nationality: 'Кыргызстан', experience: '7 лет', achievements: ['Специалист по работе с молодыми вратарями'], image: 'https://fc-dordoi.kg/images/stories/dordoi_2/apr2021/amirov.jpg' },
    { id: 203, name: 'Данияр Жумагулов', position: 'Тренер по физподготовке', age: 32, nationality: 'Кыргызстан', experience: '5 лет', achievements: ['Специалист по развитию молодых игроков'], image: 'https://fc-dordoi.kg/images/stories/dordoi_2/apr2021/tette_1.jpg' },
    { id: 204, name: 'Азамат Исмаилов', position: 'Тренер по технике', age: 36, nationality: 'Кыргызстан', experience: '8 лет', achievements: ['Эксперт по индивидуальной подготовке'], image: 'https://fc-dordoi.kg/images/stories/photos/jan_2025/trener/musaev.jpg' },
  ];

  // Фильтрация игроков
  const filteredPlayers = players.filter(player => {
    const matchesPosition = activePosition === 'all' || player.position === activePosition;
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         player.positionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  // Фильтрация игроков академии
  const filteredAcademyPlayers = academyPlayers.filter(player => {
    const matchesPosition = activeAcademyPosition === 'all' || player.position === activeAcademyPosition;
    const matchesSearch = player.name.toLowerCase().includes(academySearchQuery.toLowerCase()) || 
                         player.positionName.toLowerCase().includes(academySearchQuery.toLowerCase());
    return matchesPosition && matchesSearch;
  });

  // Эффект загрузки с прогресс баром
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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
    <div ref={containerRef} className="pt-[50px] relative min-h-screen bg-gray-950 text-white overflow-hidden">
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
                onClick={() => setActiveTab('players')}
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
                onClick={() => setActiveTab('coaches')}
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
                onClick={() => setActiveTab('academy')}
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
                  <div className="flex flex-wrap justify-center gap-3">
                    {positions.map(pos => (
                      <motion.button
                        key={pos.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActivePosition(pos.id)}
                        className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activePosition === pos.id ? 
                          'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg' : 
                          'bg-gray-800 hover:bg-gray-700 border border-gray-700'}`}
                      >
                        <span className="text-lg">{pos.icon}</span>
                        {pos.name}
                      </motion.button>
                    ))}
                  </div>
                  
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
                        <PlayerCard key={player.id} player={player} />
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
            <>
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
                  <div className="flex flex-wrap justify-center gap-3">
                    {positions.map(pos => (
                      <motion.button
                        key={pos.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveAcademyPosition(pos.id)}
                        className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeAcademyPosition === pos.id ? 
                          'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg' : 
                          'bg-gray-800 hover:bg-gray-700 border border-gray-700'}`}
                      >
                        <span className="text-lg">{pos.icon}</span>
                        {pos.name}
                      </motion.button>
                    ))}
                  </div>
                  
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
                
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">Игроки академии</h3>
                  <AnimatePresence mode="wait">
                    {filteredAcademyPlayers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAcademyPlayers.map((player) => (
                          <AcademyPlayerCard key={player.id} player={player} />
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
            </>
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
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{players.reduce((acc, player) => acc + player.matches, 0)}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Всего матчей</div>
                </div>
                <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{players.reduce((acc, player) => acc + player.goals, 0)}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Забито голов</div>
                </div>
                <div className="text-center bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                  <div className="text-5xl font-bold text-yellow-400 mb-3">{coaches.length + academyCoaches.length}</div>
                  <div className="text-gray-400 uppercase text-sm font-medium">Тренеров</div>
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

      
    </div>
  );
};

// Ультра-карточка игрока
const PlayerCard = ({ player }) => {
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
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full"
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

// Ультра-карточка игрока академии
const AcademyPlayerCard = ({ player }) => {
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
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full"
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img 
          src={player.image || '/images/academy-default.jpg'} 
          alt={player.name}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          onError={(e) => {
            e.target.src = '/images/academy-default.jpg';
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
            <span className="block text-gray-400">Год</span>
            <span className="font-medium">{player.year}</span>
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

// Ультра-карточка тренера
const CoachCard = ({ coach }) => {
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
      className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-full"
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
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-yellow-600/30 opacity-0 pointer-events-none"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 p-5 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h4 className="text-lg font-bold text-white mb-3">Достижения</h4>
            <ul className="space-y-2">
              {coach.achievements.map((achievement, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg className="w-4 h-4 mt-1 mr-2 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UltraTeamPage;