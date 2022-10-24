<script setup lang="ts">
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import Navigation from '~~/composables/types/Navigation.js'

const props = defineProps<{
  navigation: Navigation
  donateUrlBase: string
  utmCampaign: string
}>()
const emit = defineEmits(['menu-list-click'])
</script>

<template>
  <div class="sidebar-contents pt-3">
    <div class="sidebar-contents-top pb-5">
      <SearchButton
        expanded
        class="mb-6"
        @onSearch="emit('menu-list-click', $event)"
      />
      <menu-list
        :navLinks="props.navigation.primaryNavigation"
        @menuListClick="emit('menu-list-click', $event)"
      />
    </div>
    <div class="sidebar-contents-bottom mb-5 md:mb-6">
      <a
        class="sidebar-button-send-a-story mod-button p-button p-button-rounded mb-5 w-full"
        href="mailto:tips@gothamist.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="p-button-label">Send a story idea</span>
      </a>
      <hr class="white mb-3" />
      <v-share-tools class="mb-3">
        <span>Follow Us</span>
        <v-share-tools-item service="facebook" username="gothamist" />
        <v-share-tools-item service="twitter" username="gothamist" />
        <v-share-tools-item service="instagram" username="gothamist" />
        <v-share-tools-item
          service="youtube"
          username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
        />
      </v-share-tools>
      <hr class="white mb-3" />
      <div class="flex mb-3">
        <div
          class="sidebar-contents-property-description mr-2"
          v-html="navigation.propertyDescription"
        ></div>
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
          <span class="pi pi-heart-fill"></span>
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
