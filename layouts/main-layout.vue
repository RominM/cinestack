<template>
  <div class="main-layout">
    <glass-bento class="main-layout__topbar" :transparent="scrolled">
      <navbar />
    </glass-bento>

    <search-overlay />

    <div class="main-layout__content">
      <slot />
      <footer-bar />
    </div>
  </div>
</template>

<script setup lang="ts">
const scrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 50;
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {});
});
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: $dark-bg;
  overflow: hidden;
  &__topbar {
    position: fixed;
    top: 0;
    width: 100%;
    transition: background-color 0.3s ease;
    z-index: 9999;
  }
}
</style>
