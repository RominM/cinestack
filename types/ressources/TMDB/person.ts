import type { TmdbMovie } from './movie'
import type { TmdbTV } from './tv'

export type TmdbPerson = {
  id: number
  name: string
  profile_path: string | null
  popularity: number
  known_for_department: string
  known_for: (TmdbMovie | TmdbTV)[]
}

export type TmdbPersonDetail = TmdbPerson & {
  biography: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  homepage: string | null
  also_known_as: string[]
}

export type TmdbPersonImages = {
  id: number
  profiles: { file_path: string; width: number; height: number; vote_average: number }[]
}

export type TmdbPersonCredits = {
  id: number
  cast: (TmdbMovie | TmdbTV)[]
  crew: (TmdbMovie | TmdbTV)[]
}