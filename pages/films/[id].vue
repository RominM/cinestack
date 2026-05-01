<template>
  <loader v-if="isLoading" />

  <div v-else-if="rawMovie" class="movie">
    <hero-header v-if="movie" :movies="[movie]" />

    <media-details :raw="rawMovie" />

    <section-cards
      v-if="recommendations.length"
      :medias="recommendations"
      base-route="/films"
      title="Recommandation"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbMovieDetail } from "~/types/ressources/TMDB/movie";

definePageMeta({
  key: (route) => route.fullPath,
  layout: "main-layout",
  order: 2,
});

const route = useRoute();
const id = route.params.id as string;

const isLoading = ref<boolean>(false);
const rawMovie = ref<TmdbMovieDetail>();

const movie = computed<TmdbMedia | undefined>(() =>
  rawMovie.value ? useUtils().mappers.movie(rawMovie.value) : undefined,
);

const recommendations = computed<TmdbMedia[]>(
  () =>
    rawMovie.value?.recommendations?.results.map(useUtils().mappers.movie) ??
    [],
);

onMounted(() => getMovieDetails());

async function getMovieDetails() {
  isLoading.value = true;
  const { data, error } = await useAPI().tmdb.movie.getMovieDetail(id, {
    append_to_response: "credits,videos,images,recommendations",
  });
  isLoading.value = false;

  if (!data || error) return;
  rawMovie.value = data;
}
</script>

<style scoped lang="scss">
.movie {
}
</style>
