<template>
  <div v-if="providers.length" class="watch-providers">
    <p class="watch-providers__label">Disponible sur</p>
    <div class="watch-providers__list">
      <a
        v-for="p in providers"
        :key="p.provider_id"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="watch-providers__item"
        :title="p.provider_name"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w92${p.logo_path}`"
          :alt="p.provider_name"
          class="watch-providers__logo"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TmdbWatchProviders } from "~/types/ressources/TMDB/common";

const props = defineProps<{
  watchProviders?: TmdbWatchProviders;
}>();

const fr = computed(() => props.watchProviders?.results?.FR);
const link = computed(() => fr.value?.link ?? "https://www.justwatch.com/fr");
const providers = computed(() => {
  const seen = new Set<number>();
  return [...(fr.value?.flatrate ?? [])]
    .filter((p) => {
      if (p.provider_name.toLowerCase().includes("with ads")) return false;
      if (seen.has(p.provider_id)) return false;
      seen.add(p.provider_id);
      return true;
    })
    .sort((a, b) => a.display_priority - b.display_priority);
});
</script>

<style scoped lang="scss">
.watch-providers {
  display: flex;
  align-items: center;
  gap: 12px;

  &__label {
    font-size: 12px;
    color: #ffffff44;
    margin: 0;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__item {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.15s ease, opacity 0.15s ease;

    &:hover {
      transform: scale(1.08);
      opacity: 0.85;
    }
  }

  &__logo {
    width: 36px;
    height: 36px;
    object-fit: cover;
    display: block;
  }
}
</style>
