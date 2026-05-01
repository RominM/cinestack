<template>
  <div class="home">
    <hero-header
      :srcs="
        moviesHeader.map((m) => ({ src: m.backdropPath ?? '', alt: m.name }))
      "
    />
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
</template>

<script setup lang="ts">
definePageMeta({
  key: "home",
  layout: "main-layout",
  order: 0,
});

import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const moviesCarousel = ref<TmdbMedia[]>([]);
const moviesHeader = ref<TmdbMedia[]>([]);

onMounted(() => getTrendingMovies());

async function getTrendingMovies() {
  const { data, error } =
    await useAPI().tmdb.trending.getTrendingMoviesByWeek();

  if (!data || error) return;

  const mapper = useUtils().mappers.movie;

  moviesHeader.value = data.results.slice(0, 7).map(mapper);
  moviesCarousel.value = data.results.slice(7).map(mapper);
}
</script>

<style scoped lang="scss">
.home {
  &__content {
    position: relative;
    z-index: 9;
  }
}
</style>
