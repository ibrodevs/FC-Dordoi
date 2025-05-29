import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MatchesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Данные матчей
  const matchesData = {
    upcoming: [
      {
        id: 1,
        date: "15.05.2023",
        time: "18:00",
        homeTeam: "Дордой",
        awayTeam: "Алга",
        competition: "Премьер-лига",
        venue: "Дордой Арена",
        homeLogo: "/logos/dordoy.png",
        awayLogo: "/logos/alga.png"
      },
      // Добавьте больше предстоящих матчей
    ],
    past: [
      {
        id: 3,
        date: "07.05.2023",
        score: "3:1",
        homeTeam: "Дордой",
        awayTeam: "Абдыш-Ата",
        competition: "Премьер-лига",
        homeLogo: "/logos/dordoy.png",
        awayLogo: "/logos/abdysh-ata.png",
        highlights: "/videos/highlights-1.mp4",
        goals: [
          { player: "Алиев", minute: 23 },
          { player: "Токтосунов", minute: 45 },
          { player: "Петров", minute: 78 }
        ]
      },
      // Добавьте больше прошедших матчей
    ]
  };

  // Турнирная таблица
  const leagueTable = [
    { position: 1, team: "Дордой", played: 10, won: 8, drawn: 2, lost: 0, points: 26 },
    { position: 2, team: "Алга", played: 10, won: 7, drawn: 1, lost: 2, points: 22 },
    // Добавьте остальные команды
  ];

  const matchCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 80
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(30, 58, 138, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Герой-секция */}
      <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-0">
          <img 
            src="/images/stadium-night.jpg" 
            alt="Стадион"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              МАТЧИ И РЕЗУЛЬТАТЫ
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Следите за всеми матчами ФК "Дордой" в текущем сезоне
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Табы */}
          <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TabList className="flex flex-wrap justify-center gap-2 mb-12">
                {['Ближайшие матчи', 'Прошедшие матчи', 'Турнирная таблица'].map((tab, i) => (
                  <Tab
                    key={i}
                    className={`px-6 py-3 rounded-full font-bold cursor-pointer transition-all ${
                      activeTab === i 
                        ? 'bg-yellow-400 text-blue-900 shadow-lg' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>
            </motion.div>

            {/* Ближайшие матчи */}
            <TabPanel>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {matchesData.upcoming.map((match, i) => (
                  <motion.div
                    key={match.id}
                    variants={matchCardVariants}
                    custom={i}
                    whileHover="hover"
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100"
                  >
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <p className="text-blue-600 font-medium">{match.competition}</p>
                        <p className="text-gray-500">{match.date} • {match.time}</p>
                        <p className="text-gray-700 mt-2">{match.venue}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center">
                          <img src={match.homeLogo} alt={match.homeTeam} className="h-16 w-16 object-contain"/>
                          <span className="font-bold mt-2">{match.homeTeam}</span>
                        </div>
                        
                        <div className="mx-4">
                          <div className="text-2xl font-bold text-blue-900">VS</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <img src={match.awayLogo} alt={match.awayTeam} className="h-16 w-16 object-contain"/>
                          <span className="font-bold mt-2">{match.awayTeam}</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition-all">
                        Купить билеты
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabPanel>

            {/* Прошедшие матчи */}
            <TabPanel>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {matchesData.past.map((match, i) => (
                  <motion.div
                    key={match.id}
                    variants={matchCardVariants}
                    custom={i}
                    whileHover="hover"
                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 cursor-pointer"
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <p className="text-blue-600 font-medium">{match.competition}</p>
                        <p className="text-gray-500">{match.date}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center">
                          <img src={match.homeLogo} alt={match.homeTeam} className="h-16 w-16 object-contain"/>
                          <span className="font-bold mt-2">{match.homeTeam}</span>
                        </div>
                        
                        <div className="mx-4">
                          <div className="text-3xl font-bold text-blue-900">{match.score}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <img src={match.awayLogo} alt={match.awayTeam} className="h-16 w-16 object-contain"/>
                          <span className="font-bold mt-2">{match.awayTeam}</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-lg transition-all">
                        Обзор матча
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabPanel>

            {/* Турнирная таблица */}
            <TabPanel>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-900 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left">#</th>
                        <th className="px-6 py-3 text-left">Команда</th>
                        <th className="px-6 py-3 text-center">И</th>
                        <th className="px-6 py-3 text-center">В</th>
                        <th className="px-6 py-3 text-center">Н</th>
                        <th className="px-6 py-3 text-center">П</th>
                        <th className="px-6 py-3 text-center">О</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leagueTable.map((team, i) => (
                        <motion.tr
                          key={team.team}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`border-b border-gray-200 ${team.team === "Дордой" ? 'bg-blue-50 font-bold' : 'hover:bg-gray-50'}`}
                        >
                          <td className="px-6 py-4">{team.position}</td>
                          <td className="px-6 py-4 flex items-center">
                            <img 
                              src={`/logos/${team.team.toLowerCase()}.png`} 
                              alt={team.team} 
                              className="w-8 h-8 mr-3 object-contain"
                            />
                            {team.team}
                          </td>
                          <td className="px-6 py-4 text-center">{team.played}</td>
                          <td className="px-6 py-4 text-center">{team.won}</td>
                          <td className="px-6 py-4 text-center">{team.drawn}</td>
                          <td className="px-6 py-4 text-center">{team.lost}</td>
                          <td className="px-6 py-4 text-center font-bold">{team.points}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </TabPanel>
          </Tabs>

          {/* Карусель важных матчей */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center mb-10 text-blue-900" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              КЛЮЧЕВЫЕ МАТЧИ СЕЗОНА
            </h2>
            
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper"
              autoplay={{ delay: 5000 }}
            >
              {matchesData.past.slice(0, 5).map(match => (
                <SwiperSlide key={match.id}>
                  <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-blue-900">
                    <img 
                      src={`/images/match-${match.id}.jpg`} 
                      alt={match.homeTeam + " vs " + match.awayTeam}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-900/30" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <h3 className="text-xl font-bold">{match.homeTeam} {match.score} {match.awayTeam}</h3>
                          <p className="text-yellow-400">{match.competition} • {match.date}</p>
                        </div>
                        <button 
                          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-lg transition-all"
                          onClick={() => setSelectedMatch(match)}
                        >
                          Смотреть
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно с деталями матча */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button 
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all"
                onClick={() => setSelectedMatch(null)}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Контент */}
              <div className="p-6">
                {/* Заголовок */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-900">
                    {selectedMatch.homeTeam} {selectedMatch.score} {selectedMatch.awayTeam}
                  </h2>
                  <p className="text-gray-600">
                    {selectedMatch.competition} • {selectedMatch.date}
                  </p>
                </div>
                
                {/* Видео и статистика */}
                <div className="md:flex gap-6">
                  <div className="md:w-2/3 mb-6 md:mb-0">
                    <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                      <video 
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                        poster={`/images/match-${selectedMatch.id}.jpg`}
                      >
                        <source src={selectedMatch.highlights} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">ГОЛЫ</h3>
                    <ul className="space-y-3">
                      {selectedMatch.goals.map((goal, i) => (
                        <li key={i} className="flex items-center bg-blue-50 p-3 rounded-lg">
                          <span className="w-8 h-8 bg-yellow-400 text-blue-900 font-bold rounded-full flex items-center justify-center mr-3">
                            {i+1}
                          </span>
                          <div>
                            <p className="font-bold">{goal.player}</p>
                            <p className="text-sm text-gray-600">{goal.minute}' минута</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Статистика матча */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">СТАТИСТИКА МАТЧА</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-blue-900">62%</p>
                      <p className="text-gray-600">Владение</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-blue-900">18</p>
                      <p className="text-gray-600">Удары</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-3xl font-bold text-blue-900">8</p>
                      <p className="text-gray-600">Угловые</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchesPage;