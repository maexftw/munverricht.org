
import React from 'react';
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface HeroProps {
  userLevel: UserLevel;
}

const Hero: React.FC<HeroProps> = ({ userLevel }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 px-6 relative overflow-hidden">
      <div className="absolute top-40 right-10 opacity-5 hidden lg:block">
        <div className="text-[20vw] font-tourney leading-none select-none uppercase">
          {userLevel === 'tech' ? 'Engineering' : 'Business'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-alert"></div>
            <AsciiText 
              text={userLevel === 'tech' ? 'MODUS: ARCHITEKTUR' : 'MODUS: ERGEBNIS'}
              className="font-mono text-[10px] text-alert uppercase tracking-[0.4em]"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] mb-12 tracking-tighter uppercase text-paper">
            {userLevel === 'tech' 
              ? <><span className="block text-alert">High-End Code.</span> <span className="block italic font-light opacity-80">Voller</span> <span className="block">Besitz.</span></>
              : <><span className="block">Deine Website.</span> <span className="block text-alert">Fester Preis.</span> <span className="block font-light italic text-paper/60">Kein Abo.</span></>
            }
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <AsciiText 
                as="p"
                className="font-mono text-base md:text-lg text-paper/60 leading-relaxed border-l border-white/20 pl-6"
                text={userLevel === 'tech' 
                  ? "Wir deklassieren Baukastensysteme durch moderne Web-Infrastruktur und echte Code-Ownership. Next.js, Headless-APIs und modulare Architekturen für maximale Skalierbarkeit ohne Vendor-Lock-in."
                  : "Du suchst jemanden, der dir einfach eine starke Website baut? Wir machen alles – von der einfachen Visitenkarte bis zum Shop-System oder KI-Features. Ehrlich erklärt, zum fairen Festpreis und ohne monatliche Miete."
                }
                delay={800}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 py-5 bg-alert overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 text-vanta font-black uppercase tracking-tighter group-hover:text-alert transition-colors">
                    <AsciiText text={userLevel === 'tech' ? "Stack Review" : "Was kostet das?"} delay={1200} enableHover={true} />
                  </span>
                </button>
                <div className="flex items-center gap-3 px-6 py-4 font-mono text-[10px] uppercase tracking-widest border border-white/10 text-paper/40">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Ab 300€ Festpreis</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <div className="flex justify-between font-mono text-[9px] text-alert/60 mb-8 uppercase tracking-widest">
                  <span>{userLevel === 'tech' ? 'architecture_stats' : 'business_vorteile'}</span>
                  <span>status: stable</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: userLevel === 'tech' ? 'LCP Score' : 'Keine monatl. Miete', val: userLevel === 'tech' ? '0.4s' : '0,00€', color: 'bg-green-500' },
                    { label: userLevel === 'tech' ? 'TCO Reduction' : 'Besitzrecht', val: userLevel === 'tech' ? '-40%' : '100%', color: 'bg-green-500' },
                    { label: 'Technik-Level', val: userLevel === 'tech' ? 'High-End' : 'Einfach Gut', color: 'bg-green-500' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-1 h-1 ${stat.color}`}></div>
                      <div className="flex-grow font-mono text-[10px] text-paper/40">{stat.label}</div>
                      <div className="font-mono text-xs font-bold text-paper">{stat.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
