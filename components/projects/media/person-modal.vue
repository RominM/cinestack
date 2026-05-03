<template>
  <modal
    :is-open="isOpen"
    dismisable
    show-cross
    :title="person?.name ?? ''"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div v-if="isLoading" class="person-modal__loader">
      <loader />
    </div>

    <div v-else-if="person" class="person-modal">
      <div class="person-modal__header">
        <img
          v-if="person.profile_path"
          class="person-modal__avatar"
          :src="`https://image.tmdb.org/t/p/w185${person.profile_path}`"
          :alt="person.name"
        />
        <div v-else class="person-modal__avatar --placeholder">
          {{ person.name.charAt(0) }}
        </div>

        <div class="person-modal__meta">
          <p v-if="person.known_for_department" class="person-modal__dept">
            {{ person.known_for_department }}
          </p>
          <p v-if="person.birthday" class="person-modal__info">
            Né(e) le {{ formatDate(person.birthday) }}
            <span v-if="person.deathday">
              · Décédé(e) le {{ formatDate(person.deathday) }}</span
            >
          </p>
          <p v-if="person.place_of_birth" class="person-modal__info">
            {{ person.place_of_birth }}
          </p>
        </div>
      </div>

      <p v-if="person.biography" class="person-modal__bio">
        {{ person.biography }}
      </p>

      <div v-if="knownFor.length" class="person-modal__credits">
        <h4 class="person-modal__credits-title">Connu(e) pour</h4>
        <carousel>
          <search-card
            v-for="media in knownFor"
            :key="media.id"
            :media="media"
            :href="getHref(media)"
            @click="emit('update:isOpen', false)"
          />
        </carousel>
      </div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import { useAPI } from "~/composables/api/useApi";
import { useUtils } from "~/composables/global/useUtils";
import type { TmdbPersonDetail } from "~/types/ressources/TMDB/person";
import type { TmdbMedia } from "~/types/ressources/TMDB/common";
import type { TmdbMovie } from "~/types/ressources/TMDB/movie";
import type { TmdbTV } from "~/types/ressources/TMDB/tv";

const props = defineProps<{
  isOpen: boolean;
  personId: number | null;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
}>();

const isLoading = ref(false);
const person = ref<TmdbPersonDetail | null>(null);
const credits = ref<(TmdbMovie | TmdbTV)[]>([]);

const knownFor = computed<TmdbMedia[]>(() =>
  credits.value
    .slice(0, 20)
    .map((item) =>
      item.media_type === "movie"
        ? useUtils().mappers.movie(item as TmdbMovie)
        : useUtils().mappers.tv(item as TmdbTV),
    ),
);

function getHref(media: TmdbMedia) {
  const raw = credits.value.find((c) => c.id === media.id);
  return raw?.media_type === "tv"
    ? `/series/${media.id}`
    : `/films/${media.id}`;
}

function formatDate(dateStr: string) {
  return useUtils().date.getPrettyDate(new Date(dateStr), "DD/MM/YYYY", true);
}

watch(
  () => props.personId,
  async (id) => {
    if (!id) return;
    isLoading.value = true;
    person.value = null;
    credits.value = [];

    const [detailRes, creditsRes] = await Promise.all([
      useAPI().tmdb.person.getPersonDetail(id),
      useAPI().tmdb.person.getPersonCombinedCredits(id),
    ]);

    isLoading.value = false;

    if (detailRes.data) person.value = detailRes.data;
    if (creditsRes.data) {
      const seen = new Set<number>();
      credits.value = [...creditsRes.data.cast]
        .filter((m) => {
          if (!m.poster_path || (m.vote_count ?? 0) < 100) return false;
          if (seen.has(m.id)) return false;
          seen.add(m.id);
          return true;
        })
        .sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
        .slice(0, 20);
    }
  },
);
</script>

<style scoped lang="scss">
.person-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 24px 24px;
  min-width: 100%;
  max-width: 560px;

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    min-width: 300px;
  }

  &__header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;

    &.--placeholder {
      background: #ffffff20;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 28px;
      font-weight: 500;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 4px;
  }

  &__dept {
    font-size: 12px;
    color: rgba(163, 0, 0, 0.9);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }

  &__info {
    font-size: 12px;
    color: #ffffff60;
    margin: 0;
  }

  &__bio {
    font-size: 13px;
    line-height: 1.7;
    color: #ffffffaa;
    margin: 0;
    max-height: 160px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ffffff20 transparent;
  }

  &__credits {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__credits-title {
    font-size: 11px;
    color: #ffffff40;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 400;
    margin: 0;
    padding-inline: 0;
  }

  :deep(.carousel-wrapper) {
    margin-inline: -24px;
  }

  :deep(.carousel-container) {
    padding: 16px 24px;
    gap: 12px;
  }
}
</style>
