
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface AsciiTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  delay?: number;
  once?: boolean;
  enableHover?: boolean;
}

const GLITCH_CHARS = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*';
const WAVE_THRESH = 3;
const CHAR_MULT = 3;
const ANIM_STEP = 40;
const WAVE_BUF = 5;
const DURATION = 800;
const SPREAD = 1.0;

const AsciiText: React.FC<AsciiTextProps> = ({ 
  text, 
  className = "", 
  as: Component = 'span',
  delay = 0,
  once = true,
  enableHover = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const wavesRef = useRef<{ pos: number; time: number; id: number }[]>([]);
  const requestRef = useRef<number>(null);
  const lastMousePos = useRef<number | null>(null);

  // Phase 1: Terminal Reveal
  useEffect(() => {
    let timeoutId: number;
    let frameId: number;
    
    const startReveal = () => {
      let iteration = 0;
      const animate = () => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < iteration - 2) {
            result += text[i];
          } else if (i < iteration) {
            result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          } else {
            result += ''; 
          }
        }
        
        setDisplayText(result);
        
        // Speed up animation: incrementing by 2.0 instead of 0.8
        if (iteration < text.length + 3) {
          iteration += 2.0;
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsRevealed(true);
        }
      };
      animate();
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timeoutId = window.setTimeout(startReveal, delay);
        if (once) observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, once]);

  // Phase 2: Precise Ripple Animation Logic
  const animateRipple = useCallback(() => {
    if (!isRevealed || !enableHover) return;

    const now = Date.now();
    wavesRef.current = wavesRef.current.filter(w => now - w.time < DURATION);

    if (wavesRef.current.length === 0) {
      setDisplayText(text);
      requestRef.current = null;
      return;
    }

    const chars = text.split('');
    const result = chars.map((origChar, charIdx) => {
      if (origChar === ' ') return ' ';
      let finalChar = origChar;

      for (const w of wavesRef.current) {
        const age = now - w.time;
        const prog = Math.min(age / DURATION, 1);
        const dist = Math.abs(charIdx - w.pos);
        const maxDist = Math.max(w.pos, text.length - w.pos - 1);
        const radius = (prog * (maxDist + WAVE_BUF)) / SPREAD;

        if (dist <= radius) {
          const intensity = radius - dist;
          if (intensity <= WAVE_THRESH && intensity > 0) {
            const glitchIdx = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % GLITCH_CHARS.length;
            finalChar = GLITCH_CHARS[glitchIdx];
          }
        }
      }
      return finalChar;
    });

    setDisplayText(result.join(''));
    requestRef.current = requestAnimationFrame(animateRipple);
  }, [isRevealed, text, enableHover]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRevealed || !containerRef.current || !enableHover) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.round((x / rect.width) * text.length);
    const clampedPos = Math.max(0, Math.min(pos, text.length - 1));

    if (lastMousePos.current !== clampedPos) {
      lastMousePos.current = clampedPos;
      wavesRef.current.push({ pos: clampedPos, time: Date.now(), id: Math.random() });
      if (!requestRef.current) {
        requestRef.current = requestAnimationFrame(animateRipple);
      }
    }
  };

  const handleMouseLeave = () => {
    lastMousePos.current = null;
  };

  return (
    <Component 
      ref={containerRef as any}
      className={`${className} font-mono select-none cursor-default whitespace-pre-wrap grid`}
      onMouseMove={enableHover ? handleMouseMove : undefined}
      onMouseLeave={enableHover ? handleMouseLeave : undefined}
      style={{ gridTemplateAreas: '"stack"' }}
    >
      {/* Ghost text to preserve layout size */}
      <span style={{ gridArea: 'stack', visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
        {text}
        <span className="inline-block w-[0.6em] h-[1em] ml-1 align-middle"></span>
      </span>
      
      {/* Visible animated text */}
      <span style={{ gridArea: 'stack' }} className={`transition-opacity duration-300 ${!isRevealed && displayText === '' ? 'opacity-0' : 'opacity-100'}`}>
        {displayText}
        {!isRevealed && displayText !== '' && (
          <span className="inline-block w-[0.6em] h-[1em] bg-alert ml-1 align-middle opacity-70"></span>
        )}
      </span>
    </Component>
  );
};

export default AsciiText;
