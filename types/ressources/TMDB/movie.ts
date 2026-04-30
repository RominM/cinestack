import type { TmdbGenre } from './common'

export type TmdbMovie = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  genre_ids: number[]
  original_language: string
  original_title: string
}

export type TmdbMovieDetail = TmdbMovie & {
  runtime: number
  budget: number
  revenue: number
  tagline: string
  status: string
  homepage: string
  genres: TmdbGenre[]
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
}