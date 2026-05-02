<template>
  <div class="films">
    <div class="films__header">
      <genre-filter :genres="genres" v-model="selectedGenres" />
    </div>

    <div class="films__grid">
      <search-card
        v-for="movie in movies"
        :key="movie.id"
        :media="movie"
        :href="`/films/${movie.id}`"
      />
    </div>

    <div ref="sentinel" class="films__sentinel" />
    <loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbGenre } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "films",
  layout: "main-layout",
  order: 2,
});

useHead({ title: "Films" });

const movies = ref<TmdbMedia[]>([]);
const genres = ref<TmdbGenre[]>([]);
const selectedGenres = ref<number[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const sentinel = ref<HTMLElement | null>(null);

watch(selectedGenres, () => {
  movies.value = [];
  currentPage.value = 1;
  totalPages.value = 1;
  fetchMovies();
});

async function fetchMovies() {
  if (isLoading.value || currentPage.value > totalPages.value) return;

  isLoading.value = true;

  const params: Record<string, string> = {
    page: String(currentPage.value),
    sort_by: "popularity.desc",
  };

  if (selectedGenres.value.length) {
    params.with_genres = selectedGenres.value.join(",");
  }

  const { data, error } = await useAPI().tmdb.discover.discoverMovies(params);

  isLoading.value = false;
  if (error || !data) return;

  totalPages.value = data.total_pages;
  movies.value.push(...data.results.map(useUtils().mappers.movie));
  currentPage.value++;
}

async function fetchGenres() {
  const { data } = await useAPI().tmdb.genre.getMovieGenres();
  if (data) genres.value = data.genres;
}

onMounted(async () => {
  await Promise.all([fetchGenres(), fetchMovies()]);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetchMovies();
    },
    { threshold: 0.1 },
  );

  if (sentinel.value) observer.observe(sentinel.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<style scoped lang="scss">
.films {
  padding: 100px 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    position: sticky;
    top: 62px;
    z-index: 100;
    padding: 1rem 0;
    background: linear-gradient(to bottom, $dark-bg 80%, transparent);
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  &__sentinel {
    height: 40px;
    width: 100%;
  }
}
</style>
