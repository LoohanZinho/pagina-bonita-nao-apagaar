'use client';
import { HeroSection } from '@/components/ui/hero-section';
import { SecondSection } from '@/components/ui/second-section';
import DynamicIsland from '@/components/ui/dynamic-island';
import { ThirdSection } from '@/components/ui/third-section';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FourthSection } from '@/components/ui/fourth-section';
import { SectionSeparator } from '@/components/ui/section-separator';
import { FifthSection } from '@/components/ui/fifth-section';
import dynamic from 'next/dynamic';

const MusicPlayer = dynamic(() => import('@/components/ui/music-player').then(mod => mod.MusicPlayer), {
  loading: () => <div className="w-full max-w-xs h-16" />, // Placeholder
  ssr: false,
});


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const vh = window.innerHeight;

      setIsScrolled(scrollPosition > 50);
      setShowAvatar(scrollPosition > vh * 0.9 && scrollPosition < vh * 2.9);
      setShowMusicPlayer(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const playerVariants = {
    hidden: { y: 100, opacity: 0, pointerEvents: 'none' as const },
    visible: { y: 0, opacity: 1, pointerEvents: 'auto' as const },
  };

  return (
    <>
      <main>
        <HeroSection />

        <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
          <div className="flex h-full w-full select-none flex-col items-center justify-center px-4 text-center">
            <div className="pointer-events-auto text-white mix-blend-difference">
              <p className="text-lg font-medium">Sua Marca na Web:</p>
              <h1 className="text-4xl font-bold md:text-5xl">
                Sites e Sistemas SaaS Que Geram Resultados.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm">
                Criamos experiências digitais memoráveis que capturam sua essência
                e impulsionam seus resultados. Design de ponta, performance
                impecável e a tecnologia mais moderna ao seu alcance.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto fixed left-1/2 top-4 z-50 -translate-x-1/2">
          <DynamicIsland
            isOverLightSectionsFromParent={isScrolled}
            showAvatar={showAvatar}
          />
        </div>

        <SecondSection />
        <SectionSeparator />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
      </main>

      <motion.div
        variants={playerVariants}
        animate={showMusicPlayer ? 'visible' : 'hidden'}
        initial="hidden"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-4 left-11 z-50 w-full max-w-xs -translate-x-1/2 px-4 md:left-auto md:right-8 md:w-auto md:translate-x-0 md:px-0"
      >
        <Suspense fallback={<div className="w-full max-w-xs h-16" />}>
          {showMusicPlayer && <MusicPlayer />}
        </Suspense>
      </motion.div>

    </>
  );
}
