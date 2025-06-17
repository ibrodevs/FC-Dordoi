  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation, Pagination, Autoplay } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'react-tabs/style/react-tabs.css';

  const MatchesPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [expandedMatch, setExpandedMatch] = useState(null);
    const [season, setSeason] = useState('2023-2024');
    const [tournament, setTournament] = useState('all');

    // Mock данные
    const seasons = ['2023-2024', '2022-2023', '2021-2022'];
    const tournaments = [
      { id: 'all', name: 'Все турниры', icon: '🏆' },
      { id: 'premier', name: 'Премьер Лига', icon: '⚽' },
      { id: 'cup', name: 'Кубок Кыргызстана', icon: '🏆' },
      { id: 'asia', name: 'Кубок Азии', icon: '🌏' },
      { id: 'friendly', name: 'Товарищеские', icon: '🤝' }
    ];

    const matchesData = {
      upcoming: [
        {
          id: 1,
          date: '2023-11-15',
          time: '18:00',
          homeTeam: 'Дордой',
          awayTeam: 'Алга',
          tournament: 'premier',
          location: 'Стадион Дордой, Бишкек',
          homeLogo: 'https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png',
          awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/FK_Alga_Bishkek_Logo.svg/1200px-FK_Alga_Bishkek_Logo.svg.png',
          ticketLink: '#',
          broadcastLink: '#'
        },
        // ... больше предстоящих матчей
      ],
      completed: [
        {
          id: 101,
          date: '2023-10-28',
          homeTeam: 'Дордой',
          awayTeam: 'Абдыш-Ата',
          score: '3:1',
          homeGoals: ['25\' Петров', '56\' Иванов', '89\' Сидоров'],
          awayGoals: ['72\' Козлов'],
          tournament: 'premier',
          location: 'Стадион Дордой, Бишкек',
          stats: {
            possession: '62% - 38%',
            shots: '18(8) - 6(2)',
            corners: '7 - 3',
            fouls: '12 - 16',
            yellowCards: '2 - 4',
            redCards: '0 - 1'
          },
          homeLogo: 'https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png',
          awayLogo: 'https://upload.wikimedia.org/wikipedia/ru/thumb/5/56/%D0%AD%D0%BC%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0_%D0%A4%D0%9A_%D0%90%D0%B1%D0%B4%D1%8B%D1%88-%D0%90%D1%82%D0%B0.svg/1200px-%D0%AD%D0%BC%D0%B1%D0%BB%D0%B5%D0%BC%D0%B0_%D0%A4%D0%9A_%D0%90%D0%B1%D0%B4%D1%8B%D1%88-%D0%90%D1%82%D0%B0.svg.png',
          highlightsLink: '#',
          reportLink: '#'
        },
        // ... больше завершенных матчей
      ]
    };

    const newsData = [
      {
        id: 1,
        title: 'Дордой разгромил Абдыш-Ату в дерби',
        date: '2023-10-29',
        excerpt: 'В центральном матче тура Дордой одержал уверенную победу со счетом 3:1...',
        image: 'https://cdn-1.aki.kg/cdn-st-0/qem/I/2551947.f0bcae5f75c6b1c7844832fef9ba7e8d.jpg',
        link: '#'
      },
      // ... больше новостей
    ];

    const standingsData = [
      {
        position: 1,
        team: 'Дордой',
        games: 20,
        wins: 16,
        draws: 3,
        losses: 1,
        goalsFor: 48,
        goalsAgainst: 12,
        points: 51,
        form: ['W', 'W', 'D', 'W', 'W']
      },
      // ... больше команд
    ];

    const filteredMatches = {
      upcoming: matchesData.upcoming.filter(match => 
        (tournament === 'all' || match.tournament === tournament)
      ),
      completed: matchesData.completed.filter(match => 
        (tournament === 'all' || match.tournament === tournament)
      )
    };

    const matchCardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
      },
      hover: {
        y: -5,
        boxShadow: "0 10px 25px rgba(234, 179, 8, 0.2)",
        transition: { duration: 0.3 }
      }
    };

    const statsVariants = {
      hidden: { height: 0, opacity: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        transition: { duration: 0.4, ease: "easeInOut" }
      }
    };

    const renderForm = (form) => {
      return form.map((result, index) => (
        <span 
          key={index} 
          className={`inline-block w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            result === 'W' ? 'bg-green-500' : 
            result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
        >
          {result}
        </span>
      ));
    };

    return (
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 min-h-screen">
        {/* Герой секция */}
        <section className="relative py-20 bg-[url('/stadium-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-900/80"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}
            >
              МАТЧИ И РЕЗУЛЬТАТЫ
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-center text-white max-w-2xl mx-auto"
            >
              Следите за выступлениями нашей команды в различных турнирах
            </motion.p>
          </div>
        </section>

        {/* Основное содержание */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Фильтры */}
            <motion.div 
              className="bg-blue-800/50 backdrop-blur-md rounded-xl p-6 mb-12 shadow-lg border border-blue-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-6 justify-between items-center">
                <div>
                  <label className="block text-blue-200 mb-2">Сезон</label>
                  <div className="flex gap-2">
                    {seasons.map(s => (
                      <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          season === s 
                            ? 'bg-yellow-400 text-blue-900' 
                            : 'bg-blue-900/70 text-white hover:bg-blue-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-blue-200 mb-2">Турнир</label>
                  <div className="flex flex-wrap gap-2">
                    {tournaments.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTournament(t.id)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                          tournament === t.id 
                            ? 'bg-yellow-400 text-blue-900' 
                            : 'bg-blue-900/70 text-white hover:bg-blue-700'
                        }`}
                      >
                        <span>{t.icon}</span>
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Табы */}
            <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
              <TabList className="flex justify-center mb-12 border-b border-blue-700">
                {['Предстоящие', 'Завершенные', 'Турнирная таблица', 'Новости'].map((tab, index) => (
                  <Tab
                    key={index}
                    className="px-6 py-3 cursor-pointer text-white font-bold relative"
                    selectedClassName="text-yellow-400"
                  >
                    {tab}
                    {activeTab === index && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
                        layoutId="tabIndicator"
                      />
                    )}
                  </Tab>
                ))}
              </TabList>

              {/* Предстоящие матчи */}
              <TabPanel>
                {filteredMatches.upcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMatches.upcoming.map(match => (
                      <motion.div
                        key={match.id}
                        variants={matchCardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-blue-800 rounded-xl overflow-hidden shadow-lg border border-blue-700"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-blue-300">
                              {new Date(match.date).toLocaleDateString('ru-RU', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </div>
                            <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                              {tournaments.find(t => t.id === match.tournament)?.icon} {tournaments.find(t => t.id === match.tournament)?.name}
                            </div>
                          </div>
                          
                          <div className="text-center mb-4 text-blue-300">
                            {match.time} • {match.location}
                          </div>
                          
                          <div className="flex justify-between items-center py-4">
                            <div className="flex-1 text-right">
                              <div className="font-bold text-xl text-white">{match.homeTeam}</div>
                              <img src={match.homeLogo} alt={match.homeTeam} className="h-16 mx-auto my-2" />
                            </div>
                            
                            <div className="mx-4 text-3xl font-bold text-yellow-400">VS</div>
                            
                            <div className="flex-1 text-left">
                              <div className="font-bold text-xl text-white">{match.awayTeam}</div>
                              <img src={match.awayLogo} alt={match.awayTeam} className="h-16 mx-auto my-2" />
                            </div>
                          </div>
                          
                          <div className="flex justify-center gap-4 mt-6">
                            <a 
                              href={match.ticketLink} 
                              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-2 px-4 rounded-lg transition-all"
                            >
                              Билеты
                            </a>
                            <a 
                              href={match.broadcastLink} 
                              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
                            >
                              Трансляция
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-6">📅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Нет предстоящих матчей</h3>
                    <p className="text-blue-300">Следите за обновлениями расписания</p>
                  </div>
                )}
              </TabPanel>

              {/* Завершенные матчи */}
              <TabPanel>
                <div className="space-y-6">
                  {filteredMatches.completed.map(match => (
                    <motion.div
                      key={match.id}
                      variants={matchCardVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-blue-800 rounded-xl overflow-hidden shadow-lg border border-blue-700"
                    >
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-blue-300">
                            {new Date(match.date).toLocaleDateString('ru-RU', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </div>
                          <div className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {tournaments.find(t => t.id === match.tournament)?.icon} {tournaments.find(t => t.id === match.tournament)?.name}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center py-4">
                          <div className="flex-1 text-right">
                            <div className="font-bold text-xl text-white">{match.homeTeam}</div>
                            <img src={match.homeLogo} alt={match.homeTeam} className="h-16 mx-auto my-2" />
                          </div>
                          
                          <div className="mx-4 text-center">
                            <div className="text-4xl font-bold text-yellow-400">{match.score}</div>
                            <div className="text-blue-300 mt-2">{match.location}</div>
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="font-bold text-xl text-white">{match.awayTeam}</div>
                            <img src={match.awayLogo} alt={match.awayTeam} className="h-16 mx-auto my-2" />
                          </div>
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-4">
                          <button className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1">
                            {expandedMatch === match.id ? 'Скрыть детали' : 'Показать детали'}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={expandedMatch === match.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedMatch === match.id && (
                          <motion.div
                            variants={statsVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="bg-blue-900/50 border-t border-blue-700"
                          >
                            <div className="p-6">
                              {/* Голы */}
                              <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                  <h4 className="text-white font-bold mb-3">Голы {match.homeTeam}</h4>
                                  <ul className="space-y-2">
                                    {match.homeGoals.map((goal, index) => (
                                      <li key={index} className="text-blue-200">{goal}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-white font-bold mb-3">Голы {match.awayTeam}</h4>
                                  <ul className="space-y-2">
                                    {match.awayGoals.map((goal, index) => (
                                      <li key={index} className="text-blue-200">{goal}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              {/* Статистика */}
                              <h4 className="text-white font-bold mb-4 text-center">Статистика матча</h4>
                              <div className="bg-blue-800/50 rounded-xl p-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                  <div>
                                    <div className="text-yellow-400 font-bold text-xl mb-1">Владение</div>
                                    <div className="text-white">{match.stats.possession}</div>
                                  </div>
                                  <div>
                                    <div className="text-yellow-400 font-bold text-xl mb-1">Удары</div>
                                    <div className="text-white">{match.stats.shots}</div>
                                  </div>
                                  <div>
                                    <div className="text-yellow-400 font-bold text-xl mb-1">Угловые</div>
                                    <div className="text-white">{match.stats.corners}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-center gap-4 mt-6">
                                <a 
                                  href={match.highlightsLink} 
                                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  Обзор матча
                                </a>
                                <a 
                                  href={match.reportLink} 
                                  className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Отчет
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </TabPanel>

              {/* Турнирная таблица */}
              <TabPanel>
                <div className="overflow-x-auto">
                  <table className="w-full bg-blue-800/50 rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-blue-700 text-white">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Команда</th>
                        <th className="py-3 px-4 text-center">И</th>
                        <th className="py-3 px-4 text-center">В</th>
                        <th className="py-3 px-4 text-center">Н</th>
                        <th className="py-3 px-4 text-center">П</th>
                        <th className="py-3 px-4 text-center">ГЗ</th>
                        <th className="py-3 px-4 text-center">ГП</th>
                        <th className="py-3 px-4 text-center">РГ</th>
                        <th className="py-3 px-4 text-center">О</th>
                        <th className="py-3 px-4 text-center">Форма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standingsData.map((team, index) => (
                        <tr 
                          key={index} 
                          className={`border-b border-blue-700 ${
                            team.team === 'Дордой' ? 'bg-yellow-400/10 font-bold' : 'text-blue-200'
                          }`}
                        >
                          <td className="py-3 px-4">{team.position}</td>
                          <td className="py-3 px-4 flex items-center gap-2">
                            <img src={`/logos/${team.team.toLowerCase()}.png`} alt={team.team} className="h-6" />
                            {team.team}
                          </td>
                          <td className="py-3 px-4 text-center">{team.games}</td>
                          <td className="py-3 px-4 text-center">{team.wins}</td>
                          <td className="py-3 px-4 text-center">{team.draws}</td>
                          <td className="py-3 px-4 text-center">{team.losses}</td>
                          <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                          <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                          <td className="py-3 px-4 text-center">{team.goalsFor - team.goalsAgainst}</td>
                          <td className="py-3 px-4 text-center font-bold">{team.points}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1 justify-center">
                              {renderForm(team.form)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 bg-blue-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Легенда</h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-green-500"></span>
                      <span className="text-blue-200">Победа</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                      <span className="text-blue-200">Ничья</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-500"></span>
                      <span className="text-blue-200">Поражение</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-700"></span>
                      <span className="text-blue-200">Лига чемпионов АФК</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                      <span className="text-blue-200">Лига АФК</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-700"></span>
                      <span className="text-blue-200">Вылет</span>
                    </div>
                  </div>
                </div>
              </TabPanel>

              {/* Новости */}
              <TabPanel>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                  }}
                  className="mb-12"
                >
                  {newsData.map(news => (
                    <SwiperSlide key={news.id}>
                      <motion.div 
                        className="bg-blue-800 rounded-xl overflow-hidden shadow-lg h-full"
                        whileHover={{ y: -5 }}
                      >
                        <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <div className="text-blue-300 text-sm mb-2">
                            {new Date(news.date).toLocaleDateString('ru-RU')}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{news.title}</h3>
                          <p className="text-blue-200 mb-4">{news.excerpt}</p>
                          <a 
                            href={news.link} 
                            className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
                          >
                            Читать далее
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    Все новости
                  </a>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </section>

        {/* Календарь матчей */}
        <section className="py-16 bg-blue-800/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">КАЛЕНДАРЬ МАТЧЕЙ</h2>
            
            <div className="bg-blue-800/50 rounded-xl p-6 backdrop-blur-md border border-blue-700">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Заголовки дней недели */}
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                  <div key={day} className="text-center text-yellow-400 font-bold py-2">
                    {day}
                  </div>
                ))}
                
                {/* Пустые ячейки для начала месяца */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-24 bg-blue-900/20 rounded-lg"></div>
                ))}
                
                {/* Дни месяца с матчами */}
                {Array.from({ length: 30 }).map((_, index) => {
                  const day = index + 1;
                  const matchDay = matchesData.upcoming.concat(matchesData.completed).find(m => 
                    new Date(m.date).getDate() === day
                  );
                  
                  return (
                    <div 
                      key={day} 
                      className={`h-24 p-2 rounded-lg flex flex-col ${
                        matchDay ? 'bg-yellow-400/10 border border-yellow-400/30 cursor-pointer' : 'bg-blue-900/20 hover:bg-blue-900/30'
                      }`}
                    >
                      <div className={`text-sm font-medium ${
                        matchDay ? 'text-yellow-400' : 'text-blue-300'
                      }`}>
                        {day} ноября
                      </div>
                      
                      {matchDay && (
                        <div className="mt-2 flex-1 flex flex-col justify-center">
                          <div className="text-xs text-white truncate">{matchDay.homeTeam} - {matchDay.awayTeam}</div>
                          <div className="text-xs text-blue-300">
                            {matchDay.time || (matchDay.score && `FT ${matchDay.score}`)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Подписка на уведомления */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">НЕ ПРОПУСТИТЕ НИ ОДНОГО МАТЧА</h2>
            <p className="text-xl text-blue-300 mb-8 max-w-2xl mx-auto">
              Подпишитесь на уведомления и получайте информацию о матчах, билетах и новостях клуба
            </p>
            
            <div className="max-w-md mx-auto flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="flex-1 bg-white/90 text-blue-900 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-r-lg transition-all">
                Подписаться
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default MatchesPage;