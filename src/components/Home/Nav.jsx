import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const DordoiNav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const navRef = useRef(null);

  const menuItems = [
    { path: "/", name: "Главная", color: "yellow" },
    { path: "/about", name: "О клубе", color: "blue" },
    { path: "/team", name: "Команда", color: "yellow" },
    { path: "/matches", name: "Матчи", color: "blue" },
    { path: "/gallery", name: "Галерея", color: "yellow" },
    { path: "/contacts", name: "Контакты", color: "blue" },
  ];

  // Эффект для прокрутки вверх при изменении маршрута
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Эффект для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Определяем активный элемент при изменении маршрута
  useEffect(() => {
    const path = location.pathname;
    const activeIndex = menuItems.findIndex(item => path === item.path);
    setActiveItem(activeIndex >= 0 ? activeIndex : 0);
  }, [location.pathname]);

  // Обновляем позицию индикатора
  useEffect(() => {
    const updateIndicator = () => {
      if (itemRefs.current[activeItem] && indicatorRef.current) {
        const activeEl = itemRefs.current[activeItem];
        indicatorRef.current.style.width = `${activeEl.offsetWidth}px`;
        indicatorRef.current.style.left = `${activeEl.offsetLeft}px`;
        indicatorRef.current.style.backgroundColor = 
          menuItems[activeItem].color === 'yellow' ? '#FACC15' : '#3B82F6';
      }
    };

    const timer = setTimeout(updateIndicator, 10);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeItem, isMobileMenuOpen]);

  const handleNavClick = (index) => {
    setActiveItem(index);
    setIsMobileMenuOpen(false);
    // Дополнительная прокрутка вверх при клике
    window.scrollTo(0, 0);
  };

  return (
    <div className={`w-full py-3 px-4 fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/10 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип */}
        <Link 
          to="/" 
          className="flex items-center mr-4"
          onClick={() => handleNavClick(0)}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png" 
            alt="FC Dordoi Logo" 
            className="h-10 w-auto mr-2"
          />
          <span className="hidden sm:block text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">
            ФК ДОРДОЙ
          </span>
        </Link>

        {/* Кнопка мобильного меню */}
        <button 
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Навигация */}
        <nav 
          ref={navRef}
          className={`ml-100 relative ${isMobileMenuOpen 
            ? 'fixed top-16 left-0 right-0 bg-blue-700/90 z-50 py-4 shadow-lg backdrop-blur-md' 
            : 'hidden sm:flex'} items-center bg-blue-700/90 backdrop-blur-sm px-4 rounded-xl`}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`nav-item block sm:inline-block py-2 sm:py-3 px-4 sm:px-5 mx-1 z-10 relative font-medium transition-colors duration-300 ${
                activeItem === index 
                  ? item.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400' 
                  : 'text-gray-300'
              } hover:text-white`}
              onClick={() => handleNavClick(index)}
            >
              {item.name}
              {activeItem !== index && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-gray-600 rounded-t-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-0"></span>
              )}
            </Link>
          ))}
          <span
            ref={indicatorRef}
            className="absolute left-0 bottom-0 h-[3px] transition-all duration-400 z-10 rounded-t-lg"
          />
        </nav>
      </div>
    </div>
  );
};

export default DordoiNav;