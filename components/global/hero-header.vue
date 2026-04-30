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
  height: 80vh;
  width: 100%;
  overflow: hidden;
  img {
    object-fit: cover;
  }
}
</style>
