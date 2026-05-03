<template>
  <div class="series">
    <div class="series__header">
      <genre-filter :genres="genres" v-model="selectedGenres" />
    </div>

    <div class="series__grid">
      <search-card
        v-for="tv in series"
        :key="tv.id"
        :media="tv"
        :href="`/series/${tv.id}`"
      />
    </div>

    <div ref="sentinel" class="series__sentinel" />
    <loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia, TmdbGenre } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "series",
  layout: "main-layout",
  order: 3,
});

useHead({ title: "Séries" });

const series = ref<TmdbMedia[]>([]);
const genres = ref<TmdbGenre[]>([]);
const selectedGenres = ref<number[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const sentinel = ref<HTMLElement | null>(null);

watch(selectedGenres, () => {
  series.value = [];
  currentPage.value = 1;
  totalPages.value = 1;
  fetchSeries();
});

async function fetchSeries() {
  if (isLoading.value || currentPage.value > totalPages.value) return;

  isLoading.value = true;

  const params: Record<string, string> = {
    page: String(currentPage.value),
    sort_by: "popularity.desc",
  };

  if (selectedGenres.value.length) {
    params.with_genres = selectedGenres.value.join(",");
  }

  const { data, error } = await useAPI().tmdb.discover.discoverTV(params);

  isLoading.value = false;
  if (error || !data) return;

  totalPages.value = data.total_pages;
  series.value.push(...data.results.map(useUtils().mappers.tv));
  currentPage.value++;
}

async function fetchGenres() {
  const { data } = await useAPI().tmdb.genre.getTVGenres();
  if (data) genres.value = data.genres;
}

onMounted(async () => {
  await Promise.all([fetchGenres(), fetchSeries()]);

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetchSeries();
    },
    { threshold: 0.1 },
  );

  if (sentinel.value) observer.observe(sentinel.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<style scoped lang="scss">
.series {
  padding: 62px 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    position: sticky;
    top: 62px;
    z-index: 100;
    padding: 1rem 0;
    margin-inline: -4rem;
    overflow: hidden;
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

@media screen and (max-width: 768px) {
  .series {
    padding: 62px 16px;
    &__grid {
      justify-content: center;
    }
  }
}
</style>
