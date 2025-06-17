import React from 'react';

const CtaSection = () => (
  <section id="cta" className="w-full py-28 bg-gradient-to-br from-blue-900 to-indigo-900 relative">
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
        СТАНЬ ЧАСТЬЮ ИСТОРИИ
      </h2>
      <div className="h-1 w-32 bg-yellow-400 mx-auto mb-10"></div>
      <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
        Присоединяйтесь к легендарному клубу в качестве болельщика, партнера или участника нашей футбольной академии
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl text-lg uppercase tracking-wider">
          КУПИТЬ АБОНЕМЕНТ
        </button>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
          ПАРТНЁРСТВО
        </button>
        <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
          АКАДЕМИЯ
        </button>
      </div>
    </div>
  </section>
);

export default CtaSection;
