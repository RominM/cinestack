<template>
  <div v-if="movie" class="movie">
    <hero-header
      v-if="movie.backdropPath"
      :srcs="[{ src: movie.backdropPath, alt: movie.name }]"
    />
    <media-details :media="movie" :credits="rawMovie?.credits" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbMovieDetail } from "~/types/ressources/TMDB/movie";

definePageMeta({
  key: "movies",
  layout: "main-layout",
  order: 2,
});

const route = useRoute();
const id = route.params.id as string;

const movie = ref<TmdbMedia>();
const rawMovie = ref<TmdbMovieDetail>();

onMounted(() => fetchAll());

async function fetchAll() {
  const { data, error } = await useAPI().tmdb.movie.getMovieDetail(id, {
    append_to_response: "credits,videos,images,recommendations",
  });

  if (!data || error) return;
  console.log({ data });

  rawMovie.value = data;
  movie.value = useUtils().mappers.movie(data);
}
</script>

<style scoped lang="scss">
.movie {
}
</style>
