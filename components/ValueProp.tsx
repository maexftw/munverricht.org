
import React from 'react';
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface ValuePropProps {
  userLevel: UserLevel;
}

const ValueProp: React.FC<ValuePropProps> = ({ userLevel }) => {
  return (
    <section id="why" className="py-24 px-6 bg-paper text-vanta">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter mb-8">
              <AsciiText text={userLevel === 'tech' ? 'Die Architektur des Erfolgs.' : 'Ehrliche Arbeit. Echte Ergebnisse.'} />
            </h2>
            <div className="space-y-8">
              <AsciiText 
                as="p"
                className="font-mono text-lg opacity-80 leading-relaxed"
                text={userLevel === 'tech' 
                  ? "Baukästen sind für Hobbyisten. Wir bauen High-Performance Systeme, die technisch deklassieren und modular skalieren."
                  : "Du willst eine Website, die dich stolz macht und Kunden überzeugt. Wir kümmern uns um alles – damit du den Kopf frei hast."
                }
                delay={200}
              />
              <AsciiText 
                as="p"
                className="font-mono text-lg opacity-80 leading-relaxed"
                text={userLevel === 'tech'
                  ? "Wir garantieren 100% Asset Ownership und Core Web Vitals im grünen Bereich – als Standard, nicht als Feature."
                  : "Bei uns gibt es keine monatliche Miete. Du zahlst einmal für deine Website und danach gehört sie für immer dir."
                }
                delay={400}
              />
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-vanta/10 border border-vanta/10">
            <div className="bg-paper p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-vanta text-paper flex items-center justify-center font-mono text-2xl font-bold mb-6">01</div>
                <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">
                  <AsciiText text={userLevel === 'tech' ? 'Edge Infrastructure' : 'Einfach Sichtbar'} enableHover={true} />
                </h3>
              </div>
              <p className="font-mono text-sm opacity-70">
                {userLevel === 'tech'
                  ? "Hosting auf Edge-Servern für minimale Latzenz weltweit."
                  : "Wir sorgen dafür, dass Kunden dich bei Google finden."}
              </p>
            </div>
            
            <div className="bg-paper p-10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-alert text-vanta flex items-center justify-center font-mono text-2xl font-bold mb-6">02</div>
                <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">
                  <AsciiText text={userLevel === 'tech' ? 'Custom Logic' : 'Alles Inklusive'} enableHover={true} />
                </h3>
              </div>
              <p className="font-mono text-sm opacity-70">
                {userLevel === 'tech'
                  ? "Keine Plugins. Nur sauber geschriebener, effizienter Code."
                  : "Bilder, Texte, Technik – wir machen das komplette Paket."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
