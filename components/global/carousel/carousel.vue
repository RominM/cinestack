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
const container = ref<HTMLElement | null>(null);

const getScrollAmount = () => {
  return container.value ? container.value.clientWidth * 0.8 : 350;
};

defineExpose({ container });

const prev = () => {
  container.value?.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
};

const next = () => {
  container.value?.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
};
</script>

<style scoped lang="scss">
.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden; // clip les flèches proprement
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 155px 80px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;

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
  background-color: #0000001c;
  color: #f7f7f7cb;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  z-index: 9;

  &:hover {
    color: #111111f3;
    background-color: #3b3b3bbd;
  }

  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}

@media screen and (max-width: 768px) {
  .carousel-container {
    padding: 20px;
  }
  .arrow {
    display: none;
  }
}
</style>
