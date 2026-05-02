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
          title="Tendances"
        />
        <section-cards
          v-if="popularMovies.length"
          :medias="popularMovies"
          base-route="/films"
          title="Films populaires"
        />
        <section-cards
          v-if="popularTV.length"
          :medias="popularTV"
          base-route="/series"
          title="Séries populaires"
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

useHead({ title: "Accueil" });

const isLoading = ref(false);
const moviesHeader = ref<TmdbMedia[]>([]);
const moviesCarousel = ref<TmdbMedia[]>([]);
const popularMovies = ref<TmdbMedia[]>([]);
const popularTV = ref<TmdbMedia[]>([]);

onMounted(() => fetchAll());

async function fetchAll() {
  isLoading.value = true;

  const [trending, movies, tv] = await Promise.all([
    useAPI().tmdb.trending.getTrendingMoviesByWeek(),
    useAPI().tmdb.movie.getPopular(),
    useAPI().tmdb.tv.getPopular(),
  ]);

  isLoading.value = false;

  const mapMovie = useUtils().mappers.movie;
  const mapTV = useUtils().mappers.tv;

  if (trending.data) {
    moviesHeader.value = trending.data.results.slice(0, 7).map(mapMovie);
    moviesCarousel.value = trending.data.results.slice(7).map(mapMovie);
  }

  if (movies.data) {
    popularMovies.value = movies.data.results.map(mapMovie);
  }

  if (tv.data) {
    popularTV.value = tv.data.results.map(mapTV);
  }
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
