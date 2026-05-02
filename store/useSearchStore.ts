import { defineStore } from 'pinia'
import type { TmdbMovie } from '~/types/ressources/TMDB/movie'
import type { TmdbTV } from '~/types/ressources/TMDB/tv'
import type { TmdbPerson } from '~/types/ressources/TMDB/person'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const isOpen = ref(false)
  const isLoading = ref(false)
  const results = ref<(TmdbMovie | TmdbTV | TmdbPerson)[]>([])

  const hasResults = computed(() => results.value.length > 0)

  const resultsByType = computed(() => ({
    movies: results.value.filter((r): r is TmdbMovie => r.media_type === 'movie'),
    tv: results.value.filter((r): r is TmdbTV => r.media_type === 'tv'),
    people: results.value.filter((r): r is TmdbPerson => r.media_type === 'person'),
  }))
 
  const close = () => {
    isOpen.value = false
  }

  const reset = () => {
    query.value = ''
    isOpen.value = false
    isLoading.value = false
    results.value = []
  }

  return {
    query,
    isOpen,
    close,
    isLoading,
    results,
    hasResults,
    resultsByType,
    reset,
  }
})