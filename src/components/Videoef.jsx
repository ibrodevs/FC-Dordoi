import React from 'react';

function ClubInfo() {
  return (
    <div 
      className="min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a3a8a 0%, #1e4fd3 50%, #2a5fff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 12s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .club-card {
          backdrop-filter: blur(12px);
          background: rgba(30, 58, 138, 0.6);
          border-top: 1px solid rgba(234, 179, 8, 0.4);
          border-left: 1px solid rgba(234, 179, 8, 0.4);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .glow-text {
          text-shadow: 0 0 12px rgba(234, 179, 8, 0.6);
        }
        .glow-box {
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.3);
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Видео (оставлено оригинальное) */}
        <div className="w-full md:w-1/2">
          <section className="gap-2 rounded-lg p-5">
            <figure className="relative">
              <video
                autoPlay
                muted
                loop
                style={{
                  maskImage: "url('/hexagon2.svg')",
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                }}
                className="w-full relative h-full object-cover aspect-square">
                <source
                  src="/public/видео_дор.mp4"
                  type="video/mp4"
                />
              </video>
            </figure>
          </section>
        </div>

        {/* Информация о клубе - стильная правая часть */}
        <div className="w-full md:w-1/2">
          <div className="club-card rounded-2xl p-8 md:p-10 space-y-8 glow-box">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400 glow-text mb-4">
              ФК ДОРДОЙ
              <span className="block text-white text-xl md:text-2xl mt-3 font-medium">Сила. Честь. Победа.</span>
            </h1>

            <div className="space-y-6">
              {/* Основная информация */}
              <div className="flex items-start bg-blue-900/40 p-4 rounded-xl">
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-1">История клуба</h3>
                  <p className="text-white/90">Основан в 1997 году. 11-кратный чемпион Кыргызстана. Участник международных турниров.</p>
                </div>
              </div>

              {/* Достижения */}
              <div className="flex items-start bg-blue-900/40 p-4 rounded-xl">
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Достижения</h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      Рекордные 11 титулов чемпиона Кыргызстана
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      6 Кубков страны
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      Участник Кубка АФК 2006-2007
                    </li>
                  </ul>
                </div>
              </div>

              {/* Стадион */}
              <div className="flex items-start bg-blue-900/40 p-4 rounded-xl">
                <div className="bg-yellow-400 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-1">Стадион</h3>
                  <p className="text-white/90">Домашняя арена - стадион "Дордой" в Бишкеке вместимостью 10,000 зрителей</p>
                </div>
              </div>
            </div>

            {/* Кнопка */}
            <button className="mt-6 px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full md:w-auto">
              Узнать больше о клубе →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;