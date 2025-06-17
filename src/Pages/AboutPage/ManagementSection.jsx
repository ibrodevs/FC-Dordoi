import React from 'react';

const ManagementSection = ({ clubInfo }) => (
  <section id="management" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">РУКОВОДСТВО КЛУБА</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Профессионалы, ведущие клуб к новым победам
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            position: "Президент клуба",
            name: clubInfo.management.president.name,
            tenure: clubInfo.management.president.tenure,
            bio: clubInfo.management.president.bio,
            philosophy: clubInfo.management.president.philosophy,
            achievements: clubInfo.management.president.achievements
          },
          {
            position: "Спортивный директор",
            name: clubInfo.management.director.name,
            tenure: clubInfo.management.director.tenure,
            bio: clubInfo.management.director.bio,
            achievements: clubInfo.management.director.achievements
          },
          {
            position: "Главный тренер",
            name: clubInfo.management.headCoach.name,
            tenure: clubInfo.management.headCoach.tenure,
            bio: clubInfo.management.headCoach.bio,
            trophies: clubInfo.management.headCoach.trophies,
            philosophy: clubInfo.management.headCoach.coachingPhilosophy
          }
        ].map((person, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-blue-800/30 to-blue-900/60 rounded-3xl overflow-hidden shadow-xl border border-blue-700/30"
          >
            <div className="h-64 bg-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-center relative overflow-hidden">
              <div className="text-9xl text-white opacity-20">👤</div>
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold text-white">{person.position}</h3>
                <p className="text-yellow-400 font-medium">{person.name}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-blue-300 mb-2">{person.tenure}</p>
              <p className="text-gray-300 mb-4">{person.bio}</p>
              {person.philosophy && (
                <p className="text-blue-200 italic mb-3">"<span className="text-yellow-400">Философия:</span> {person.philosophy}"</p>
              )}
              {person.achievements && (
                <div className="mb-4">
                  <h4 className="text-yellow-300 font-bold mb-2">Достижения:</h4>
                  <ul className="space-y-2 text-gray-300">
                    {person.achievements.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {person.trophies && (
                <p className="text-yellow-300"><span className="font-bold">Трофеи:</span> {person.trophies}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 border border-yellow-400/30">
        <h3 className="text-2xl font-bold text-white mb-6">ТРЕНЕРСКИЙ ШТАБ</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {clubInfo.management.coachingStaff.map((coach, index) => (
            <div key={index} className="bg-blue-900/50 p-4 rounded-xl text-center">
              <div className="text-4xl mb-3">👤</div>
              <h4 className="text-lg font-bold text-white">{coach}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ManagementSection;
