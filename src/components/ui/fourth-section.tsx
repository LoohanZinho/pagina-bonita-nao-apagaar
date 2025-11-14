'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './button';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { CallToActionDialog } from './call-to-action-dialog';

export function FourthSection() {
  const [showDialog, setShowDialog] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const text = 'Converse comigo';
  const letters = text.split('');

  const letterVariants = {
    initial: { y: 0 },
    hover: {
      y: -4,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const handleClick = () => {
    setShowDialog(true);
  };

  return (
    <>
      <section className="bg-white min-h-screen flex flex-col items-center justify-center px-4 text-neutral-800 py-20 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
        >
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Image
              src="https://i.imgur.com/G8a0scd.jpeg"
              alt="Foto de Lohan Santos"
              width={150}
              height={150}
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left flex flex-col items-center md:items-start"
          >
            <p className="text-sm font-semibold text-neutral-500">
              2006 ☂ | Lz
            </p>
            <h2 className="text-4xl font-bold mt-1">Lohan Santos</h2>
            <div className="mt-4 space-y-2 text-neutral-600">
              <p className="text-lg">- Web Developer & UI/UX Enthusiast</p>
              <p className="text-lg">
                Transformando ideias em experiências digitais de alta performance.
              </p>
            </div>
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <Button
                size="lg"
                className="group w-full rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-700 font-bold shadow-lg border border-green-500/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                onClick={handleClick}
              >
                <FaWhatsapp className="h-5 w-5 text-green-600" />
                <span
                  className="flex"
                  aria-label={text}
                >
                  {letters.map((letter, i) => (
                    <motion.span
                      key={`${letter}-${i}`}
                      variants={letterVariants}
                      className={
                        letter === ' ' ? 'inline-block w-1' : 'inline-block'
                      }
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <CallToActionDialog open={showDialog} onOpenChange={setShowDialog} />
    </>
  );
}
