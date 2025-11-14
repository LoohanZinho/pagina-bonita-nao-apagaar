'use client';

import { Youtube, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function FifthSection() {
  const iconVariants = {
    hover: {
      scale: 1.2,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto pt-12 pb-40 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-neutral-800">Lz Developer</h3>
            <p className="mt-2 text-neutral-500">
              Construindo o futuro da web, um projeto de cada vez.
            </p>
          </div>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://wa.me/5591981588512"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-green-600 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <FaWhatsapp className="h-6 w-6" />
              <span className="sr-only">WhatsApp</span>
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@loohansbyt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-red-600 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </motion.a>
            <motion.a
              href="https://instagram.com/Loohansb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-pink-600 transition-colors"
              variants={iconVariants}
              whileHover="hover"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </motion.a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Lz Developer. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
