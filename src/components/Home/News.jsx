import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaShareAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';
import { BiTime } from 'react-icons/bi';

// Анимации
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const categoryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(0, 82, 155, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Данные новостей
const newsData = [
  {
    id: 1,
    title: "FC Dordoi одержал победу в дерби против Алай Ош",
    excerpt: "В напряженном матче наши футболисты показали характер и вырвали победу на последних минутах.",
    content: "<p>Вчера на стадионе 'Дордой' состоялось главное футбольное событие недели - дерби между FC Dordoi и 'Алай' из Оша. Матч проходил при полных трибунах и подарил болельщикам массу эмоций.</p><p>Первый тайм закончился со счетом 0:0, но уже на 52-й минуте наши игроки открыли счет. Однако на 78-й минуте соперник сравнял счет. Казалось, матч закончится вничью, но на 89-й минуте капитан команды забил победный гол, принеся нашей команде важные три очка.</p>",
    category: "Матчи",
    date: "15.05.2025",
    time: "18:30",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: true,
    tags: ["Победа", "Дерби", "Чемпионат"]
  },
  {
    id: 2,
    title: "Новый трансфер: к нам присоединился талантливый полузащитник",
    excerpt: "Клуб объявил о подписании контракта с перспективным игроком из академии.",
    content: "<p>FC Dordoi продолжает укреплять состав. Сегодня клуб официально объявил о переходе 19-летнего полузащитника из собственной академии в основную команду.</p><p>Молодой игрок подписал контракт на 3 года и уже приступил к тренировкам с основной командой. Тренерский штаб высоко оценивает потенциал новичка и планирует постепенно вводить его в основной состав.</p><p>'Мы следили за его прогрессом в академии и уверены, что он сможет стать важным игроком для нашей команды', - заявил главный тренер на пресс-конференции.</p>",
    category: "Трансферы",
    date: "12.05.2025",
    time: "14:15",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: false,
    tags: ["Новичок", "Академия", "Контракт"]
  },
  {
    id: 3,
    title: "Готовимся к ответному матчу Лиги Чемпионов",
    excerpt: "Команда усиленно тренируется перед важным еврокубковым поединком.",
    content: "<p>После победы в первом матче 1/8 финала Лиги Чемпионов, FC Dordoi начал подготовку к ответной встрече. Тренировки проходят дважды в день в усиленном режиме.</p><p>Главный тренер делает акцент на тактическую подготовку и стандартные положения. Несколько игроков, пропустивших первый матч из-за травм, вернулись в строй и готовы помочь команде.</p><p>Болельщики могут ожидать интересную игру, так как соперник обещает приехать с атакующими намерениями, чтобы отыграться после поражения в первом матче.</p>",
    category: "Тренировки",
    date: "10.05.2025",
    time: "09:45",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: true,
    tags: ["Лига Чемпионов", "Подготовка", "Тренировки"]
  },
  {
    id: 4,
    title: "Юные дарования академии получили вызов в сборную",
    excerpt: "Трое наших воспитанников включены в состав юношеской сборной страны.",
    content: "<p>Футбольная академия FC Dordoi продолжает радовать успехами своих воспитанников. На этот раз трое наших молодых игроков получили вызов в юношескую сборную страны.</p><p>Это признание высокого уровня подготовки в нашей академии. Все трое футболистов являются ключевыми игроками юношеского состава и регулярно привлекаются к тренировкам с основной командой.</p><p>Тренерский штаб академии гордится своими подопечными и уверен, что это только начало их большого пути в футболе.</p>",
    category: "Академия",
    date: "08.05.2025",
    time: "16:20",
    image: "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: false,
    tags: ["Академия", "Сборная", "Молодёжь"]
  },
  {
    id: 5,
    title: "Стадион готовится к юбилейному матчу",
    excerpt: "К 25-летию клуба мы готовим специальную программу для болельщиков.",
    content: "<p>В этом месяце FC Dordoi отмечает 25-летний юбилей. По этому случаю клуб готовит масштабное празднование, кульминацией которого станет юбилейный матч против одного из наших принципиальных соперников.</p><p>Для болельщиков подготовлена специальная программа: бесплатные сувениры, выступления музыкальных групп, фан-шоу перед матчем и после него. Также ожидается присутствие легендарных игроков, которые выступали за клуб в разные годы.</p><p>Билеты на матч уже в продаже, и спрос на них огромный. Администрация стадиона просит болельщиков приобретать билеты заранее.</p>",
    category: "Клуб",
    date: "05.05.2025",
    time: "11:10",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: true,
    tags: ["Юбилей", "Стадион", "Болельщики"]
  },
  {
    id: 6,
    title: "Интервью с капитаном команды после удачного старта сезона",
    excerpt: "Капитан команды поделился своими мыслями о начале сезона и целях на турнир.",
    content: "<p>После удачного старта в чемпионате капитан FC Dordoi дал эксклюзивное интервью нашему клубному медиа.</p><p>'Мы довольны началом сезона, но рано почивать на лаврах. Впереди много сложных матчей, и мы должны сохранять концентрацию', - заявил капитан.</p><p>Он также отметил хорошую атмосферу в команде и слаженную работу всего коллектива. Особую благодарность капитан выразил болельщикам, чья поддержка очень помогает команде в трудные моменты матчей.</p><p>На вопрос о целях на сезон капитан ответил: 'Мы настраиваемся только на максимальный результат в каждом турнире. Команда готова бороться за медали'.</p>",
    category: "Интервью",
    date: "03.05.2025",
    time: "13:45",
    image: "https://images.unsplash.com/photo-1543357486-cf2718d69e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    isFeatured: false,
    tags: ["Капитан", "Интервью", "Сезон"]
  }
];

// Категории
const categories = [
  { id: 1, name: "Все", value: "all" },
  { id: 2, name: "Матчи", value: "Матчи" },
  { id: 3, name: "Трансферы", value: "Трансферы" },
  { id: 4, name: "Тренировки", value: "Тренировки" },
  { id: 5, name: "Академия", value: "Академия" },
  { id: 6, name: "Клуб", value: "Клуб" },
  { id: 7, name: "Интервью", value: "Интервью" }
];

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredNews, setFilteredNews] = useState(newsData);

  // Фильтрация новостей
  useEffect(() => {
    let result = newsData;
    
    if (selectedCategory !== "all") {
      result = result.filter(news => news.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(news => 
        news.title.toLowerCase().includes(query) || 
        news.excerpt.toLowerCase().includes(query) ||
        news.content.toLowerCase().includes(query) ||
        news.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredNews(result);
  }, [selectedCategory, searchQuery]);

  // Открытие модального окна с новостью
  const openNewsModal = (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Закрытие модального окна
  const closeNewsModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Поделиться новостью
  const shareNews = async (news) => {
    try {
      await navigator.share({
        title: news.title,
        text: news.excerpt,
        url: window.location.href
      });
    } catch (err) {
      console.log('Ошибка при использовании Web Share API:', err);
      // Fallback для браузеров без поддержки Web Share API
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${news.title}: ${news.excerpt}`)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                НОВОСТИ FC DORDOI
              </h1>
              <p className="text-lg opacity-90">Будьте в курсе всех событий клуба</p>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Поиск новостей..."
                className="w-full py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Категории */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category, i) => (
            <motion.button
              key={category.id}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={categoryVariants}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? "bg-blue-900 text-white"
                  : "bg-white text-blue-900 border border-blue-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        {/* Главная новость (если есть featured) */}
        {filteredNews.some(news => news.isFeatured) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-900 flex items-center">
              <IoMdFootball className="mr-2" /> Главная новость
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredNews.filter(news => news.isFeatured).map(news => (
                <motion.div
                  key={news.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openNewsModal(news)}
                >
                  <div className="relative h-64 lg:h-80">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <span className="inline-block bg-yellow-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                        {news.category}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{news.title}</h3>
                      <div className="flex items-center text-sm text-gray-300">
                        <FaCalendarAlt className="mr-1" />
                        <span className="mr-4">{news.date}</span>
                        <BiTime className="mr-1" />
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Все новости */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Последние новости</h2>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Новости не найдены. Попробуйте изменить критерии поиска.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news, i) => (
                <motion.div
                  key={news.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.1 }}
                  whileHover="hover"
                  className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                  onClick={() => openNewsModal(news)}
                >
                  <div className="relative h-48">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-blue-900">{news.title}</h3>
                    <p className="text-gray-600 mb-4">{news.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        <span>{news.date}</span>
                      </div>
                      <button 
                        className="text-blue-900 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareNews(news);
                        }}
                      >
                        <FaShareAlt />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Подвал */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">FC DORDOI</h3>
              <p className="text-blue-200">Официальный сайт футбольного клуба</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
            © 2025 FC Dordoi. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Модальное окно новости */}
      <AnimatePresence>
        {isModalOpen && selectedNews && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNewsModal}
          >
            <motion.div 
              className="relative bg-white max-w-4xl mx-auto my-12 rounded-xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                className="absolute top-4 right-4 bg-blue-900 text-white p-2 rounded-full z-10 hover:bg-blue-800 transition-colors"
                onClick={closeNewsModal}
              >
                <FaTimes />
              </button>

              {/* Контент новости */}
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="relative h-64 md:h-96">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <span className="inline-block bg-yellow-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {selectedNews.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedNews.title}</h2>
                    <div className="flex items-center text-sm text-gray-300">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-4">{selectedNews.date}</span>
                      <BiTime className="mr-1" />
                      <span>{selectedNews.time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedNews.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-900 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                  />

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                    <button
                      className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors flex items-center"
                      onClick={() => shareNews(selectedNews)}
                    >
                      <FaShareAlt className="mr-2" /> Поделиться
                    </button>
                    <div className="text-gray-500 text-sm">
                      Опубликовано: {selectedNews.date} в {selectedNews.time}
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

export default NewsPage;