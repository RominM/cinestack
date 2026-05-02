import type { TmdbPagedResponse, TmdbRequestResult } from '~/types/ressources/TMDB/common'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import type { TmdbPerson } from '~/types/ressources/TMDB/person'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbSearch = () => {
  const { get } = useRequest()
  const path = `${BASE_TMDB_PATH}/search`

  return {
    searchMovies: async (query: string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie>>(`${path}/movie`, { params: { query, ...params } })
      return { data, error }
    },

    searchTV: async (query: string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/tv`, { params: { query, ...params } })
      return { data, error }
    },

    searchPeople: async (query: string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbPerson>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbPerson>>(`${path}/person`, { params: { query, ...params } })
      return { data, error }
    },

    searchMulti: async (query: string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbMovie | TmdbTV | TmdbPerson>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbMovie | TmdbTV | TmdbPerson>>(`${path}/multi`, { params: { query, ...params } })
      return { data, error }
    },
  }
}