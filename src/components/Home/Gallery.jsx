import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiChevronLeft, FiChevronRight, FiHeart, FiDownload, FiShare2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());

  // Данные галереи
  const galleryData = [
    {
      id: 1,
      title: "Победа в чемпионате 2023",
      category: "trophies",
      date: "2023-05-15",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80",
      tags: ["чемпионат", "победа", "кубок"]
    },
    {
      id: 2,
      title: "Гол в ворота Алги",
      category: "goals",
      date: "2023-04-22",
      imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
      tags: ["гол", "алга", "момент"]
    },
    {
      id: 3,
      title: "Тренировка команды",
      category: "training",
      date: "2023-03-10",
      imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["тренировка", "подготовка", "команда"]
    },
    {
      id: 4,
      title: "Фанаты на стадионе",
      category: "fans",
      date: "2023-02-28",
      imageUrl: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&q=80",
      tags: ["фанаты", "поддержка", "стадион"]
    },
    {
      id: 5,
      title: "Легендарный состав 2023",
      category: "team",
      date: "2023-01-15",
      imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      tags: ["состав", "игроки", "команда"]
    },
    {
      id: 6,
      title: "Драматичный матч с Абдыш-Ата",
      category: "matches",
      date: "2022-12-05",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["матч", "драма", "победа"]
    },
    {
      id: 7,
      title: "Лучший бомбардир клуба",
      category: "players",
      date: "2022-11-18",
      imageUrl: "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["игрок", "бомбардир", "рекорд"]
    },
    {
      id: 8,
      title: "Исторический момент клуба",
      category: "history",
      date: "2022-10-30",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["история", "момент", "архив"]
    }
  ];

  // Категории
  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'matches', name: 'Матчи' },
    { id: 'goals', name: 'Голы' },
    { id: 'trophies', name: 'Трофеи' },
    { id: 'team', name: 'Команда' },
    { id: 'training', name: 'Тренировки' },
    { id: 'fans', name: 'Фанаты' },
    { id: 'history', name: 'История' }
  ];

  // Фильтрация изображений
  const filteredImages = galleryData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Обработчики
  const toggleLike = (id) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(id)) {
      newLikedImages.delete(id);
    } else {
      newLikedImages.add(id);
    }
    setLikedImages(newLikedImages);
  };

  const openImage = (image) => {
    setSelectedImage(image);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
    setIsZoomed(false);
  };

  // Эффект для закрытия по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-x-hidden">
      {/* Параллакс фоны */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center motion-safe:animate-pulse-slow"
          style={{ animationDuration: '30s' }}
        ></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-10">
        {/* Hero секция */}
        <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/70 to-transparent z-0"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 text-white"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
                ГАЛЕРЕЯ ДОРДОЙ
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Лучшие моменты легендарного клуба в одном месте
            </motion.p>
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700"
          >
            {/* Поиск */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Поиск по названию или тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>

            {/* Категории */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? 'bg-yellow-500 text-gray-900 shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Галерея */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          {filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-gray-300 mb-2">Ничего не найдено</h3>
              <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative group overflow-hidden rounded-xl shadow-2xl cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => openImage(item)}
                  >
                    {/* Изображение */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Наложение */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-lg mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-gray-800/80 text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        {new Date(item.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    {/* Кнопка лайка */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-500/80 z-10"
                    >
                      <FiHeart
                        className={`h-5 w-5 ${
                          likedImages.has(item.id) ? 'text-red-500 fill-red-500' : 'text-white'
                        }`}
                      />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Модальное окно просмотра изображения */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <div className="relative w-full max-w-6xl max-h-screen">
              {/* Кнопка закрытия */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
              >
                <FiX className="h-6 w-6" />
              </button>

              {/* Навигация */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
              >
                <FiChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
              >
                <FiChevronRight className="h-8 w-8" />
              </button>

              {/* Контент */}
              <div
                className="relative w-full h-full flex flex-col md:flex-row gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Изображение */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-1 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isZoomed ? 'max-h-none' : 'max-h-[80vh]'
                    }`}
                  />
                </motion.div>

                {/* Информация */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-full md:w-96 bg-gray-900/80 backdrop-blur-md rounded-lg p-6 overflow-y-auto max-h-[80vh]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedImage.title}
                    </h2>
                    <button
                      onClick={() => toggleLike(selectedImage.id)}
                      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <FiHeart
                        className={`h-6 w-6 ${
                          likedImages.has(selectedImage.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="text-sm text-gray-300 mb-6">
                    {new Date(selectedImage.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedImage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                        Описание
                      </h3>
                      <p className="text-gray-300">
                        {selectedImage.title} - запечатленный момент из истории ФК "Дордой". 
                        Это изображение стало частью нашей славной коллекции памятных событий клуба.
                      </p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex-1">
                        <FiDownload className="mr-2" />
                        Скачать
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
                        <FiShare2 />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;