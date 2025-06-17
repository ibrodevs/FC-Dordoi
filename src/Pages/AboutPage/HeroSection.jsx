import React from 'react';

const HeroSection = ({ clubInfo }) => (
  <section id="hero" className="w-full min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800">
    {/* Тонкие декоративные элементы */}
    <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 text-8xl animate-float text-yellow-400">⚽</div>
      <div className="absolute bottom-1/3 right-1/4 text-8xl animate-float animation-delay-3000 text-yellow-400">🏆</div>
    </div>
    
    {/* Контент с увеличенным текстом */}
    <div className="relative z-20 max-w-6xl w-full px-4 md:px-6 py-12 md:py-16">
      <div className="text-center mb-8 md:mb-10">
        <div className="text-xl md:text-2xl text-yellow-300 mb-3 tracking-wider font-light">
          ФУТБОЛЬНЫЙ КЛУБ КЫРГЫЗСТАНА
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-5 uppercase tracking-tight leading-tight">
          <span className="text-yellow-400 drop-shadow-glow">ФК ДОРДОЙ</span>
        </h1>
        
        <div className="h-1 w-32 md:w-40 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-5 md:mb-6"></div>
        
        <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto mb-5 md:mb-6 leading-relaxed">
          Основан в <span className="text-yellow-400 font-bold">{clubInfo.basic.founded}</span>. 
          <br className="hidden md:block" /> Самый титулованный клуб с <span className="text-yellow-400 font-bold">{clubInfo.basic.trophies}</span> трофеями
        </p>
        
        <div className="relative inline-block max-w-4xl mt-6">
          <p className="text-xl md:text-2xl text-yellow-300 font-light px-6 py-4 bg-blue-900/20 rounded-xl backdrop-blur-sm">
            "{clubInfo.basic.foundingDetails}"
          </p>
        </div>
      </div>

      {/* Чистые информационные карточки */}
      <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {[
          { label: "Стадион", value: clubInfo.basic.stadium },
          { label: "Вместимость", value: clubInfo.stadium.capacity },
          { label: "Президент", value: clubInfo.management.president.name },
          { label: "Главный тренер", value: clubInfo.management.headCoach.name },
        ].map((item, index) => (
          <div 
            key={index} 
            className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl border border-blue-700/20 transition-all duration-300 group"
          >
            <div className="text-yellow-400 text-base font-medium mb-2 tracking-wide">{item.label}</div>
            <div className="text-white font-bold text-xl md:text-2xl">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Крупные минималистичные кнопки */}
      <div className="mt-12 md:mt-14 flex flex-wrap justify-center gap-4 md:gap-5">
        {[
          { text: "История клуба", color: "bg-blue-600 hover:bg-blue-700" },
          { text: "Академия", color: "bg-yellow-500 hover:bg-yellow-600" },
          { text: "Стадион", color: "bg-blue-600 hover:bg-blue-700" }
        ].map((button, idx) => (
          <button 
            key={idx}
            className={`px-8 py-4 text-white font-bold rounded-xl text-lg md:text-xl transition-all duration-300 ${button.color}`}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>

    {/* Элегантный индикатор прокрутки */}
    <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
      <div className="flex flex-col items-center">
        <div className="w-10 h-14 border-2 border-yellow-400 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
        </div>
        <span className="text-yellow-400 text-sm md:text-base mt-2 font-bold tracking-wider">УЗНАТЬ БОЛЬШЕ</span>
      </div>
    </div>
  </section>
);

export default HeroSection;