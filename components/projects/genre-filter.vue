<template>
  <div class="genre-filter">
    <button
      v-for="genre in genres"
      :key="genre.id"
      :class="['genre-filter__btn', { active: selectedIds.includes(genre.id) }]"
      @click="toggle(genre.id)"
    >
      {{ genre.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TmdbGenre } from "~/types/ressources/TMDB/common";

const props = defineProps({
  genres: { type: Array as PropType<TmdbGenre[]>, required: true },
  modelValue: { type: Array as PropType<number[]>, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

const selectedIds = ref<number[]>(props.modelValue);

function toggle(id: number) {
  const idx = selectedIds.value.indexOf(id);
  if (idx === -1) {
    selectedIds.value.push(id);
  } else {
    selectedIds.value.splice(idx, 1);
  }
  emit("update:modelValue", [...selectedIds.value]);
}
</script>

<style scoped lang="scss">
.genre-filter {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  &__btn {
    background: transparent;
    border: 1px solid #ffffff20;
    color: #ffffff60;
    padding: 5px 14px;
    border-radius: 48px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.2s;
    letter-spacing: 0.3px;

    &:hover {
      border-color: #ffffff50;
      color: #fff;
    }

    &.active {
      background: rgba(163, 0, 0, 0.2);
      border-color: rgba(163, 0, 0, 0.85);
      color: #fff;
    }
  }
}
</style>
