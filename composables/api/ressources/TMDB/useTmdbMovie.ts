import type { TmdbPagedResponse, TmdbRequestResult, TmdbCredits, TmdbVideos, TmdbImages } from '~/types/ressources/TMDB/common'
import type { TmdbMovie, TmdbMovieDetail } from '~/types/ressources/TMDB/movie'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbMovie = () => {
  const { get } = useRequest()
  const path = `${BASE_TMDB_PATH}/movie`

  return {
    getMovieDetail: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbMovieDetail> => {
      const { data, error } = await get<TmdbMovieDetail>(`${path}/${id}`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },

    getMovieCredits: async (id: number | string): TmdbRequestResult<TmdbCredits> => {
      const { data, error } = await get<TmdbCredits>(`${path}/${id}/credits`)
      if (!data || error) return { data, error }
      return { data, error }
    },

    getMovieVideos: async (id: number | string): TmdbRequestResult<TmdbVideos> => {
      const { data, error } = await get<TmdbVideos>(`${path}/${id}/videos`)
      if (!data || error) return { data, error }
      return { data, error }
    },

    getMovieImages: async (id: number | string): TmdbRequestResult<TmdbImages> => {
      const { data, error } = await get<TmdbImages>(`${path}/${id}/images`)
      if (!data || error) return { data, error }
      return { data, error }
    },

    getMovieSimilar: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/${id}/similar`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },

    getMovieRecommendations: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/${id}/recommendations`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },
  }
}