<template>
  <div
    ref="cardRef"
    :class="['project-card', { hovered: isHovered }]"
    @mouseenter="$emit('hover')"
    @mouseleave="onLeave"
    @mousemove="onMouseMove"
    @click="router.push(href)"
  >
    <div
      class="project-card__glow"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${media.posterPath})`,
      }"
    />

    <img
      class="project-card__img"
      :src="`https://image.tmdb.org/t/p/w500${media.posterPath}`"
      :alt="media.name"
    />

    <div class="project-card__shine" :style="shineStyle" />

    <div class="project-card__overlay">
      <span class="project-card__overlay__title">{{ media.name }}</span>
      <div class="project-card__overlay__meta">
        <span v-if="year">{{ year }}</span>
        <span
          v-if="media.voteAverage"
          class="project-card__overlay__meta__rate"
        >
          ★ {{ media.voteAverage.toFixed(1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCardTilt } from "~/composables/global/card/useCardTilt";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

const props = defineProps({
  media: { type: Object as PropType<TmdbMedia>, required: true },
  href: { type: String, required: true },
  isHovered: { type: Boolean, required: true },
});

const router = useRouter();
const emit = defineEmits(["hover", "leave"]);
const { cardRef, shineStyle, onMouseMove, resetTilt } = useCardTilt();

const year = computed(() => props.media.releaseDate?.slice(0, 4) ?? "");

watch(
  () => props.isHovered,
  (val) => {
    if (!cardRef.value) return;
    cardRef.value.style.transform = val
      ? "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.2) translateY(-20px)"
      : "";
  },
);

function onLeave(e: MouseEvent) {
  resetTilt();
  emit("leave");
}
</script>

<style scoped lang="scss">
.project-card {
  position: relative;
  width: 230px;
  height: 40dvh;
  border-radius: 14px;
  margin-right: -40px;
  overflow: hidden;
  transition:
    transform 0.5s ease,
    margin-right 0.4s ease;
  transform-style: preserve-3d;
  transform: scale(0.9) perspective(800px) rotateY(35deg);
  box-shadow: -15px 3px 30px #000000b2;
  cursor: pointer;
  overflow: visible;

  &__glow {
    position: absolute;
    inset: -15px;
    border-radius: 26px;
    background-size: cover;
    background-position: center;
    filter: blur(28px) saturate(2.5) brightness(1.2);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 14px;
  }

  &__shine {
    position: absolute;
    inset: 0;
    opacity: 0;
    border-radius: 14px;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 12px 12px;
    background: linear-gradient(
      to top,
      rgb(0, 0, 0) 0%,
      transparent 100%
    );
    display: flex;
    flex-direction: column;
    gap: 4px;
    transform: translateY(4px);
    opacity: 0;
    border-radius: 0 0 14px 14px;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;

    &__title {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: #ffffff70;

      &__rate {
        color: #f5c518;
      }
    }
  }

  &.hovered {
    margin-right: -30px;
    z-index: 10;
    overflow: visible;

    .project-card__glow {
      opacity: 0.8;
    }
    .project-card__shine {
      opacity: 1;
    }
    .project-card__overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
