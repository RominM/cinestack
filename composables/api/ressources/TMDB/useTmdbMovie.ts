import type { TmdbPagedResponse, TmdbCredits, TmdbVideos, TmdbImages } from '~/types/ressources/TMDB/common'
import type { TmdbMovie, TmdbMovieDetail } from '~/types/ressources/TMDB/movie'
import { useRequest } from '../../useRequest'

export const useTmdbMovie = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    getMovieDetail: (id: number | string) =>
      fetch<TmdbMovieDetail>(`/movie/${id}`),

    getMovieCredits: (id: number | string) =>
      fetch<TmdbCredits>(`/movie/${id}/credits`),

    getMovieVideos: (id: number | string) =>
      fetch<TmdbVideos>(`/movie/${id}/videos`),

    getMovieImages: (id: number | string) =>
      fetch<TmdbImages>(`/movie/${id}/images`),

    getMovieSimilar: (id: number | string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/similar`, params),

    getMovieRecommendations: (id: number | string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/recommendations`, params),
  }
}