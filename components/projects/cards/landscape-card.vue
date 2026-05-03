<template>
  <div class="landscape-card" @click="onClick(href)">
    <div class="landscape-card__img-wrapper">
      <img
        v-if="media.backdropPath"
        class="landscape-card__img"
        :src="`https://image.tmdb.org/t/p/w780${media.backdropPath}`"
        :alt="media.name"
      />
      <div v-else class="landscape-card__fallback">
        <h-icon :icon="CameraVideoIcon" color="#ffffff20" :size="32" />
      </div>
      <div class="landscape-card__overlay" />
    </div>

    <div class="landscape-card__info">
      <span v-if="media.voteAverage" class="landscape-card__rating">
        ★ {{ media.voteAverage.toFixed(1) }}
      </span>
      <h3 class="landscape-card__title">{{ media.name }}</h3>
      <p v-if="media.overview" class="landscape-card__overview">{{ media.overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CameraVideoIcon } from "@hugeicons/core-free-icons";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

defineProps<{
  media: TmdbMedia;
  href: string;
}>();

const router = useRouter();
function onClick(href: string) {
  router.push(href);
}
</script>

<style scoped lang="scss">
.landscape-card {
  flex-shrink: 0;
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #ffffff08;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-4px);

    .landscape-card__img {
      transform: scale(1.04);
    }
  }

  &__img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    display: block;
  }

  &__fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff0a;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.7) 100%);
  }

  &__info {
    padding: 10px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__rating {
    font-size: 11px;
    color: #f5c518;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__overview {
    font-size: 11px;
    color: #ffffff60;
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
