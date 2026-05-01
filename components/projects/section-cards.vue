<template>
  <div class="section-cards">
    <h2 class="section-cards__title">{{ title }}</h2>
    <carousel>
      <list-project-cards :medias="medias" base-route="/films" />
    </carousel>
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

defineProps({
  medias: { type: Array as PropType<TmdbMedia[]>, required: true },
  baseRoute: { type: String, default: "/" },
  title: { type: String, default: "" },
});
</script>

<style scoped lang="scss">
.section-cards {
  display: flex;
  flex-direction: column;
  &__title {
    position: relative;
    padding-left: 20px;
    margin-bottom: -140px;
    width: 150px;
    color: #fff;
  }
}
</style>
