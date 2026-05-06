<template>
  <div class="hero-header">
    <div class="hero-header__track" :style="trackStyle">
      <div v-for="(item, i) in movies" :key="item.id" class="hero-header__slide">
        <img
          v-if="item.backdropPath"
          :src="`https://image.tmdb.org/t/p/original${item.backdropPath}`"
          :alt="item.name"
          :style="i === currentIndex ? { transform: `translateY(${parallaxOffset}px)` } : {}"
        />
        <div v-else class="hero-header__slide__fallback">
          <h-icon :icon="CameraVideoIcon" color="#fff" :size="120" />
          <span style="color: #fff">{{ item.name }}</span>
        </div>

        <iframe
          v-if="i === currentIndex && trailerReady && item.trailerKey"
          :src="`https://www.youtube.com/embed/${item.trailerKey}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`"
          frameborder="0"
          allow="autoplay; encrypted-media"
          :class="['hero-header__slide__trailer', { 'hero-header__slide__trailer--visible': trailerVisible }]"
        />

        <div class="hero-header__slide__gradient" />
        <hero-content v-if="showContent" :media="item" />
      </div>
    </div>

    <div v-if="movies.length > 1" class="hero-header__dots">
      <button
        v-for="(_, i) in movies"
        :key="i"
        :class="['hero-header__dots__dot', { active: i === currentIndex }]"
        @click="currentIndex = i"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CameraVideoIcon } from '@hugeicons/core-free-icons'
import type { TmdbMedia } from '~/types/ressources/TMDB/common'
import { useTrailerAvailability } from '~/composables/global/useTrailerAvailability'

const props = defineProps({
  movies: {
    type: Array as PropType<TmdbMedia[]>,
    required: true
  },
  showContent: { type: Boolean, default: false }
})

const TRAILER_DISPLAY_MS = 20_000
const TRAILER_DELAY_MS = 4_500
const FADE_MS = 1_500

const currentIndex = ref(0)
const parallaxOffset = ref(0)
const trailerReady = ref(false)
const trailerVisible = ref(false)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`
}))

let autoplayInterval: ReturnType<typeof setInterval> | null = null
let trailerTimeout: ReturnType<typeof setTimeout> | null = null
let remountTimeout: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null
let resetGen = 0

function clearAllTimers() {
  if (trailerTimeout) {
    clearTimeout(trailerTimeout)
    trailerTimeout = null
  }
  if (remountTimeout) {
    clearTimeout(remountTimeout)
    remountTimeout = null
  }
}

const { checkTrailerAvailable } = useTrailerAvailability()

async function resetTrailerTimer() {
  const gen = ++resetGen
  clearAllTimers()
  trailerVisible.value = false
  trailerReady.value = false

  const key = props.movies[currentIndex.value]?.trailerKey
  if (!key) return

  const available = await checkTrailerAvailable(key)
  if (gen !== resetGen) return

  if (!available) return

  trailerReady.value = true
  trailerTimeout = setTimeout(() => {
    trailerVisible.value = true
    trailerTimeout = setTimeout(cycleTrailer, TRAILER_DISPLAY_MS)
  }, TRAILER_DELAY_MS)
}

function cycleTrailer() {
  clearAllTimers()
  trailerVisible.value = false

  trailerTimeout = setTimeout(() => {
    trailerReady.value = false
    remountTimeout = setTimeout(() => {
      remountTimeout = null
      if (!props.movies[currentIndex.value]?.trailerKey) return
      trailerReady.value = true
      trailerTimeout = setTimeout(() => {
        trailerVisible.value = true
        trailerTimeout = setTimeout(cycleTrailer, TRAILER_DISPLAY_MS)
      }, TRAILER_DELAY_MS)
    }, 100)
  }, FADE_MS)
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    parallaxOffset.value = window.scrollY * 0.4
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  resetTrailerTimer()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (autoplayInterval) clearInterval(autoplayInterval)
  clearAllTimers()
})

watch(currentIndex, resetTrailerTimer)

watch(
  () => props.movies.length,
  (length) => {
    if (length > 1 && !autoplayInterval) {
      autoplayInterval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.movies.length
      }, 7000)
    }
    resetTrailerTimer()
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.hero-header {
  height: 70vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 68px;
  border-radius: 24px 24px 0 0;

  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &__slide {
    position: relative;
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

    &__trailer {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 56.25vw;
      min-height: 100%;
      min-width: 177.78vh;
      transform: translate(-50%, -50%);
      border: none;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1.5s ease;
      z-index: 1;

      &--visible {
        opacity: 1;
      }
    }

    &__fallback {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      height: 100%;
    }

    &__gradient {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 70%;
      background: linear-gradient(to top, $dark-bg 0%, transparent 100%);
      pointer-events: none;
      z-index: 2;
    }
  }

  &__dots {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 14px;
    z-index: 10;
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
  }
}

@media screen and (max-width: 768px) {
  .hero-header {
    height: 50vh;
  }
}
</style>
