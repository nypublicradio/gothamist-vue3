<script setup>
import {
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  useCurrentEpisode,
  useCurrentEpisodeHolder,
} from '~/composables/states'
const props = defineProps({
  label: {
    type: String,
    default: 'Listen Live',
  },
  slug: {
    type: String,
    default: 'wnyc-fm939',
  },
})

const emit = defineEmits(['stream-button-click'])

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const currentEpisode = useCurrentEpisode()
const currentEpisodeHolder = useCurrentEpisodeHolder()

const togglePlay = () => {
  if (!currentEpisode.value) {
    currentEpisode.value = currentEpisodeHolder.value
  }
  emit('stream-button-click')
  togglePlayTrigger.value = !togglePlayTrigger.value
}
</script>

<template>
  <div class="listen-live-button">
    <Button
      class="p-button-rounded p-button-danger w-full flex justify-content-center"
      @click="currentEpisodeHolder ? togglePlay() : null"
    >
      <div class="flex align-items-center">
        <i
          v-if="!currentEpisodeHolder"
          class="pi pi-spin pi-spinner mr-2"
          style="font-size: 1rem"
        ></i>
        <img
          v-else-if="!isEpisodePlaying"
          alt="play icon"
          src="/play.svg"
          class="mr-2"
        />
        <img v-else alt="pause icon" src="/pause.svg" class="mr-2" />
        <img
          alt="WNYC"
          :src="`/live-stream-logos-white/${props.slug}.svg`"
          class="mr-2"
        />
        {{ props.label }}
      </div>
    </Button>
  </div>
</template>

<style lang="scss">
.listen-live-button {
}
</style>
