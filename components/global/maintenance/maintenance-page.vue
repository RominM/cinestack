<template>
  <div class="maintenance">
    <div class="maintenance__content">
      <div class="maintenance__logo">
        <logo />
      </div>

      <div class="maintenance__icon">
        <h-icon :icon="Settings02Icon" color="#ffffff20" :size="80" />
      </div>

      <h1 class="maintenance__title">Maintenance en cours</h1>
      <p class="maintenance__subtitle">
        On revient très vite. Merci pour votre patience.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Settings02Icon } from "@hugeicons/core-free-icons";

definePageMeta({
  layout: false,
});

useHead({ title: "Maintenance — CineStack" });
</script>

<style scoped lang="scss">
$--topbar: 62px;
$--footer: 20px;

.maintenance {
  min-height: calc(100vh - $--topbar - $--footer);
  background-color: $dark-bg;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    line-height: 1;
    margin-bottom: 1rem;

    span:first-child {
      color: #fff;
      font-size: 22px;
      font-weight: 500;
    }

    span:last-child {
      color: rgba(163, 0, 0, 0.85);
      font-size: 22px;
      font-weight: 500;
    }
  }

  &__icon {
    animation: spin 6s linear infinite;
  }

  &__title {
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }

  &__subtitle {
    color: #ffffff40;
    font-size: 14px;
    margin: 0;
    line-height: 1.6;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
