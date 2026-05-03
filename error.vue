<template>
  <div class="error-page">
    <div class="error-page__content">
      <logo class="error-page__logo" />

      <div class="error-page__code">404</div>

      <p class="error-page__message">
        Cette page n'existe pas ou a été déplacée.
      </p>

      <nuxt-link to="/" class="error-page__link">
        Retour à l'accueil
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "404 · Page introuvable" });
</script>

<style scoped lang="scss">
.error-page {
  min-height: 100dvh;
  background-color: $dark-bg;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    padding: 24px;
  }

  &__logo {
    margin-bottom: 12px;
  }

  &__code {
    font-size: clamp(80px, 15vw, 140px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -4px;
    color: $secondary;
  }

  &__message {
    font-size: 15px;
    color: $dark-text-secondary;
    margin: 0;
    max-width: 300px;
    line-height: 1.6;
  }

  &__link {
    margin-top: 8px;
    font-size: 13px;
    color: #ffffff60;
    text-decoration: none;
    border: 1px solid #ffffff18;
    padding: 10px 24px;
    border-radius: 999px;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      border-color: #ffffff40;
      background: #ffffff08;
    }
  }
}
</style>
