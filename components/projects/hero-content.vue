<template>
  <div class="hero-content">
    <h1 class="hero-content__title">{{ media.name }}</h1>
    <p class="hero-content__overview">
      {{ media.overview }}
    </p>
    <span class="hero-content__average">
      {{ media.voteAverage.toFixed(1) }}
      <h-icon :icon="StarIcon" color="#FFC107" size="16px" />
    </span>

    <nuxt-link :to="`/films/${media.id}`" class="hero-content__action">
      Découvrir
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@hugeicons/core-free-icons";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

defineProps({
  media: { type: Object as PropType<TmdbMedia>, default: null },
});
</script>

<style scoped lang="scss">
.hero-content {
  position: absolute;
  bottom: 100px;
  left: 50px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #fff;
  z-index: 999;
  &__title {
    font-size: 52px;
  }

  &__overview {
    max-width: 60%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 400;
  }

  &__average {
    display: flex;
    gap: 4px;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    width: fit-content;
    background-color: #ffffff34;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 175px;
    height: 38px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }
}
</style>
