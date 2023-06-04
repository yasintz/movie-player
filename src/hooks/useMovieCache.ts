import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MovieCacheState {
  movies: Array<{
    name: string;
    time: number;
  }>;
  updateTime: (name: string, time: number) => void;
}

const useMovieCache = create<MovieCacheState>()(
  persist(
    (set) => ({
      movies: [],
      updateTime: (name, time) =>
        set((state) => {
          const previous = state.movies.find((m) => m.name === name);

          return {
            movies: [
              ...state.movies.filter((m) => m.name !== name),
              { ...previous, name, time },
            ],
          };
        }),
    }),
    {
      name: 'movie-cache',
    }
  )
);

export default useMovieCache;
