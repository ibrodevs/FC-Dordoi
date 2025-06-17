import { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTelegram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTicketAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Анимация появления
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 to-gray-900 text-white overflow-hidden">
      {/* Волнообразный разделитель */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden transform -translate-y-1">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-20"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current text-blue-900"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current text-blue-800"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,233.88-19.66,36.94,15.34,81.39,40.8,118.92,52.08V0Z" 
            className="fill-current text-blue-700"
          ></path>
        </svg>
      </div>

      {/* Основное содержимое футера */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-6 py-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Лого и описание */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500 text-blue-900 font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center mr-3">
                <img src="/vite.png" alt="" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                ДОРДОЙ
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Легендарный футбольный клуб Кыргызстана. Чемпионы, герои и гордость нашей страны.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTelegram].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-800 hover:bg-yellow-500 text-white flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Быстрые ссылки</h3>
            <ul className="space-y-3">
              {[
                { name: 'Матчи', href: '/matches' },
                { name: 'Таблица', href: '/matches' },
                { name: 'Игроки', href: '/team' },
                { name: 'Галерея', href: '/gallery' },
                { name: 'История клуба', href: '/about' }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контактная информация */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">г. Бишкек, Стадион "Дордой"</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+996 (312) 123-456</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@fk-dordoy.kg</span>
              </li>
            </ul>

            <div className="mt-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://kassir.kg/ru/category/sport"
                className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors shadow-lg"
              >
                <FaTicketAlt className="mr-2" />
                Купить билеты
              </motion.a>
            </div>
          </motion.div>

          {/* Новостная рассылка */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Подписаться</h3>
            <p className="text-gray-300 mb-4">
              Будьте в курсе всех новостей клуба. Подпишитесь на нашу рассылку.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-lg transition-all shadow-lg"
              >
                Подписаться
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Нижняя часть футера */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} ФК "Дордой". Все права защищены.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Условия использования</a>
          </div>
        </motion.div>
      </motion.div>

      {/* Анимированные элементы фона */}
      <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              position: 'absolute',
              bottom: '-50px',
              background: 'rgba(255, 215, 0, 0.2)',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;