<template>
  <div class="hero-header">
    <img :src="projects[1].picture.src_l[1]" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { TProject } from "~/types/type/project";

defineProps({
  projects: { type: Array as PropType<TProject[]>, required: true },
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
