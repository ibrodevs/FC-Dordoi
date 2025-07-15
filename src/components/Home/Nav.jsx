import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

const DordoiNav = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const navRef = useRef(null);

  const menuItems = [
    { path: "/", name: "Главная", color: "yellow" },
    { path: "/about", name: "О клубе", color: "blue" },
    { path: "/team", name: "Команда", color: "yellow" },
    { path: "/matches", name: "Матчи", color: "blue" },
    { path: "/gallery", name: "Галерея", color: "yellow" },
    { path: "/contacts", name: "Контакты", color: "blue" },
  ];

  // Определяем активный элемент при изменении маршрута
  useEffect(() => {
    const path = location.pathname;
    const activeIndex = menuItems.findIndex(item => path === item.path);
    setActiveItem(activeIndex >= 0 ? activeIndex : 0);
  }, [location.pathname]);

  // Оптимизированная функция обновления индикатора
  const updateIndicator = useCallback(() => {
    if (itemRefs.current[activeItem] && indicatorRef.current && !isMobileMenuOpen) {
      const activeEl = itemRefs.current[activeItem];
      indicatorRef.current.style.width = `${activeEl.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeEl.offsetLeft}px`;
      indicatorRef.current.style.backgroundColor = 
        menuItems[activeItem].color === 'yellow' ? '#FACC15' : '#3B82F6';
    }
  }, [activeItem, isMobileMenuOpen]);

  // Эффекты для прокрутки и ресайза с requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    };

    const handleResize = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        updateIndicator();
        if (window.innerWidth > 768) {
          setIsMobileMenuOpen(false);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Инициализация индикатора
    const timer = setTimeout(updateIndicator, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateIndicator]);

  const handleNavClick = useCallback((index) => {
    setActiveItem(index);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`w-full py-3 px-4 fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/10 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-10xl mx-auto flex items-center justify-between relative">
        {/* Логотип */}
        <Link 
          to="/" 
          className="flex items-center z-50"
          onClick={() => handleNavClick(0)}
          aria-label="На главную"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/ru/0/01/%D0%A4%D0%9A_%D0%94%D0%BE%D1%80%D0%B4%D0%BE%D0%B9.png" 
            alt="FC Dordoi Logo" 
            className="h-10 w-auto"
            loading="lazy"
            width="40"
            height="40"
          />
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-600">
            ФК ДОРДОЙ
          </span>
        </Link>

        {/* Кнопка мобильного меню */}
        <button
          className="md:hidden mobile-menu-button z-50 p-2 rounded-md focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Меню"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-5'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
          </div>
        </button>

        {/* Десктопное меню */}
        <nav 
          ref={navRef}
          className={`hidden md:flex relative items-center bg-blue-700/90 backdrop-blur-sm px-4 rounded-xl`}
          aria-label="Основное меню"
        >
          <div className="flex items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`nav-item inline-block py-3 px-5 mx-1 z-10 relative font-medium transition-colors duration-300 ${
                  activeItem === index 
                    ? item.color === 'yellow' ? 'text-yellow-400' : 'text-blue-400' 
                    : 'text-gray-300'
                } hover:text-white`}
                onClick={() => handleNavClick(index)}
                aria-current={activeItem === index ? "page" : undefined}
              >
                {item.name}
                {activeItem !== index && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-gray-600 rounded-t-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-0"></span>
                )}
              </Link>
            ))}
          </div>
          <span
            ref={indicatorRef}
            className="absolute left-0 bottom-0 h-[3px] transition-all duration-400 z-10 rounded-t-lg"
          />
        </nav>

        {/* Мобильное меню */}
        <div 
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-blue-900/95 backdrop-blur-lg z-40 pt-20 px-4 transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col items-center space-y-6 mt-10">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-2xl font-medium py-3 px-6 w-full text-center rounded-lg transition-colors duration-300 ${
                  activeItem === index 
                    ? item.color === 'yellow' 
                      ? 'bg-yellow-400 text-blue-900' 
                      : 'bg-blue-400 text-white'
                    : 'text-gray-200 hover:bg-blue-800'
                }`}
                onClick={() => handleNavClick(index)}
                aria-current={activeItem === index ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DordoiNav;