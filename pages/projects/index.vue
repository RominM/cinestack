<template>
  <div class="projects">
    <hero />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { ELevelProject, EStatusProject } from "~/types/enum/project/project";
import type { TProject } from "~/types/type/project";

// const { data, error } = await useAPI().tmdb.movie.getMovieDetail(123);
// const { data, error } = await useAPI().tmdb.search.searchMovies("inception", {
//   page: "1",
// });
// const { data, error } = await useAPI().tmdb.discover.discoverMovies({
//   with_genres: "99",
//   page: "1",
// });

// const mapCard = computed<TProject[]>(() => {
//   if (!trending.value?.results) return [];

//   return trending.value.results.map((item) => ({
//     id: String(item.id),
//     name: item.title,
//     description: item.overview,
//     status: EStatusProject.EXERCIES,
//     level: ELevelProject.MEDIUM,
//     duration: item.release_date,
//     tech: [],
//     picture: {
//       src_s: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
//       src_m: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//       src_l: [
//         `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
//         `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
//       ],
//       alt: item.title,
//     },
//     links: {},
//   }));
// });

// console.log(trending.value?.results);
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  overflow: hidden;
}

.fake-bento {
  display: flex;
  flex-direction: column;
  // width: 750px;
  height: 100%;
}

.txt {
  color: #000;
}
</style>
