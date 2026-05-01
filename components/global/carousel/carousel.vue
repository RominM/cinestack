<template>
  <div class="carousel-wrapper">
    <button class="arrow left" @click="prev">
      <span>&#10094;</span>
    </button>

    <div class="carousel-container" ref="container">
      <slot />
    </div>

    <button class="arrow right" @click="next">&#10095;</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const container = ref<HTMLElement | null>(null);
const scrollAmount = 350;

const prev = () => {
  if (container.value)
    container.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
};

const next = () => {
  if (container.value)
    container.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
};
</script>

<style scoped lang="scss">
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: fit-content;
  overflow: visible;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 155px 80px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  :deep(> *:first-child) {
    margin-left: 110%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  min-height: 120px;
  padding: 0 12px;
  font-size: 2rem;
  background-color: #ffffff1c;
  color: #ebebebcb;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  z-index: 9999;
  &:hover {
    color: #000;
    background-color: #d8d8d84f;
  }
}
.arrow.left {
  left: 0;
}
.arrow.right {
  right: 0;
}
</style>
