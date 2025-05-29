import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 3D модель футбольного мяча
function BallModel({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/soccer_ball.glb');
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      position={position}
      scale={scale}
    />
  );
}

// 3D карточка игрока
function PlayerCard3D({ player, isActive, onClick }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = isActive 
        ? Math.sin(clock.getElapsedTime() * 0.5) * 0.2
        : 0;
      meshRef.current.position.y = isActive 
        ? Math.sin(clock.getElapsedTime() * 1.5) * 0.1 
        : 0;
    }
  });

  return (
    <group onClick={onClick}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 3.5, 0.2]} />
        <meshStandardMaterial color={isActive ? "#facc15" : "#1e3a8a"} />
      </mesh>
      <Html center >
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white">{player.name}</h3>
          <p className="text-yellow-400">{player.position}</p>
        </div>
      </Html>
    </group>
  );
}

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [positionFilter, setPositionFilter] = useState('all');
  const [nationalityFilter, setNationalityFilter] = useState('all');
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('number');
  const [viewMode, setViewMode] = useState('grid');
  const [is3DView, setIs3DView] = useState(false);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Расширенные mock данные
  const teamData = {
    main: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: ["АЛЕКСЕЙ ПЕТРОВ", "ИГОРЬ СЕРГЕЕВ", "ДАНИИЛ КУЗНЕЦОВ", "МАКСИМ ИВАНОВ", "АРТЕМ СМИРНОВ"][i % 5],
      position: ["ВРАТАРЬ", "ЗАЩИТНИК", "ЗАЩИТНИК", "ПОЛУЗАЩИТНИК", "НАПАДАЮЩИЙ"][i % 5],
      number: i + 1,
      nationality: ["Кыргызстан", "Россия", "Бразилия", "Франция", "Испания"][i % 5],
      image: `/players/main/player${(i % 5) + 1}.jpg`,
      stats: { 
        matches: 20 + Math.floor(Math.random() * 15),
        goals: i % 5 === 4 ? 5 + Math.floor(Math.random() * 15) : Math.floor(Math.random() * 10),
        assists: 1 + Math.floor(Math.random() * 12),
        saves: i % 5 === 0 ? 30 + Math.floor(Math.random() * 50) : 0,
        tackles: i % 5 === 1 || i % 5 === 2 ? 15 + Math.floor(Math.random() * 20) : 0,
        passes: 200 + Math.floor(Math.random() * 300),
        rating: (7 + Math.random() * 3).toFixed(1)
      },
      age: 18 + Math.floor(Math.random() * 12),
      height: `${170 + Math.floor(Math.random() * 25)} см`,
      weight: `${65 + Math.floor(Math.random() * 25)} кг`,
      joined: `${2015 + Math.floor(Math.random() * 8)}`,
      preferredFoot: ["Правая", "Левая", "Обе"][Math.floor(Math.random() * 3)],
      skills: {
        speed: 60 + Math.floor(Math.random() * 40),
        shooting: 50 + Math.floor(Math.random() * 50),
        passing: 50 + Math.floor(Math.random() * 50),
        dribbling: 50 + Math.floor(Math.random() * 50),
        defense: 50 + Math.floor(Math.random() * 50),
        physical: 50 + Math.floor(Math.random() * 50)
      }
    })),
    youth: Array.from({ length: 15 }, (_, i) => ({
      id: i + 101,
      name: ["ДАНИИЛ ИВАНОВ", "АРТУР САФИН", "НИКИТА ВОЛКОВ", "ЕГОР МОРОЗОВ", "КИРИЛЛ ЗАЙЦЕВ"][i % 5],
      position: ["ВРАТАРЬ", "ЗАЩИТНИК", "ПОЛУЗАЩИТНИК", "ПОЛУЗАЩИТНИК", "НАПАДАЮЩИЙ"][i % 5],
      number: i + 20,
      nationality: ["Кыргызстан", "Россия", "Казахстан", "Узбекистан", "Украина"][i % 5],
      image: `/players/youth/player${(i % 5) + 1}.jpg`,
      stats: { 
        matches: 5 + Math.floor(Math.random() * 15),
        goals: i % 5 === 4 ? 2 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 5),
        assists: 1 + Math.floor(Math.random() * 8),
        rating: (6 + Math.random() * 3).toFixed(1)
      },
      age: 16 + Math.floor(Math.random() * 4),
      height: `${165 + Math.floor(Math.random() * 20)} см`,
      potential: `${70 + Math.floor(Math.random() * 30)}%`,
      academy: ["Дордой", "Ала-Тоо", "Локомотив"][Math.floor(Math.random() * 3)]
    })),
    staff: Array.from({ length: 10 }, (_, i) => ({
      id: i + 201,
      name: ["МАРАТ БЕКТОВ", "АЗИЗ СИДИКОВ", "СЕРГЕЙ ДЗОДЗУАШВИЛИ", "АЛЕКСАНДР КРЕСТЕНИН", "ИГОРЬ ТАРАНОВ"][i % 5],
      position: ["ГЛАВНЫЙ ТРЕНЕР", "АССИСТЕНТ", "ТРЕНЕР ВРАТАРЕЙ", "ФИЗПОДГОТОВКА", "АНАЛИТИК"][i % 5],
      nationality: ["Кыргызстан", "Россия", "Грузия", "Украина", "Беларусь"][i % 5],
      image: `/staff/staff${(i % 5) + 1}.jpg`,
      stats: { 
        matches: 50 + Math.floor(Math.random() * 150),
        wins: 20 + Math.floor(Math.random() * 100),
        draws: 10 + Math.floor(Math.random() * 40),
        trophies: Math.floor(Math.random() * 5)
      },
      experience: `${5 + Math.floor(Math.random() * 15)} лет`,
      specialization: ["Тактика", "Техника", "Физика", "Психология", "Аналитика"][Math.floor(Math.random() * 5)],
      qualifications: ["UEFA Pro", "UEFA A", "UEFA B", "РФС"][Math.floor(Math.random() * 4)]
    }))
  };

  const positions = [
    { id: 'all', name: 'Все позиции', icon: '👥' },
    { id: 'вратарь', name: 'Вратари', icon: '🧤' },
    { id: 'защитник', name: 'Защитники', icon: '🛡️' },
    { id: 'полузащитник', name: 'Полузащитники', icon: '⚡' },
    { id: 'нападающий', name: 'Нападающие', icon: '⚽' }
  ];

  const nationalities = [
    { id: 'all', name: 'Все страны', icon: '🌍' },
    { id: 'Кыргызстан', name: 'Кыргызстан', icon: '🇰🇬' },
    { id: 'Россия', name: 'Россия', icon: '🇷🇺' },
    { id: 'Бразилия', name: 'Бразилия', icon: '🇧🇷' },
    { id: 'Франция', name: 'Франция', icon: '🇫🇷' },
    { id: 'Испания', name: 'Испания', icon: '🇪🇸' }
  ];

  const sortOptions = [
    { id: 'number', name: 'По номеру' },
    { id: 'name', name: 'По имени' },
    { id: 'rating', name: 'По рейтингу' },
    { id: 'age', name: 'По возрасту' },
    { id: 'goals', name: 'По голам' }
  ];

  const filteredPlayers = teamData[activeTab]
    .filter(player => {
      const matchesPosition = positionFilter === 'all' || 
                            player.position.toLowerCase().includes(positionFilter.toLowerCase());
      const matchesNationality = nationalityFilter === 'all' || 
                               player.nationality === nationalityFilter;
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           player.number.toString().includes(searchQuery);
      return matchesPosition && matchesNationality && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'number') return a.number - b.number;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.stats.rating || 0) - (a.stats.rating || 0);
      if (sortBy === 'age') return a.age - b.age;
      if (sortBy === 'goals') return (b.stats.goals || 0) - (a.stats.goals || 0);
      return 0;
    });

  const playerCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.5)",
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

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 1, delay: 0.3 }
    })
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  const renderSkillBars = (skills) => {
    return Object.entries(skills).map(([skill, value]) => (
      <div key={skill} className="mb-2">
        <div className="flex justify-between text-xs text-blue-200 mb-1">
          <span>
            {skill === 'speed' ? 'Скорость' : 
             skill === 'shooting' ? 'Удар' : 
             skill === 'passing' ? 'Передача' : 
             skill === 'dribbling' ? 'Дриблинг' : 
             skill === 'defense' ? 'Защита' : 'Физ. подготовка'}
          </span>
          <span>{value}</span>
        </div>
        <div className="w-full bg-blue-800 rounded-full h-2">
          <motion.div
            className="bg-yellow-400 h-2 rounded-full"
            variants={skillBarVariants}
            custom={value}
            initial="hidden"
            animate="visible"
          />
        </div>
      </div>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden"
    >
      {/* Параллакс фон */}
      <motion.div 
        className="absolute inset-0 bg-[url('/stadium_pattern.png')] bg-cover opacity-10"
        style={{ y }}
      />
      
      {/* 3D мячи на заднем фоне */}
      <div className="absolute top-20 left-10 w-40 h-40 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <BallModel position={[0, 0, 0]} scale={1.5} />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>
      
      <div className="absolute bottom-10 right-10 w-32 h-32 opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <BallModel position={[0, 0, 0]} scale={1.2} />
          <OrbitControls enableZoom={false} autoRotate />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Анимированный заголовок с эффектом параллакса */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-5xl md:text-8xl font-bold mb-4 text-yellow-400"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: '4px',
              textShadow: '0 5px 15px rgba(234, 179, 8, 0.5)'
            }}
            whileHover={{ scale: 1.05 }}
          >
            КОМАНДА <span className="text-white">ДОРДОЙ</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Наши герои, которые сражаются за честь клуба на каждом матче
          </motion.p>
        </motion.div>

        {/* Интерактивные табы с анимацией */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex bg-blue-800 rounded-2xl p-1 shadow-xl">
            {[
              { id: 'main', name: 'ОСНОВНОЙ СОСТАВ', icon: '⭐' },
              { id: 'youth', name: 'МОЛОДЁЖКА', icon: '🌱' },
              { id: 'staff', name: 'ТРЕНЕРЫ', icon: '📋' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPositionFilter('all');
                  setNationalityFilter('all');
                  setExpandedPlayer(null);
                }}
                className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-yellow-400 text-blue-900 shadow-lg' 
                    : 'text-white hover:bg-blue-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Расширенная панель фильтров */}
        <motion.div 
          className="bg-blue-800/50 backdrop-blur-md rounded-2xl p-6 mb-12 shadow-2xl border border-blue-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Поиск */}
            <div>
              <label className="block text-blue-200 mb-2">Поиск игрока</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Имя, позиция, номер..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-blue-900/70 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <div className="absolute right-3 top-3 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Фильтр по позиции */}
            <div>
              <label className="block text-blue-200 mb-2">Позиция</label>
              <div className="relative">
                <select 
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value)}
                  className="w-full bg-blue-900/70 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.id}>
                      {pos.icon} {pos.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Фильтр по стране */}
            <div>
              <label className="block text-blue-200 mb-2">Страна</label>
              <div className="relative">
                <select 
                  value={nationalityFilter}
                  onChange={(e) => setNationalityFilter(e.target.value)}
                  className="w-full bg-blue-900/70 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {nationalities.map(nat => (
                    <option key={nat.id} value={nat.id}>
                      {nat.icon} {nat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Сортировка и вид */}
            <div>
              <label className="block text-blue-200 mb-2">Сортировка и вид</label>
              <div className="flex gap-2">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 bg-blue-900/70 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="bg-blue-900/70 hover:bg-blue-700 text-white p-2 rounded-xl"
                  title={viewMode === 'grid' ? 'Список' : 'Сетка'}
                >
                  {viewMode === 'grid' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                </button>
                <button 
                  onClick={() => setIs3DView(!is3DView)}
                  className="bg-blue-900/70 hover:bg-blue-700 text-white p-2 rounded-xl"
                  title="3D режим"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Карусель с эффектом карточек для основного состава */}
        {activeTab === 'main' && !is3DView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              ЗВЕЗДНЫЕ ИГРОКИ
            </h3>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Navigation, Pagination, Autoplay]}
              className="mySwiper max-w-3xl mx-auto"
              navigation
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {filteredPlayers.slice(0, 8).map(player => (
                <SwiperSlide key={player.id}>
                  <motion.div
                    className="relative h-96 bg-blue-800 rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-2 border-yellow-400/30"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setExpandedPlayer(expandedPlayer === player.id ? null : player.id)}
                  >
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-blue-900/20" />
                    <div className="absolute top-6 left-6 w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-900">
                      <span className="text-blue-900 font-bold text-xl">{player.number}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-3xl font-bold text-white mb-1">{player.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 text-lg">{player.position}</span>
                        <span className="text-white bg-blue-900/80 px-4 py-1 rounded-full text-sm flex items-center gap-1">
                          {nationalities.find(n => n.id === player.nationality)?.icon || '🌎'} {player.nationality}
                        </span>
                      </div>
                    </div>
                    
                    {/* Рейтинг игрока */}
                    <div className="absolute top-6 right-6 bg-blue-900/90 rounded-full w-14 h-14 flex items-center justify-center border-2 border-yellow-400">
                      <span className="text-yellow-400 font-bold text-xl">
                        {player.stats.rating}
                      </span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* 3D просмотр команды */}
        {is3DView && (
          <motion.div
            className="h-96 mb-12 rounded-2xl overflow-hidden bg-blue-900/50 border border-blue-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Environment preset="city" />
              
              {filteredPlayers.slice(0, 10).map((player, i) => {
                const angle = (i / filteredPlayers.length) * Math.PI * 2;
                const x = Math.sin(angle) * 5;
                const z = Math.cos(angle) * 5;
                return (
                  <PlayerCard3D 
                    key={player.id}
                    player={player}
                    position={[x, 0, z]}
                    isActive={expandedPlayer === player.id}
                    onClick={() => setExpandedPlayer(expandedPlayer === player.id ? null : player.id)}
                  />
                );
              })}
              
              <OrbitControls 
                enableZoom={true} 
                autoRotate={true} 
                autoRotateSpeed={1} 
                minPolarAngle={Math.PI / 6} 
                maxPolarAngle={Math.PI / 1.5} 
              />
            </Canvas>
          </motion.div>
        )}

        {/* Сетка или список игроков/тренеров */}
        {!is3DView && (
          <motion.div
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }
            layout
          >
            {filteredPlayers.map(player => (
              <motion.div
                key={player.id}
                variants={playerCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={`bg-blue-800 rounded-xl overflow-hidden shadow-lg border-2 ${
                  expandedPlayer === player.id 
                    ? 'border-yellow-400' 
                    : 'border-blue-700'
                } ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                onClick={() => setExpandedPlayer(expandedPlayer === player.id ? null : player.id)}
              >
                {/* Основная информация */}
                <div className={`relative ${
                  viewMode === 'list' 
                    ? 'w-1/3 min-h-[200px]' 
                    : 'pt-[120%]'
                } bg-blue-900 overflow-hidden`}>
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-blue-900/20" />
                  
                  {player.number && (
                    <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-900">
                      <span className="text-blue-900 font-bold">{player.number}</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`font-bold text-white ${
                      viewMode === 'list' ? 'text-2xl' : 'text-xl'
                    }`}>{player.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400">{player.position}</span>
                      <span className="text-white text-sm flex items-center gap-1">
                        {nationalities.find(n => n.id === player.nationality)?.icon || '🌎'}
                        {viewMode === 'list' && player.nationality}
                      </span>
                    </div>
                  </div>
                  
                  {/* Рейтинг для основного состава */}
                  {player.stats.rating && (
                    <div className="absolute top-4 right-4 bg-blue-900/90 rounded-full w-10 h-10 flex items-center justify-center border border-yellow-400">
                      <span className="text-yellow-400 font-bold text-sm">
                        {player.stats.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Дополнительная информация в списке */}
                {viewMode === 'list' && (
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {Object.entries(player.stats).map(([key, value]) => (
                          <div key={key} className="bg-blue-700/50 rounded-lg p-2 text-center">
                            <p className="text-blue-300 text-xs uppercase">
                              {key === 'matches' ? 'Матчи' : 
                               key === 'goals' ? 'Голы' : 
                               key === 'assists' ? 'Передачи' : 
                               key === 'saves' ? 'Сэйвы' : 
                               key === 'wins' ? 'Победы' : 
                               key === 'draws' ? 'Ничьи' : 
                               key === 'trophies' ? 'Трофеи' : key}
                            </p>
                            <p className="text-yellow-400 font-bold">{value}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-blue-300">
                        {player.age && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Возраст: <strong className="text-white">{player.age}</strong></span>
                          </div>
                        )}
                        {player.height && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            <span>Рост: <strong className="text-white">{player.height}</strong></span>
                          </div>
                        )}
                        {player.joined && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span>В клубе с: <strong className="text-white">{player.joined}</strong></span>
                          </div>
                        )}
                        {player.potential && (
                          <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Потенциал: <strong className="text-yellow-400">{player.potential}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      className="self-end text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedPlayer(expandedPlayer === player.id ? null : player.id);
                      }}
                    >
                      {expandedPlayer === player.id ? 'Скрыть детали' : 'Показать детали'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedPlayer === player.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Сообщение если нет результатов */}
        {filteredPlayers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-8">😕</div>
            <h3 className="text-3xl font-bold text-white mb-4">Ничего не найдено</h3>
            <p className="text-blue-300 text-xl mb-6">Попробуйте изменить параметры фильтрации</p>
            <button 
              onClick={() => {
                setPositionFilter('all');
                setNationalityFilter('all');
                setSearchQuery('');
              }}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Сбросить фильтры
            </button>
          </motion.div>
        )}

        {/* Статистика команды */}
        {activeTab !== 'staff' && filteredPlayers.length > 0 && (
          <motion.div 
            className="mt-20 bg-blue-800/50 rounded-2xl p-6 backdrop-blur-md border border-blue-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              КОМАНДНАЯ СТАТИСТИКА
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-900/50 rounded-xl p-4 text-center border border-blue-700">
                <p className="text-blue-300 text-sm uppercase">Всего матчей</p>
                <p className="text-yellow-400 font-bold text-3xl">
                  {filteredPlayers.reduce((sum, player) => sum + (player.stats.matches || 0), 0)}
                </p>
              </div>
              
              <div className="bg-blue-900/50 rounded-xl p-4 text-center border border-blue-700">
                <p className="text-blue-300 text-sm uppercase">Всего голов</p>
                <p className="text-yellow-400 font-bold text-3xl">
                  {filteredPlayers.reduce((sum, player) => sum + (player.stats.goals || 0), 0)}
                </p>
              </div>
              
              <div className="bg-blue-900/50 rounded-xl p-4 text-center border border-blue-700">
                <p className="text-blue-300 text-sm uppercase">Всего передач</p>
                <p className="text-yellow-400 font-bold text-3xl">
                  {filteredPlayers.reduce((sum, player) => sum + (player.stats.assists || 0), 0)}
                </p>
              </div>
              
              <div className="bg-blue-900/50 rounded-xl p-4 text-center border border-blue-700">
                <p className="text-blue-300 text-sm uppercase">Средний рейтинг</p>
                <p className="text-yellow-400 font-bold text-3xl">
                  {(filteredPlayers.reduce((sum, player) => sum + parseFloat(player.stats.rating || 0), 0) / filteredPlayers.length).toFixed(1)}
                </p>
              </div>
            </div>
            
            {/* Топ игроки */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-700">
                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Лучший бомбардир
                </h4>
                {filteredPlayers
                  .sort((a, b) => (b.stats.goals || 0) - (a.stats.goals || 0))
                  .slice(0, 3)
                  .map((player, i) => (
                    <div key={player.id} className="flex items-center gap-3 mb-2 last:mb-0">
                      <div className="text-yellow-400 font-bold w-6">{i + 1}.</div>
                      <div className="flex-1">
                        <p className="text-white">{player.name}</p>
                        <p className="text-blue-300 text-sm">{player.position}</p>
                      </div>
                      <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        {player.stats.goals || 0} ⚽
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-700">
                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Лучшие ассистенты
                </h4>
                {filteredPlayers
                  .sort((a, b) => (b.stats.assists || 0) - (a.stats.assists || 0))
                  .slice(0, 3)
                  .map((player, i) => (
                    <div key={player.id} className="flex items-center gap-3 mb-2 last:mb-0">
                      <div className="text-yellow-400 font-bold w-6">{i + 1}.</div>
                      <div className="flex-1">
                        <p className="text-white">{player.name}</p>
                        <p className="text-blue-300 text-sm">{player.position}</p>
                      </div>
                      <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        {player.stats.assists || 0} 🎯
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-700">
                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Высший рейтинг
                </h4>
                {filteredPlayers
                  .sort((a, b) => parseFloat(b.stats.rating || 0) - parseFloat(a.stats.rating || 0))
                  .slice(0, 3)
                  .map((player, i) => (
                    <div key={player.id} className="flex items-center gap-3 mb-2 last:mb-0">
                      <div className="text-yellow-400 font-bold w-6">{i + 1}.</div>
                      <div className="flex-1">
                        <p className="text-white">{player.name}</p>
                        <p className="text-blue-300 text-sm">{player.position}</p>
                      </div>
                      <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                        {player.stats.rating} ⭐
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Кнопка "Наверх" */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all"
            aria-label="Наверх"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;