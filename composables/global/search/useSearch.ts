import { useTmdbSearch } from '~/composables/api/ressources/TMDB/useTmdbSearch'
import { useSearchStore } from '~/store/useSearchStore'

export const useSearch = () => {
  const store = useSearchStore()
  const { searchMulti } = useTmdbSearch()

  let debounceTimer: ReturnType<typeof setTimeout>

  const search = (query: string) => {
    store.query = query

    if (!query.trim()) {
      clear()
      return
    }

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
      store.isLoading = true
      store.isOpen = true

      const { data, error } = await searchMulti(query)

      if (error || !data) {
        store.results = []
      } else {
        store.results = data.results
      }

      store.isLoading = false
    }, 300)
  }

  const clear = () => {
    clearTimeout(debounceTimer)
    store.query = ''
    store.results = []
    store.isOpen = false
  }

  return { search, clear }
}