<template>
  <loader v-if="isLoading" />

  <div v-else-if="rawMovie" class="movie">
    <hero-header v-if="movie" :movies="[movie]" />

    <div class="movie__content">
      <media-details :raw="rawMovie" />

      <section-cards
        v-if="recommendations.length"
        :medias="recommendations"
        base-route="/films"
        title="Recommandation"
      />
    </div>
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

useHead({
  title: () => movie.value?.name ?? "Film",
  meta: [
    { property: 'og:title', content: () => movie.value?.name ?? "Film" },
    { property: 'og:description', content: () => rawMovie.value?.overview ?? "" },
    { property: 'og:image', content: () => rawMovie.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${rawMovie.value.backdrop_path}` : 'https://cinestack-mgl.netlify.app/cinestack.svg' },
    { name: 'twitter:title', content: () => movie.value?.name ?? "Film" },
    { name: 'twitter:description', content: () => rawMovie.value?.overview ?? "" },
    { name: 'twitter:image', content: () => rawMovie.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${rawMovie.value.backdrop_path}` : 'https://cinestack-mgl.netlify.app/cinestack.svg' },
  ],
});

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
    include_video_language: "fr,null",
  });
  isLoading.value = false;

  if (!data || error) return;
  rawMovie.value = data;
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .movie {
    padding-bottom: 85px;
    &__content {
      position: relative;
      margin-top: -70px;
      overflow: visible;
      z-index: 9;
    }
  }
}
</style>
