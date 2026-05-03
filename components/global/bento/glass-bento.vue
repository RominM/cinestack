<template>
  <div class="glass-bento" :class="{ transparent }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ transparent: Boolean });
</script>

<style scoped lang="scss">
.glass-bento {
  background: $dark-bg;
  backdrop-filter: none;
  transition: all 0.3s ease;

  &.transparent {
    background: rgba(255, 255, 255, 0.11);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.664);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(6.3px);
  }
}
</style>
