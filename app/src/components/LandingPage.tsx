import React from 'react';
import { Song, MoodType } from '../types';
import { MOODS } from '../constants/moods';
import { VinylVisualizer } from './VinylVisualizer';

interface LandingPageProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectSong: (song: Song) => void;
  activeMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
  onStartMoodScan: () => void;
  onEnterSanctuary: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onSelectSong,
  activeMood,
  onMoodChange,
  onStartMoodScan,
  onEnterSanctuary
}) => {
  const moodMeta = MOODS[activeMood];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 py-4 lg:py-8 z-20">
      {/* LEFT STAGE: Physical Vinyl Disc & Audio Deck (Interactive 3D / CSS) */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center justify-center">
        <VinylVisualizer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onSelectSong={onSelectSong}
          activeMood={activeMood}
        />

        {/* Quick Soundscape Companion Chips */}
        <div className="mt-5 w-full max-w-sm sm:max-w-md grid grid-cols-2 gap-2.5">
          {[
            { id: 'happy', title: 'Solar Euphoria', genre: '124 BPM • Vibrant', emoji: '✨' },
            { id: 'chill', title: 'Midnight Lo-Fi', genre: '82 BPM • Tokyo Rain', emoji: '🌙' },
            { id: 'sad', title: 'Cathartic Rain', genre: '65 BPM • Healing', emoji: '🌧️' },
            { id: 'energetic', title: 'Kinetic Drive', genre: '138 BPM • Electric', emoji: '⚡' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onMoodChange(item.id as MoodType)}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center space-x-2.5 backdrop-blur-xl ${
                activeMood === item.id
                  ? 'bg-white/15 border-cyan-400 shadow-[0_0_15px_rgba(76,215,246,0.2)]'
                  : 'bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-serif text-white truncate">{item.title}</span>
                <span className="text-[9px] font-mono text-cyan-300 truncate">{item.genre}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT STAGE: Editorial High-Fashion Typography & Mood Frequency Tuner */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center space-y-6">
        {/* Micro System Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-mono">
              BIOMETRIC SYNESTHESIA ARCHITECTURE
            </span>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[10px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>NEURAL LATENCY &lt; 12MS</span>
          </div>
        </div>

        {/* Editorial Avant-Garde Headline */}
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase font-mono">
            FREQUENCY × PROSE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.05] tracking-tight text-white font-serif font-normal">
            Where Acoustic Resonance <br />
            <span className="italic bg-gradient-to-r from-purple-300 via-cyan-300 to-pink-300 bg-clip-text text-transparent">
              Meets Curated Thought.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl font-light">
            An intimate sensory instrument where bespoke soundscapes and literary prose converge. AuraBeats subtly reads your optical micro-expressions to harmonize an adaptive, uncompressed sonic sanctuary in real time.
          </p>
        </div>

        {/* Sculptural Action Deck */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {/* Primary Biometric Glass Pill */}
          <button
            onClick={onStartMoodScan}
            className="group relative flex items-center justify-center space-x-3 px-7 py-4 rounded-full bg-gradient-to-r from-purple-400 via-violet-500 to-cyan-400 text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(160,120,255,0.45)] hover:shadow-[0_0_50px_rgba(76,215,246,0.6)] hover:scale-[1.02] border border-white/30 cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current group-hover:rotate-45 transition-transform duration-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span>Scan My Mood via Webcam</span>
          </button>

          {/* Secondary Brushed Glass Button */}
          <button
            onClick={onEnterSanctuary}
            className="flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-white/90 font-mono text-xs sm:text-sm tracking-widest uppercase border border-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-xl cursor-pointer"
          >
            <span>Explore Sanctuary</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Security Privacy Note */}
        <div className="text-[11px] font-mono text-white/40 flex items-center space-x-1.5">
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span>Powered by On-Device Neural Face Mesh • Instant Synesthesia • No Images Saved</span>
        </div>

        {/* Mood Frequency Tuner Dial Matrix */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
              MOOD SPECTRUM MATRIX
            </span>
            <span className="text-[10px] font-mono text-cyan-400">
              DIAL: {moodMeta.frequency}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'chill', num: '01', title: 'Midnight Lo-Fi', sub: '432Hz • Stillness' },
              { id: 'focus', num: '02', title: 'Deep Focus', sub: '14Hz • Alpha Flow' },
              { id: 'sad', num: '03', title: 'Cathartic Sorrow', sub: '396Hz • Solitude' },
              { id: 'energetic', num: '04', title: 'Solar Euphoria', sub: '639Hz • Kinetic' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => onMoodChange(pill.id as MoodType)}
                className={`p-3 rounded-xl text-left transition-all backdrop-blur-xl border cursor-pointer ${
                  activeMood === pill.id
                    ? 'bg-white/10 border-cyan-400 shadow-[0_0_20px_rgba(76,215,246,0.2)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                  <span>{pill.num}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeMood === pill.id ? 'bg-cyan-400 shadow-[0_0_6px_#4cd7f6]' : 'bg-white/20'
                    }`}
                  />
                </div>
                <div className="text-xs font-serif text-white font-medium truncate">
                  {pill.title}
                </div>
                <div className="text-[10px] text-white/50 font-mono mt-0.5 truncate">
                  {pill.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
