import React from 'react';
import { Song, MoodType } from '../types';
import { MOODS } from '../constants/moods';

interface VinylVisualizerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectSong: (song: Song) => void;
  activeMood: MoodType;
}

export const VinylVisualizer: React.FC<VinylVisualizerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  activeMood
}) => {
  const moodMeta = MOODS[activeMood];

  const defaultArtwork = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80';
  const artwork = currentSong?.artwork || defaultArtwork;
  const title = currentSong?.title || 'Nightfall Nocturne';
  const artist = currentSong?.artist || 'Haruki Murakami Suite';
  const album = currentSong?.album || 'Chapter IV • Echoes of Stillness';

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* Floating Vinyl Sculpture */}
      <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square flex items-center justify-center group">
        {/* Luminous dynamic aura glow */}
        <div
          className="absolute -inset-6 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${moodMeta.color}44 0%, #4cd7f633 50%, #f472b622 100%)`
          }}
        />

        {/* Vinyl Disc Slipping Out of Sleeve */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Rotating Vinyl Record */}
          <div
            className={`absolute right-0 sm:-right-4 w-[270px] sm:w-[330px] aspect-square rounded-full bg-[#0a0a0f] border-4 border-black/90 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center z-10 transition-transform duration-700 group-hover:translate-x-8 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            style={{
              backgroundImage:
                'radial-gradient(circle, transparent 28%, rgba(255,255,255,0.04) 29%, transparent 31%, rgba(255,255,255,0.03) 42%, transparent 44%, rgba(255,255,255,0.05) 58%, transparent 60%, rgba(255,255,255,0.03) 74%, transparent 76%)'
            }}
          >
            {/* Record Label Center Disc */}
            <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border border-cyan-400/30 bg-gradient-to-tr from-purple-950 via-slate-900 to-cyan-950 p-2 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[7.5px] font-mono text-cyan-300 tracking-widest uppercase">
                AURA • {moodMeta.frequency.split(' ')[0]}
              </span>
              <span className="text-[10px] font-serif text-white font-medium italic truncate max-w-[80px]">
                {title}
              </span>
              <div className="w-3 h-3 rounded-full bg-black border border-white/40 my-0.5 shadow-inner" />
              <span className="text-[6.5px] font-mono text-white/50 tracking-wider">SIDE A • 33⅓</span>
            </div>
          </div>

          {/* Luxury Vinyl Sleeve Slipcase */}
          <div className="relative z-20 w-[260px] sm:w-[320px] aspect-square rounded-2xl overflow-hidden border border-white/20 bg-black/70 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-700 group-hover:scale-[1.02] self-start">
            <img
              src={artwork}
              alt={title}
              className="w-full h-full object-cover object-center filter saturate-110 contrast-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Sleeve Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-20">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-[9px] font-mono text-cyan-300 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>EDITION N° 09</span>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-white/80 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                DSD 11.2MHz
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-end z-20">
              <div className="min-w-0 pr-2">
                <div className="text-[9px] font-mono tracking-widest text-purple-300 uppercase truncate">
                  {artist}
                </div>
                <div className="font-serif text-base sm:text-lg text-white tracking-tight truncate">
                  {title}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[10px] font-mono text-white/80 bg-white/10 backdrop-blur-md px-2 py-1 rounded border border-white/15 flex-shrink-0">
                <span>{moodMeta.bpm.split(' ')[0]}</span>
                <span className="text-cyan-400 font-bold">Hz</span>
              </div>
            </div>
          </div>

          {/* Stylized Turntable Needle Arm */}
          <div
            className={`absolute top-2 right-3 w-28 h-2 bg-gradient-to-r from-neutral-600 via-neutral-300 to-cyan-400 rounded-full origin-left z-30 shadow-xl hidden sm:block pointer-events-none transition-transform duration-700 ${
              isPlaying ? 'rotate-[-38deg] opacity-90' : 'rotate-[-52deg] opacity-60'
            }`}
          >
            <div className="absolute -left-1 -top-1 w-4 h-4 rounded-full bg-neutral-900 border border-white/40 shadow-sm" />
            <div className="absolute -right-2 -top-1.5 w-3 h-5 bg-cyan-400 rounded-sm shadow-[0_0_10px_#4cd7f6]" />
          </div>
        </div>
      </div>

      {/* Glassmorphic Playback Capsule & Frequency Equalizer */}
      <div className="relative z-20 mt-4 sm:mt-5 w-full max-w-sm sm:max-w-md px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={onTogglePlay}
            aria-label="Toggle Soundscape Preview"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 via-violet-500 to-cyan-400 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(208,188,255,0.6)] cursor-pointer flex-shrink-0"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-white font-medium truncate max-w-[140px] sm:max-w-[170px]">
                {title}
              </span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
              <span className="text-[9px] font-mono text-cyan-300 uppercase flex-shrink-0">
                LIVE 432Hz
              </span>
            </div>
            <span className="text-[11px] text-white/50 truncate max-w-[170px] sm:max-w-[210px]">
              {album}
            </span>
          </div>
        </div>

        {/* Real-time Jumping Audio Equalizer Bars */}
        <div className={`flex items-end space-x-1 h-6 pl-2 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
          <span className="w-1 bg-cyan-400 rounded-full animate-eq-1 h-4" />
          <span className="w-1 bg-purple-400 rounded-full animate-eq-2 h-6" />
          <span className="w-1 bg-cyan-200 rounded-full animate-eq-3 h-3" />
          <span className="w-1 bg-fuchsia-400 rounded-full animate-eq-4 h-5" />
          <span className="w-1 bg-cyan-400 rounded-full animate-eq-5 h-2" />
          <span className="w-1 bg-purple-300 rounded-full animate-eq-6 h-4" />
        </div>
      </div>
    </div>
  );
};
