<template>
  <nav class="navbar">
    <nuxt-link to="/" class="logo" title="Accueil CineStack">
      <logo />
    </nuxt-link>

    <ul class="navbar__nav-list">
      <li
        v-for="route in sortedRoutes"
        :key="route?.name"
        class="navbar__nav-list__el"
      >
        <nuxt-link
          :to="route.path"
          :title="route.name"
          class="navbar__nav-list__el__link"
          :class="{
            'navbar__nav-list__el__link--active': currentRoute.path.startsWith(
              route.path,
            ),
          }"
        >
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

const userRoutes = useUtils().routes.excludes([ERoute.PRIVATE]);
const currentRoute = useRoute();

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
  justify-content: space-between;
  padding: 0 4rem;
  height: 62px;

  &__nav-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
        color: #ffffff50;
        font-size: 16px;
        padding: 5px 16px;
        border-radius: 6px;
        text-decoration: none;
        transition: 0.2s;
        letter-spacing: 0.3px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: $secondary;
          border-radius: 1px;
          transition: 0.2s;
        }

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }

        &--active {
          color: #fff;
          background: transparent;

          &::after {
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
