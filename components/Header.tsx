
import React from 'react';
import AsciiText from './AsciiText';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-vanta/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter flex items-center">
          <span className="text-alert">&lt;</span>
          <AsciiText text="munverricht.org" />
          <span className="text-alert"> /&gt;</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest">
          <a href="#why" className="hover:text-alert transition-colors">
            <AsciiText text="Warum" />
          </a>
          <a href="#about" className="hover:text-alert transition-colors">
            <AsciiText text="Über Mich" />
          </a>
          <a href="#services" className="hover:text-alert transition-colors">
            <AsciiText text="Services" />
          </a>
          <a href="mailto:hallo@munverricht.org" className="px-4 py-2 bg-alert text-vanta font-bold hover:bg-white transition-colors">
            <AsciiText text="Kontakt" enableHover={true} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
