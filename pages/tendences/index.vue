<template>
  <div class="projects">
    <hero />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: "home",
  layout: "main-layout",
  order: 1,
});
</script>

<style scoped lang="scss">
.projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  overflow: hidden;
}

.fake-bento {
  display: flex;
  flex-direction: column;
  // width: 750px;
  height: 100%;
}

.txt {
  color: #000;
}
</style>
