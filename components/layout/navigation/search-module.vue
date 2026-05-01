<template>
  <div :class="['search-module', { isOpen: isShow }]">
    <input class="search-module__input" type="text" />
    <button class="search-module__btn" @click="isShow = !isShow">
      <h-icon :icon="Search01Icon" color="#ffffff4d" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search01Icon } from "@hugeicons/core-free-icons";

const isShow = ref<boolean>(false);
</script>

<style scoped lang="scss">
.search-module {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  border-radius: 48px;
  padding: 4px;
  transition: 0.3s;
  color: #fff;
  &.isOpen {
    padding: 4px 12px;
    background-color: #ffffff4d;
    .search-module__input {
      width: 150px;
      transition: width 0.3s;
    }
  }
  &__input {
    width: 0;
    transition: width 0.3s;
  }

  &:hover {
    background-color: #ffffff4d;
  }
}
</style>
