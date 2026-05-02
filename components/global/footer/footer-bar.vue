<!-- components/layout/FooterBar.vue -->
<template>
  <footer class="footer">
    <span>© {{ year }} CineStack | mgl@studios</span>
    <span
      >Powered by
      <a href="https://www.themoviedb.org" target="_blank">TMDB</a>
    </span>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  color: #ffffff20;
  font-size: 14px;

  a {
    color: #ffffff40;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }
  }
}
</style>
