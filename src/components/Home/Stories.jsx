import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShareAlt, FaPlay, FaPause } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';

// Анимации
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0.8, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Компонент карточки истории
const StoryCard = ({ story, onClick, index }) => {
  const controls = useAnimation();
  
  return (
    <motion.div
      className="min-w-[200px] w-[200px] rounded-xl overflow-hidden shadow-xl cursor-pointer relative flex-shrink-0"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      onClick={onClick}
    >
      <div className="relative h-[300px]">
        <img
          src={story.thumbnail || story.media[0]?.url}
          alt={story.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="mb-2">
            <motion.span 
              className="text-xs font-bold bg-gradient-to-r from-blue-700 to-blue-600 text-white px-2 py-1 rounded-full inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {story.subtitle}
            </motion.span>
          </div>
          <motion.h3 
            className="text-lg font-bold line-clamp-2 mb-1 leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
          >
            {story.title}
          </motion.h3>
          <motion.p 
            className="text-xs text-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            {story.date}
          </motion.p>
        </div>
        {story.isNew && (
          <motion.span 
            className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full z-10 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35 + index * 0.05, type: 'spring' }}
          >
            NEW
          </motion.span>
        )}
        {story.media.some(item => item.type === 'video') && (
          <motion.div 
            className="absolute top-3 right-3 bg-blue-900/80 p-1.5 rounded-full z-10 backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.05, type: 'spring' }}
          >
            <FaPlay className="text-white text-xs" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Модальное окно истории
const StoryModal = ({
  stories,
  currentStoryIndex,
  currentMediaIndex,
  storyProgress,
  mediaProgress,
  onPrevStory,
  onNextStory,
  onPrevMedia,
  onNextMedia,
  onClose,
  onShare,
  onPause,
  autoplay,
  setAutoplay
}) => {
  const story = stories[currentStoryIndex];
  const media = story.media[currentMediaIndex];
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (media.type === 'video' && videoRef.current) {
      videoRef.current.load();
      const handleLoaded = () => setIsVideoLoaded(true);
      videoRef.current.addEventListener('loadeddata', handleLoaded);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoaded);
        }
      };
    } else {
      setIsVideoLoaded(true);
    }
  }, [media]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative w-full max-w-5xl h-[90vh]">
        {/* Progress Bars */}
        <div className="absolute top-6 left-6 right-6 z-20 space-y-2">
          {/* Story Progress */}
          <div className="flex space-x-1">
            {stories.map((_, idx) => (
              <div key={`story-${idx}`} className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                {idx < currentStoryIndex ? (
                  <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-400" />
                ) : idx === currentStoryIndex ? (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-75 ease-linear" 
                    style={{ width: `${storyProgress}%` }} 
                  />
                ) : (
                  <div className="h-full w-0 bg-blue-400" />
                )}
              </div>
            ))}
          </div>
          
          {/* Media Progress */}
          <div className="flex space-x-1">
            {story.media.map((_, idx) => (
              <div key={`media-${idx}`} className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                {idx < currentMediaIndex ? (
                  <div className="h-full w-full bg-gradient-to-r from-blue-400 to-blue-300" />
                ) : idx === currentMediaIndex ? (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-75 ease-linear" 
                    style={{ width: `${mediaProgress}%` }} 
                  />
                ) : (
                  <div className="h-full w-0 bg-blue-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          className="h-full rounded-2xl overflow-hidden relative"
          key={`${currentStoryIndex}-${currentMediaIndex}`}
          variants={contentVariants}
        >
          {media.type === 'video' ? (
            <video
              ref={videoRef}
              src={media.url}
              autoPlay={autoplay}
              loop
              muted
              playsInline
              className={`w-full h-full object-cover ${isVideoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            />
          ) : (
            <img
              src={media.url}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Loading Spinner for Video */}
          {media.type === 'video' && !isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
            <div className="mb-4">
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full inline-block">
                {story.subtitle}
              </span>
            </div>
            <motion.h2 
              className="text-4xl font-bold mb-3 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {story.title}
            </motion.h2>
            <motion.p 
              className="text-xl max-w-2xl mb-4 opacity-90"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {story.description}
            </motion.p>
            <motion.p 
              className="text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {story.date}
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <motion.button
            className="bg-gradient-to-r from-blue-900/70 to-blue-800/70 hover:from-blue-900 hover:to-blue-800 text-white p-5 rounded-full pointer-events-auto backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all"
            onClick={currentMediaIndex > 0 ? onPrevMedia : onPrevStory}
            aria-label="Предыдущий элемент"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FaArrowLeft size={24} />
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-blue-900/70 to-blue-800/70 hover:from-blue-900 hover:to-blue-800 text-white p-5 rounded-full pointer-events-auto backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all"
            onClick={currentMediaIndex < story.media.length - 1 ? onNextMedia : onNextStory}
            aria-label="Следующий элемент"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FaArrowRight size={24} />
          </motion.button>
        </div>

        {/* Control Buttons */}
        <div className="absolute top-20 right-6 flex flex-col space-y-4">
          <motion.button
            className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 hover:from-blue-900 hover:to-blue-800 text-white p-3.5 rounded-full backdrop-blur-sm shadow-md"
            onClick={onClose}
            aria-label="Закрыть"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <FaTimes size={18} />
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 hover:from-blue-900 hover:to-blue-800 text-white p-3.5 rounded-full backdrop-blur-sm shadow-md"
            onClick={onPause}
            aria-label={autoplay ? "Пауза" : "Продолжить"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {autoplay ? <FaPause size={16} /> : <FaPlay size={16} className="ml-0.5" />}
          </motion.button>
        </div>

        {/* Share Button */}
        <motion.button
          className="absolute bottom-32 right-8 bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
          onClick={onShare}
          aria-label="Поделиться"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <FaShareAlt size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Данные для историй
const storiesData = [
  {
    id: 1,
    title: "Эпичная победа над Алаем в последние минуты",
    subtitle: "Матчдэй",
    description: "Невероятные моменты матча, где FC Dordoi вырвал победу на 89-й минуте благодаря голу капитана!",
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" },
      { type: 'image', url: "https://24.kg/files/media/80/80017.jpg" },
      { type: 'image', url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    isNew: true,
    date: "05.05.2025"
  },
  {
    id: 2,
    title: "Тренировка с капитаном команды",
    subtitle: "За кулисами",
    description: "Эксклюзивные кадры интенсивной тренировки с нашим капитаном перед важным матчем.",
    media: [
      { type: 'image', url: "https://football.by/storage/images/post_img/1714321470.jpg" },
      { type: 'image', url: "https://prosports.kg/upload/news/content/202006/203933_3267866d1b9c27b48022f15352ea3894.jpg" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    isNew: false,
    date: "03.05.2025"
  },
  {
    id: 3,
    title: "Презентация новой формы 2025/26",
    subtitle: "Эксклюзив",
    description: "Первая демонстрация эксклюзивной формы FC Dordoi для нового сезона с инновационными технологиями.",
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" },
      { type: 'image', url: "https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" },
      { type: 'image', url: "https://fc-dordoi.kg/images/stories/news/vesna_2025/murasdordoi_1.jpg" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    isNew: true,
    date: "02.05.2025"
  },
  {
    id: 4,
    title: "Фанаты создают незабываемую атмосферу",
    subtitle: "Атмосфера",
    description: "Энергия и страсть наших болельщиков на последнем домашнем матче сезона.",
    media: [
      { type: 'image', url: "https://fc-dordoi.kg/image?format=raw&id=15208&type=img" },
      { type: 'image', url: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" }
    ],
    thumbnail: "https://fc-dordoi.kg/image?format=raw&id=15209&type=img",
    isNew: false,
    date: "30.04.2025"
  },
  {
    id: 5,
    title: "Юные таланты нашей футбольной академии",
    subtitle: "Следующее поколение",
    description: "Знакомьтесь с будущими звёздами FC Dordoi, которые проходят обучение в нашей академии.",
    media: [
      { type: 'image', url: "https://fc-dordoi.kg/image?format=raw&id=14121&type=img" },
      { type: 'image', url: "https://fc-dordoi.kg/image?format=raw&id=14120&type=img" }
    ],
    thumbnail: "https://fc-dordoi.kg/image?format=raw&id=14117&type=img",
    isNew: true,
    date: "28.04.2025"
  },
  {
    id: 6,
    title: "Эксклюзивное интервью с главным тренером",
    subtitle: "Эксклюзив",
    description: "Главный тренер команды раскрывает планы на сезон и стратегию подготовки к чемпионату.",
    media: [
      { type: 'video', url: "./interv.mp4" },
      { type: 'image', url: "https://images.unsplash.com/photo-1543357486-cf2718d69e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1200&q=80" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1543357486-cf2718d69e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    isNew: true,
    date: "25.04.2025"
  }
];

// Основной компонент страницы историй
const StoriesPage = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Автопрокрутка в модальном окне
  useEffect(() => {
    let timer;
    if (isModalOpen && autoplay) {
      timer = setInterval(() => {
        setMediaProgress(prev => {
          if (prev >= 100) {
            const currentStory = storiesData[currentStoryIndex];
            if (currentMediaIndex < currentStory.media.length - 1) {
              setCurrentMediaIndex(currentMediaIndex + 1);
              return 0;
            } else {
              if (currentStoryIndex < storiesData.length - 1) {
                setCurrentStoryIndex(currentStoryIndex + 1);
                setCurrentMediaIndex(0);
                setStoryProgress(0);
                return 0;
              } else {
                setIsModalOpen(false);
                return 0;
              }
            }
          }
          return prev + 0.5;
        });
        
        if (currentMediaIndex === 0) {
          setStoryProgress(prev => {
            if (prev >= 100) return 0;
            return prev + (100 / (storiesData[currentStoryIndex].media.length * 200));
          });
        }
      }, 20);
    }
    return () => clearInterval(timer);
  }, [isModalOpen, currentStoryIndex, currentMediaIndex, autoplay]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          setIsModalOpen(false);
          break;
        case ' ':
          setAutoplay(prev => !prev);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentStoryIndex, currentMediaIndex]);

  // Drag для карусели
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  const handleNext = () => {
    const currentStory = storiesData[currentStoryIndex];
    if (currentMediaIndex < currentStory.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
      setMediaProgress(0);
    } else if (currentStoryIndex < storiesData.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setCurrentMediaIndex(0);
      setStoryProgress(0);
      setMediaProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
      setMediaProgress(0);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setCurrentMediaIndex(storiesData[currentStoryIndex - 1].media.length - 1);
      setStoryProgress(0);
      setMediaProgress(0);
    }
  };

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -220 : 220;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const story = storiesData[currentStoryIndex];
    try {
      await navigator.share({
        title: `FC Dordoi: ${story.title}`,
        text: story.description,
        url: window.location.href
      });
    } catch (err) {
      console.log('Ошибка при использовании Web Share API:', err);
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${story.title}: ${story.description}`)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handlePause = () => setAutoplay(prev => !prev);

  return (
    <section id='storiesPage' className="py-12 bg-gradient-to-br from-blue-900/5 via-blue-50 to-yellow-50/50">
      <div className="container mx-auto px-4">
        {/* Заголовок и навигация */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <motion.h2 
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700 mb-6 md:mb-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            DORDOI STORIES
          </motion.h2>
          
          <motion.div 
            className="flex space-x-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-3.5 rounded-full hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
              onClick={() => scrollCarousel('left')}
              aria-label="Предыдущие сторисы"
            >
              <FaArrowLeft size={18} />
            </button>
            <button
              className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-3.5 rounded-full hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
              onClick={() => scrollCarousel('right')}
              aria-label="Следующие сторисы"
            >
              <FaArrowRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Карусель историй */}
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6 space-x-4 pb-10 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={startDrag}
          onMouseMove={duringDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {storiesData.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              onClick={() => {
                setCurrentStoryIndex(index);
                setCurrentMediaIndex(0);
                setIsModalOpen(true);
                setStoryProgress(0);
                setMediaProgress(0);
                setAutoplay(true);
              }}
            />
          ))}
        </motion.div>

        {/* Модальное окно */}
        <AnimatePresence>
          {isModalOpen && (
            <StoryModal
              stories={storiesData}
              currentStoryIndex={currentStoryIndex}
              currentMediaIndex={currentMediaIndex}
              storyProgress={storyProgress}
              mediaProgress={mediaProgress}
              onPrevStory={() => {
                if (currentStoryIndex > 0) {
                  setCurrentStoryIndex(currentStoryIndex - 1);
                  setCurrentMediaIndex(storiesData[currentStoryIndex - 1].media.length - 1);
                  setStoryProgress(0);
                  setMediaProgress(0);
                }
              }}
              onNextStory={() => {
                if (currentStoryIndex < storiesData.length - 1) {
                  setCurrentStoryIndex(currentStoryIndex + 1);
                  setCurrentMediaIndex(0);
                  setStoryProgress(0);
                  setMediaProgress(0);
                } else {
                  setIsModalOpen(false);
                }
              }}
              onPrevMedia={handlePrev}
              onNextMedia={handleNext}
              onClose={() => setIsModalOpen(false)}
              onShare={handleShare}
              onPause={handlePause}
              autoplay={autoplay}
              setAutoplay={setAutoplay}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StoriesPage;