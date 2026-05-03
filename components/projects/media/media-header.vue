<template>
  <div class="media-header">
    <img
      class="media-header__poster"
      :src="`https://image.tmdb.org/t/p/w200${posterPath}`"
      :alt="title"
    />
    <div class="media-header__info">
      <h1 class="media-header__title">{{ title }}</h1>
      <p v-if="tagline" class="media-header__tagline">{{ tagline }}</p>
      <div class="media-header__tags">
        <span v-for="genre in genres" :key="genre.id" class="tag">
          {{ genre.name }}
        </span>
        <span class="tag">{{ releaseYear }}</span>
        <span v-if="runtime" class="tag">{{ formattedRuntime }}</span>
        <span v-if="status" class="tag">{{ status }}</span>
        <span v-if="originalLanguage" class="tag">
          {{ originalLanguage.toUpperCase() }}
        </span>
      </div>
    </div>

    <button
      v-if="trailerKey"
      class="media-header__trailer-btn"
      @click="isTrailerOpen = true"
    >
      Voir la bande-annonce
    </button>
  </div>

  <modal
    :is-open="isTrailerOpen"
    dismisable
    show-cross
    fit
    :title="`Bande-annonce ${title}`"
    @update:is-open="isTrailerOpen = $event"
  >
    <div class="media-header__video-wrapper">
      <loader v-if="!isVideoLoaded" />
      <iframe
        v-if="isTrailerOpen"
        :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1`"
        class="media-header__iframe"
        allow="autoplay; encrypted-media"
        allowfullscreen
        @load="isVideoLoaded = true"
      />
    </div>
  </modal>
</template>

<script setup lang="ts">
import type { TmdbGenre } from "~/types/ressources/TMDB/common";

const props = defineProps({
  posterPath: { type: String as PropType<string | null>, default: null },
  title: { type: String, required: true },
  tagline: { type: String as PropType<string | null>, default: null },
  genres: { type: Array as PropType<TmdbGenre[]>, default: () => [] },
  releaseDate: { type: String as PropType<string | null>, default: null },
  runtime: { type: Number as PropType<number | null>, default: null },
  status: { type: String as PropType<string | null>, default: null },
  originalLanguage: { type: String as PropType<string | null>, default: null },
  trailerKey: { type: String as PropType<string | null>, default: null },
});

const isTrailerOpen = ref(false);
const isVideoLoaded = ref(false);

watch(isTrailerOpen, (val) => {
  if (!val) isVideoLoaded.value = false;
});

const releaseYear = computed(() => props.releaseDate?.split("-")[0]);

const formattedRuntime = computed(() => {
  if (!props.runtime) return null;
  const h = Math.floor(props.runtime / 60);
  const m = props.runtime % 60;
  return `${h}h${m.toString().padStart(2, "0")}`;
});
</script>

<style scoped lang="scss">
.media-header {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  &__poster {
    width: 120px;
    height: 170px;
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

  &__trailer-btn {
    align-self: flex-start;
    margin-top: auto;
    margin-left: auto;
    padding: 8px 16px;
    border-radius: 6px;
    border: 0.5px solid #ffffff33;
    background: #ffffff12;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #ffffff22;
    }
  }

  &__video-wrapper {
    position: relative;
    width: min(90dvw, calc((90dvh - 52px) * 16 / 9));
    aspect-ratio: 16 / 9;

    :deep(.loader) {
      position: absolute;
      inset: 0;
      height: 100%;
    }
  }

  &__iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    &__poster {
      width: 140px;
      height: 200px;
    }

    &__info {
      align-items: center;
    }

    &__tags {
      justify-content: center;
    }

    &__trailer-btn {
      margin-left: 0;
      margin-top: 8px;
      width: 100%;
      justify-content: center;
    }

    &__video-wrapper {
      width: 90dvw;
    }
  }
}

.tag {
  font-size: 11px;
  color: #ffffff88;
  background: #ffffff12;
  border-radius: 4px;
  padding: 3px 8px;
}
</style>
