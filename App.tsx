
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechAnimation from './components/TechAnimation';
import ValueProp from './components/ValueProp';
import BuilderComparison from './components/BuilderComparison';
import About from './components/About';
import Services from './components/Services';
import Estimator from './components/Estimator';
import Footer from './components/Footer';
import Intro from './components/Intro';
import BackgroundNoise from './components/BackgroundNoise';

export type UserLevel = 'layman' | 'tech';

const App: React.FC = () => {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!userLevel) {
    return <Intro onSelect={setUserLevel} />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-alert selection:text-vanta animate-in fade-in duration-700 bg-vanta font-sans">
      <BackgroundNoise />

      {/* GLOBAL HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[60] p-4 hidden md:block">
        <div className="w-full h-full border border-white/5 relative">
          {/* Corner Marks */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-alert/40"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-alert/40"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-alert/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-alert/40"></div>
          
          {/* Metrics */}
          <div className="absolute top-1/2 -left-6 -rotate-90 origin-center flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
            <span>munverricht.engineering</span>
            <div className="w-12 h-px bg-white/10"></div>
            <span>MODE: {userLevel === 'tech' ? 'SYSTEM_ARCHITECTURE' : 'RESULT_DRIVEN'}</span>
          </div>
        </div>
      </div>
      
      <Header />
      
      <main className="flex-grow z-10 relative">
        <Hero userLevel={userLevel} />
        
        <div className="relative z-20">
          <TechAnimation />
        </div>

        <div className="relative bg-paper">
          <ValueProp userLevel={userLevel} />
        </div>
        
        <div className="relative bg-vanta">
          <BuilderComparison userLevel={userLevel} />
        </div>
        
        <div className="relative bg-vanta">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <Estimator userLevel={userLevel} />
          </div>
        </div>

        <div className="relative bg-vanta">
          <About userLevel={userLevel} />
        </div>

        <div className="relative bg-vanta">
          <Services userLevel={userLevel} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
