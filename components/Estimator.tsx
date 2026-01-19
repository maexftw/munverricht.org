
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { UserLevel } from '../App';
import AsciiText from './AsciiText';

interface EstimatorProps {
  userLevel: UserLevel;
}

const Estimator: React.FC<EstimatorProps> = ({ userLevel }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pages: '1-3',
    features: [] as string[],
    timeline: 'normal',
    target: 'small-business'
  });

  const features = [
    { id: 'blog', label: userLevel === 'layman' ? 'News / Aktuelles' : 'CMS Integration' },
    { id: 'contact', label: 'Anfrage-Formular' },
    { id: 'api', label: userLevel === 'layman' ? 'Termin-Buchung' : 'API / CRM Connect' },
    { id: 'ecommerce', label: 'Online Shop / Shopify' },
    { id: 'chatbot', label: 'KI Chatbot' },
    { id: 'multi-lang', label: 'Mehrsprachigkeit' }
  ];

  const handleFeatureToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(id) 
        ? prev.features.filter(f => f !== id) 
        : [...prev.features, id]
    }));
  };

  const generateQuote = async () => {
    setLoading(true);
    setStep(3);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let userTypePrompt = userLevel === 'tech' 
        ? "Sprich wie ein Senior Engineer zu einem CTO. Nutze Fachbegriffe wie Hydration, Edge Computing, Headless."
        : "Sprich wie ein ehrlicher Handwerker. Benutze absolut keine Fachbegriffe. Erkläre alles einfach und direkt.";

      const prompt = `
        Erstelle eine "No Bullshit" Kostenschätzung für ein Webprojekt.
        
        MODUS: ${userTypePrompt}

        PREIS-STRUKTUR:
        - Einfache Landingpages / Web-Visitenkarten: 300€.
        - Komplexe Systeme (Shop, KI, viele Unterseiten): max. 1.500€.
        
        PROJEKT-DATEN:
        - Seitenzahl: ${formData.pages}
        - Features: ${formData.features.join(', ') || 'Keine Extras'}
        - Zeitrahmen: ${formData.timeline}

        REGELN:
        1. Sei ehrlich und direkt.
        2. Gib eine klare Preis-Empfehlung zwischen 300€ und 1500€.
        3. Gib einen Zeitrahmen in Werktagen an.
        4. Formatiere es wie einen technischen Report oder einen Kostenvoranschlag.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "Du bist der Kalkulator von munverricht.org. Preise liegen strikt zwischen 300€ und 1500€. Keine versteckten Kosten.",
          temperature: 0.7,
        },
      });

      setResult(response.text || "Fehler bei der Berechnung.");
    } catch (error) {
      setResult("SYSTEM ERROR: Berechnung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="estimator" className="relative">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-1 px-1 bg-white/5 border border-white/10">
        <div className="lg:col-span-4 p-12 bg-vanta">
           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-paper">
              {userLevel === 'layman' ? 'Was kostet es?' : 'Kalkulation.'} 
              <span className="text-alert block italic font-light text-2xl mt-2">Fair & Fix.</span>
           </h2>
           <p className="font-mono text-xs text-paper/40 leading-relaxed mb-12">
              Eine einfache Landingpage kostet 300€. Für komplexe Systeme mit Shop oder KI-Funktionen nehmen wir maximal 1.500€.
           </p>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5 font-mono text-[10px]">
                 <span className="text-white/20 uppercase tracking-widest">Basis Website</span>
                 <span className="text-alert">300.00 EUR</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5 font-mono text-[10px]">
                 <span className="text-white/20 uppercase tracking-widest">High-End / Shop</span>
                 <span className="text-alert">MAX 1500.00 EUR</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 p-12 bg-white/2 relative">
           <div className="mb-12 flex gap-4">
              {[0, 1, 2].map(i => (
                <div key={i} className={`h-1 flex-grow transition-all duration-500 ${step >= i ? 'bg-alert' : 'bg-white/5'}`}></div>
              ))}
           </div>

           {step === 0 && (
            <div className="space-y-10">
                <div>
                  <label className="font-mono text-alert text-[10px] uppercase tracking-widest block mb-6">/ UMFANG</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {['1', '1-3', '5-10', '10+'].map(val => (
                      <button 
                        key={val}
                        onClick={() => setFormData({...formData, pages: val})}
                        className={`py-8 font-mono text-sm transition-all ${formData.pages === val ? 'bg-alert text-vanta' : 'bg-vanta text-white/40 hover:text-white'}`}
                      >
                        {val} {val === '1' ? 'Seite' : 'Seiten'}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="w-full py-6 bg-alert text-vanta font-black uppercase">Weiter &rarr;</button>
            </div>
           )}

           {step === 1 && (
            <div className="space-y-10">
                <div>
                  <label className="font-mono text-alert text-[10px] uppercase tracking-widest block mb-6">/ FUNKTIONEN</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map(f => (
                      <button 
                        key={f.id}
                        onClick={() => handleFeatureToggle(f.id)}
                        className={`p-6 text-left font-mono text-xs border transition-all ${formData.features.includes(f.id) ? 'bg-alert/10 border-alert text-alert' : 'bg-vanta border-white/10 text-white/40 hover:border-white/20'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(0)} className="px-8 py-6 border border-white/10 text-white/40">Zurück</button>
                  <button onClick={() => setStep(2)} className="flex-grow py-6 bg-paper text-vanta font-black uppercase">Nächster Schritt</button>
                </div>
            </div>
           )}

           {step === 2 && (
            <div className="space-y-10">
                <div>
                  <label className="font-mono text-alert text-[10px] uppercase tracking-widest block mb-6">/ ZEITPLAN</label>
                  <select 
                    className="w-full bg-vanta border border-white/10 p-6 font-mono text-sm text-paper outline-none"
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  >
                    <option value="normal">Normal (ca. 14 Tage)</option>
                    <option value="fast">Schnell (ca. 7 Tage)</option>
                  </select>
                </div>
                <button onClick={generateQuote} className="w-full py-8 bg-alert text-vanta font-black uppercase text-xl">Schätzung anzeigen</button>
            </div>
           )}

           {step === 3 && (
            <div className="font-mono text-sm min-h-[400px] flex flex-col bg-vanta p-8 border border-white/5">
              {loading ? (
                <div className="flex-grow flex items-center justify-center">Rechne...</div>
              ) : (
                <div className="flex-grow whitespace-pre-wrap text-paper/80 leading-relaxed overflow-y-auto max-h-[400px]">
                  {result}
                </div>
              )}
              {!loading && (
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setStep(0)} className="px-6 py-4 border border-white/10 text-white/40">Neu berechnen</button>
                  <a href="mailto:hallo@munverricht.org" className="flex-grow py-4 bg-alert text-vanta text-center font-black uppercase">Jetzt anfragen</a>
                </div>
              )}
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Estimator;
