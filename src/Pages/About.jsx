import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/parallax';

// 3D модель стадиона
function StadiumModel() {
  const { scene } = useGLTF('./stadium.glb');
  const modelRef = useRef();

  useFrame(() => {
    modelRef.current.rotation.y += 0.002;
  });

  return <primitive ref={modelRef} object={scene} scale={0.8} />;
}

// 3D кубок
function TrophyModel({ isHovered }) {
  const { scene } = useGLTF('/trophy.glb');
  const modelRef = useRef();

  useFrame(() => {
    modelRef.current.rotation.y += isHovered ? 0.05 : 0.01;
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

const AboutClubPage = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [hoveredTrophy, setHoveredTrophy] = useState(null);
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Данные клуба
  const clubData = {
    name: "ФК «Дордой»",
    founded: 1997,
    stadium: "Стадион «Дордой»",
    capacity: "10,000",
    location: "Бишкек, Кыргызстан",
    colors: ["#1E3A8A", "#FACC15"],
    nickname: "«Небесные Воины»",
    president: "Усеналиев Улугбек",
    headCoach: "Бектов Марат",
    trophies: 24
  };

  // История (с анимированными таймлайнами)
  const history = [
    {
      year: "1997",
      title: "Основание клуба",
      content: "Рождение легенды кыргызского футбола. Создан как символ единства и спортивного духа.",
      image: "/history/1997.jpg",
      highlight: true
    },
    // ... другие года
  ];

  // Достижения (с 3D кубками)
  const achievements = [
    {
      id: 1,
      year: "2023",
      title: "Чемпион Кыргызстана",
      stats: "30 матчей | 25 побед | 82 забитых гола",
      image: "/trophies/2023.jpg"
    },
    // ... другие трофеи
  ];

  return (
    <div className="relative bg-blue-950 overflow-hidden" ref={containerRef}>
      {/* Параллакс фон */}
      <motion.div 
        className="absolute inset-0 bg-[url('/textures/stadium_lights.jpg')] bg-cover opacity-20"
        style={{ y: yBg }}
      />

      {/* Epic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-900/50 to-blue-900/20 z-10" />
        
        {/* 3D стадион на фоне */}
        <div className="absolute inset-0 w-full h-full">
          <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <StadiumModel />
            <OrbitControls enableZoom={false} autoRotate />
            <Environment preset="city" />
          </Canvas>
        </div>

        <motion.div 
          className="relative z-20 text-center px-4"
          style={{ y: yText }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-9xl font-bold text-yellow-400 mb-6"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              textShadow: '0 0 20px rgba(250, 204, 21, 0.7)'
            }}
          >
            ДОРДОЙ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl text-white max-w-4xl mx-auto"
          >
            Легенда кыргызского футбола. 24 трофея. Тысячи поклонников. Одна страсть.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12"
          >
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-full text-lg md:text-xl transition-all transform hover:scale-105 shadow-xl">
              Стать частью истории
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-10 h-10 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-blue-900/80 backdrop-blur-md shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 md:space-x-4 py-4">
            {[
              { id: 'history', name: 'История' },
              { id: 'trophies', name: 'Трофеи' },
              { id: 'legends', name: 'Легенды' },
              { id: 'stadium', name: 'Стадион' },
              { id: 'future', name: 'Будущее' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-yellow-400 text-blue-900 shadow-lg' 
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="relative z-10">
        {/* Секция истории */}
        {activeTab === 'history' && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-20"
              >
                НАША <span className="text-white">ИСТОРИЯ</span>
              </motion.h2>

              <div className="relative">
                {/* Анимированная временная линия */}
                <div className="absolute left-1/2 h-full w-1 bg-yellow-400 transform -translate-x-1/2 hidden md:block" />
                
                <div className="space-y-32">
                  {history.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-blue-700 shadow-xl"
                        >
                          <div className="text-yellow-400 text-2xl font-bold mb-2">{item.year}</div>
                          <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                          <p className="text-blue-200 leading-relaxed">{item.content}</p>
                        </motion.div>
                      </div>
                      
                      <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="overflow-hidden rounded-xl shadow-2xl border-4 border-yellow-400/30"
                        >
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-64 md:h-96 object-cover transform hover:scale-110 transition duration-500"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Секция трофеев с 3D */}
        {activeTab === 'trophies' && (
          <section className="py-20 bg-gradient-to-b from-blue-900/30 to-blue-950">
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-6"
              >
                НАШИ <span className="text-white">ТРОФЕИ</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl text-center text-blue-300 max-w-4xl mx-auto mb-20"
              >
                {clubData.trophies} официальных трофеев. Каждый - часть нашей великой истории.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {achievements.map((trophy) => (
                  <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onHoverStart={() => setHoveredTrophy(trophy.id)}
                    onHoverEnd={() => setHoveredTrophy(null)}
                    className="relative"
                  >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32">
                      <Canvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <TrophyModel isHovered={hoveredTrophy === trophy.id} />
                        <OrbitControls enableZoom={false} autoRotate={hoveredTrophy !== trophy.id} />
                      </Canvas>
                    </div>
                    
                    <div className="bg-blue-900/50 backdrop-blur-md rounded-xl pt-24 pb-8 px-6 border border-blue-700 shadow-xl h-full">
                      <div className="text-center">
                        <div className="text-yellow-400 text-4xl font-bold mb-2">{trophy.year}</div>
                        <h3 className="text-2xl font-bold text-white mb-4">{trophy.title}</h3>
                        <p className="text-blue-300 mb-6">{trophy.stats}</p>
                        <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-2 px-6 rounded-full transition-all">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Секция стадиона */}
        {activeTab === 'stadium' && (
          <section className="relative py-32">
            <div className="absolute inset-0 bg-[url('/textures/concrete.jpg')] opacity-10" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-6"
              >
                НАШ <span className="text-white">ФОРТЕЦА</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl text-center text-blue-300 max-w-4xl mx-auto mb-20"
              >
                Стадион «Дордой» - современная арена на 10,000 зрителей
              </motion.p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-blue-700 shadow-xl"
                >
                  <h3 className="text-3xl font-bold text-white mb-6">Технические характеристики</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-yellow-400 text-blue-900 rounded-full p-2 mr-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Вместимость</h4>
                        <p className="text-blue-300">10,000 зрителей</p>
                      </div>
                    </li>
                    {/* Другие характеристики */}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400/30"
                >
                  <Swiper
                    modules={[EffectFade, Parallax, Navigation, Pagination]}
                    effect="fade"
                    parallax={true}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="h-full"
                  >
                    {[
                      "/stadium/1.jpg",
                      "/stadium/2.jpg",
                      "/stadium/3.jpg"
                    ].map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                          <img 
                            src={image} 
                            alt={`Стадион ${index + 1}`} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Секция будущего */}
        {activeTab === 'future' && (
          <section className="relative py-32 bg-[url('/textures/future_bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-blue-900/80" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-6"
              >
                НАШЕ <span className="text-white">БУДУЩЕЕ</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl text-center text-blue-300 max-w-4xl mx-auto mb-20"
              >
                Амбициозные планы и стратегия развития на ближайшие годы
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Академия",
                    description: "Строительство современного тренировочного центра для молодых талантов",
                    icon: "🏟️"
                  },
                  // Другие планы
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="bg-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-blue-700 shadow-xl text-center"
                  >
                    <div className="text-6xl mb-6">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-blue-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Эпичный футер */}
      <footer className="relative bg-blue-900/80 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/textures/footer_pattern.png')] opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">ДОРДОЙ</h3>
              <p className="text-blue-300">Легенда кыргызского футбола с 1997 года</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Навигация</h4>
              <ul className="space-y-2">
                {['Команда', 'Матчи', 'Новости', 'Медиа'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-300 hover:text-yellow-400 transition-all">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Контакты</h4>
              <address className="text-blue-300 not-italic">
                г. Бишкек, ул. Спортивная, 1<br />
                Телефон: +996 312 123 456<br />
                Email: info@fcdordoi.kg
              </address>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Соцсети</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="bg-blue-800 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-12 pt-8 text-center text-blue-300">
            <p>© {new Date().getFullYear()} ФК «Дордой». Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutClubPage;