<template>
  <div class="home">
    <loader v-if="isLoading" />
    <div v-else>
      <hero-header :movies="moviesHeader" show-content />
      <div class="home__content">
        <section-cards
          v-if="moviesCarousel.length"
          :medias="moviesCarousel"
          base-route="/films"
          title="Tendences"
        />
        <section-cards
          v-if="moviesCarousel.length"
          :medias="moviesCarousel"
          base-route="/films"
          title="Tendences"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "home",
  layout: "main-layout",
  order: 0,
});

const isLoading = ref<boolean>(false);
const moviesCarousel = ref<TmdbMedia[]>([]);
const moviesHeader = ref<TmdbMedia[]>([]);

onMounted(() => getTrendingMovies());

async function getTrendingMovies() {
  isLoading.value = true;
  const { data, error } =
    await useAPI().tmdb.trending.getTrendingMoviesByWeek();
  isLoading.value = false;

  if (!data || error) return;

  const mapper = useUtils().mappers.movie;

  moviesHeader.value = data.results.slice(0, 7).map(mapper);
  moviesCarousel.value = data.results.slice(7).map(mapper);
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  &__content {
    position: relative;
    z-index: 9;
  }
}
</style>
