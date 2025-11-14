'use client';
import {
  motion,
  useTransform,
  type MotionValue,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface OrbProps {
  className?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  index: number;
  total: number;
}

const SIZES = [400, 200, 150, 250, 180, 100];

export function Orb({ className, mouseX, mouseY, index }: OrbProps) {
  const [size, setSize] = useState(100);
  const [isMounted, setIsMounted] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  // Use dummy motion values if mouseX/mouseY are not provided
  const dummyMouseX = useMotionValue(0);
  const dummyMouseY = useMotionValue(0);

  useEffect(() => {
    setSize(SIZES[index % SIZES.length]);
    setIsMounted(true);
  }, [index]);

  const handleClick = () => {
    setIsExploded(true);
    setTimeout(() => {
      setIsExploded(false);
    }, 500); // Duração da animação de explosão
  };

  const springConfig = {
    damping: 60,
    stiffness: 20 + index * 10,
    mass: 1 + index * 0.2,
  };

  const transformX = useTransform(
    mouseX ?? dummyMouseX,
    (value) => value - (isMounted ? window.innerWidth / 2 : 0)
  );
  const transformY = useTransform(
    mouseY ?? dummyMouseY,
    (value) => value - (isMounted ? window.innerHeight / 2 : 0)
  );

  const springX = useSpring(transformX, springConfig);
  const springY = useSpring(transformY, springConfig);

  const animateProps = mouseX
    ? {}
    : {
        x: [
          '0%',
          '25%',
          '-25%',
          '50%',
          '-50%',
          '100%',
          '-100%',
          '0%',
        ],
        y: [
          '0%',
          '50%',
          '-50%',
          '25%',
          '-25%',
          '100%',
          '-100%',
          '0%',
        ],
        transition: {
          duration: 20 + Math.random() * 20,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'reverse' as const,
        },
      };

  const orbVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    exploded: {
      scale: [1.5, 2],
      opacity: [0.5, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  return (
    <AnimatePresence>
      {!isExploded && (
        <motion.div
          exit="exploded"
          initial="initial"
          variants={orbVariants}
          style={{
            width: size,
            height: size,
            translateX: isMounted && mouseX ? springX : '-50%',
            translateY: isMounted && mouseY ? springY : '-50%',
            left: '50%',
            top: '50%',
            willChange: 'transform',
          }}
          animate={animateProps}
          onClick={handleClick}
          className={cn(
            'absolute rounded-full bg-black cursor-pointer',
            'shadow-[inset_0_0_20px_rgba(255,255,255,0.1),_inset_10px_0_30px_rgba(255,255,255,0.2),_inset_-10px_0_30px_rgba(0,0,0,0.5),_0_0_50px_rgba(255,255,255,0.2)]',
            className
          )}
        />
      )}
    </AnimatePresence>
  );
}
