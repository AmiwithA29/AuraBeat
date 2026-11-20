import React from 'react';
import { UserProfile, MoodType } from '../types';
import { MOODS } from '../constants/moods';

interface NavbarProps {
  currentMood: MoodType;
  activeView: 'landing' | 'dashboard';
  onNavigate: (view: 'landing' | 'dashboard') => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMood,
  activeView,
  onNavigate,
  bookmarksCount,
  onOpenBookmarks,
  currentUser,
  onOpenAuth
}) => {
  const moodMeta = MOODS[currentMood];

  return (
    <header className="relative w-full z-30 px-4 sm:px-8 lg:px-12 pt-4 pb-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)] cursor-pointer hover:border-cyan-400/40 transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#4cd7f6] animate-pulse" />
            <span className="font-serif tracking-tight text-lg text-white font-normal">
              Aura<span className="italic text-purple-300 font-light">Beats</span>
            </span>
            <span className="text-white/20 text-xs">/</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-200 hidden sm:inline-block">
              STUDIO ED.09
            </span>
          </button>

          {/* Harmonic Engine Tag */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-[11px] font-mono text-white/60 tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>HARMONIC ENGINE</span>
            <span className="text-cyan-400">[{moodMeta.frequency.split(' ')[0]}]</span>
          </div>
        </div>

        {/* Center View Switcher */}
        <nav className="flex items-center space-x-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-2xl border border-white/10 shadow-inner">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              activeView === 'landing'
                ? 'bg-white/15 text-white font-bold shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Vinyl Sanctuary
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Dashboard</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </button>
        </nav>

        {/* Right Actions: Library & Auth */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sanctuary Bookmarks Pill */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer group shadow-xl"
            aria-label="View Saved Library"
          >
            <svg
              className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs font-mono text-white/80 group-hover:text-white hidden sm:inline">
              Library
            </span>
            <span className="text-[10px] font-mono font-bold bg-cyan-400 text-black px-1.5 py-0.2 rounded-full">
              {bookmarksCount}
            </span>
          </button>

          {/* User Profile / Auth Pill */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Avatar"
                className="w-5 h-5 rounded-full object-cover border border-cyan-400"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-400 text-black flex items-center justify-center text-[10px] font-bold">
                A
              </div>
            )}
            <span className="text-xs font-mono text-white/80 hidden md:inline truncate max-w-[90px]">
              {currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
