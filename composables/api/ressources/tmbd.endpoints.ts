import type { TmdbEpisode, TmdbPersonCredits, TmdbPersonImages, TmdbSeason } from '~/types/ressources/tmdb'
import type {
  TmdbMovie,
  TmdbMovieDetail,
  TmdbTV,
  TmdbTVDetail,
  TmdbPerson,
  TmdbPersonDetail,
  TmdbCredits,
  TmdbVideos,
  TmdbImages,
  TmdbGenreList,
  TmdbPagedResponse,
} from '@/types/ressources/tmdb'
import { useRequest } from '../useRequest'

export const tmdbEndpoints = () => {
  const { get } = useRequest()

  const fetch = <T>(endpoint: string, params?: Record<string, string>) =>
    get<T>(`/tmdb${endpoint}`, { params })

  return {

    trending: {
      movies: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/trending/movie/week', params),
      moviesDay: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/trending/movie/day', params),
      tv: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/trending/tv/week', params),
      tvDay: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/trending/tv/day', params),
      people: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbPerson>>('/trending/person/week', params),
    },

    movie: {
      detail: (id: number | string) =>
        fetch<TmdbMovieDetail>(`/movie/${id}`),
      credits: (id: number | string) =>
        fetch<TmdbCredits>(`/movie/${id}/credits`),
      videos: (id: number | string) =>
        fetch<TmdbVideos>(`/movie/${id}/videos`),
      images: (id: number | string) =>
        fetch<TmdbImages>(`/movie/${id}/images`),
      similar: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/similar`, params),
      recommendations: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>(`/movie/${id}/recommendations`, params),
    },

    tv: {
      detail: (id: number | string) =>
        fetch<TmdbTVDetail>(`/tv/${id}`),
      credits: (id: number | string) =>
        fetch<TmdbCredits>(`/tv/${id}/credits`),
      videos: (id: number | string) =>
        fetch<TmdbVideos>(`/tv/${id}/videos`),
      images: (id: number | string) =>
        fetch<TmdbImages>(`/tv/${id}/images`),
      season: (id: number | string, season: number) =>
        fetch<TmdbSeason>(`/tv/${id}/season/${season}`),
      episode: (id: number | string, season: number, episode: number) =>
        fetch<TmdbEpisode>(`/tv/${id}/season/${season}/episode/${episode}`),
      similar: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>(`/tv/${id}/similar`, params),
      recommendations: (id: number | string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>(`/tv/${id}/recommendations`, params),
    },

    person: {
      detail: (id: number | string) =>
        fetch<TmdbPersonDetail>(`/person/${id}`),
      movieCredits: (id: number | string) =>
        fetch<TmdbPersonCredits>(`/person/${id}/movie_credits`),
      tvCredits: (id: number | string) =>
        fetch<TmdbPersonCredits>(`/person/${id}/tv_credits`),
      images: (id: number | string) =>
        fetch<TmdbPersonImages>(`/person/${id}/images`),
    },

    discover: {
      movies: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/discover/movie', params),
      tv: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/discover/tv', params),
      topRatedMovies: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/movie/top_rated', params),
      topRatedTv: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/tv/top_rated', params),
      nowPlaying: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/movie/now_playing', params),
      upcoming: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/movie/upcoming', params),
      popularMovies: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/movie/popular', params),
      popularTv: (params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/tv/popular', params),
    },

    search: {
      movies: (query: string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie>>('/search/movie', { query, ...params }),
      tv: (query: string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbTV>>('/search/tv', { query, ...params }),
      people: (query: string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbPerson>>('/search/person', { query, ...params }),
      multi: (query: string, params?: Record<string, string>) =>
        fetch<TmdbPagedResponse<TmdbMovie | TmdbTV | TmdbPerson>>('/search/multi', { query, ...params }),
    },

    genre: {
      movies: () =>
        fetch<TmdbGenreList>('/genre/movie/list'),
      tv: () =>
        fetch<TmdbGenreList>('/genre/tv/list'),
    },

  }
}