import React, { useState, useEffect, useCallback } from 'react';
import { MoodType, Song, Book, BookmarkItem, UserProfile } from './types';
import { MOODS } from './constants/moods';
import { fetchSongsForMood } from './services/musicService';
import { fetchBooksForMood } from './services/booksService';
import { firebaseService } from './services/firebaseService';

import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WebcamMoodDetector } from './components/WebcamMoodDetector';
import { MusicSection } from './components/MusicSection';
import { BooksSection } from './components/BooksSection';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AuthModal } from './components/AuthModal';

export const App: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('chill');
  const [activeView, setActiveView] = useState<'landing' | 'dashboard'>('landing');
  const [musicCategory, setMusicCategory] = useState<'all' | 'bollywood' | 'global' | 'indie' | 'lofi'>('all');

  const [songs, setSongs] = useState<Song[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscribe to Firebase Service for Auth & Bookmarks
  useEffect(() => {
    const unsubAuth = firebaseService.subscribeAuth(user => setCurrentUser(user));
    const unsubBookmarks = firebaseService.subscribeBookmarks(() => {
      setBookmarks(firebaseService.getBookmarks());
    });
    setBookmarks(firebaseService.getBookmarks());

    return () => {
      unsubAuth();
      unsubBookmarks();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Load music & books whenever mood or music category changes
  const loadSanctuaryData = useCallback(async (mood: MoodType, cat: 'all' | 'bollywood' | 'global' | 'indie' | 'lofi') => {
    try {
      const [fetchedSongs, fetchedBooks] = await Promise.all([
        fetchSongsForMood(mood, cat),
        fetchBooksForMood(mood)
      ]);
      setSongs(fetchedSongs);
      setBooks(fetchedBooks);

      if (!currentSong || currentSong.mood !== mood) {
        if (fetchedSongs.length > 0) {
          setCurrentSong(fetchedSongs[0]);
        }
      }
    } catch (e) {
      console.warn('Error loading mood assets:', e);
    }
  }, [currentSong]);

  useEffect(() => {
    loadSanctuaryData(currentMood, musicCategory);
  }, [currentMood, musicCategory, loadSanctuaryData]);

  // Handle Mood Update (from Webcam or manual pill)
  const handleMoodUpdate = (newMood: MoodType) => {
    if (newMood !== currentMood) {
      setCurrentMood(newMood);
      showToast(`Harmonized with ${MOODS[newMood].emoji} ${MOODS[newMood].label}`);
    }
  };

  // Music playback controls
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  // Bookmarking to Firebase Firestore
  const handleBookmarkSong = async (song: Song) => {
    if (firebaseService.isBookmarked(song.id)) {
      await firebaseService.removeBookmark(song.id);
      showToast(`Removed "${song.title}" from library`);
    } else {
      await firebaseService.addBookmark({
        id: song.id,
        type: 'song',
        data: song,
        savedAt: Date.now(),
        userId: currentUser?.uid
      });
      showToast(`Saved "${song.title}" to Firebase Firestore ✨`);
    }
  };

  const handleBookmarkBook = async (book: Book) => {
    if (firebaseService.isBookmarked(book.id)) {
      await firebaseService.removeBookmark(book.id);
      showToast(`Removed "${book.title}" from library`);
    } else {
      await firebaseService.addBookmark({
        id: book.id,
        type: 'book',
        data: book,
        savedAt: Date.now(),
        userId: currentUser?.uid
      });
      showToast(`Bookmarked "${book.title}" to Firebase Firestore 📖`);
    }
  };

  const isItemBookmarked = (id: string) => {
    return firebaseService.isBookmarked(id);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#08080d] text-white flex flex-col justify-between overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Three.js Interactive 3D Cosmic Background */}
      <ThreeBackground mood={currentMood} isPlaying={isPlaying} />

      {/* Top Floating Luxury Navbar */}
      <Navbar
        currentMood={currentMood}
        activeView={activeView}
        onNavigate={view => setActiveView(view)}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 flex flex-col">
        {activeView === 'landing' ? (
          /* Split-Screen Landing Page View */
          <LandingPage
            currentSong={currentSong}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onSelectSong={handleSelectSong}
            activeMood={currentMood}
            onMoodChange={handleMoodUpdate}
            onStartMoodScan={() => {
              setActiveView('dashboard');
              showToast('Webcam mood detector initialized');
            }}
            onEnterSanctuary={() => setActiveView('dashboard')}
          />
        ) : (
          /* Main Interactive Dashboard View */
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 flex-1 flex flex-col space-y-10">
            {/* Top Dashboard Row: Live Webcam Mood Detector Widget + Mood Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Circular Webcam Widget */}
              <div className="lg:col-span-5 flex justify-center">
                <WebcamMoodDetector
                  currentMood={currentMood}
                  onMoodDetected={handleMoodUpdate}
                />
              </div>

              {/* Right Mood Frequency Banner */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4 p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>ACTIVE NEURAL STATE: {MOODS[currentMood].label}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                  {MOODS[currentMood].quote}
                </h1>

                <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                  {MOODS[currentMood].description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-purple-300">
                    {MOODS[currentMood].frequency}
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-cyan-300">
                    {MOODS[currentMood].bpm}
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-emerald-300">
                    Optical Sync Live
                  </div>
                </div>
              </div>
            </div>

            {/* Global Music Section (Large Album Covers Grid) */}
            <MusicSection
              songs={songs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              activeMood={currentMood}
              onSelectSong={handleSelectSong}
              onTogglePlay={handleTogglePlay}
              onBookmarkSong={handleBookmarkSong}
              isBookmarked={isItemBookmarked}
              selectedCategory={musicCategory}
              onSelectCategory={cat => setMusicCategory(cat)}
            />

            {/* Mood-Curated Books Section (Google Books + Firestore) */}
            <BooksSection
              books={books}
              activeMood={currentMood}
              onBookmarkBook={handleBookmarkBook}
              isBookmarked={isItemBookmarked}
            />
          </div>
        )}
      </main>

      {/* Floating Bottom Audio Player Dock */}
      <AudioPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onBookmarkSong={handleBookmarkSong}
        isBookmarked={isItemBookmarked}
      />

      {/* Bookmarks / Personal Sanctuary Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={id => firebaseService.removeBookmark(id)}
        onSelectSong={handleSelectSong}
      />

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUserChange={user => setCurrentUser(user)}
      />

      {/* Toast Notification Capsule */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl bg-neutral-900/90 text-white text-xs font-mono tracking-wide border border-cyan-400/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer Ticker */}
      <footer className="relative w-full z-20 border-t border-white/10 bg-black/60 backdrop-blur-2xl px-4 sm:px-8 lg:px-12 py-3 mt-12 text-[10px] font-mono text-white/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-4">
          <span>MASTER AUDIO: 24-BIT / 192KHZ DSD LOSSLESS</span>
          <span>•</span>
          <span>GOOGLE BOOKS &amp; ITUNES LIVE API</span>
          <span>•</span>
          <span className="text-cyan-300">FIREBASE FIRESTORE SYNC ACTIVE</span>
        </div>
        <div>© AURABEATS SANCTUARY • DESIGNED FOR AUDIOPHILES &amp; AUTHORS</div>
      </footer>
    </div>
  );
};
