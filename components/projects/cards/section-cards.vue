<template>
  <div class="section-cards">
    <div class="section-cards__header">
      <h2 class="section-cards__header__title">
        {{ useUtils().string.capitalizeFirstLetter(title) }}
      </h2>
      <nuxt-link :to="baseRoute" class="section-cards__header__link">
        <span>Voir plus</span>
        <h-icon
          :icon="ArrowRight01Icon"
          class="section-cards__header__link__arrow"
        />
      </nuxt-link>
    </div>
    <carousel>
      <list-project-cards :medias="medias" :base-route="baseRoute" />
    </carousel>
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useUtils } from "~/composables/global/useUtils";

defineProps({
  medias: { type: Array as PropType<TmdbMedia[]>, required: true },
  baseRoute: { type: String, default: "/" },
  title: { type: String, default: "" },
});
</script>

<style scoped lang="scss">
.section-cards {
  display: flex;
  flex-direction: column;
  margin-bottom: -110px;
  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: -140px;
    color: #fff;
    z-index: 9;
    &__title {
      text-decoration: underline $secondary;
    }
    &__link {
      display: flex;
      align-items: center;
      gap: 0;
      overflow: hidden;
      text-decoration: none;
      padding: 0 8px;
      color: #ffffff60;
      transition: color 0.3s;

      &__arrow {
        opacity: 0;
        transform: translateX(-8px);
        transition:
          opacity 0.3s ease,
          transform 0.3s ease;
      }

      &:hover {
        color: #fff;

        .section-cards__title__link__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        span {
          transform: translateX(-4px);
        }
      }

      span {
        transition: transform 0.2s ease;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .section-cards {
    &__header {
      margin-bottom: 0;
    }
    &__title {
      margin-bottom: 0px;
    }
  }
}
</style>
