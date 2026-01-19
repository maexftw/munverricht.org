
import React from 'react';
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface IntroProps {
  onSelect: (level: UserLevel) => void;
}

const Intro: React.FC<IntroProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-vanta z-[100] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#F4F4F4 1px, transparent 1px), linear-gradient(90deg, #F4F4F4 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="max-w-6xl w-full relative z-[101]">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-alert/30 bg-alert/5 text-alert font-mono text-[10px] uppercase tracking-[0.4em] mb-4">
             Wähle deine Perspektive
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-paper leading-[0.85] mb-6">
            Ehrliches Webdesign. <br/> 
            <span className="text-alert italic font-light">Echter Besitz.</span>
          </h1>
          <p className="font-mono text-xs md:text-sm text-paper/40 uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
            Keine Baukästen. Keine Abos. <br className="hidden md:block" /> 
            Nur eine Website, die wirklich dir gehört. Punkt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* OPTION 1: RESULT ORIENTED */}
          <button 
            onClick={() => onSelect('layman')}
            className="group relative bg-white/[0.02] border border-white/10 p-10 text-left hover:border-alert transition-all duration-500 flex flex-col justify-between min-h-[400px] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-alert/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-alert/10 transition-colors"></div>
            <div>
              <div className="text-alert font-mono text-[10px] mb-4 opacity-60 uppercase tracking-widest">Fokus: Klarsicht & Erfolg</div>
              <h2 className="text-3xl font-black uppercase text-paper mb-6 tracking-tight group-hover:text-alert transition-colors leading-tight">Ich will eine Seite, <br/>die einfach funktioniert.</h2>
              <p className="font-mono text-xs text-paper/50 leading-relaxed uppercase tracking-wider mb-8">
                Du suchst eine Lösung für dein Business? Wir bauen alles – von der ersten digitalen Visitenkarte bis zum Shop-System oder KI-Chatbot. Ehrlich erklärt, zum fairen Festpreis (300€ - 1500€) und ohne monatliche Miete.
              </p>
            </div>
            <div className="flex items-center gap-4 text-alert font-mono text-[10px] uppercase tracking-widest border-t border-white/5 pt-6">
              <span className="group-hover:translate-x-2 transition-transform duration-300">Lösung finden</span>
              <span className="text-xl">→</span>
            </div>
          </button>
          
          {/* OPTION 2: TECH ORIENTED */}
          <button 
            onClick={() => onSelect('tech')}
            className="group relative bg-white/[0.02] border border-white/10 p-10 text-left hover:border-alert transition-all duration-500 flex flex-col justify-between min-h-[400px] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-white/10 transition-colors"></div>
            <div>
              <div className="text-alert font-mono text-[10px] mb-4 opacity-60 uppercase tracking-widest">Fokus: Architektur & Stack</div>
              <h2 className="text-3xl font-black uppercase text-paper mb-6 tracking-tight group-hover:text-alert transition-colors leading-tight">Ich will wissen, was <br/>unter der Haube steckt.</h2>
              <p className="font-mono text-xs text-paper/50 leading-relaxed uppercase tracking-wider mb-8">
                Lass uns über den Tech-Stack reden. Wir deklassieren Baukästen durch Next.js, Headless-Strukturen und maximale Performance. Volle Code-Ownership, keine technischen Schulden und absolute Freiheit für IT-Entscheider.
              </p>
            </div>
            <div className="flex items-center gap-4 text-alert font-mono text-[10px] uppercase tracking-widest border-t border-white/5 pt-6">
              <span className="group-hover:translate-x-2 transition-transform duration-300">Deep-Dive öffnen</span>
              <span className="text-xl">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
