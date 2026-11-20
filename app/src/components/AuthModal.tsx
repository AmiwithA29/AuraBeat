import React, { useState } from 'react';
import { UserProfile } from '../types';
import { firebaseService } from '../services/firebaseService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange
}) => {
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [authDomain, setAuthDomain] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const user = await firebaseService.signInWithGoogle();
      onUserChange(user);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
      const user = await firebaseService.signInAnonymously();
      onUserChange(user);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await firebaseService.signOut();
    onUserChange(null);
    onClose();
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && projectId) {
      const config = { apiKey, projectId, authDomain: authDomain || `${projectId}.firebaseapp.com` };
      localStorage.setItem('aurabeats_firebase_config', JSON.stringify(config));
      alert('Custom Firebase config saved! Reloading sanctuary...');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
      <div className="relative w-full max-w-md rounded-3xl bg-neutral-950 border border-white/20 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-500 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(76,215,246,0.5)] mb-3">
            <span className="text-2xl">⚡</span>
          </div>
          <h2 className="text-2xl font-serif text-white font-medium">
            Firebase Sanctuary Auth
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Synchronize your mood history, bookmarked tracks, and curated folios.
          </p>
        </div>

        {currentUser && !currentUser.isAnonymous ? (
          <div className="flex flex-col items-center space-y-4 py-4">
            <img
              src={currentUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
              alt={currentUser.displayName || 'User'}
              className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-lg object-cover"
            />
            <div className="text-center">
              <h3 className="text-lg font-serif text-white">{currentUser.displayName}</h3>
              <p className="text-xs text-white/50 font-mono">{currentUser.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-full bg-rose-500/20 border border-rose-500/50 hover:bg-rose-500/30 text-rose-300 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
            >
              Sign Out of Firebase
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-3 hover:bg-neutral-200 transition-all shadow-lg cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.15C3.25 21.36 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.25C.45 8.22 0 10.06 0 12s.45 3.78 1.25 5.39l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.25 6.61l4.02 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={handleGuestSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Continue as Anonymous Guest
            </button>
          </div>
        )}

        {/* Custom Firebase Credentials Accordion */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="w-full text-left text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-between cursor-pointer"
          >
            <span>Custom Firebase Project Settings</span>
            <span>{showConfig ? '▲' : '▼'}</span>
          </button>

          {showConfig && (
            <form onSubmit={handleSaveFirebaseConfig} className="mt-3 space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-white/50 uppercase">API Key</label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-white/50 uppercase">Project ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                  placeholder="my-mood-app-123"
                  className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer"
              >
                Save & Initialize Live Firebase
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
