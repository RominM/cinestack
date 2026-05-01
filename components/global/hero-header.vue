<template>
  <div class="hero-header">
    <div class="hero-header__track" :style="trackStyle">
      <div v-for="(item, i) in srcs" :key="i" class="hero-header__slide">
        <img
          :src="`https://image.tmdb.org/t/p/original${item.src}`"
          :alt="item.alt"
          :style="
            i === currentIndex
              ? { transform: `translateY(${parallaxOffset}px)` }
              : {}
          "
        />
      </div>
    </div>

    <div v-if="srcs.length > 1" class="hero-header__dots">
      <button
        v-for="(_, i) in srcs"
        :key="i"
        :class="['hero-header__dot', { active: i === currentIndex }]"
        @click="currentIndex = i"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  srcs: {
    type: Array as PropType<{ src: string; alt: string }[]>,
    required: true,
  },
});

const imgRef = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const parallaxOffset = ref(0);

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}));

let autoplayInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  if (autoplayInterval) clearInterval(autoplayInterval);
});

let rafId: number | null = null;

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    parallaxOffset.value = window.scrollY * 0.4;
  });
}

watch(
  () => props.srcs.length,
  (length) => {
    if (length > 1 && !autoplayInterval) {
      autoplayInterval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.srcs.length;
      }, 5000);
    }
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.hero-header {
  height: 80vh;
  width: 100%;
  overflow: hidden;
  position: relative;

  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &__slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 130%;
      object-fit: cover;
      object-position: center top;
    }
  }

  &__dots {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ffffff44;
    border: none;
    cursor: pointer;
    pointer-events: all;
    transition:
      background 0.3s ease,
      transform 0.3s ease;

    &.active {
      background: #fff;
      transform: scale(1.3);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, $dark-bg 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }
}
</style>
