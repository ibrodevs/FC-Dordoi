import { motion, AnimatePresence } from 'framer-motion';

const PlayerModal = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="relative bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Блок с фото */}
            <div className="w-full md:w-1/3 flex justify-center items-start">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                <img
                  src={player.image || '/default-player.jpg'}
                  alt={player.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/default-player.jpg';
                  }}
                />
                {player.number && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    {player.number}
                  </div>
                )}
              </div>
            </div>
            
            {/* Блок с информацией */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{player.name}</h2>
              <p className="text-yellow-400 text-lg mb-6 font-medium">
                {player.positionName || player.position}
              </p>
              
              {/* Сетка информации */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {player.nationality && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Гражданство</h4>
                    <p className="font-medium">{player.nationality}</p>
                  </div>
                )}
                {player.birthDate && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Дата рождения</h4>
                    <p className="font-medium">{player.birthDate}</p>
                  </div>
                )}
                {player.age && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Возраст</h4>
                    <p className="font-medium">{player.age} лет</p>
                  </div>
                )}
                {player.number && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Игровой номер</h4>
                    <p className="font-medium">{player.number}</p>
                  </div>
                )}
                {player.height && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Рост</h4>
                    <p className="font-medium">{player.height}</p>
                  </div>
                )}
                {player.weight && (
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Вес</h4>
                    <p className="font-medium">{player.weight}</p>
                  </div>
                )}
              </div>
              
              {/* Карьера и достижения */}
              <div className="space-y-6">
                {/* Карьера */}
                {player.career && player.career.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">Карьера</h3>
                    <ul className="space-y-2">
                      {player.career.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 mt-1 mr-2 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{typeof item === 'string' ? item : `${item.club || item.клуб} (${item.years || item.годы})`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Достижения */}
                {player.achievements && player.achievements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">Достижения</h3>
                    <ul className="space-y-2">
                      {player.achievements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 mt-1 mr-2 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Статистика внизу */}
          {(player.matches || player.goals || player.assists || player.rating) && (
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="grid grid-cols-4 gap-2">
                {player.matches !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{player.matches}</div>
                    <div className="text-xs text-gray-300 uppercase">Матчи</div>
                  </div>
                )}
                {player.goals !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{player.goals}</div>
                    <div className="text-xs text-gray-300 uppercase">Голы</div>
                  </div>
                )}
                {player.assists !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{player.assists}</div>
                    <div className="text-xs text-gray-300 uppercase">Ассисты</div>
                  </div>
                )}
                {player.rating !== undefined && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{player.rating}</div>
                    <div className="text-xs text-gray-300 uppercase">Рейтинг</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerModal;