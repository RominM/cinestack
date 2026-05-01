<template>
  <div class="media-stats">
    <div class="stat">
      <span class="stat__value">{{ media.voteAverage.toFixed(1) }}</span>
      <span class="stat__label">Note</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ formatDate }}</span>
      <span class="stat__label">Sortie</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ formattedRevenue }}</span>
      <span class="stat__label">Recettes</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const props = defineProps({
  media: { type: Object as PropType<TmdbMedia>, required: true },
});

const formatDate = computed(() =>
  useUtils().date.getPrettyDate(
    new Date(props.media.releaseDate),
    "DD/MM/YYYY",
    true,
  ),
);
console.log(formatDate.value);

const formattedRevenue = computed(() => {
  // if (!props.media.revenue) return "N/A";
  // return `${(props.media.revenue / 1_000_000).toFixed(0)}M$`;
});
</script>

<style scoped lang="scss">
.media-stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 0.5px solid #ffffff18;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    gap: 4px;
    border-right: 0.5px solid #ffffff18;

    &:last-child {
      border-right: none;
    }

    &__value {
      font-size: 18px;
      font-weight: 500;
    }

    &__label {
      font-size: 11px;
      color: #ffffff55;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }
}
</style>
