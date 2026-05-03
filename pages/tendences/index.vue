<template>
  <div class="tendances">
    <media-section
      v-for="section in sections"
      :key="section.title"
      :title="section.title"
      :base-route="section.baseRoute"
      :fetch-fn="section.fetchFn"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";

definePageMeta({
  key: "tendances",
  layout: "main-layout",
  order: 1,
});

useHead({ title: "Tendances" });

const sections = [
  {
    title: "Films de la semaine",
    baseRoute: "/films",
    fetchFn: async (page: number) => {
      const { data, error } =
        await useAPI().tmdb.trending.getTrendingMoviesByWeek({
          page: String(page),
        });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.movie),
        totalPages: data.total_pages,
      };
    },
  },
  {
    title: "Séries de la semaine",
    baseRoute: "/series",
    fetchFn: async (page: number) => {
      const { data, error } = await useAPI().tmdb.trending.getTrendingTVByWeek({
        page: String(page),
      });
      if (error || !data) return null;
      return {
        items: data.results.map(useUtils().mappers.tv),
        totalPages: data.total_pages,
      };
    },
  },
];
</script>

<style scoped lang="scss">
.tendances {
  padding: 62px 0 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 62px 0 2rem;
    gap: 2rem;
  }
}
</style>
