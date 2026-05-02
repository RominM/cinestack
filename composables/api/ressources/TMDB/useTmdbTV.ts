import type { TmdbPagedResponse, TmdbRequestResult, TmdbCredits, TmdbVideos, TmdbImages } from '~/types/ressources/TMDB/common'
import type { TmdbTV, TmdbTVDetail, TmdbSeason, TmdbEpisode } from '~/types/ressources/TMDB/tv'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbTV = () => {
  const { get } = useRequest()
  const path = `${BASE_TMDB_PATH}/tv`

  return {
    getPopular: async (params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/popular`, { params })
      return { data, error }
    },

    getTVDetail: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbTVDetail> => {
      const { data, error } = await get<TmdbTVDetail>(`${path}/${id}`, { params })
      return { data, error }
    },

    getTVCredits: async (id: number | string): TmdbRequestResult<TmdbCredits> => {
      const { data, error } = await get<TmdbCredits>(`${path}/${id}/credits`)
      return { data, error }
    },

    getTVVideos: async (id: number | string): TmdbRequestResult<TmdbVideos> => {
      const { data, error } = await get<TmdbVideos>(`${path}/${id}/videos`)
      return { data, error }
    },

    getTVImages: async (id: number | string): TmdbRequestResult<TmdbImages> => {
      const { data, error } = await get<TmdbImages>(`${path}/${id}/images`)
      return { data, error }
    },

    getTVSeason: async (id: number | string, season: number): TmdbRequestResult<TmdbSeason> => {
      const { data, error } = await get<TmdbSeason>(`${path}/${id}/season/${season}`)
      return { data, error }
    },

    getTVEpisode: async (id: number | string, season: number, episode: number): TmdbRequestResult<TmdbEpisode> => {
      const { data, error } = await get<TmdbEpisode>(`${path}/${id}/season/${season}/episode/${episode}`)
      return { data, error }
    },

    getTVSimilar: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/${id}/similar`, { params })
      return { data, error }
    },

    getTVRecommendations: async (id: number | string, params?: Record<string, string>): TmdbRequestResult<TmdbPagedResponse<TmdbTV>> => {
      const { data, error } = await get<TmdbPagedResponse<TmdbTV>>(`${path}/${id}/recommendations`, { params })
      return { data, error }
    },
  }
}