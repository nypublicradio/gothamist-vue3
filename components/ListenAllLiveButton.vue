<script setup>
import { ref, onBeforeMount } from 'vue'
import {
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  useAllCurrentEpisodes,
} from '~/composables/states'
import {
  getAllLiveStreams,
  getLiveStream,
} from '~~/composables/data/liveStream'
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
const allCurrentEpisodes = useAllCurrentEpisodes()

let gotStream = false
const slug = ref(props.slug)
const streamsMenu = ref(null)

const streamItems = ref([])

const toggleMenu = (event) => {
  streamsMenu.value.toggle(event)
}

// lifecycle hooks
onBeforeMount(async () => {
  getAllLiveStreams().then(() => {
    //console.log('allCurrentEpisodes.value', allCurrentEpisodes.value)
    allCurrentEpisodes.value.data.forEach((stream) => {
      //console.log('stream', stream)
      streamItems.value.push({
        label: stream.attributes.name,
        icon: 'icon',
        slug: stream.attributes.slug,
        image: stream.attributes['image-logo'],
        command: async () => {
          //console.log('command - ', stream.attributes.slug)
          slug.value = stream.attributes.slug
          await getLiveStream(stream.attributes.slug)
          gotStream = true
        },
      })
    })
  })
})

const togglePlay = async () => {
  if (!gotStream) {
    await getLiveStream(slug.value)
    gotStream = true
  }
  emit('stream-button-click')
  togglePlayTrigger.value = !togglePlayTrigger.value
}
</script>

<template>
  <div class="listen-all-live-button">
    <div class="combo-button flex">
      <Button
        class="listen-button p-button-rounded p-button-danger w-full flex justify-content-center"
        @click="togglePlay"
      >
        <div class="flex align-items-center">
          <img
            v-if="!isEpisodePlaying"
            alt="play icon"
            src="/play.svg"
            class="mr-2"
          />
          <img v-else alt="pause icon" src="/pause.svg" class="mr-2" />
          <img
            class="logo mr-2"
            alt="show-logo"
            :src="`/live-stream-logos-white/${slug}.svg`"
          />
          <span>{{ props.label }}</span>
        </div>
      </Button>
      <Button
        icon="pi pi-chevron-down"
        label="&nbsp;"
        class="dropdown-button p-button-danger p-button-rounded"
        @click="toggleMenu"
      />
    </div>
    <TieredMenu
      ref="streamsMenu"
      :model="streamItems"
      :popup="true"
      class="streamsMenu"
    >
      <template #item="{ item }">
        <div
          class="stream-item flex gap-2 align-items-center"
          @click="item.command()"
        >
          <img :src="item.image" alt="-" class="image" />
          <p class="label">{{ item.label }}</p>
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style lang="scss">
.listen-all-live-button {
  .combo-button {
    .dropdown-button {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      padding: 0 0 0 0.5rem;
      .p-button-icon {
        margin-right: 1rem;
      }
    }
    .listen-button {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      padding-right: 5px;
      .logo {
        max-height: 16px;
        width: 50px;
      }
    }
  }
}
.streamsMenu {
  ul {
    display: flex;
    flex-direction: column;
    //gap: 1rem;
    .stream-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
      .image {
        width: 36px;
        height: auto;
      }
      .label {
        font-size: 0.85rem;
        line-height: normal;
        font-family: var(--font-family-header);
      }
    }
  }
}
</style>
