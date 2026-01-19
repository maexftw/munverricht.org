
import React from 'react';
import { UserLevel } from '../App';

interface BuilderComparisonProps {
  userLevel: UserLevel;
}

const BuilderComparison: React.FC<BuilderComparisonProps> = ({ userLevel }) => {
  return (
    <section className="py-24 px-6 bg-vanta border-y border-alert/20 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black opacity-[0.02] pointer-events-none uppercase whitespace-nowrap">
        Die Wahrheit
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
            Gefahr: <span className="text-alert">{userLevel === 'layman' ? 'Die Baukasten-Falle' : 'Vendor Lock-in'}</span>
          </h2>
          <p className="font-mono text-xl text-paper/60 max-w-3xl leading-relaxed">
            {userLevel === 'layman' 
              ? "Andere Agenturen mieten dir nur eine Seite auf einem Baukasten. Du zahlst monatlich für etwas, das dir nie gehört."
              : "Baukästen sind verlockend, aber gefährlich. Sie mieten Ihre digitale Existenz. Wir bauen Infrastruktur, die Ihnen gehört."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 border border-white/10 bg-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <div className="font-bold text-2xl uppercase mb-1">Baukästen</div>
              <div className="font-mono text-xs text-alert">{userLevel === 'layman' ? 'Monatliche Miete' : 'Proprietäre SaaS'}</div>
            </div>
            <div className="p-6 border border-white/10 bg-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <div className="font-bold text-2xl uppercase mb-1">Standard-CMS</div>
              <div className="font-mono text-xs text-alert">{userLevel === 'layman' ? 'Langsam & Unsicher' : 'Monolithischer Bloat'}</div>
            </div>
            <div className="mt-8 p-4 bg-alert/5 border border-alert/20 font-mono text-[10px] uppercase leading-relaxed text-paper/40">
              <span className="text-alert block mb-2">Analyse-Ergebnis:</span>
              <span className="block mb-1">1. Ladezeit ist Marketing-Währung.</span>
              <span className="block mb-1">2. 100% Besitz = 0€ Fixkosten.</span>
              <span className="block">3. Maßarbeit schlägt Massenware.</span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-paper text-vanta p-8 md:p-12 shadow-[20px_20px_0_rgba(255,68,0,1)]">
            <h3 className="text-3xl font-black uppercase mb-8 tracking-tight">Deine Unabhängigkeit.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-mono">
              <div className="space-y-4">
                <div className="text-alert font-bold uppercase text-sm border-b border-vanta/10 pb-2">Echter Besitz</div>
                <p className="text-sm leading-relaxed">
                  Keine monatliche Miete für deine eigene Existenz. Der Code gehört dir. Einmal zahlen, für immer besitzen.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-alert font-bold uppercase text-sm border-b border-vanta/10 pb-2">Preissicherheit</div>
                <p className="text-sm leading-relaxed">
                  Festpreise statt 'Preis auf Anfrage'. Wir kalkulieren fair, damit du genau weißt, was dein Investment wert ist.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-alert font-bold uppercase text-sm border-b border-vanta/10 pb-2">Kein Stress</div>
                <p className="text-sm leading-relaxed">
                  Wir kümmern uns um die Technik, damit du dich um dein Geschäft kümmern kannst. Alles aus einer Hand.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-alert font-bold uppercase text-sm border-b border-vanta/10 pb-2">Maximale Speed</div>
                <p className="text-sm leading-relaxed">
                  Schnelle Seiten bringen mehr Kunden. Wir bauen so effizient, dass Google deine Seite lieben wird.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-vanta/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="font-mono text-xs uppercase font-black italic">
                &gt; Handwerker-Ehre: Wir bauen Dinge, die halten.
              </div>
              <div className="text-alert font-black text-4xl">FESTPREIS.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderComparison;
