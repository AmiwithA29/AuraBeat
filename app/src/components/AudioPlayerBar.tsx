import React, { useEffect, useRef, useState } from 'react';
import { Song } from '../types';

interface AudioPlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onBookmarkSong: (song: Song) => void;
  isBookmarked: (id: string) => boolean;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onBookmarkSong,
  isBookmarked
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      if (currentSong?.previewUrl) {
        audioRef.current.src = currentSong.previewUrl;
        audioRef.current.volume = volume;
        if (isPlaying) {
          audioRef.current.play().catch(e => console.warn('Audio play error:', e));
        }
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn('Play interrupted:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.8;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  if (!currentSong) return null;

  const saved = isBookmarked(currentSong.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 pb-3 pt-1 pointer-events-none">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        preload="auto"
      />

      <div className="max-w-6xl mx-auto rounded-2xl bg-neutral-950/85 backdrop-blur-3xl border border-white/15 p-3 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.95)] pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Track Info with Mini Rotating Vinyl */}
        <div className="flex items-center space-x-3 w-full sm:w-1/3 min-w-0">
          <div className="relative w-12 h-12 flex-shrink-0">
            {/* Mini Vinyl Disc */}
            <div
              className={`absolute -right-2 top-0 w-12 h-12 rounded-full bg-black border border-white/20 shadow-lg flex items-center justify-center transition-all ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-900 to-cyan-900 border border-cyan-400/40" />
            </div>
            {/* Album Cover Sleeve */}
            <img
              src={currentSong.artwork}
              alt={currentSong.title}
              className="relative z-10 w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-serif text-white font-medium truncate max-w-[140px] sm:max-w-[180px]">
                {currentSong.title}
              </span>
              <button
                onClick={() => onBookmarkSong(currentSong)}
                className="text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                aria-label="Bookmark"
              >
                <svg
                  className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : 'fill-none stroke-current'}`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
            <span className="text-[11px] text-white/60 truncate font-sans">
              {currentSong.artist} • {currentSong.album}
            </span>
          </div>
        </div>

        {/* Center Controls & Scrubber */}
        <div className="flex flex-col items-center w-full sm:w-5/12 max-w-md">
          {/* Controls */}
          <div className="flex items-center space-x-4 mb-1">
            <button
              onClick={onPrev}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Track"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-cyan-400 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(76,215,246,0.6)] cursor-pointer"
              aria-label="Play or Pause"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={onNext}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Next Track"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Time & Progress Bar */}
          <div className="w-full flex items-center space-x-2 text-[10px] font-mono text-white/50">
            <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
            <input
              type="range"
              min="0"
              max={duration || 30}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Right Volume & Frequency Pill */}
        <div className="hidden sm:flex items-center justify-end space-x-3 w-1/4">
          <div className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            432Hz DSD
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-white cursor-pointer"
              aria-label="Mute"
            >
              {isMuted || volume === 0 ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
