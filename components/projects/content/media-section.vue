<template>
  <div class="media-section">
    <h2 class="media-section__title">{{ title }}</h2>
    <carousel ref="carouselRef">
      <search-card
        v-for="item in items"
        :key="item.id"
        :media="item"
        :href="`${baseRoute}/${item.id}`"
      />
      <template v-if="isLoading">
        <div v-for="i in 3" :key="`sk-${i}`" class="media-section__skeleton" />
      </template>
      <div ref="sentinel" class="media-section__sentinel" />
    </carousel>
  </div>
</template>

<script setup lang="ts">
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

type FetchResult = { items: TmdbMedia[]; totalPages: number } | null;

const props = defineProps<{
  title: string;
  baseRoute: string;
  fetchFn: (page: number) => Promise<FetchResult>;
}>();

const carouselRef = ref<{ container: HTMLElement | null } | null>(null);
const sentinel = ref<HTMLElement | null>(null);

const items = ref<TmdbMedia[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

async function fetch() {
  if (isLoading.value || currentPage.value > totalPages.value) return;
  isLoading.value = true;
  const result = await props.fetchFn(currentPage.value);
  isLoading.value = false;
  if (!result) return;
  items.value.push(...result.items);
  totalPages.value = result.totalPages;
  currentPage.value++;
}

onMounted(async () => {
  await fetch();

  const container = carouselRef.value?.container;
  if (!container || !sentinel.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetch();
    },
    { root: container, threshold: 0.1 },
  );

  observer.observe(sentinel.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<style scoped lang="scss">
.media-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff80;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
    padding-inline: 4rem;

    @media (max-width: 768px) {
      padding-inline: 1.5rem;
    }
  }

  :deep(.carousel-container) {
    padding: 20px 4rem;
    gap: 16px;

    @media (max-width: 768px) {
      padding: 16px 1.5rem;
    }
  }

  &__skeleton {
    flex-shrink: 0;
    width: 160px;
    height: 240px;
    border-radius: 12px;
    background: linear-gradient(90deg, #ffffff08 25%, #ffffff14 50%, #ffffff08 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }

  &__sentinel {
    flex-shrink: 0;
    width: 1px;
    height: 100%;
  }
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
