<template>
  <ul class="nav-list">
    <li v-for="route in sortedRoutes" :key="route?.name">
      <button-nav :route="route" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from "vue-router";
const props = defineProps({
  routes: { type: Array as PropType<RouteRecordNormalized[]>, required: true },
});

const sortedRoutes = computed(() =>
  [...props.routes]
    .filter((r) => r.meta?.order !== undefined && r.meta.order !== 0)
    .sort((a, b) => (a.meta.order as number) - (b.meta.order as number)),
);
</script>

<style lang="scss" scoped>
.nav-list {
  display: flex;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
