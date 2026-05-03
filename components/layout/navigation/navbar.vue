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

    <div class="navbar__actions">
      <search-module />
      <button class="navbar__burger" @click="mobileOpen = !mobileOpen">
        <h-icon :icon="mobileOpen ? Cancel01Icon : Menu01Icon" color="#fff" />
      </button>
    </div>
  </nav>

  <Teleport to="body">
    <transition name="fade">
      <div v-if="mobileOpen" class="navbar__backdrop" @click="mobileOpen = false" />
    </transition>

    <transition name="mobile-menu">
      <div v-if="mobileOpen" class="navbar__mobile-menu">
        <ul class="navbar__mobile-menu__list">
          <li
            v-for="route in sortedRoutes"
            :key="route?.name"
          >
            <nuxt-link
              :to="route.path"
              class="navbar__mobile-menu__link"
              :class="{
                'navbar__mobile-menu__link--active': currentRoute.path.startsWith(route.path),
              }"
              @click="mobileOpen = false"
            >
              {{ route.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useUtils } from "~/composables/global/useUtils";
import { ERoute } from "~/types/enum/global/navigation";

const userRoutes = useUtils().routes.excludes([ERoute.PRIVATE]);
const currentRoute = useRoute();

const mobileOpen = ref(false);

const sortedRoutes = computed(() =>
  [...userRoutes]
    .filter((r) => r.meta?.order !== undefined && r.meta.order !== 0)
    .sort((a, b) => (a.meta.order as number) - (b.meta.order as number)),
);

watch(() => currentRoute.path, () => {
  mobileOpen.value = false;
});
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

  &__actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__burger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;

    &__nav-list {
      display: none;
    }

    &__burger {
      display: flex;
      align-items: center;
    }

    &__actions {
      flex: 1;
      justify-content: flex-end;
      margin-left: 12px;

      :deep(.search-module.isOpen) {
        flex: 1;

        .search-module__input {
          width: 100%;
          min-width: 0;
        }
      }
    }
  }
}


:global(.navbar__backdrop) {
  position: fixed;
  inset: 0;
  top: 62px;
  z-index: 9997;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
}

:global(.navbar__mobile-menu) {
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  z-index: 9998;
  background-color: $dark-bg;
  border-top: 1px solid #ffffff10;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

:global(.navbar__mobile-menu__list) {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

:global(.navbar__mobile-menu__link) {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 16px;
  color: #ffffff70;
  text-decoration: none;
  text-transform: capitalize;
  transition: background 0.15s, color 0.15s;
}
:global(.navbar__mobile-menu__link:hover) {
  background: #ffffff0d;
  color: #fff;
}
:global(.navbar__mobile-menu__link--active) {
  color: #fff;
  background: #ffffff0d;
}

:global(.fade-enter-active),
:global(.fade-leave-active) {
  transition: opacity 0.2s ease;
}
:global(.fade-enter-from),
:global(.fade-leave-to) {
  opacity: 0;
}

:global(.mobile-menu-enter-active),
:global(.mobile-menu-leave-active) {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
:global(.mobile-menu-enter-from),
:global(.mobile-menu-leave-to) {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
