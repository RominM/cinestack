import type { TmdbPagedResponse, TmdbRequestResult } from '~/types/ressources/TMDB/common'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbDiscover = () => {
  const { get } = useRequest()
  const path = BASE_TMDB_PATH

  return {
    discoverMovies: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/discover/movie`, { params })
      return { data, error }
    },

    discoverTV: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/discover/tv`, { params })
      return { data, error }
    },

    getTopRatedMovies: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/top_rated`, { params })
      return { data, error }
    },

    getTopRatedTV: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/tv/top_rated`, { params })
      return { data, error }
    },

    getNowPlayingMovies: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/now_playing`, { params })
      return { data, error }
    },

    getUpcomingMovies: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/upcoming`, { params })
      return { data, error }
    },

    getPopularMovies: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/popular`, { params })
      return { data, error }
    },

    getPopularTV: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/tv/popular`, { params })
      return { data, error }
    },
  }
}