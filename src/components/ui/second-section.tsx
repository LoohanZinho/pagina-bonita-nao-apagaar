'use client';

import { motion } from 'framer-motion';
import { Paintbrush, Zap, Gem } from 'lucide-react';
import AnimatedWords from './animated-words';
import { FirebaseIcon } from './firebase-icon';

const features = [
  {
    icon: <Paintbrush className="h-8 w-8 text-indigo-500" />,
    title: 'Design Inesquecível',
    description:
      'Criamos interfaces que não são apenas bonitas, mas intuitivas e que contam a história da sua marca, cativando seu público desde o primeiro clique.',
  },
  {
    icon: <Zap className="h-8 w-8 text-green-500" />,
    title: 'Performance Extrema',
    description:
      'Sites e sistemas ultrarrápidos que carregam em um piscar de olhos. Melhoramos a experiência do usuário e o ranking no Google, porque ninguém gosta de esperar.',
  },
  {
    icon: <Gem className="h-8 w-8 text-amber-500" />,
    title: 'Otimizado para SEO',
    description:
      'Construímos seu site ou SaaS com as melhores práticas de SEO desde a fundação, para que seus clientes te encontrem no topo dos resultados de busca.',
  },
  {
    icon: <FirebaseIcon className="h-10 w-10" />,
    title: 'Segurança com Firebase',
    description:
      'Utilizamos tecnologias modernas e robustas como o Firebase para garantir que seu produto digital seja seguro, confiável e pronto para escalar sem preocupações.',
  },
];

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
  hidden: { y: 30, opacity: 0 },
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


export function SecondSection() {
  return (
    <section
      className="bg-white py-20 md:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
            A base para um produto digital <AnimatedWords />
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Não criamos apenas aplicações. Criamos ativos digitais que trabalham
            para o seu sucesso 24/7.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-xl transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-neutral-800">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
