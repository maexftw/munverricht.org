
import React from 'react';
import AsciiText from './AsciiText';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vanta border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="font-mono text-xl font-bold mb-4">
            <span className="text-alert">&lt;</span>
            <AsciiText text="munverricht.org" />
            <span className="text-alert"> /&gt;</span>
          </div>
          <div className="font-mono text-xs text-paper/40 max-w-xs uppercase tracking-widest leading-loose">
            <AsciiText text="Ehrliches Webdesign." /><br/> 
            <AsciiText text="Handgeschriebener Code." delay={200} /><br/>
            <AsciiText text="Kein Marketing-Gelaber." delay={400} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-mono text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-alert transition-colors"><AsciiText text="Impressum" /></a>
            <a href="#" className="hover:text-alert transition-colors"><AsciiText text="Datenschutz" /></a>
            <a href="mailto:hallo@munverricht.org" className="text-alert font-bold hover:text-white transition-colors"><AsciiText text="E-Mail" /></a>
            <a href="https://github.com" target="_blank" className="hover:text-alert transition-colors"><AsciiText text="GitHub" /></a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center font-mono text-[10px] text-paper/20 uppercase tracking-[0.3em]">
        <span><AsciiText text={`© ${new Date().getFullYear()} No Bullshit Webdesign`} /></span>
        <span className="hidden sm:block text-alert"><AsciiText text="Crafted with pure logic" /></span>
      </div>
    </footer>
  );
};

export default Footer;
