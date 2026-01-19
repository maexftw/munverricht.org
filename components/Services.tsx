
import React from 'react';
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface ServicesProps {
  userLevel: UserLevel;
}

const Services: React.FC<ServicesProps> = ({ userLevel }) => {
  return (
    <section id="services" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Blueprint Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#F4F4F4 1px, transparent 1px), linear-gradient(90deg, #F4F4F4 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                <span className="text-alert font-light italic text-4xl md:text-6xl block mb-2">Service</span>
                <AsciiText text={userLevel === 'tech' ? 'Architectures.' : 'Protocols.'} delay={300} />
            </h2>
            <div className="max-w-md font-mono text-sm text-paper/40 italic pt-6">
                <AsciiText text='"In einer Welt voller Templates ist Individualität der ultimative Wettbewerbsvorteil."' delay={600} />
            </div>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <div className="md:col-span-8 bg-white/2 border border-white/10 p-12 group hover:border-alert/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
               <div className="px-3 py-1 border border-alert/30 text-alert font-mono text-[9px] uppercase tracking-[0.2em]">Deployment_01</div>
               <div className="text-white/10 font-tourney text-4xl uppercase">Core</div>
            </div>
            <h3 className="text-4xl font-bold uppercase mb-8 tracking-tighter">
                <AsciiText text={userLevel === 'tech' ? 'Edge-Computing / Next.js' : 'Next-Level Performance'} />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm text-paper/60">
              <p>Wir eliminieren den Overhead. Ihre Seite wird global auf Edge-Servern verteilt – für Ladezeiten, die sich wie Lichtgeschwindigkeit anfühlen.</p>
              <ul className="space-y-3">
                <li className="flex gap-2"><span>[+]</span> Serverless Architecture</li>
                <li className="flex gap-2"><span>[+]</span> Dynamic SEO Injection</li>
                <li className="flex gap-2"><span>[+]</span> Global CDN Delivery</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 bg-alert/5 border border-alert/30 p-12 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-alert"></div>
            <div className="font-mono text-alert text-[9px] uppercase tracking-widest mb-12">Security Tier</div>
            <h3 className="text-3xl font-black uppercase mb-6 text-paper leading-none">Keine <br/> Kompromisse.</h3>
            <p className="font-mono text-xs text-paper/40 leading-relaxed mb-8">Festpreis-Garantie. Absolute Transparenz. Ein Engineering-Partner auf Augenhöhe.</p>
            <div className="text-alert font-black text-4xl font-tourney">TRANSPARENT</div>
          </div>

          <div className="md:col-span-4 border border-white/10 p-10 font-mono flex flex-col justify-between hover:bg-white/2 transition-colors">
            <div className="text-[10px] text-white/20 mb-8 tracking-widest uppercase">Asset Control</div>
            <div>
              <h4 className="text-xl font-bold uppercase text-paper mb-4">Volles Eigentum</h4>
              <p className="text-xs text-paper/40 leading-relaxed">Sie mieten nicht. Sie besitzen. Der gesamte Quellcode geht nach Projektabschluss in Ihren Besitz über.</p>
            </div>
          </div>

          <div className="md:col-span-8 bg-white/5 border border-white/10 p-10 flex flex-col md:flex-row gap-12 items-center hover:border-white/20 transition-colors">
            <div className="flex-grow">
               <div className="text-[10px] text-alert mb-4 tracking-widest uppercase font-mono">Agile Workflow</div>
               <h4 className="text-2xl font-bold uppercase text-paper mb-4">Iterative Entwicklung</h4>
               <p className="font-mono text-xs text-paper/40 leading-relaxed max-w-md">Wir arbeiten in Sprints. Sie sehen den Fortschritt täglich auf einer privaten Vorschau-URL. Keine Überraschungen beim Launch.</p>
            </div>
            <div className="flex gap-2 font-mono text-[9px]">
               {[1,2,3,4].map(n => (
                 <div key={n} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-alert hover:text-alert cursor-default">P{n}</div>
               ))}
            </div>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="border border-white/5 bg-white/2 overflow-hidden">
          <div className="bg-white/5 p-4 border-b border-white/10 font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 text-center">
            Performance Benchmark // Lab Data
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 text-center">
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-paper/30 font-mono mb-4">Request Latency</div>
              <div className="text-4xl font-bold text-alert mb-2">~12ms</div>
              <div className="text-[9px] uppercase font-mono text-white/10">Edge Optimized</div>
            </div>
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-paper/30 font-mono mb-4">Dev Effort</div>
              <div className="text-4xl font-bold text-alert mb-2">1:1</div>
              <div className="text-[9px] uppercase font-mono text-white/10">Efficiency Protocol</div>
            </div>
            <div className="p-12">
              <div className="text-[10px] uppercase tracking-widest text-paper/30 font-mono mb-4">Lighthouse Score</div>
              <div className="text-4xl font-bold text-alert mb-2">100/100</div>
              <div className="text-[9px] uppercase font-mono text-white/10">Standard Compliance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
