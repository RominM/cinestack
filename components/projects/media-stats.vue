<template>
  <div class="media-stats">
    <div class="stat">
      <span class="stat__value">{{ voteAverage.toFixed(1) }}</span>
      <span class="stat__label">Note</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ formatDate }}</span>
      <span class="stat__label">Sortie</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ formattedBudget }}</span>
      <span class="stat__label">Budget</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ formattedRevenue }}</span>
      <span class="stat__label">Recettes</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUtils } from "~/composables/global/useUtils";

const props = defineProps({
  voteAverage: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  budget: { type: Number as PropType<number | null>, default: null },
  revenue: { type: Number as PropType<number | null>, default: null },
});

const formatDate = computed(() =>
  useUtils().date.getPrettyDate(
    new Date(props.releaseDate),
    "DD/MM/YYYY",
    true,
  ),
);

const formattedBudget = computed(() => {
  if (!props.budget) return "N/A";
  return `${(props.budget / 1_000_000).toFixed(0)}M$`;
});

const formattedRevenue = computed(() => {
  if (!props.revenue) return "N/A";
  return `${(props.revenue / 1_000_000).toFixed(0)}M$`;
});
</script>

<style scoped lang="scss">
.media-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    .stat {
      &:nth-child(2) {
        border-right: none;
      }

      &:nth-child(3) {
        border-top: 0.5px solid #ffffff18;
      }

      &:nth-child(4) {
        border-top: 0.5px solid #ffffff18;
        border-right: none;
      }
    }
  }
}
</style>
