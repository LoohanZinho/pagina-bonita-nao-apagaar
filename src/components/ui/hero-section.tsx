'use client';
import { Orb } from '@/components/ui/orb';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, {
    damping: 40,
    stiffness: 300,
  });
  const smoothMouseY = useSpring(mouseY, {
    damping: 40,
    stiffness: 300,
  });

  const orbs = Array.from({ length: 10 });

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-neutral-100">
      {/* Container do efeito metaball */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{ filter: 'blur(80px) contrast(100)', willChange: 'filter' }}
      >
        <div className="absolute inset-0 z-0 bg-neutral-100"></div>
        <motion.div
          className="absolute h-1 w-1 rounded-full bg-black"
          style={{ left: smoothMouseX, top: smoothMouseY, willChange: 'transform' }}
        />
        {orbs.map((_, i) => (
          <Orb
            key={i}
            mouseX={i === 0 ? smoothMouseX : undefined}
            mouseY={i === 0 ? smoothMouseY : undefined}
            index={i}
            total={orbs.length}
          />
        ))}
      </div>
    </section>
  );
}
