export type TmdbMovie = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  adult: boolean
}

export type TmdbMovieDetail = TmdbMovie & {
  runtime: number
  budget: number
  revenue: number
  tagline: string
  genres: { id: number; name: string }[]
  status: string
}

export type TmdbCredits = {
  id: number
  cast: {
    id: number
    name: string
    character: string
    profile_path: string | null
    order: number
  }[]
  crew: {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
  }[]
}

export type TmdbVideos = {
  id: number
  results: {
    id: string
    key: string
    name: string
    site: string
    type: string
    official: boolean
  }[]
}

export type TmdbImages = {
  id: number
  backdrops: { file_path: string; width: number; height: number }[]
  posters: { file_path: string; width: number; height: number }[]
}

export type TmdbPagedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}