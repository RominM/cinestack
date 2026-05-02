<template>
  <div
    ref="cardRef"
    class="search-card"
    :title="`${media.name}`"
    @mousemove="onMouseMove"
    @mouseenter="applyTilt"
    @mouseleave="onLeave"
    @click="onClick(href)"
  >
    <div
      class="search-card__glow"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${media.posterPath})`,
      }"
    />
    <img
      v-if="media.posterPath"
      class="search-card__img"
      :src="`https://image.tmdb.org/t/p/w500${media.posterPath}`"
      :alt="media.name"
    />
    <div v-else class="hero-header__slide__fallback">
      <h-icon :icon="CameraVideoIcon" color="#fff" :size="120" />
      <span style="color: #fff">{{ media.name }}</span>
    </div>

    <div class="search-card__shine" :style="shineStyle" />
    <div class="search-card__info">
      <span class="search-card__title">{{ media.name }}</span>
      <span class="search-card__meta">{{ meta }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CameraVideoIcon } from "@hugeicons/core-free-icons";
import { useCardTilt } from "~/composables/global/card/useCardTilt";
import { useSearchStore } from "~/store/useSearchStore";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const props = defineProps({
  media: { type: Object as PropType<TmdbMedia>, required: true },
  href: { type: String, required: true },
});

const store = useSearchStore();

const router = useRouter();
const { cardRef, shineStyle, onMouseMove, applyTilt, resetTilt } =
  useCardTilt();

const meta = computed(() => {
  const year = props.media.releaseDate?.slice(0, 4) ?? "";
  const rating = props.media.voteAverage?.toFixed(1) ?? "";
  return [year, rating].filter(Boolean).join(" · ");
});

function onLeave() {
  resetTilt();
}

function onClick(href: string) {
  store.close();
  router.push(href);
}
</script>

<style scoped lang="scss">
.search-card {
  position: relative;
  width: 120px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: visible;

  &__glow {
    position: absolute;
    inset: -10px;
    border-radius: 14px;
    background-size: cover;
    background-position: center;
    filter: blur(20px) saturate(2) brightness(1.2);
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &__img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  &__shine {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &__info {
    padding: 8px 2px 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__meta {
    color: #ffffff50;
    font-size: 11px;
  }

  &:hover {
    .search-card__glow {
      opacity: 0.7;
    }
    .search-card__shine {
      opacity: 1;
    }
  }
}
</style>
