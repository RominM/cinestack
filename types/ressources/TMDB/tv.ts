import type { TmdbCredits, TmdbGenre, TmdbImages, TmdbPagedResponse, TmdbVideos } from './common'

export type TmdbTV = {
  id: number
  media_type: 'tv'
  name: string
  overview: string
  first_air_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  original_language: string
  original_name: string
}

export type TmdbTVDetail = TmdbTV & {
  tagline: string
  status: string
  homepage: string
  number_of_episodes: number
  number_of_seasons: number
  episode_run_time: number[]
  genres: TmdbGenre[]
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
  seasons: {
    id: number
    name: string
    season_number: number
    episode_count: number
    poster_path: string | null
    air_date: string
  }[]
  credits?: TmdbCredits
  videos?: TmdbVideos
  images?: TmdbImages
  recommendations?: TmdbPagedResponse<TmdbTV>
}

export type TmdbSeason = {
  id: number
  name: string
  season_number: number
  episodes: TmdbEpisode[]
  poster_path: string | null
  air_date: string
}

export type TmdbEpisode = {
  id: number
  name: string
  overview: string
  episode_number: number
  season_number: number
  air_date: string
  still_path: string | null
  vote_average: number
  runtime: number
}