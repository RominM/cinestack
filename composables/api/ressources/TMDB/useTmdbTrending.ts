import type { TmdbPagedResponse, TmdbRequestResult } from '~/types/ressources/TMDB/common'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import type { TmdbPerson } from '~/types/ressources/TMDB/person'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbTrending = () => {
  const { get } = useRequest()
  const path = `${BASE_TMDB_PATH}/trending`

  return {
    getTrendingMoviesByWeek: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/week`, { params })
      if (!data || error) return { data, error }
      
      return { data, error }
    },

    getTrendingMoviesByDay: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie/day`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },

    getTrendingTVByWeek: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/tv/week`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },

    getTrendingTVByDay: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/tv/day`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },

    getTrendingPeopleByWeek: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbPerson>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbPerson>>(`${path}/person/week`, { params })
      if (!data || error) return { data, error }
      return { data, error }
    },
  }
}