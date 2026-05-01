<template>
  <div class="hero-header">
    <img
      :src="`https://image.tmdb.org/t/p/original${medias[1].backdropPath}`"
      :alt="medias[1].name"
    />
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

defineProps({
  medias: { type: Array as PropType<TmdbMedia[]>, required: true },
});
</script>

<style scoped lang="scss">
.hero-header {
  height: 70vh;
  width: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, $dark-bg 0%, transparent 100%);
    pointer-events: none;
  }
}
</style>
