<template>
  <div class="home">
    <hero-header v-if="moviesHeader.length" :medias="moviesHeader" />
    <div class="home__content">
      <div class="test">
        <h2>Tendances</h2>
        <carousel>
          <list-project-cards
            v-if="moviesCarousel.length"
            :medias="moviesCarousel"
            base-route="/films"
          />
        </carousel>
      </div>
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
  const { data, error } = await useAPI().tmdb.trending.getTrendingMoviesByWeek({
    page: "1",
  });

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
    margin-top: -5vh;
    z-index: 9;
    .test {
      display: flex;
      flex-direction: column;
      h2 {
        position: relative;
        margin-bottom: -140px;
        width: 150px;
        background-color: red;
      }
    }
  }
}
</style>
