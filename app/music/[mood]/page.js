'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/navbar';
import SongList from '@/components/songlist';
import Footer from '@/components/footer';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
});

function parseSongs(message) {
  const songs = [];
  const songRegex = /\d+\.\s\*\*"(.*?)"\sby\s(.*?):\*\*\s(.*?)\n\s+\[(.*?)\]\(.*?\)/g;
  let match;

  while ((match = songRegex.exec(message)) !== null) {
    const [_, title, artist, description, link] = match;
    songs.push({ title, artist, description, link });
  }

  return songs;
}

export default function MusicPage() {
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    if (mood) {
      fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      })
        .then((response) => response.json())
        .then((data) => {
          const parsedSongs = parseSongs(data.message);
          setPlaylist(parsedSongs);
        })
        .catch((error) => console.error('Failed to fetch playlist:', error));
    }
  }, [mood]);

  return (
    <div className={`min-h-screen w-full p-2 lg:p-6 mb-20 md:mb-24 max-w-4xl mx-auto text-white ${nunito.className}`}>
      <Navbar mood={mood} />
      <SongList playlist={playlist} />
      <Footer />
    </div>
  );
}
