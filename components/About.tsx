
import React from 'react';
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface AboutProps {
  userLevel: UserLevel;
}

const About: React.FC<AboutProps> = ({ userLevel }) => {
  return (
    <section id="about" className="py-32 px-6 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-alert/60 pointer-events-none z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-alert/60 pointer-events-none z-10"></div>
              
              <div className="overflow-hidden bg-vanta aspect-[4/5] relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop&grayscale=true" 
                  alt="Maximilian Unverricht" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-alert/5 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-4">
            <div className="font-mono text-alert text-[10px] uppercase tracking-[0.4em]">Maximilian Unverricht // {userLevel === 'tech' ? 'Core Engineering' : 'Projektleitung'}</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              {userLevel === 'tech' 
                ? <><span className="block text-alert">Code Excellence.</span> <span className="block">Kein Ballast.</span> <span className="block italic font-light opacity-60">Nur Logik.</span></>
                : <><span className="block">Echte Arbeit.</span> <span className="block">Einfache Worte.</span> <span className="block text-alert italic font-light opacity-60">Fester Preis.</span></>
              }
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm leading-relaxed text-paper/60">
            <div className="space-y-6">
              <p>
                {userLevel === 'tech' 
                  ? "Ich entwickle Systeme, die auf Langlebigkeit und Skalierbarkeit ausgelegt sind. Wo andere Agenturen auf proprietäre Baukästen setzen, nutze ich die Freiheit von modernem, handgeschriebenem Code."
                  : "Ich baue Websites seit über 12 Jahren. Mein Ziel ist es, dir eine Seite zu liefern, die wirklich dein Eigentum ist und die genau das tut, was sie soll – ohne dass wir uns in technischem Gerede verlieren."}
              </p>
            </div>
            <div className="space-y-6">
              <p>
                {userLevel === 'tech'
                  ? "Mein Ansatz eliminiert technischen Schulden und Vendor-Lock-in. Jede Zeile Code dient der Performance und der vollen Kontrolle über dein digitales Asset."
                  : "Vom ersten Design bis zum fertigen Shop mit KI-Anbindung: Ich bin dein direkter Ansprechpartner. Keine Hotline, kein Marketing-Speak, sondern ehrliches Handwerk."}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { label: userLevel === 'tech' ? 'Code Ownership' : 'Keine Abos', val: '100%' },
              { label: 'Erfahrung', val: '12 Jahre' },
              { label: 'Fix-Kosten', val: '0.0€' }
            ].map((item, i) => (
              <div key={i} className="bg-vanta p-8 group hover:bg-white/5 transition-colors">
                <div className="text-alert font-tourney text-4xl mb-2">{item.val}</div>
                <div className="text-[9px] uppercase tracking-widest font-mono text-white/30">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
