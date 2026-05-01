<template>
  <div class="hero-header">
    <img
      ref="imgRef"
      :src="`https://image.tmdb.org/t/p/original${featured.backdropPath}`"
      :alt="featured.name"
    />
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const props = defineProps({
  medias: { type: Array as PropType<TmdbMedia[]>, required: true },
});

const imgRef = ref<HTMLElement | null>(null);
const featured = computed(() =>
  props.medias.length > 1 ? props.medias[1] : props.medias[0],
);

function onScroll() {
  if (!imgRef.value) return;
  const offset = window.scrollY * 0.6;
  imgRef.value.style.transform = `translateY(${offset}px)`;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped lang="scss">
.hero-header {
  height: 80vh;
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
