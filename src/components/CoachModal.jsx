import { motion, AnimatePresence } from 'framer-motion';

const CoachModal = ({ coach, onClose }) => {
  return (
    <AnimatePresence>
      {coach && (
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
            className="relative bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Фото тренера */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-xs h-auto aspect-square rounded-xl overflow-hidden bg-gray-800">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Информация о тренере */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{coach.name}</h2>
                <p className="text-yellow-400 text-lg mb-6 font-medium">{coach.position}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Национальность</h4>
                    <p className="font-medium">{coach.nationality}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Возраст</h4>
                    <p className="font-medium">{coach.age}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs mb-1">Опыт работы</h4>
                    <p className="font-medium">{coach.experience}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">Достижения</h3>
                    <ul className="space-y-2">
                      {coach.achievements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-4 h-4 mt-1 mr-2 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {coach.bio && (
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-yellow-400">Биография</h3>
                      <p className="text-gray-300">{coach.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoachModal;