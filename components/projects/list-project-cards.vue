<template>
  <ul class="list-project-cards">
    <li v-for="(media, index) in medias" :key="media.id">
      <project-card
        :media="media"
        :href="`${baseRoute}/${media.id}`"
        :is-hovered="hoveredIndex === index"
        @hover="whileHovering(index, media.id)"
        @leave="onLeave"
        @click="emit('open-modal', media.id)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const emit = defineEmits(["focused-project", "open-modal"]);

defineProps({
  medias: { type: Array as PropType<TmdbMedia[]>, required: true },
  baseRoute: { type: String, default: "/" },
});

const hoveredIndex = ref<number | null>(null);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

function whileHovering(index: number, mediaId: number) {
  if (hoverTimeout) clearTimeout(hoverTimeout);

  hoverTimeout = setTimeout(() => {
    hoveredIndex.value = index;
    emit("focused-project", mediaId);
    hoverTimeout = null;
  }, 300);
}

function onLeave() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  hoveredIndex.value = null;
}
</script>

<style scoped lang="scss">
.list-project-cards {
  display: flex;
  width: fit-content;
  overflow: visible;
  &:last-child {
    margin-right: 50px;
  }
  &:first-child {
    margin-left: 50px;
  }
}
</style>

<style scoped lang="scss">
.list-project-cards {
  display: flex;
  width: fit-content;
  overflow: visible;
  &:last-child {
    margin-right: 50px;
  }
  &:first-child {
    margin-left: 50px;
  }
}
</style>
