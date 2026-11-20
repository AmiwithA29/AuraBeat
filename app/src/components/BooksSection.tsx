import React, { useState } from 'react';
import { Book, MoodType } from '../types';
import { MOODS } from '../constants/moods';

interface BooksSectionProps {
  books: Book[];
  activeMood: MoodType;
  onBookmarkBook: (book: Book) => void;
  isBookmarked: (id: string) => boolean;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  books,
  activeMood,
  onBookmarkBook,
  isBookmarked
}) => {
  const [selectedBookForSynopsis, setSelectedBookForSynopsis] = useState<Book | null>(null);
  const moodMeta = MOODS[activeMood];

  return (
    <section className="relative w-full py-10 border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>LITERARY RESONANCE • {moodMeta.bookCategory}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Curated Literature Companions
          </h2>
          <p className="text-sm text-white/60 mt-1 max-w-xl">
            Thoughtfully paired books powered by Google Books API, matching the emotional depth of your detected valence.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span>CURATED COLLECTION:</span>
          <span className="text-purple-300 font-bold">{books.length} VOLUMES</span>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => {
          const saved = isBookmarked(book.id);

          return (
            <div
              key={book.id}
              className="group relative rounded-3xl overflow-hidden bg-black/40 border border-white/10 hover:border-purple-400/50 hover:shadow-[0_15px_35px_rgba(168,85,247,0.18)] transition-all duration-500 backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Book Spine / Cover Display */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 flex items-center justify-center p-4">
                {/* Ambient glow behind book cover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-transparent to-cyan-950/30" />

                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="relative z-10 w-auto h-full max-h-[260px] object-contain rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.9)] transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Bookmark Heart Button (Firestore) */}
                <button
                  onClick={() => onBookmarkBook(book)}
                  aria-label="Save Book to Firebase Library"
                  className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
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

                {/* Category Pill */}
                <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8.5px] font-mono text-purple-300">
                  <span>{book.publishedYear || 'Classic'}</span>
                </div>
              </div>

              {/* Book Metadata & Synopsis */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-purple-400 mb-0.5 truncate">
                    {book.category}
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-white/70 truncate mt-0.5">
                    by {book.authors.join(', ')}
                  </p>

                  <p className="text-[11px] text-white/50 line-clamp-2 mt-2 leading-relaxed">
                    {book.description}
                  </p>
                </div>

                {/* Actions & Rating */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBookForSynopsis(book)}
                    className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200 uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read Synopsis</span>
                    <span>&rarr;</span>
                  </button>

                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-[10px] font-mono text-white/80 transition-colors flex items-center space-x-1"
                    >
                      <span>Google Books</span>
                      <svg className="w-2.5 h-2.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synopsis Detail Modal */}
      {selectedBookForSynopsis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
          <div className="relative w-full max-w-xl rounded-3xl bg-neutral-950 border border-white/20 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBookForSynopsis(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedBookForSynopsis.coverUrl}
                alt={selectedBookForSynopsis.title}
                className="w-32 h-auto rounded-lg shadow-xl border border-white/10 flex-shrink-0 mx-auto sm:mx-0"
              />
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                  {selectedBookForSynopsis.category}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-1">
                  {selectedBookForSynopsis.title}
                </h3>
                <p className="text-sm text-white/70 mt-0.5">
                  by {selectedBookForSynopsis.authors.join(', ')}
                </p>

                <div className="flex items-center space-x-3 mt-3 text-xs font-mono text-white/60">
                  <span>★ {selectedBookForSynopsis.rating || 4.7} / 5.0</span>
                  <span>•</span>
                  <span>{selectedBookForSynopsis.pageCount || 320} Pages</span>
                  <span>•</span>
                  <span>{selectedBookForSynopsis.publishedYear}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider mb-2">
                Literary Synopsis & Themes
              </h4>
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {selectedBookForSynopsis.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onBookmarkBook(selectedBookForSynopsis);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer ${
                  isBookmarked(selectedBookForSynopsis.id)
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <span>{isBookmarked(selectedBookForSynopsis.id) ? 'Saved in Sanctuary' : 'Bookmark to Firebase'}</span>
              </button>

              {selectedBookForSynopsis.previewLink && (
                <a
                  href={selectedBookForSynopsis.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-black font-bold text-xs font-mono tracking-wider uppercase shadow-lg hover:scale-105 transition-all"
                >
                  Preview on Google Books
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
