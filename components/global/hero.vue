<template>
  <div class="main-hero">
    <hero-header :projects="moviesHeader" />
    <carousel>
      <list-project-cards :projects="moviesCarousel" />
    </carousel>
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TmdbMovie } from "~/types/ressources/TMDB/movie";
import type { TProject } from "~/types/type/project";

const moviesCarousel = ref<TProject[]>([]);
const moviesHeader = ref<TProject[]>([]);

onMounted(() => getTrendingMovies());

async function getTrendingMovies() {
  const { data, error } = await useAPI().tmdb.trending.getTrendingMoviesByWeek({
    page: "1",
  });

  if (!data || error) return;

  moviesHeader.value = data.results
    .slice(0, 7)
    .map((m) => mappedMoviesResult(m));

  moviesCarousel.value = data.results
    .slice(7)
    .map((m) => mappedMoviesResult(m));
}

function mappedMoviesResult(item: TmdbMovie): TProject {
  return {
    id: String(item.id),
    name: item.title,
    description: item.overview,
    status: EStatusProject.EXERCIES,
    level: ELevelProject.MEDIUM,
    duration: item.release_date,
    tech: [],
    picture: {
      src_s: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
      src_m: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      src_l: [
        `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
      ],
      alt: item.title,
    },
    links: {},
  };
}
</script>

<style scoped lang="scss">
.main-hero {
}
</style>
