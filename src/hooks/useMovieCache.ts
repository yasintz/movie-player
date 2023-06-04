import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MovieType = {
  name: string;
  time?: number;
  adjustment?: number;
};

interface MovieCacheState {
  movies: Array<MovieType>;
  updateTime: (name: string, value: Partial<Omit<MovieType, 'name'>>) => void;
}

const useMovieCache = create<MovieCacheState>()(
  persist(
    (set) => ({
      movies: [],
      updateTime: (name, newValues) =>
        set((state) => {
          const previous = state.movies.find((m) => m.name === name);

          return {
            movies: [
              ...state.movies.filter((m) => m.name !== name),
              {
                name,
                ...previous,
                ...newValues,
              },
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
