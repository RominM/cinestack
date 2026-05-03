<template>
  <div class="series">
    <media-section
      v-for="section in sections"
      :key="section.title"
      :title="section.title"
      base-route="/series"
      :fetch-fn="section.fetchFn"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";

definePageMeta({
  key: "series",
  layout: "main-layout",
  order: 3,
});

useHead({ title: "Séries" });

const today = new Date().toISOString().split("T")[0];
const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

const sections = [
  {
    title: "Populaires",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getPopularTV({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.tv), totalPages: data.total_pages };
    },
  },
  {
    title: "Les mieux notées",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.getTopRatedTV({ page: String(page) });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.tv), totalPages: data.total_pages };
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
      });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.tv), totalPages: data.total_pages };
    },
  },
  {
    title: "Animations",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.discover.discoverTV({
        page: String(page),
        sort_by: "popularity.desc",
        with_genres: "16",
      });
      if (error || !data) return null;
      return { items: data.results.map(useUtils().mappers.tv), totalPages: data.total_pages };
    },
  },
];
</script>

<style scoped lang="scss">
.series {
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
