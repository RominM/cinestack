<template>
  <div class="series">
    <div class="series__header">
      <genre-filter :genres="genres" v-model="selectedGenres" />
    </div>

    <media-section
      v-for="section in sections"
      :key="`${section.title}-${selectedGenres[0] ?? 'all'}`"
      :title="section.title"
      base-route="/series"
      :fetch-fn="section.fetchFn"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbGenre } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "series",
  layout: "main-layout",
  order: 3,
});

useHead({ title: "Séries" });

const genres = ref<TmdbGenre[]>([]);
const selectedGenres = ref<number[]>([]);

const today = new Date().toISOString().split("T")[0];
const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

function genreParam(): Record<string, string> {
  return selectedGenres.value.length
    ? { with_genres: String(selectedGenres.value[0]) }
    : {};
}

const sections = [
  {
    title: "Populaires",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverTV({
        page: String(page),
        sort_by: "popularity.desc",
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.tv),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Les mieux notées",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverTV({
        page: String(page),
        sort_by: "vote_average.desc",
        "vote_count.gte": "200",
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.tv),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Nouvelles séries",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverTV({
        page: String(page),
        sort_by: "first_air_date.desc",
        "first_air_date.lte": today,
        "first_air_date.gte": twoYearsAgo,
        "vote_count.gte": "20",
        ...genreParam(),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.tv),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Animations",
    fetchFn: async (page: number) => {
      const genreP = genreParam();
      const withGenres = genreP.with_genres ? `16,${genreP.with_genres}` : "16";
      const { data, error } = await useAPI().tmdb.discover.discoverTV({
        page: String(page),
        sort_by: "popularity.desc",
        with_genres: withGenres,
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.tv),
        totalPages: data.total_pages,
      };
    },
  },
];

onMounted(async () => {
  const { data } = await useAPI().tmdb.genre.getTVGenres();
  if (data) genres.value = data.genres;
});
</script>

<style scoped lang="scss">
.series {
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
