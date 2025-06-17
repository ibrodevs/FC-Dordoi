import React from 'react';

const AcademySection = ({ clubInfo }) => (
  <section id="academy" className="w-full py-20 bg-gray-900 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">АКАДЕМИЯ ДОРДОЙ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Кузница талантов кыргызского футбола
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">ФУТБОЛЬНАЯ ШКОЛА</h3>
          <div className="h-1 w-20 bg-yellow-400 mb-8"></div>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Основанная в 2005 году, академия ФК «Дордой» является ведущей футбольной школой в Центральной Азии. 
            Наша миссия - воспитывать не только профессиональных футболистов, но и всесторонне развитых личностей.
            Академия располагает современной инфраструктурой и квалифицированным тренерским штабом.
          </p>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Программа обучения:</h4>
            <ul className="space-y-3 text-gray-300">
              {clubInfo.academy.program.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10 bg-blue-900/50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Успехи академии:</h4>
            <ul className="space-y-3 text-gray-300">
              {clubInfo.academy.success.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-10">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Известные выпускники:</h4>
            <div className="flex flex-wrap gap-3">
              {clubInfo.academy.famousGraduates.map((graduate, i) => (
                <span key={i} className="px-4 py-2 bg-blue-800 rounded-lg text-white">
                  {graduate}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-10 p-6 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Как поступить в академию:</h4>
            <ul className="space-y-3 text-gray-300">
              <li><span className="font-bold">Возраст:</span> {clubInfo.academy.admission.ages}</li>
              <li><span className="font-bold">Требования:</span> {clubInfo.academy.admission.requirements}</li>
              <li><span className="font-bold">Контакты:</span> {clubInfo.academy.admission.contact}</li>
            </ul>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl text-lg uppercase tracking-wider">
            ЗАПИСАТЬСЯ В АКАДЕМИЮ
          </button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center"
              >
                <div className="text-5xl text-yellow-400 mb-4">⚽</div>
                <h4 className="text-xl font-bold text-white">Тренировочный процесс</h4>
                <p className="text-blue-300 mt-2">Профессиональные методики подготовки</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-900/50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">Философия академии:</h4>
            <p className="text-gray-300">{clubInfo.academy.philosophy}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AcademySection;
