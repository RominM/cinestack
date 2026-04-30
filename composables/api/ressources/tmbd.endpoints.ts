import type {
  TmdbMovie,
  TmdbMovieDetail,
  TmdbCredits,
  TmdbVideos,
  TmdbImages,
  TmdbPagedResponse,
} from '~/types/ressources/tmdb'
import { useRequest } from '../useRequest'

export const tmdbEndpoints = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    trending: {
      movies: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/trending/movie/week', params),
    },

    movie: {
      detail: (id: number | string) =>
        fetch<TmdbMovieDetail>(`/movie/${id}`),

      credits: (id: number | string) =>
        fetch<TmdbCredits>(`/movie/${id}/credits`),

      videos: (id: number | string) =>
        fetch<TmdbVideos>(`/movie/${id}/videos`),

      images: (id: number | string) =>
        fetch<TmdbImages>(`/movie/${id}/images`),

      similar: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/similar`, params),

      recommendations: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/recommendations`, params),

      search: (query: string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/search/movie', { query, ...params }),
    },
  }
}