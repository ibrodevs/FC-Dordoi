import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const AboutPage = () => {
  const [activeEra, setActiveEra] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  // Расширенные данные о клубе
  const clubInfo = {
    basic: {
      founded: "1997",
      fullName: "Футбольный клуб «Дордой»",
      location: "Бишкек, Кыргызстан",
      stadium: "Стадион Дордой",
      capacity: "10,000 зрителей",
      colors: "Синий и Белый",
      president: "Салимжон Шарипов",
      headCoach: "Андрей Подкорытов",
      trophies: "42",
      nickname: "Дордойцы",
      motto: "Сила в единстве",
      address: "г. Бишкек, ул. Льва Толстого, 1А",
      phone: "+996 (312) 54-04-04",
      email: "info@fc-dordoi.kg",
      website: "https://fc-dordoi.kg",
      foundingDetails: "Клуб основан в 1997 году при поддержке компании «Дордой». Название происходит от киргизского слова 'дордой', что означает 'четверо друзей', символизируя единство игроков."
    },
    
    history: [
      {
        id: 1,
        title: "2019-НАСТ.ВРЕМЯ",
        years: "Эра Доминации",
        description: "Современный этап развития клуба с профессиональным менеджментом",
        achievements: [
          "6 чемпионских титулов подряд (2018-2023)",
          "Участие в групповом этапе Лиги чемпионов АФК (2022)",
          "Развитие инфраструктуры академии",
          "Партнерство с турецким клубом «Галатасарай»",
          "Внедрение современных аналитических систем"
        ],
        players: ["Эрнист Батырканов", "Кайрат Жыргалбек уулу", "Алиа Силла", "Улугбек Жыргалбеков"],
        keyEvent: "В 2020 году клуб подписал партнёрское соглашение с турецким клубом Галатасарай, что позволило обмениваться опытом и проводить совместные тренировочные сборы."
      },
      {
        id: 2,
        title: "2010-2019",
        years: "Эра Роста",
        description: "Становление клуба как доминирующей силы в регионе",
        achievements: [
          "8 чемпионских титулов",
          "3 победы в Кубке Кыргызстана (2012, 2014, 2016)",
          "Построение современной инфраструктуры стоимостью $2.5 млн",
          "Развитие молодежной академии",
          "Создание сети скаутов по всей стране"
        ],
        players: ["Валерий Кичин", "Айдар Алиев", "Павел Сидоренко", "Давронжон Тухтасунов"],
        keyEvent: "В 2015 году открыта новая академия, которая стала лучшим футбольным учебным центром в Центральной Азии."
      },
      {
        id: 3,
        title: "2004-2010",
        years: "Эра Становления",
        description: "Период первых международных успехов",
        achievements: [
          "5 чемпионских титулов подряд",
          "3 победы в Кубке Президента АФК (2006, 2007, 2008)",
          "Первые выступления в азиатских турнирах",
          "Модернизация стадиона до международных стандартов",
          "Создание первой в стране профессиональной футбольной академии"
        ],
        players: ["Асанбек Таджибаев", "Даврон Асатов", "Алексей Ещенко", "Игорь Кудряшов"],
        keyEvent: "В 2006 году клуб впервые принял участие в международном турнире и сразу одержал победу в Кубке Президента АФК."
      },
      {
        id: 4,
        title: "1997-2004",
        years: "Эра Основания",
        description: "Скромные начинания местного клуба",
        achievements: [
          "Основание клуба (1997)",
          "Выход в высшую лигу Кыргызстана (1999)",
          "Первый чемпионский титул (2004)",
          "Формирование основной команды",
          "Создание философии клуба",
          "Построение первого тренировочного центра"
        ],
        players: ["Талант Самсынов", "Александр Мерзликин", "Владимир Чигирёв", "Азамат Исмаилов"],
        keyEvent: "В 1997 году группа энтузиастов во главе с Салимжоном Шариповым основала клуб на базе местной фабрики."
      }
    ],
    
    trophies: [
      {
        id: 1,
        title: "Чемпионат Кыргызстана",
        icon: "🏆",
        count: "16 титулов",
        years: "2004-2023",
        description: "Клуб является абсолютным рекордсменом по количеству чемпионских титулов в Кыргызстане",
        details: "2004, 2005, 2006, 2007, 2008, 2009, 2011, 2012, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2023",
        record: "6 титулов подряд (2018-2023) - рекорд страны"
      },
      {
        id: 2,
        title: "Кубок Кыргызстана",
        icon: "🥇",
        count: "13 трофеев",
        years: "2002-2022",
        description: "Рекордное количество побед в главном кубковом турнире страны",
        details: "2002, 2004, 2005, 2006, 2008, 2010, 2012, 2014, 2016, 2017, 2018, 2019, 2022",
        record: "3 дубля (чемпионат + кубок) в 2004, 2006 и 2018 годах"
      },
      {
        id: 3,
        title: "Суперкубок Кыргызстана",
        icon: "🛡️",
        count: "10 побед",
        years: "2013-2023",
        description: "Доминирование в матчах между чемпионом и обладателем кубка",
        details: "2013, 2014, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023",
        record: "5 побед подряд (2019-2023) - рекорд турнира"
      },
      {
        id: 4,
        title: "Кубок Президента АФК",
        icon: "🌏",
        count: "3 чемпиона",
        years: "2006, 2007, 2008",
        description: "Единственный клуб в истории, выигравший этот турнир три раза подряд",
        details: "2006: Дордой 2-1 Рахи Ахан (Иран), 2007: Дордой 1-0 Махидол (Таиланд), 2008: Дордой 3-0 Регар-ТадАЗ (Таджикистан)",
        record: "Единственный клуб из Центральной Азии с международными титулами"
      }
    ],
    
    legends: [
      { 
        id: 1, 
        name: "Асанбек Таджибаев", 
        position: "Нападающий", 
        years: "2005-2015",
        stats: "142 гола в 180 матчах",
        bio: "Лучший бомбардир в истории клуба. Участник трех победных кампаний Кубка Президента АФК. Обладатель 8 чемпионских титулов. Играл с номером 10. Рекордсмен по голам в одном сезоне - 28 мячей в 2007 году.",
        highlights: [
          "142 гола в 180 матчах",
          "Лучший бомбардир чемпионата 5 раз",
          "Капитан команды в 2008-2012",
          "MVP Кубка Президента АФК 2007"
        ],
        awards: "Лучший футболист Кыргызстана 2007, 2009"
      },
      { 
        id: 2, 
        name: "Рустам Джусубаев", 
        position: "Полузащитник", 
        years: "2008-2020",
        stats: "78 голов, 102 передачи",
        bio: "Сердце полузащиты Дордоя на протяжении 12 лет. Рекордсмен по количеству голевых передач. Техничный плеймейкер с великолепным видением поля. Провел рекордные 45 матчей за сборную Кыргызстана.",
        highlights: [
          "102 голевые передачи - рекорд клуба",
          "Участник 10 чемпионских сезонов",
          "Лучший игрок чемпионата 2015 и 2017",
          "Капитан команды 2013-2018"
        ],
        awards: "Символическая сборная АФК 2016"
      },
      { 
        id: 3, 
        name: "Таалайбек Джуматаев", 
        position: "Защитник", 
        years: "2010-2022",
        stats: "256 матчей",
        bio: "Столп обороны Дордоя. Провел рекордное количество матчей за клуб. Капитан команды в 2016-2021 годах. Известен своей надежностью и лидерскими качествами. Никогда не получал красную карточку за карьеру.",
        highlights: [
          "256 матчей - рекорд клуба",
          "11 сезонов без серьезных травм",
          "Капитан команды 5 лет",
          "Лидер по отборам мяча - 7.3 за матч"
        ],
        awards: "Лучший защитник Кыргызстана 2014-2019"
      },
      { 
        id: 4, 
        name: "Павел Матяш", 
        position: "Вратарь", 
        years: "2003-2015",
        stats: "112 сухих матчей",
        bio: "Лучший вратарь в истории кыргызского футбола. Участник всех трех побед в Кубке Президента АФК. Известен своими сейвами в решающих матчах. Провел 12 сезонов в клубе.",
        highlights: [
          "112 сухих матчей - рекорд Кыргызстана",
          "Лучший вратарь АФК 2007",
          "3 MVP финалов Кубка Президента АФК"
        ],
        awards: "Лучший вратарь Центральной Азии 2007, 2008"
      }
    ],
    
    stadium: {
      name: "Стадион Дордой",
      capacity: "10,000 зрителей",
      location: "Бишкек, Кыргызстан",
      built: "2007",
      renovated: "2015, 2020",
      cost: "$4.2 млн",
      architect: "Айбек Джалилов",
      features: [
        "FIFA Quality Pro искусственное покрытие",
        "Крытые VIP-ложи на 200 мест",
        "Пресс-центр на 50 мест",
        "Современные раздевалки с сауной",
        "Система подогрева поля",
        "Видеотабло 24м²",
        "Система видеонаблюдения с 32 камерами",
        "Медицинский центр с реабилитационным оборудованием"
      ],
      academy: {
        fields: "3 профессиональных поля с натуральным газоном",
        dorms: "Общежитие на 60 человек",
        coaches: "15 лицензированных тренеров UEFA",
        graduates: "Более 100 игроков в основном составе с 2005 года",
        capacity: "250 молодых футболистов",
        programs: "Программы U-8, U-10, U-12, U-14, U-16, U-18",
        achievements: "Победы в международных юношеских турнирах в Турции, России, Казахстане"
      },
      events: [
        "Финал Кубка Кыргызстана 2008-2023",
        "Матчи Кубка Президента АФК 2006-2008",
        "Товарищеские матчи против Зенита, Динамо Москва",
        "Юношеский турнир Дордой Кап с 2010 года"
      ]
    },
    
    management: {
      president: {
        name: "Салимжон Шарипов",
        tenure: "2010-настоящее время",
        bio: "Бизнесмен, основатель холдинга «Дордой». Инвестировал в клуб более $15 млн. Под его руководством клуб выиграл 8 чемпионских титулов и стал самым успешным клубом в истории кыргызского футбола.",
        philosophy: "Развитие местных талантов через сильную академию",
        achievements: [
          "Построение современного стадиона",
          "Создание академии международного уровня",
          "Установление партнерских отношений с европейскими клубами"
        ]
      },
      director: {
        name: "Александр Беляев",
        tenure: "2015-настоящее время",
        bio: "Профессиональный футбольный менеджер с 20-летним опытом. Ранее работал в клубах России (Локомотив Москва) и Казахстана (Кайрат).",
        achievements: [
          "Разработал стратегию развития клуба до 2030 года",
          "Реорганизовал скаутскую систему",
          "Внедрил современные аналитические методы"
        ]
      },
      headCoach: {
        name: "Андрей Подкорытов",
        tenure: "2018-настоящее время",
        bio: "Возглавляет команду с 2018 года. Под его руководством клуб шесть раз подряд выиграл чемпионат. Специалист по тактической подготовке, выпускник академии UEFA PRO.",
        trophies: "6 чемпионств, 4 Кубка Кыргызстана, 5 Суперкубков",
        coachingPhilosophy: "Атакующий футбол с акцентом на владение мячом"
      },
      coachingStaff: [
        "Борис Подкорытов - ассистент главного тренера",
        "Михаил Барышников - тренер вратарей",
        "Азамат Исмаилов - фитнес-тренер",
        "Эркин Абдураимов - аналитик",
        "Айбек Касымов - тренер по физподготовке"
      ],
      achievements: "Под их руководством клуб выиграл 8 чемпионских титулов и 3 международных турнира"
    },
    
    academy: {
      founded: "2005",
      director: "Тимур Джумабаев",
      philosophy: "Развитие техничных, тактически грамотных и психологически устойчивых игроков",
      program: [
        "Ежедневные тренировки по современным методикам UEFA",
        "Общеобразовательная школа с углубленным изучением языков",
        "Регулярные турниры международного уровня",
        "Стажировки в Европе (Германия, Португалия)",
        "Индивидуальные планы развития для каждого игрока",
        "Психологическая подготовка и менторство"
      ],
      success: [
        "15 выпускников академии стали игроками национальной сборной Кыргызстана",
        "8 игроков подписаны в европейские клубы",
        "Выпускники академии составляют 70% основного состава",
        "Победы в международных юношеских турнирах в Турции, России, Казахстане"
      ],
      famousGraduates: [
        "Эрнист Батырканов - нападающий сборной Кыргызстана",
        "Алиа Силла - полузащитник, игрок в Турции",
        "Кайрат Жыргалбек уулу - защитник, капитан команды",
        "Улугбек Жыргалбеков - защитник сборной Кыргызстана"
      ],
      admission: {
        ages: "Принимаются дети от 6 до 16 лет",
        requirements: "Открытый просмотр 2 раза в год",
        contact: "Тренерский отдел: +996 (312) 54-05-05"
      }
    },
    
    fans: {
      fanClubs: ["Жёлто-синие воины", "Северная трибуна", "Дордой Номады"],
      attendance: "Средняя посещаемость: 2,800 зрителей (рекорд: 10,000 в 2008)",
      traditions: [
        "Ежегодный фан-фестиваль перед началом сезона",
        "Корпоративный гимн перед каждым матчем",
        "Выпуск фанатского журнала 'Гол Дордоя'",
        "Автобусные поездки на выездные матчи"
      ],
      community: [
        "Программа 'Футбол для всех' - бесплатные тренировки для детей из малоимущих семей",
        "Благотворительные матчи для сбора средств на лечение",
        "Встречи с легендами клуба",
        "Поддержка детских домов и школ-интернатов"
      ],
      fanInitiatives: [
        "Организация фан-зоны на стадионе",
        "Совместные просмотры выездных матчей",
        "Фестиваль болельщиков в день рождения клуба"
      ]
    },
    
    socialProjects: [
      {
        title: "Футбол в школе",
        description: "Бесплатные тренировки и мастер-классы в общеобразовательных школах Бишкека",
        coverage: "Охвачено 50 школ, более 5,000 детей"
      },
      {
        title: "Дордой - детям",
        description: "Поддержка детских домов и интернатов, организация праздников",
        coverage: "Ежегодно охватывается 10 детских учреждений"
      },
      {
        title: "Здоровое поколение",
        description: "Программа популяризации здорового образа жизни среди молодежи",
        coverage: "Проведено 120 мастер-классов в регионах"
      }
    ],
    
    partners: {
      main: ["Дордой Групп", "Кыргызтелеком", "Шоро", "Бишкек Суу"],
      technical: ["Nike", "Adidas", "Puma"],
      media: ["КТРК", "Sputnik Кыргызстан", "K-News"],
      international: ["Галатасарай (Турция)", "Пахтакор (Узбекистан)", "Астана (Казахстан)"]
    },
    
    currentSquad: {
      goalkeepers: ["Азамат Байматов", "Эрлан Ниязалиев", "Акмал Ташпулатов"],
      defenders: ["Кайрат Жыргалбек уулу (капитан)", "Улугбек Жыргалбеков", "Талант Сабырбеков", "Азиз Сыдыков"],
      midfielders: ["Алиа Силла", "Эрнист Батырканов", "Акмал Бактыбеков", "Ислам Шамшиев"],
      forwards: ["Мирлан Мурзаев", "Айбек Бекболотов", "Дастанбек Жумабеков"]
    },
    
    clubStructure: [
      "Футбольный клуб (основная команда)",
      "Академия ФК «Дордой» (U-8 до U-18)",
      "Женская футбольная команда",
      "Детско-юношеская школа",
      "Медицинский центр",
      "Аналитический отдел"
    ]
  };

  // Эффект для отслеживания активной секции
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'history', 'trophies', 'stadium', 'legends', 'academy', 'management', 'fans', 'squad', 'social', 'partners', 'cta'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-900"
    >
      {/* Навигация */}
      <nav className="fixed top-10 right-10 z-50 hidden lg:block">
        <ul className="space-y-4">
          {['hero', 'history', 'trophies', 'stadium', 'legends', 'academy', 'management', 'fans', 'squad', 'social', 'partners', 'cta'].map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                className={`block w-3 h-3 rounded-full transition-all ${
                  activeSection === section 
                    ? 'bg-yellow-400 scale-150 ring-2 ring-yellow-400/30' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              >
                <span className="sr-only">{section}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="w-full h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 text-9xl">⚽</div>
          <div className="absolute bottom-1/3 right-1/4 text-9xl">🏆</div>
        </div>

        <div className="relative z-20 max-w-6xl w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tight">
              <span className="text-yellow-400">ФК</span> Дордой
            </h1>
            
            <div className="h-1 w-32 bg-yellow-400 mx-auto mb-6"></div>
            
            <p className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto mb-8">
              Основан в {clubInfo.basic.founded}. Самый титулованный футбольный клуб Кыргызстана с {clubInfo.basic.trophies} трофеями
            </p>
            
            <p className="text-lg text-blue-300 max-w-3xl mx-auto mb-10">
              {clubInfo.basic.foundingDetails}
            </p>
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Стадион", value: clubInfo.basic.stadium },
                { label: "Вместимость", value: clubInfo.stadium.capacity },
                { label: "Цвета", value: clubInfo.basic.colors },
                { label: "Прозвище", value: clubInfo.basic.nickname },
                { label: "Президент", value: clubInfo.management.president.name },
                { label: "Главный тренер", value: clubInfo.management.headCoach.name },
                { label: "Титулы", value: clubInfo.basic.trophies },
                { label: "Основан", value: clubInfo.basic.founded }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-900/50 p-4 rounded-xl"
                >
                  <div className="text-yellow-400 text-sm">{item.label}</div>
                  <div className="text-white font-bold">{item.value}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl text-lg uppercase tracking-wider">
                История клуба
              </button>
              
              <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
                Виртуальный тур
              </button>
              
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
                Академия
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center">
            <div className="w-8 h-12 border-4 border-yellow-400 rounded-full flex justify-center p-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <span className="text-yellow-400 text-sm mt-2 font-bold tracking-wider">ИССЛЕДУЙТЕ</span>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="w-full py-20 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ИСТОРИЯ КЛУБА</h2>
            <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Путь от любительской команды до лидера кыргызского футбола
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-blue-900 transform -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12">
              {clubInfo.history.map((era, index) => (
                <div 
                  key={era.id}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className="w-1/2 p-6">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-800/50 to-blue-900/70 border border-blue-700/30">
                      <div className="flex items-start mb-6">
                        <div className="w-1/3">
                          <h3 className="text-2xl font-bold text-white mb-1">{era.title}</h3>
                          <p className="text-yellow-400 font-medium">{era.years}</p>
                        </div>
                        <div className="w-2/3">
                          <p className="text-gray-300 mb-4">{era.description}</p>
                          <p className="text-blue-300 text-sm italic">{era.keyEvent}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-yellow-300 font-bold mb-2">Достижения:</h4>
                          <ul className="space-y-2">
                            {era.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-yellow-400 mr-2 mt-1">✓</span>
                                <span className="text-blue-200">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-yellow-300 font-bold mb-2">Легенды эпохи:</h4>
                          <ul className="space-y-2">
                            {era.players.map((player, i) => (
                              <li key={i} className="text-blue-200">
                                {player}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/2 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-blue-900 flex items-center justify-center">
                      <span className="text-blue-900 font-bold text-xl">{era.title.split('-')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Historical Facts */}
          <div className="mt-20 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-6">Исторические вехи</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  year: "1997",
                  title: "Основание клуба",
                  description: "Создание клуба на базе компании «Дордой»"
                },
                {
                  year: "2004",
                  title: "Первый чемпионский титул",
                  description: "Клуб впервые выиграл чемпионат Кыргызстана"
                },
                {
                  year: "2006",
                  title: "Первый международный триумф",
                  description: "Победа в Кубке Президента АФК в Катманду"
                },
                {
                  year: "2015",
                  title: "Открытие новой академии",
                  description: "Современный комплекс площадью 5 гектаров"
                },
                {
                  year: "2020",
                  title: "Партнерство с Галатасараем",
                  description: "Соглашение о сотрудничестве с турецким клубом"
                },
                {
                  year: "2022",
                  title: "Участие в Лиге чемпионов АФК",
                  description: "Первое участие в групповом этапе престижного турнира"
                }
              ].map((fact, index) => (
                <div
                  key={index}
                  className="bg-blue-900/50 p-6 rounded-xl border border-blue-700"
                >
                  <div className="text-yellow-400 text-4xl font-bold mb-2">{fact.year}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{fact.title}</h4>
                  <p className="text-blue-200">{fact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trophies Section */}
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

      {/* Stadium Section */}
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
                <div className="text-white text-2xl font-bold">СТАДИОН ДОРДОЙ</div>
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

      {/* Legends Section */}
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
            {clubInfo.legends.map((player, index) => (
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

      {/* Academy Section */}
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

      {/* Management Section */}
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

      {/* Fans Section */}
      <section id="fans" className="w-full py-20 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">12 ИГРОК - МЫ С ВАМИ!</h2>
            <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Преданные болельщики - душа нашего клуба
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center text-center"
                  >
                    <div className="text-5xl text-yellow-400 mb-4">👥</div>
                    <h4 className="text-xl font-bold text-white">Фан-движение</h4>
                    <p className="text-blue-300 mt-2">Единство и страсть</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">БОЛЕЛЬЩИКИ ДОРДОЙ</h3>
              <div className="h-1 w-20 bg-yellow-400 mb-8"></div>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Наши болельщики создают неповторимую атмосферу на стадионе. Более 5,000 членов официальных фан-клубов 
                по всему Кыргызстану поддерживают команду на домашних и выездных матчах. Фанаты ФК «Дордой» известны 
                своей преданностью и активной поддержкой команды.
              </p>
              
              <div className="mb-10">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Фан-клубы:</h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  {clubInfo.fans.fanClubs.map((club, i) => (
                    <span key={i} className="px-4 py-2 bg-blue-800 rounded-lg text-white">
                      {club}
                    </span>
                  ))}
                </div>
                
                <p className="text-blue-300">{clubInfo.fans.attendance}</p>
              </div>
              
              <div className="mb-10">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Традиции:</h4>
                <ul className="space-y-3 text-gray-300">
                  {clubInfo.fans.traditions.map((tradition, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <span>{tradition}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-10">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Сообщество и инициативы:</h4>
                <ul className="space-y-3 text-gray-300">
                  {clubInfo.fans.community.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-yellow-400 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Squad Section */}
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

      {/* Social Projects Section */}
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

      {/* Partners Section */}
      <section id="partners" className="w-full py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ПАРТНЁРЫ И СПОНСОРЫ</h2>
            <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Компании, которые поддерживают наш клуб
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Генеральные партнеры</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {clubInfo.partners.main.map((partner, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-xl font-bold text-white">{partner}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Технические партнеры</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {clubInfo.partners.technical.map((partner, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">👕</div>
                  <h4 className="text-xl font-bold text-white">{partner}</h4>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Международные партнеры</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {clubInfo.partners.international.map((partner, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">🌐</div>
                  <h4 className="text-xl font-bold text-white">{partner}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="w-full py-28 bg-gradient-to-br from-blue-900 to-indigo-900 relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            СТАНЬ ЧАСТЬЮ ИСТОРИИ
          </h2>
          
          <div className="h-1 w-32 bg-yellow-400 mx-auto mb-10"></div>
          
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Присоединяйтесь к легендарному клубу в качестве болельщика, партнера или участника нашей футбольной академии
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-xl text-lg uppercase tracking-wider">
              КУПИТЬ АБОНЕМЕНТ
            </button>
            
            <button className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
              ПАРТНЁРСТВО
            </button>
            
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl text-lg uppercase tracking-wider">
              АКАДЕМИЯ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;