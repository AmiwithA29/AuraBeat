export type MoodType = 'happy' | 'sad' | 'chill' | 'energetic' | 'romantic' | 'focus';

export interface MoodMetadata {
  id: MoodType;
  label: string;
  emoji: string;
  valence: string;
  frequency: string;
  bpm: string;
  color: string;
  accentColor: string;
  quote: string;
  description: string;
  musicQueries: {
    bollywood: string;
    globalPop: string;
    indie: string;
    lofi: string;
    electronic: string;
  };
  bookCategory: string;
  bookSearchQuery: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  previewUrl: string;
  genre: string;
  mood: MoodType;
  duration?: number;
  frequencyLabel?: string;
  releaseYear?: string;
  origin?: 'Bollywood' | 'Global Pop' | 'Indie' | 'Lo-Fi' | 'Electronic';
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverUrl: string;
  category: string;
  pageCount?: number;
  rating?: number;
  publishedYear?: string;
  previewLink?: string;
  mood: MoodType;
}

export interface BookmarkItem {
  id: string;
  type: 'song' | 'book';
  data: Song | Book;
  savedAt: number;
  userId?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}
