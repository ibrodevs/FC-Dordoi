import React from 'react';

const SocialProjectsSection = ({ clubInfo }) => (
  <section id="social" className="w-full py-20 bg-gray-900 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">СОЦИАЛЬНЫЕ ПРОЕКТЫ</h2>
        <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Клуб, который заботится о сообществе
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clubInfo.socialProjects.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-3xl p-8 border border-blue-700/30"
          >
            <div className="text-5xl text-yellow-400 mb-6">❤️</div>
            <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-gray-300 mb-6">{project.description}</p>
            <p className="text-blue-300 font-bold">{project.coverage}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProjectsSection;
