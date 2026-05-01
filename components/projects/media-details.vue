<template>
  <div class="media-detail">
    <media-header
      :poster-path="raw.poster_path"
      :title="raw.title"
      :tagline="raw.tagline"
      :genres="raw.genres"
      :release-date="raw.release_date"
      :runtime="raw.runtime"
      :status="raw.status"
      :original-language="raw.original_language"
      :trailer-key="mainTrailer?.key ?? null"
    />

    <media-stats
      :vote-average="raw.vote_average"
      :release-date="raw.release_date"
      :budget="raw.budget"
      :revenue="raw.revenue"
    />

    <p v-if="raw.overview" class="media-detail__overview">{{ raw.overview }}</p>

    <media-companies :companies="raw.production_companies ?? []" />

    <media-cast :cast="raw.credits?.cast ?? []" />
  </div>
</template>

<script setup lang="ts">
import type { TmdbMovieDetail } from "~/types/ressources/TMDB/movie";

const props = defineProps({
  raw: { type: Object as PropType<TmdbMovieDetail>, required: true },
});

const mainTrailer = computed(() =>
  props.raw.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  ),
);
</script>

<style scoped lang="scss">
.media-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  color: #fff;

  &__overview {
    font-size: 16px;
    line-height: 1.7;
    color: #ffffffcc;
    margin: 0;
  }

  &__section-title {
    font-size: 13px;
    color: #ffffff66;
    margin: 0 0 12px;
    font-weight: 400;
  }
}
</style>
