'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Confetti from 'react-confetti';

export function EasterEggListener() {
  const [sequence, setSequence] = useState('');
  const [showSecretPopup, setShowSecretPopup] = useState(false);

  const lzofsevenCode = 'lzofseven';
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignora teclas modificadoras para não interferir em atalhos
      if (['Control', 'Alt', 'Meta', 'Shift', 'Enter', ' '].includes(event.key)) {
        return;
      }
      
      const newSequence = (sequence + event.key.toLowerCase()).slice(-lzofsevenCode.length);
      setSequence(newSequence);

      if (newSequence.endsWith(lzofsevenCode)) {
        setShowSecretPopup(true);
        audioRef.current?.play();
        setSequence(''); // Reseta a sequência
      }
    },
    [sequence]
  );

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    
    handleResize(); // Define o tamanho inicial

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleKeyDown]);

  return (
    <>
      {showSecretPopup && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={300}
          onConfettiComplete={() => setShowSecretPopup(false)}
        />
      )}
      <audio ref={audioRef} src="/audio/secret-sound.mp3" preload="auto" />
      
      <AlertDialog open={showSecretPopup} onOpenChange={setShowSecretPopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Não é segredo!</AlertDialogTitle>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <Image
                src="https://i.imgur.com/G8a0scd.jpeg"
                alt="Foto de Lohan Santos"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <AlertDialogDescription className="text-center">
                Lz top 1 do firebase studio
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSecretPopup(false)}>
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
