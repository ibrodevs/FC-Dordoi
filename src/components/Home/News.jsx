import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarAlt, FaSearch, FaTimes, FaExternalLinkAlt, FaFutbol, FaShare, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { RiLiveFill } from "react-icons/ri";

const FootballNewsPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedNews, setLikedNews] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const featuredNews = [
    {
      id: 1,
      title: "Дордой - чемпион лиги 2023!",
      date: "15 мая 2023",
      excerpt: "Историческая победа после напряженного сезона",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      content: "Футбольный клуб 'Дордой' вчера вечером одержал историческую победу, завоевав чемпионский титул после напряженного сезона. Решающий матч против главных конкурентов завершился со счетом 2:1. Оба гола забил наш капитан в последние 15 минут игры. Это первый титул за последние 3 года для нашего клуба. Тысячи болельщиков встречали команду в аэропорту и праздновали победу до утра на центральной площади города. Главный тренер в интервью отметил, что это только начало большого пути, и команда уже готовится к участию в международных турнирах.",
      likes: 1243,
      comments: 56,
      isLive: false
    },
    {
      id: 2,
      title: "Новый стадион Дордоя получил сертификат AFC",
      date: "10 мая 2023",
      excerpt: "Теперь мы можем принимать матчи Лиги Чемпионов АФК",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      content: "Наш новый стадион 'Дордой Арена' получил высшую категорию AFC, что позволяет проводить на нем матчи Лиги Чемпионов АФК. Инспекторы AFC высоко оценили инфраструктуру, безопасность и комфорт для болельщиков. Стадион вмещает 25,000 зрителей и оснащен современной системой освещения, травяным покрытием с подогревом и цифровыми табло. Первым крупным турниром на новом стадионе станет матч группового этапа Лиги Чемпионов АФК в сентябре этого года. Президент клуба заявил, что это достижение стало возможным благодаря многолетней работе всей команды.",
      likes: 876,
      comments: 34,
      isLive: true
    },
    {
      id: 3,
      title: "Дордой подписал контракт с новым спонсором",
      date: "20 апреля 2023",
      excerpt: "4-летнее соглашение с ведущим спортивным брендом",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      content: "ФК 'Дордой' заключил 4-летнее спонсорское соглашение с международным спортивным брендом. В рамках партнерства компания будет поставлять экипировку для всех команд клуба, включая академию, а также разработает специальный дизайн формы с акцентом на традиционные сине-желтые цвета. Первая коллекция формы поступит в продажу уже в июне. Кроме того, бренд инвестирует в развитие детской академии клуба. Это самое крупное спонсорское соглашение в истории нашего клуба.",
      likes: 1024,
      comments: 42,
      isLive: false
    }
  ];

  const allNews = [
    {
      id: 4,
      title: "Молодежная команда Дордоя выиграла турнир",
      date: "28 апреля 2023",
      excerpt: "Юные футболисты показали отличную игру в финале",
      content: "Молодежная команда ФК 'Дордой' (U-19) вчера стала победителем национального турнира, обыграв в финале главных конкурентов со счетом 3:0. Особенно отличился 17-летний нападающий, оформивший хет-трик. Этот успех подтверждает эффективность работы нашей академии, которая в последние годы сделала ставку на развитие местных талантов. Трое игроков молодежной команды уже получили приглашение в сборную страны своего возраста. Главный тренер молодежки отметил, что это только начало пути для этих ребят, и в ближайшие годы мы увидим их в основном составе.",
      likes: 543,
      comments: 23,
      isLive: false
    },
    {
      id: 5,
      title: "Открытие нового тренировочного центра Дордоя",
      date: "12 апреля 2023",
      excerpt: "Современный комплекс с 5 полями и медицинским центром",
      content: "Сегодня состоялось торжественное открытие нового тренировочного центра ФК 'Дордой'. Комплекс площадью 30 гектаров включает 5 футбольных полей (2 с натуральным покрытием и 3 с искусственным), крытый манеж, медицинский центр с современным оборудованием, бассейны и тренажерные залы. Центр будет использоваться не только основной командой, но и академией клуба. Президент отметил, что это важный шаг в развитии инфраструктуры клуба и создании условий для воспитания новых звезд футбола.",
      likes: 765,
      comments: 31,
      isLive: false
    },
    {
      id: 6,
      title: "Легенда Дордоя завершает карьеру",
      date: "1 сентября 2023",
      excerpt: "Капитан команды сыграет последний матч в этом сезоне",
      content: "Капитан нашей команды, проведший в 'Дордое' 12 лет и сыгравший более 400 матчей, объявил о завершении карьеры по окончании текущего сезона. В честь легенды клуба запланирована серия мероприятий, включая прощальный матч с участием бывших партнеров по команде. Клуб уже предложил ветерану должность в тренерском штабе, но окончательное решение пока не принято. Болельщики начали сбор подписей за установку памятника у нового стадиона. 'Это не прощание, а начало нового этапа в истории клуба', - заявил президент.",
      likes: 2104,
      comments: 128,
      isLive: false
    },
    {
      id: 7,
      title: "Дордой представил новую форму на сезон 2023/24",
      date: "5 марта 2023",
      excerpt: "Дизайн вдохновлен историческими цветами клуба",
      content: "Сегодня на специальной презентации ФК 'Дордой' представил новую игровую форму на предстоящий сезон. Дизайн домашней формы выполнен в традиционных сине-желтых цветах с современными элементами, а гостевая форма сделана в радикально новом черно-золотом дизайне. Особенностью коллекции стало использование экологичных материалов - форма на 90% состоит из переработанного пластика. Форма поступит в продажу 15 марта, причем часть средств от продаж пойдет на благотворительные проекты клуба. Дизайнеры отмечают, что вдохновлялись архивными фотографиями 90-х годов, когда клуб только начинал свой путь.",
      likes: 987,
      comments: 45,
      isLive: false
    },
    {
      id: 8,
      title: "Дордой начал подготовку к Лиге Чемпионов",
      date: "10 июня 2023",
      excerpt: "Первые тренировки перед международными матчами",
      content: "ФК 'Дордой' начал интенсивную подготовку к предстоящим матчам Лиги Чемпионов АФК. Тренерский штаб разработал специальную программу тренировок, направленную на повышение выносливости и тактической гибкости команды. В ближайшие две недели запланированы три контрольных матча с сильными соперниками. Главный тренер заявил, что команда находится в отличной форме и готова показать достойную игру на международной арене. Первый матч группового этапа состоится уже через месяц.",
      likes: 654,
      comments: 29,
      isLive: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
                    src={featuredNews[activeSlide].image} 
                    alt={featuredNews[activeSlide].title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      {featuredNews[activeSlide].isLive && (
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
                        {featuredNews[activeSlide].date}
                        <span className="mx-3">|</span>
                        <div className="flex items-center">
                          <FaHeart className="mr-1 text-red-500" />
                          {featuredNews[activeSlide].likes}
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {featuredNews[activeSlide].title}
                      </h2>
                      <p className="text-gray-200 mb-4">
                        {featuredNews[activeSlide].excerpt}
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

              <div className="absolute bottom-8 right-8 flex gap-2">
                {featuredNews.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-yellow-400' : 'bg-white/50'}`}
                  />
                ))}
              </div>

              <motion.button 
                onClick={() => setActiveSlide((prev) => (prev - 1 + featuredNews.length) % featuredNews.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
              >
                <FaArrowLeft />
              </motion.button>
              <motion.button 
                onClick={() => setActiveSlide((prev) => (prev + 1) % featuredNews.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
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