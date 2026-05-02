<template>
  <Transition name="overlay">
    <div v-if="store.isOpen" class="search-overlay" @click.self="store.reset()">
      <div v-if="store.isLoading" class="search-overlay__loader">
        <h-icon :icon="Loading03Icon" color="#ffffff40" />
      </div>

      <template v-else-if="store.hasResults">
        <section
          v-if="store.resultsByType.movies.length"
          class="search-overlay__section"
        >
          <span class="search-overlay__label">Films</span>
          <div class="search-overlay__row">
            <search-card
              v-for="movie in store.resultsByType.movies"
              :key="movie.id"
              :media="useUtils().mappers.movie(movie)"
              :href="`/films/${movie.id}`"
            />
          </div>
        </section>

        <section
          v-if="store.resultsByType.tv.length"
          class="search-overlay__section"
        >
          <span class="search-overlay__label">Séries</span>
          <div class="search-overlay__row">
            <search-card
              v-for="tv in store.resultsByType.tv"
              :key="tv.id"
              :media="useUtils().mappers.tv(tv)"
              :href="`/tv/${tv.id}`"
            />
          </div>
        </section>

        <section
          v-if="store.resultsByType.people.length"
          class="search-overlay__section"
        >
          <span class="search-overlay__label">Personnes</span>
          <div class="search-overlay__row search-overlay__row--people">
            <div
              v-for="person in store.resultsByType.people"
              :key="person.id"
              class="search-overlay__person"
              @click="router.push(`/person/${person.id}`)"
            >
              <img
                v-if="person.profile_path"
                :src="`https://image.tmdb.org/t/p/w185${person.profile_path}`"
                :alt="person.name"
                class="search-overlay__person-avatar"
              />
              <div v-else class="search-overlay__person-avatar --placeholder">
                {{ person.name.charAt(0) }}
              </div>
              <div>
                <p class="search-overlay__person-name">{{ person.name }}</p>
                <p class="search-overlay__person-role">
                  {{ person.known_for_department }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </template>

      <div v-else class="search-overlay__empty">
        Aucun résultat pour "{{ store.query }}"
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { onKeyStroke } from "@vueuse/core";
import { useUtils } from "~/composables/global/useUtils";
import { useSearchStore } from "~/store/useSearchStore";

const store = useSearchStore();
const router = useRouter();

onKeyStroke("Escape", () => store.close());
</script>

<style scoped lang="scss">
.search-overlay {
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9998;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__label {
    display: block;
    color: #ffffff40;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-weight: 400;
  }

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    &--people {
      gap: 12px;
    }
  }

  &__person {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff0d;
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #ffffff1a;
    }

    &-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;

      &.--placeholder {
        background: #ffffff20;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
      }
    }

    &-name {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
    }
    &-role {
      color: #ffffff40;
      font-size: 11px;
      margin-top: 2px;
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    opacity: 0.4;
  }

  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ffffff30;
    font-size: 14px;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
