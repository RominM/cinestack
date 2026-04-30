import { useTmdbTrending } from './ressources/TMDB/useTmdbTrending'
import { useTmdbMovie } from './ressources/TMDB/useTmdbMovie'
import { useTmdbTV } from './ressources/TMDB/useTmdbTV'
import { useTmdbPerson } from './ressources/TMDB/useTmdbPerson'
import { useTmdbDiscover } from './ressources/TMDB/useTmdbDiscover'
import { useTmdbSearch } from './ressources/TMDB/useTmdbSearch'
import { useTmdbGenre } from './ressources/TMDB/useTmdbGenre'

export const useAPI = () => ({
  tmdb: {
    trending: useTmdbTrending(),
    movie: useTmdbMovie(),
    tv: useTmdbTV(),
    person: useTmdbPerson(),
    discover: useTmdbDiscover(),
    search: useTmdbSearch(),
    genre: useTmdbGenre(),
  }
})