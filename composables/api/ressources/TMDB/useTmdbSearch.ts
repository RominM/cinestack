import type { TmdbPagedResponse } from '~/types/ressources/TMDB/common'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import type { TmdbPerson } from '~/types/ressources/TMDB/person'
import { useRequest } from '../../useRequest'

export const useTmdbSearch = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    searchMovies: (query: string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/search/movie', { query, ...params }),

    searchTV: (query: string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>('/search/tv', { query, ...params }),

    searchPeople: (query: string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbPerson>>('/search/person', { query, ...params }),

    searchMulti: (query: string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie | TmdbTV | TmdbPerson>>('/search/multi', { query, ...params }),
  }
}