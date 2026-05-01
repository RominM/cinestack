<template>
  <div class="movie">LE FLIM {{ id }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  key: "movies",
  layout: "main-layout",
  order: 2,
});

const route = useRoute();
const id = route.params.id;
</script>

<style scoped lang="scss">
.movie {
}
</style>
