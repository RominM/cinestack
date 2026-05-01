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
          <span v-for="genre in media.genres" :key="genre.id" class="tag">
            {{ genre.name }}</span
          >
          <span class="tag">{{ releaseYear }}</span>
          <span v-if="media.runtime" class="tag">{{ formattedRuntime }}</span>
        </div>
      </div>
    </div>

    <media-stats :media="media" />

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

    <p>{{ media.overview }}</p>
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
