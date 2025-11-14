'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects } from '@/lib/projects-data';
import { ArrowUpRight } from 'lucide-react';

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


const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  return (
    <motion.div variants={itemVariants}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-[60vh] rounded-2xl overflow-hidden bg-neutral-200 group cursor-pointer shadow-lg"
      >
        <Image
          src={project.image}
          alt={`Imagem do projeto ${project.name}`}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint="project screenshot"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-black/20 backdrop-blur-sm">
              <Image
                src={project.logo}
                alt={`Logo da ${project.name}`}
                fill
                className="object-contain p-1"
                data-ai-hint="company logo"
              />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
          </div>
          <div className="mt-4 h-0 opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100">
            <p className="text-white/80 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </a>
    </motion.div>
  );
};

export function ThirdSection() {
  return (
    <section className="bg-white py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800">
            Projetos Recentes
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto mt-4 text-lg">
            Cases de sucesso que demonstram nossa expertise em transformar
            ideias em realidade digital.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
