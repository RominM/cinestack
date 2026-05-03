export type TmdbRequestResult<T> = Promise<{ data?: T; error?: string }>

export type TmdbPagedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type TmdbGenre = {
  id: number
  name: string
}

export type TmdbImage = {
  file_path: string
  width: number
  height: number
  vote_average: number
}

export type TmdbVideo = {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
  iso_639_1: string
  iso_3166_1: string
}

export type TmdbImages = {
  id: number
  backdrops: TmdbImage[]
  posters: TmdbImage[]
  logos: TmdbImage[]
}

export type TmdbVideos = {
  id: number
  results: TmdbVideo[]
}

export type TmdbCastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export type TmdbCrewMember = {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export type TmdbCredits = {
  id: number
  cast: TmdbCastMember[]
  crew: TmdbCrewMember[]
}

export type TmdbWatchProvider = {
  provider_id: number
  provider_name: string
  logo_path: string
  display_priority: number
}

export type TmdbWatchProviders = {
  results: {
    [countryCode: string]: {
      link: string
      flatrate?: TmdbWatchProvider[]
      rent?: TmdbWatchProvider[]
      buy?: TmdbWatchProvider[]
    }
  }
}

export type TmdbMediaType = 'movie' | 'tv'

export type TmdbMedia = {
  id: number
  mediaType: TmdbMediaType

  name: string
  originalName: string  
  overview: string
  tagline?: string

  posterPath: string | null
  backdropPath: string | null

  releaseDate: string   
  voteAverage: number
  voteCount: number
  popularity: number
  genres: TmdbGenre[]
  genreIds?: number[] 

  runtime?: number
  status?: string
  homepage?: string
}