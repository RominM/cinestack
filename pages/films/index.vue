<template>
  <div class="films">
    <media-section
      v-for="section in sections"
      :key="section.title"
      :title="section.title"
      base-route="/films"
      :fetch-fn="section.fetchFn"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";

definePageMeta({
  key: "films",
  layout: "main-layout",
  order: 2,
});

useHead({ title: "Films" });

const today = new Date().toISOString().split("T")[0];
const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

const sections = [
  {
    title: "Populaires",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getPopularMovies({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.movie), totalPages: data.total_pages };
    },
  },
  {
    title: "En ce moment",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getNowPlayingMovies({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.movie), totalPages: data.total_pages };
    },
  },
  {
    title: "À venir",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getUpcomingMovies({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.movie), totalPages: data.total_pages };
    },
  },
  {
    title: "Les mieux notés",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getTopRatedMovies({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.movie), totalPages: data.total_pages };
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
      });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.movie), totalPages: data.total_pages };
    },
  },
];
</script>

<style scoped lang="scss">
.films {
  padding: 100px 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 80px 0 2rem;
    gap: 2rem;
  }
}
</style>
