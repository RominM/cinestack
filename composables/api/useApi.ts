import { tmdbEndpoints } from "./ressources/tmbd.endpoints";

export const useAPI = () => ({
  tmdb: tmdbEndpoints(),
})
