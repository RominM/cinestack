import type { TmdbPersonDetail, TmdbPersonImages, TmdbPersonCredits } from '~/types/ressources/TMDB/person'
import { useRequest } from '../../useRequest'

export const useTmdbPerson = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    getPersonDetail: (id: number | string) =>
      fetch<TmdbPersonDetail>(`/person/${id}`),

    getPersonMovieCredits: (id: number | string) =>
      fetch<TmdbPersonCredits>(`/person/${id}/movie_credits`),

    getPersonTVCredits: (id: number | string) =>
      fetch<TmdbPersonCredits>(`/person/${id}/tv_credits`),

    getPersonImages: (id: number | string) =>
      fetch<TmdbPersonImages>(`/person/${id}/images`),
  }
}