import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaSearch, FaTimes, FaExternalLinkAlt, FaFutbol, FaShare, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiLiveFill } from "react-icons/ri";
import axios from 'axios';

const FootballNewsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedNews, setLikedNews] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [featuredResponse, allResponse] = await Promise.all([
          axios.get('https://fc-backend-vxea.onrender.com/news/featured/'),
          axios.get('https://fc-backend-vxea.onrender.com/api/news/all/')
        ]);
        setFeaturedNews(featuredResponse.data);
        setAllNews(allResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  
  useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % featuredNews.length);
  }, 5000);
  return () => clearInterval(interval);
}, [featuredNews.length]); // Dependency on featuredNews.length to re-run when data changes

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNews = allNews.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedNews(null), 300);
    document.body.style.overflow = 'auto';
  };

  const toggleLike = (id) => {
    if (likedNews.includes(id)) {
      setLikedNews(likedNews.filter(item => item !== id));
    } else {
      setLikedNews([...likedNews, id]);
    }
  };

  const scrollToNews = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">

      {/* Герой секция */}
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <span className="text-yellow-400">Футбольные</span> новости <br />ФК <span className="text-yellow-400">Дордой</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-8"
            >
              Будьте в курсе всех событий самого титулованного клуба страны
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={scrollToNews}
                className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all flex items-center justify-center"
              >
                Читать новости <FaArrowRight className="ml-3" />
              </button>
              <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-xl font-bold text-lg hover:bg-yellow-400/10 transition-all flex items-center justify-center">
                Смотреть матчи <RiLiveFill className="ml-3 text-xl" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Поиск и основное содержимое */}
      <div className="container mx-auto px-6 -mt-8 z-10 relative" ref={scrollContainerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <FaSearch className="text-gray-400 text-lg" />
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <FaTimes className="text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Главный слайдер */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <div className="relative h-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={featuredNews[activeSlide]?.image || 'https://via.placeholder.com/800x480'} 
                    alt={featuredNews[activeSlide]?.title || 'Featured News'}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      {featuredNews[activeSlide]?.isLive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm mb-3 w-fit"
                        >
                          <RiLiveFill className="mr-2 animate-pulse" />
                          LIVE
                        </motion.div>
                      )}
                      <div className="flex items-center text-sm mb-3">
                        <FaCalendarAlt className="mr-2 text-yellow-400" />
                        {featuredNews[activeSlide]?.date || 'N/A'}
                        <span className="mx-3">|</span>
                        <div className="flex items-center">
                          <FaHeart className="mr-1 text-red-500" />
                          {featuredNews[activeSlide]?.likes || 0}
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {featuredNews[activeSlide]?.title || 'No Title'}
                      </h2>
                      <p className="text-gray-200 mb-4">
                        {featuredNews[activeSlide]?.excerpt || 'No excerpt available'}
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal(featuredNews[activeSlide])}
                        className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center"
                      >
                        Читать полностью <FaArrowRight className="ml-3" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
                    
              {/* Navigation Arrows */}
              <motion.button 
                onClick={() => setActiveSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all opacity-100"
                whileHover={{ scale: 1.1 }}
                disabled={featuredNews.length <= 1}
              >
                <FaArrowLeft />
              </motion.button>
              <motion.button 
                onClick={() => setActiveSlide((prev) => (prev + 1) % featuredNews.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all opacity-100"
                whileHover={{ scale: 1.1 }}
                disabled={featuredNews.length <= 1}
              >
                <FaArrowRight />
              </motion.button>
            </div>
          </motion.div>

          {/* Боковая панель с новостями */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Последние новости</h2>
                <div className="flex items-center text-sm">
                  <RiLiveFill className="text-red-500 mr-1" />
                  <span>2 LIVE</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="p-4 hover:bg-blue-50 transition-all cursor-pointer relative"
                      onClick={() => openModal(news)}
                    >
                      {news.isLive && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <RiLiveFill className="mr-1 animate-pulse" />
                          LIVE
                        </div>
                      )}
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-4 min-w-[40px] flex items-center justify-center">
                          <FaFutbol />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1 text-blue-900">{news.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{news.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <FaCalendarAlt className="mr-1" />
                              {news.date}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center text-xs text-gray-500 hover:text-red-500 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(news.id);
                                }}>
                                {likedNews.includes(news.id) ? (
                                  <FaHeart className="text-red-500 mr-1" />
                                ) : (
                                  <FaRegHeart className="mr-1" />
                                )}
                                {news.likes + (likedNews.includes(news.id) ? 1 : 0)}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <FaComment className="mr-1" />
                                {news.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-gray-500"
                  >
                    Новости не найдены. Попробуйте изменить запрос.
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно для новостей */}
      <AnimatePresence>
        {isModalOpen && selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-md"
              >
                <FaTimes size={20} />
              </button>

              <div className="p-8">
                <div className="flex items-center text-gray-500 mb-4">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <span>{selectedNews.date}</span>
                  {selectedNews.isLive && (
                    <span className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full text-xs ml-4">
                      <RiLiveFill className="mr-1 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
                  {selectedNews.title}
                </h2>

                {selectedNews.image && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 rounded-xl overflow-hidden shadow-lg"
                  >
                    <img 
                      src={selectedNews.image} 
                      alt={selectedNews.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </motion.div>
                )}

                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                    {selectedNews.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleLike(selectedNews.id)}
                      className={`flex items-center px-4 py-2 rounded-lg ${likedNews.includes(selectedNews.id) ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
                    >
                      {likedNews.includes(selectedNews.id) ? (
                        <FaHeart className="mr-2" />
                      ) : (
                        <FaRegHeart className="mr-2" />
                      )}
                      {selectedNews.likes + (likedNews.includes(selectedNews.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100">
                      <FaComment className="mr-2" />
                      {selectedNews.comments}
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center">
                      <FaShare className="mr-2" />
                      Поделиться
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center">
                      <FaExternalLinkAlt className="mr-2" />
                      Оригинал
                    </button>
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

export default FootballNewsPage;