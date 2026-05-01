<template>
  <div class="media-detail">
    <div class="media-detail__header">
      <img
        class="media-detail__poster"
        :src="`https://image.tmdb.org/t/p/w200${media.posterPath}`"
        :alt="media.name"
      />
      <div class="media-detail__info">
        <h1 class="media-detail__title">{{ media.name }}</h1>
        <p class="media-detail__tagline">{{ media.tagline }}</p>
        <div class="media-detail__tags">
          <span v-for="genre in media.genres" :key="genre.id" class="tag">{{
            genre.name
          }}</span>
          <span class="tag">{{ releaseYear }}</span>
          <span v-if="media.runtime" class="tag">{{ formattedRuntime }}</span>
        </div>
      </div>
    </div>

    <div class="media-detail__stats">
      <div class="stat">
        <span class="stat__value">{{ media.voteAverage.toFixed(1) }}</span>
        <span class="stat__label">Note</span>
      </div>
      <div class="stat">
        <span class="stat__value">{{ formattedBudget }}</span>
        <span class="stat__label">Budget</span>
      </div>
      <div class="stat">
        <span class="stat__value">{{ formattedRevenue }}</span>
        <span class="stat__label">Recettes</span>
      </div>
    </div>

    <div v-if="credits?.cast?.length" class="media-detail__cast">
      <h3 class="media-detail__cast-title">Casting</h3>
      <div class="media-detail__cast-list">
        <div
          v-for="actor in credits.cast.slice(0, 8)"
          :key="actor.id"
          class="cast-item"
        >
          <div class="cast-item__avatar">
            <img
              v-if="actor.profile_path"
              :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`"
              :alt="actor.name"
            />
            <div v-else class="cast-item__placeholder" />
          </div>
          <span class="cast-item__name">{{ actor.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbCredits } from "~/types/ressources/TMDB/common";

const props = defineProps({
  media: { type: Object as PropType<TmdbMedia>, required: true },
  credits: { type: Object as PropType<TmdbCredits>, default: null },
});

const releaseYear = computed(() => props.media.releaseDate?.split("-")[0]);

const formattedRuntime = computed(() => {
  if (!props.media.runtime) return null;
  const h = Math.floor(props.media.runtime / 60);
  const m = props.media.runtime % 60;
  return `${h}h${m.toString().padStart(2, "0")}`;
});

const formattedBudget = computed(() => {
  // if (!props.media.budget) return "N/A";
  // return `${(props.media.budget / 1_000_000).toFixed(0)}M$`;
});

const formattedRevenue = computed(() => {
  // if (!props.media.revenue) return "N/A";
  // return `${(props.media.revenue / 1_000_000).toFixed(0)}M$`;
});
</script>

<style scoped lang="scss">
.media-detail {
  padding: 24px;
  color: #fff;

  &__header {
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
  }

  &__poster {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
    border: 0.5px solid #ffffff22;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }

  &__tagline {
    font-size: 13px;
    color: #e05a2b;
    font-style: italic;
    margin: 0;
  }

  &__tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 4px;
  }

  &__stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
  }

  &__cast-title {
    font-size: 13px;
    color: #ffffff66;
    margin: 0 0 12px;
    font-weight: 400;
  }

  &__cast-list {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}

.tag {
  font-size: 11px;
  color: #ffffff88;
  background: #ffffff12;
  border-radius: 4px;
  padding: 3px 8px;
}

.cast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 56px;

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff18;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: #ffffff18;
  }

  &__name {
    font-size: 10px;
    color: #ffffff88;
    text-align: center;
    line-height: 1.3;
  }
}
</style>
