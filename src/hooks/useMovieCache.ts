import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdjustmentType = {
  captionId: number;
  second: number;
};
export type MovieType = {
  name: string;
  time?: number;
  adjustment: AdjustmentType[];
};

interface MovieCacheState {
  movies: Array<MovieType>;
  updateTime: (name: string, time: number) => void;
  setAdjustments: (name: string, adj: AdjustmentType[]) => void;
  delete: (name: string) => void;
}

const useMovieCache = create<MovieCacheState>()(
  persist(
    (set) => ({
      movies: [],
      delete: (name) =>
        set((state) => ({
          movies: state.movies.filter((i) => i.name !== name),
        })),
      setAdjustments: (name, adjustment) =>
        set((state) => {
          const previous = state.movies.find((m) => m.name === name);

          return {
            movies: [
              ...state.movies.filter((m) => m.name !== name),
              {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...previous!,
                adjustment,
              },
            ],
          };
        }),
      updateTime: (name, time) =>
        set((state) => {
          const previous = state.movies.find((m) => m.name === name);

          return {
            movies: [
              ...state.movies.filter((m) => m.name !== name),
              {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ...previous!,
                name,
                time,
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
