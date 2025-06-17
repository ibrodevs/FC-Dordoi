import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {  clubInfo } from './clubInfo';
import HeroSection from './HeroSection';
import HistorySection from './HistorySection';
import TrophiesSection from './TrophiesSection';
import StadiumSection from './StadiumSection';
import LegendsSection from './LegendsSection';
import AcademySection from './AcademySection';
import ManagementSection from './ManagementSection';
import FansSection from './FansSection';
import SquadSection from './SquadSection';
import SocialProjectsSection from './SocialProjectsSection';
import PartnersSection from './PartnersSection';
import CtaSection from './CtaSection';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);

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
      <nav className="fixed top-40 right-10 z-50 hidden lg:block">
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
      <HeroSection clubInfo={clubInfo} />

      {/* History Section */}
      <HistorySection clubInfo={clubInfo} />
      
      {/* Trophies Section */}
      <TrophiesSection clubInfo={clubInfo} />
      
      {/* Stadium Section */}
      <StadiumSection clubInfo={clubInfo} />
      
      {/* Legends Section */}
      <LegendsSection clubInfo={clubInfo} />
      
      {/* Academy Section */}
      <AcademySection clubInfo={clubInfo} />
      
      {/* Management Section */}
      <ManagementSection clubInfo={clubInfo} />
      
      {/* Fans Section */}
      <FansSection clubInfo={clubInfo} />
      
      {/* Current Squad Section */}
      <SquadSection clubInfo={clubInfo} />
      
      {/* Social Projects Section */}
      <SocialProjectsSection clubInfo={clubInfo} />
      
      {/* Partners Section */}
      <PartnersSection clubInfo={clubInfo} />
      
      {/* Final CTA */}
      <CtaSection />
    </div>
  );
};

export default AboutPage;