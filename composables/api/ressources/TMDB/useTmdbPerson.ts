import type { TmdbRequestResult } from '~/types/ressources/TMDB/common'
import type { TmdbPersonDetail, TmdbPersonImages, TmdbPersonCredits } from '~/types/ressources/TMDB/person'
import { useRequest } from '../../useRequest'
import { BASE_TMDB_PATH } from '~/const/tmdb'

export const useTmdbPerson = () => {
  const { get } = useRequest()
  const path = `${BASE_TMDB_PATH}/person`

  return {
    getPersonDetail: async (id: number | string): TmdbRequestResult<TmdbPersonDetail> => {
      const { data, error } = await get<TmdbPersonDetail>(`${path}/${id}`)
      return { data, error }
    },

    getPersonMovieCredits: async (id: number | string): TmdbRequestResult<TmdbPersonCredits> => {
      const { data, error } = await get<TmdbPersonCredits>(`${path}/${id}/movie_credits`)
      return { data, error }
    },

    getPersonTVCredits: async (id: number | string): TmdbRequestResult<TmdbPersonCredits> => {
      const { data, error } = await get<TmdbPersonCredits>(`${path}/${id}/tv_credits`)
      return { data, error }
    },

    getPersonCombinedCredits: async (id: number | string): TmdbRequestResult<TmdbPersonCredits> => {
      const { data, error } = await get<TmdbPersonCredits>(`${path}/${id}/combined_credits`)
      return { data, error }
    },

    getPersonImages: async (id: number | string): TmdbRequestResult<TmdbPersonImages> => {
      const { data, error } = await get<TmdbPersonImages>(`${path}/${id}/images`)
      return { data, error }
    },
  }
}
