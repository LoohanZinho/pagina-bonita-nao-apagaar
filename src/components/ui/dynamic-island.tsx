'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Array de frases para o carrossel de texto
const sitePhrases = [
  'Vamos criar seu site ou SaaS?',
  'Que tal um design moderno?',
  'Otimize sua presença online.',
  'Explore o poder de um bom SaaS.',
  'Vamos inovar com design?',
  'Crie uma aplicação que converte.',
  'Sua ideia, nosso código.',
  'Transforme cliques em clientes.',
  'Um sistema para o seu negócio.',
  'Construindo o futuro com software.',
];

// Componente interno para o texto, para aplicar a lógica de inversão corretamente
function IslandContent({
  isOverLightSections,
}: {
  isOverLightSections: boolean;
}) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    if (!isOverLightSections) {
      const interval = setInterval(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % sitePhrases.length);
      }, 4000); // Muda a cada 4 segundos

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }
  }, [isOverLightSections]);

  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const textToShow = isOverLightSections
    ? 'Lz | @Loohansb'
    : sitePhrases[currentPhraseIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={textToShow} // A chave garante a re-animação quando o texto muda
        variants={textVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        className={cn(
          'text-xs font-semibold',
          // Lógica de Cor:
          // Na seção 1 (hero), o texto é branco.
          // Nas outras seções, o texto é preto.
          !isOverLightSections ? 'text-white' : 'text-neutral-800'
        )}
      >
        {textToShow}
      </motion.div>
    </AnimatePresence>
  );
}

export default function DynamicIsland({
  isOverLightSectionsFromParent,
  showAvatar,
}: {
  isOverLightSectionsFromParent: boolean;
  showAvatar: boolean;
}) {
  const [clickCount, setClickCount] = useState(0);
  const [showSecretPopup, setShowSecretPopup] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    // Limpa o timeout anterior para registrar um novo clique consecutivo
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount === 10) {
      setShowSecretPopup(true);
      setClickCount(0); // Reseta para a próxima vez
    } else {
      // Se não atingiu 10, espera 1 segundo. Se não houver mais cliques, reseta.
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1000); // 1 segundo para considerar cliques "seguidos"
    }
  };

  useEffect(() => {
    // Limpa o timeout se o componente for desmontado
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);


  const containerVariants = {
    initial: {
      padding: '4px 12px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fundo um pouco mais escuro para contraste
      borderColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
    },
    scrolled: {
      padding: '6px 12px',
      backgroundColor: 'rgba(240, 240, 240, 0.5)',
      borderColor: 'rgba(0, 0, 0, 0.05)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
  };

  const avatarSpaceVariants = {
    hidden: { width: 0, marginRight: 0, opacity: 0 },
    visible: { width: 24, marginRight: 8, opacity: 1 },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate={isOverLightSectionsFromParent ? 'scrolled' : 'initial'}
        whileTap={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'rounded-full select-none border overflow-hidden flex items-center cursor-pointer'
        )}
        onClick={handleClick}
      >
        <AnimatePresence>
          {showAvatar && (
            <motion.div
              variants={avatarSpaceVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative isolate" // Isola a foto do mix-blend-mode
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Image
                src="https://i.imgur.com/G8a0scd.jpeg"
                alt="Avatar"
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <IslandContent isOverLightSections={isOverLightSectionsFromParent} />
      </motion.div>

      <AlertDialog open={showSecretPopup} onOpenChange={setShowSecretPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>🤫</AlertDialogTitle>
            <AlertDialogDescription>
              Firebase TOP1
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
