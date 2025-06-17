import React from 'react';

const FansSection = ({ clubInfo }) => (
  <section id="fans" className="w-full py-20 bg-gray-900 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">12 ИГРОК - МЫ С ВАМИ!</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Преданные болельщики - душа нашего клуба
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center"
              >
                <div className="text-5xl text-yellow-400 mb-4">👥</div>
                <h4 className="text-xl font-bold text-white">Фан-движение</h4>
                <p className="text-blue-300 mt-2">Единство и страсть</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">БОЛЕЛЬЩИКИ ДОРДОЙ</h3>
          <div className="h-1 w-20 bg-yellow-400 mb-8"></div>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Наши болельщики создают неповторимую атмосферу на стадионе. Более 5,000 членов официальных фан-клубов
            по всему Кыргызстану поддерживают команду на домашних и выездных матчах. Фанаты ФК «Дордой» известны
            своей преданностью и активной поддержкой команды.
          </p>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Фан-клубы:</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {clubInfo.fans.fanClubs.map((club, i) => (
                <span key={i} className="px-4 py-2 bg-blue-800 rounded-lg text-white">
                  {club}
                </span>
              ))}
            </div>
            <p className="text-blue-300">{clubInfo.fans.attendance}</p>
          </div>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Традиции:</h4>
            <ul className="space-y-3 text-gray-300">
              {clubInfo.fans.traditions.map((tradition, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>{tradition}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Сообщество и инициативы:</h4>
            <ul className="space-y-3 text-gray-300">
              {clubInfo.fans.community.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FansSection;
