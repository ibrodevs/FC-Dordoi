import React from 'react';

const SquadSection = ({ clubInfo }) => (
  <section id="squad" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ТЕКУЩИЙ СОСТАВ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Команда сезона 2023-2024
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Вратари</h3>
          <ul className="space-y-4">
            {clubInfo.currentSquad.goalkeepers.map((player, index) => (
              <li key={index} className="flex items-center bg-blue-900/50 p-4 rounded-xl">
                <div className="text-3xl mr-4">🧤</div>
                <div>
                  <h4 className="text-xl font-bold text-white">{player}</h4>
                  <p className="text-blue-300">Вратарь</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Защитники</h3>
          <ul className="space-y-4">
            {clubInfo.currentSquad.defenders.map((player, index) => (
              <li key={index} className="flex items-center bg-blue-900/50 p-4 rounded-xl">
                <div className="text-3xl mr-4">🛡️</div>
                <div>
                  <h4 className="text-xl font-bold text-white">{player}</h4>
                  <p className="text-blue-300">Защитник</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Полузащитники</h3>
          <ul className="space-y-4">
            {clubInfo.currentSquad.midfielders.map((player, index) => (
              <li key={index} className="flex items-center bg-blue-900/50 p-4 rounded-xl">
                <div className="text-3xl mr-4">⚙️</div>
                <div>
                  <h4 className="text-xl font-bold text-white">{player}</h4>
                  <p className="text-blue-300">Полузащитник</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Нападающие</h3>
          <ul className="space-y-4">
            {clubInfo.currentSquad.forwards.map((player, index) => (
              <li key={index} className="flex items-center bg-blue-900/50 p-4 rounded-xl">
                <div className="text-3xl mr-4">⚽</div>
                <div>
                  <h4 className="text-xl font-bold text-white">{player}</h4>
                  <p className="text-blue-300">Нападающий</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default SquadSection;
