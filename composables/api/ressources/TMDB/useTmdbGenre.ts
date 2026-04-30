import type { TmdbGenre } from '~/types/ressources/TMDB/common'
import { useRequest } from '../../useRequest'

type TmdbGenreList = { genres: TmdbGenre[] }

export const useTmdbGenre = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string) =>
    get<T>(`/tmdb${endpoint}`)

  return {
    getMovieGenres: () =>
      fetch<TmdbGenreList>('/genre/movie/list'),

    getTVGenres: () =>
      fetch<TmdbGenreList>('/genre/tv/list'),
  }
}