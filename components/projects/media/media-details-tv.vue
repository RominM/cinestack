<template>
  <div class="media-detail">
    <media-header
      :poster-path="raw.poster_path"
      :title="raw.name"
      :tagline="raw.tagline"
      :genres="raw.genres"
      :release-date="raw.first_air_date"
      :runtime="raw.episode_run_time?.[0] ?? null"
      :status="raw.status"
      :original-language="raw.original_language"
      :trailer-key="mainTrailer?.key ?? null"
    />

    <div class="media-detail__stats">
      <div class="stat">
        <span class="stat__value">{{ raw.vote_average.toFixed(1) }}</span>
        <span class="stat__label">Note</span>
      </div>
      <div class="stat">
        <span class="stat__value">{{ formatDate }}</span>
        <span class="stat__label">Sortie</span>
      </div>
      <div class="stat">
        <span class="stat__value">{{ raw.number_of_seasons }}</span>
        <span class="stat__label">Saisons</span>
      </div>
      <div class="stat">
        <span class="stat__value">{{ raw.number_of_episodes }}</span>
        <span class="stat__label">Épisodes</span>
      </div>
    </div>

    <media-watch-providers :watch-providers="raw['watch/providers']" />

    <p v-if="raw.overview" class="media-detail__overview">{{ raw.overview }}</p>

    <media-production :companies="raw.production_companies ?? []" />

    <media-cast :cast="raw.credits?.cast ?? []" />
  </div>
</template>

<script setup lang="ts">
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbTVDetail } from "~/types/ressources/TMDB/tv";

const props = defineProps({
  raw: { type: Object as PropType<TmdbTVDetail>, required: true },
});

const mainTrailer = computed(() => {
  const videos = props.raw.videos?.results ?? [];
  return (
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube" && v.iso_639_1 === "fr") ??
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube")
  );
});

const formatDate = computed(() =>
  useUtils().date.getPrettyDate(
    new Date(props.raw.first_air_date),
    "DD/MM/YYYY",
    true,
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

  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 0.5px solid #ffffff18;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px;
      gap: 4px;
      border-right: 0.5px solid #ffffff18;

      &:last-child {
        border-right: none;
      }

      &__value {
        font-size: 18px;
        font-weight: 500;
      }

      &__label {
        font-size: 11px;
        color: #ffffff55;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);

      .stat {
        &:nth-child(2) {
          border-right: none;
        }

        &:nth-child(3) {
          border-top: 0.5px solid #ffffff18;
        }

        &:nth-child(4) {
          border-top: 0.5px solid #ffffff18;
          border-right: none;
        }
      }
    }
  }

  &__overview {
    font-size: 16px;
    line-height: 1.7;
    color: #ffffffcc;
    margin: 0;
  }
}
</style>
