<template>
  <loader v-if="isLoading" />

  <div v-else-if="rawTV" class="serie">
    <hero-header v-if="tv" :movies="[tv]" />

    <media-details-tv :raw="rawTV" />

    <section-cards
      v-if="recommendations.length"
      :medias="recommendations"
      base-route="/series"
      title="Recommandations"
    />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbTVDetail } from "~/types/ressources/TMDB/tv";

definePageMeta({
  key: (route) => route.fullPath,
  layout: "main-layout",
  order: 3,
});

const route = useRoute();
const id = route.params.id as string;

const isLoading = ref<boolean>(false);
const rawTV = ref<TmdbTVDetail>();

const tv = computed<TmdbMedia | undefined>(() =>
  rawTV.value ? useUtils().mappers.tv(rawTV.value) : undefined,
);

useHead({
  title: () => tv.value?.name ?? "Série",
  meta: [
    { property: 'og:title', content: () => tv.value?.name ?? "Série" },
    { property: 'og:description', content: () => rawTV.value?.overview ?? "" },
    { property: 'og:image', content: () => rawTV.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${rawTV.value.backdrop_path}` : 'https://cinestack-mgl.netlify.app/cinestack.svg' },
    { name: 'twitter:title', content: () => tv.value?.name ?? "Série" },
    { name: 'twitter:description', content: () => rawTV.value?.overview ?? "" },
    { name: 'twitter:image', content: () => rawTV.value?.backdrop_path ? `https://image.tmdb.org/t/p/w1280${rawTV.value.backdrop_path}` : 'https://cinestack-mgl.netlify.app/cinestack.svg' },
  ],
});

const recommendations = computed<TmdbMedia[]>(
  () =>
    rawTV.value?.recommendations?.results.map(useUtils().mappers.tv) ?? [],
);

onMounted(() => getTVDetails());

async function getTVDetails() {
  isLoading.value = true;
  const { data, error } = await useAPI().tmdb.tv.getTVDetail(id, {
    append_to_response: "credits,videos,images,recommendations,watch/providers",
    include_video_language: "fr,null",
  });
  isLoading.value = false;

  if (!data || error) return;
  rawTV.value = data;
}
</script>

<style scoped lang="scss">
.serie {
}
</style>
