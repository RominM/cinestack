<template>
  <div class="genre-filter-wrapper">
    <button
      v-if="showArrows"
      class="genre-filter__arrow genre-filter__arrow--left"
      @click="scroll('left')"
      aria-label="Défiler à gauche"
    >
      ‹
    </button>

    <div class="genre-filter" ref="scrollEl">
      <button :class="['genre-filter__btn', { active: selectedId === null }]" @click="select(null)">
        Tout
      </button>
      <button
        v-for="genre in genres"
        :key="genre.id"
        :class="['genre-filter__btn', { active: selectedId === genre.id }]"
        @click="select(genre.id)"
      >
        {{ genre.name }}
      </button>
    </div>

    <button
      v-if="showArrows"
      class="genre-filter__arrow genre-filter__arrow--right"
      @click="scroll('right')"
      aria-label="Défiler à droite"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TmdbGenre } from '~/types/ressources/TMDB/common'

const props = defineProps({
  genres: { type: Array as PropType<TmdbGenre[]>, required: true },
  modelValue: { type: Array as PropType<number[]>, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const selectedId = ref<number | null>(props.modelValue.length ? props.modelValue[0] : null)

const scrollEl = ref<HTMLElement | null>(null)
const showArrows = ref(false)

function select(id: number | null) {
  selectedId.value = id
  emit('update:modelValue', id !== null ? [id] : [])
}

function scroll(direction: 'left' | 'right') {
  if (!scrollEl.value) return
  scrollEl.value.scrollBy({
    left: direction === 'left' ? -200 : 200,
    behavior: 'smooth'
  })
}

function checkOverflow() {
  console.log(scrollEl.value)

  if (!scrollEl.value) return
  const isDesktop = window.innerWidth > 768
  const overflows = scrollEl.value.scrollWidth > scrollEl.value.clientWidth
  showArrows.value = isDesktop && overflows
}

onMounted(() => {
  checkOverflow()
  window.addEventListener('resize', checkOverflow)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOverflow)
})

watch(
  () => props.genres,
  async () => {
    await nextTick()
    checkOverflow()
  }
)
</script>

<style scoped lang="scss">
.genre-filter-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 20px;
}

.genre-filter {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding-inline: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    display: block;
    min-width: 4rem;
    flex-shrink: 0;
  }

  &__btn {
    background: transparent;
    border: 1px solid #ffffff20;
    color: #ffffff60;
    padding: 5px 14px;
    border-radius: 48px;
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.2s;
    letter-spacing: 0.3px;

    &:hover {
      border-color: #ffffff50;
      color: #fff;
    }

    &.active {
      background: rgba(163, 0, 0, 0.2);
      border-color: rgba(163, 0, 0, 0.85);
      color: #fff;
    }
  }

  &__arrow {
    flex-shrink: 0;
    background: transparent;
    color: #ffffff80;
    border-radius: 50%;
    padding: 4px 10px 10px 10px;
    font-size: 32px;
    line-height: 1;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: #ffffff50;
      color: #fff;
    }
  }
}

@media screen and (max-width: 768px) {
  .genre-filter-wrapper {
    padding: 0;
    .genre-filter {
      padding-inline: 20px;
    }
  }
}
</style>
