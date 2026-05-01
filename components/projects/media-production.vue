<template>
  <div v-if="companies.length" class="media-production">
    <h3 class="media-production__title">Production</h3>
    <div class="media-production__list">
      <span v-for="company in companies" :key="company.id" class="tag">
        {{ company.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  companies: {
    type: Array as PropType<
      {
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
      }[]
    >,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.media-production {
  &__title {
    font-size: 13px;
    color: #ffffff66;
    margin: 0 0 12px;
    font-weight: 400;
  }

  &__list {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
}

.tag {
  font-size: 11px;
  color: #ffffff88;
  background: #ffffff12;
  border-radius: 4px;
  padding: 3px 8px;
}
</style>
