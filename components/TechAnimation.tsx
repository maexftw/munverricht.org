
import React, { useRef, useEffect } from 'react';

const TechAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -2000, y: -2000 });
  const targetMousePos = useRef({ x: -2000, y: -2000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;
    
    const chars = "01<>{}[]/\\_+-*#&@$!%?".split("");
    const fontSize = 16;
    let columns: number;
    let drops: number[];

    const resize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * (height / fontSize));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      targetMousePos.current = { x: -2000, y: -2000 };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    const draw = () => {
      // 1. Precise Mouse Sync: Use a high-ratio lerp for "snappy but smooth" movement
      // To eliminate lag, we approach the target very quickly (0.5 per frame)
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.5;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.5;

      // 2. Background Trail Logic
      ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // 3. Matrix Drop Layer
      ctx.font = `${fontSize}px "JetBrains Mono"`;
      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Base Drop Character
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = 'rgba(255, 68, 0, 0.15)';
        ctx.fillText(text, x, y);

        // Update Position
        drops[i]++;
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      // 4. Zero-Lag Interaction Layer
      // We explicitly redraw a grid around the mouse to ensure the reaction is INSTANT
      const interactionRadius = 150;
      const startCol = Math.max(0, Math.floor((mousePos.current.x - interactionRadius) / fontSize));
      const endCol = Math.min(columns, Math.ceil((mousePos.current.x + interactionRadius) / fontSize));
      const startRow = Math.max(0, Math.floor((mousePos.current.y - interactionRadius) / fontSize));
      const endRow = Math.min(Math.floor(height / fontSize), Math.ceil((mousePos.current.y + interactionRadius) / fontSize));

      for (let i = startCol; i < endCol; i++) {
        for (let j = startRow; j < endRow; j++) {
          const x = i * fontSize;
          const y = j * fontSize;
          
          const dx = x - mousePos.current.x;
          const dy = y - mousePos.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const factor = Math.pow(1 - distance / interactionRadius, 2);
            const text = chars[Math.floor((Math.sin(i + j + Date.now() / 100) + 1) * 0.5 * chars.length)];
            
            // Interaction parameters
            const xOffset = (dx / distance) * factor * 10;
            const yOffset = (dy / distance) * factor * 5;
            
            ctx.save();
            ctx.font = `bold ${fontSize + (factor * 4)}px "JetBrains Mono"`;
            ctx.shadowColor = '#FF4400';
            ctx.shadowBlur = factor * 20;
            ctx.fillStyle = `rgba(255, 68, 0, ${0.3 + factor * 0.7})`;
            
            // Additional inner glow for high proximity
            if (factor > 0.7) {
                ctx.shadowBlur = factor * 35;
            }
            
            ctx.fillText(text, x + xOffset, y + yOffset);
            ctx.restore();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-40 overflow-hidden bg-vanta flex items-center justify-center border-y border-white/5">
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full cursor-none"
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-vanta via-transparent to-vanta opacity-40"></div>
    </div>
  );
};

export default TechAnimation;
