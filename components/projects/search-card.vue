<template>
  <div
    ref="cardRef"
    class="search-card"
    :title="media.name"
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
    <div v-else class="search-card__fallback">
      <h-icon :icon="CameraVideoIcon" color="#ffffff30" :size="40" />
      <span>{{ media.name }}</span>
    </div>

    <div class="search-card__shine" :style="shineStyle" />

    <div class="search-card__overlay">
      <span class="search-card__overlay__title">{{ media.name }}</span>
      <div class="search-card__overlay__meta">
        <span v-if="year">{{ year }}</span>
        <span v-if="media.voteAverage" class="search-card__overlay__meta__rate">
          ★ {{ media.voteAverage.toFixed(1) }}
        </span>
      </div>
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

const year = computed(() => props.media.releaseDate?.slice(0, 4) ?? "");

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
  width: 160px;
  border-radius: 14px;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.3s ease;

  &__glow {
    position: absolute;
    inset: -12px;
    border-radius: 16px;
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
    height: 230px;
    object-fit: cover;
    border-radius: 12px;
    display: block;
  }

  &__fallback {
    width: 100%;
    height: 230px;
    border-radius: 12px;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
      color: #ffffff30;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      padding: 0 8px;
    }
  }

  &__shine {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 10px 10px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      transparent 100%
    );
    border-radius: 0 0 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;

    &__title {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #ffffff70;

      &__rate {
        color: #f5c518;
      }
    }
  }

  &:hover {
    .search-card__glow {
      opacity: 0.7;
    }
    .search-card__shine {
      opacity: 1;
    }
    .search-card__overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
