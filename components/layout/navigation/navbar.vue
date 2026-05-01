<template>
  <nav class="navbar">
    <nuxt-link to="/" class="navbar__nav-list__el__link"> logo </nuxt-link>

    <ul class="navbar__nav-list">
      <li
        v-for="route in sortedRoutes"
        :key="route?.name"
        class="navbar__nav-list__el"
      >
        <nuxt-link :to="route.path" class="navbar__nav-list__el__link">
          {{ route.name }}
        </nuxt-link>
      </li>
    </ul>

    <search-module />
  </nav>
</template>

<script setup lang="ts">
import { useUtils } from "~/composables/global/useUtils";
import { ERoute } from "~/types/enum/global/navigation";
import type { RouteRecordNormalized } from "vue-router";

const props = defineProps({
  routes: { type: Array as PropType<RouteRecordNormalized[]>, required: true },
});

const userRoutes = useUtils().routes.excludes([ERoute.PRIVATE]);

const sortedRoutes = computed(() =>
  [...userRoutes]
    .filter((r) => r.meta?.order !== undefined && r.meta.order !== 0)
    .sort((a, b) => (a.meta.order as number) - (b.meta.order as number)),
);
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  height: 62px;
  &__nav-list {
    align-items: center;
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    width: fit-content;
    color: #ffffff60;
    text-transform: capitalize;
    &__el {
      text-align: center;
      &__link {
        border: solid 1px #ffffff4d;
        padding: 4px 18px;
        border-radius: 48px;
        transition: 0.3s;
        &:hover,
        &.router-link-active {
          color: #fffffff6;
          border: solid 1px #fffffff6;
        }
      }
    }
  }
}
</style>
