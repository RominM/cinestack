<template>
  <div class="tendances">
    <div class="tendances__header">
      <div class="tendances__type-filter">
        <button
          :class="['tendances__type-btn', { active: type === 'movie' }]"
          @click="setType('movie')"
        >
          Films
        </button>
        <button
          :class="['tendances__type-btn', { active: type === 'tv' }]"
          @click="setType('tv')"
        >
          Séries
        </button>
      </div>
    </div>

    <div class="tendances__grid">
      <search-card
        v-for="item in items"
        :key="item.id"
        :media="item"
        :href="type === 'movie' ? `/films/${item.id}` : `/series/${item.id}`"
      />
    </div>

    <div ref="sentinel" class="tendances__sentinel" />
    <loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";

definePageMeta({
  key: "tendances",
  layout: "main-layout",
  order: 1,
});

useHead({ title: "Tendances" });

type MediaType = "movie" | "tv";

const type = ref<MediaType>("movie");
const items = ref<TmdbMedia[]>([]);
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const sentinel = ref<HTMLElement | null>(null);

function setType(newType: MediaType) {
  if (newType === type.value) return;
  type.value = newType;
  items.value = [];
  currentPage.value = 1;
  totalPages.value = 1;
  fetch();
}

async function fetch() {
  if (isLoading.value || currentPage.value > totalPages.value) return;
  isLoading.value = true;

  const params = { page: String(currentPage.value) };

  if (type.value === "movie") {
    const { data, error } =
      await useAPI().tmdb.trending.getTrendingMoviesByWeek(params);
    isLoading.value = false;
    if (error || !data) return;
    totalPages.value = data.total_pages;
    items.value.push(...data.results.map(useUtils().mappers.movie));
  } else {
    const { data, error } =
      await useAPI().tmdb.trending.getTrendingTVByWeek(params);
    isLoading.value = false;
    if (error || !data) return;
    totalPages.value = data.total_pages;
    items.value.push(...data.results.map(useUtils().mappers.tv));
  }

  currentPage.value++;
}

onMounted(async () => {
  await fetch();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetch();
    },
    { threshold: 0.2 },
  );

  if (sentinel.value) observer.observe(sentinel.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<style scoped lang="scss">
.tendances {
  padding: 62px 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
    position: sticky;
    top: 62px;
    z-index: 100;
    padding: 1rem 0;
    margin-inline: -4rem;
    overflow: hidden;
    background: linear-gradient(to bottom, $dark-bg 80%, transparent);
  }

  &__type-filter {
    display: flex;
    gap: 8px;
    padding-inline: 4rem;
  }

  &__type-btn {
    background: transparent;
    border: 1px solid #ffffff20;
    color: #ffffff60;
    padding: 5px 14px;
    border-radius: 48px;
    font-size: 12px;
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

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  &__sentinel {
    height: 40px;
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .tendances {
    padding: 62px 16px;
    &__grid {
      justify-content: center;
    }
  }
}
</style>
