
import React, { useEffect, useRef } from 'react';
import * as THREE from "three/webgpu";
import * as tsl from "three/tsl";

const BackgroundNoise: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const uMouse = tsl.uniform(mouseRef.current);

    scene.backgroundNode = tsl.Fn(([t = tsl.time]) => {
      const uv = tsl.screenUV.toVar();
      const mouse = uMouse.toVar();
      const aspect = tsl.screenSize.x.div(tsl.screenSize.y);
      
      const delta = uv.sub(mouse).toVar();
      delta.x.assign(delta.x.mul(aspect));
      const dist = delta.length().toVar();
      
      const proximity = tsl.exp(dist.mul(-5.0)).toVar();
      
      const noiseScale = tsl.float(2.5);
      const distortion = tsl.float(0.012).mul(proximity);
      const sampleCoords = uv.add(uv.sub(mouse).mul(distortion)).mul(tsl.vec2(aspect, 1.0)).mul(noiseScale).toVar();
      
      const nVal = tsl.mx_noise_float(tsl.vec3(sampleCoords, t.mul(0.04))).toVar();
      const fw = tsl.fwidth(nVal).toVar();
      
      nVal.assign(nVal.mul(12).fract().sub(0.5).abs());
      
      const threshold = tsl.mix(fw.mul(10), fw.mul(3), proximity);
      const lineMask = tsl.smoothstep(threshold, threshold.mul(1.5), nVal).oneMinus().toVar();
      
      const brandOrange = tsl.vec3(1, 0.26, 0); // #FF4400
      const highlightOrange = tsl.vec3(1, 0.6, 0.2); 
      
      const lineColor = tsl.mix(brandOrange, highlightOrange, proximity);
      
      const orangeGlow = brandOrange.mul(proximity).mul(0.12);
      const bg = tsl.vec3(0, 0, 0).add(orangeGlow).toVar();
      
      return tsl.mix(bg, lineColor, lineMask);
    })();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - (e.clientY / window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.35]"
      style={{ filter: 'brightness(1.2) contrast(1.1)' }}
    />
  );
};

export default BackgroundNoise;
