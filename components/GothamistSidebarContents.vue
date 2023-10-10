<script setup lang="ts">
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import type Navigation from '~~/composables/types/Navigation.js'

const props = defineProps<{
  navigation: Navigation
  donateUrlBase: string
  utmCampaign: string
}>()
const emit = defineEmits(['menuListClick'])
</script>

<template>
  <div class="sidebar-contents pt-3">
    <div class="sidebar-contents-top pb-5">
      <SearchButton
        expanded
        class="mb-6"
        @on-search="emit('menuListClick', $event)"
      />
      <menu-list
        :nav-links="props.navigation.primaryNavigation"
        @menu-list-click="emit('menuListClick', $event)"
      />
    </div>
    <div class="sidebar-contents-bottom mb-5 md:mb-6">
      <!-- <ListenAllLiveButton
        @streamButtonClick="emit('menuListClick', $event)"
      /> -->
      <ListenLiveButton @stream-button-click="emit('menuListClick', $event)" />
      <a
        class="sidebar-button-send-a-story mod-button p-button p-button-rounded mb-5 mt-3 w-full"
        href="mailto:tips@gothamist.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="p-button-label">Send a story idea</span>
      </a>
      <hr class="white mb-3">
      <VShareTools class="mb-3">
        <span>Follow Us</span>
        <VShareToolsItem service="facebook" username="gothamist" />
        <VShareToolsItem service="twitter" username="gothamist" />
        <VShareToolsItem service="instagram" username="gothamist" />
        <VShareToolsItem
          service="youtube"
          username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
        />
      </VShareTools>
      <hr class="white mb-3">
      <div class="flex mb-3">
        <div
          class="sidebar-contents-property-description mr-2"
          v-html="navigation.propertyDescription"
        />
        <div class="sidebar-contents-logo">
          <LogoNypr />
        </div>
      </div>
      <a
        class="mod-button p-button p-button-rounded mb-5 w-full"
        :href="`${donateUrlBase}&utm_campaign=${utmCampaign}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="p-button-label">
          <span class="pi pi-heart-fill" />
          Support us today
        </span>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar-contents {
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text-color);
}

.sidebar-contents .menu-list {
  gap: 1rem;
}

.sidebar-contents .menu-list a.flexible-link {
  font-family: var(--font-family-header);
  text-transform: none;
  font-weight: 600;
  font-size: 26px;
  line-height: 23px;

  @include media('>sm') {
    font-size: 32px;
    line-height: 30px;
  }
}

.sidebar-contents-property-description * {
  @include font-config($type-fineprint);
}

.sidebar-contents-logo {
  min-width: 75px;
}

.sidebar-button-send-a-story.p-button {
  background: var(--black-300);
  color: var(--text-color);
}
</style>
