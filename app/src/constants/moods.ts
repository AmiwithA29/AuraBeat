import { MoodMetadata, MoodType } from '../types';

export const MOODS: Record<MoodType, MoodMetadata> = {
  happy: {
    id: 'happy',
    label: 'Euphoric & Joyful',
    emoji: '✨',
    valence: 'High Positive (+0.92)',
    frequency: '528Hz Love & Transformation',
    bpm: '124 BPM • Vibrant',
    color: '#facc15', // Gold / Amber
    accentColor: '#f59e0b',
    quote: '"Joy is the simplest form of gratitude."',
    description: 'Upbeat anthems, celebratory rhythms, and vibrant literature that spark enthusiasm and connection.',
    musicQueries: {
      bollywood: 'bollywood dance party hit',
      globalPop: 'happy pop upbeat anthems',
      indie: 'feel good indie pop',
      lofi: 'happy lofi morning beats',
      electronic: 'uplifting house dance'
    },
    bookCategory: 'Humor & Uplifting Fiction',
    bookSearchQuery: 'subject:humor+joyful+adventure'
  },
  sad: {
    id: 'sad',
    label: 'Melancholy & Healing',
    emoji: '🌧️',
    valence: 'Cathartic Sensitive (-0.68)',
    frequency: '396Hz Liberation of Guilt & Sorrow',
    bpm: '65 BPM • Mellow',
    color: '#818cf8', // Indigo / Soft Blue
    accentColor: '#6366f1',
    quote: '"Tears are words that need to be written."',
    description: 'Cathartic acoustic strings, tender lyrics, and compassionate books that accompany you through the storm.',
    musicQueries: {
      bollywood: 'bollywood sad soulful unplugged',
      globalPop: 'melancholy emotional acoustic',
      indie: 'sad indie folk ballad',
      lofi: 'sad lofi rain midnight',
      electronic: 'chillwave emotional ambient'
    },
    bookCategory: 'Healing Fiction & Grief Memoirs',
    bookSearchQuery: 'subject:healing+resilience+compassion'
  },
  chill: {
    id: 'chill',
    label: 'Nocturne & Stillness',
    emoji: '🌙',
    valence: 'Neutral Calm (0.00)',
    frequency: '432Hz Cosmic Equilibrium',
    bpm: '78 BPM • Murky',
    color: '#38bdf8', // Cyan / Sky
    accentColor: '#0284c7',
    quote: '"Silence is not empty; it is full of answers."',
    description: 'Binaural lo-fi, tranquil ambient tapestries, and philosophical prose designed for serene contemplation.',
    musicQueries: {
      bollywood: 'bollywood soothing acoustic chill',
      globalPop: 'chill pop atmospheric',
      indie: 'dream pop shoegaze',
      lofi: 'midnight tokyo cyber lofi',
      electronic: 'downtempo ambient chill'
    },
    bookCategory: 'Atmospheric Fiction & Philosophy',
    bookSearchQuery: 'subject:philosophy+contemplation+solitude'
  },
  energetic: {
    id: 'energetic',
    label: 'Kinetic & Electric',
    emoji: '⚡',
    valence: 'High Arousal (+0.85)',
    frequency: '639Hz Harmonic Resonance',
    bpm: '138 BPM • Driving',
    color: '#f43f5e', // Rose / Crimson
    accentColor: '#e11d48',
    quote: '"Energy flows where attention goes."',
    description: 'Pumping basslines, driving synthwave, and adrenaline-charged fiction that push your boundaries.',
    musicQueries: {
      bollywood: 'bollywood energetic gym workout',
      globalPop: 'power pop workout hits',
      indie: 'indie rock high energy',
      lofi: 'synthwave cyberpunk beats',
      electronic: 'edm festival electro house'
    },
    bookCategory: 'Fast-Paced Thrillers & Peak Performance',
    bookSearchQuery: 'subject:thriller+adventure+psychology'
  },
  romantic: {
    id: 'romantic',
    label: 'Velvet Romance',
    emoji: '🌹',
    valence: 'Warm Affection (+0.78)',
    frequency: '528Hz Heart Resonance',
    bpm: '88 BPM • Intimate',
    color: '#ec4899', // Pink / Rose
    accentColor: '#db2777',
    quote: '"Whatever our souls are made of, his and mine are the same."',
    description: 'Sensual acoustics, velvety Bollywood duets, and heartfelt poetry that celebrate love in all its nuances.',
    musicQueries: {
      bollywood: 'bollywood romantic love melodies',
      globalPop: 'romantic pop ballads',
      indie: 'indie acoustic love songs',
      lofi: 'cozy romantic lofi chill',
      electronic: 'melodic deep house romance'
    },
    bookCategory: 'Literary Romance & Poetry',
    bookSearchQuery: 'subject:romance+poetry+love'
  },
  focus: {
    id: 'focus',
    label: 'Deep Flow & Focus',
    emoji: '🧠',
    valence: 'Mindful Centered (+0.45)',
    frequency: '14Hz Beta/Alpha Waves',
    bpm: '90 BPM • Steady',
    color: '#a855f7', // Electric Violet
    accentColor: '#9333ea',
    quote: '"Focus is a muscle; silence is its gym."',
    description: 'Cognitive soundscapes, distraction-free modern instrumentals, and deep-work literature for effortless flow.',
    musicQueries: {
      bollywood: 'bollywood instrumental flute sitar meditation',
      globalPop: 'piano study neo-classical',
      indie: 'ambient post-rock focus',
      lofi: 'deep focus study lofi 432hz',
      electronic: 'binaural beats brain wave study'
    },
    bookCategory: 'Deep Work, Productivity & Science',
    bookSearchQuery: 'subject:psychology+science+productivity'
  }
};
