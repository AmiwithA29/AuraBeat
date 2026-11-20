import { Book, MoodType } from '../types';

const CURATED_SEED_BOOKS: Record<MoodType, Book[]> = {
  happy: [
    {
      id: 'b-h-1',
      title: 'The House in the Cerulean Sea',
      authors: ['TJ Klune'],
      description: 'A delightful, uplifting fantasy about an unlikely family found in an unexpected place, filled with heart and humor.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569514209i/45047384.jpg',
      category: 'Whimsical Uplifting Fiction',
      pageCount: 396,
      rating: 4.8,
      publishedYear: '2020',
      previewLink: 'https://books.google.com/books?id=8V2mDwAAQBAJ',
      mood: 'happy'
    },
    {
      id: 'b-h-2',
      title: 'Good Omens',
      authors: ['Neil Gaiman', 'Terry Pratchett'],
      description: 'The hilarious international classic about the apocalypse, a fussy angel, and a fast-living demon who have grown fond of Earth.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1615552073i/12067.jpg',
      category: 'Satirical Fantasy & Comedy',
      pageCount: 412,
      rating: 4.7,
      publishedYear: '1990',
      previewLink: 'https://books.google.com/books?id=0gD_AgAAQBAJ',
      mood: 'happy'
    },
    {
      id: 'b-h-3',
      title: 'Born a Crime: Stories from a South African Childhood',
      authors: ['Trevor Noah'],
      description: 'The compelling, inspiring, and comically inventive story of a young boy making his way through a damaged world.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1473867911i/29780253.jpg',
      category: 'Memoir & Humor',
      pageCount: 304,
      rating: 4.9,
      publishedYear: '2016',
      previewLink: 'https://books.google.com/books?id=9G3xDAAAQBAJ',
      mood: 'happy'
    },
    {
      id: 'b-h-4',
      title: 'A Man Called Ove',
      authors: ['Fredrik Backman'],
      description: 'A charming, heartwarming debut about a grumpy yet loveable curmudgeon whose quiet world gets turned upside down.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1405259930i/18774964.jpg',
      category: 'Heartwarming Contemporary',
      pageCount: 337,
      rating: 4.6,
      publishedYear: '2012',
      previewLink: 'https://books.google.com/books?id=lW7zAgAAQBAJ',
      mood: 'happy'
    }
  ],
  sad: [
    {
      id: 'b-s-1',
      title: 'The Midnight Library',
      authors: ['Matt Haig'],
      description: 'Between life and death there is a library where shelves go on forever. Nora Seed finds herself faced with the chance to undo regrets.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg',
      category: 'Philosophical Healing Fiction',
      pageCount: 304,
      rating: 4.6,
      publishedYear: '2020',
      previewLink: 'https://books.google.com/books?id=Y_jPDwAAQBAJ',
      mood: 'sad'
    },
    {
      id: 'b-s-2',
      title: 'The Comfort Book',
      authors: ['Matt Haig'],
      description: 'A collection of short, hopeful insights, life lessons, and reminders that there is always light at the end of every tunnel.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1614275151i/55825273.jpg',
      category: 'Mental Health & Comfort',
      pageCount: 272,
      rating: 4.7,
      publishedYear: '2021',
      previewLink: 'https://books.google.com/books?id=k40yEAAAQBAJ',
      mood: 'sad'
    },
    {
      id: 'b-s-3',
      title: 'Before the Coffee Gets Cold',
      authors: ['Toshikazu Kawaguchi'],
      description: 'In a small back alley in Tokyo, there is a cafe that allows customers to travel back in time, provided they return before the coffee gets cold.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1594917454i/44421460.jpg',
      category: 'Magical Realism & Grief',
      pageCount: 213,
      rating: 4.5,
      publishedYear: '2015',
      previewLink: 'https://books.google.com/books?id=01bSDwAAQBAJ',
      mood: 'sad'
    },
    {
      id: 'b-s-4',
      title: 'When Breath Becomes Air',
      authors: ['Paul Kalanithi'],
      description: 'A profoundly moving, exquisitely observed memoir by a young neurosurgeon faced with a terminal diagnosis.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1492677644i/25899336.jpg',
      category: 'Memoir & Philosophy',
      pageCount: 228,
      rating: 4.8,
      publishedYear: '2016',
      previewLink: 'https://books.google.com/books?id=0kI-CgAAQBAJ',
      mood: 'sad'
    }
  ],
  chill: [
    {
      id: 'b-c-1',
      title: 'Norwegian Wood',
      authors: ['Haruki Murakami'],
      description: 'A poignant story of one college student’s romantic coming-of-age against a backdrop of Tokyo jazz clubs, snow, and solitude.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630500914i/11297.jpg',
      category: 'Literary Japanese Fiction',
      pageCount: 296,
      rating: 4.5,
      publishedYear: '1987',
      previewLink: 'https://books.google.com/books?id=OQyBDwAAQBAJ',
      mood: 'chill'
    },
    {
      id: 'b-c-2',
      title: 'Walden and Civil Disobedience',
      authors: ['Henry David Thoreau'],
      description: 'Thoreau’s masterwork on living deliberately, stripping life down to its essential terms in the quiet majesty of nature.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388180373i/16902.jpg',
      category: 'Philosophy & Solitude',
      pageCount: 352,
      rating: 4.4,
      publishedYear: '1854',
      previewLink: 'https://books.google.com/books?id=9H1_AwAAQBAJ',
      mood: 'chill'
    },
    {
      id: 'b-c-3',
      title: 'The Book of Disquiet',
      authors: ['Fernando Pessoa'],
      description: 'The monumental prose masterpiece of poetic contemplation and quiet existential intimacy in Lisbon.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388651811i/45974.jpg',
      category: 'Nocturne Prose & Philosophy',
      pageCount: 544,
      rating: 4.7,
      publishedYear: '1982',
      previewLink: 'https://books.google.com/books?id=3RrkDwAAQBAJ',
      mood: 'chill'
    },
    {
      id: 'b-c-4',
      title: 'Days at the Morisaki Bookshop',
      authors: ['Satoshi Yagisawa'],
      description: 'Set in the historic neighborhood of Jimbocho, Tokyo, a heartwarming celebration of used books, quiet cafes, and healing.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684784347i/123163141.jpg',
      category: 'Cozy Japanese Fiction',
      pageCount: 160,
      rating: 4.5,
      publishedYear: '2023',
      previewLink: 'https://books.google.com/books?id=e7WdEAAAQBAJ',
      mood: 'chill'
    }
  ],
  energetic: [
    {
      id: 'b-e-1',
      title: 'Dark Matter',
      authors: ['Blake Crouch'],
      description: 'A mind-bending, relentlessly paced psychological sci-fi thriller about the choices we make and how far we’ll go to claim the lives we dream of.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1472119680i/27833670.jpg',
      category: 'Fast-Paced Sci-Fi Thriller',
      pageCount: 342,
      rating: 4.7,
      publishedYear: '2016',
      previewLink: 'https://books.google.com/books?id=r_PXCwAAQBAJ',
      mood: 'energetic'
    },
    {
      id: 'b-e-2',
      title: 'Project Hail Mary',
      authors: ['Andy Weir'],
      description: 'A lone astronaut must save the Earth from an extinction-level catastrophe in this thrilling, witty interstellar mission.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
      category: 'Epic Hard Sci-Fi',
      pageCount: 476,
      rating: 4.9,
      publishedYear: '2021',
      previewLink: 'https://books.google.com/books?id=1VqxEAAAQBAJ',
      mood: 'energetic'
    },
    {
      id: 'b-e-3',
      title: 'Shoe Dog: A Memoir by the Creator of Nike',
      authors: ['Phil Knight'],
      description: 'An uncensored, riveting look at the perilous, high-stakes journey of building a legendary global brand from scratch.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1457284880i/27220736.jpg',
      category: 'High-Performance Memoir',
      pageCount: 400,
      rating: 4.8,
      publishedYear: '2016',
      previewLink: 'https://books.google.com/books?id=43k_CwAAQBAJ',
      mood: 'energetic'
    },
    {
      id: 'b-e-4',
      title: 'Red Rising',
      authors: ['Pierce Brown'],
      description: 'A high-octane, visceral dystopian epic of rebellion, revenge, and the fight for freedom in a hierarchical society.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1435773177i/15839976.jpg',
      category: 'Action Space Opera',
      pageCount: 382,
      rating: 4.8,
      publishedYear: '2014',
      previewLink: 'https://books.google.com/books?id=0f5mBAAAQBAJ',
      mood: 'energetic'
    }
  ],
  romantic: [
    {
      id: 'b-r-1',
      title: 'The Song of Achilles',
      authors: ['Madeline Miller'],
      description: 'A breathtakingly lyrical reimagining of Homer’s Iliad—a profound tale of gods, kings, immortal fame, and enduring love.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334408481i/11250317.jpg',
      category: 'Mythological Romance',
      pageCount: 378,
      rating: 4.8,
      publishedYear: '2011',
      previewLink: 'https://books.google.com/books?id=y1WjDwAAQBAJ',
      mood: 'romantic'
    },
    {
      id: 'b-r-2',
      title: 'Normal People',
      authors: ['Sally Rooney'],
      description: 'The exquisite, electric novel about mutual fascination, friendship, and first love that explores how one person can change your life.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1571424190i/41057294.jpg',
      category: 'Contemporary Romance',
      pageCount: 273,
      rating: 4.6,
      publishedYear: '2018',
      previewLink: 'https://books.google.com/books?id=oP3rDwAAQBAJ',
      mood: 'romantic'
    },
    {
      id: 'b-r-3',
      title: 'Call Me by Your Name',
      authors: ['André Aciman'],
      description: 'An impassioned romance between a teenage prodigy and a summer guest at his parents’ cliffside Italian mansion.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1498144673i/3633607.jpg',
      category: 'Sensual Literary Romance',
      pageCount: 248,
      rating: 4.7,
      publishedYear: '2007',
      previewLink: 'https://books.google.com/books?id=8x-dAwAAQBAJ',
      mood: 'romantic'
    },
    {
      id: 'b-r-4',
      title: 'Me Before You',
      authors: ['Jojo Moyes'],
      description: 'A heartbreak-laced love story between an eccentric small-town girl and a quadriplegic former high-flyer.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586940877i/17347634.jpg',
      category: 'Emotional Romance',
      pageCount: 369,
      rating: 4.7,
      publishedYear: '2012',
      previewLink: 'https://books.google.com/books?id=jWz3AgAAQBAJ',
      mood: 'romantic'
    }
  ],
  focus: [
    {
      id: 'b-f-1',
      title: 'Atomic Habits',
      authors: ['James Clear'],
      description: 'An easy & proven way to build good habits and break bad ones. The definitive guide on human behavior and neuro-plasticity.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg',
      category: 'Behavioral Psychology & Focus',
      pageCount: 320,
      rating: 4.9,
      publishedYear: '2018',
      previewLink: 'https://books.google.com/books?id=fFCjDQAAQBAJ',
      mood: 'focus'
    },
    {
      id: 'b-f-2',
      title: 'Deep Work: Rules for Focused Success',
      authors: ['Cal Newport'],
      description: 'One of the most valuable skills in our economy is becoming increasingly rare. If you master this skill, you’ll achieve extraordinary results.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg',
      category: 'Cognitive Science & Mastery',
      pageCount: 296,
      rating: 4.7,
      publishedYear: '2016',
      previewLink: 'https://books.google.com/books?id=Z0JmCAAAQBAJ',
      mood: 'focus'
    },
    {
      id: 'b-f-3',
      title: 'Thinking, Fast and Slow',
      authors: ['Daniel Kahneman'],
      description: 'Nobel laureate Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg',
      category: 'Neuroscience & Decision Making',
      pageCount: 499,
      rating: 4.7,
      publishedYear: '2011',
      previewLink: 'https://books.google.com/books?id=ZuKTvERuNWUC',
      mood: 'focus'
    },
    {
      id: 'b-f-4',
      title: 'Flow: The Psychology of Optimal Experience',
      authors: ['Mihaly Csikszentmihalyi'],
      description: 'Legendary psychologist Mihaly Csikszentmihalyi’s famous investigations of what really makes people satisfied in work and life.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1410137521i/66354.jpg',
      category: 'Positive Psychology & Flow',
      pageCount: 303,
      rating: 4.6,
      publishedYear: '1990',
      previewLink: 'https://books.google.com/books?id=V7s7zQEACAAJ',
      mood: 'focus'
    }
  ]
};

