import { MoodType, Song } from '../types';
import { MOODS } from '../constants/moods';

// Curated instant-cache songs with high-resolution artwork and preview tracks
const CURATED_SEED_SONGS: Record<MoodType, Song[]> = {
  happy: [
    {
      id: 'h-1',
      title: 'Kesariya (Dance Mix)',
      artist: 'Arijit Singh & Pritam',
      album: 'Brahmastra',
      artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Bollywood Dance',
      mood: 'happy',
      duration: 180,
      frequencyLabel: '528Hz Harmonic',
      origin: 'Bollywood'
    },
    {
      id: 'h-2',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Nu-Disco Pop',
      mood: 'happy',
      duration: 203,
      frequencyLabel: '124 BPM Disco',
      origin: 'Global Pop'
    },
    {
      id: 'h-3',
      title: 'Ilahi',
      artist: 'Arijit Singh',
      album: 'Yeh Jawaani Hai Deewani',
      artwork: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Bollywood Folk',
      mood: 'happy',
      duration: 215,
      frequencyLabel: 'Wanderlust Acoustic',
      origin: 'Bollywood'
    },
    {
      id: 'h-4',
      title: 'Sunroof',
      artist: 'Nicky Youre & dazy',
      album: 'Sunroof - Single',
      artwork: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Indie Pop',
      mood: 'happy',
      duration: 163,
      frequencyLabel: 'Golden Hour Sunshine',
      origin: 'Indie'
    }
  ],
  sad: [
    {
      id: 's-1',
      title: 'Channa Mereya',
      artist: 'Arijit Singh & Pritam',
      album: 'Ae Dil Hai Mushkil',
      artwork: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Sufi Soul',
      mood: 'sad',
      duration: 289,
      frequencyLabel: '396Hz Sorrow Relief',
      origin: 'Bollywood'
    },
    {
      id: 's-2',
      title: 'Someone Like You',
      artist: 'Adele',
      album: '21',
      artwork: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Piano Ballad',
      mood: 'sad',
      duration: 285,
      frequencyLabel: 'Cathartic Resonance',
      origin: 'Global Pop'
    },
    {
      id: 's-3',
      title: 'Kasoor (Acoustic)',
      artist: 'Prateek Kuhad',
      album: 'Kasoor',
      artwork: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Indie Folk',
      mood: 'sad',
      duration: 198,
      frequencyLabel: 'Gentle Tears',
      origin: 'Indie'
    },
    {
      id: 's-4',
      title: 'Rainy Night In Tokyo',
      artist: 'Kainbeats & Lofi Fruits',
      album: 'Solitude Tapestry',
      artwork: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Lo-Fi Chill',
      mood: 'sad',
      duration: 142,
      frequencyLabel: '432Hz Binaural Drops',
      origin: 'Lo-Fi'
    }
  ],
  chill: [
    {
      id: 'c-1',
      title: 'Midnight Cyber Lo-Fi',
      artist: 'Tokyo Soundworks',
      album: 'Echoes of Stillness',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Cyber Lo-Fi',
      mood: 'chill',
      duration: 165,
      frequencyLabel: '432Hz Harmonic',
      origin: 'Lo-Fi'
    },
    {
      id: 'c-2',
      title: 'Husn',
      artist: 'Anuv Jain',
      album: 'Husn - Single',
      artwork: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Acoustic Indie',
      mood: 'chill',
      duration: 218,
      frequencyLabel: 'Velvet Midnight',
      origin: 'Indie'
    },
    {
      id: 'c-3',
      title: 'Weightless',
      artist: 'Marconi Union',
      album: 'Ambient Transmissions',
      artwork: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Deep Ambient',
      mood: 'chill',
      duration: 485,
      frequencyLabel: 'Alpha Brainwave 8Hz',
      origin: 'Electronic'
    },
    {
      id: 'c-4',
      title: 'Sunflower',
      artist: 'Post Malone & Swae Lee',
      album: 'Spider-Man: Into the Spider-Verse',
      artwork: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Chill Hop / Pop',
      mood: 'chill',
      duration: 158,
      frequencyLabel: 'Warm Sunset Breeze',
      origin: 'Global Pop'
    }
  ],
  energetic: [
    {
      id: 'e-1',
      title: 'G.O.A.T.',
      artist: 'Diljit Dosanjh',
      album: 'G.O.A.T.',
      artwork: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Punjabi Hip-Hop',
      mood: 'energetic',
      duration: 224,
      frequencyLabel: '140 BPM Hype',
      origin: 'Bollywood'
    },
    {
      id: 'e-2',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      artwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Synthwave Pop',
      mood: 'energetic',
      duration: 200,
      frequencyLabel: '171 BPM Adrenaline',
      origin: 'Global Pop'
    },
    {
      id: 'e-3',
      title: 'Titanium (feat. Sia)',
      artist: 'David Guetta',
      album: 'Nothing But the Beat',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Festival EDM',
      mood: 'energetic',
      duration: 245,
      frequencyLabel: 'Unbreakable Bass',
      origin: 'Electronic'
    },
    {
      id: 'e-4',
      title: 'Brown Munde',
      artist: 'AP Dhillon, Gurinder Gill, Shinda Kahlon',
      album: 'Brown Munde',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Desi Trap',
      mood: 'energetic',
      duration: 268,
      frequencyLabel: 'Pure Bass Punch',
      origin: 'Bollywood'
    }
  ],
  romantic: [
    {
      id: 'r-1',
      title: 'Tum Hi Ho',
      artist: 'Arijit Singh & Mithoon',
      album: 'Aashiqui 2',
      artwork: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Romantic Ballad',
      mood: 'romantic',
      duration: 262,
      frequencyLabel: '528Hz Love Tone',
      origin: 'Bollywood'
    },
    {
      id: 'r-2',
      title: 'Perfect',
      artist: 'Ed Sheeran',
      album: '÷ (Divide)',
      artwork: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Acoustic Romance',
      mood: 'romantic',
      duration: 263,
      frequencyLabel: 'Slow Waltz 63 BPM',
      origin: 'Global Pop'
    },
    {
      id: 'r-3',
      title: 'Pee Loon',
      artist: 'Mohit Chauhan',
      album: 'Once Upon A Time In Mumbaai',
      artwork: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Bollywood Sufi Romance',
      mood: 'romantic',
      duration: 288,
      frequencyLabel: 'Intimate Serenade',
      origin: 'Bollywood'
    },
    {
      id: 'r-4',
      title: 'golden hour',
      artist: 'JVKE',
      album: 'this is what ____ feels like',
      artwork: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Cinematic Pop',
      mood: 'romantic',
      duration: 209,
      frequencyLabel: 'Velvet Sunset',
      origin: 'Indie'
    }
  ],
  focus: [
    {
      id: 'f-1',
      title: 'Experience',
      artist: 'Ludovico Einaudi',
      album: 'In A Time Lapse',
      artwork: 'https://images.unsplash.com/photo-1520523839898-507127050965?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e2/3f/37/e23f379f-8ef8-34c6-03fb-e76e8b53a87a/mzaf_9903490549288360679.plus.aac.p.m4a',
      genre: 'Neo-Classical Piano',
      mood: 'focus',
      duration: 315,
      frequencyLabel: 'Deep Flow State',
      origin: 'Electronic'
    },
    {
      id: 'f-2',
      title: 'River Flows in You',
      artist: 'Yiruma',
      album: 'First Love',
      artwork: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/a0/19/eda019cf-2794-66d1-208d-2e2e74c26c3d/mzaf_16469762943852039623.plus.aac.p.m4a',
      genre: 'Piano Solo',
      mood: 'focus',
      duration: 188,
      frequencyLabel: 'Tranquil Clarity',
      origin: 'Global Pop'
    },
    {
      id: 'f-3',
      title: 'Binaural Alpha Waves 12Hz',
      artist: 'NeuroSound Lab',
      album: 'Cognitive Architecture',
      artwork: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/62/f7/d1/62f7d15f-1f9e-9861-2fa8-1767af540cfe/mzaf_5391884184509892578.plus.aac.p.m4a',
      genre: 'Binaural Drone',
      mood: 'focus',
      duration: 360,
      frequencyLabel: 'Alpha Brainwave',
      origin: 'Electronic'
    },
    {
      id: 'f-4',
      title: 'Deep Work Chillhop',
      artist: 'Lofi Coffee Roasters',
      album: 'Study Session vol 4',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ed/e3/9c/ede39c92-d58e-a9aa-47c1-034fffd5121f/mzaf_17009017109067882088.plus.aac.p.m4a',
      genre: 'Study Lo-Fi',
      mood: 'focus',
      duration: 154,
      frequencyLabel: 'High Productivity',
      origin: 'Lo-Fi'
    }
  ]
};

