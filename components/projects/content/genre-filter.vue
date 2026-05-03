<template>
  <div class="genre-filter">
    <button
      :class="['genre-filter__btn', { active: selectedId === null }]"
      @click="select(null)"
    >
      Tout
    </button>
    <button
      v-for="genre in genres"
      :key="genre.id"
      :class="['genre-filter__btn', { active: selectedId === genre.id }]"
      @click="select(genre.id)"
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

const selectedId = ref<number | null>(
  props.modelValue.length ? props.modelValue[0] : null,
);

function select(id: number | null) {
  selectedId.value = id;
  emit("update:modelValue", id !== null ? [id] : []);
}
</script>

<style scoped lang="scss">
.genre-filter {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding-inline: 4rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: "";
    display: block;
    min-width: 4rem;
    flex-shrink: 0;
  }

  &__btn {
    background: transparent;
    border: 1px solid #ffffff20;
    color: #ffffff60;
    padding: 5px 14px;
    border-radius: 48px;
    font-size: 12px;
    white-space: nowrap;
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
