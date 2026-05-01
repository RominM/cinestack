<template>
  <div v-if="movie" class="movie">
    <hero-header :medias="[movie]" />
    <media-details :media="movie" :credits="credits" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbCredits, TmdbMedia } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "movies",
  layout: "main-layout",
  order: 2,
});

const route = useRoute();
const id = route.params.id as string;

const movie = ref<TmdbMedia>();
const credits = ref<TmdbCredits>();

onMounted(() => fetchAll());

async function fetchAll() {
  const [movieRes, creditsRes] = await Promise.all([
    useAPI().tmdb.movie.getMovieDetail(id),
    useAPI().tmdb.movie.getMovieCredits(id),
  ]);

  console.log({ creditsRes });

  if (movieRes.data) movie.value = useUtils().mappers.movie(movieRes.data);
  if (creditsRes.data) credits.value = creditsRes.data;
}
</script>

<style scoped lang="scss">
.movie {
}
</style>