export async function fetchSongsForMood(mood: MoodType, category: 'all' | 'bollywood' | 'global' | 'indie' | 'lofi' = 'all'): Promise<Song[]> {
  const seed = CURATED_SEED_SONGS[mood] || CURATED_SEED_SONGS.chill;
  const moodMeta = MOODS[mood];

  try {
    let searchTerm = `${mood} music`;
    if (category === 'bollywood') {
      searchTerm = moodMeta.musicQueries.bollywood;
    } else if (category === 'global') {
      searchTerm = moodMeta.musicQueries.globalPop;
    } else if (category === 'indie') {
      searchTerm = moodMeta.musicQueries.indie;
    } else if (category === 'lofi') {
      searchTerm = moodMeta.musicQueries.lofi;
    } else {
      searchTerm = `${moodMeta.label} music`;
    }

    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=12&media=music`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(itunesUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return seed;
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return seed;
    }

    const fetchedSongs: Song[] = data.results
      .filter((item: any) => item.previewUrl)
      .map((item: any, idx: number) => {
        // Upgrade low-res artwork 100x100 to 600x600 for high-end aesthetic display
        const art = item.artworkUrl100
          ? item.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg')
          : seed[idx % seed.length].artwork;

        let origin: Song['origin'] = 'Global Pop';
        const artist = item.artistName || '';
        const track = item.trackName || '';
        if (category === 'bollywood' || /Arijit|Pritam|Rahman|Atif|Sonu|Shreya|Diljit|Karan|Badshah|Jubin/i.test(artist + track)) {
          origin = 'Bollywood';
        } else if (category === 'lofi' || /lofi|lo-fi|chillhop|relax/i.test(track)) {
          origin = 'Lo-Fi';
        } else if (category === 'indie' || /indie|folk|acoustic/i.test(item.primaryGenreName || '')) {
          origin = 'Indie';
        }

        return {
          id: String(item.trackId || `fetched-${idx}`),
          title: item.trackName || 'Harmonic Melody',
          artist: item.artistName || 'Unknown Artist',
          album: item.collectionName || 'Single Edition',
          artwork: art,
          previewUrl: item.previewUrl,
          genre: item.primaryGenreName || 'Contemporary',
          mood,
          duration: Math.round((item.trackTimeMillis || 180000) / 1000),
          frequencyLabel: moodMeta.frequency,
          releaseYear: item.releaseDate ? item.releaseDate.substring(0, 4) : '2024',
          origin
        };
      });

    // Merge curated seed with fetched songs to guarantee pristine results
    const combined = [...fetchedSongs, ...seed];
    const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id || t.title === v.title) === i);
    return unique.slice(0, 10);
  } catch (error) {
    console.warn('Network fetch skipped; serving pristine cached sanctuary tracks:', error);
    return seed;
  }
}
