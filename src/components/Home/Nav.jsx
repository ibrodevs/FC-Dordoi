import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", name: "Главная" },
    { path: "/about", name: "О клубе" },
    { path: "/team", name: "Команда" },
    { path: "/matches", name: "Матчи" },
    { path: "/gallery", name: "Галерея" },
    { path: "/contacts", name: "Контакты" }
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.1,
      color: "#facc15",
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header
  className={`fixed w-full z-50 ${scrolled ? 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900/95 py-2 shadow-xl' : 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900/80 py-4'}`}
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", damping: 10 }}
>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Логотип с анимацией */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <motion.div 
  className="w-12 h-12 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-3"
  whileHover={{ rotate: 360 }}
  transition={{ duration: 0.8 }}
>

                <span className="text-blue-900 font-bold text-xl"><img src="../public/vite.png" alt="" /></span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Десктопное меню */}
          <motion.nav className="hidden md:flex space-x-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link
  to={link.path}
  className={`block px-4 py-3 text-lg rounded-md ${location.pathname === link.path 
    ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 font-bold' 
    : 'text-white hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-700'}`}
  onClick={() => setIsOpen(false)}
>

                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 right-0 bottom-0 h-1 bg-yellow-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Мобильное меню - кнопка */}
          <motion.button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </motion.button>
        </div>

        {/* Мобильное меню - контент */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 text-lg rounded-md ${location.pathname === link.path ? 'bg-yellow-400 text-blue-900 font-bold' : 'text-white hover:bg-blue-800'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Nav;