<template>
  <div class="movies"></div>
</template>

<script setup lang="ts">
definePageMeta({
  key: "movies",
  layout: "main-layout",
  order: 2,
});

useHead({ title: "Films" });
</script>

<style lang="scss" scoped>
.experiences {
  height: 100%;
  width: 100%;
}
</style>
