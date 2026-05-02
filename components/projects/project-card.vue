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

watch(
  () => props.isHovered,
  (val) => {
    if (!cardRef.value) return;
    if (val) {
      cardRef.value.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.2) translateY(-20px)`;
    } else {
      cardRef.value.style.transform = "";
    }
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
  border-radius: 24px;
  margin-right: -40px;
  overflow: visible;
  transition:
    transform 0.5s ease,
    margin-right 0.4s ease;
  transform-style: preserve-3d;
  transform: scale(0.9) perspective(800px) rotateY(35deg);
  box-shadow: -15px 3px 30px #000000b2;
  cursor: pointer;

  &__glow {
    position: absolute;
    inset: -15px;
    border-radius: 26px;
    background-size: cover;
    background-position: center;
    transform: scale(1.02);
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
    border-radius: 14px;
    display: block;
  }

  &__shine {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &.hovered {
    margin-right: -30px;
    z-index: 10;
    .project-card__glow {
      opacity: 0.8;
    }

    .project-card__shine {
      opacity: 1;
    }
  }
}
</style>
