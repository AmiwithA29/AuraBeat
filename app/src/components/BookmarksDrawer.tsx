import React, { useState } from 'react';
import { BookmarkItem, Song, Book } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onSelectSong: (song: Song) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectSong
}) => {
  const [filter, setFilter] = useState<'all' | 'song' | 'book'>('all');

  if (!isOpen) return null;

  const filteredItems = bookmarks.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-md h-full bg-neutral-950 border-l border-white/15 p-6 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>FIREBASE FIRESTORE SYNC</span>
            </div>
            <h2 className="text-2xl font-serif text-white font-medium mt-1">
              Personal Sanctuary
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 my-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold'
                : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            All ({bookmarks.length})
          </button>
          <button
            onClick={() => setFilter('song')}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all ${
              filter === 'song'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold'
                : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            Songs ({bookmarks.filter(b => b.type === 'song').length})
          </button>
          <button
            onClick={() => setFilter('book')}
            className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all ${
              filter === 'book'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold'
                : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            Books ({bookmarks.filter(b => b.type === 'book').length})
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/40">
              <span className="text-4xl mb-3">🏷️</span>
              <p className="text-sm font-serif">Your sanctuary is empty.</p>
              <p className="text-xs text-white/30 mt-1 max-w-xs font-sans">
                Bookmark songs and books during your mood sessions to build your personal library.
              </p>
            </div>
          ) : (
            filteredItems.map(item => {
              const isSong = item.type === 'song';
              const song = isSong ? (item.data as Song) : null;
              const book = !isSong ? (item.data as Book) : null;

              return (
                <div
                  key={item.id}
                  className="group relative p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={isSong ? song!.artwork : book!.coverUrl}
                      alt={isSong ? song!.title : book!.title}
                      className="w-12 h-12 rounded-xl object-cover border border-white/15 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-mono uppercase text-cyan-300">
                        {isSong ? `Song • ${song!.genre}` : `Book • ${book!.category}`}
                      </span>
                      <h4 className="text-xs font-serif text-white font-medium truncate">
                        {isSong ? song!.title : book!.title}
                      </h4>
                      <p className="text-[11px] text-white/50 truncate">
                        {isSong ? song!.artist : book!.authors.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {isSong && (
                      <button
                        onClick={() => onSelectSong(song!)}
                        className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                        aria-label="Play Track"
                      >
                        <svg className="w-3.5 h-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    )}

                    {!isSong && book?.previewLink && (
                      <a
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white transition-colors"
                      >
                        Read
                      </a>
                    )}

                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="text-white/30 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      aria-label="Remove"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 mt-auto border-t border-white/10 text-[10px] font-mono text-white/40 flex items-center justify-between">
          <span>CLOUD SYNC ACTIVE</span>
          <span>{filteredItems.length} SAVED ASSETS</span>
        </div>
      </div>
    </div>
  );
};
