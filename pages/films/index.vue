<template>
  <div class="films">
    <div class="films__header">
      <genre-filter :genres="genres" v-model="selectedGenres" />
    </div>

    <media-section
      v-for="section in sections"
      :key="`${section.title}-${selectedGenres[0] ?? 'all'}`"
      :title="section.title"
      base-route="/films"
      :fetch-fn="section.fetchFn"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbGenre } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "films",
  layout: "main-layout",
  order: 2,
});

useHead({ title: "Films" });

const genres = ref<TmdbGenre[]>([]);
const selectedGenres = ref<number[]>([]);

const today = new Date().toISOString().split("T")[0];
const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function genreParam() {
  return selectedGenres.value.length
    ? { with_genres: String(selectedGenres.value[0]) }
    : {};
}

const sections = [
  {
    title: "Populaires",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverMovies({
        page: String(page),
        sort_by: "popularity.desc",
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "En ce moment",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverMovies({
        page: String(page),
        sort_by: "popularity.desc",
        "release_date.gte": oneMonthAgo,
        "release_date.lte": today,
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "À venir",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverMovies({
        page: String(page),
        sort_by: "release_date.asc",
        "release_date.gte": today,
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Les mieux notés",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverMovies({
        page: String(page),
        sort_by: "vote_average.desc",
        "vote_count.gte": "1000",
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Courts métrages",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverMovies({
        page: String(page),
        sort_by: "popularity.desc",
        "with_runtime.lte": "60",
        "with_runtime.gte": "10",
        "vote_count.gte": "50",
        "release_date.gte": oneYearAgo,
        "release_date.lte": today,
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
];

onMounted(async () => {
  const { data } = await useAPI().tmdb.genre.getMovieGenres();
  if (data) genres.value = data.genres;
});
</script>

<style scoped lang="scss">
.films {
  padding: 100px 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__header {
    position: sticky;
    top: 62px;
    z-index: 100;
    padding: 1rem 0;
    background: linear-gradient(to bottom, $dark-bg 80%, transparent);
  }

  @media (max-width: 768px) {
    padding: 80px 0 2rem;
    gap: 2rem;
  }
}
</style>
