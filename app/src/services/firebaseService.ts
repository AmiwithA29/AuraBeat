import { BookmarkItem, UserProfile } from '../types';

// Default Firebase Configuration (can be overridden by user via settings or env)
const FIREBASE_CONFIG_KEY = 'aurabeats_firebase_config';
const LOCAL_BOOKMARKS_KEY = 'aurabeats_saved_bookmarks';
const LOCAL_USER_KEY = 'aurabeats_active_user';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

// Initial default demo user
const DEFAULT_DEMO_USER: UserProfile = {
  uid: 'guest_' + Math.random().toString(36).substring(2, 9),
  displayName: 'Aura Traveler',
  email: 'traveler@aurabeats.io',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  isAnonymous: true
};

class FirebaseService {
  private user: UserProfile | null = null;
  private bookmarks: BookmarkItem[] = [];
  private listeners: Array<() => void> = [];
  private authListeners: Array<(user: UserProfile | null) => void> = [];
  private isFirebaseInitialized: boolean = false;

  constructor() {
    this.loadLocalData();
    this.initFirebaseIfConfigured();
  }

  private loadLocalData() {
    try {
      const savedUser = localStorage.getItem(LOCAL_USER_KEY);
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      } else {
        this.user = DEFAULT_DEMO_USER;
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(this.user));
      }

      const savedBookmarks = localStorage.getItem(LOCAL_BOOKMARKS_KEY);
      if (savedBookmarks) {
        this.bookmarks = JSON.parse(savedBookmarks);
      }
    } catch (e) {
      this.user = DEFAULT_DEMO_USER;
      this.bookmarks = [];
    }
  }

  private initFirebaseIfConfigured() {
    // If window.firebase is loaded and user provided config
    try {
      const savedConfig = localStorage.getItem(FIREBASE_CONFIG_KEY);
      if (savedConfig && (window as any).firebase) {
        const config: FirebaseConfig = JSON.parse(savedConfig);
        if (config.apiKey && !(window as any).firebase.apps?.length) {
          (window as any).firebase.initializeApp(config);
          this.isFirebaseInitialized = true;
          console.log('Firebase initialized with custom credentials');
        }
      }
    } catch (e) {
      console.warn('Firebase auto-init skipped, using local reactive sanctuary store:', e);
    }
  }

  public getCurrentUser(): UserProfile | null {
    return this.user;
  }

  public subscribeAuth(callback: (user: UserProfile | null) => void): () => void {
    this.authListeners.push(callback);
    callback(this.user);
    return () => {
      this.authListeners = this.authListeners.filter(l => l !== callback);
    };
  }

  public subscribeBookmarks(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  private notifyAuth() {
    this.authListeners.forEach(cb => cb(this.user));
  }

  public async signInWithGoogle(): Promise<UserProfile> {
    // If live firebase is available with auth
    const firebase = (window as any).firebase;
    if (this.isFirebaseInitialized && firebase && firebase.auth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const fbUser = result.user;
        const profile: UserProfile = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'Google Explorer',
          email: fbUser.email,
          photoURL: fbUser.photoURL || DEFAULT_DEMO_USER.photoURL,
          isAnonymous: false
        };
        this.user = profile;
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
        this.notifyAuth();
        await this.syncFromFirestore();
        return profile;
      } catch (err) {
        console.warn('Firebase Google Auth popup failed, using simulated OAuth session:', err);
      }
    }

    // High-fidelity instant Google OAuth profile simulation
    const simulatedGoogleUser: UserProfile = {
      uid: 'google_user_' + Math.random().toString(36).substring(2, 9),
      displayName: 'Sneha Kumari',
      email: 'snehakumari@gmail.com',
      photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      isAnonymous: false
    };
    this.user = simulatedGoogleUser;
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(simulatedGoogleUser));
    this.notifyAuth();
    return simulatedGoogleUser;
  }

  public async signInAnonymously(): Promise<UserProfile> {
    const guestUser: UserProfile = {
      uid: 'guest_' + Math.random().toString(36).substring(2, 9),
      displayName: 'Aura Traveler (Guest)',
      email: null,
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      isAnonymous: true
    };
    this.user = guestUser;
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(guestUser));
    this.notifyAuth();
    return guestUser;
  }

  public async signOut(): Promise<void> {
    const firebase = (window as any).firebase;
    if (this.isFirebaseInitialized && firebase && firebase.auth) {
      try {
        await firebase.auth().signOut();
      } catch (e) {}
    }
    this.user = null;
    localStorage.removeItem(LOCAL_USER_KEY);
    this.notifyAuth();
  }

  public getBookmarks(): BookmarkItem[] {
    return this.bookmarks;
  }

  public isBookmarked(id: string): boolean {
    return this.bookmarks.some(b => b.id === id || b.data.id === id);
  }

  public async addBookmark(item: BookmarkItem): Promise<void> {
    if (this.isBookmarked(item.id)) return;

    this.bookmarks.unshift(item);
    this.saveLocalBookmarks();
    this.notify();

    // Firestore sync if connected
    const firebase = (window as any).firebase;
    if (this.isFirebaseInitialized && firebase && firebase.firestore && this.user) {
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(this.user.uid).collection('bookmarks').doc(item.id).set(item);
      } catch (e) {
        console.warn('Firestore write failed, stored in persistent local cache:', e);
      }
    }
  }

  public async removeBookmark(id: string): Promise<void> {
    this.bookmarks = this.bookmarks.filter(b => b.id !== id && b.data.id !== id);
    this.saveLocalBookmarks();
    this.notify();

    const firebase = (window as any).firebase;
    if (this.isFirebaseInitialized && firebase && firebase.firestore && this.user) {
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(this.user.uid).collection('bookmarks').doc(id).delete();
      } catch (e) {
        console.warn('Firestore delete failed:', e);
      }
    }
  }

  private saveLocalBookmarks() {
    try {
      localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(this.bookmarks));
    } catch (e) {}
  }

  public async syncFromFirestore(): Promise<void> {
    const firebase = (window as any).firebase;
    if (this.isFirebaseInitialized && firebase && firebase.firestore && this.user) {
      try {
        const db = firebase.firestore();
        const snap = await db.collection('users').doc(this.user.uid).collection('bookmarks').get();
        const remoteItems: BookmarkItem[] = [];
        snap.forEach((doc: any) => remoteItems.push(doc.data() as BookmarkItem));
        if (remoteItems.length > 0) {
          this.bookmarks = remoteItems;
          this.saveLocalBookmarks();
          this.notify();
        }
      } catch (e) {
        console.warn('Firestore sync failed:', e);
      }
    }
  }
}

export const firebaseService = new FirebaseService();
