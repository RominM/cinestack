<template>
  <div class="loader">
    <div class="containLoader">
      <div class="circleGroup circle-1"></div>
      <div class="circleGroup circle-2"></div>
      <div class="circleGroup circle-3"></div>
      <div class="circleGroup circle-4"></div>
      <div class="circleGroup circle-5"></div>
      <div class="circleGroup circle-6"></div>
      <div class="circleGroup circle-7"></div>
      <div class="circleGroup circle-8"></div>

      <div class="innerText">
        <p>loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loader {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  .containLoader {
    position: relative;
    height: 60px;
    width: 60px;
    margin: auto;
    .circleGroup {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    @for $i from 1 through 8 {
      .circle-#{$i} {
        border: 7px solid rgba(163, 0, 0, 0.801);
        // border: 10px solid black;
        border-radius: 50%;
        box-sizing: border-box;
        border-right: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 7px solid transparent;
        -webkit-animation: rotate 1.2s cubic-bezier(0, 0.58, 1, 0.3) infinite;
        -moz-animation: rotate 1.2s cubic-bezier(0, 0.58, 1, 0.3) infinite;
        -o-animation: rotate 1.2s cubic-bezier(0, 0.58, 1, 0.3) infinite;
        animation: rotate 1.2s cubic-bezier(0, 0.58, 1, 0.3) infinite;

        -webkit-animation-delay: 30ms * $i;
        -moz-animation-delay: 30ms * $i;
        -o-animation-delay: 30ms * $i;
        animation-delay: 30ms * $i;
      }
    }
    .innerText {
      position: absolute;
      bottom: -40px;
      color: #ffffffd3;
      animation: flash 1.2s ease-in-out infinite;
      pointer-events: none;
    }
  }
}
@keyframes rotate {
  50% {
    border: 1px solid rgba(255, 0, 0, 0.664);
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
  }
  100% {
    transform: rotatez(360deg);
  }
}
@keyframes flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
