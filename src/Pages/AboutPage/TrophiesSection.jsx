import React from 'react';

const TrophiesSection = ({ clubInfo }) => (
  <section id="trophies" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ЗАЛ СЛАВЫ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Коллекция трофеев самого успешного клуба Кыргызстана
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {clubInfo.trophies.map((honour, index) => (
            <div
              key={honour.id}
              className="bg-gradient-to-br from-blue-800/50 to-blue-900/70 rounded-3xl p-8 border border-blue-700/30 mb-8"
            >
              <div className="flex items-start">
                <div className="text-6xl mr-6">{honour.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{honour.title}</h3>
                  <p className="text-3xl font-bold text-yellow-400 mb-2">{honour.count}</p>
                  <p className="text-blue-300 mb-3">{honour.years}</p>
                  <p className="text-blue-200 mb-4">{honour.description}</p>
                  <p className="text-sm text-blue-300 mb-2">{honour.details}</p>
                  <p className="text-yellow-300 font-bold">{honour.record}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Continental Trophies Highlight */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 border border-yellow-400/30">
          <div className="flex flex-col items-center h-full justify-center text-center">
            <div className="text-8xl mb-6">🌏</div>
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              ТРИУМФ В АЗИИ
            </h3>
            <p className="text-xl text-blue-200 mb-8 text-center">
              ФК «Дордой» вошёл в историю азиатского футбола, став первым клубом, 
              выигравшим Кубок Президента АФК три раза подряд
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  year: "2006",
                  location: "Катманду, Непал",
                  result: "Дордой 2:1 Рахи Ахан",
                  scorer: "Таджибаев (2 гола)"
                },
                {
                  year: "2007",
                  location: "Пхукет, Таиланд",
                  result: "Дордой 1:0 Махидол",
                  scorer: "Кичин (85')"
                },
                {
                  year: "2008",
                  location: "Исламабад, Пакистан",
                  result: "Дордой 3:0 Регар-ТадАЗ",
                  scorer: "Таджибаев, Асатов, Ещенко"
                }
              ].map((trophy, index) => (
                <div
                  key={index}
                  className="bg-blue-700/30 p-4 rounded-xl text-center"
                >
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-yellow-400 font-bold text-xl mb-1">{trophy.year}</div>
                  <div className="text-blue-200 text-sm mb-1">{trophy.location}</div>
                  <div className="text-white font-bold mb-2">{trophy.result}</div>
                  <div className="text-blue-300 text-xs">{trophy.scorer}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 bg-blue-800/50 rounded-xl">
              <p className="text-blue-300 text-center">
                За три года в Кубке Президента АФК клуб провел 18 матчей: 
                <span className="font-bold"> 14 побед, 3 ничьи, 1 поражение</span>, разница мячей 45-12
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Records */}
      <div className="mt-20 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 border border-yellow-400/30">
        <h3 className="text-2xl font-bold text-white mb-6">Рекорды клуба</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Самый титулованный игрок", value: "Айбек Мелс (14 трофеев)" },
            { title: "Лучший бомбардир", value: "Асанбек Таджибаев (142 гола)" },
            { title: "Рекордсмен по матчам", value: "Таалайбек Джуматаев (256 игр)" },
            { title: "Самая крупная победа", value: "11:0 против Абдыш-Ата (2008)" },
            { title: "Наибольшее число голов в сезоне", value: "Асанбек Таджибаев (28 голов, 2007)" },
            { title: "Лучшая серия побед", value: "18 матчей подряд (2018-2019)" },
            { title: "Рекорд посещаемости", value: "10,000 зрителей (финал Кубка АФК 2008)" },
            { title: "Самое долгое время без поражений", value: "32 матча (2019-2020)" },
            { title: "Лучший вратарь", value: "Павел Матяш (112 сухих матчей)" },
            { title: "Лучший ассистент", value: "Рустам Джусубаев (102 передачи)" },
            { title: "Самый молодой дебютант", value: "Эрнист Батырканов (16 лет)" },
            { title: "Самый возрастной игрок", value: "Александр Мерзликин (38 лет)" }
          ].map((record, index) => (
            <div
              key={index}
              className="bg-blue-900/50 p-6 rounded-xl border border-blue-700"
            >
              <h4 className="text-lg font-bold text-white mb-2">{record.title}</h4>
              <p className="text-yellow-400 text-xl font-bold">{record.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrophiesSection;
