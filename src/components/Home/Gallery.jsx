import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiChevronLeft, FiChevronRight, FiHeart, FiDownload, FiShare2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../Home/Footer";

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likedImages, setLikedImages] = useState(new Set());
  const [isHovered, setIsHovered] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Данные галереи с более разнообразными изображениями
  const galleryData = [
    {
      id: 1,
      title: "Чемпионский трофей 2023",
      category: "trophies",
      date: "2023-05-15",
      imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-pastel-award-night-digital-display-%289-design-template-30b4820c495877ffa6f32f46ba53a998_screen.jpg?ts=1746396263",
      tags: ["чемпионат", "победа", "кубок"],
      description: "Торжественный момент вручения чемпионского кубка нашей команде после победы в национальном чемпионате."
    },
    {
      id: 2,
      title: "Победный гол против Алги",
      category: "goals",
      date: "2023-04-22",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICX6jFpkGy9580ScZD6hK4JZQH96WTx9KTcHkBxyWju0EBFhcnE7JsOP3rNlBzaBgC38&usqp=CAU",
      tags: ["гол", "алга", "момент"],
      description: "Решающий гол в матче против Алги, который принес нам выход в финал турнира."
    },
    {
      id: 3,
      title: "Утренняя тренировка",
      category: "training",
      date: "2023-03-10",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_2jPZP5oAyyvY8rep1qEAAnYqwR4k8vIbJaovR0LDpbaxbS8W8ZAWcXeIKGOfT83hw0&usqp=CAU",
      tags: ["тренировка", "подготовка", "команда"],
      description: "Команда на утренней тренировке перед ответственным матчем чемпионата."
    },
    {
      id: 4,
      title: "Поддержка фанатов",
      category: "fans",
      date: "2023-02-28",
      imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-pastel-award-night-digital-display-%289-design-template-30b4820c495877ffa6f32f46ba53a998_screen.jpg?ts=1746396263",
      tags: ["фанаты", "поддержка", "стадион"],
      description: "Наши преданные болельщики создают неповторимую атмосферу на стадионе."
    },
    {
      id: 5,
      title: "Основной состав 2023",
      category: "team",
      date: "2023-01-15",
      imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      tags: ["состав", "игроки", "команда"],
      description: "Легендарный состав команды, который принес нам золото чемпионата."
    },
    {
      id: 6,
      title: "Драма с Абдыш-Ата",
      category: "matches",
      date: "2022-12-05",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["матч", "драма", "победа"],
      description: "Эмоциональный матч против Абдыш-Ата с драматичной развязкой в добавленное время."
    },
    {
      id: 7,
      title: "Лучший бомбардир сезона",
      category: "players",
      date: "2022-11-18",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["игрок", "бомбардир", "рекорд"],
      description: "Наш форвард устанавливает новый рекорд клуба по количеству голов за сезон."
    },
    {
      id: 8,
      title: "Историческая победа",
      category: "history",
      date: "2022-10-30",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["история", "момент", "архив"],
      description: "Момент исторической победы, который вошел в анналы клубной истории."
    },
    {
      id: 9,
      title: "Тренировка вратарей",
      category: "training",
      date: "2022-09-12",
      imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["вратари", "тренировка", "подготовка"],
      description: "Специальная тренировка вратарской бригады перед серией пенальти."
    },
    {
      id: 10,
      title: "Молодежный состав",
      category: "team",
      date: "2022-08-20",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["молодежь", "перспективы", "команда"],
      description: "Талантливые игроки молодежного состава - будущее нашего клуба."
    },
    {
      id: 11,
      title: "Фанатская поддержка",
      category: "fans",
      date: "2022-07-05",
      imageUrl: "https://photosota.club/uploads/posts/2023-02/1677171257_photosota-club-p-dordoi-futbolnii-klub-11.jpg",
      tags: ["ультрас", "поддержка", "атмосфера"],
      description: "Наши фанаты создают неповторимую атмосферу на выездных матчах."
    },
    {
      id: 12,
      title: "Золотой дубль",
      category: "trophies",
      date: "2022-06-18",
      imageUrl: "https://sputnik.kg/img/104385/39/1043853992_0:22:3067:1949_1920x0_80_0_0_896fe50975b4c73e348b5f966b01296f.jpg",
      tags: ["кубок", "чемпионат", "успех"],
      description: "Команда празднует золотой дубль - победу и в чемпионате, и в кубке страны."
    }
  ];

  // Категории с иконками
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

  // Функция для скачивания изображения
  const downloadImage = async () => {
    if (!selectedImage) return;
    
    try {
      const response = await fetch(selectedImage.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `dordoi-${selectedImage.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка при скачивании:', error);
      alert('Не удалось скачать изображение');
    }
  };

  // Функция для открытия модального окна "Поделиться"
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  // Функция для закрытия модального окна "Поделиться"
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  // Функция для копирования ссылки
  const copyToClipboard = () => {
    if (!selectedImage) return;
    
    navigator.clipboard.writeText(selectedImage.imageUrl)
      .then(() => {
        alert('Ссылка скопирована в буфер обмена!');
        closeShareModal();
      })
      .catch(err => {
        console.error('Ошибка при копировании:', err);
        alert('Не удалось скопировать ссылку');
      });
  };

  // Функция для шаринга через нативные API (если поддерживается)
  const nativeShare = async () => {
    if (!selectedImage) return;
    
    try {
      await navigator.share({
        title: selectedImage.title,
        text: selectedImage.description,
        url: selectedImage.imageUrl,
      });
    } catch (err) {
      console.log('Нативный шаринг не поддерживается, открываю модалку');
      openShareModal();
    }
  };

  // Эффект для закрытия по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeImage();
        closeShareModal();
      }
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Анимации
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

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
        {/* Hero секция с параллакс эффектом */}
        <motion.div 
          className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t  to-transparent z-0"></div>
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
              Яркие моменты, эмоции и история легендарного клуба
            </motion.p>
          </div>
        </motion.div>

        {/* Фильтры и поиск */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700"
          >
            {/* Поиск с анимацией */}
            <motion.div 
              className="relative mb-6"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
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
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <FiX className="h-5 w-5 text-gray-400 hover:text-white" />
                </motion.button>
              )}
            </motion.div>

            {/* Категории с анимацией */}
            <div className="overflow-x-auto pb-2">
              <motion.div 
                className="flex space-x-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? 'bg-yellow-500 text-gray-900 shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    }`}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300
                        }
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Галерея с masonry эффектом */}
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
                {filteredImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    custom={index % 4}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
                    onClick={() => openImage(item)}
                    onMouseEnter={() => setIsHovered(item.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* Изображение с эффектом параллакса при наведении */}
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 overflow-hidden">
                      <motion.img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        initial={{ scale: 1 }}
                        animate={{
                          scale: isHovered === item.id ? 1.1 : 1,
                          transition: { duration: 0.5 }
                        }}
                      />
                    </div>

                    {/* Наложение с анимацией */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4"
                      variants={overlayVariants}
                      initial="hidden"
                      animate={isHovered === item.id ? "visible" : "hidden"}
                    >
                      <motion.h3 
                        className="text-white font-bold text-lg mb-1"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.div 
                        className="flex flex-wrap gap-1 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.tags.map((tag) => (
                          <motion.span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-gray-800/80 text-gray-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.div 
                        className="text-xs text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {new Date(item.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </motion.div>
                    </motion.div>

                    {/* Кнопка лайка с анимацией */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-gray-900/50 backdrop-blur-sm z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: isHovered === item.id ? 1 : 0.7,
                        y: isHovered === item.id ? 0 : -5
                      }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiHeart
                        className={`h-5 w-5 ${
                          likedImages.has(item.id) ? 'text-red-500 fill-red-500' : 'text-white'
                        }`}
                      />
                    </motion.button>
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
              <motion.button
                onClick={closeImage}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="h-6 w-6" />
              </motion.button>

              {/* Навигация */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft className="h-8 w-8" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 transition-colors text-white"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="h-8 w-8" />
              </motion.button>

              {/* Контент */}
              <div
                className="relative w-full h-full flex flex-col md:flex-row gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Изображение с анимацией зума */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-1 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <motion.img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isZoomed ? 'max-h-none' : 'max-h-[80vh]'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>

                {/* Информация с анимацией */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-full md:w-96 bg-gray-900/80 backdrop-blur-md rounded-lg p-6 overflow-y-auto max-h-[80vh]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <motion.h2 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedImage.title}
                    </motion.h2>
                    <motion.button
                      onClick={() => toggleLike(selectedImage.id)}
                      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiHeart
                        className={`h-6 w-6 ${
                          likedImages.has(selectedImage.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </motion.button>
                  </div>

                  <motion.div 
                    className="text-sm text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {new Date(selectedImage.date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedImage.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="inline-block px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div 
                      className="p-4 bg-gray-800/50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                        Описание
                      </h3>
                      <p className="text-gray-300">
                        {selectedImage.description}
                      </p>
                    </motion.div>

                    <motion.div 
                      className="flex space-x-3 pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.button 
                        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage();
                        }}
                      >
                        <FiDownload className="mr-2" />
                        Скачать
                      </motion.button>
                      <motion.button 
                        className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            nativeShare();
                          } else {
                            openShareModal();
                          }
                        }}
                      >
                        <FiShare2 />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно "Поделиться" */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeShareModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Поделиться изображением</h3>
              
              <div className="space-y-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {/* Кнопки социальных сетей */}
                  <motion.a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(selectedImage?.imageUrl || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Facebook
                  </motion.a>
                  <motion.a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(selectedImage?.imageUrl || '')}&text=${encodeURIComponent(selectedImage?.title || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Twitter
                  </motion.a>
                  <motion.a
                    href={`https://vk.com/share.php?url=${encodeURIComponent(selectedImage?.imageUrl || '')}&title=${encodeURIComponent(selectedImage?.title || '')}&description=${encodeURIComponent(selectedImage?.description || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-blue-800 hover:bg-blue-900 rounded-lg text-white font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ВКонтакте
                  </motion.a>
                </div>
                
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={selectedImage?.imageUrl || ''}
                    className="flex-1 bg-transparent border-none px-4 py-2 text-white text-sm truncate"
                  />
                  <motion.button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Копировать
                  </motion.button>
                </div>
              </div>
              
              <motion.button
                onClick={closeShareModal}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 transition-colors text-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Футер */}
      <Footer />
    </div>
  );
};

export default GalleryPage;