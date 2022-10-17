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
    console.log('allCurrentEpisodes.value', allCurrentEpisodes.value)
    allCurrentEpisodes.value.data.forEach((stream) => {
      console.log('stream', stream)
      streamItems.value.push({
        label: stream.attributes.name,
        icon: `icon ${stream.attributes.slug}-icon`,
        slug: stream.attributes.slug,
      })
    })
  })
})

const items = ref([
  {
    label: 'Update',
    icon: 'pi pi-refresh',
    command: () => {
      toast.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Data Updated',
        life: 3000,
      })
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => {
      toast.add({
        severity: 'warn',
        summary: 'Delete',
        detail: 'Data Deleted',
        life: 3000,
      })
    },
  },
  {
    label: 'Vue Website',
    icon: 'pi pi-external-link',
    command: () => {
      window.location.href = 'https://vuejs.org/'
    },
  },
  {
    label: 'Upload',
    icon: 'pi pi-upload',
    command: () => {
      window.location.hash = '/fileupload'
    },
  },
])

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
            src="play.svg"
            class="mr-2"
          />
          <img v-else alt="pause icon" src="pause.svg" class="mr-2" />
          <img
            alt="WNYC"
            :src="`live-stream-logos-white/${slug}.svg`"
            class="mr-2"
          />
          {{ props.label }}
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
        <div class="stream-item flex gap-2" @click="setStream(item.slug)">
          <img
            :src="`live-stream-logos/${item.slug}.svg`"
            alt="-"
            class="image"
          />
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
    }
  }
}
.streamsMenu {
  padding: 1rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .stream-item {
      .image {
        width: 36px;
        height: auto;
      }
      .label {
        font-size: 1rem;
        line-height: normal;
        font-family: var(--font-family-header);
      }
    }
  }
}
</style>
