import { mapMovieToMedia, mapTVToMedia } from "./toMedia"

export const useMappers = () => {
  return {
    movie: mapMovieToMedia,
    tv: mapTVToMedia,
  }
}