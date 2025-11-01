// Ganti URL ini dengan URL API Anda
const SONG_API_URL = 'https://69032147d0f10a340b22c77e.mockapi.io/api/v1/songs';

// ----------- FILMS DATA (Tidak diubah) -------------
export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string; 
  running_time: string; 
  rt_score: string;
  image?: string;       
  movie_banner?: string;
};

export async function getFilms(): Promise<Film[]> {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}

export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch film');
  return res.json();
}


// ===========================================
// ----------- SONGS DATA (DIPERBAIKI) -------
// ===========================================

/**
 * Tipe data Song
 * PENTING: Ini harus cocok dengan schema mockapi.io Anda
 */
export type Song = {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  genre: string;      // <-- TAMBAHKAN INI
  score: string;    // <-- TAMBAHKAN INI (atau 'number' jika Anda set di API)
  description: string; // <-- TAMBAHKAN INI
};

/**
 * Mengambil SEMUA lagu dari API mockapi.io
 */
export async function getSongs(): Promise<Song[]> {
  try {
    const res = await fetch(SONG_API_URL);
    if (!res.ok) {
      throw new Error('Gagal mengambil data lagu');
    }
    const data: Song[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error di getSongs:", error);
    return []; // Kembalikan array kosong jika error
  }
}

/**
 * Mengambil SATU lagu berdasarkan ID dari API mockapi.io
 */
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const res = await fetch(`${SONG_API_URL}/${id}`);
    if (!res.ok) {
      throw new Error('Gagal mengambil detail lagu');
    }
    const data: Song = await res.json();
    return data;
  } catch (error) {
    console.error(`Error di getSongById (id: ${id}):`, error);
    return null; // Kembalikan null jika error
  }
}