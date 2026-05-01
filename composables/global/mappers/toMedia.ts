// utils/tmdb/mappers.ts
import type { TmdbMedia } from '~/types/ressources/TMDB/common'
import type { TmdbMovie, TmdbMovieDetail } from '~/types/ressources/TMDB/movie'
import type { TmdbTV, TmdbTVDetail } from '~/types/ressources/TMDB/tv'

export function mapMovieToMedia(movie: TmdbMovie | TmdbMovieDetail): TmdbMedia {
  return {
    id: movie.id,
    mediaType: 'movie',
    name: movie.title,
    originalName: movie.original_title,
    overview: movie.overview,
    tagline: 'tagline' in movie ? movie.tagline : undefined,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    popularity: movie.popularity,
    genres: 'genres' in movie ? movie.genres : [],
    genreIds: 'genre_ids' in movie ? movie.genre_ids : undefined,
    runtime: 'runtime' in movie ? movie.runtime : undefined,
    status: 'status' in movie ? movie.status : undefined,
    homepage: 'homepage' in movie ? movie.homepage : undefined,
  }
}

export function mapTVToMedia(tv: TmdbTV | TmdbTVDetail): TmdbMedia {
  return {
    id: tv.id,
    mediaType: 'tv',
    name: tv.name,
    originalName: tv.original_name,
    overview: tv.overview,
    tagline: 'tagline' in tv ? tv.tagline : undefined,
    posterPath: tv.poster_path,
    backdropPath: tv.backdrop_path,
    releaseDate: tv.first_air_date,
    voteAverage: tv.vote_average,
    voteCount: tv.vote_count,
    popularity: tv.popularity,
    genres: 'genres' in tv ? tv.genres : [],
    genreIds: 'genre_ids' in tv ? tv.genre_ids : undefined,
    runtime: 'episode_run_time' in tv ? tv.episode_run_time[0] : undefined,
    status: 'status' in tv ? tv.status : undefined,
    homepage: 'homepage' in tv ? tv.homepage : undefined,
  }
}