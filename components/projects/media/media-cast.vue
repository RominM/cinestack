<template>
  <div v-if="cast.length" class="media-cast">
    <h3 class="media-cast__title">Casting</h3>
    <div class="media-cast__list">
      <button
        v-for="actor in cast.slice(0, 8)"
        :key="actor.id"
        class="cast-item"
        @click="openActorDetails(actor.id)"
      >
        <div class="cast-item__avatar">
          <img
            v-if="actor.profile_path"
            :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`"
            :alt="actor.name"
          />
          <div v-else class="cast-item__placeholder">
            <h-icon :icon="UserIcon" color="#ffffff30" :size="22" />
          </div>
        </div>
        <span class="cast-item__name">{{ actor.name }}</span>
        <span v-if="actor.character" class="cast-item__role">
          {{ actor.character }}
        </span>
      </button>
    </div>

    <person-modal
      v-model:is-open="showActor"
      :person-id="actorId ?? null"
    />
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from "@hugeicons/core-free-icons";
import type { TmdbCastMember } from "~/types/ressources/TMDB/common";

defineProps({
  cast: { type: Array as PropType<TmdbCastMember[]>, default: () => [] },
});

const showActor = ref<boolean>(false);
const actorId = ref<number>();

function openActorDetails(id: number) {
  actorId.value = id;
  nextTick(() => {
    showActor.value = true;
  });
}
</script>

<style scoped lang="scss">
.media-cast {
  &__title {
    font-size: 13px;
    color: #ffffff66;
    margin: 0 0 12px;
    font-weight: 400;
  }

  &__list {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
}

.cast-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 56px;

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff18;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: #ffffff18;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__name {
    font-size: 10px;
    color: #ffffffcc;
    text-align: center;
    line-height: 1.3;
  }

  &__role {
    font-size: 9px;
    color: #ffffff44;
    text-align: center;
    line-height: 1.3;
  }
}
</style>
