<template>
  <div :class="['search-module', { isOpen: store.isOpen || isFocused }]">
    <input
      class="search-module__input"
      type="text"
      :value="store.query"
      @input="search(($event.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.escape="clear"
    />
    <button class="search-module__btn" @click="toggleSearch">
      <h-icon
        :icon="store.isLoading ? Loading03Icon : Search01Icon"
        color="#ffffff4d"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { useSearch } from "~/composables/global/search/useSearch";
import { useSearchStore } from "~/store/useSearchStore";

const store = useSearchStore();
const { search, clear } = useSearch();

const isFocused = ref(false);

const toggleSearch = () => {
  if (store.isOpen) {
    store.close();
  } else {
    store.isOpen = true;
  }
};
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
    background-color: #ffffff1a;

    .search-module__input {
      width: 180px;
    }
  }

  &__input {
    width: 0;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 13px;
    transition: width 0.3s;

    &::placeholder {
      color: #ffffff40;
    }
  }

  &__btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: #ffffff1a;
  }
}
</style>
