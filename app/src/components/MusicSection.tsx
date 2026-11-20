import React, { useState } from 'react';
import { Song, MoodType } from '../types';
import { MOODS } from '../constants/moods';

interface MusicSectionProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  activeMood: MoodType;
  onSelectSong: (song: Song) => void;
  onTogglePlay: () => void;
  onBookmarkSong: (song: Song) => void;
  isBookmarked: (id: string) => boolean;
  selectedCategory: 'all' | 'bollywood' | 'global' | 'indie' | 'lofi';
  onSelectCategory: (cat: 'all' | 'bollywood' | 'global' | 'indie' | 'lofi') => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  songs,
  currentSong,
  isPlaying,
  activeMood,
  onSelectSong,
  onTogglePlay,
  onBookmarkSong,
  isBookmarked,
  selectedCategory,
  onSelectCategory
}) => {
  const moodMeta = MOODS[activeMood];

  return (
    <section className="relative w-full py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>GLOBAL ACOUSTIC SPECTRUM • {moodMeta.frequency}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Curated Global Soundscapes
          </h2>
          <p className="text-sm text-white/60 mt-1 max-w-xl">
            {moodMeta.description}
          </p>
        </div>

        {/* Global Genre Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Spectrum' },
            { id: 'bollywood', label: 'Bollywood Global' },
            { id: 'global', label: 'International Pop' },
            { id: 'indie', label: 'Acoustic & Indie' },
            { id: 'lofi', label: 'Tokyo Cyber Lo-Fi' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(76,215,246,0.35)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Large Aesthetic Album Covers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((song) => {
          const isCurrentActive = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrentActive && isPlaying;
          const saved = isBookmarked(song.id);

          return (
            <div
              key={song.id}
              className={`group relative rounded-3xl overflow-hidden bg-black/40 border transition-all duration-500 backdrop-blur-xl flex flex-col justify-between ${
                isCurrentActive
                  ? 'border-cyan-400/80 shadow-[0_10px_35px_rgba(76,215,246,0.25)] ring-1 ring-cyan-400/50'
                  : 'border-white/10 hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]'
              }`}
            >
              {/* Large Cover Art with Slip Hover Animation */}
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">
                <img
                  src={song.artwork}
                  alt={song.title}
                  className="w-full h-full object-cover object-center filter saturate-105 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Genre & Frequency Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{song.genre}</span>
                </div>

                {/* Bookmark Heart Button (Firestore) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmarkSong(song);
                  }}
                  aria-label="Save to Firebase Library"
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
                    saved
                      ? 'bg-rose-500 text-white shadow-[0_0_15px_#f43f5e]'
                      : 'bg-black/60 hover:bg-black text-white/70 hover:text-white border border-white/20'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${saved ? 'fill-current' : 'fill-none stroke-current'}`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {/* Floating Play Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                  <button
                    onClick={() => {
                      if (isCurrentActive) {
                        onTogglePlay();
                      } else {
                        onSelectSong(song);
                      }
                    }}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(76,215,246,0.6)] transform scale-90 group-hover:scale-100 transition-all cursor-pointer"
                  >
                    {isCurrentlyPlaying ? (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Now Playing Animated Frequency Equalizer */}
                {isCurrentlyPlaying && (
                  <div className="absolute bottom-3 left-3 flex items-end space-x-1 h-4 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full border border-cyan-400/40">
                    <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-1 h-3" />
                    <span className="w-0.5 bg-purple-400 rounded-full animate-eq-2 h-4" />
                    <span className="w-0.5 bg-cyan-300 rounded-full animate-eq-3 h-2" />
                    <span className="w-0.5 bg-fuchsia-400 rounded-full animate-eq-4 h-3.5" />
                    <span className="text-[8px] font-mono text-cyan-300 ml-1">PLAYING</span>
                  </div>
                )}
              </div>

              {/* Album Metadata Card Bottom */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-lg text-white font-medium truncate group-hover:text-cyan-300 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-xs text-white/70 truncate mt-0.5 font-sans">
                    {song.artist}
                  </p>
                  <p className="text-[11px] text-white/40 truncate mt-0.5">
                    {song.album}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span className="text-cyan-300/80">{song.origin || 'Global'}</span>
                  <span>{song.duration ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, '0')}` : '3:20'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
