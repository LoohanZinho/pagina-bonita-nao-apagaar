export interface Song {
  title: string;
  artist: string;
  coverArt: string; // URL to the image
  audioSrc: string; // URL to the audio file
}

export const songs: Song[] = [
  {
    title: 'pussypodium',
    artist: 'akiaura e LONOWN',
    coverArt: 'https://i.imgur.com/3mhEh3J.png',
    audioSrc: '/music/1.mp3',
  },
  {
    title: '2hollis - Poster Boy (best part looped; normal)',
    artist: 'LXMINAL',
    coverArt: 'https://i.imgur.com/9xYNlCa.png',
    audioSrc: '/music/2.mp3',
  },
  {
    title: 'Funk Da Montanha (SLOWED & REVERB)',
    artist: 'AZXNns',
    coverArt: 'https://i.imgur.com/KcAmN3G.png',
    audioSrc: '/music/3.mp3',
  },
];
