import React from 'react';
import stadium from './assets/stadium.jpg'

const StadiumSection = ({ clubInfo }) => (
  <section id="stadium" className="w-full py-20 bg-gray-900 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">СТАДИОН ДОРДОЙ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Домашняя арена клуба с 2007 года
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-white/10 aspect-video bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center">
            <div className="text-white text-2xl font-bold"><img src={stadium} alt="" /></div>
          </div>
          <div className="mt-8 bg-blue-900/50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Технические характеристики:</h4>
            <ul className="space-y-3 text-gray-300">
              <li><span className="font-bold">Поле:</span> 105×68 метров</li>
              <li><span className="font-bold">Покрытие:</span> Искусственный газон FIFA Quality Pro</li>
              <li><span className="font-bold">Освещение:</span> 1400 люкс (стандарт FIFA)</li>
              <li><span className="font-bold">VIP-ложи:</span> 200 мест с отдельным входом</li>
              <li><span className="font-bold">Парковка:</span> 500 машиномест</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">ЦИТАДЕЛЬ ФУТБОЛА</h3>
          <div className="h-1 w-20 bg-yellow-400 mb-8"></div>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Современная футбольная арена в Бишкеке, домашняя крепость ФК «Дордой» с 2007 года. 
            Соответствует всем международным стандартам FIFA и регулярно принимает матчи 
            международного уровня. Стадион построен по проекту архитектора Айбека Джалилова 
            и неоднократно модернизировался.
          </p>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Основные характеристики:</h4>
            <ul className="space-y-3 text-gray-300">
              {clubInfo.stadium.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Академия:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <p><span className="font-bold">Тренировочные поля:</span> {clubInfo.stadium.academy.fields}</p>
              <p><span className="font-bold">Тренеры:</span> {clubInfo.stadium.academy.coaches}</p>
              <p><span className="font-bold">Общежитие:</span> {clubInfo.stadium.academy.dorms}</p>
              <p><span className="font-bold">Выпускники:</span> {clubInfo.stadium.academy.graduates}</p>
              <p><span className="font-bold">Программы:</span> {clubInfo.stadium.academy.programs}</p>
              <p><span className="font-bold">Достижения:</span> {clubInfo.stadium.academy.achievements}</p>
            </div>
          </div>
          <div className="mb-10 p-6 bg-blue-900/50 rounded-xl">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Контактная информация:</h4>
            <p className="text-gray-300"><span className="font-bold">Адрес:</span> {clubInfo.basic.address}</p>
            <p className="text-gray-300"><span className="font-bold">Телефон:</span> {clubInfo.basic.phone}</p>
            <p className="text-gray-300"><span className="font-bold">Email:</span> {clubInfo.basic.email}</p>
            <p className="text-gray-300"><span className="font-bold">Сайт:</span> {clubInfo.basic.website}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StadiumSection;
