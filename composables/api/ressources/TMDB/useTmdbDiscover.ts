import type { TmdbPagedResponse } from '~/types/ressources/TMDB/common'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import { useRequest } from '../../useRequest'

export const useTmdbDiscover = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    discoverMovies: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/discover/movie', params),

    discoverTV: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>('/discover/tv', params),

    getTopRatedMovies: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/movie/top_rated', params),

    getTopRatedTV: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>('/tv/top_rated', params),

    getNowPlayingMovies: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/movie/now_playing', params),

    getUpcomingMovies: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/movie/upcoming', params),

    getPopularMovies: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>('/movie/popular', params),

    getPopularTV: (params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>('/tv/popular', params),
  }
}