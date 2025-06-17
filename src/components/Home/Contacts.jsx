import { useState, useEffect } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Сбрасываем статус успеха через 5 секунд
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    transition: { duration: 0.3 }
  };

  const cardTap = {
    scale: 0.98
  };

  return (
    <>
     

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden h-96 md:h-screen max-h-[800px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-transparent z-10"></div>
          
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Hero content */}
          <motion.div 
            className="relative z-20 text-center px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
                Контакты ФК Дордой
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Свяжитесь с нами любым удобным способом
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 -mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-white mb-8">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                    Наши контакты
                  </span>
                </h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <motion.div
                    whileHover={cardHover}
                    whileTap={cardTap}
                    className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-400"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-900/30 p-3 rounded-full">
                        <FiMapPin className="text-yellow-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Адрес стадиона</h3>
                        <p className="text-gray-300">г. Бишкек, ул. Манаса 22</p>
                        <p className="text-gray-400 text-sm mt-2">Стадион "Дордой"</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Phone */}
                  <motion.div
                    whileHover={cardHover}
                    whileTap={cardTap}
                    className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-400"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-900/30 p-3 rounded-full">
                        <FiPhone className="text-blue-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Телефоны</h3>
                        <p className="text-gray-300">+996 (312) 54-12-34 - Пресс-служба</p>
                        <p className="text-gray-300">+996 (312) 54-56-78 - Кассы</p>
                        <p className="text-gray-300">+996 (555) 12-34-56 - Администрация</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Email */}
                  <motion.div
                    whileHover={cardHover}
                    whileTap={cardTap}
                    className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-400"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-900/30 p-3 rounded-full">
                        <FiMail className="text-red-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Электронная почта</h3>
                        <p className="text-gray-300">info@fcdordoy.kg - Общие вопросы</p>
                        <p className="text-gray-300">press@fcdordoy.kg - Пресс-служба</p>
                        <p className="text-gray-300">tickets@fcdordoy.kg - Билеты</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Hours */}
                  <motion.div
                    whileHover={cardHover}
                    whileTap={cardTap}
                    className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-400"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-900/30 p-3 rounded-full">
                        <FiClock className="text-green-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Часы работы</h3>
                        <p className="text-gray-300">Понедельник-Пятница: 9:00 - 18:00</p>
                        <p className="text-gray-300">Суббота: 10:00 - 16:00</p>
                        <p className="text-gray-300">Воскресенье: выходной</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Social Media */}
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold text-white mb-6">Мы в социальных сетях</h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="bg-blue-900/50 hover:bg-blue-900/70 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                      <FiFacebook className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="bg-blue-500/50 hover:bg-blue-500/70 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                      <FiTwitter className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="bg-pink-600/50 hover:bg-pink-600/70 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                      <FiInstagram className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="bg-red-600/50 hover:bg-red-600/70 w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                      <FiYoutube className="text-xl" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-white mb-8">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                    Форма обратной связи
                  </span>
                </h2>
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700"
                >
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center"
                    >
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Спасибо!</h3>
                      <p className="text-gray-300">Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Ваше имя
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              placeholder="Иван Иванов"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Электронная почта
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              placeholder="example@mail.com"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Ваше сообщение
                          </label>
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <textarea
                              id="message"
                              name="message"
                              rows="5"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              placeholder="Напишите ваше сообщение здесь..."
                            ></textarea>
                          </motion.div>
                        </div>
                        
                        <div>
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 rounded-lg text-white font-bold shadow-lg transition-all ${
                              isSubmitting 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-yellow-500/30'
                            }`}
                          >
                            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FiMapPin className="text-yellow-400 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                    Как добраться до стадиона
                  </span>
                </h3>
                <p className="text-gray-300 mb-6">Стадион "Дордой" расположен в центре Бишкека и легко доступен на общественном транспорте.</p>
              </div>
              
              {/* Map placeholder - in a real app you would use Google Maps or similar */}
              <div className="h-96 bg-gradient-to-br from-blue-900 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white text-2xl font-bold mb-2">Стадион "Дордой"</div>
                    <div className="text-gray-300">г. Бишкек, ул. Манаса 22</div>
                  </div>
                </div>
                
                {/* Animated map markers */}
                <motion.div 
                  className="absolute top-1/3 left-1/3 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 left-2/3 w-6 h-6 bg-red-500 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
              
              <div className="p-6 bg-gray-750">
                <h4 className="text-lg font-semibold text-white mb-3">Транспорт до стадиона:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-yellow-400 font-medium mb-2">Автобусы</div>
                    <p className="text-gray-300 text-sm">№ 5, 12, 28, 45 - остановка "Стадион Дордой"</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-yellow-400 font-medium mb-2">Маршрутки</div>
                    <p className="text-gray-300 text-sm">№ 107, 115, 213, 265 - остановка "Центральный парк"</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-yellow-400 font-medium mb-2">Такси</div>
                    <p className="text-gray-300 text-sm">Назовите адрес "Стадион Дордой, ул. Манаса 22"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Contacts;