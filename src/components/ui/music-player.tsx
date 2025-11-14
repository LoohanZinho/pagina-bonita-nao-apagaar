
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
} from 'lucide-react';
import { songs, type Song } from '@/lib/music-data';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    // Lazy create audio element
    if (!audioRef.current) {
        audioRef.current = new Audio(currentSong.audioSrc);
    } else {
        audioRef.current.src = currentSong.audioSrc;
    }

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => handleNextSong();

    if (audio) {
      audio.addEventListener('ended', handleSongEnd);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleSongEnd);
        audio.pause();
      }
    };
  }, [currentSongIndex]);


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume <= 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <div className="w-full max-w-xs rounded-full bg-neutral-100/50 backdrop-blur-md border border-neutral-200/60 shadow-lg overflow-hidden">
      <div className="flex items-center p-2">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0">
          <Image
            src={currentSong.coverArt}
            alt={currentSong.title}
            fill
            sizes="56px"
            className="object-cover"
            data-ai-hint="album cover"
          />
        </div>

        <div className="flex-grow mx-3 overflow-hidden">
          <h2 className="text-sm font-bold text-neutral-800 truncate">
            {currentSong.title}
          </h2>
          <p className="text-xs text-neutral-500 truncate">{currentSong.artist}</p>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0 pr-2">
          <div className="hidden md:flex items-center space-x-1 text-neutral-600">
            <VolumeIcon />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-neutral-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-700"
            />
          </div>

          <motion.button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-neutral-800 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
          </motion.button>
          <motion.button
            onClick={handleNextSong}
            className="w-8 h-8 text-neutral-600 rounded-full flex items-center justify-center hover:bg-neutral-200/50 transition-colors"
             whileTap={{ scale: 0.9 }}
          >
            <SkipForward size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