export async function fetchBooksForMood(mood: MoodType): Promise<Book[]> {
  const seed = CURATED_SEED_BOOKS[mood] || CURATED_SEED_BOOKS.chill;

  try {
    // Attempt Google Books API fetch with short timeout
    const query = encodeURIComponent(`${mood} mood fiction literature`);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6&orderBy=relevance`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const fetchedBooks: Book[] = data.items
          .filter((item: any) => item.volumeInfo && item.volumeInfo.title)
          .map((item: any, idx: number) => {
            const info = item.volumeInfo;
            const cover = (info.imageLinks && (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail))
              ? info.imageLinks.thumbnail.replace('http:', 'https:')
              : seed[idx % seed.length].coverUrl;

            return {
              id: item.id || `book-${idx}`,
              title: info.title,
              authors: info.authors || ['Curated Author'],
              description: info.description || 'An evocative literary journey selected for your emotional sanctuary.',
              coverUrl: cover,
              category: (info.categories && info.categories[0]) || seed[0].category,
              pageCount: info.pageCount || 280,
              rating: info.averageRating || 4.5,
              publishedYear: info.publishedDate ? info.publishedDate.substring(0, 4) : '2023',
              previewLink: info.previewLink || `https://books.google.com/books?id=${item.id}`,
              mood
            };
          });

        if (fetchedBooks.length >= 2) {
          // Merge to ensure we have at least 4 beautiful books
          const combined = [...fetchedBooks, ...seed];
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.title.toLowerCase() === v.title.toLowerCase()) === i);
          return unique.slice(0, 6);
        }
      }
    }
  } catch (err) {
    // Graceful fallback to rich curated books
    console.info('Using curated literary companion database for mood:', mood);
  }

  return seed;
}
