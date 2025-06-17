import React from 'react';

const LegendsSection = ({ clubInfo }) => (
  <section id="legends" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ВЕЧНЫЕ ЛЕГЕНДЫ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Игроки, вписавшие свои имена в историю клуба золотыми буквами
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {clubInfo.legends.map((player) => (
          <div
            key={player.id}
            className="bg-gradient-to-b from-blue-800/30 to-blue-900/60 rounded-3xl overflow-hidden shadow-xl border border-blue-700/30"
          >
            <div className="h-64 bg-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-center relative overflow-hidden">
              <div className="text-9xl text-white opacity-20">⚽</div>
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold text-white">{player.name}</h3>
                <p className="text-yellow-400 font-medium">{player.position}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-300 font-medium">{player.years}</span>
                <span className="text-yellow-400 font-bold">{player.stats}</span>
              </div>
              <p className="text-gray-300 mb-4">{player.bio}</p>
              <div className="mt-4">
                <h4 className="text-yellow-300 font-bold mb-2">Достижения:</h4>
                <ul className="space-y-2">
                  {player.highlights.map((highlight, i) => (
                    <li key={i} className="text-blue-200 flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              {player.awards && (
                <div className="mt-4 bg-blue-800/30 p-3 rounded-lg">
                  <h4 className="text-yellow-300 font-bold mb-1">Награды:</h4>
                  <p className="text-blue-200">{player.awards}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LegendsSection;
