import type { TmdbGenre, TmdbRequestResult } from '~/types/ressources/TMDB/common'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

type TmdbGenreList = { genres: TmdbGenre[] }

export const useTmdbGenre = () => {
  const { get } = useRequest()
  const path = BASE_TMDB_PATH

  return {
    getMovieGenres: async (): TmdbRequestResult<TmdbGenreList> => {
      const { data, error } = await get<TmdbGenreList>(`${path}/genre/movie/list`)
      return { data, error }
    },

    getTVGenres: async (): TmdbRequestResult<TmdbGenreList> => {
      const { data, error } = await get<TmdbGenreList>(`${path}/genre/tv/list`)
      return { data, error }
    },
  }
}