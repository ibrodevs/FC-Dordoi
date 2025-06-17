import React from 'react';

const PartnersSection = ({ clubInfo }) => (
  <section id="partners" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ПАРТНЁРЫ И СПОНСОРЫ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Компании, которые поддерживают наш клуб
        </p>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Генеральные партнеры</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {clubInfo.partners.main.map((partner, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold text-white">{partner}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Технические партнеры</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {clubInfo.partners.technical.map((partner, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">👕</div>
              <h4 className="text-xl font-bold text-white">{partner}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Международные партнеры</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {clubInfo.partners.international.map((partner, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="text-xl font-bold text-white">{partner}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
