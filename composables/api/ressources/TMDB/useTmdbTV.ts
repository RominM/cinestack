import type { TmdbPagedResponse, TmdbCredits, TmdbVideos, TmdbImages } from '~/types/ressources/TMDB/common'
import type { TmdbTV, TmdbTVDetail, TmdbSeason, TmdbEpisode } from '~/types/ressources/TMDB/tv'
import { useRequest } from '../../useRequest'

export const useTmdbTV = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {
    getTVDetail: (id: number | string) =>
      fetch<TmdbTVDetail>(`/tv/${id}`),

    getTVCredits: (id: number | string) =>
      fetch<TmdbCredits>(`/tv/${id}/credits`),

    getTVVideos: (id: number | string) =>
      fetch<TmdbVideos>(`/tv/${id}/videos`),

    getTVImages: (id: number | string) =>
      fetch<TmdbImages>(`/tv/${id}/images`),

    getTVSeason: (id: number | string, season: number) =>
      fetch<TmdbSeason>(`/tv/${id}/season/${season}`),

    getTVEpisode: (id: number | string, season: number, episode: number) =>
      fetch<TmdbEpisode>(`/tv/${id}/season/${season}/episode/${episode}`),

    getTVSimilar: (id: number | string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>(`/tv/${id}/similar`, params),

    getTVRecommendations: (id: number | string, params?: Record<string, string>) =>
      fetch<TmdbPagedResponse<TmdbTV>>(`/tv/${id}/recommendations`, params),
  }
}