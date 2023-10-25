<script setup lang="ts">
import VShareTools from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareTools.vue'
import VShareToolsItem from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VShareToolsItem.vue'
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import type Navigation from '~~/composables/types/Navigation.js'
import { audioPlayerHeight, useCurrentEpisode } from '~/composables/states'

const props = defineProps<{
  navigation: Navigation
}>()
const currentEpisode = useCurrentEpisode()
const legalLinks = ref(props.navigation.legalLinks)
const propertyDescription = ref(props.navigation.propertyDescription)
const copyrightYear = ref(props.navigation.copyrightYear)
</script>

<template>
  <section
    id="gothamist-footer"
    class="gothamist-footer"
    data-style-mode="dark"
    aria-label="gothamist footer"
  >
    <div
      class="content"
      :style="`padding-bottom:${
        currentEpisode ? `${audioPlayerHeight + 25}px` : '25px'
      }`"
    >
      <div class="top grid">
        <div class="hidden lg:flex lg:col-3 xl:col-4 p-0">
          <menu-list :nav-links="props.navigation.primaryFooterLinks" />
        </div>
        <div class="col-12 lg:col-9 xl:col-8 right p-0">
          <div class="logo-lockup">
            <NuxtLink to="/" class="gothamist-logo">
              <logo-gothamist />
            </NuxtLink>
            <div
              class="property-description"
              v-html="propertyDescription"
            />
          </div>
          <div class="block lg:hidden">
            <menu-list :nav-links="props.navigation.primaryFooterLinks" />
          </div>
          <LoadLazily>
            <lazy-nypr-logos-bracket />
          </LoadLazily>
        </div>
      </div>
      <hr class="w-full my-4">
      <div class="bottom grid">
        <VShareTools class="left col-12 lg:col-3 xl:col-4 pr-0">
          <VShareToolsItem service="facebook" username="gothamist" />
          <VShareToolsItem service="twitter" username="gothamist" />
          <VShareToolsItem service="instagram" username="gothamist" />
          <VShareToolsItem
            service="youtube"
            username="UCY_2VeS5Q9_sMZRhtvF0c5Q"
          />
        </VShareTools>
        <div class="right col-12 lg:col-9 xl:col-8">
          <div class="menu">
            <VFlexibleLink
              v-for="(item, index) in legalLinks"
              :key="`legalLinks-${item.value.title}-${index}`"
              :to="item.value.url"
            >
              {{ item.value.title }}
            </VFlexibleLink>
          </div>
          <div class="type-fineprint copyright">
            ©{{ copyrightYear }} New York Public Radio. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.gothamist-footer {
  background-color: var(--black-500);
  .content {
    padding-bottom: 25px;
    .top {
      margin: 0;
      .right {
        min-height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 3rem;
        @include media('<lg') {
          min-height: none;
        }
        .logo-lockup {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          @include media('<lg') {
            flex-direction: column;
            align-items: flex-start;
          }
          .gothamist-logo {
            svg {
              width: 225px;
              height: auto;
              path {
                fill: var(--white);
              }
            }
            @include media('<lg') {
              width: 190px;
            }
          }
          .property-description {
            max-width: 370px;
            * {
              @include font-config($type-fineprint);
            }
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      @include media('<lg') {
        flex-direction: row-reverse;
        align-items: flex-start;
      }
      .left {
        padding-left: 0;
        padding-right: 0;
        @include media('<lg') {
          z-index: 2;
          width: auto;
          justify-content: flex-end;
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        gap: 1.5rem;
        padding-left: 0;
        padding-right: 0;
        @include media('<lg') {
          margin-top: -2rem;
          flex-direction: column;
        }
        .menu {
          display: flex;
          align-self: flex-start;
          gap: 1rem;
          a {
            @include font-config($type-fineprint);
          }
          @include media('<md') {
            flex-direction: column;
          }
        }
        .copyright {
          color: var(--black300);
        }
      }
    }
  }
}
</style>
